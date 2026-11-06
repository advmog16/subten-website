/** Fade-up on enter (`.in` → `.is-in`) and count-up numbers (`data-count`). */
import { $$, clamp } from "../utils.js";

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add("is-in");
    if (entry.target.dataset.count) countUp(entry.target);
    observer.unobserve(entry.target);
  }
}, { rootMargin: "0px 0px -12% 0px" });

export const reveal = (el) => observer.observe(el);

function countUp(el) {
  const to = Number(el.dataset.count);
  const from = to > 100 ? to - 40 : 0;
  const start = performance.now();
  const duration = 1400;
  (function frame(now) {
    const p = clamp((now - start) / duration);
    el.textContent = Math.round(from + (to - from) * (1 - (1 - p) ** 3));
    if (p < 1) requestAnimationFrame(frame);
  })(start);
}

export function initReveal() {
  $$("[data-count]").forEach(reveal);
  $$(".manifesto-foot > *, .steps li, .work-head > *, .contact-lead").forEach((el) => {
    el.classList.add("in");
    reveal(el);
  });
  reveal(document.querySelector(".contact-title"));
}
