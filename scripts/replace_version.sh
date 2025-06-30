#!/bin/bash

# Get the version from package.json
PKG_VERSION=$(node -p "require('./package.json').version")

# Use sed to replace the version in the Cardboard object in src/cardboard.ts
sed -i '' -E "s/(version: ')[^']*(')/\1$PKG_VERSION\2/" src/cardboard.ts

echo "Updated Cardboard version in src/cardboard.ts to $PKG_VERSION"