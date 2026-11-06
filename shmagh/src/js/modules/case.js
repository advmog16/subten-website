/** Case-study overlay: deep-linkable (#work/<slug>), keyboard navigable. */
import { PROJECTS } from "../data/projects.js";
import { $, pad2, escapeHTML, imgTag, srcset, imageURL, reduceMotion, lockScroll } from "../utils.js";
import { t, pick, isRTL, onLangChange } from "../i18n.js";

const root = $(".case");
const scroller = $(".case-scroll");
const gallery = $(".case-gallery");
let current = -1;
let lastFocus = null;

export const isCaseOpen = () => current > -1;

function fill(i) {
  const p = PROJECTS[i];
  const d = pick(p);
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  $(".case-count", root).textContent = `${pad2(i + 1)} / ${pad2(PROJECTS.length)}`;
  const hero = $(".case-hero img", root);
  hero.srcset = srcset(p.cover);
  hero.sizes = "100vw";
  hero.src = imageURL(p.cover, 1600);
  hero.alt = d.title;

  $(".case-client", root).textContent = d.client;
  $(".case-cat", root).textContent = d.cat;
  $(".case-title", root).textContent = d.title;
  $(".case-desc", root).textContent = d.desc;
  $(".case-tags", root).innerHTML = d.tags.map((tag) => `<li>${escapeHTML(tag)}</li>`).join("");
  $(".case-impact", root).innerHTML = (d.impact || [])
    .map(([title, body]) => `<div><b>${escapeHTML(title)}</b><p>${escapeHTML(body)}</p></div>`).join("");

  const watch = $(".case-watch", root);
  watch.hidden = !p.video;
  if (p.video) {
    watch.dataset.video = p.video;
    watch.lastElementChild.textContent = p.video.startsWith("ig:") ? t("insta") : t("watch");
  }

  gallery.innerHTML = p.gallery.map((g) => imgTag(g, { sizes: "(max-width: 900px) 90vw, 60vw" })).join("");
  gallery.scrollLeft = 0;
  $(".case-next-title", root).textContent = pick(next).title;
  $(".case-next img", root).src = imageURL(next.cover);
}

export function openCase(i, { fromHash = false } = {}) {
  const wasOpen = isCaseOpen();
  current = i;
  fill(i);
  scroller.scrollTop = 0;
  if (!wasOpen) {
    lastFocus = document.activeElement;
    root.classList.add("is-open");
    root.setAttribute("aria-hidden", "false");
    lockScroll(true);
    setTimeout(() => $(".case-close", root).focus({ preventScroll: true }), 400);
  }
  if (!fromHash) history.replaceState(null, "", `#work/${PROJECTS[i].slug}`);
}

export function closeCase() {
  if (!isCaseOpen()) return;
  current = -1;
  root.classList.remove("is-open");
  root.setAttribute("aria-hidden", "true");
  lockScroll(false);
  history.replaceState(null, "", location.pathname + location.search);
  lastFocus?.focus({ preventScroll: true });
}

export function stepCase(direction) {
  if (!isCaseOpen()) return;
  openCase((current + direction + PROJECTS.length) % PROJECTS.length);
}

/** Arrow keys follow reading direction (reversed in Arabic). */
export function handleCaseKeys(e) {
  const forward = isRTL() ? "ArrowLeft" : "ArrowRight";
  const back = isRTL() ? "ArrowRight" : "ArrowLeft";
  if (e.key === forward) stepCase(1);
  if (e.key === back) stepCase(-1);
}

function initDragGallery() {
  let down = false, startX = 0, startLeft = 0, moved = false;
  gallery.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return; // touch scrolls natively
    down = true; moved = false; startX = e.clientX; startLeft = gallery.scrollLeft;
    gallery.classList.add("is-drag");
  });
  addEventListener("pointermove", (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 3) moved = true;
    gallery.scrollLeft = startLeft - dx;
  });
  addEventListener("pointerup", () => { down = false; gallery.classList.remove("is-drag"); });
  gallery.addEventListener("click", (e) => { if (moved) e.preventDefault(); }, true);
}

export function initCase() {
  $(".case-close", root).addEventListener("click", closeCase);
  $(".case-next", root).addEventListener("click", () => {
    scroller.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    setTimeout(() => stepCase(1), reduceMotion ? 0 : 350);
  });
  initDragGallery();
  onLangChange(() => { if (isCaseOpen()) fill(current); });

  // Deep link: /#work/<slug> opens straight into a project.
  const match = location.hash.match(/^#work\/([\w-]+)/);
  if (match) {
    const i = PROJECTS.findIndex((p) => p.slug === match[1]);
    if (i > -1) setTimeout(() => openCase(i, { fromHash: true }), 1600);
  }
}
