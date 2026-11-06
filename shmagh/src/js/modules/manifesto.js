/** Manifesto paragraph: words light up one by one as you scroll. */
import { $, $$, clamp, escapeHTML, imgTag } from "../utils.js";
import { t, onLangChange } from "../i18n.js";
import { onFrame } from "../scroll.js";

const el = $(".manifesto-text");
let words = [];

/** "*a b*" → accent serif words, "[img:name]" → inline image pill. */
function render() {
  let italic = false;
  el.innerHTML = t("manifesto").split(/\s+/).map((token) => {
    const pill = token.match(/^\[img:([\w-]+)\]$/);
    if (pill) return `<span class="w pill">${imgTag(pill[1], { sizes: "120px" })}</span>`;
    if (token.startsWith("*")) { italic = true; token = token.slice(1); }
    const closes = token.includes("*");
    token = token.replace("*", "");
    const html = italic ? `<span class="w"><em>${escapeHTML(token)}</em></span>` : `<span class="w">${escapeHTML(token)}</span>`;
    if (closes) italic = false;
    return html;
  }).join(" ");
  words = $$(".w", el);
}

export function initManifesto() {
  onLangChange(render);
  onFrame((_y, vp) => {
    const r = el.getBoundingClientRect();
    if (r.top > vp.h || r.bottom < 0) return;
    const p = clamp((vp.h * 0.82 - r.top) / (r.height + vp.h * 0.1));
    const lit = Math.floor(p * words.length * 1.05);
    words.forEach((w, i) => w.classList.toggle("on", i < lit));
  });
}
