/** Pinned 16mm film strip that travels horizontally while you scroll down. */
import { STRIP } from "../data/projects.js";
import { $, $$, clamp, pad2, imgTag, reduceMotion } from "../utils.js";
import { onFrame } from "../scroll.js";

export function initStrip() {
  const section = $(".strip");
  const track = $(".strip-track");
  const progress = $(".strip-progress");

  track.innerHTML = STRIP.map((name, i) =>
    `<figure class="frame"><div class="frame-in">${imgTag(name, { sizes: "(max-width: 900px) 70vw, 45vw" })}</div><figcaption>KODAK ${pad2(i + 1)}A ▸ 16MM</figcaption></figure>`
  ).join("");
  const images = $$("img", track);

  onFrame((_y, vp) => {
    const r = section.getBoundingClientRect();
    if (r.top > vp.h || r.bottom < 0) return;
    const p = clamp(-r.top / (r.height - vp.h));
    const distance = Math.max(0, track.scrollWidth - vp.w);
    track.style.setProperty("--sx", `${(-p * distance).toFixed(1)}px`);
    progress.style.setProperty("--sp", p.toFixed(4));
    if (!reduceMotion) {
      images.forEach((img, i) => img.style.setProperty("--fx", `${((p * 2 - 1) * -6 + (i % 2) * 2).toFixed(2)}%`));
    }
  });
}
