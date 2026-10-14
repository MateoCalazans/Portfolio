# Hero

Level 00, the Surface: the first screen. Status, the name with its portal O, role, tagline, two actions and the scroll hint.

## Anatomy (top to bottom, one viewport tall, `space-between`)

- **Top bar**: wordmark "MC." (Unbounded 800 20px, the dot in ember-500) + "mateo.dev" (`nav` style); the four level links in `nav` style (hidden under 760px); a compact outline Button "Baixar CV ↓".
- **Status**: `label` in ember-500 with a pulsing 8px dot: "Disponível para trabalho".
- **Name**: `<h1 aria-label="Mateo Calazans">`, `name-hero` style. Line 1 "MATE" + Portal (ember-500, opens About). Line 2 "CALAZANS" at 0.42em, weight 300.
- **Role and tagline**: "Theme Architect." in `role` style with a blinking caret (`t-caret`, steps(1)); the tagline in `body`, stone-300.
- **Actions**: Solid "Ver trajetória" (jumps to level 03), Outline "Entrar em contato" (jumps to 04).
- **Scroll hint**: `label` in stone-300 with a 16px stroke arrow, floating on `t-bob`: "Role para mergulhar — cada O é uma porta".

## Rules

- The hero is the Surface world's whole content, so its reading length is zero and the first scroll goes straight into the dive.
- At rest (before any scroll) the About world is already visible, tiny, inside the O of MATEO. That still frame is the site's thumbnail.
