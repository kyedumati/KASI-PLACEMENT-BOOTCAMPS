#!/bin/bash
# Build a deck, validate it, export to PDF with Keynote and make contact sheets.
# Usage: ./qa.sh 2     (needs macOS with Keynote; set PPTX_SKILL to the pptx skill folder for validation)
set -e
cd "$(dirname "$0")"
n="$1"
[ -n "$PPTX_SKILL" ] && export PPTX_APPLY_THEME="$PPTX_SKILL/scripts/apply_theme.js"
node build.js "$n"
f=$(ls dist/Day-"$n"-*.pptx)
[ -n "$PPTX_SKILL" ] && python3 "$PPTX_SKILL/scripts/office/validate.py" "$f" | tail -2
mkdir -p qa && rm -f "qa/d$n.pdf"
osascript -e 'tell application "Keynote" to close every document saving no' >/dev/null 2>&1 || true
open -a Keynote "$PWD/$f"
sleep 12
osascript <<OSA
with timeout of 200 seconds
  tell application "Keynote" to export front document to (POSIX file "$PWD/qa/d$n.pdf") as PDF
end timeout
OSA
osascript -e 'tell application "Keynote" to close every document saving no' >/dev/null 2>&1 || true
python3 qa_sheets.py "qa/d$n.pdf" "d$n" | tail -1
