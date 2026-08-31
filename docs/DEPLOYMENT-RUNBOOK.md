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

- `build.sh` builds the landing at `/`, prefers the verified `app-dist` artifact, and falls back to cloning the pinned app revision only when `app-dist` is absent. `netlify.toml` publishes `dist`, mounts the app at `/inkwell/app/`, preserves SPA deep links, and proxies the app API routes to the active dedicated production Worker. GitHub `main` is the active Netlify CI source: pushes run the tracked `bash build.sh` command and publish `dist`; do not substitute an undocumented manual/historical deployment path.

## Dedicated production API and data plane

The app's session, catalog, capabilities, and entitlement paths are attached by forced Netlify redirects to the dedicated production Worker:

`https://inkwell-entitlement-worker.teachtylerhenley.workers.dev`

The attached paths include `/api/auth/session`, `/api/catalog`, `/api/capabilities`, `/api/entitlement`, `/api/entitlement/prime`, `/api/entitlement/settle`, and `/api/entitlement/recover`. The Worker source and Wrangler configuration are maintained and committed separately from this landing repository; the deployed Worker source boundary is commit `bc4371c`. Its production D1 binding is `inkwell-entitlement`.

Production D1 parity is applied. The parity schema/migration includes the `inkwell_accounts`, `inkwell_credits`, `inkwell_settlement_receipts`, `inkwell_provider_transactions`, and `inkwell_idempotency` tables, including the entitlement atomicity columns `credit_kind`, `free_day`, and `settlement_receipt_id` plus their uniqueness constraints/indexes. Treat this as the current production schema; any future Worker schema change must be migrated and verified before release.

Payment purchase and webhook routes remain intentionally disabled: `INKWELL_PAYMENTS_ENABLED=false`, and `/api/inkwell-purchase-start`, `/api/purchase-start`, and `/api/paypal/webhook` must remain HTTP 404. No sales activation is authorized by this runbook.

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

The mounted app exposes its Supabase magic-link form only when the built artifact receives both browser-safe `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` values. The canonical app repository's `.env.example` documents this boundary without storing a key. These production variables are configured in Netlify, and the auth-enabled app was rebuilt. Preview deploy `6a94c796a8d5e245917fbec4` and production deploy `6a94c7ecaf4b5c60c7e026f4` pass route/PWA/payment-safety smoke checks. Live browser verification reached `Signed in`, preserved that state across reload, and verified `Sign out` returns to the magic-link form.

## Deploy a preview first

Build and deploy the already-assembled output without asking Netlify to rebuild it:

```bash
netlify deploy --site f4e12876-23af-4d9d-b774-3bd92be07285 --dir=dist --no-build --json
```

Copy the returned `deploy_url` (some CLI versions label the HTTPS field `deploy_ssl_url`) and run the smoke checks against that immutable deploy URL:

```bash
bash scripts/smoke-free-domain.sh https://<deploy-id>--inkwelllanding.netlify.app
```

Do not promote a preview when any smoke check fails. A preview response of HTTP 200 with an HTML SPA shell for `/api/catalog` is a failure: it means the API proxy is missing or misrouted. For each attached session, catalog, capabilities, and entitlement route, verify the dedicated Worker returns a JSON anonymous 401/403/405 response (never HTML) and the expected CORS headers. While sales are gated, each public purchase-start and PayPal webhook route must return HTTP 404; any other response requires stopping the release.

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

Record the deploy ID, deploy URL, command results, and any remaining limitation in the active session `STATE.md`. The paid Pro, Analysis, and Subscription offers remain `Coming soon`; payment purchase and webhook routes must remain HTTP 404 with `INKWELL_PAYMENTS_ENABLED=false`. Any future payment change requires these smoke checks plus explicit payment approval and separately validated server-issued entitlement verification.

## Roll back production

First list production deploys and choose a prior deploy with `state: "ready"`. Never guess an ID and never roll back to an `error` deploy:

```bash
netlify api listSiteDeploys --data '{"site_id":"f4e12876-23af-4d9d-b774-3bd92be07285"}'
```

Then ask Netlify to republish the verified prior deploy:

```bash
netlify api rollbackSiteDeploy --data '{"site_id":"f4e12876-23af-4d9d-b774-3bd92be07285","deploy_id":"<verified-ready-deploy-id>"}'
```

After the rollback completes, run the expanded smoke script against `https://inkwelllanding.netlify.app` and confirm the dedicated Worker-backed catalog, session, entitlement, and capabilities API proxies return JSON with expected anonymous HTTP 401/403/405 responses and the expected CORS headers, while the three gated payment routes remain HTTP 404. The current verified production deploy is `6a94c7ecaf4b5c60c7e026f4`; the current verified preview deploy is `6a94c796a8d5e245917fbec4`. Verify the deploy list again before using either ID because deploy history can change.

## Troubleshooting

- **Windows dependency/tool shims:** the landing scripts invoke Vite, TypeScript, and `tsx` through their Node entrypoints. `build.sh` detects `cmd.exe` and runs `npm ci` plus both the landing build and pinned fallback app build through Windows npm, preserving native optional packages; Netlify's Linux environment uses npm directly. If a standalone Bash `npm ci` has already replaced the host-specific dependencies, run `cmd.exe /d /c npm ci` from the repository root, then rerun the checks. Do not bypass type validation.
- **`bash build.sh` cannot find the app:** restore `app-dist`, or make the pinned app revision anonymously fetchable before relying on the fallback clone.
- **App route returns the landing page:** inspect `dist/inkwell/app/index.html`, confirm the app asset paths begin with `/inkwell/app/`, and confirm the `/inkwell/app/*` SPA redirect remains in `netlify.toml`.
- **Manifest or service worker is missing:** rebuild and confirm the four required files under `dist/inkwell/app/` before deploying.
- **API returns HTML, wrong origin, or non-JSON:** stop. Confirm the forced Netlify redirects target `https://inkwell-entitlement-worker.teachtylerhenley.workers.dev`, and check the dedicated Worker response is JSON with its expected anonymous 401/403/405 and CORS behavior; do not mask a misroute in client code.
- **Worker returns 401/403/405 anonymously:** this is expected for protected API routes. Authenticated endpoint testing belongs to the separate auth/product-readiness validation task.
- **A payment route returns anything except 404:** stop immediately; `INKWELL_PAYMENTS_ENABLED=false` is required and payment activation requires explicit approval.
- **Deploy URL works but the alias is stale:** wait for Netlify alias propagation, then rerun the alias smoke check. Do not assume success from the immutable deploy URL alone.
