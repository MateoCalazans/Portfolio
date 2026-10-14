# DepthHud

The fixed navigation: a narrow dark pill on the right edge with the language switch, one dot per level and the depth readout.

## Anatomy (top to bottom)

- **Language**: two stacked `<button>`s, PT and EN, 32 × 28px, `hud` style. The active one at opacity 1, the other at 0.45, `aria-pressed`.
- **Divider**: 14 × 1px, bone at 30%.
- **Stops**: five `<button>`s, 32 × 30px, each an 8px dot with a 1.5px `currentColor` ring. The current level's dot is filled bone-100 and at opacity 1; others are hollow at 0.55. `aria-label`: "Ir para Código" / "Go to Code".
- **Hover label**: on hover or focus, a chip slides in 12px to the left of the dot: `hud-tip` ground, bone text, `hud` style uppercase, radius-pill, "02 CÓDIGO". It is `aria-hidden` (the button already has the label).
- **Depth**: `depth` style, `writing-mode: vertical-rl; transform: rotate(180deg)`, opacity 0.75: "PROFUNDIDADE −0500 M". The number updates every frame from the dive (`depth-step` × progress, four digits).

## Rules

- Position: `absolute` inside the sticky stage, `right: 14px` (8px under 760px), vertically centered.
- Ground `hud-glass` + `backdrop-filter: blur(10px)`, ring `hud-ring`, radius-pill, padding 8px 4px. It reads on every world, so it never changes color with the theme.
- The page's right gutter (`gutter-right`) keeps all content clear of it.
- Under 760px hide the depth readout; the hover label is not shown on touch.
- The current dot switches when a dive passes its halfway point.
