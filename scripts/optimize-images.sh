#!/usr/bin/env bash
# Optimizes static/assets/** and writes the result to static/assets-optimized/,
# mirroring the source directory structure. PNGs are re-encoded with sharp
# (palette quantization + max zlib compression), SVGs are minified with svgo.
# Everything else (favicons, etc.) is copied through unchanged.
#
# Usage: scripts/optimize-images.sh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_DIR="$ROOT_DIR/static/assets"
OUT_DIR="$ROOT_DIR/static/assets-optimized"
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

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

total_before=0
total_after=0
count=0

while IFS= read -r -d '' file; do
  rel_path="${file#"$SRC_DIR"/}"
  out_file="$OUT_DIR/$rel_path"
  mkdir -p "$(dirname "$out_file")"

  before=$(stat -c%s "$file")

  case "${file,,}" in
    *.png)
      "$SHARP" -i "$file" -o "$(dirname "$out_file")" -c 9 --palette -q 90 -f png >/dev/null
      ;;
    *.svg)
      "$SVGO" "$file" -o "$out_file" >/dev/null
      ;;
    *)
      cp "$file" "$out_file"
      ;;
  esac

  after=$(stat -c%s "$out_file")

  # Keep the original if "optimizing" made it bigger (can happen with tiny
  # icon-like PNGs under palette quantization).
  if [[ "$after" -ge "$before" ]]; then
    cp "$file" "$out_file"
    after="$before"
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
echo "Optimized $count files: $total_before -> $total_after bytes (-${total_saved_pct}%)"
echo "Output: $OUT_DIR"
