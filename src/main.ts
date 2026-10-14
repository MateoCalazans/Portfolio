import "./styles/tokens.css";
import "./styles/site.css";
import { strings, type Lang, type Strings } from "./i18n";

// The dive, implemented as written in design/mergulho/dive.md.

const N = 5;
const DIVE = 1.4; // dive-distance, in viewport heights
const ZOOM_FLOOR = 8;
const ZOOM_MARGIN = 1.08;
const DEPTH_STEP = 250;

interface Point { x: number; y: number }
interface Transform { s: number; ax: number; ay: number }
interface Measure { W: number; H: number; R: number[]; P: Point[]; K: number[]; D: number; total: number }

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

function currentY(): number {
  return Math.min(Math.max(-root.getBoundingClientRect().top, 0), m!.total - m!.H);
}

function measure(keep: "progress" | "level" = "progress") {
  const W = stage.clientWidth, H = stage.clientHeight;
  if (!W || !H) return;

  // Remember where the reader is, so a re-measure doesn't move them.
  let prev: { n: number; f: number; t: number } | null = null;
  if (m) {
    const y = currentY();
    const p = locate(y);
    prev = keep === "level" ? { n: cur, f: 0, t: 0 } : { n: p.n, f: m.R[p.n] ? p.s / m.R[p.n] : 0, t: p.t };
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
  const total = H + R.reduce((a, b) => a + b, 0) + (N - 1) * D;
  m = { W, H, R, P, K, D, total };
  root.style.height = total + "px";

  if (prev) {
    const y = starts()[prev.n] + prev.f * R[prev.n] + prev.t * D;
    if (Math.abs(y - currentY()) > 1) window.scrollTo(0, scrollY0() + y);
  }
  update();
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
  if (!m) return;
  window.scrollTo({ top: scrollY0() + starts()[i], behavior: reduced ? "auto" : "smooth" });
}

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
  window.scrollTo(0, scrollY0() + target);
  update(); // place the worlds now, so the browser sees the element in view and doesn't scroll on its own
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
