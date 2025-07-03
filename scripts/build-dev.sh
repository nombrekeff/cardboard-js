#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

"$SCRIPT_DIR/../node_modules/.bin/rimraf" dist
"$SCRIPT_DIR/../node_modules/.bin/tsup"

npm run build:extensions
npm run build:example