#!/usr/bin/env bash
# Makes trailing-slash URLs (e.g. /docs/, /blog/) work on GitHub Pages.
#
# With `trailingSlash: false`, Docusaurus emits `docs.html` for the /docs route.
# GitHub Pages serves that for /docs, but /docs/ looks for `docs/index.html`
# and 404s. For every `X.html` page this script writes a tiny `X/index.html`
# that redirects to the page's canonical URL (no trailing slash), so canonical
# URLs stay unchanged and old/inbound slash links stop 404ing.
#
# Runs automatically after `yarn build` (package.json "postbuild").
set -euo pipefail

BUILD_DIR="${1:-build}"
SKIP_DIRS=("demo-apps")

if [[ ! -d "$BUILD_DIR" ]]; then
  echo "trailing-slash-redirects: build dir '$BUILD_DIR' not found" >&2
  exit 1
fi

prune_args=()
for dir in "${SKIP_DIRS[@]}"; do
  prune_args+=(-path "$BUILD_DIR/$dir" -prune -o)
done

created=0
while IFS= read -r -d '' page; do
  name="$(basename "$page" .html)"
  [[ "$name" == "index" || "$name" == "404" ]] && continue

  target_dir="${page%.html}"
  target="$target_dir/index.html"
  [[ -e "$target" ]] && continue

  canonical="$(grep -o '<link[^>]*rel="canonical" href="[^"]*"' "$page" | head -1 | sed -E 's/.*href="//;s/"$//' || true)"
  [[ -z "$canonical" ]] && continue

  mkdir -p "$target_dir"
  cat > "$target" <<EOF
<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="UTF-8">
<title>Redirecting...</title>
<link rel="canonical" href="$canonical">
<meta http-equiv="refresh" content="0; url=$canonical">
<script>window.location.replace("$canonical" + window.location.search + window.location.hash);</script>
</head>
<body><p>Redirecting to <a href="$canonical">$canonical</a>...</p></body>
</html>
EOF
  created=$((created + 1))
done < <(find "$BUILD_DIR" "${prune_args[@]}" -type f -name '*.html' -print0)

echo "trailing-slash-redirects: created $created redirect pages"
