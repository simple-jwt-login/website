#!/usr/bin/env bash
# Simple-JWT-Login plugin benchmarks using wrk.
#
# Usage:
#   ./benchmark.sh [options]
#
# Options (also settable as env vars):
#   -u BASE_URL     WordPress base URL, e.g. http://localhost:8080   (WRK_BASE_URL)
#   -e USERNAME     WP username for /auth                              (WRK_USERNAME)
#   -p PASSWORD     WP user password for /auth                        (WRK_PASSWORD)
#   -a AUTH_CODE    Plugin auth code, if required                     (WRK_AUTH_CODE)
#   -t THREADS      wrk thread count (default: 4)
#   -c CONNECTIONS  wrk connection count (default: 50)
#   -d DURATION     wrk duration, e.g. 30s (default: 30s)
#   -s SUITE        Comma-separated list of tests to run (default: all)
#                   Available: auth,validate_post,refresh,revoke,autologin,register,wp_posts
#   -h              Show this help

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LUA_DIR="${SCRIPT_DIR}/lua"

# ---- defaults ----------------------------------------------------------------
BASE_URL="${WRK_BASE_URL:-http://localhost:88}"
USERNAME="${WRK_USERNAME:-admin}"
PASSWORD="${WRK_PASSWORD:-admin}"
AUTH_CODE="${WRK_AUTH_CODE:-}"
THREADS="${WRK_THREADS:-4}"
CONNECTIONS="${WRK_CONNECTIONS:-50}"
DURATION="${WRK_DURATION:-30s}"
SUITE="${WRK_SUITE:-auth,validate_post,refresh,wp_posts}"

# ---- argument parsing --------------------------------------------------------
while getopts "u:e:p:a:t:c:d:s:h" opt; do
    case "$opt" in
        u) BASE_URL="$OPTARG" ;;
        e) USERNAME="$OPTARG" ;;
        p) PASSWORD="$OPTARG" ;;
        a) AUTH_CODE="$OPTARG" ;;
        t) THREADS="$OPTARG" ;;
        c) CONNECTIONS="$OPTARG" ;;
        d) DURATION="$OPTARG" ;;
        s) SUITE="$OPTARG" ;;
        h) grep '^#' "$0" | sed 's/^# \?//'; exit 0 ;;
        *) echo "Unknown option: -$opt"; exit 1 ;;
    esac
done

# ---- sanity checks -----------------------------------------------------------
if ! command -v wrk &>/dev/null; then
    echo "ERROR: wrk is not installed. Install it with:"
    echo "  Ubuntu/Debian: sudo apt install wrk"
    echo "  macOS:         brew install wrk"
    exit 1
fi

if ! command -v jq &>/dev/null; then
    echo "ERROR: jq is not installed. Install it with:"
    echo "  Ubuntu/Debian: sudo apt install jq"
    echo "  macOS:         brew install jq"
    exit 1
fi

API_BASE="${BASE_URL}/wp-json/simple-jwt-login/v1"
WP_API="${BASE_URL}/wp-json/wp/v2"

# ---- fetch JWT and refresh token at startup ----------------------------------
fetch_tokens() {
    echo "  Authenticating as ${USERNAME} with password $PASSWORD ..."

    local body
    if [[ -n "$AUTH_CODE" ]]; then
        body=$(printf '{"login":"%s","password":"%s","AUTH_CODE":"%s"}' "$USERNAME" "$PASSWORD" "$AUTH_CODE")
    else
        body=$(printf '{"login":"%s","password":"%s"}' "$USERNAME" "$PASSWORD")
    fi

    local response curl_exit=0
    response=$(curl -s -X POST \
        -H "Content-Type: application/json" \
        -d "$body" \
        "${API_BASE}/auth") || curl_exit=$?

    if [[ $curl_exit -ne 0 || -z "$response" ]]; then
        echo "ERROR: Could not reach ${API_BASE}/auth (curl exit ${curl_exit})"
        echo "       Check that WordPress is running at ${BASE_URL}"
        exit 1
    fi

    local success
    success=$(echo "$response" | jq -r '.success // false')
    if [[ "$success" != "true" ]]; then
        echo "ERROR: Authentication failed:"
        echo "$response" | jq .
        exit 1
    fi

    JWT=$(echo "$response" | jq -r '.data.jwt // empty')
    REFRESH_TOKEN=$(echo "$response" | jq -r '.data.refresh_token // empty')

    if [[ -z "$JWT" ]]; then
        echo "ERROR: No JWT in auth response:"
        echo "$response" | jq .
        exit 1
    fi

    echo "  JWT           : ${JWT:0:30}..."
    if [[ -n "$REFRESH_TOKEN" ]]; then
        echo "  Refresh token : ${REFRESH_TOKEN:0:20}..."
    else
        echo "  Refresh token : (not enabled in plugin settings)"
    fi
}

JWT=""
REFRESH_TOKEN=""
fetch_tokens

# ---- export env vars for Lua scripts -----------------------------------------
export WRK_USERNAME="$USERNAME"
export WRK_PASSWORD="$PASSWORD"
export WRK_JWT="$JWT"
export WRK_REFRESH_TOKEN="$REFRESH_TOKEN"
export WRK_AUTH_CODE="$AUTH_CODE"

# ---- helpers -----------------------------------------------------------------
PASS_COUNT=0
SKIP_COUNT=0

run_wrk() {
    local label="$1"; shift
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  TEST: ${label}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    wrk -t"${THREADS}" -c"${CONNECTIONS}" -d"${DURATION}" "$@"
    PASS_COUNT=$((PASS_COUNT + 1))
}

suite_has() {
    local test="$1"
    [[ ",${SUITE}," == *",${test},"* ]] || [[ "${SUITE}" == "all" ]]
}

# ---- banner ------------------------------------------------------------------
echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║    Simple-JWT-Login Plugin Benchmark Suite       ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""
echo "  Base URL    : ${BASE_URL}"
echo "  API base    : ${API_BASE}"
echo "  Threads     : ${THREADS}"
echo "  Connections : ${CONNECTIONS}"
echo "  Duration    : ${DURATION}"
echo "  Suite       : ${SUITE}"
echo ""

# ---- test: POST /auth --------------------------------------------------------
if suite_has "auth"; then
    run_wrk "POST /auth (authenticate + get JWT)" \
        --script "${LUA_DIR}/auth_post.lua" \
        "${API_BASE}/auth"
fi

# ---- test: POST /auth/validate -----------------------------------------------
if suite_has "validate_post"; then
    echo ""
    echo "POST /auth/validate (validate JWT)"
    run_wrk "POST /auth/validate (body JWT)" \
        --script "${LUA_DIR}/validate_post.lua" \
        "${API_BASE}/auth/validate"
fi

# ---- test: POST /auth/refresh ------------------------------------------------
if suite_has "refresh"; then
    if [[ -z "$REFRESH_TOKEN" ]]; then
        echo ""
        echo "SKIP: refresh - refresh token not returned (enable refresh tokens in plugin settings)"
        SKIP_COUNT=$((SKIP_COUNT + 1))
    else
        run_wrk "POST /auth/refresh (exchange refresh token)" \
            --script "${LUA_DIR}/refresh_post.lua" \
            "${API_BASE}/auth/refresh"
    fi
fi

# ---- test: POST /auth/revoke -------------------------------------------------
if suite_has "revoke"; then
    echo ""
    echo "POST /auth/revoke (revoke JWT)"
    run_wrk "POST /auth/revoke (revoke JWT)" \
        --script "${LUA_DIR}/revoke_post.lua" \
        "${API_BASE}/auth/revoke"
fi

# ---- test: GET /autologin ----------------------------------------------------
if suite_has "autologin"; then
    local_url="${API_BASE}/autologin?JWT=${JWT}"
    [[ -n "$AUTH_CODE" ]] && local_url="${local_url}&AUTH_CODE=${AUTH_CODE}"
    run_wrk "GET /autologin (auto-login redirect)" "${local_url}"
fi

# ---- test: POST /users (register) -------------------------------------------
if suite_has "register"; then
    echo ""
    echo "POST /users (register user)"
    run_wrk "POST /users (register user)" \
        --script "${LUA_DIR}/register_post.lua" \
        "${API_BASE}/users"
fi

# ---- test: POST /wp/v2/posts -------------------------------------------------
if suite_has "wp_posts"; then
    echo ""
    echo "POST /wp/v2/posts (create draft post via JWT Bearer)"
    run_wrk "POST /wp/v2/posts (create draft post via JWT Bearer)" \
        --script "${LUA_DIR}/wp_posts_post.lua" \
        "${WP_API}/posts"
fi


# ---- test:GET /wp/v2/posts -------------------------------------------------
if suite_has "wp_posts"; then
    echo ""
    echo "GET /wp/v2/posts (fetch posts via JWT Bearer)"
    run_wrk "GET /wp/v2/posts (fetch posts via JWT Bearer)" \
        --script "${LUA_DIR}/wp_posts_get.lua" \
        "${WP_API}/posts"
fi

# ---- summary -----------------------------------------------------------------
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  DONE  |  ran: ${PASS_COUNT}  skipped: ${SKIP_COUNT}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
