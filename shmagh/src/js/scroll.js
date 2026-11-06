/**
 * One requestAnimationFrame per scroll/resize for the whole site.
 * Modules register a handler with onFrame(); handlers should only read
 * layout and write transforms / CSS variables (no layout-changing writes).
 */
const handlers = [];
export const viewport = { w: innerWidth, h: innerHeight };
let ticking = false;

export function onFrame(fn) {
  handlers.push(fn);
}

export function requestTick() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(run);
}

function run() {
  ticking = false;
  const y = scrollY;
  for (const fn of handlers) fn(y, viewport);
}

export function initScroll() {
  addEventListener("scroll", requestTick, { passive: true });
  addEventListener("resize", () => {
    viewport.w = innerWidth;
    viewport.h = innerHeight;
    requestTick();
  }, { passive: true });
  requestTick();
}
