#!/usr/bin/env bash
set -Eeuo pipefail

BASE_URL="${1:-https://inkwelllanding.netlify.app}"
BASE_URL="${BASE_URL%/}"

case "$BASE_URL" in
  http://*|https://*) ;;
  *)
    printf 'ERROR: base URL must start with http:// or https://: %s\n' "$BASE_URL" >&2
    exit 2
    ;;
esac

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

fail() {
  printf 'FAIL: %s\n' "$1" >&2
  exit 1
}

check_page() {
  local name="$1"
  local path="$2"
  local marker="$3"
  local body="$TMP_DIR/${name}.body"
  local headers="$TMP_DIR/${name}.headers"
  local status

  if ! status="$(curl -sS -L --max-time 30 -D "$headers" -o "$body" -w '%{http_code}' "$BASE_URL$path")"; then
    fail "$name request failed: $BASE_URL$path"
  fi
  [[ "$status" == "200" ]] || fail "$name returned HTTP $status: $BASE_URL$path"
  grep -Fq -- "$marker" "$body" || fail "$name response did not contain expected marker: $marker"
  printf 'PASS: %-14s HTTP 200 %s\n' "$name" "$path"
}

check_page landing / '<title>Inkwell'
check_page app-shell /inkwell/app/ '<title>Inkwell</title>'
landing_body="$TMP_DIR/landing-copy.body"
landing_copy_status="$(curl -sS -L --max-time 30 -o "$landing_body" -w '%{http_code}' "$BASE_URL/")" || fail 'landing copy request failed'
[[ "$landing_copy_status" == "200" ]] || fail "landing copy returned HTTP $landing_copy_status"
grep -Eiq 'without an account|no account is needed for local writing' "$landing_body" || fail 'landing copy omitted account-free local-writing boundary'
grep -Eiq 'paid (access|sales).*account.*(server|verif)' "$landing_body" || fail 'landing copy omitted account/server verification boundary'
if grep -Eiq 'no signup|no account required|no subscriptions|unlimited offline analyses' "$landing_body"; then
  fail 'landing copy contains a stale account, subscription, or offline-analysis claim'
fi
printf 'PASS: %-14s account boundary and stale-claim checks\n' 'landing-copy'
check_page app-deep-route /inkwell/app/projects/smoke '<title>Inkwell</title>'

manifest_body="$TMP_DIR/manifest.body"
manifest_headers="$TMP_DIR/manifest.headers"
manifest_status="$(curl -sS -L --max-time 30 -D "$manifest_headers" -o "$manifest_body" -w '%{http_code}' "$BASE_URL/inkwell/app/manifest.webmanifest")" || fail 'manifest request failed'
[[ "$manifest_status" == "200" ]] || fail "manifest returned HTTP $manifest_status"
grep -Eiq '"name"[[:space:]]*:[[:space:]]*"Inkwell"' "$manifest_body" || fail 'manifest did not identify Inkwell'
grep -Eiq '"description"[[:space:]]*:[[:space:]]*"Inkwell — a private, local-first writing studio for serious fiction writers\."' "$manifest_body" || fail 'manifest description drifted from local-first product metadata'
grep -Eiq '"start_url"[[:space:]]*:[[:space:]]*"/inkwell/app/"' "$manifest_body" || fail 'manifest start_url was not mounted at /inkwell/app/'
grep -Eiq '"scope"[[:space:]]*:[[:space:]]*"/inkwell/app/"' "$manifest_body" || fail 'manifest scope was not mounted at /inkwell/app/'
grep -Eiq '"theme_color"[[:space:]]*:[[:space:]]*"#8B261D"' "$manifest_body" || fail 'manifest theme color drifted from the app shell'
grep -Eiq '^content-type:[[:space:]]*application/(manifest\+json|json)' "$manifest_headers" || fail 'manifest content type was not application/manifest+json or application/json'
printf 'PASS: %-14s HTTP 200, metadata, mount path, and valid content type\n' 'manifest'

check_page service-worker /inkwell/app/sw.js 'precacheAndRoute'

api_body="$TMP_DIR/api.body"
api_status="$(curl -sS -L --max-time 30 -o "$api_body" -w '%{http_code}' "$BASE_URL/api/catalog")" || fail 'anonymous catalog request failed'
case "$api_status" in
  401|403|405)
    ;;
  *)
    fail "anonymous catalog returned unexpected HTTP $api_status; expected 401, 403, or 405"
    ;;
esac
if grep -Eiq '<!doctype|<html' "$api_body"; then
  fail 'anonymous catalog response was an HTML page, indicating a missing API proxy'
fi
printf 'PASS: %-14s HTTP %s anonymous response (not an SPA fallback)\n' 'anonymous-api' "$api_status"
check_anonymous_api() {
  local name="$1"
  local path="$2"
  local body="$TMP_DIR/${name}.body"
  local status

  status="$(curl -sS -L --max-time 30 -o "$body" -w '%{http_code}' "$BASE_URL$path")" || fail "$name request failed: $BASE_URL$path"
  case "$status" in
    401|403|405)
      ;;
    *)
      fail "$name returned unexpected HTTP $status; expected 401, 403, or 405"
      ;;
  esac
  if grep -Eiq '<!doctype|<html' "$body"; then
    fail "$name response was an HTML page, indicating a missing API proxy"
  fi
  printf 'PASS: %-14s HTTP %s anonymous response (not an SPA fallback)\n' "$name" "$status"
}

check_anonymous_api auth-session /api/auth/session
check_anonymous_api entitlement /api/entitlement
check_anonymous_api capabilities /api/capabilities


check_disabled_endpoint() {
  local name="$1"
  local path="$2"
  local body="$TMP_DIR/${name}.body"
  local status

  status="$(curl -sS -L --max-time 30 -H 'content-type: application/json' --data '{}' -o "$body" -w '%{http_code}' "$BASE_URL$path")" || fail "$name request failed: $BASE_URL$path"
  [[ "$status" == "404" ]] || fail "$name returned HTTP $status; paid routes must remain disabled"
  printf 'PASS: %-14s HTTP 404 (disabled) %s\n' "$name" "$path"
}

check_disabled_endpoint purchase-start /api/inkwell-purchase-start
check_disabled_endpoint legacy-purchase /api/purchase-start
check_disabled_endpoint paypal-webhook /api/paypal/webhook

printf 'Smoke checks passed for %s\n' "$BASE_URL"
