/* ============================================
   GSAP SETUP
============================================ */
gsap.registerPlugin(ScrollTrigger);

const hasSplitText    = typeof SplitText !== 'undefined';
const hasScramble     = typeof ScrambleTextPlugin !== 'undefined';
const hasScrollSmoother = typeof ScrollSmoother !== 'undefined';

if (hasScramble)    gsap.registerPlugin(ScrambleTextPlugin);
if (hasScrollSmoother) gsap.registerPlugin(ScrollSmoother);

/* ============================================
   0. SCROLL SMOOTHER — scroll inertiel premium
============================================ */
let smoother;
if (hasScrollSmoother) {
  // Le HTML doit avoir #smooth-wrapper > #smooth-content
  // On l'insère dynamiquement si absent
  if (!document.getElementById('smooth-wrapper')) {
    const wrapper = document.createElement('div');
    wrapper.id = 'smooth-wrapper';
    const content = document.createElement('div');
    content.id = 'smooth-content';
    while (document.body.firstChild) content.appendChild(document.body.firstChild);
    wrapper.appendChild(content);
    document.body.appendChild(wrapper);
  }
  smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.4,
    effects: true,
    smoothTouch: 0.1
  });
}

/* ============================================
   1. PAGE TRANSITION — FADE IN/OUT
============================================ */
const overlay = document.createElement('div');
overlay.className = 'gsap-page-transition';
document.body.appendChild(overlay);

gsap.fromTo(overlay, { opacity: 1 }, { opacity: 0, duration: 0.5, ease: 'power2.out', pointerEvents: 'none' });

document.querySelectorAll('a').forEach(link => {
  if (link.hostname !== location.hostname || link.href === location.href) return;
  if (link.href.startsWith('mailto') || link.href.startsWith('tel')) return;
  link.addEventListener('click', e => {
    e.preventDefault();
    const href = link.href;
    gsap.to(overlay, {
      opacity: 1, duration: 0.35, ease: 'power2.in',
      onComplete: () => window.location.assign(href)
    });
  });
});

/* ============================================
   2. CURSEUR PERSONNALISÉ
============================================ */
const cursorDot  = document.createElement('div');
const cursorRing = document.createElement('div');
cursorDot.className  = 'cursor-dot';
cursorRing.className = 'cursor-ring';
document.body.appendChild(cursorDot);
document.body.appendChild(cursorRing);

const xDot  = gsap.quickTo(cursorDot,  'x', { duration: 0.15, ease: 'power3' });
const yDot  = gsap.quickTo(cursorDot,  'y', { duration: 0.15, ease: 'power3' });
const xRing = gsap.quickTo(cursorRing, 'x', { duration: 0.45, ease: 'power3' });
const yRing = gsap.quickTo(cursorRing, 'y', { duration: 0.45, ease: 'power3' });

window.addEventListener('mousemove', e => {
  xDot(e.clientX); yDot(e.clientY);
  xRing(e.clientX); yRing(e.clientY);
});

// Grossit sur les éléments cliquables
const hoverTargets = 'a, button, .project-card, .gsap-magnet, .nav-logo';
document.querySelectorAll(hoverTargets).forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursorRing, { scale: 2.2, opacity: 0.6, duration: 0.3, ease: 'power2.out' });
    gsap.to(cursorDot,  { scale: 0.4, duration: 0.3 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursorRing, { scale: 1, opacity: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
    gsap.to(cursorDot,  { scale: 1, duration: 0.3 });
  });
});

// Cache curseur natif
document.body.style.cursor = 'none';

/* ============================================
   3. NAVBAR
============================================ */
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  gsap.from('.nav-logo', { opacity: 0, x: -30, duration: 0.7, delay: 0.3, ease: 'power2.out' });
  gsap.from('.nav-links li', { opacity: 0, y: -16, stagger: 0.08, duration: 0.6, delay: 0.4, ease: 'power2.out' });
}

// ScrambleText sur le logo au hover
const navLogo = document.querySelector('.nav-logo');
if (navLogo && hasScramble) {
  navLogo.addEventListener('mouseenter', () => {
    gsap.to(navLogo, {
      duration: 0.7,
      scrambleText: { text: 'JAD.', chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', speed: 0.5 }
    });
  });
}

/* ============================================
   4. HERO — GRID STAGGER
============================================ */
const heroCells = document.querySelectorAll('.hero-cell');
if (heroCells.length) {
  gsap.from(heroCells, {
    duration: 1.2, opacity: 0, scale: 0.82, y: 70,
    stagger: 0.08, ease: 'power3.out', delay: 0.2
  });
}

/* ============================================
   5. HERO TEXT — SPLITTEXT
============================================ */
const heroThe   = document.querySelector('.hero-the');
const heroTitle = document.querySelector('.hero-title');

if (heroThe && heroTitle) {
  if (hasSplitText) {
    const splitThe   = new SplitText('.hero-the',   { type: 'chars' });
    const splitTitle = new SplitText('.hero-title', { type: 'chars, words' });
    const tl = gsap.timeline({ delay: 0.5 });
    tl.from(splitThe.chars, { duration: 0.7, opacity: 0, y: 60, rotateX: -80, stagger: 0.04, ease: 'back.out(2)' })
      .from(splitTitle.chars, { duration: 0.6, opacity: 0, y: 50, rotateX: -70, stagger: 0.025, ease: 'back.out(1.7)' }, '-=0.4');
  } else {
    gsap.from([heroThe, heroTitle], { opacity: 0, y: 60, duration: 1, stagger: 0.2, delay: 0.5, ease: 'power3.out' });
  }
}

/* ============================================
   6. PARALLAX HERO OVERLAY
============================================ */
const heroOverlay = document.querySelector('.hero-overlay-dark');
if (heroOverlay) {
  gsap.to(heroOverlay, {
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    opacity: 0.92, scale: 1.04
  });
}

/* ============================================
   7. SCROLLTRIGGER — SECTIONS REVEAL
============================================ */
gsap.utils.toArray(
  '.about-teaser, .contact-info-card, .contact-form-wrap, .contact-avail, .contact-socials'
).forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    opacity: 0, y: 48, duration: 0.9, delay: i * 0.04, ease: 'power2.out'
  });
});

/* ============================================
   8. IMAGE REVEAL CLIP-PATH — timeline photos
============================================ */
gsap.utils.toArray('.tl-photo').forEach((photo, i) => {
  gsap.from(photo, {
    scrollTrigger: { trigger: photo, start: 'top 85%', toggleActions: 'play none none none' },
    clipPath: 'inset(0 100% 0 0)',
    duration: 1.1,
    delay: (i % 4) * 0.12,
    ease: 'power3.inOut'
  });
});

/* ============================================
   9. TIMELINE BLOCKS — reveal
============================================ */
gsap.utils.toArray('.timeline-block').forEach(block => {
  // Titre
  const title = block.querySelector('.tl-title');
  if (title) {
    gsap.from(title, {
      scrollTrigger: { trigger: block, start: 'top 80%' },
      opacity: 0, x: -40, duration: 0.8, ease: 'power2.out'
    });
  }
  // Paragraphes ligne par ligne
  const paras = block.querySelectorAll('.tl-content p');
  if (paras.length && hasSplitText) {
    paras.forEach(p => {
      const split = new SplitText(p, { type: 'lines' });
      gsap.from(split.lines, {
        scrollTrigger: { trigger: p, start: 'top 85%' },
        opacity: 0, y: 18, stagger: 0.08, duration: 0.6, ease: 'power2.out'
      });
    });
  } else {
    paras.forEach(p => {
      gsap.from(p, {
        scrollTrigger: { trigger: p, start: 'top 88%' },
        opacity: 0, y: 20, duration: 0.7, ease: 'power2.out'
      });
    });
  }
});

/* ============================================
   10. ABOUT PAGE — TITRE + EYEBROW
============================================ */
const pageTitle   = document.querySelector('.page-big-title');
const pageEyebrow = document.querySelector('.page-eyebrow');

if (pageEyebrow) gsap.from(pageEyebrow, { opacity: 0, x: -40, duration: 0.7, delay: 0.2, ease: 'power2.out' });
if (pageTitle && hasSplitText) {
  const splitPage = new SplitText('.page-big-title', { type: 'chars' });
  gsap.from(splitPage.chars, { opacity: 0, y: 80, rotateX: -90, stagger: 0.05, duration: 0.8, delay: 0.4, ease: 'back.out(1.5)' });
} else if (pageTitle) {
  gsap.from(pageTitle, { opacity: 0, y: 50, duration: 0.9, delay: 0.4, ease: 'power3.out' });
}

/* ============================================
   11. STATS ANIMÉES (about page)
============================================ */
document.querySelectorAll('.stat-number').forEach(el => {
  const target = +el.dataset.target;
  ScrollTrigger.create({
    trigger: el, start: 'top 85%', once: true,
    onEnter: () => {
      gsap.to({ val: 0 }, {
        val: target, duration: 2.2, ease: 'power1.out',
        onUpdate: function () {
          const v = Math.round(this.targets()[0].val);
          el.textContent = v >= 1000000 ? (v / 1000000).toFixed(1) + 'M' : v >= 1000 ? (v / 1000).toFixed(0) + 'K' : v;
        }
      });
    }
  });
});

/* ============================================
   12. PROJECTS — TITRE + CARDS STAGGER
============================================ */
const projectsTitle = document.querySelector('.projects-big-title');
if (projectsTitle && hasSplitText) {
  const splitProj = new SplitText('.projects-big-title', { type: 'chars' });
  gsap.from(splitProj.chars, { opacity: 0, y: 100, rotateX: -90, stagger: 0.04, duration: 1, delay: 0.3, ease: 'back.out(1.4)' });
}

const projectCards = document.querySelectorAll('.project-card');
if (projectCards.length) {
  gsap.from(projectCards, {
    scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' },
    opacity: 0, y: 60, scale: 0.95, stagger: 0.12, duration: 0.8, ease: 'power2.out'
  });
}

/* ============================================
   13. CURSOR MAGNÉTIQUE — boutons .gsap-magnet
============================================ */
document.querySelectorAll('.gsap-magnet').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  });
});

/* ============================================
   14. CONTACT PAGE — HEADER REVEAL
============================================ */
const contactTitle = document.querySelector('.contact-title');
if (contactTitle) {
  gsap.from('.contact-eyebrow', { opacity: 0, y: 20, duration: 0.6, delay: 0.2, ease: 'power2.out' });
  if (hasSplitText) {
    const splitContact = new SplitText('.contact-title', { type: 'chars' });
    gsap.from(splitContact.chars, { opacity: 0, y: 60, rotateX: -80, stagger: 0.03, duration: 0.7, delay: 0.4, ease: 'back.out(1.7)' });
  } else {
    gsap.from(contactTitle, { opacity: 0, y: 60, duration: 0.9, delay: 0.4, ease: 'power3.out' });
  }
  gsap.from('.contact-intro', { opacity: 0, y: 30, duration: 0.7, delay: 0.7, ease: 'power2.out' });
}

/* ============================================
   16. MODALES — ANIMATION GSAP
============================================ */
const embedModal      = document.getElementById('embedModal');
const embedContent    = document.getElementById('embedContent');
const embedClose      = document.getElementById('embedClose');
const embedBackdrop   = document.getElementById('embedBackdrop');
const madi3chModal    = document.getElementById('madi3chModal');
const madi3chClose    = document.getElementById('madi3chClose');
const madi3chBackdrop = document.getElementById('madi3chBackdrop');

function openEmbedModal(type, id) {
  if (!embedModal || !embedContent) return;
  embedContent.innerHTML = '';
  if (type === 'tiktok') {
    embedContent.innerHTML = `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tiktok/video/${id}" data-video-id="${id}" style="max-width:360px;min-width:0;"><section></section></blockquote>`;
    if (window.tiktokEmbed) window.tiktokEmbed.lib.render(embedContent.querySelectorAll('.tiktok-embed'));
    else { const s = document.createElement('script'); s.src = 'https://www.tiktok.com/embed.js'; embedContent.appendChild(s); }
  } else if (type === 'instagram') {
    embedContent.innerHTML = `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/${id}/" data-instgrm-version="14" style="width:360px;"></blockquote>`;
    if (window.instgrm) window.instgrm.Embeds.process();
    else { const s = document.createElement('script'); s.src = '//www.instagram.com/embed.js'; embedContent.appendChild(s); }
  }
  embedModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  const box = embedModal.querySelector('.embed-modal-box');
  gsap.fromTo(box,         { opacity: 0, scale: 0.88, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' });
  gsap.fromTo(embedBackdrop, { opacity: 0 }, { opacity: 1, duration: 0.3 });
}
function closeEmbedModal() {
  if (!embedModal) return;
  const box = embedModal.querySelector('.embed-modal-box');
  gsap.to(box, { opacity: 0, scale: 0.9, y: 20, duration: 0.25, ease: 'power2.in' });
  gsap.to(embedBackdrop, { opacity: 0, duration: 0.25, onComplete: () => { embedModal.classList.remove('open'); if (embedContent) embedContent.innerHTML = ''; document.body.style.overflow = ''; } });
}
function openMadi3ch() {
  if (!madi3chModal) return;
  madi3chModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  const box = madi3chModal.querySelector('.embed-modal-box');
  gsap.fromTo(box,           { opacity: 0, scale: 0.88, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.5)' });
  gsap.fromTo(madi3chBackdrop, { opacity: 0 }, { opacity: 1, duration: 0.3 });
}
function closeMadi3ch() {
  if (!madi3chModal) return;
  const box = madi3chModal.querySelector('.embed-modal-box');
  gsap.to(box, { opacity: 0, scale: 0.9, y: 20, duration: 0.25, ease: 'power2.in' });
  gsap.to(madi3chBackdrop, { opacity: 0, duration: 0.25, onComplete: () => { madi3chModal.classList.remove('open'); document.body.style.overflow = ''; } });
}

if (embedClose)      embedClose.addEventListener('click', closeEmbedModal);
if (embedBackdrop)   embedBackdrop.addEventListener('click', closeEmbedModal);
if (madi3chClose)    madi3chClose.addEventListener('click', closeMadi3ch);
if (madi3chBackdrop) madi3chBackdrop.addEventListener('click', closeMadi3ch);

document.querySelectorAll('.project-card').forEach(card => {
  const btn  = card.querySelector('.open-embed');
  if (!btn) return;
  const type = card.dataset.embed;
  const id   = card.dataset.id;
  const trigger = () => { if (type === 'desc') openMadi3ch(); else openEmbedModal(type, id); };
  card.addEventListener('click', trigger);
  btn.addEventListener('click', e => { e.stopPropagation(); trigger(); });
});

document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeEmbedModal(); closeMadi3ch(); } });

/* ============================================
   17. VIDEO AUTOPLAY
============================================ */
document.querySelectorAll('video').forEach(v => v.play().catch(() => {}));
