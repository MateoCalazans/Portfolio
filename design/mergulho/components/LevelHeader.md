# LevelHeader

The top of every world: a mono label row and the level title, whose O is drawn as a ring.

## Anatomy

- **Label row**: flex, `space-between`, `padding-top: 32px`, `label` style uppercase. Left: "Nível 02 — Habilidades". Right: the depth, "−500 m".
- **Level title**: `<h2>`, Unbounded 800, uppercase, nowrap, `level-title` style, `font-size: min(calc(80vw / (var(--len) * 0.95)), 22vh)`.
- **Ring**: a `<span class="o">` in place of the O: `0.74em` square, `border: 0.13em solid currentColor`, `border-radius: 50%`, `box-sizing: border-box`. Decorative, it marks the hole you came through.
- Optional **statement** under it (`statement` style, max-width 22–26ch).

## Rules

- One per world, always first in the world's content, inside the world's left and right gutters.
- The title must contain an O in both languages. If a translation has none, rename the level (Career → Journey).
- Use `world-ink` for everything; the header never uses an accent.
