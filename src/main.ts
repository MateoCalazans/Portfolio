import "./styles/tokens.css";
import "./styles/site.css";
import { strings, type Lang, type Strings } from "./i18n";

// The dive, implemented as written in design/mergulho/dive.md, with one change made after the
// handoff: the dive is not part of the page scroll. "Dive space" is the scroll space of dive.md
// (every world's reading plus a dive between each pair), and the update() math runs on it as is.
// But the page itself is only as tall as the current world's reading: the page scroll moves through
// that reading, and a dive is an animation in time that ends by swapping in the next world's height.
// Touch momentum and the mobile browser bars can then never move the page through a dive.

const N = 5;
const DIVE = 1.4; // dive-distance, in viewport heights
const ZOOM_FLOOR = 8;
const ZOOM_MARGIN = 1.08;
const DEPTH_STEP = 250;

interface Point { x: number; y: number }
interface Transform { s: number; ax: number; ay: number }
interface Measure { W: number; H: number; R: number[]; P: Point[]; K: number[]; D: number }

const root = document.querySelector<HTMLElement>(".root")!;
const stage = document.querySelector<HTMLElement>(".stage")!;
const worlds = Array.from(document.querySelectorAll<HTMLElement>(".world"));
const contents = worlds.map((w) => w.querySelector<HTMLElement>(":scope > .content")!);
const portals = worlds.slice(0, N - 1).map((w) => w.querySelector<HTMLElement>(".pline .portal, .hero .portal")!);
const depthEl = document.querySelector<HTMLElement>("[data-depth]")!;
const stops = Array.from(document.querySelectorAll<HTMLButtonElement>(".stop"));
const langButtons = Array.from(document.querySelectorAll<HTMLButtonElement>(".lg"));

const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
let reduced = motion.matches;
let m: Measure | null = null;
let cur = 0;
let world = 0; // the world whose reading the page scroll holds right now
let animY: number | null = null; // dive-space position while a dive animates, null at rest
const scales: number[] = new Array(N).fill(1); // last written scale of each world, to map focus positions

const scrollY0 = () => root.getBoundingClientRect().top + window.scrollY;

function starts(): number[] {
  const out: number[] = [];
  let y = 0;
  for (let i = 0; i < N; i++) { out.push(y); y += m!.R[i] + m!.D; }
  return out;
}

/** Where scroll position y falls: world n, reading offset s, dive progress t (0..1). */
function locate(y: number) {
  const { R, D } = m!;
  let n = 0, s = 0, t = 0, rem = y;
  for (let i = 0; i < N; i++) {
    n = i;
    if (rem <= R[i] || i === N - 1) { s = Math.min(rem, R[i]); t = 0; break; }
    rem -= R[i];
    if (rem < D) { s = R[i]; t = rem / D; break; }
    rem -= D;
  }
  return { n, s, t };
}

/** How far the page has scrolled into the current world's reading. */
function readOffset(): number {
  return Math.min(Math.max(-root.getBoundingClientRect().top, 0), m!.R[world]);
}

/** The position in dive space: the animation while diving, else the current world's reading. */
function currentY(): number {
  return animY ?? starts()[world] + readOffset();
}

/** Rest at dive-space position `y`: make the page as tall as that world's reading and scroll to it. */
function place(y: number) {
  let { n, s, t } = locate(y);
  if (t >= 0.5) { n += 1; s = 0; } // a resting position inside a dive goes to its nearer edge
  world = n;
  root.dataset.world = String(n);
  root.style.height = m!.H + m!.R[n] + "px";
  window.scrollTo(0, scrollY0() + s);
  update();
}

function measure(keep: "progress" | "level" = "progress") {
  const W = stage.clientWidth, H = stage.clientHeight;
  if (!W || !H) return;

  // Remember where the reader is, so a re-measure doesn't move them.
  let prev = { n: 0, f: 0 };
  if (m) {
    stopDive();
    const p = locate(currentY());
    prev = keep === "level" ? { n: cur, f: 0 } : { n: p.n, f: m.R[p.n] ? p.s / m.R[p.n] : 0 };
  }

  const diag = Math.hypot(W, H);
  const D = Math.round(H * DIVE);
  const R: number[] = [], P: Point[] = [], K: number[] = [];
  for (let i = 0; i < N; i++) {
    R[i] = Math.max(0, contents[i].offsetHeight - H);
    if (i < N - 1) {
      const p = portals[i], d = p.offsetWidth;
      P[i] = { x: p.offsetLeft + d / 2, y: p.offsetTop + p.offsetHeight / 2 };
      K[i] = Math.max(ZOOM_FLOOR, (ZOOM_MARGIN * diag) / d);
      worlds[i + 1].style.clipPath = reduced ? "none" : `circle(${((d / 2) * K[i]).toFixed(1)}px at 50% 50%)`;
    }
  }
  m = { W, H, R, P, K, D };
  place(starts()[prev.n] + prev.f * R[prev.n]);
}

function update() {
  if (!m) return;
  const { W, H, R, P, K } = m;
  const { n, s, t } = locate(currentY());
  const e = t * t * (3 - 2 * t); // smoothstep

  // Content scroll of every world: finished worlds sit at their end, deeper ones at their top.
  const sc = R.map((r, a) => (a < n ? r : a === n ? s : 0));
  const Pof = (k: number): Point => ({ x: P[k].x, y: P[k].y - sc[k] });
  const C = { x: W / 2, y: H / 2 };

  const tr: Transform[] = [];
  if (reduced) {
    for (let w = 0; w < N; w++) tr[w] = { s: 1, ax: 0, ay: 0 };
  } else {
    // World n: scale K^e around its portal, which travels to the screen center.
    if (n < N - 1) {
      const Pn = Pof(n), sn = Math.pow(K[n], e);
      const sx = Pn.x + (C.x - Pn.x) * e, sy = Pn.y + (C.y - Pn.y) * e;
      tr[n] = { s: sn, ax: sx - sn * Pn.x, ay: sy - sn * Pn.y };
    } else tr[n] = { s: 1, ax: 0, ay: 0 };
    // Deeper worlds: each sits inside the previous portal at 1/K scale.
    for (let f = n; f < N - 1; f++) {
      const A = tr[f], Pf = Pof(f);
      tr[f + 1] = { s: A.s / K[f], ax: A.ax + A.s * (Pf.x - C.x / K[f]), ay: A.ay + A.s * (Pf.y - C.y / K[f]) };
    }
    // Shallower worlds: each is K times bigger than the next, around its own portal.
    for (let b = n - 1; b >= 0; b--) {
      const B = tr[b + 1], Pb = Pof(b), sb = B.s * K[b];
      tr[b] = { s: sb, ax: B.ax - sb * (Pb.x - C.x / K[b]), ay: B.ay - sb * (Pb.y - C.y / K[b]) };
    }
  }

  const next = t > 0.5 ? n + 1 : n; // the world that owns the pointer and the HUD dot
  for (let w = 0; w < N; w++) {
    const el = worlds[w].style, T = tr[w];
    const visible = reduced ? w === n || (w === n + 1 && t > 0) : w >= n - 1 && w <= n + 1;
    el.visibility = visible ? "visible" : "hidden";
    el.transform = `translate(${T.ax.toFixed(2)}px, ${T.ay.toFixed(2)}px) scale(${T.s.toPrecision(7)})`;
    el.opacity = reduced ? String(w === n ? 1 : w === n + 1 ? e : 0) : "";
    el.pointerEvents = w === next ? "auto" : "none";
    contents[w].style.transform = `translate(0px, ${(-sc[w]).toFixed(1)}px)`;
    scales[w] = T.s;
  }
  depthEl.textContent = String(Math.round((n + e) * DEPTH_STEP)).padStart(4, "0");
  if (next !== cur) setCurrent(next);
}

function setCurrent(i: number) {
  cur = i;
  stops.forEach((b, k) => (k === i ? b.setAttribute("aria-current", "true") : b.removeAttribute("aria-current")));
}

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { ticking = false; update(); });
}

function jump(i: number) {
  if (m) dive(starts()[i]);
}

// ---------- Scrolljacking (changed after the handoff, at Mateo's request) ----------
// Reading inside a world is plain scroll. At a world's edge, one gesture (wheel, trackpad, swipe
// or key) plays the whole dive to the next world, and input is held until it lands. The inertia
// of that gesture is swallowed, so one trackpad flick never skips two worlds.

const DIVE_MS = 1200; // one whole dive; the dive's own smoothstep gives it its ease-in-out
const DIVE_MS_REDUCED = 450; // the crossfade under reduced motion
const GESTURE_GAP = 200; // ms without wheel events that separates two gestures
const INERTIA_MAX = 600; // ms after landing during which a still-decaying gesture is swallowed
const SWIPE_MIN = 12; // px a finger travels before a swipe counts
const EDGE = 2; // px: with display scaling the scroll lands on device pixels, a fraction off an edge

let diving = 0; // rAF id of the running dive, 0 when idle
let wheelLocked = false, lastWheel = 0, lastDelta = 0, landed = 0;
let touchY0 = 0, touchMode: "?" | "dive" | "native" = "?", touchFired = false;

const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

/** Where a scroll of `delta` px from here should dive to, or null when it stays inside the reading. */
function diveTarget(delta: number): number | null {
  if (!m || !delta || diving) return null;
  const off = readOffset(), S = starts();
  if (delta > 0 && world < N - 1 && off + delta > m.R[world] - EDGE) return S[world + 1];
  if (delta < 0 && world > 0 && off + delta < EDGE) return S[world - 1] + m.R[world - 1];
  return null;
}

/** Animate dive space to `target`, then rest there. */
function dive(target: number) {
  if (!m) return;
  stopDive();
  const from = currentY(), dist = target - from;
  if (Math.abs(dist) < 1) return;
  const per = reduced ? DIVE_MS_REDUCED : DIVE_MS;
  const dur = Math.min(Math.max((per * Math.abs(dist)) / m.D, per * 0.5), per * 2.2);
  // One dive runs linearly (the zoom adds its own easing); longer jumps ease in and out.
  const ease = Math.abs(dist) > m.D * 1.05 ? easeInOut : (p: number) => p;
  wheelLocked = true;
  const t0 = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / dur);
    animY = from + dist * ease(p);
    if (p < 1) { update(); diving = requestAnimationFrame(step); return; }
    diving = 0;
    animY = null;
    landed = performance.now();
    place(target);
  };
  animY = from;
  diving = requestAnimationFrame(step);
}

/** Stop a running dive where it is and rest at the nearer edge. */
function stopDive() {
  if (!diving) return;
  cancelAnimationFrame(diving);
  diving = 0;
  landed = performance.now();
  const y = animY!;
  animY = null;
  place(y);
}

window.addEventListener("wheel", (e) => {
  if (!m || e.ctrlKey) return; // ctrl + wheel is page zoom
  const now = performance.now(), gap = now - lastWheel;
  lastWheel = now;
  const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? m.H : 1;
  const dy = e.deltaY * unit, size = Math.abs(dy), prev = lastDelta;
  lastDelta = size;
  if (diving) { e.preventDefault(); return; }
  if (wheelLocked) {
    // After a dive, swallow the rest of the gesture that started it: events still close together and
    // not speeding up. Trackpad inertia keeps shrinking, so it is swallowed until it dies out; a mouse
    // wheel sends equal steps, which only count for INERTIA_MAX, so continuous scrolling never sticks.
    const decaying = size < prev || now - landed < INERTIA_MAX;
    if (gap < GESTURE_GAP && size <= prev && decaying) { e.preventDefault(); return; }
    wheelLocked = false;
  }
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
  const target = diveTarget(dy);
  if (target !== null) { e.preventDefault(); dive(target); }
}, { passive: false });

// A swipe is decided on its first move: one that starts at the edge of the reading, heading out of
// it, becomes a dive and never scrolls the page. Any other swipe is plain scroll, and its momentum
// stops at the end of the reading, because that is where the page ends.
window.addEventListener("touchstart", (e) => {
  touchMode = "?";
  touchFired = false;
  touchY0 = e.touches[0].clientY;
}, { passive: true });

window.addEventListener("touchmove", (e) => {
  if (e.touches.length > 1) return; // pinch zoom
  if (diving) { if (e.cancelable) e.preventDefault(); return; }
  if (touchMode === "native") return;
  const d = touchY0 - e.touches[0].clientY; // > 0: finger moves up, page scrolls down
  if (touchMode === "?") {
    if (!d) return;
    touchMode = e.cancelable && diveTarget(Math.sign(d)) !== null ? "dive" : "native";
    if (touchMode === "native") return;
  }
  if (e.cancelable) e.preventDefault();
  if (touchFired || Math.abs(d) < SWIPE_MIN) return;
  const target = diveTarget(d);
  if (target !== null) { touchFired = true; dive(target); }
}, { passive: false });

const KEY_STEP: Record<string, number> = { ArrowDown: 40, ArrowUp: -40, PageDown: 0.875, PageUp: -0.875, " ": 0.875 };
window.addEventListener("keydown", (e) => {
  if (!m || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
  const el = e.target as Element;
  if (el.closest("input, textarea, select, [contenteditable]")) return;
  if (e.key === " " && el.closest("button, a")) return; // space presses the control
  let delta = KEY_STEP[e.key];
  if (delta === undefined) return;
  if (Math.abs(delta) < 1) delta *= m.H; // page keys move by most of a screen
  if (e.key === " " && e.shiftKey) delta = -delta;
  if (diving) { e.preventDefault(); return; }
  const target = diveTarget(delta);
  if (target !== null) { e.preventDefault(); dive(target); }
});

// ---------- Language ----------

function readLang(): Lang {
  try {
    const saved = localStorage.getItem("mc-lang");
    if (saved === "pt" || saved === "en") return saved;
  } catch { /* storage blocked */ }
  return /^pt/i.test(navigator.language || "") ? "pt" : "en";
}

function lookup(t: Strings, path: string): unknown {
  return path.split(".").reduce<unknown>((o, k) => (o as Record<string, unknown> | undefined)?.[k], t);
}

let lang: Lang = readLang();

function applyLang(l: Lang) {
  const t = strings[l];
  document.documentElement.lang = l === "en" ? "en" : "pt-BR";
  document.querySelectorAll<HTMLElement>("[data-t]").forEach((el) => {
    el.textContent = String(lookup(t, el.dataset.t!));
  });
  document.querySelectorAll<HTMLElement>("[data-t-aria]").forEach((el) => {
    el.setAttribute("aria-label", String(lookup(t, el.dataset.tAria!)));
  });
  document.querySelectorAll<HTMLElement>("[data-t-len]").forEach((el) => {
    el.style.setProperty("--len", String(lookup(t, `${el.dataset.tLen}.len`)));
  });
  stops.forEach((b, i) => b.setAttribute("aria-label", `${t.goTo} ${t.stops[i]}`));
  langButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === l)));
}

function setLang(l: Lang) {
  if (l === lang) return;
  lang = l;
  try { localStorage.setItem("mc-lang", l); } catch { /* storage blocked */ }
  applyLang(l);
  // Word lengths changed: re-measure and keep the reader at the start of their level.
  measure("level");
}

// ---------- Wiring ----------

document.addEventListener("click", (ev) => {
  const target = ev.target as Element;
  const go = target.closest<HTMLElement>("[data-go]");
  if (go) { jump(Number(go.dataset.go)); return; }
  const lg = target.closest<HTMLElement>(".lg");
  if (lg) setLang(lg.dataset.lang as Lang);
});

// No contact endpoint yet: the form opens the visitor's mail app with the message filled in.
const form = document.querySelector<HTMLFormElement>("form[data-mailto]")!;
form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "");
  const subject = `Portfolio — ${name}`;
  const body = `${data.get("message") || ""}\n\n${name}\n${data.get("email") || ""}`;
  window.location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// Worlds clip with overflow: hidden, but the browser can still scroll them to reveal a focused
// element. That would break the math, so undo it and drive the window scroll instead.
stage.addEventListener("scroll", (ev) => {
  const el = ev.target as HTMLElement;
  if ((el === stage || el.classList.contains("world")) && (el.scrollTop || el.scrollLeft)) {
    el.scrollTop = 0;
    el.scrollLeft = 0;
  }
}, { capture: true, passive: true });

root.addEventListener("focusin", (ev) => {
  const el = ev.target as HTMLElement;
  if (!m || !el.matches(":focus-visible")) return;
  const w = worlds.findIndex((x) => x.contains(el));
  if (w < 0) return;
  const cr = contents[w].getBoundingClientRect(), er = el.getBoundingClientRect();
  const top = (er.top - cr.top) / scales[w], h = er.height / scales[w];
  const start = starts()[w], local = currentY() - start;
  const inView = local >= 0 && local <= m.R[w] && top - local >= 0 && top + h - local <= m.H;
  if (inView) return;
  const target = start + Math.min(Math.max(top + h / 2 - m.H / 2, 0), m.R[w]);
  if (diving) { cancelAnimationFrame(diving); diving = 0; animY = null; }
  place(target); // synchronously, so the browser sees the element in view and doesn't scroll on its own
});

if ("scrollRestoration" in history) history.scrollRestoration = "manual";
applyLang(lang);
measure();
window.addEventListener("scroll", onScroll, { passive: true });
document.fonts?.ready.then(() => measure());
window.addEventListener("load", () => measure());
const ro = new ResizeObserver(() => measure());
ro.observe(stage);
contents.forEach((c) => ro.observe(c));
motion.addEventListener("change", () => { reduced = motion.matches; measure(); });
