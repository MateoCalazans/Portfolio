# JourneyCard

One company or store in the Journey world: a colored panel with a giant initial (or a logo), and the text beside it. Five of them, no dates.

## Anatomy

- **Panel**: `aspect-ratio: 4 / 3`, radius-card, `overflow: hidden`, `position: relative`. A `label` at top-left (22px, 20px): the domain, or the company name when there is no site. The initial in Unbounded 800, `clamp(220px, 30vw, 440px)`, anchored at `right: -0.04em; bottom: -0.2em` so it bleeds off the panel, `aria-hidden`.
- **Logo panel** (Mio Geek only): `cream-50` ground, the logo centered at 58% width with `mix-blend-mode: multiply`, real `alt` text.
- **Text column**: category label (`label`), name (`project-name`), optional badge, description (`body`), chips, then an outline Button "Visitar loja ↗" when the store has a public link (new tab).
- **Badge** (Mio Geek): pill with 1.5px border in ember-500, `label` style, 8px dot pulsing on `t-pulse`: "Em desenvolvimento" / "In development".
- **Layout**: grid `repeat(auto-fit, minmax(min(380px, 100%), 1fr))`, gap `clamp(24px, 4vw, 56px)`, centered vertically; cards stacked with `space-10`. From 900px up, even cards put the panel on the right.

## Panel colors

| Card | Ground | Initial and label |
|---|---|---|
| E-smart Capitais | cobalt-600 | paper-50 |
| Case Mate | ember-500 | ink-900 |
| Organifi | moss-700 | moss-100 |
| Factor Form | bone-100 | ink-900 |
| Mio Geek | cream-50 | logo |

A new card gets its own ground and tint pair that passes 4.5:1 for the 12px label.

## Rules

- No dates, durations or "current" markers. The card says what the company or store is and what Mateo built there.
- Chips name what was built, not generic praise.
- Order is fixed: E-smart Capitais, Case Mate, Organifi, Factor Form, Mio Geek.
