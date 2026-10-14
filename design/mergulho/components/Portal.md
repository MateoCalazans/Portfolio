# Portal

The O that leads to the next world: a filled disc that replaces the letter O inside a word and works as a button.

## Anatomy

- **Portal word**: the next world's name, uppercase Unbounded 800, one line, centered (`portal-word` style). The O is replaced by the portal.
- **Portal**: `<button class="portal">`, `width` and `height` `0.74em` (`portal-size`), `border-radius: 50%`, `vertical-align: -0.005em`, `margin: 0 0.03em`, `background: var(--world-next)`, no border, `cursor: zoom-in`.
- **Portal line**: the block that ends every world except Contact. Exactly one viewport tall (`min-height: 100vh`), content centered vertically and horizontally, gap 22px: a mono label ("Próximo nível · 02 · −500 m"), the portal word, a mono hint ("↓ Continue rolando para mergulhar") that floats 7px on `t-bob`.

## Rules

- The portal's fill is always `world-next`, the ground of the level it opens. In the hero it is `ember-500`, the About ground.
- Size the word with `--len` (letter count): `font-size: min(calc(84vw / (var(--len) * 0.95)), 22vh)`. It must never wrap.
- Hover and focus draw a ring outside the disc: `box-shadow: 0 0 0 0.05em currentColor` over `t-portal` with `ease-out`.
- Clicking scrolls to the start of the next level (see Dive mechanics). `aria-label`: "Mergulhar: <Level>" / "Dive in: <Level>".
- The dive measures the portal's center from `offsetLeft`/`offsetTop`, so no positioned element may sit between the portal and the world's `.content`.

## The consumer provides

The word split around its O (`a`, `b`), its `len`, the next level's number and depth, and the click handler.
