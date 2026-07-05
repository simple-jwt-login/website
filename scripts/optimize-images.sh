#!/usr/bin/env bash
# Optimizes static/assets/** in place. PNGs are re-encoded with sharp
# (palette quantization + max zlib compression), SVGs are minified with svgo.
# Everything else (favicons, etc.) is left untouched.
#
# Usage: scripts/optimize-images.sh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_DIR="$ROOT_DIR/static/assets"
SHARP="$ROOT_DIR/node_modules/.bin/sharp"
SVGO="$ROOT_DIR/node_modules/.bin/svgo"

if [[ ! -d "$SRC_DIR" ]]; then
  echo "Source directory not found: $SRC_DIR" >&2
  exit 1
fi

if [[ ! -x "$SHARP" || ! -x "$SVGO" ]]; then
  echo "sharp-cli / svgo not found in node_modules/.bin - run 'yarn install' first." >&2
  exit 1
fi

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

total_before=0
total_after=0
count=0

while IFS= read -r -d '' file; do
  rel_path="${file#"$SRC_DIR"/}"
  tmp_file="$TMP_DIR/$rel_path"
  mkdir -p "$(dirname "$tmp_file")"

  before=$(stat -c%s "$file")

  case "${file,,}" in
    *.png)
      "$SHARP" -i "$file" -o "$(dirname "$tmp_file")" -c 9 --palette -q 90 -f png >/dev/null
      ;;
    *.svg)
      "$SVGO" "$file" -o "$tmp_file" >/dev/null
      ;;
    *)
      after="$before"
      ;;
  esac

  # Only overwrite the source if optimizing actually made it smaller (can
  # regress with tiny icon-like PNGs under palette quantization), and skip
  # entirely for file types that were just passed through above.
  if [[ -f "$tmp_file" ]]; then
    after=$(stat -c%s "$tmp_file")
    if [[ "$after" -lt "$before" ]]; then
      mv "$tmp_file" "$file"
    else
      after="$before"
    fi
  fi

  total_before=$((total_before + before))
  total_after=$((total_after + after))
  count=$((count + 1))

  saved_pct=0
  if [[ "$before" -gt 0 ]]; then
    saved_pct=$(( (before - after) * 100 / before ))
  fi
  printf '%-70s %8d -> %8d bytes (%+d%%)\n' "$rel_path" "$before" "$after" "$((-saved_pct))"
done < <(find "$SRC_DIR" -type f -print0)

total_saved_pct=0
if [[ "$total_before" -gt 0 ]]; then
  total_saved_pct=$(( (total_before - total_after) * 100 / total_before ))
fi

echo ""
echo "Optimized $count files in place: $total_before -> $total_after bytes (-${total_saved_pct}%)"
