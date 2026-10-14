# Dive mechanics

How the scroll turns into the zoom. Implement this exactly; the numbers come from the `dive` tokens.

## Model

- There are N = 5 worlds: surface, about, code, journey, contact. Each world is a full-viewport box that holds its whole content in one inner element.
- The page scrolls for real. A tall root element (its height computed in script) contains one sticky stage, 100vh tall, that holds every world stacked on top of each other.
- The scroll position `y` is split into segments, one per world:
  - a **reading** segment of length `R[i] = contentHeight[i] − viewportHeight`, where the world's content slides up under a fixed viewport, like a normal page;
  - then, except for the last world, a **dive** segment of length `D = 1.4 × viewportHeight` (`dive-distance`), where the camera zooms through the portal at the end of that world.
- Total root height = `viewportHeight + Σ R[i] + (N − 1) × D`.

Because each world ends with a portal line exactly one viewport tall (word centered), at the end of a reading segment the portal sits at the center of the screen. The dive is then almost a pure zoom.

## DOM structure

```html
<div class="root" style="height: <total>px">           <!-- position: relative -->
  <div class="stage">                                     <!-- position: sticky; top: 0; height: 100vh; overflow: hidden -->
    <div class="world" data-theme="surface">              <!-- position: absolute; inset: 0 (100% × 100%); overflow: hidden; transform-origin: 0 0 -->
      <div class="content">                               <!-- position: relative; width: 100% -->
        … hero … <button class="portal"></button> …
      </div>
    </div>
    <div class="world" data-theme="about" style="visibility: hidden"> … content … portal line … </div>
    … code, journey, contact (contact has no portal) …
    <nav class="hud"> … </nav>
  </div>
</div>
```

Rules that the math depends on:

- Worlds appear in DOM order, so a deeper world paints over a shallower one.
- The portal's `offsetParent` must be the world's `.content` element. Do not add `position` to any ancestor between the portal and `.content`.
- Worlds 1–4 are clipped to a circle centered on themselves (set once per measure): `clip-path: circle(<r>px at 50% 50%)`.
- Never animate with CSS transitions on `.world` or `.content`. Write `style.transform` directly every frame.

## Measure (on load, after `document.fonts.ready`, on resize, after a language switch)

```js
const W = stage.clientWidth, H = stage.clientHeight;
const diag = Math.hypot(W, H);
const D = Math.round(H * 1.4);                       // dive-distance
for (let i = 0; i < N; i++) {
  R[i] = Math.max(0, content[i].offsetHeight - H);    // reading length
  if (i < N - 1) {
    const p = portal[i], d = p.offsetWidth;
    P[i] = { x: p.offsetLeft + d / 2, y: p.offsetTop + p.offsetHeight / 2 }; // portal center in content coords
    K[i] = Math.max(8, 1.08 * diag / d);              // zoom-floor, zoom-margin
    world[i + 1].style.clipPath = `circle(${(d / 2) * K[i]}px at 50% 50%)`;
  }
}
root.style.height = H + R.reduce((a, b) => a + b, 0) + (N - 1) * D + 'px';
```

`offsetLeft`/`offsetTop` ignore transforms, so measuring is safe at any scroll position.

## Update (on scroll, throttled to one call per animation frame)

```js
let y = -root.getBoundingClientRect().top;
y = Math.min(Math.max(y, 0), total - H);

// 1. Which world, how far into its reading (s) and its dive (t, 0..1)
let n = 0, s = 0, t = 0, rem = y;
for (let i = 0; i < N; i++) {
  n = i;
  if (rem <= R[i] || i === N - 1) { s = Math.min(rem, R[i]); t = 0; break; }
  rem -= R[i];
  if (rem < D) { s = R[i]; t = rem / D; break; }
  rem -= D;
}
const e = t * t * (3 - 2 * t);                         // smoothstep

// 2. Content scroll of every world: finished worlds sit at their end, deeper ones at their top
const sc = [...Array(N)].map((_, a) => a < n ? R[a] : a === n ? s : 0);
const Pof = k => ({ x: P[k].x, y: P[k].y - sc[k] });   // portal center in world coords
const C = { x: W / 2, y: H / 2 };

// 3. Transform of world n: scale K^e around its portal, which travels to the screen center
const tr = [];
if (n < N - 1) {
  const Pn = Pof(n), sn = Math.pow(K[n], e);
  const sx = Pn.x + (C.x - Pn.x) * e, sy = Pn.y + (C.y - Pn.y) * e;
  tr[n] = { s: sn, ax: sx - sn * Pn.x, ay: sy - sn * Pn.y };
} else tr[n] = { s: 1, ax: 0, ay: 0 };

// 4. Deeper worlds: each sits inside the previous portal at 1/K scale
for (let f = n; f < N - 1; f++) {
  const A = tr[f], Pf = Pof(f);
  tr[f + 1] = { s: A.s / K[f], ax: A.ax + A.s * (Pf.x - C.x / K[f]), ay: A.ay + A.s * (Pf.y - C.y / K[f]) };
}
// 5. Shallower worlds: each is K times bigger than the next, around its own portal
for (let b = n - 1; b >= 0; b--) {
  const B = tr[b + 1], Pb = Pof(b), sb = B.s * K[b];
  tr[b] = { s: sb, ax: B.ax - sb * (Pb.x - C.x / K[b]), ay: B.ay - sb * (Pb.y - C.y / K[b]) };
}

// 6. Write
const cur = t > 0.5 ? n + 1 : n;                      // the world that owns the pointer and the HUD dot
for (let w = 0; w < N; w++) {
  world[w].style.visibility = (w >= n - 1 && w <= n + 1) ? 'visible' : 'hidden';
  world[w].style.transform = `translate(${tr[w].ax}px, ${tr[w].ay}px) scale(${tr[w].s})`;
  world[w].style.pointerEvents = w === cur ? 'auto' : 'none';
  content[w].style.transform = `translate(0px, ${-sc[w]}px)`;
}
hudDepth.textContent = String(Math.round((n + e) * 250)).padStart(4, '0');  // depth-step
```

Use 2D `translate()` and `scale()`, not `translate3d`: 3D transforms promote layers that rasterize once and blur when zoomed.

## Navigation

The start of world i in scroll space is `Σ_{k<i} (R[k] + D)`. Every jump (HUD dots, portals, hero CTAs: "Ver trajetória" → 3, "Entrar em contato" → 4, "Voltar à superfície" → 0) scrolls the window there:

```js
const top = root.getBoundingClientRect().top + window.scrollY;
window.scrollTo({ top: top + start(i), behavior: reduced ? 'auto' : 'smooth' });
```

A smooth scroll passes through every dive on the way, which is intended.

## Scrolljacking (changed after the handoff, at Mateo's request)

This replaces "no scroll hijacking" above, at world edges only. Reading inside a world stays plain scroll. At the end of a world's reading, one gesture down (wheel, trackpad, swipe of 12px or more, ArrowDown, PageDown, Space) plays the whole dive to the start of the next world in 1.2 s; at the start of a world, one gesture up plays it back to the end of the previous one. The scroll is animated with `window.scrollTo`, linear for one dive (the zoom's smoothstep eases it) and ease-in-out for longer HUD jumps. While a dive runs, wheel, touchmove and scroll keys are prevented; wheel events less than 200 ms apart count as the same gesture, so trackpad inertia never triggers a second dive. A swipe is decided on its first move: only a swipe that starts at a world's edge, heading out of it, becomes a dive, and its first move is cancelled so no momentum starts. Any other swipe is never cancelled, momentum included. A scroll that stops inside a dive by other means (momentum, scrollbar drag) is finished in its last direction, but only after 150 ms without scroll events and with no finger down; starting a dive while momentum still moves the page makes the two fight and the page bounces. Under reduced motion the same gesture plays a 450 ms crossfade.

## Reduced motion

With `prefers-reduced-motion: reduce`: no clip-path, every world at identity transform, world n at opacity 1 and world n+1 at opacity `e`. The scroll mapping and navigation do not change.

## Canvas or static preview

When the page cannot scroll (a thumbnail, a fixed frame), the result of `update()` at `y = 0` is the hero with the About world already visible, tiny, inside the O of MATEO. That is the intended still frame.

## Performance checklist

- One scroll listener, `{ passive: true }`, throttled with `requestAnimationFrame`.
- Only worlds n−1, n and n+1 are visible; the rest are `visibility: hidden`.
- No layout reads inside `update()` except `root.getBoundingClientRect()`.
- Re-measure with a `ResizeObserver` on the stage, not on every scroll.
