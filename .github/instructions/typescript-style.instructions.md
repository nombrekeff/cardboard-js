---
description: "Use when creating or editing TypeScript files in cardboard-js. Enforces semicolons, ESM .js import paths, private member naming, and API-safe edits."
name: "Cardboard TypeScript Style"
applyTo: "**/*.ts"
---

# Cardboard TypeScript Style

Use these rules when writing or updating TypeScript in this repository.

## Hard Rules

- Always end statements with semicolons.
- For relative imports in TypeScript source, use `.js` in the import path (for ESM output compatibility).
- Prefix private class members with `_`.
- Preserve existing public API shape and naming (exports, public methods, parameter names, and externally consumed types) unless explicitly asked to change them.

## Soft Preferences

- Prefer single quotes when editing nearby lines, but avoid large quote-only rewrites.
- Prefer `import type` for type-only imports when touching an import block.

## Examples

```ts
import type { State } from './types.js';
import { CTag } from './tag.js';

class Example {
  private _value: State<string>;

  constructor(value: State<string>) {
    this._value = value;
  }

  public set(value: State<string>): void {
    this._value = value;
  }
}
```

```ts
// Avoid broad, style-only churn in untouched code.
// Keep API names stable unless the task explicitly requires a breaking change.
```