/* ==============================
   ROOT & VARIABLES
================================ */
:root {
  --bg: #050a14;
  --bg2: #0b1220;
  --bg3: #0f1a2e;
  --surface: #111827;
  --surface2: #1a2540;
  --accent: #3b82f6;
  --accent2: #60a5fa;
  --accent-glow: rgba(59, 130, 246, 0.3);
  --gold: #f59e0b;
  --text: #e2e8f0;
  --text-muted: #94a3b8;
  --border: rgba(59, 130, 246, 0.2);
  --radius: 16px;
  --transition: 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="light"] {
  --bg: #f0f4ff;
  --bg2: #e8eef8;
  --bg3: #dde6f5;
  --surface: #ffffff;
  --surface2: #eef2fc;
  --accent: #2563eb;
  --accent2: #3b82f6;
  --accent-glow: rgba(37, 99, 235, 0.15);
  --text: #0f172a;
  --text-muted: #475569;
  --border: rgba(37, 99, 235, 0.2);
}

/* ==============================
   RESET & BASE
================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.7;
  overflow-x: hidden;
  transition: background var(--transition), color var(--transition);
}

h1, h2, h3 { font-family: 'Syne', sans-serif; line-height: 1.2; }

a { text-decoration: none; color: inherit; }

img { max-width: 100%; display: block; }

/* ==============================
   THEME TOGGLE
================================ */
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 999;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  box-shadow: 0 4px 20px var(--accent-glow);
  transition: all var(--transition);
}
.theme-toggle:hover { background: var(--accent); color: white; transform: rotate(20deg); }

/* ==============================
   NAVBAR
================================ */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 900;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2.5rem;
  background: rgba(5, 10, 20, 0.7);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  transition: all var(--transition);
}

[data-theme="light"] .navbar { background: rgba(240,244,255,0.8); }

.nav-logo {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.6rem;
  color: var(--accent);
  letter-spacing: 2px;
}

.nav-links { display: flex; gap: 2rem; list-style: none; }
.nav-links a {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted);
  transition: color var(--transition);
  position: relative;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  width: 0; height: 2px;
  background: var(--accent);
  transition: width var(--transition);
}
.nav-links a:hover { color: var(--accent); }
.nav-links a:hover::after { width: 100%; }

.hamburger {
  display: none;
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.4rem;
  cursor: pointer;
}

/* Mobile menu */
.mobile-menu {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: var(--bg);
  z-index: 850;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-100%);
  transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
}
.mobile-menu.open { transform: translateX(0); }
.mobile-menu ul { list-style: none; text-align: center; }
.mobile-menu ul li { margin: 1.5rem 0; }
.mobile-menu ul li a {
  font-family: 'Syne', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
  transition: color var(--transition);
}
.mobile-menu ul li a:hover { color: var(--accent); }

/* ==============================
   HERO
================================ */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7rem 2rem 4rem;
  position: relative;
  overflow: hidden;
  background: radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.12) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(96,165,250,0.07) 0%, transparent 50%),
              var(--bg);
}

.hero-bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 5rem;
  max-width: 1100px;
  width: 100%;
  z-index: 1;
  animation: heroFadeIn 1s ease forwards;
}

@keyframes heroFadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Profile photo */
.hero-photo-wrap {
  position: relative;
  flex-shrink: 0;
}

.hero-photo {
  width: 280px;
  height: 280px;
  border-radius: 30px;
  object-fit: cover;
  object-position: top;
  border: 3px solid var(--border);
  box-shadow: 0 0 60px var(--accent-glow), 0 20px 60px rgba(0,0,0,0.4);
  transition: transform var(--transition);
}
.hero-photo:hover { transform: scale(1.02) rotate(-1deg); }

.hero-photo-ring {
  position: absolute;
  inset: -12px;
  border-radius: 38px;
  border: 2px dashed rgba(59,130,246,0.3);
  animation: rotateSlow 20s linear infinite;
}
@keyframes rotateSlow { to { transform: rotate(360deg); } }

/* Hero text */
.hero-text { flex: 1; }
.hero-greeting {
  color: var(--accent);
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  animation: heroFadeIn 1s 0.2s both;
}

.hero-name {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.05;
  margin-bottom: 1rem;
  animation: heroFadeIn 1s 0.3s both;
}
.hero-name span {
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-tagline {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  animation: heroFadeIn 1s 0.4s both;
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2rem;
  animation: heroFadeIn 1s 0.5s both;
}

.badge {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 0.35rem 0.9rem;
  border-radius: 100px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all var(--transition);
}
.badge i { color: var(--accent); }
.badge:hover { border-color: var(--accent); color: var(--text); }

.hero-cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  animation: heroFadeIn 1s 0.6s both;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  color: white;
  padding: 0.85rem 2rem;
  border-radius: 100px;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: all var(--transition);
  box-shadow: 0 8px 30px var(--accent-glow);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 16px 40px var(--accent-glow); }
.btn-primary.full-width { width: 100%; justify-content: center; border-radius: var(--radius); }

.btn-outline {
  background: transparent;
  color: var(--text);
  padding: 0.85rem 2rem;
  border-radius: 100px;
  font-weight: 600;
  font-size: 0.95rem;
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.btn-outline:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-3px); }

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
.scroll-indicator span {
  display: block;
  width: 2px;
  height: 50px;
  background: linear-gradient(to bottom, var(--accent), transparent);
  margin: auto;
  animation: scrollPulse 2s infinite;
}
@keyframes scrollPulse {
  0%, 100% { opacity: 1; transform: scaleY(1); }
  50% { opacity: 0.3; transform: scaleY(0.5); }
}

/* ==============================
   SECTIONS
================================ */
.section { padding: 6rem 1.5rem; }
.alt-section { background: var(--bg2); }

.container { max-width: 1100px; margin: auto; }

.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}
.section-tag {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent);
  display: block;
  margin-bottom: 0.5rem;
}
.section-header h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
}

/* ==============================
   ABOUT
================================ */
.about-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.about-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem;
  transition: all var(--transition);
}
.about-card:hover {
  border-color: var(--accent);
  transform: translateY(-5px);
  box-shadow: 0 20px 50px var(--accent-glow);
}

.about-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: white;
  margin-bottom: 1rem;
}

.about-card h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.edu-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
.edu-list li { border-left: 2px solid var(--border); padding-left: 1rem; }
.edu-list li strong { display: block; font-size: 0.95rem; color: var(--text); }
.edu-list li span { display: block; font-size: 0.82rem; color: var(--text-muted); }
.cgpa {
  display: inline-block !important;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  font-size: 0.9rem !important;
}

.interests-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}
.interest-item {
  background: var(--surface2);
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  font-size: 0.82rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  transition: all var(--transition);
}
.interest-item i { color: var(--accent); }
.interest-item:hover { color: var(--text); background: var(--border); }

.skills-wrap { display: flex; flex-direction: column; gap: 0.9rem; }
.skill-bar span { font-size: 0.82rem; color: var(--text-muted); display: block; margin-bottom: 4px; }
.bar {
  height: 6px;
  background: var(--surface2);
  border-radius: 100px;
  overflow: hidden;
}
.fill {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  border-radius: 100px;
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.fill.animated { width: var(--w); }

.goal-text { color: var(--text-muted); font-size: 0.9rem; line-height: 1.7; margin-bottom: 1.2rem; }
.prn-box {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
}
.prn-box span { color: var(--text-muted); }

/* ==============================
   ACHIEVEMENTS
================================ */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.achievement-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  cursor: pointer;
  transition: all var(--transition);
  position: relative;
  overflow: hidden;
}
.achievement-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent-glow), transparent);
  opacity: 0;
  transition: opacity var(--transition);
}
.achievement-card:hover { border-color: var(--accent); transform: translateY(-5px); box-shadow: 0 20px 50px var(--accent-glow); }
.achievement-card:hover::before { opacity: 1; }

.ach-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: white;
}
.coursera-color { background: linear-gradient(135deg, #0056d2, #003b99); }
.ai4a-color { background: linear-gradient(135deg, #7c3aed, #5b21b6); }
.dt-color { background: linear-gradient(135deg, #d97706, #b45309); }
.ace-color { background: linear-gradient(135deg, #059669, #047857); }
.edu-color { background: linear-gradient(135deg, #dc2626, #b91c1c); }
.edu2-color { background: linear-gradient(135deg, #0891b2, #0e7490); }

.ach-issuer { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); font-weight: 600; }
.ach-body h3 { font-size: 1rem; font-family: 'Syne', sans-serif; margin: 0.2rem 0; }
.ach-body p { font-size: 0.85rem; color: var(--text-muted); }
.ach-date { font-size: 0.78rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.4rem; }
.ach-view {
  font-size: 0.82rem;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 600;
  margin-top: auto;
}

/* ==============================
   PROJECTS
================================ */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: all var(--transition);
}
.project-card:hover { border-color: var(--accent); transform: translateY(-6px); box-shadow: 0 25px 60px var(--accent-glow); }

.project-img { height: 160px; overflow: hidden; }
.project-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  opacity: 0.9;
}
.ai4a-bg { background: linear-gradient(135deg, #7c3aed, #4c1d95); }
.dt-bg { background: linear-gradient(135deg, #d97706, #7c2d12); }
.ace-bg { background: linear-gradient(135deg, #059669, #064e3b); }
.portfolio-bg { background: linear-gradient(135deg, #0056d2, #0f172a); }

.project-body { padding: 1.5rem; }
.project-tag {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent);
  display: block;
  margin-bottom: 0.5rem;
}
.project-body h3 { font-size: 1.05rem; margin-bottom: 0.6rem; }
.project-body p { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem; }

.project-tech { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem; }
.project-tech span {
  background: var(--surface2);
  border: 1px solid var(--border);
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.project-links { display: flex; gap: 0.8rem; }
.proj-link {
  font-size: 0.82rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: color var(--transition);
}
.proj-link:hover { color: var(--accent); }
.proj-link.live { color: var(--accent); }

/* ==============================
   GALLERY
================================ */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.gallery-item {
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
  cursor: pointer;
  position: relative;
  transition: all var(--transition);
  aspect-ratio: 4/3;
}
.gallery-item:first-child { aspect-ratio: 3/4; }
.gallery-item:hover { border-color: var(--accent); transform: scale(1.02); box-shadow: 0 15px 40px var(--accent-glow); }

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.5s ease;
}
.gallery-item:hover img { transform: scale(1.05); }

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(5, 10, 20, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0;
  transition: opacity var(--transition);
}
.gallery-item:hover .gallery-overlay { opacity: 1; }

/* Cert thumbs */
.cert-thumb {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 1rem;
  text-align: center;
}
.cert-thumb i { font-size: 2.5rem; color: white; }
.cert-thumb span { color: white; font-weight: 700; font-size: 0.9rem; font-family: 'Syne', sans-serif; }
.cert-thumb small { color: rgba(255,255,255,0.7); font-size: 0.75rem; }

.coursera-bg { background: linear-gradient(135deg, #0056d2, #003b99); }
.ai4a-thumb { background: linear-gradient(135deg, #7c3aed, #4c1d95); }
.dt-thumb { background: linear-gradient(135deg, #d97706, #92400e); }
.ace-thumb { background: linear-gradient(135deg, #059669, #064e3b); }

/* ==============================
   CONTACT
================================ */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.contact-info h3 { font-size: 1.6rem; margin-bottom: 0.8rem; }
.contact-info > p { color: var(--text-muted); margin-bottom: 1.8rem; font-size: 0.95rem; }

.contact-items { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.8rem; }
.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: all var(--transition);
}
.contact-item:hover { border-color: var(--accent); transform: translateX(5px); }
.ci-icon {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}
.contact-item span { font-size: 0.75rem; color: var(--text-muted); display: block; }
.contact-item strong { font-size: 0.9rem; }

.social-links { display: flex; gap: 0.8rem; }
.social-btn {
  width: 42px;
  height: 42px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 1.1rem;
  transition: all var(--transition);
}
.social-btn:hover { background: var(--accent); border-color: var(--accent); color: white; transform: translateY(-3px); }

/* Contact Form */
.contact-form-wrap {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem;
}

.form-group { margin-bottom: 1.2rem; }
.form-group label { display: block; font-size: 0.82rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.4rem; text-transform: uppercase; letter-spacing: 1px; }
.form-group input,
.form-group textarea {
  width: 100%;
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.8rem 1rem;
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  outline: none;
  transition: all var(--transition);
  resize: vertical;
}
.form-group input:focus,
.form-group textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }

/* ==============================
   FOOTER
================================ */
.footer {
  background: var(--bg2);
  border-top: 1px solid var(--border);
  padding: 2rem 1.5rem;
  text-align: center;
}
.footer p { color: var(--text-muted); font-size: 0.85rem; }
.footer-prn { margin-top: 0.3rem; font-size: 0.78rem; }

/* ==============================
   MODALS
================================ */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition);
  backdrop-filter: blur(8px);
}
.modal-overlay.active { opacity: 1; pointer-events: all; }

.modal-box {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  transform: translateY(20px);
  transition: transform 0.4s ease;
}
.modal-overlay.active .modal-box { transform: translateY(0); }

.modal-close {
  position: absolute;
  top: 1rem; right: 1rem;
  background: var(--surface2);
  border: none;
  color: var(--text);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all var(--transition);
}
.modal-close:hover { background: var(--accent); color: white; }

.modal-box h2 { font-size: 1.5rem; margin-bottom: 0.3rem; }
.modal-sub { color: var(--text-muted); font-size: 0.88rem; margin-bottom: 1.5rem; }
.cert-embed { border-radius: 10px; overflow: hidden; border: 1px solid var(--border); }
.verify-link { margin-top: 1rem; font-size: 0.82rem; color: var(--text-muted); }
.verify-link a { color: var(--accent); }

/* LIGHTBOX */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.95);
  z-index: 9500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}
.lightbox-overlay.active { opacity: 1; pointer-events: all; }
.lightbox-overlay img {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 20px 80px rgba(0,0,0,0.8);
}
.lightbox-close {
  position: absolute;
  top: 1.5rem; right: 1.5rem;
  background: rgba(255,255,255,0.1);
  border: none;
  color: white;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition);
}
.lightbox-close:hover { background: var(--accent); }

/* ==============================
   REVEAL ANIMATIONS
================================ */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ==============================
   TOAST
================================ */
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: var(--accent);
  color: white;
  padding: 0.9rem 2rem;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
  z-index: 9999;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}
.toast.show { transform: translateX(-50%) translateY(0); }

/* ==============================
   RESPONSIVE
================================ */
@media (max-width: 900px) {
  .hero-content { flex-direction: column; text-align: center; gap: 2.5rem; }
  .hero-photo { width: 220px; height: 220px; }
  .hero-badges { justify-content: center; }
  .hero-cta { justify-content: center; }
  .contact-grid { grid-template-columns: 1fr; }
  .nav-links { display: none; }
  .hamburger { display: block; }
}

@media (max-width: 600px) {
  .theme-toggle { top: auto; bottom: 5rem; right: 1rem; }
  .navbar { padding: 1rem 1.2rem; }
  .about-grid { grid-template-columns: 1fr; }
  .achievements-grid { grid-template-columns: 1fr; }
  .projects-grid { grid-template-columns: 1fr; }
  .gallery-grid { grid-template-columns: 1fr 1fr; }
  .section { padding: 4rem 1rem; }
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 3px; }
