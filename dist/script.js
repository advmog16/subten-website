const root = document.documentElement;
const progress = document.querySelector('.scroll-progress span');
const hero = document.querySelector('.hero');
const command = document.querySelector('.command-scene');
const sovereignty = document.querySelector('.sovereignty');
const flowItems = [...document.querySelectorAll('.flow-item')];

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const sceneProgress = (element) => {
  const rect = element.getBoundingClientRect();
  return clamp(-rect.top / Math.max(1, rect.height - window.innerHeight));
};

let ticking = false;
function renderMotion() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max ? y / max : 0})`;

  const heroP = sceneProgress(hero);
  root.style.setProperty('--hero-scale', String(1.02 + heroP * 0.18));
  root.style.setProperty('--hero-y', `${heroP * 24}px`);

  const commandP = sceneProgress(command);
  root.style.setProperty('--command-scale', String(1.08 - commandP * 0.08));
  flowItems.forEach((item, index) => {
    const active = clamp((commandP - index * 0.14) / 0.18);
    item.style.setProperty('--flow-opacity', String(0.24 + active * 0.76));
    item.style.setProperty('--flow-y', `${(1 - active) * 1.5}rem`);
  });

  const sovereignRect = sovereignty.getBoundingClientRect();
  const sovereignP = clamp((window.innerHeight - sovereignRect.top) / (window.innerHeight + sovereignRect.height));
  root.style.setProperty('--sovereignty-y', `${(sovereignP - 0.5) * 70}px`);
  ticking = false;
}

function requestMotion() {
  if (!ticking) {
    requestAnimationFrame(renderMotion);
    ticking = true;
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
window.addEventListener('scroll', requestMotion, { passive: true });
window.addEventListener('resize', requestMotion);
window.addEventListener('load', () => {
  window.setTimeout(() => document.querySelector('.preloader').classList.add('done'), 900);
  renderMotion();
});
