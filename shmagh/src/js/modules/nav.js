/** Header (hides on scroll down, returns on scroll up) and the mobile menu. */
import { $, $$, lockScroll } from "../utils.js";
import { onFrame } from "../scroll.js";

const nav = $(".nav");
const burger = $(".burger");
const menu = $("#menu");
let open = false;
let lastY = scrollY;

export const isMenuOpen = () => open;

export function setMenu(next) {
  if (next === open) return;
  open = next;
  document.body.classList.toggle("menu-open", open);
  burger.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-hidden", String(!open));
  lockScroll(open);
}

export function initNav() {
  burger.addEventListener("click", () => setMenu(!open));
  $$("#menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

  onFrame((y, vp) => {
    const pastHero = y > vp.h * 0.9;
    if (!open && pastHero && y > lastY + 2) nav.classList.add("is-hidden");
    if (y < lastY - 2 || !pastHero) nav.classList.remove("is-hidden");
    lastY = y;
  });
}
