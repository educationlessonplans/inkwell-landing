# Inkwell deployment ownership

Verified 2026-08-31 from this candidate checkout, the synchronized mounted artifact, and the linked Netlify project. This branch is a local staging candidate; it is not yet the connected GitHub CI source.

## Canonical sources

| Surface | Canonical source | Build identity | Public path |
| --- | --- | --- | --- |
| Marketing landing | repository root (`.`) | Vite project (`package.json`, `vite.config.ts`) | `/` |
| Inkwell web app | `C:/tmp/inkwell-remote` | Git `main`, HEAD `a145188` (`harden local readiness and entitlement boundaries`), incorporating the browser-safe auth template, Harper/PWA/source-manifest fixes, and the reviewed local readiness changes | `/inkwell/app/` |
| Unified deployed app artifact | `app-dist/` | Committed mounted output copied into the marketing build | `/inkwell/app/` |

This candidate checkout versions the landing/deployment source and the verified mounted artifact together. The canonical app code remains in the separate `C:/tmp/inkwell-remote` repository at the recorded app revision. Do not edit `app-dist` by hand.

The fallback clone revision is `a1451889c2a0fc36b1318a43ddbcf0d15e54d08f` (the pushed canonical app readiness boundary). It is a separately pinned recovery input; the bundled `app-dist` artifact remains the normal self-contained deployment input.

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

The production browser-safe Supabase variables are now configured in Netlify and the auth-enabled app artifact has been rebuilt and deployed. The key is stored as a Netlify secret and is intentionally absent from source, `.env.example`, and repository files. Live Bladebro inspection opened the magic-link callback, reached `Signed in`, preserved that state across reload, and verified sign-out returns to the magic-link form. A named Bladebro snapshot `inkwell-gmail-auth` exists, but restoring it after the Chrome reset required Google's passkey and ended at `Signed out`; persistent Gmail authentication and a fresh authenticated Inkwell-state save remain unverified.

The build has no silent production-credential fallback: missing public values use documented local/product defaults only, while private credentials are not accepted by the browser build. Any future required public value must be added to `build.sh` validation and fail the build with its variable name and remediation, rather than substituting a credential or guessed production endpoint.


## Netlify project

The linked Netlify project is:

- Site: `inkwelllanding`
- Project ID: `f4e12876-23af-4d9d-b774-3bd92be07285`
- Team: `EduCraft`
- Temporary public URL: `https://inkwelllanding.netlify.app`
- Configuration: `netlify.toml` in this candidate checkout

No future paid domain is assumed by the build. The site serves the landing at `/`, the app at `/inkwell/app/`, and routes app API paths through the redirects in `netlify.toml`.
No public purchase-start or PayPal webhook redirects are currently configured: `/api/inkwell-purchase-start`, `/api/purchase-start`, and `/api/paypal/webhook` return HTTP 404 while sales are gated. The current session, entitlement, catalog, and capability redirects remain compatibility-only routes to the legacy `limiteduses` Worker and are not accepted as Inkwell backend provenance. Do not activate payments until the dedicated production Worker, D1 schema, proof/origin configuration, and payment gate are deliberately reconciled and approved.

## Safe update procedure

1. Change landing source in this repository's tracked source files.
2. Change app source only in the separate canonical `C:/tmp/inkwell-remote` repository.
3. Confirm the app revision intended for release and regenerate `app-dist/` from that source with the host-aware mounted build: on Windows use `cmd.exe /d /c "set INKWELL_BASE=/inkwell/app/&& npm run build"`; on Bash/Netlify use `INKWELL_BASE=/inkwell/app/ npm run build`.
4. From this repository root, run `bash build.sh`.
5. Verify the generated landing and `/inkwell/app/` shell before deployment.
6. Deploy the `dist` directory through the linked Netlify project.
7. Run route/API/header smoke checks against the deploy URL.

Never hand-edit `dist` or `app-dist`, and never point production at an unverified app revision. Keep paid offers disabled until the payment activation gate in the active product-readiness checkpoint is explicitly passed.

## Current risks and ownership gaps

- This local candidate is not yet the connected GitHub CI source; pushing it and changing Netlify's stored CI settings are separate release decisions.
- `app-dist` is a generated/bundled artifact with no manifest recording the source commit. The current entrypoint matches the local app build, but a future workflow should add a source-revision manifest or equivalent release metadata.
- The app repository contains an ignored `.netlify/` directory used for local deployment tooling state; it is not application source and is excluded by `.gitignore`.
- The fallback GitHub clone is not the normal deployment path and may fail where anonymous repository access or the configured credential helper is unavailable.
