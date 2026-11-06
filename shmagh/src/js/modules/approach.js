/** "How we work" rows: a photo trails the cursor while hovering a step. */
import { $, $$, clamp, lerp, imageURL, finePointer } from "../utils.js";

export function initApproach() {
  if (!finePointer) return;
  const holder = $(".float-img");
  const img = $("img", holder);
  const target = { x: 0, y: 0 };
  const pos = { x: 0, y: 0 };
  let active = false;
  let raf = 0;

  function loop() {
    pos.x = lerp(pos.x, target.x, 0.14);
    pos.y = lerp(pos.y, target.y, 0.14);
    const tilt = clamp((target.x - pos.x) * 0.05, -8, 8);
    holder.style.transform = `translate3d(${pos.x - 150}px, ${pos.y - 112}px, 0) rotate(${tilt}deg)`;
    raf = active ? requestAnimationFrame(loop) : 0;
  }

  $$(".steps li").forEach((li) => {
    li.addEventListener("pointerenter", (e) => {
      img.src = imageURL(li.dataset.img);
      if (!active) { pos.x = target.x = e.clientX; pos.y = target.y = e.clientY; }
      active = true;
      holder.classList.add("is-on");
      if (!raf) raf = requestAnimationFrame(loop);
    });
    li.addEventListener("pointermove", (e) => { target.x = e.clientX; target.y = e.clientY; });
    li.addEventListener("pointerleave", () => { active = false; holder.classList.remove("is-on"); });
  });
}
