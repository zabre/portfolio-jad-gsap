/* ============================================
   GSAP SETUP
============================================ */
gsap.registerPlugin(ScrollTrigger);

// SplitText est disponible uniquement si le CDN le charge
const hasSplitText = typeof SplitText !== 'undefined';

/* ============================================
   1. PAGE TRANSITION — FADE IN À L'ENTRÉE
============================================ */
// Overlay de transition
const overlay = document.createElement('div');
overlay.className = 'gsap-page-transition';
document.body.appendChild(overlay);

// Fade IN à l'arrivée sur la page
gsap.fromTo(overlay, { opacity: 1 }, { opacity: 0, duration: 0.5, ease: 'power2.out', pointerEvents: 'none' });

// Fade OUT au départ
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
   2. NAVBAR — SCROLL BEHAVIOUR
============================================ */
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  // Animate navbar links in on load
  gsap.from('.nav-logo', { opacity: 0, x: -30, duration: 0.7, delay: 0.3, ease: 'power2.out' });
  gsap.from('.nav-links li', { opacity: 0, y: -16, stagger: 0.08, duration: 0.6, delay: 0.4, ease: 'power2.out' });
}

/* ============================================
   3. HERO — GRID STAGGER CINÉMATIQUE
============================================ */
const heroCells = document.querySelectorAll('.hero-cell');
if (heroCells.length) {
  gsap.from(heroCells, {
    duration: 1.2,
    opacity: 0,
    scale: 0.82,
    y: 70,
    stagger: 0.08,
    ease: 'power3.out',
    delay: 0.2
  });
}

/* ============================================
   4. HERO TEXT — SPLITTEXT LETTRE PAR LETTRE
============================================ */
const heroThe = document.querySelector('.hero-the');
const heroTitle = document.querySelector('.hero-title');

if (heroThe && heroTitle) {
  if (hasSplitText) {
    const splitThe = new SplitText('.hero-the', { type: 'chars' });
    const splitTitle = new SplitText('.hero-title', { type: 'chars, words' });
    const tl = gsap.timeline({ delay: 0.5 });
    tl.from(splitThe.chars, {
      duration: 0.7,
      opacity: 0,
      y: 60,
      rotateX: -80,
      stagger: 0.04,
      ease: 'back.out(2)'
    })
    .from(splitTitle.chars, {
      duration: 0.6,
      opacity: 0,
      y: 50,
      rotateX: -70,
      stagger: 0.025,
      ease: 'back.out(1.7)'
    }, '-=0.4');
  } else {
    // Fallback sans SplitText
    gsap.from([heroThe, heroTitle], {
      opacity: 0, y: 60, duration: 1, stagger: 0.2, delay: 0.5, ease: 'power3.out'
    });
  }
}

/* ============================================
   5. PARALLAX HERO OVERLAY
============================================ */
const heroOverlay = document.querySelector('.hero-overlay-dark');
if (heroOverlay) {
  gsap.to(heroOverlay, {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    opacity: 0.92,
    scale: 1.04
  });
}

/* ============================================
   6. SCROLLTRIGGER — SECTIONS REVEAL
   Remplace l'IntersectionObserver CSS
============================================ */
gsap.utils.toArray(
  '.timeline-block, .about-teaser, .project-card, .contact-info-card, .contact-form-wrap, .contact-avail, .contact-socials'
).forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 48,
    duration: 0.9,
    delay: i * 0.04,
    ease: 'power2.out'
  });
});

/* ============================================
   7. ABOUT PAGE — TITRE SPLITTEXT
============================================ */
const pageTitle = document.querySelector('.page-big-title');
if (pageTitle && hasSplitText) {
  const splitPage = new SplitText('.page-big-title', { type: 'chars' });
  gsap.from(splitPage.chars, {
    opacity: 0,
    y: 80,
    rotateX: -90,
    stagger: 0.05,
    duration: 0.8,
    delay: 0.4,
    ease: 'back.out(1.5)'
  });
} else if (pageTitle) {
  gsap.from(pageTitle, { opacity: 0, y: 50, duration: 0.9, delay: 0.4, ease: 'power3.out' });
}

const pageEyebrow = document.querySelector('.page-eyebrow');
if (pageEyebrow) {
  gsap.from(pageEyebrow, { opacity: 0, x: -40, duration: 0.7, delay: 0.2, ease: 'power2.out' });
}

/* ============================================
   8. STATS ANIMÉES (about page)
   Compteurs qui s'incrémentent au scroll
============================================ */
document.querySelectorAll('.stat-number').forEach(el => {
  const target = +el.dataset.target;
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to({ val: 0 }, {
        val: target,
        duration: 2.2,
        ease: 'power1.out',
        onUpdate: function () {
          const v = Math.round(this.targets()[0].val);
          el.textContent = v >= 1000 ? (v >= 1000000 ? (v / 1000000).toFixed(1) + 'M' : (v / 1000).toFixed(0) + 'K') : v;
        }
      });
    }
  });
});

/* ============================================
   9. PROJECTS PAGE — TITRE SPLITTEXT
============================================ */
const projectsTitle = document.querySelector('.projects-big-title');
if (projectsTitle && hasSplitText) {
  const splitProj = new SplitText('.projects-big-title', { type: 'chars' });
  gsap.from(splitProj.chars, {
    opacity: 0,
    y: 100,
    rotateX: -90,
    stagger: 0.04,
    duration: 1,
    delay: 0.3,
    ease: 'back.out(1.4)'
  });
}

/* ============================================
   10. PROJECT CARDS — STAGGER AU SCROLL
============================================ */
const projectCards = document.querySelectorAll('.project-card');
if (projectCards.length) {
  gsap.from(projectCards, {
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 80%'
    },
    opacity: 0,
    y: 60,
    scale: 0.95,
    stagger: 0.12,
    duration: 0.8,
    ease: 'power2.out'
  });
}

/* ============================================
   11. CURSOR MAGNÉTIQUE — BOUTON "En savoir plus"
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
   12. CONTACT PAGE — HEADER REVEAL
============================================ */
const contactTitle = document.querySelector('.contact-title');
if (contactTitle) {
  gsap.from('.contact-eyebrow', { opacity: 0, y: 20, duration: 0.6, delay: 0.2, ease: 'power2.out' });
  if (hasSplitText) {
    const splitContact = new SplitText('.contact-title', { type: 'chars' });
    gsap.from(splitContact.chars, {
      opacity: 0, y: 60, rotateX: -80,
      stagger: 0.03, duration: 0.7, delay: 0.4, ease: 'back.out(1.7)'
    });
  } else {
    gsap.from(contactTitle, { opacity: 0, y: 60, duration: 0.9, delay: 0.4, ease: 'power3.out' });
  }
  gsap.from('.contact-intro', { opacity: 0, y: 30, duration: 0.7, delay: 0.7, ease: 'power2.out' });
}

/* ============================================
   13. FORMULAIRE DE CONTACT — FEEDBACK ANIMÉ
============================================ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const submitBtn = contactForm.querySelector('.contact-submit');
  const successMsg = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const tl = gsap.timeline();
    tl.to(submitBtn, { scale: 0.94, duration: 0.1 })
      .to(submitBtn, {
        scale: 1,
        backgroundColor: '#16a34a',
        duration: 0.4,
        ease: 'back.out(2)'
      })
      .to(submitBtn, { opacity: 0, y: -20, duration: 0.35 }, '+=0.8')
      .call(() => {
        submitBtn.style.display = 'none';
        if (successMsg) {
          successMsg.style.display = 'flex';
          gsap.from(successMsg, { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' });
        }
      })
      .call(() => {
        setTimeout(() => {
          submitBtn.style.display = '';
          submitBtn.style.backgroundColor = '';
          gsap.to(submitBtn, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
          if (successMsg) successMsg.style.display = 'none';
          contactForm.reset();
        }, 3500);
      }, null, '+=0.1');
  });
}

/* ============================================
   14. MODAL EMBED — ANIMATION GSAP
============================================ */
const embedModal    = document.getElementById('embedModal');
const embedContent  = document.getElementById('embedContent');
const embedClose    = document.getElementById('embedClose');
const embedBackdrop = document.getElementById('embedBackdrop');
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
  gsap.fromTo(box, { opacity: 0, scale: 0.88, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' });
  gsap.fromTo(embedBackdrop, { opacity: 0 }, { opacity: 1, duration: 0.3 });
}

function closeEmbedModal() {
  if (!embedModal) return;
  const box = embedModal.querySelector('.embed-modal-box');
  gsap.to(box, { opacity: 0, scale: 0.9, y: 20, duration: 0.25, ease: 'power2.in' });
  gsap.to(embedBackdrop, {
    opacity: 0, duration: 0.25,
    onComplete: () => {
      embedModal.classList.remove('open');
      if (embedContent) embedContent.innerHTML = '';
      document.body.style.overflow = '';
    }
  });
}

function openMadi3ch() {
  if (!madi3chModal) return;
  madi3chModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  const box = madi3chModal.querySelector('.embed-modal-box');
  gsap.fromTo(box, { opacity: 0, scale: 0.88, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.5)' });
  gsap.fromTo(madi3chBackdrop, { opacity: 0 }, { opacity: 1, duration: 0.3 });
}

function closeMadi3ch() {
  if (!madi3chModal) return;
  const box = madi3chModal.querySelector('.embed-modal-box');
  gsap.to(box, { opacity: 0, scale: 0.9, y: 20, duration: 0.25, ease: 'power2.in' });
  gsap.to(madi3chBackdrop, {
    opacity: 0, duration: 0.25,
    onComplete: () => {
      madi3chModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

if (embedClose) embedClose.addEventListener('click', closeEmbedModal);
if (embedBackdrop) embedBackdrop.addEventListener('click', closeEmbedModal);
if (madi3chClose) madi3chClose.addEventListener('click', closeMadi3ch);
if (madi3chBackdrop) madi3chBackdrop.addEventListener('click', closeMadi3ch);

document.querySelectorAll('.project-card').forEach(card => {
  const btn = card.querySelector('.open-embed');
  if (!btn) return;
  const type = card.dataset.embed;
  const id   = card.dataset.id;
  const trigger = () => {
    if (type === 'desc') openMadi3ch();
    else openEmbedModal(type, id);
  };
  card.addEventListener('click', trigger);
  btn.addEventListener('click', e => { e.stopPropagation(); trigger(); });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeEmbedModal(); closeMadi3ch(); }
});

/* ============================================
   15. VIDEO AUTOPLAY
============================================ */
document.querySelectorAll('video').forEach(v => v.play().catch(() => {}));
