# Inkwell landing and unified deployment

This workspace contains the Inkwell marketing landing page and the deployment assembly that mounts the local-first writing app at `/inkwell/app/`. The canonical app source is maintained separately in `C:/tmp/inkwell-remote`; see `docs/DEPLOYMENT-OWNERSHIP.md` for the ownership boundary.

## Local validation

Prerequisites: Node.js, npm, Bash, and an authenticated Netlify CLI when deploying.

```bash
bash -n build.sh
bash build.sh
npm run lint
npm run verify:offer-contract
bash scripts/smoke-free-domain.sh https://inkwelllanding.netlify.app
```

`build.sh` prefers the verified `app-dist` artifact and has a pinned app-source fallback. It publishes the landing at `/` and the mounted app at `/inkwell/app/`. Paid offers remain disabled until the documented Worker, entitlement, and payment approval gates are complete.

Only browser-safe public configuration belongs in the landing or app build. Never put service-role keys, PayPal credentials, webhook secrets, GitHub tokens, or private API credentials in source, `.env`, `dist`, or `app-dist`.
