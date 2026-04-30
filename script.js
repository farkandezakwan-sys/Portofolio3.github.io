/* ===== script.js ===== */

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
});

function animateRing() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) *.15;
  cursorRing.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .cert-card, .project-card, .g-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorRing.style.width = '56px';
    cursorRing.style.height = '56px';
    cursorRing.style.opacity = '0.8';
    cursor.style.opacity = '0';
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.style.width = '36px';
    cursorRing.style.height = '36px';
    cursorRing.style.opacity = '0.5';
    cursor.style.opacity = '1';
  });
});

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── DARK / LIGHT TOGGLE ──
const darkToggle = document.getElementById('darkToggle');
const toggleIcon = darkToggle.querySelector('.toggle-icon');
let isLight = false;
darkToggle.addEventListener('click', () => {
  isLight = !isLight;
  document.body.classList.toggle('light', isLight);
  toggleIcon.textContent = isLight ? '🌙' : '☀';
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.section, .cert-card, .project-card, .g-item, .info-card, .contact-item');
reveals.forEach(el => el.classList.add('reveal'));

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
reveals.forEach(el => revealObs.observe(el));

// ── GALLERY FILTER ──
function filterGallery(type, btn) {
  document.querySelectorAll('.gtab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.g-item').forEach(item => {
    if (type === 'all' || item.classList.contains(type)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// ── LIGHTBOX (PDF / IMG) ──
function openLightbox(src, title) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lbTitle').textContent = title;
  const content = document.getElementById('lbContent');
  const isPdf = src.endsWith('.pdf');
  if (isPdf) {
    content.innerHTML = `<iframe src="${src}" title="${title}"></iframe>`;
  } else {
    content.innerHTML = `<img src="${src}" alt="${title}" />`;
  }
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function openImgLightbox(src, title) {
  openLightbox(src, title);
}
function closeLightbox(e) {
  if (!e || e.target === document.getElementById('lightbox') || e.target.classList.contains('lb-close')) {
    document.getElementById('lightbox').classList.remove('active');
    document.getElementById('lbContent').innerHTML = '';
    document.body.style.overflow = '';
  }
}

// ── PROJECT MODAL DATA ──
const projectData = {
  ai: {
    tag: 'AI · Mobile · IoT',
    title: 'AI-Powered Smart Road Pothole Mapper',
    desc: `An end-to-end AI system that uses a smartphone's camera, accelerometer, and GPS to detect, validate, and map road potholes in real-time. The solution generates heat maps for city authorities to prioritize repairs — shifting road maintenance from reactive to proactive.`,
    details: [
      { heading: 'How It Works', items: [
        'Camera scans road with YOLOv8 drawing bounding boxes around potholes',
        'Accelerometer detects physical jolts to confirm detection and increase confidence',
        'GPS captures precise latitude/longitude of each confirmed pothole',
        'Web dashboard aggregates reports into color-coded heat maps (red = urgent)',
        'Automated maintenance tickets sent when multiple users report the same spot'
      ]},
      { heading: 'Impact', items: [
        'Reduces accident risk through proactive infrastructure maintenance',
        'Cuts repair costs by targeting high-priority zones first',
        'Free app for drivers, subscription model for city authorities'
      ]}
    ],
    tech: ['YOLOv8', 'TensorFlow Lite', 'Google Maps API', 'PyTorch Mobile', 'Python', 'GPS/Accelerometer']
  },
  design: {
    tag: 'Design Thinking · EdTech · SDG 4 & 10',
    title: 'Breaking Language Barriers — Multilingual Learning Ecosystem',
    desc: `A full design thinking project for MIT-VPU's Batch 2025-26 addressing language barriers at Agastya Foundation. Students from diverse linguistic backgrounds struggle when taught in English. The solution is a multilingual learning ecosystem combining AI translation, bilingual visual aids, and peer support groups.`,
    details: [
      { heading: 'User Persona: Asha, 13, Rural Karnataka', items: [
        'Native Kannada speaker struggling with English science classes',
        '"Maybe I\'m not smart enough" — the real cost of language barriers',
        'Needs native-language support while improving English gradually'
      ]},
      { heading: 'Solution Components', items: [
        'AI-powered real-time translation tools for classrooms',
        'Visual + bilingual learning aids (infographics, AR/VR models)',
        'Peer-led language bridging groups',
        'Teacher-friendly translation dashboard with pronunciation help'
      ]},
      { heading: 'SDG Alignment', items: [
        'SDG 4 — Quality Education: equal access regardless of language',
        'SDG 10 — Reduced Inequalities: minimizes regional/linguistic gaps',
        'Environmental: digital resources cut paper waste'
      ]}
    ],
    tech: ['AI Translation', 'AR/VR Models', 'Design Thinking', 'SDG 4', 'SDG 10', 'EdTech']
  },
  chem: {
    tag: 'Environmental Chemistry · Biotech · SDG 15',
    title: 'Biochar-Microbe Hybrid Matrix — The Living Soil Reactor',
    desc: `An innovative environmental remediation system that combines biochar adsorption with metal-eating bacteria (bioremediation) to transform contaminated industrial soil into restored, fertile ecosystems. The approach is chemical-free, cost-effective, and fully sustainable.`,
    details: [
      { heading: 'The Process', items: [
        'Phyto-extraction: vetiver roots pull heavy metals from contaminated soil',
        'Plants are harvested and pyrolyzed to create biochar',
        'Biochar is inoculated with metal-eating bacteria (Pseudomonas, Bacillus)',
        'Hybrid matrix is applied to contaminated zones for remediation',
        'Result: restored ecosystem with improved water clarity'
      ]},
      { heading: 'Impact in Numbers', items: [
        '65% increase in soil fertility index',
        '70% reduction in heavy metals (Pb, Cd, Cr)',
        '50% reduction in toxin leaching to groundwater',
        '100% biomass recycled — zero chemical input',
        'Cost: ₹15,000–25,000/hectare with 40% lower maintenance'
      ]}
    ],
    tech: ['Biochar', 'Bioremediation', 'Phyto-Extraction', 'Zero Chemicals', 'Sustainability', 'SDG 15']
  }
};

function openProject(key) {
  const d = projectData[key];
  if (!d) return;

  let detailsHtml = d.details.map(sec => `
    <div class="modal-proj-detail">
      <h4>${sec.heading}</h4>
      <ul>${sec.items.map(i => `<li>${i}</li>`).join('')}</ul>
    </div>
  `).join('');

  let techHtml = d.tech.map(t => `<span class="modal-tech">${t}</span>`).join('');

  document.getElementById('modalContent').innerHTML = `
    <div class="modal-proj-tag">${d.tag}</div>
    <h2 class="modal-proj-title">${d.title}</h2>
    <p class="modal-proj-desc">${d.desc}</p>
    ${detailsHtml}
    <div class="modal-tech-wrap">${techHtml}</div>
  `;

  document.getElementById('projectModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (!e || e.target === document.getElementById('projectModal') || e.target.classList.contains('lb-close')) {
    document.getElementById('projectModal').classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ── CONTACT FORM ──
function handleSubmit(e) {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  success.style.display = 'block';
  e.target.reset();
  setTimeout(() => { success.style.display = 'none'; }, 5000);
}

// ── KEYBOARD ESC ──
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeModal();
  }
});

// ── SMOOTH ACTIVE NAV ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
});
