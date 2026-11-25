#!/usr/bin/env bash
# Lint all prose with Vale: docs, OpenAPI sources and website pages.
#
# Vale cannot read text inside JSX, so website pages (src/pages/**/*.jsx) are
# linted from the HTML that `yarn build` renders. The site is (re)built only
# when build/ is missing or older than the page/component sources.
# Extra arguments are passed through to Vale (for example --output=line).
set -euo pipefail

cd "$(dirname "$0")/.."

npx vale sync

if [[ ! -f build/index.html ]] || [[ -n "$(find src/pages src/components -newer build/index.html -print -quit)" ]]; then
  echo "Building site so website pages can be linted..."
  yarn build
fi

pages=()
while IFS= read -r src; do
  route="${src#src/pages/}"
  route="${route%.jsx}"
  route="${route%/index}"
  html="build/${route}.html"
  if [[ ! -f "$html" ]]; then
    echo "Missing rendered page for $src (expected $html)" >&2
    exit 1
  fi
  pages+=("$html")
done < <(find src/pages -name '*.jsx' | sort)

npx vale "$@" docs openapi static/openapi/v4.yaml "${pages[@]}"
