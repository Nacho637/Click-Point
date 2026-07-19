---
name: flux
description: >
  Generate images with FLUX 2 Pro via Cloudflare Workers AI. Use whenever the
  user asks to create, generate, or draw an image/picture/logo/illustration
  ("erstelle ein Bild", "generiere ein Bild", "male", "Bild von ...").
---

# FLUX image generation (Cloudflare Workers AI)

Generate an image from a text prompt using Cloudflare's hosted
`@cf/black-forest-labs/flux-2-pro-preview` model.

## Prerequisites

- `CLOUDFLARE_API_TOKEN` (required) – API token with the **Workers AI**
  permission. Never hardcode it; if it is missing, tell the user to set it in
  their shell profile or the Claude Code environment settings — not to paste it
  into the chat.
- `CLOUDFLARE_ACCOUNT_ID` (optional) – the script defaults to the account
  `26f31e7485017096cb8d550d68cdc80a`.
- `FLUX_MODEL` (optional) – override the model, e.g.
  `@cf/black-forest-labs/flux-1-schnell` for fast drafts.

## How to generate

Run the bundled script `flux-generate.sh` (it lives in the same directory as
this SKILL.md — e.g. `.claude/skills/flux/flux-generate.sh` in a project, or
`~/.claude/skills/flux/flux-generate.sh` when installed user-wide):

```bash
bash <path-to-this-skill-dir>/flux-generate.sh "<english prompt>" <output-path> [steps]
```

- Write the prompt in **English** and make it descriptive (subject, style,
  lighting, composition). Translate German requests before sending.
- `steps` is optional and only supported by some models (flux-1-schnell: 1–8);
  omit it for flux-2-pro-preview.
- Save the output into the session scratchpad directory unless the user names a
  target path.
- The script handles both response formats (JSON with base64 `result.image`,
  or raw image bytes) and writes the decoded image to the output file.

## After generating

Show the image to the user (send/attach the file). If the result misses the
mark, refine the prompt and regenerate rather than apologizing.

## Troubleshooting

- `CONNECT tunnel failed, response 403`: the environment's network policy
  blocks `api.cloudflare.com` — the user must allow that domain (Claude Code on
  the web: environment settings → network policy).
- HTTP 401/403 from Cloudflare: token invalid or missing the Workers AI
  permission.
- Error 7000/7003: wrong account ID.
