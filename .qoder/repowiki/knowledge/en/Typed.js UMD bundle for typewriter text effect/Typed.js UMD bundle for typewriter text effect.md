---
kind: external_dependency
name: Typed.js UMD bundle for typewriter text effect
slug: typed-js
category: external_dependency
category_hints:
    - vendor_identity
scope:
    - '**'
source_files:
    - vendor/typed.umd.js
---

### Identity
Typed.js, included as the UMD bundle `vendor/typed.umd.js` (9.8 KB).

### Role in this repo
Provides the typewriter-style animated text effect used on the portfolio pages; loaded as a plain script alongside `script.js`.

### Integration notes
- Bundled locally under `vendor/`; no package manager is used — add/update the file manually.
- Confirm the exact initialization API against the official Typed.js docs when upgrading the bundle.