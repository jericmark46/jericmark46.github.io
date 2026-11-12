---
kind: external_dependency
name: GitHub Pages hosting for jericmark46.github.io
slug: github-pages
category: external_dependency
category_hints:
    - vendor_identity
    - client_constraint
scope:
    - '**'
source_files:
    - index.html
    - about.html
    - projects.html
---

### Identity
Static-site host: GitHub Pages, serving `https://jericmark46.github.io`.

### Role in this repo
This is a single-person portfolio site (HTML + CSS + JS) deployed directly from the repository; no build step is present.

### Integration notes
- Assets (`style.css`, `script.js`, images under `img/`) are served by GitHub Pages with a short (~10-minute) cache lifetime. A truncated download or stale browser cache can leave only part of `style.css` applied, producing the "CSS never arrived" look (inline SVGs visible, icon squares, sections stacked).
- Because of this caching behavior, asset URLs should be versioned (e.g. `?v=YYYYMMDD`) when actively iterating, so a hard reload is not required after every push.
- Verify exact cache-control headers against the current GitHub Pages docs if tuning cache behavior.