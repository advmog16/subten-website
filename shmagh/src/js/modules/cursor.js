/** Custom cursor with contextual labels, plus magnetic buttons. Desktop only. */
import { $, $$, lerp, finePointer } from "../utils.js";
import { t } from "../i18n.js";

export function initCursor() {
  if (!finePointer) return;

  const cursor = $(".cursor");
  const dot = $(".cursor-dot");
  const ring = $(".cursor-ring");
  const label = $(".cursor-label");
  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  const pos = { ...mouse };
  let running = false;

  function loop() {
    pos.x = lerp(pos.x, mouse.x, 0.18);
    pos.y = lerp(pos.y, mouse.y, 0.18);
    ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    running = Math.abs(pos.x - mouse.x) + Math.abs(pos.y - mouse.y) > 0.3;
    if (running) requestAnimationFrame(loop);
  }

  addEventListener("pointermove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
    if (!running) { running = true; requestAnimationFrame(loop); }
  }, { passive: true });

  // data-cursor="view|play|drag|hide" on any element; cards/galleries get defaults.
  document.addEventListener("pointerover", (e) => {
    const el = e.target.closest("[data-cursor], .card, .case-gallery, .case-next");
    let kind = "";
    if (el) kind = el.dataset.cursor || (el.classList.contains("case-gallery") ? "drag" : "view");
    const text = kind && kind !== "hide" ? t(kind) : "";
    label.textContent = text;
    cursor.classList.toggle("is-label", !!text);
    cursor.classList.toggle("is-hidden", kind === "hide");
  });
}

export function initMagnetic() {
  if (!finePointer) return;
  $$(".magnetic").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.3;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transition = "transform .8s cubic-bezier(.16,1,.3,1), background .4s, color .4s";
      el.style.transform = "";
      setTimeout(() => { el.style.transition = ""; }, 800);
    });
  });
}
