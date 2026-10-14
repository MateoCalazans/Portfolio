# Mergulho — handoff for implementation

Portfolio of Mateo Calazans (mateo.dev). Build it exactly as specified in this folder.

## Read in this order

1. `README.md`: principles, the five worlds, color, type, layout, accessibility.
2. `dive.md`: the scroll-driven zoom. This is the core of the site; implement the algorithm as written.
3. `content.md`: every string in PT-BR and EN, links, the five Journey cards. Do not rewrite copy.
4. `components/*.md`: one guideline per component.
5. `tokens.css` (ready to import) and `tokens.json` (source of truth).
6. `prototype/Mergulho.dc.html`: the working prototype the design was approved from. It is written for a design-canvas runtime: `{{t.key}}` holes are filled from the `i18n()` object in its script, `ref="{{setX}}"` are element refs and `onClick="{{goN}}"` are click handlers. Use it as a reference for exact markup, class names and CSS values; do not ship it as is.

## Assets

- `assets/mio-geek.png`: the Mio Geek logo for the fifth Journey card.
- Fonts come from Google Fonts (link in `README.md`).

## Must-haves

- Five worlds: Surface, About, Code, Journey, Contact. Real page scroll drives the dive; no scroll hijacking.
- Works on desktop and mobile (test at 390 × 844 and 1440 × 900).
- PT / EN switch in the HUD, defaulting to the browser language, remembered in localStorage (`mc-lang`).
- `prefers-reduced-motion`: crossfade instead of zoom.
- Lighthouse performance and accessibility at 95 or above: the dive only writes transforms in a rAF scroll handler.

## Still missing (ask Mateo)

- CV file URL for the "Baixar CV ↓ / Download CV ↓" links.
- A sentence on what Mateo built at Factor Form.
- Contact form endpoint.
