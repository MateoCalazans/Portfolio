# Button

A pill with a 1.5px outline in the world's ink, used for every action and button-styled link.

## Variants

- **Outline** (default): transparent ground, `border: 1.5px solid currentColor`, text in `world-ink`.
- **Solid**: filled with the color that contrasts the world. On ink worlds: bone-100 ground, ink-900 text, bone border ("Ver trajetória" in the hero). On lime: ink-900 ground, lime-300 text ("Baixar CV ↓", "Enviar mensagem").
- **Compact**: min-height 44px, padding 0 18px, 14px text. Only the hero's "Baixar CV ↓".

## Specs

`min-height: 52px`, `padding: 0 24px`, radius-pill, `button` style (Instrument Sans 16px 600), gap 10px between text and arrow. Hover lifts 2px over `t-hover` with `ease-out`. Focus: 2px `currentColor` outline, offset 3px.

## Rules

- Arrows are part of the label: ↗ for an external link, ↓ for download or scroll, ↑ for back to surface.
- Use a real `<a href>` for links (stores, CV, mailto) and `<button>` for in-page jumps.
- At most two buttons side by side; the stronger action is Solid.
