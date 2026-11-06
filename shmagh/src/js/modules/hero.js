/**
 * Hero: crossfading slideshow with Ken Burns, and a scroll-driven
 * "frame shrinks into a rounded card" effect.
 */
import { HERO } from "../data/projects.js";
import { CONFIG } from "../config.js";
import { $, clamp, pad2, srcset, imageURL, reduceMotion } from "../utils.js";
import { pick, onLangChange } from "../i18n.js";
import { onFrame } from "../scroll.js";

const section = $(".hero");
const frame = $(".hero-frame");
const slidesEl = $(".hero-slides");
const wordmark = $(".wordmark");
const overlays = [$(".hero-top"), $(".hero-bottom")];

let slides = [];
let index = 0;
let visible = true;

/** Render slides; only the first is loaded eagerly. Returns the first <img>. */
export function initHero() {
  slidesEl.innerHTML = HERO.map((s, i) =>
    i === 0
      ? `<img class="is-active" src="${imageURL(s.img, 1600)}" srcset="${srcset(s.img)}" sizes="100vw" alt="" fetchpriority="high" decoding="async" />`
      : `<img data-src="${s.img}" sizes="100vw" alt="" decoding="async" />`
  ).join("");
  slides = [...slidesEl.children];

  onLangChange(updateCaption);
  onFrame(onScroll);
  return slides[0];
}

/** Called after the preloader: hydrate remaining slides and start the timer. */
export function startHero() {
  for (const img of slides) {
    if (!img.dataset.src) continue;
    img.srcset = srcset(img.dataset.src);
    img.src = imageURL(img.dataset.src);
  }
  updateCaption();
  restartBar();
  if (!reduceMotion) {
    setInterval(() => { if (visible && !document.hidden) next(); }, CONFIG.heroInterval);
  }
}

function updateCaption() {
  $(".hero-index").textContent = `${pad2(index + 1)} / ${pad2(HERO.length)}`;
  $(".hero-title").textContent = pick(HERO[index]);
}

function restartBar() {
  $(".hero-bar").innerHTML = "<i></i>";
}

function next() {
  const prev = slides[index];
  index = (index + 1) % slides.length;
  const incoming = slides[index];
  const show = () => {
    prev.classList.remove("is-active");
    incoming.classList.remove("is-active");
    void incoming.offsetWidth; // restart the Ken Burns animation
    incoming.classList.add("is-active");
    updateCaption();
    restartBar();
  };
  if (incoming.complete && incoming.naturalWidth) show();
  else incoming.addEventListener("load", show, { once: true });
}

function onScroll(_y, vp) {
  const rect = section.getBoundingClientRect();
  visible = rect.bottom > 0;
  if (!visible || reduceMotion) return;

  const p = clamp(-rect.top / (rect.height - vp.h));
  const e = p * p * (3 - 2 * p); // smoothstep
  frame.style.setProperty("--cx", `${(e * Math.min(vp.w * 0.08, 110)).toFixed(1)}px`);
  frame.style.setProperty("--ci", `${(e * vp.h * 0.1).toFixed(1)}px`);
  frame.style.setProperty("--cr", `${(e * 22).toFixed(1)}px`);
  slidesEl.style.setProperty("--hs", (1 + e * 0.08).toFixed(4));
  wordmark.style.setProperty("--wy", `${(-e * vp.h * 0.22).toFixed(1)}px`);
  wordmark.style.opacity = clamp(1.6 - p * 2).toFixed(3);
  const fade = clamp(1 - p * 2.2).toFixed(3);
  overlays.forEach((el) => { el.style.opacity = fade; });
}
