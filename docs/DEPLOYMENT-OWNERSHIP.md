# Inkwell deployment ownership

Verified 2026-08-31 from the connected GitHub `main` branch, synchronized mounted artifact, and linked Netlify project. This repository is the connected GitHub CI source.

## Canonical sources

| Surface | Canonical source | Build identity | Public path |
| --- | --- | --- | --- |
| Marketing landing | repository root (`.`) | Vite project (`package.json`, `vite.config.ts`) | `/` |
| Inkwell web app | `C:/tmp/inkwell-remote` | Git `main`, HEAD `a145188` (`harden local readiness and entitlement boundaries`), incorporating the browser-safe auth template, Harper/PWA/source-manifest fixes, and the reviewed local readiness changes | `/inkwell/app/` |
| Unified deployed app artifact | `app-dist/` | Committed mounted output copied into the marketing build | `/inkwell/app/` |

This repository versions the landing/deployment source and the verified mounted artifact together. The canonical app code remains in the separate `C:/tmp/inkwell-remote` repository at the recorded app revision. Do not edit `app-dist` by hand.

The fallback clone revision is `a1451889c2a0fc36b1318a43ddbcf0d15e54d08f` (the pushed canonical app readiness boundary). It is a separately pinned recovery input; the bundled `app-dist` artifact remains the normal self-contained deployment input.

The dedicated entitlement Worker source and Wrangler configuration are committed separately from this landing repository. The deployed Worker source boundary is commit `bc4371c`; its production endpoint is `https://inkwell-entitlement-worker.teachtylerhenley.workers.dev` and its D1 binding is `inkwell-entitlement`.

## Build and stitching

`build.sh` is the unified build entrypoint and is invoked by `netlify.toml` as `bash build.sh`.

1. Capture the marketing project root in `SITE_ROOT`.
2. Run `npm ci` and build the landing with `INKWELL_BASE=/`.
3. Prefer the bundled `app-dist` artifact. This is the normal Netlify path and does not require access to the app GitHub repository.
4. If `app-dist` is absent, clone `https://github.com/educationlessonplans/inkwell`, fetch the immutable app SHA above, check it out detached, run `npm ci`, and build with `INKWELL_BASE=/inkwell/app/`.
5. Copy the selected app distribution into `$SITE_ROOT/dist/inkwell/app/`.
6. Publish `dist`.

The fallback clone is a recovery path only. It currently depends on GitHub access/credentials in the build environment; the bundled artifact is required for a self-contained deployment.

The bundled app entrypoint `app-dist/index.html` has the same SHA-256 as the current local app build's `C:/tmp/inkwell-remote/dist/index.html` (`ce4285252221434dda43823ec7c89f7e999857a2564c3d1c6e28b567da70bddc`). This verifies the entrypoint match for the auth-enabled artifact, not a cryptographic manifest for every bundled file.

## Configuration and secret boundaries

The landing is a static Vite build. Its environment variables are public build inputs and are embedded in browser assets; they must contain display/configuration values only. The current landing consumers are:

| Variable | Owner | Required | Exposure and fallback |
| --- | --- | --- | --- |
| `INKWELL_BASE` | `vite.config.ts` / `build.sh` | Yes for path-correct deployment; `/` for the landing and `/inkwell/app/` for the app | Public build input; explicit in `build.sh` |
| `INKWELL_PRO_PRICE`, `INKWELL_PRO_CURRENCY`, `INKWELL_PRO_PRICE_LABEL` | `src/data/content.ts` | No; canonical fallback is `$120` / `USD` / unlimited-projects label | Public display values |
| `INKWELL_ANALYSIS_PRICE`, `INKWELL_ANALYSIS_CURRENCY`, `INKWELL_ANALYSIS_PRICE_LABEL` | `src/data/content.ts` | No; canonical fallback is `$30` / `USD` / current-major one-time label | Public display values |
| `INKWELL_SUBSCRIPTION_PRICE`, `INKWELL_SUBSCRIPTION_CURRENCY`, `INKWELL_SUBSCRIPTION_PRICE_LABEL` | `src/data/content.ts` | No; canonical fallback is `$5/month` / `USD` / billed-monthly label | Public display values |
| `INKWELL_PAYPAL_CHECKOUT_URL` | `src/data/content.ts` | No while paid offers are closed; fallback is `#pricing` | Public URL only; never a credential |

The landing does not consume `GEMINI_API_KEY`, `APP_URL`, or `INKWELL_SITE_URL`; those values are not part of the public configuration contract. They must not be added to the browser build. The cleaned `.env.example` contains no secret, token, or private-provider credential.

The bundled app has a separate public configuration contract. `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are browser-safe Supabase values; they are optional for the local-first free workspace and required to enable the account/magic-link path. `VITE_INKWELL_SESSION_API`, `VITE_INKWELL_CATALOG_API`, `VITE_INKWELL_ENTITLEMENT_API`, and `VITE_INKWELL_PURCHASE_API` are optional public endpoint overrides; absent values use same-origin `/api/...` paths supplied by Netlify redirects. No service-role key, PayPal secret, webhook secret, or private API credential belongs in either Vite build.

The production browser-safe Supabase variables are configured in Netlify and the auth-enabled app artifact is deployed. The publishable key is intentionally present in the browser bundle, and Netlify secret scanning omits only `VITE_SUPABASE_PUBLISHABLE_KEY` by name while scanning remains enabled for all other values. Live browser verification reached `Signed in`, preserved that state across reload, and saved `inkwell-authenticated`; no sign-out was performed after the final persistence check.

The build has no silent production-credential fallback: missing public values use documented local/product defaults only, while private credentials are not accepted by the browser build. Any future required public value must be added to `build.sh` validation and fail the build with its variable name and remediation, rather than substituting a credential or guessed production endpoint.


## Netlify project

The linked Netlify project is:

- Site: `inkwelllanding`
- Project ID: `f4e12876-23af-4d9d-b774-3bd92be07285`
- Team: `EduCraft`
- Temporary public URL: `https://inkwelllanding.netlify.app`
- Configuration: tracked `netlify.toml` in this connected GitHub CI checkout; GitHub `main` is the active Netlify CI source, Netlify runs `bash build.sh`, and publishes `dist`

No future paid domain is assumed by the build. The site serves the landing at `/`, the app at `/inkwell/app/`, and routes app API paths through the redirects in `netlify.toml`. The forced session, catalog, capabilities, and entitlement redirects target `https://inkwell-entitlement-worker.teachtylerhenley.workers.dev` (including `/api/auth/session`, `/api/catalog`, `/api/capabilities`, `/api/entitlement`, `/api/entitlement/prime`, `/api/entitlement/settle`, and `/api/entitlement/recover`).

Production D1 parity tables and columns are applied on `inkwell-entitlement`: `inkwell_accounts`, `inkwell_credits`, `inkwell_settlement_receipts`, `inkwell_provider_transactions`, and `inkwell_idempotency`, including `credit_kind`, `free_day`, and `settlement_receipt_id` with the required uniqueness constraints/indexes.

Payment purchase and webhook routes remain intentionally absent/404 while sales are gated: `/api/inkwell-purchase-start`, `/api/purchase-start`, and `/api/paypal/webhook` must return HTTP 404, with `INKWELL_PAYMENTS_ENABLED=false`. No sales activation is authorized.

## Safe update procedure

1. Change landing source in this repository's tracked source files.
2. Change app source only in the separate canonical `C:/tmp/inkwell-remote` repository.
3. Confirm the app revision intended for release and regenerate `app-dist/` from that source with the host-aware mounted build: on Windows use `cmd.exe /d /c "set INKWELL_BASE=/inkwell/app/&& npm run build"`; on Bash/Netlify use `INKWELL_BASE=/inkwell/app/ npm run build`.
4. From this repository root, run `bash build.sh`.
5. Verify the generated landing and `/inkwell/app/` shell before deployment.
6. Push the reviewed change to `main`; active Netlify CI runs `bash build.sh` and publishes `dist`.
7. Run route/API/header smoke checks against the ready deploy URL, including dedicated Worker JSON 401/CORS checks and payment-route 404 checks.

Never hand-edit `dist` or `app-dist`, and never point production at an unverified app revision. Every future deployment change requires the smoke checks to pass and any payment activation to receive explicit approval; absent that approval, keep `INKWELL_PAYMENTS_ENABLED=false` and all payment routes at HTTP 404.

## Current risks and ownership gaps

- GitHub `main` is the connected and active Netlify CI source and currently builds through `bash build.sh`; keep the CI command and `netlify.toml` contract aligned.
- `app-dist` is a generated/bundled artifact with no manifest recording the source commit. The current entrypoint matches the local app build, but a future workflow should add a source-revision manifest or equivalent release metadata.
- The app repository contains an ignored `.netlify/` directory used for local deployment tooling state; it is not application source and is excluded by `.gitignore`.
- The fallback GitHub clone is not the normal deployment path and may fail where anonymous repository access or the configured credential helper is unavailable.
- The dedicated Worker source/config and production D1 are separately owned from this landing checkout; reconcile Worker and schema changes there before updating the attached Netlify redirects.
