/** Infinite marquee band that speeds up and skews with scroll velocity. */
import { $, clamp, lerp, escapeHTML, reduceMotion } from "../utils.js";
import { t, onLangChange } from "../i18n.js";

const band = $(".band");
const track = $(".band-track");

function render() {
  const items = t("band")
    .map((s) => (s.startsWith("*") ? `<span><em>${escapeHTML(s.replace(/\*/g, ""))}</em></span>` : `<span>${escapeHTML(s)}</span>`))
    .join('<span class="dot"></span>');
  const row = `<div class="band-row">${items}<span class="dot"></span></div>`;
  track.innerHTML = row + row + row;
}

export function initBand() {
  onLangChange(render);
  if (reduceMotion) return;

  let x = 0;
  let velocity = 0;
  let last = scrollY;
  let running = false;

  function loop() {
    if (!running) return;
    const y = scrollY;
    velocity = lerp(velocity, (y - last) * 0.6, 0.12);
    last = y;
    const rowWidth = track.firstElementChild?.offsetWidth || 1;
    x -= 1.1 + Math.abs(velocity);
    if (x <= -rowWidth) x += rowWidth;
    track.style.transform = `translate3d(${x}px,0,0) skewX(${clamp(-velocity * 0.4, -10, 10).toFixed(2)}deg)`;
    requestAnimationFrame(loop);
  }

  // Only animate while on screen.
  new IntersectionObserver(([entry]) => {
    running = entry.isIntersecting;
    if (running) { last = scrollY; requestAnimationFrame(loop); }
  }).observe(band);
}
