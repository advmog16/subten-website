/** Small shared helpers — no dependencies. */
import { CONFIG } from "./config.js";

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const pad2 = (n) => String(n).padStart(2, "0");

export const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
export const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

export const escapeHTML = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/** srcset string for an image name in assets/img. */
export const srcset = (name) =>
  `${CONFIG.imageDir}${name}-760.webp 760w, ${CONFIG.imageDir}${name}-1600.webp 1600w`;

export const imageURL = (name, size = 760) => `${CONFIG.imageDir}${name}-${size}.webp`;

/** Responsive, lazy <img> markup. */
export const imgTag = (name, { sizes = "100vw", cls = "", lazy = true } = {}) =>
  `<img${cls ? ` class="${cls}"` : ""} src="${imageURL(name)}" srcset="${srcset(name)}" sizes="${sizes}" alt=""${
    lazy ? ' loading="lazy"' : ""
  } decoding="async" />`;

/** localStorage that never throws (private mode, blocked storage…). */
export const storage = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* ignore */ }
  }
};

/** Lock/unlock page scroll; counts nested locks (menu, case study, video). */
let locks = 0;
export function lockScroll(on) {
  locks = Math.max(0, locks + (on ? 1 : -1));
  document.body.classList.toggle("is-locked", locks > 0);
}
