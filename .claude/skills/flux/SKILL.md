---
name: flux
description: >
  Generate images with FLUX.1 [schnell] via Cloudflare Workers AI. Use whenever the
  user asks to create, generate, or draw an image/picture/logo/illustration
  ("erstelle ein Bild", "generiere ein Bild", "male", "Bild von ...").
---

# FLUX image generation (Cloudflare Workers AI)

Generate an image from a text prompt using Cloudflare's hosted
`@cf/black-forest-labs/flux-1-schnell` model.

## Prerequisites

Two environment variables must be set (never hardcode them):

- `CLOUDFLARE_ACCOUNT_ID` – Cloudflare Dashboard → Workers & Pages → right sidebar "Account ID"
- `CLOUDFLARE_API_TOKEN` – API token with the **Workers AI** permission

If either is missing, tell the user which one is missing and how to obtain it.
Do not ask the user to paste secrets into the chat — they should set them in
their shell profile or the Claude Code environment settings.

## How to generate

Run the bundled script `flux-generate.sh` (it lives in the same directory as
this SKILL.md — e.g. `.claude/skills/flux/flux-generate.sh` in a project, or
`~/.claude/skills/flux/flux-generate.sh` when installed user-wide):

```bash
bash <path-to-this-skill-dir>/flux-generate.sh "<english prompt>" <output-path> [steps]
```

- Write the prompt in **English** and make it descriptive (subject, style,
  lighting, composition). Translate German requests before sending.
- `steps`: 1–8, default 4. Use 8 for maximum quality.
- Save the output into the session scratchpad directory unless the user names a
  target path.
- The API returns a base64 image (JSON field `result.image`); the script
  decodes it to the output file.

## After generating

Show the image to the user (send/attach the file). If the result misses the
mark, refine the prompt and regenerate rather than apologizing.

## Troubleshooting

- HTTP 403 / CONNECT errors: the environment's network policy blocks
  `api.cloudflare.com` — the user must allow that domain (Claude Code on the
  web: environment → network policy).
- `.success == false` with auth errors: token invalid or missing the
  Workers AI permission.
- Error 7000/7003: wrong or missing account ID.
