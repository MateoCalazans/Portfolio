# SkillGroup

A labeled list of technologies, three side by side in the Code world, under the stack ticker.

## Specs

- Label in `label` style ("01 · Ecossistema Shopify"), then a `<ul>` with no bullets.
- Each `<li>`: `list-item` style, flex `space-between` (room for an optional mono tag on the right, like `.liquid`), padding 12px 0, `border-bottom: 1px solid var(--world-rule-soft)`.
- Groups: grid `repeat(auto-fit, minmax(min(280px, 100%), 1fr))`, gap `clamp(28px, 4vw, 56px)`.

## The stack ticker (Marquee)

Full-bleed band above the groups, `aria-hidden` (the lists carry the content): 1.5px rules top and bottom, padding 18px 0, `marquee` style, items separated by "/" with a 40px gap. The track holds the list twice and translates `-50%` linearly over `t-marquee`. It stops under reduced motion. It is the one element allowed to pass under the HUD.
