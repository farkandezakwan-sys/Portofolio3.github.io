/* ============================================================
   ZAKWAN FARKANDE — PORTFOLIO  |  script.js
   ============================================================ */

/* ── 1. THEME TOGGLE ─────────────────────────────────────── */
const html      = document.documentElement;
const themeIcon = document.getElementById('themeIcon');

function setTheme(t) {
  html.setAttribute('data-theme', t);
  localStorage.setItem('zf-theme', t);
  themeIcon.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}
setTheme(localStorage.getItem('zf-theme') || 'dark');

document.getElementById('themeToggle').addEventListener('click', () => {
  setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ── 2. HAMBURGER MOBILE NAV ─────────────────────────────── */
const ham = document.getElementById('hamburger');
const nl  = document.getElementById('navLinks');
ham.addEventListener('click', () => nl.classList.toggle('open'));
nl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nl.classList.remove('open')));

/* ── 3. SCROLL REVEAL ────────────────────────────────────── */
const revObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ── 4. SKILL BARS ───────────────────────────────────────── */
const sbObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(b => { b.style.width = b.getAttribute('data-w'); });
      sbObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-wrap').forEach(s => sbObs.observe(s));

/* ── 5. BACK TO TOP ──────────────────────────────────────── */
const bt = document.getElementById('backTop');
window.addEventListener('scroll', () => bt.classList.toggle('show', scrollY > 400));
bt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── 6. GALLERY FILTER ───────────────────────────────────── */
document.querySelectorAll('.f-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const f = this.getAttribute('data-filter');
    document.querySelectorAll('.gal-item').forEach(item => {
      item.style.display = (f === 'all' || item.getAttribute('data-cat') === f) ? '' : 'none';
    });
  });
});

/* ── 7. LIGHTBOX ─────────────────────────────────────────── */
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbClose  = document.getElementById('lbClose');

document.querySelectorAll('.gal-item').forEach(item => {
  item.addEventListener('click', function () {
    // prefer data-src (for base64 embedded images), fallback to img src
    const src = this.getAttribute('data-src') || (this.querySelector('img') ? this.querySelector('img').src : null);
    const alt = this.querySelector('img') ? this.querySelector('img').alt : '';
    if (src && !src.includes('undefined')) {
      lbImg.src = src;
      lbImg.alt = alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});

function closeLB() { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
lbClose.addEventListener('click', closeLB);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });

/* ── 8. CONTACT FORM ─────────────────────────────────────── */
function sendForm() {
  const n   = document.getElementById('fn').value.trim();
  const e   = document.getElementById('fe').value.trim();
  const m   = document.getElementById('fm').value.trim();
  const msg = document.getElementById('fmsg');
  if (!n || !e || !m) {
    msg.style.color   = 'var(--accent2)';
    msg.textContent   = '⚠️ Please fill in your name, email and message.';
    msg.style.display = 'block';
    return;
  }
  msg.style.color   = 'var(--accent3)';
  msg.textContent   = "✅ Thank you! I'll get back to you soon.";
  msg.style.display = 'block';
  ['fn', 'fe', 'fs', 'fm'].forEach(id => { document.getElementById(id).value = ''; });
  setTimeout(() => { msg.style.display = 'none'; }, 5000);
}
window.sendForm = sendForm;

/* ── 9. ACTIVE NAV HIGHLIGHT ─────────────────────────────── */
const secs = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if (scrollY >= s.offsetTop - 100) cur = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--text)' : '';
  });
});
