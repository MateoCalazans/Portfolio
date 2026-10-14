# Mergulho

The design system of **mateo.dev**, the portfolio of Mateo Calazans, Shopify developer and software engineer from Natal, Brazil.

The site is a dive. Each section is a world with its own color. You read a world by scrolling normally, and when it ends, the name of the next world appears in huge type. Its letter **O** is a window into that next world: keep scrolling and the camera zooms through the O until the new world fills the screen. Five levels, from the surface to the bottom.

> Every O is a door. / Cada O é uma porta.

The reference prototype lives in the Design canvas "Portfolio Redesign — Mateo Calazans", artboards **Mergulho 2.0 · Desktop** and **Mergulho 2.0 · Mobile**. When this system and the prototype disagree, this system wins.

## How to build from this system

Read these in order before writing code:

1. This README: the principles and rules.
2. **Dive mechanics** (`dive.md`): the scroll mapping, the zoom math and the exact DOM structure. The dive is the product; implement it exactly.
3. **Content** (`content.md`): every string in PT-BR and EN, links and data. Do not rewrite copy.
4. The component guidelines (Components tab), then `tokens.json`.

Stack is free. The prototype is plain DOM plus one script, so a single static page, Astro, Next.js or a Shopify-style Liquid theme all work. Two rules hold in any stack:

- Drive the dive by writing `transform` directly to elements in a `requestAnimationFrame` scroll handler. Never re-render a component tree on every scroll frame.
- Use real scroll. The page height is set so the browser's own scrolling (wheel, touch, keyboard, scrollbar) drives everything. No scroll hijacking, no wheel listeners, no `preventDefault` on scroll.

## The five worlds

Every level is a theme in `tokens.json`. Put `data-theme="<id>"` on the world element and use `--world-bg`, `--world-ink`, `--world-muted`, `--world-next`.

| Level | Theme id | Ground | Ink | Title (PT / EN) | Holds |
|---|---|---|---|---|---|
| 00 | `surface` | ink-900 | bone-100 | MATEO CALAZANS | Hero: status, name, role, tagline, CTAs |
| 01 | `about` | ember-500 | ink-900 | S◯BRE / AB◯UT | Statement, bio, facts, education |
| 02 | `code` | bone-100 | ink-900 | C◯DIGO / C◯DE | Stack ticker, three skill groups |
| 03 | `journey` | ink-900 | bone-100 | TRAJET◯RIA / J◯URNEY | Five company and store cards |
| 04 | `contact` | lime-300 | ink-900 | C◯NTATO / C◯NTACT | Contact list, form, back to surface |

The sequence alternates light and dark so each dive is a visible change. `world-next` is always the following world's ground: it fills the portal, so before you dive you already see the color you are diving into.

## Principles

**One big move.** The dive is the only spectacular motion. Everything else is small and quiet: a pulsing dot, a blinking caret, a slow ticker, 2px button lifts. Do not add parallax, reveal-on-scroll or entrance animations inside a world; the world must read like a normal page.

**Content first.** Each world is a complete, readable section. A recruiter who never notices the dive still gets the whole portfolio by scrolling.

**Type is the image.** No photos, no illustrations. Scale, weight and the O motif carry the identity. Titles are always uppercase Unbounded at the largest size that fits one line. Journey panels show a giant initial; the only real logo is Mio Geek's, because it is Mateo's own brand.

**Lines, not shadows.** Borders are 1.5px in `currentColor`. Cards are outlined, never filled grey, never shadowed. The only shadow is the HUD hairline.

**Flat color fields.** Every world is one solid ground. No gradients, no textures, no tints of the ground.

## Color

- Text uses `world-ink`; secondary text uses `world-muted`. Every pair passes 4.5:1 on its ground.
- `ember-500` is the brand accent and the one color a person may retune (the prototype exposes it as a tweak). If it changes, the About world, the hero portal, the Case Mate panel and the In development badge change with it.
- Journey panels have their own pairs: E-smart Capitais `cobalt-600`/`paper-50`, Case Mate `ember-500`/`ink-900`, Organifi `moss-700`/`moss-100`, Factor Form `bone-100`/`ink-900`, Mio Geek `cream-50` with its logo.
- Never place ember text on bone or lime: use it only as a ground, a dot or a badge on ink.

## Typography

Three Google Fonts families, loaded with one link:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@300..900&family=Instrument+Sans:wght@400..700&family=IBM+Plex+Mono:wght@400;500&display=swap">
```

- **Unbounded** (display): the name, level titles, portal words, statements, numbers, card titles, the ticker. Tight tracking (−0.03 to −0.05em), line-height 0.88–1.15.
- **Instrument Sans** (body): paragraphs, list items, buttons, contact rows.
- **IBM Plex Mono** (utility): every label, always uppercase with 0.08em tracking.

Sizes are fluid. Each type style's usage note gives its `clamp()` or `min()` formula; the token value is the size at 1440 × 900. Level titles and portal words size themselves from their letter count with the `--len` custom property so they always fit on one line.

## Layout

- Left gutter `clamp(20px, 4vw, 56px)`. Right gutter `clamp(64px, 7vw, 104px)`, 52px under 760px. The right gutter belongs to the HUD: no text, button or rule may enter it. The only exception is the full-bleed stack ticker, which passes under the HUD on purpose.
- Grids collapse with `repeat(auto-fit, minmax(min(<n>px, 100%), 1fr))`: 340px for split rows, 280px for skill groups, 380px for Journey cards, 150px for facts.
- Journey cards alternate from 900px up: the panel sits left on odd cards and right on even ones.
- Each world except Contact ends with a portal line exactly one viewport tall, with the portal word centered. This places the portal at the screen center when the world's scroll ends.
- Breakpoint 760px: the hero top links hide (the HUD replaces them), the HUD loses its depth readout.

## The O motif

- **Portal**: a filled disc, `0.74em`, in `world-next`, replacing the O of a word. It is a real `<button>` that jumps to the next level. Used in the hero name and in every portal word.
- **Ring**: an outlined disc, `0.74em`, border `0.13em` in `currentColor`, replacing the O of a level title. It is decorative: it marks where you came in.
- A level name must contain an O in both languages. In English the career level is **Journey** for that reason. Any new section must find a name with an O in PT and EN.

## Iconography

No icon set. Arrows are text glyphs in the body or mono face: ↓ (scroll, download), ↗ (external link), ↑ (back to surface). The one drawn icon is the scroll-hint arrow, a 16px inline stroke SVG at 1.6px. Never emoji.

## Assets

- **Logos / mio-geek.png**: the Mio Geek logo (black marker on cream, 300 × 256). Draw it at 58% of its panel's width on `cream-50` with `mix-blend-mode: multiply`. No other brand logos are used.

## Voice

- PT-BR is the primary language, EN the second. First person, direct, short sentences. Technical names stay in English in both (Shopify Functions, Metaobjects, Core Web Vitals).
- Labels name the level and its depth: "Nível 02 — Habilidades · −500 m".
- No dates or durations anywhere in Journey: each card says what the company or store is and what Mateo built there.
- Calls to action are verbs: Ver trajetória, Entrar em contato, Visitar loja ↗, Baixar CV ↓.

## Language switch

PT and EN live in the HUD. First visit follows `navigator.language` (pt → PT, anything else → EN); the choice is then stored in `localStorage` under `mc-lang`. Switching re-measures the layout (word lengths change) and keeps the reader at the start of the level they were on. Set `document.documentElement.lang` to `pt-BR` or `en`.

## Accessibility

- Every portal and HUD dot is a `<button>` with an `aria-label` ("Mergulhar: Código" / "Dive in: Code", "Ir para Contato" / "Go to Contact").
- The hero `<h1>` carries `aria-label="Mateo Calazans"` because its O is a button.
- `prefers-reduced-motion: reduce` replaces the zoom with a crossfade between worlds and stops the ticker, pulse, caret and bob. The scroll mapping stays the same.
- Only the current world receives pointer events; worlds that are not visible get `visibility: hidden` so they leave the tab order.
- Focus rings are 1–2px `currentColor` outlines. Touch targets are at least 32px in the HUD and 44px elsewhere.

## Data still missing

- The CV file URL for every "Baixar CV ↓ / Download CV ↓" link.
- A sentence on what Mateo built at Factor Form (the card currently describes the brand only).
- A real endpoint for the contact form.
