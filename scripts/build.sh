#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

"$SCRIPT_DIR/../node_modules/.bin/rimraf" "$SCRIPT_DIR/../dist"

"$SCRIPT_DIR/replace_version.sh"

"$SCRIPT_DIR/../node_modules/.bin/tsc" --p "$SCRIPT_DIR/../tsconfig.json"

# Minify JavaScript files
# Commenting for now as the sub-imports do not import the minified files
# for file in "$SCRIPT_DIR/../dist"/*.js; do
#     if [[ -f "$file" && "$file" != *.min.js ]]; then
#         "$SCRIPT_DIR/../node_modules/.bin/esbuild" "$file" --minify --outfile="${file%.js}.min.js"
#     fi
# done

npm run copy:definitions
npm run build:bundle:main
npm run build:bundle:main:nomin
npm run build:docs