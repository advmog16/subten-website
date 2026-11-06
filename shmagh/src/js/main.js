/**
 * SHMAQ STUDIO — entry point.
 * Each section lives in its own module under ./modules; content lives in ./data.
 */
import { CONFIG } from "./config.js";
import { $, $$ } from "./utils.js";
import { applyLang, initLangToggle } from "./i18n.js";
import { initScroll } from "./scroll.js";

import { runLoader } from "./modules/loader.js";
import { initHero, startHero } from "./modules/hero.js";
import { initCursor, initMagnetic } from "./modules/cursor.js";
import { initNav, isMenuOpen, setMenu } from "./modules/nav.js";
import { initManifesto } from "./modules/manifesto.js";
import { initBand } from "./modules/band.js";
import { initWork } from "./modules/work.js";
import { initCase, isCaseOpen, closeCase, handleCaseKeys } from "./modules/case.js";
import { initVideo, isVideoOpen, closeVideo } from "./modules/video.js";
import { initStrip } from "./modules/strip.js";
import { initApproach } from "./modules/approach.js";
import { initClients } from "./modules/clients.js";
import { initReveal } from "./modules/reveal.js";

function initContact() {
  $$("[data-email]").forEach((a) => {
    a.href = `mailto:${CONFIG.email}`;
    if (a.hasAttribute("data-email-text")) a.textContent = CONFIG.email;
  });
  $(".year").textContent = new Date().getFullYear();
}

/** Escape closes the top-most layer; arrows page through case studies. */
function initKeyboard() {
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (isVideoOpen()) closeVideo();
      else if (isCaseOpen()) closeCase();
      else if (isMenuOpen()) setMenu(false);
      return;
    }
    if (isCaseOpen() && !isVideoOpen()) handleCaseKeys(e);
  });
}

const firstSlide = initHero();
initNav();
initManifesto();
initBand();
initWork();
initCase();
initVideo();
initStrip();
initApproach();
initClients();
initCursor();
initMagnetic();
initContact();
initKeyboard();
initLangToggle($(".lang"));

applyLang();      // renders all language-dependent content
initReveal();     // after cards exist
initScroll();
runLoader(firstSlide, startHero);
