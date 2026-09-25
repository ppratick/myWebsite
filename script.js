const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('#main-nav-links');
const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setNavigationOpen(open) {
  if (!hamburger || !navList) return;
  hamburger.setAttribute('aria-expanded', String(open));
  hamburger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  navList.classList.toggle('open', open);
}

hamburger?.addEventListener('click', () => {
  setNavigationOpen(hamburger.getAttribute('aria-expanded') !== 'true');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setNavigationOpen(false);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => setNavigationOpen(false));
});

const sections = [...document.querySelectorAll('main section[id]')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55%', threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));

if (!reducedMotion) {
  const revealItems = document.querySelectorAll('.glass-card, .section-heading');
  revealItems.forEach((item) => item.classList.add('reveal-item'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
}

function typeHeroLine() {
  const element = document.querySelector('.typed-line');
  if (!element || reducedMotion) return;

  const text = element.dataset.text || element.textContent.trim();
  element.textContent = '';
  let index = 0;

  const typeNext = () => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index += 1;
      window.setTimeout(typeNext, 38);
      return;
    }

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = ' |';
    cursor.style.animation = 'blink 1s infinite';
    element.appendChild(cursor);
  };

  window.setTimeout(typeNext, 350);
}

window.addEventListener('load', typeHeroLine);
