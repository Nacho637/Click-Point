#!/usr/bin/env bash
# Generate an image with FLUX.1 [schnell] via Cloudflare Workers AI.
#
# Usage:   flux-generate.sh "prompt" [output-file] [steps]
# Env:     CLOUDFLARE_ACCOUNT_ID  (required) – Cloudflare Dashboard -> Workers & Pages -> Account ID
#          CLOUDFLARE_API_TOKEN   (required) – API token with "Workers AI: Read" permission
#          FLUX_MODEL             (optional) – defaults to @cf/black-forest-labs/flux-1-schnell
set -euo pipefail

: "${CLOUDFLARE_ACCOUNT_ID:?Set CLOUDFLARE_ACCOUNT_ID (Cloudflare Dashboard -> Workers & Pages, right sidebar)}"
: "${CLOUDFLARE_API_TOKEN:?Set CLOUDFLARE_API_TOKEN (token with Workers AI permission)}"

PROMPT="${1:?Usage: flux-generate.sh \"prompt\" [output-file] [steps 1-8]}"
OUT="${2:-flux-$(date +%Y%m%d-%H%M%S).png}"
STEPS="${3:-4}"
MODEL="${FLUX_MODEL:-@cf/black-forest-labs/flux-1-schnell}"

RESPONSE=$(curl -sS -X POST \
  "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/${MODEL}" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg p "$PROMPT" --argjson s "$STEPS" '{prompt: $p, steps: $s}')")

if [ "$(printf '%s' "$RESPONSE" | jq -r '.success // false')" != "true" ]; then
  echo "Cloudflare API error:" >&2
  printf '%s' "$RESPONSE" | jq '.errors // .' >&2
  exit 1
fi

printf '%s' "$RESPONSE" | jq -r '.result.image' | base64 -d > "$OUT"
echo "Image written to: $OUT"
