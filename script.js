// THEME TOGGLE
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const saved = localStorage.getItem('theme') || 'light';
root.setAttribute('data-theme', saved);
themeToggle.textContent = saved === 'dark' ? '☽' : '☀';

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? '☽' : '☀';
});

// NAVBAR + SCROLL TOP
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  hamburger.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
});
function closeMobile() {
  mobileMenu.classList.remove('open');
  hamburger.textContent = '☰';
}
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) closeMobile();
});

// REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('revealed'), entry.target.dataset.delay || 0);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach((el) => {
  const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
  el.dataset.delay = siblings.indexOf(el) * 80;
  revealObserver.observe(el);
});

// STRENGTH BARS
const bars = document.querySelectorAll('.strength-bar');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('animate'); });
}, { threshold: 0.5 });
bars.forEach(b => barObserver.observe(b));

// GALLERY FILTER
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => item.classList.toggle('hidden', filter !== 'all' && item.dataset.type !== filter));
  });
});

// LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
let currentIndex = 0;

function getVisible() { return [...galleryItems].filter(i => !i.classList.contains('hidden')); }

function openLightbox(idx) {
  const visible = getVisible();
  currentIndex = idx;
  const img = visible[currentIndex]?.querySelector('img');
  if (img) { lightboxImg.src = img.src; lightboxImg.alt = img.alt; }
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() { lightbox.classList.remove('open'); document.body.style.overflow = ''; }

function showPrev() {
  const v = getVisible(); currentIndex = (currentIndex - 1 + v.length) % v.length;
  const img = v[currentIndex]?.querySelector('img');
  if (img) { lightboxImg.src = img.src; lightboxImg.alt = img.alt; }
}

function showNext() {
  const v = getVisible(); currentIndex = (currentIndex + 1) % v.length;
  const img = v[currentIndex]?.querySelector('img');
  if (img) { lightboxImg.src = img.src; lightboxImg.alt = img.alt; }
}

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const visible = getVisible();
    const idx = visible.indexOf(item);
    if (idx !== -1) openLightbox(idx);
  });
});

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', showPrev);
document.getElementById('lightboxNext').addEventListener('click', showNext);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});

// CONTACT FORM
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...'; btn.disabled = true;
  setTimeout(() => {
    document.getElementById('formSuccess').style.display = 'block';
    e.target.reset(); btn.textContent = 'Send Message ↗'; btn.disabled = false;
    setTimeout(() => { document.getElementById('formSuccess').style.display = 'none'; }, 4000);
  }, 1200);
});

// TYPING EFFECT
const taglines = ['Student', 'Developer', 'Problem Solver', 'Innovator'];
let ti = 0, ci = 0, deleting = false;
const taglineEl = document.getElementById('tagline');
function type() {
  const cur = taglines[ti];
  taglineEl.textContent = deleting ? cur.substring(0, ci--) : cur.substring(0, ci++);
  if (!deleting && ci === cur.length + 1) { deleting = true; setTimeout(type, 1500); return; }
  if (deleting && ci === 0) { deleting = false; ti = (ti + 1) % taglines.length; }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ACTIVE NAV LINK
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => { l.style.color = l.getAttribute('href') === `#${entry.target.id}` ? 'var(--accent)' : ''; });
    }
  });
}, { threshold: 0.5 }).observe(...sections, sections);

const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => { l.style.color = l.getAttribute('href') === `#${entry.target.id}` ? 'var(--accent)' : ''; });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObs.observe(s));
