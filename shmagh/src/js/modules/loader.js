/** Preloader: calligraphy logo fills while the first hero image + fonts load. */
import { $, lerp, reduceMotion } from "../utils.js";

const MIN_TIME = 1100;   // never flash: show at least this long
const MAX_WAIT = 3500;   // never block: give up waiting after this

export function runLoader(firstImage, onDone) {
  const loader = $(".loader");
  const fill = $(".loader .logo-fill");
  const count = $(".loader-count");

  const imageReady = firstImage.complete
    ? Promise.resolve()
    : new Promise((resolve) => { firstImage.addEventListener("load", resolve, { once: true }); firstImage.addEventListener("error", resolve, { once: true }); });
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();

  let ready = false;
  Promise.race([Promise.all([imageReady, fontsReady]), new Promise((r) => setTimeout(r, MAX_WAIT))])
    .then(() => { ready = true; });

  const start = performance.now();
  let shown = 0;

  (function frame(now) {
    const elapsed = now - start;
    const target = ready ? 100 : Math.min(88, elapsed / 14);
    shown = lerp(shown, target, ready ? 0.14 : 0.08);
    const value = Math.round(shown);
    count.textContent = value;
    fill.style.setProperty("--p", `${value}%`);

    if (ready && value >= 99 && elapsed > (reduceMotion ? 0 : MIN_TIME)) {
      count.textContent = 100;
      fill.style.setProperty("--p", "100%");
      setTimeout(() => {
        loader.classList.add("is-done");
        document.body.classList.remove("is-loading");
        document.body.classList.add("is-ready");
        onDone();
        setTimeout(() => loader.remove(), 1200);
      }, 180);
      return;
    }
    requestAnimationFrame(frame);
  })(start);
}
