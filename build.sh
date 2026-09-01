#!/usr/bin/env bash
# Unified build for the Inkwell landing + app deployment.
# Runs on both Netlify (Linux) and local Windows with bash.exe on PATH.
# Always invoke via "bash build.sh" so shell parsing is consistent.

set -euo pipefail

# Anchor the landing dist path BEFORE any `cd`.
SITE_ROOT="$(pwd)"

# 1. Landing
# Under WSL/Git Bash on Windows, use Windows npm so optional native packages
# match the host. Netlify's Linux environment has no cmd.exe and uses npm.
if command -v cmd.exe >/dev/null 2>&1; then
  cmd.exe /d /c "npm ci"
else
  npm ci
fi
if command -v cmd.exe >/dev/null 2>&1; then
  cmd.exe /d /c 'set "INKWELL_BASE=/" && npm run build'
else
  INKWELL_BASE=/ npm run build
fi

# 2. App — prefer a source rebuild whenever Netlify provides the browser-safe
# Supabase key, so auth cannot silently disappear behind a stale artifact. The
# tracked app bundle remains the no-auth local fallback only.
APP_BUNDLE="$SITE_ROOT/app-dist"
APP_REPO="https://github.com/educationlessonplans/inkwell"
APP_SHA="281accc4c89c25c7970ca6dd779769059efbc58f"
APP_DIR="/tmp/inkwell-app"

if [ -d "$APP_BUNDLE" ] && [ -z "${VITE_SUPABASE_PUBLISHABLE_KEY:-}" ]; then
  echo "Using bundled app artifact at $APP_BUNDLE"
  APP_DIST="$APP_BUNDLE"
else
  rm -rf "$APP_DIR"
  GIT_TERMINAL_PROMPT=0 git -c credential.helper= clone --depth 1 --no-checkout "$APP_REPO" "$APP_DIR"
  cd "$APP_DIR"
  GIT_TERMINAL_PROMPT=0 git -c credential.helper= fetch --depth 1 origin "$APP_SHA"
  git checkout --detach "$APP_SHA"
  if command -v cmd.exe >/dev/null 2>&1; then
    cmd.exe /d /c "npm ci"
    cmd.exe /d /c 'set "INKWELL_BASE=/inkwell/app/" && npm run build'
  else
    npm ci
    INKWELL_BASE=/inkwell/app/ npm run build
  fi
  APP_DIST="$APP_DIR/dist"
fi

if [ ! -f "$APP_DIST/manifest.webmanifest" ]; then
  echo "ERROR: app artifact is missing manifest.webmanifest" >&2
  exit 1
fi

# 3. Stitch the app dist into the landing dist.
cd "$SITE_ROOT"
rm -rf "$SITE_ROOT/dist/inkwell/app"
mkdir -p "$SITE_ROOT/dist/inkwell/app"
cp -r "$APP_DIST/." "$SITE_ROOT/dist/inkwell/app/"

# The app links the mounted Vite PWA manifest; never publish a stale legacy
# manifest.json left by an older artifact build.
rm -f "$SITE_ROOT/dist/inkwell/app/manifest.json"
