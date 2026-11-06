/**
 * Video modal. Any element with data-video="vimeo:<id>" plays on-site;
 * data-video="ig:<url>" opens Instagram in a new tab.
 * The Vimeo iframe is injected only on click, so it costs nothing until used.
 */
import { $, lockScroll } from "../utils.js";

const root = $(".video");
const frame = $(".video-frame");
let open = false;

export const isVideoOpen = () => open;

export function openVideo(spec) {
  if (!spec) return;
  if (spec.startsWith("ig:")) { window.open(spec.slice(3), "_blank", "noopener"); return; }
  const id = spec.split(":")[1];
  frame.innerHTML = `<iframe src="https://player.vimeo.com/video/${encodeURIComponent(id)}?autoplay=1&title=0&byline=0&portrait=0&dnt=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="SHMAQ film"></iframe>`;
  root.classList.add("is-open");
  root.setAttribute("aria-hidden", "false");
  if (!open) lockScroll(true);
  open = true;
}

export function closeVideo() {
  if (!open) return;
  open = false;
  root.classList.remove("is-open");
  root.setAttribute("aria-hidden", "true");
  lockScroll(false);
  setTimeout(() => { if (!open) frame.innerHTML = ""; }, 500);
}

export function initVideo() {
  $(".video-close", root).addEventListener("click", closeVideo);
  root.addEventListener("click", (e) => { if (e.target === root) closeVideo(); });
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-video]");
    if (trigger) openVideo(trigger.dataset.video);
  });
}
