/** Work grid: cards, filters, cursor-origin hover reveal and parallax. */
import { PROJECTS } from "../data/projects.js";
import { $, $$, pad2, escapeHTML, imgTag, reduceMotion } from "../utils.js";
import { pick, onLangChange } from "../i18n.js";
import { onFrame } from "../scroll.js";
import { reveal } from "./reveal.js";
import { openCase } from "./case.js";

const grid = $(".work-grid");
const visible = new Set();
const visibility = new IntersectionObserver((entries) => {
  for (const e of entries) e.isIntersecting ? visible.add(e.target) : visible.delete(e.target);
}, { rootMargin: "10% 0px" });

let filter = "all";
const SIZES = "(max-width: 900px) 100vw, 50vw";

function cardHTML(project, i) {
  const d = pick(project);
  return `<article class="card in" data-i="${i}" data-type="${project.type}" tabindex="0" role="button" aria-label="${escapeHTML(`${d.client} — ${d.title}`)}">
    <div class="card-media">
      <span class="card-tag">${escapeHTML(d.cat)}</span>
      ${imgTag(project.cover, { sizes: SIZES })}
      ${imgTag(project.alt, { sizes: SIZES, cls: "card-alt" })}
    </div>
    <div class="card-cap">
      <span class="card-no">${pad2(i + 1)}</span>
      <h3 class="card-title">${escapeHTML(d.title)}<small>${escapeHTML(d.client)}</small></h3>
      <span class="card-arrow" aria-hidden="true">→</span>
    </div>
  </article>`;
}

function applyFilter() {
  $$(".card", grid).forEach((c) => c.classList.toggle("is-dim", filter !== "all" && c.dataset.type !== filter));
}

function render() {
  visible.clear();
  visibility.disconnect();
  grid.innerHTML = PROJECTS.map(cardHTML).join("");
  for (const card of $$(".card", grid)) {
    card._imgs = $$("img", card);
    visibility.observe(card);
    reveal(card);
  }
  applyFilter();
}

export function initWork() {
  onLangChange(render);

  // Delegated events survive re-renders on language change.
  grid.addEventListener("pointermove", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const r = card.querySelector(".card-media").getBoundingClientRect();
    card.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    card.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  });
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) openCase(Number(card.dataset.i));
  });
  grid.addEventListener("keydown", (e) => {
    const card = e.target.closest(".card");
    if (card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openCase(Number(card.dataset.i)); }
  });

  $$(".filters button").forEach((btn) => btn.addEventListener("click", () => {
    filter = btn.dataset.filter;
    $$(".filters button").forEach((b) => b.classList.toggle("is-active", b === btn));
    applyFilter();
  }));

  if (!reduceMotion) {
    onFrame((_y, vp) => {
      visible.forEach((card) => {
        const r = card.getBoundingClientRect();
        const offset = (r.top + r.height / 2 - vp.h / 2) / vp.h;
        card._imgs.forEach((img) => img.style.setProperty("--py", `${(offset * -6).toFixed(2)}%`));
      });
    });
  }
}
