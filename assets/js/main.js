/* ============================================
   AutoFlow AI — main.js
   ============================================ */

// === MOBILE NAV TOGGLE ===
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
navToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  spans[0].style.transform = navMenu.classList.contains('open') ? 'rotate(45deg) translate(5px,5px)' : '';
  spans[1].style.opacity = navMenu.classList.contains('open') ? '0' : '1';
  spans[2].style.transform = navMenu.classList.contains('open') ? 'rotate(-45deg) translate(5px,-5px)' : '';
});
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => navMenu?.classList.remove('open'));
});

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// === FAQ ACCORDION ===
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

// === CTA CLICK TRACKING ===
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const label = e.currentTarget.textContent.trim();
    const source = window.location.pathname;
    console.log('[CTA Click]', { label, source, timestamp: new Date().toISOString() });
    // Future: gtag('event', 'cta_click', { event_label: label });
  });
});

// === SCROLL ANIMATIONS ===
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); fadeObserver.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// === COUNTER ANIMATION ===
function animateCounter(el) {
  const raw = el.textContent.trim();
  const target = parseFloat(raw.replace(/[^0-9.]/g, ''));
  const suffix = raw.replace(/[0-9.]/g, '');
  const isDecimal = raw.includes('.');
  let current = 0;
  const duration = 1500;
  const steps = 60;
  const increment = target / steps;
  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
    if (current >= target) clearInterval(timer);
  }, duration / steps);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { animateCounter(entry.target); counterObserver.unobserve(entry.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num, .proof-num .num').forEach(el => counterObserver.observe(el));

// === ACTIVE NAV HIGHLIGHT ===
const navSections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 90;
  navSections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-menu a[href="#${id}"]`);
    if (link) link.style.color = (scrollPos >= top && scrollPos < top + height) ? 'var(--primary)' : '';
  });
}, { passive: true });
