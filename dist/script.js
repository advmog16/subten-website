const root = document.documentElement;
const body = document.body;
const progress = document.querySelector('.scroll-progress span');
const hero = document.querySelector('.hero');
const command = document.querySelector('.command-scene');
const sovereignty = document.querySelector('.sovereignty');
const nav = document.querySelector('.nav');
const flowItems = [...document.querySelectorAll('.flow-item')];
const chapterLinks = [...document.querySelectorAll('[data-chapter]')];
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const sceneProgress = (element) => {
  const rect = element.getBoundingClientRect();
  return clamp(-rect.top / Math.max(1, rect.height - window.innerHeight));
};

let targetScroll = window.scrollY;
let smoothScroll = targetScroll;
let frameRequested = false;

function renderMotion() {
  targetScroll = window.scrollY;
  smoothScroll += (targetScroll - smoothScroll) * (reduceMotion ? 1 : .12);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max ? targetScroll / max : 0})`;
  nav.classList.toggle('scrolled', targetScroll > 70);

  const heroP = sceneProgress(hero);
  root.style.setProperty('--hero-scale', String(1.04 + heroP * .24));
  root.style.setProperty('--hero-y', `${heroP * 34}px`);
  root.style.setProperty('--hero-copy-y', `${heroP * -95}px`);
  root.style.setProperty('--hero-copy-opacity', String(1 - clamp((heroP - .47) / .38)));
  root.style.setProperty('--scan-y', `${8 + heroP * 78}%`);
  root.style.setProperty('--scene-progress', `${heroP * 100}%`);

  const commandP = sceneProgress(command);
  root.style.setProperty('--command-scale', String(1.12 - commandP * .12));
  root.style.setProperty('--command-x', `${(commandP - .5) * -22}px`);
  root.style.setProperty('--command-copy-y', `${clamp((commandP - .62) / .25) * -70}px`);
  root.style.setProperty('--command-copy-opacity', String(1 - clamp((commandP - .7) / .22)));
  root.style.setProperty('--map-scale', String(.82 + commandP * .28));
  root.style.setProperty('--map-opacity', String(.22 + clamp(commandP / .45) * .58));
  root.style.setProperty('--flow-progress', `${clamp(commandP / .88) * 100}%`);
  flowItems.forEach((item, index) => {
    const active = clamp((commandP - index * .145) / .18);
    item.style.setProperty('--flow-opacity', String(.22 + active * .78));
    item.style.setProperty('--flow-y', `${(1 - active) * 1.5}rem`);
  });

  const sovereignRect = sovereignty.getBoundingClientRect();
  const sovereignP = clamp((window.innerHeight - sovereignRect.top) / (window.innerHeight + sovereignRect.height));
  root.style.setProperty('--sovereignty-y', `${(sovereignP - .5) * 85}px`);
  root.style.setProperty('--orbit-rotate', `${sovereignP * 85}deg`);

  const settled = Math.abs(targetScroll - smoothScroll) < .2;
  frameRequested = false;
  if (!settled) requestMotion();
}

function requestMotion() {
  if (!frameRequested) {
    requestAnimationFrame(renderMotion);
    frameRequested = true;
  }
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.children].filter((node) => node.classList.contains('reveal'));
      const index = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${Math.max(index, 0) * 70}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .14 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const chapterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id || entry.target.dataset.chapterSection || 'top';
    chapterLinks.forEach((link) => link.classList.toggle('active', link.dataset.chapter === id));
  });
}, { rootMargin: '-42% 0px -48% 0px', threshold: 0 });

[hero, ...document.querySelectorAll('[data-chapter-section]')].forEach((section) => chapterObserver.observe(section));

document.querySelectorAll('.capability').forEach((item) => {
  item.addEventListener('pointermove', (event) => {
    const rect = item.getBoundingClientRect();
    item.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  });
});

if (!reduceMotion) {
  window.addEventListener('pointermove', (event) => {
    const x = event.clientX / window.innerWidth - .5;
    const y = event.clientY / window.innerHeight - .5;
    root.style.setProperty('--pointer-x', `${x * 13}px`);
    root.style.setProperty('--pointer-inverse-x', `${x * -24}px`);
    root.style.setProperty('--pointer-y', `${y * -17}px`);
  }, { passive: true });
}

function setupSignalField() {
  const canvas = document.querySelector('#signal-field');
  if (!canvas || reduceMotion) return;
  const context = canvas.getContext('2d');
  let points = [];
  let animationFrame;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * ratio);
    canvas.height = Math.round(canvas.clientHeight * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.max(22, Math.min(52, Math.floor(canvas.clientWidth / 34)));
    points = Array.from({ length: count }, (_, index) => ({
      x: (index * 137.5) % canvas.clientWidth,
      y: (index * 83.3) % canvas.clientHeight,
      vx: ((index % 5) - 2) * .035,
      vy: ((index % 7) - 3) * .022,
      phase: index * .7
    }));
  }

  function draw(time) {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    points.forEach((point) => {
      point.x = (point.x + point.vx + canvas.clientWidth) % canvas.clientWidth;
      point.y = (point.y + point.vy + canvas.clientHeight) % canvas.clientHeight;
    });
    for (let i = 0; i < points.length; i += 1) {
      const point = points[i];
      for (let j = i + 1; j < points.length; j += 1) {
        const other = points[j];
        const distance = Math.hypot(point.x - other.x, point.y - other.y);
        if (distance < 145) {
          context.strokeStyle = `rgba(128,104,255,${(1 - distance / 145) * .18})`;
          context.lineWidth = .65;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }
      const glow = .45 + Math.sin(time * .0012 + point.phase) * .25;
      context.fillStyle = `rgba(198,189,255,${glow})`;
      context.beginPath();
      context.arc(point.x, point.y, i % 9 === 0 ? 1.8 : .9, 0, Math.PI * 2);
      context.fill();
    }
    animationFrame = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  animationFrame = requestAnimationFrame(draw);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animationFrame);
    else animationFrame = requestAnimationFrame(draw);
  });
}

function closeMenu() {
  navToggle.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
  body.classList.remove('menu-open');
}

function openMenu() {
  navToggle.setAttribute('aria-expanded', 'true');
  mobileNav.classList.add('open');
  mobileNav.setAttribute('aria-hidden', 'false');
  body.classList.add('menu-open');
}

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    if (navToggle.getAttribute('aria-expanded') === 'true') closeMenu();
    else openMenu();
  });
  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeMenu();
  });
}

function setupCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor || reduceMotion || !finePointer) return;
  root.classList.add('has-cursor');
  let cx = window.innerWidth / 2;
  let cy = window.innerHeight / 2;
  let tx = cx;
  let ty = cy;

  function renderCursor() {
    cx += (tx - cx) * .18;
    cy += (ty - cy) * .18;
    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    requestAnimationFrame(renderCursor);
  }

  window.addEventListener('pointermove', (event) => {
    tx = event.clientX;
    ty = event.clientY;
    cursor.classList.add('active');
  }, { passive: true });
  window.addEventListener('pointerleave', () => cursor.classList.remove('active'));

  document.querySelectorAll('a, button, .capability, .domain').forEach((element) => {
    element.addEventListener('pointerenter', () => cursor.classList.add('hover'));
    element.addEventListener('pointerleave', () => cursor.classList.remove('hover'));
  });

  requestAnimationFrame(renderCursor);
}

function setupMagnetic() {
  if (reduceMotion || !finePointer) return;
  document.querySelectorAll('.magnetic').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate(${x * .28}px, ${y * .38}px)`;
    });
    element.addEventListener('pointerleave', () => {
      element.style.transform = '';
    });
  });
}

window.addEventListener('scroll', requestMotion, { passive: true });
window.addEventListener('resize', requestMotion);
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  const counter = document.querySelector('.preloader-status b');
  let value = 0;
  const count = window.setInterval(() => {
    value = Math.min(100, value + 7);
    counter.textContent = String(value).padStart(2, '0');
    if (value === 100) window.clearInterval(count);
  }, 55);
  window.setTimeout(() => preloader.classList.add('done'), 1050);
  body.classList.add('loaded');
  setupSignalField();
  setupCursor();
  setupMagnetic();
  renderMotion();
});
