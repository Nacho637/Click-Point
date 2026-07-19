#!/usr/bin/env bash
# Generate an image with FLUX via Cloudflare Workers AI.
#
# Usage:   flux-generate.sh "prompt" [output-file] [steps]
# Env:     CLOUDFLARE_API_TOKEN   (required) – API token with "Workers AI" permission
#          CLOUDFLARE_ACCOUNT_ID  (optional) – defaults to the account baked in below
#          FLUX_MODEL             (optional) – defaults to @cf/black-forest-labs/flux-2-pro-preview
set -euo pipefail

ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-26f31e7485017096cb8d550d68cdc80a}"
: "${CLOUDFLARE_API_TOKEN:?Set CLOUDFLARE_API_TOKEN (token with Workers AI permission)}"

PROMPT="${1:?Usage: flux-generate.sh \"prompt\" [output-file] [steps]}"
OUT="${2:-flux-$(date +%Y%m%d-%H%M%S).png}"
STEPS="${3:-}"
MODEL="${FLUX_MODEL:-@cf/black-forest-labs/flux-2-pro-preview}"

# steps is only supported by some models (e.g. flux-1-schnell, 1-8); send it
# only when explicitly requested.
if [ -n "$STEPS" ]; then
  BODY=$(jq -n --arg p "$PROMPT" --argjson s "$STEPS" '{prompt: $p, steps: $s}')
else
  BODY=$(jq -n --arg p "$PROMPT" '{prompt: $p}')
fi

TMP=$(mktemp)
HTTP_CODE=$(curl -sS -o "$TMP" -w '%{http_code}' -X POST \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODEL}" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "$BODY")

if [ "$HTTP_CODE" != "200" ]; then
  echo "HTTP $HTTP_CODE from Cloudflare:" >&2
  cat "$TMP" >&2
  rm -f "$TMP"
  exit 1
fi

# The API returns either JSON with a base64 image (result.image) or raw image bytes.
if jq -e . "$TMP" >/dev/null 2>&1; then
  IMG=$(jq -r '.result.image // empty' "$TMP")
  if [ -z "$IMG" ]; then
    echo "Unexpected JSON response:" >&2
    jq . "$TMP" >&2
    rm -f "$TMP"
    exit 1
  fi
  printf '%s' "$IMG" | base64 -d > "$OUT"
  rm -f "$TMP"
else
  mv "$TMP" "$OUT"
fi

echo "Image written to: $OUT"
