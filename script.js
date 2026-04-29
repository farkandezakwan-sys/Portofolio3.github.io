// ==============================
// THEME TOGGLE
// ==============================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// ==============================
// NAVBAR SCROLL EFFECT
// ==============================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.padding = '0.6rem 2.5rem';
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
  } else {
    navbar.style.padding = '';
    navbar.style.boxShadow = '';
  }
});

// ==============================
// MOBILE MENU
// ==============================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  hamburger.querySelector('i').className = mobileMenu.classList.contains('open')
    ? 'fas fa-times' : 'fas fa-bars';
});

function closeMobile() {
  mobileMenu.classList.remove('open');
  hamburger.querySelector('i').className = 'fas fa-bars';
}

// ==============================
// SMOOTH SCROLL
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

// ==============================
// REVEAL ON SCROLL
// ==============================
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

// ==============================
// SKILL BAR ANIMATION
// ==============================
const skillBars = document.querySelectorAll('.fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => barObserver.observe(bar));

// ==============================
// MODALS
// ==============================
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function closeModalOutside(event, id) {
  if (event.target === document.getElementById(id)) {
    closeModal(id);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => {
      m.classList.remove('active');
    });
    closeLightbox();
    document.body.style.overflow = '';
  }
});

// ==============================
// LIGHTBOX
// ==============================
function openLightbox(el) {
  const img = el.querySelector('img');
  if (!img) return;
  document.getElementById('lightboxImg').src = img.src;
  document.getElementById('lightboxOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightboxOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

// ==============================
// CONTACT FORM
// ==============================
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('Message sent! I\'ll get back to you soon. ✅');
  e.target.reset();
});

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ==============================
// ACTIVE NAV LINK ON SCROLL
// ==============================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--accent)';
    }
  });
});

// ==============================
// CURSOR TRAIL (subtle)
// ==============================
let dots = [];
const maxDots = 8;

document.addEventListener('mousemove', (e) => {
  const dot = document.createElement('div');
  dot.style.cssText = `
    position:fixed;left:${e.clientX}px;top:${e.clientY}px;
    width:6px;height:6px;border-radius:50%;
    background:rgba(59,130,246,0.4);pointer-events:none;
    z-index:9999;transform:translate(-50%,-50%);
    transition:all 0.5s ease;
  `;
  document.body.appendChild(dot);
  dots.push(dot);

  setTimeout(() => {
    dot.style.opacity = '0';
    dot.style.transform = 'translate(-50%,-50%) scale(0)';
  }, 50);

  setTimeout(() => {
    dot.remove();
    dots = dots.filter(d => d !== dot);
  }, 600);
});

// ==============================
// TYPED TEXT EFFECT IN HERO
// ==============================
const taglines = [
  'CS Student @ MIT-VPU Solapur',
  'Discrete Math Specialist',
  'Aspiring Software Engineer',
  'Tech Enthusiast & Builder'
];
let taglineIndex = 0;
let charIndex = 0;
let isDeleting = false;
const taglineEl = document.querySelector('.hero-tagline');

function typeEffect() {
  if (!taglineEl) return;
  const current = taglines[taglineIndex];

  if (!isDeleting) {
    taglineEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
  } else {
    taglineEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      taglineIndex = (taglineIndex + 1) % taglines.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 40 : 70);
}

setTimeout(typeEffect, 1500);

// ==============================
// FLOATING PARTICLES IN HERO
// ==============================
function createParticle() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const p = document.createElement('div');
  const size = Math.random() * 4 + 2;
  const x = Math.random() * window.innerWidth;
  const duration = Math.random() * 4 + 4;
  const delay = Math.random() * 3;

  p.style.cssText = `
    position:absolute;width:${size}px;height:${size}px;
    border-radius:50%;left:${x}px;bottom:-10px;
    background:rgba(59,130,246,${Math.random() * 0.3 + 0.1});
    pointer-events:none;z-index:0;
    animation:floatUp ${duration}s ${delay}s ease-in infinite;
  `;
  hero.appendChild(p);
  setTimeout(() => p.remove(), (duration + delay) * 1000 + 500);
}

// Add float keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes floatUp {
    0% { transform: translateY(0) scale(1); opacity: 1; }
    100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
  }
`;
document.head.appendChild(style);

setInterval(createParticle, 1200);
