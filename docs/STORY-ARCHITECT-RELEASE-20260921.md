# Story Architect - Netlify free-domain release

Source: `educationlessonplans/inkwell` commit `9e447405b022506f7de8bb30875e0fa28c9e89d3` on `feature/story-architect-foundation`; built with `INKWELL_BASE=/inkwell/app/`. The generated app bundle is tracked in this landing repository under `app-dist/`, then copied into `dist/inkwell/app/` by `bash build.sh`. The fallback source pin in `build.sh` matches this artifact.

Public site: `https://inkwelllanding.netlify.app/inkwell/app/` (`inkwelllanding` Netlify project). The separate `theinkwellapp` Netlify project and the expired custom domain are not the public release targets.

Release gates: 1,402/1,402 unit tests across 192 files; all 84 browser cases accounted for (60 passed, 24 legitimate feature skips, zero failures); TypeScript and mounted Vite/PWA build passed. Story Architect first run, autosave/resume, template creation, editable metadata, revision/undo and seven responsive browser viewports were exercised. Six exact-offset highlight categories passed without lowering the assertion. The public Supabase URL and publishable key in the rebuilt bundle were verified to match the prior production artifact without publishing their values.

Hardware limitation: no ADB device was attached; physical phone/tablet acceptance remains pending and is not implied by viewport checks.

Source provenance is available publicly at `/inkwell/app/release.json`. App entrypoint SHA-256: `226f0466e61db7b52416a8a10a18390467dc8f37f0301312d22581e384eca02b`.

The site's current active Subscription entry point denies anonymous purchase-start requests (HTTP 401); legacy purchase-start and the webhook remain disabled (HTTP 404). The updated smoke script enforces those distinct security contracts and validates the landing, app, deep link, manifest, service worker, and protected API endpoints.

Preview deploy `6ab13702f7ea85c0d93155d1` (`https://6ab13702f7ea85c0d93155d1--inkwelllanding.netlify.app`) passed the full mounted-site smoke suite: landing, app shell/deep route, manifest, service worker, anonymous API boundaries (401), anonymous purchase-start denial (401), and disabled legacy payment/webhook routes (404). The preview serves release.json for source commit `9e44740` and all six linked app assets returned HTTP 200 with correct media types. The landing TypeScript lint and self-contained offer, app-provenance and API verification passed. Production must be verified separately after publication.
