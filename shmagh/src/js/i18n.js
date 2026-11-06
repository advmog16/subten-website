/** Language state (EN / AR), static-text binding and change notifications. */
import { STRINGS } from "./data/strings.js";
import { CONFIG } from "./config.js";
import { $$, storage } from "./utils.js";

const KEY = "shmaq-lang";
const listeners = new Set();

let lang =
  storage.get(KEY) ||
  ((navigator.language || "").toLowerCase().startsWith("ar") ? "ar" : CONFIG.defaultLang);

export const getLang = () => lang;
export const isRTL = () => lang === "ar";

/** Translate a UI key. */
export const t = (key) => STRINGS[lang][key] ?? STRINGS.en[key] ?? "";

/** Pick the current-language block of a content object ({ en: {...}, ar: {...} }). */
export const pick = (obj) => obj[lang] ?? obj.en;

/** Run `fn(lang)` now and whenever the language changes. */
export function onLangChange(fn) {
  listeners.add(fn);
}

export function applyLang() {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = isRTL() ? "rtl" : "ltr";
  $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  listeners.forEach((fn) => fn(lang));
}

export function setLang(next) {
  lang = next;
  storage.set(KEY, next);
  applyLang();
}

export function initLangToggle(button) {
  button.addEventListener("click", () => setLang(lang === "en" ? "ar" : "en"));
}
