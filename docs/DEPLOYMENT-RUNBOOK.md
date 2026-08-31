# Inkwell deployment runbook

This runbook deploys the unified Inkwell landing page and the bundled writing app to the linked Netlify site. It is intentionally domain-independent: use the Netlify site URL or a deploy URL for verification, and do not hard-code a future custom domain.

## Ownership and release inputs

- Landing/deployment workspace: repository root (this checkout)
- Canonical app source: separate `educationlessonplans/inkwell` repository, currently checked out at `C:/tmp/inkwell-remote`
- Bundled app artifact: `app-dist/` in this checkout
- Netlify site: `inkwelllanding`
- Netlify site ID: `f4e12876-23af-4d9d-b774-3bd92be07285`
- Current public URL: `https://inkwelllanding.netlify.app`
- Current canonical app source: Git `main` HEAD `a145188` (`harden local readiness and entitlement boundaries`), incorporating the reviewed local readiness changes and prior PWA/Harper fixes; the current auth-enabled artifact was rebuilt from that working tree.
- Fallback clone revision: `a1451889c2a0fc36b1318a43ddbcf0d15e54d08f` (recovery input only; matches the pushed canonical app readiness boundary)

- `build.sh` builds the landing at `/`, prefers the verified `app-dist` artifact, and falls back to cloning the pinned app revision only when `app-dist` is absent. `netlify.toml` publishes `dist`, mounts the app at `/inkwell/app/`, preserves SPA deep links, and proxies only the currently retained app API routes. Public purchase-start and PayPal webhook routes are intentionally absent until the dedicated production Worker and payment approval gates are complete. The linked Netlify site's stored CI command is still historical; use the local assembled `dist` for manual deploys and do not trigger or rewrite CI settings until the unified source is available in the connected repository.

## Prerequisites

Run from the repository root. The unified build owns dependency installation and automatically selects native Windows npm when `cmd.exe` is available:

```bash
bash -n build.sh
netlify status
```

On Windows, do not run a standalone Bash `npm ci`; use `bash build.sh` or `cmd.exe /d /c npm ci` so platform-specific optional packages match the host.

The Netlify CLI must be authenticated and the directory must be linked to `inkwelllanding`. Never put service-role keys, PayPal credentials, worker secrets, GitHub tokens, or private API tokens in `.env`, Vite-exposed variables, source, `dist`, or `app-dist`.

## Pre-deploy checks

These checks do not change the production site:

```bash
npm run lint
npm run build
bash build.sh
```

After a deployment URL exists, run the same smoke command against that URL. To establish a baseline before replacing production, it can also be run against the current public URL:

```bash
bash scripts/smoke-free-domain.sh https://inkwelllanding.netlify.app
```

The smoke command verifies landing HTML and account-boundary copy, the app shell, an app deep route, the manifest, the service worker, anonymous responses from catalog, session, entitlement, and capabilities API routes, and the disabled payment routes. A successful `bash build.sh` must leave these paths in the assembled output:


- `dist/index.html`
- `dist/inkwell/app/index.html`
- `dist/inkwell/app/manifest.webmanifest`
- `dist/inkwell/app/sw.js`

## Account-path configuration and verification

The mounted app exposes its Supabase magic-link form only when the built artifact receives both browser-safe `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` values. The canonical app repository's `.env.example` documents this boundary without storing a key. These production variables are configured in Netlify, the auth-enabled app was rebuilt, and preview deploy `6a94c796a8d5e245917fbec4` plus production deploy `6a94c7ecaf4b5c60c7e026f4` pass route/PWA/payment-safety smoke checks. Live Bladebro inspection opened the magic-link email callback, reached `Signed in`, preserved that state across reload, and verified `Sign out` returns to the magic-link form. A Bladebro snapshot named `inkwell-gmail-auth` was created, but restoring it after the Chrome reset required Google's passkey and ended at `Signed out`; persistent Gmail authentication and a fresh authenticated Inkwell-state save remain unverified.

## Deploy a preview first

Build and deploy the already-assembled output without asking Netlify to rebuild it:

```bash
netlify deploy --site f4e12876-23af-4d9d-b774-3bd92be07285 --dir=dist --no-build --json
```

Copy the returned `deploy_url` (some CLI versions label the HTTPS field `deploy_ssl_url`) and run the smoke checks against that immutable deploy URL:

```bash
bash scripts/smoke-free-domain.sh https://<deploy-id>--inkwelllanding.netlify.app
```

Do not promote a preview when any smoke check fails. A preview response of HTTP 200 with an HTML SPA shell for `/api/catalog` is a failure: it means the API proxy is missing or misrouted. An anonymous API response of HTTP 401, 403, or 405 is expected until authentication is supplied. While sales are gated, each public purchase-start and PayPal webhook route must return HTTP 404; any other response requires stopping the release.

## Deploy production

Only after lint, build, preview deployment, and preview smoke checks pass:

```bash
netlify deploy --site f4e12876-23af-4d9d-b774-3bd92be07285 --dir=dist --no-build --prod --json
```

Copy the returned `deploy_url` (or the HTTPS `deploy_ssl_url` field) for the immutable deploy, then verify both the immutable deploy and the site alias:

```bash
bash scripts/smoke-free-domain.sh https://<new-deploy-id>--inkwelllanding.netlify.app
bash scripts/smoke-free-domain.sh https://inkwelllanding.netlify.app
```

Record the deploy ID, deploy URL, command results, and any remaining limitation in the active session `STATE.md`. The paid Pro, Analysis, and Subscription offers remain `Coming soon`; public purchase-start and PayPal webhook routes must remain disabled until payment setup and server-issued entitlement verification are separately approved and validated.

## Roll back production

First list production deploys and choose a prior deploy with `state: "ready"`. Never guess an ID and never roll back to an `error` deploy:

```bash
netlify api listSiteDeploys --data '{"site_id":"f4e12876-23af-4d9d-b774-3bd92be07285"}'
```

Then ask Netlify to republish the verified prior deploy:

```bash
netlify api rollbackSiteDeploy --data '{"site_id":"f4e12876-23af-4d9d-b774-3bd92be07285","deploy_id":"<verified-ready-deploy-id>"}'
```

After the rollback completes, run the expanded smoke script against `https://inkwelllanding.netlify.app` and confirm the catalog, session, entitlement, and capabilities API proxies return expected anonymous 401/403/405 responses, while the three gated payment routes remain HTTP 404. The current verified production deploy is `6a94c7ecaf4b5c60c7e026f4`; the current verified preview deploy is `6a94c796a8d5e245917fbec4`. Verify the deploy list again before using either ID because deploy history can change.

## Troubleshooting

- **Windows dependency/tool shims:** the landing scripts invoke Vite, TypeScript, and `tsx` through their Node entrypoints. `build.sh` detects `cmd.exe` and runs `npm ci` plus both the landing build and pinned fallback app build through Windows npm, preserving native optional packages; Netlify's Linux environment uses npm directly. If a standalone Bash `npm ci` has already replaced the host-specific dependencies, run `cmd.exe /d /c npm ci` from the repository root, then rerun the checks. Do not bypass type validation.
- **`bash build.sh` cannot find the app:** restore `app-dist`, or make the pinned app revision anonymously fetchable before relying on the fallback clone.
- **App route returns the landing page:** inspect `dist/inkwell/app/index.html`, confirm the app asset paths begin with `/inkwell/app/`, and confirm the `/inkwell/app/*` SPA redirect remains in `netlify.toml`.
- **Manifest or service worker is missing:** rebuild and confirm the four required files under `dist/inkwell/app/` before deploying.
- **`/api/catalog` returns HTML or 200 anonymously:** stop. The worker proxy is not being used. Check the forced API redirects in `netlify.toml`; do not mask the problem in client code.
- **Worker returns 401/403/405 anonymously:** this is expected for protected API routes. Authenticated endpoint testing belongs to the separate auth/product-readiness validation task.
- **Deploy URL works but the alias is stale:** wait for Netlify alias propagation, then rerun the alias smoke check. Do not assume success from the immutable deploy URL alone.
