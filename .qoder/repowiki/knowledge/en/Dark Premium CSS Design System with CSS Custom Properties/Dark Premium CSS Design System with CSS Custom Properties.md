---
kind: frontend_style
name: Dark Premium CSS Design System with CSS Custom Properties
category: frontend_style
scope:
    - '**'
source_files:
    - style.css
    - index.html
    - about.html
    - projects.html
    - script.js
---

## Approach

The portfolio is a static site styled entirely in vanilla CSS (`style.css`, ~2397 lines) with no preprocessor, framework, or component library. The visual system is built around **CSS custom properties (design tokens)** declared in `:root` and applied via BEM-style class names across three HTML pages (`index.html`, `about.html`, `projects.html`). Typography comes from Google Fonts (`Inter` + `Space Grotesk`) loaded via `<link rel="stylesheet">`. A single shared stylesheet is linked from every page.

## Design Tokens (`:root`)

All colors, spacing, radii, fonts, easing curves, and layout constants are centralized:
- Backgrounds: `--bg` (#070b14), `--bg-elev`, `--surface`, `--surface-2`, `--line`, `--line-strong`
- Text: `--text` (#e8eefc), `--muted` (#93a4bd)
- Accent palette: `--teal` (#2dd4bf), `--cyan` (#22d3ee), `--indigo` (#818cf8)
- Gradient: `--grad = linear-gradient(115deg, #2dd4bf, #22d3ee, #818cf8)`
- Radii: `--radius` (20px), `--radius-sm` (14px)
- Fonts: `--font-body` (Inter), `--font-display` (Space Grotesk)
- Easing: `--ease = cubic-bezier(0.22, 0.68, 0.22, 1)`
- Layout: `--header-h` (88px), `--container` (1160px)

## Methodology & Conventions

- **BEM-like naming**: block classes (`.hero`, `.card`, `.btn`, `.marquee`), modifiers via `--primary`, `--ghost`, `--sm`, `--one`, `--two`, `--tight`, `--a`, `--b`.
- **Utility classes**: `.container`, `.section`, `.section--tight`, `.eyebrow`, `.chip-row`, `.chip`, `.grad-text`, `.svg-sprite`, `.skip-link`.
- **Component variants**: buttons use `.btn` + modifier (`btn--primary`, `btn--ghost`, `btn--sm`); cards use `.card`; chips use `.chip`.
- **CSS variables on elements**: inline `style="--d:140ms"` / `--tint:...` / `--cx/--cy` drive per-element animation delays, color tints, and mouse-follow glow effects — keeping behavior out of JS.
- **Responsive strategy**: fluid typography via `clamp()` (headings, section padding, gaps), percentage/vw units for blobs and hero grid, `minmax(0, 1fr)` grid columns, and `width: min(var(--container), 92vw)` for the container.
- **Animations**: keyframes defined in CSS (`drift`, `blink`, `spinSlow`, `float`, `cue`, `marquee`) — JS only toggles state classes like `.is-scrolled`, `.nav-open`, and adds `.reveal` for scroll-triggered transitions.
- **Icons**: inline SVG sprite defined once in each HTML page under an `<svg class="svg-sprite">` with `<symbol>` elements; icons are referenced via `<use href="#i-*">`.
- **Background atmosphere**: fixed `.bg-canvas` with a subtle grid pattern plus three animated `.blob` elements using radial gradients and blur filters.
- **Accessibility**: skip link (`.skip-link`), `aria-current="page"` on active nav links, `aria-label` on icon-only buttons/links, `focus-visible` outline using `--teal`, semantic `<header>/<main>/<footer>/<section>` structure.
- **Scroll progress bar**: `.progress span` whose width is driven by JS; header gains `.is-scrolled` for glassmorphism backdrop blur.
- **Typography**: body uses Inter at 1rem / 1.65 line-height; display headings use Space Grotesk with tight letter-spacing (-0.025 to -0.035em).
- **Custom scrollbar**: themed via `::-webkit-scrollbar` pseudo-elements matching the dark palette.

## Key Files

- `style.css` — entire design system, tokens, components, sections, animations
- `index.html` — primary page demonstrating all components (hero, marquee, cards, split intro, work grid, contact, footer)
- `about.html`, `projects.html` — reuse the same stylesheet and token system
- `script.js` — DOM interactions (scroll progress, mobile nav toggle, reveal-on-scroll, typed text effect)
- `vendor/typed.umd.js` — third-party typing animation library
- `img/` — assets referenced by the UI (portrait, gallery images)

## Constraints Observed

- No CSS framework or preprocessor is used — styles are plain CSS.
- All global style lives in the single `style.css`; there are no per-page stylesheets.
- Colors, radii, fonts, easing, and layout dimensions are exclusively accessed through `--*` custom properties rather than hard-coded values in selectors.
- Interactive states (hover, focus-visible, scrolled, nav-open) are expressed as CSS classes toggled by JavaScript, not via CSS-only state mechanisms.
- Icons are always sourced from the inline SVG sprite via `<use>`, never as external image files.