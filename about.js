(function () {
  "use strict";

  function initAboutAnimations() {
    if (!window.gsap) return;

    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.from(".about-title", {
      y: 90,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.15
    });

    gsap.from(".about-intro", {
      y: 28,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.42
    });

    gsap.from(".about-hero-actions", {
      y: 22,
      opacity: 0,
      duration: 0.75,
      ease: "power3.out",
      delay: 0.58
    });

    gsap.from(".about-identity-card", {
      y: 70,
      rotate: 3,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.35
    });

    gsap.to(".about-orb-blue", {
      x: 48,
      y: -34,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".about-orb-orange", {
      x: -42,
      y: 30,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    if (!window.ScrollTrigger) return;

    gsap.utils.toArray(".story-chapter").forEach((chapter) => {
      gsap.from(chapter, {
        scrollTrigger: {
          trigger: chapter,
          start: "top 82%"
        },
        y: 70,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out"
      });

      const visual = chapter.querySelector(".story-visual");

      if (visual) {
        gsap.to(visual, {
          scrollTrigger: {
            trigger: chapter,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          },
          yPercent: -8,
          ease: "none"
        });
      }
    });

    gsap.from(".about-skill-card", {
      scrollTrigger: {
        trigger: ".about-skills-grid",
        start: "top 82%"
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out"
    });

    gsap.from(".about-number-card", {
      scrollTrigger: {
        trigger: ".about-numbers-grid",
        start: "top 84%",
        once: true,
        onEnter: animateNumbers
      },
      y: 50,
      opacity: 0,
      duration: 0.75,
      stagger: 0.1,
      ease: "power3.out"
    });

    gsap.from(".about-final-inner", {
      scrollTrigger: {
        trigger: ".about-final-cta",
        start: "top 78%"
      },
      y: 70,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out"
    });
  }

  function animateNumbers() {
    if (!window.gsap) {
      document.querySelectorAll("[data-count]").forEach((el) => {
        el.textContent = el.getAttribute("data-count");
      });
      return;
    }

    document.querySelectorAll("[data-count]").forEach((el) => {
      const target = Number(el.getAttribute("data-count"));

      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: target,
          duration: 1.4,
          ease: "power2.out",
          snap: { innerText: 1 },
          onUpdate: function () {
            el.textContent = Math.round(Number(el.innerText));
          }
        }
      );
    });
  }

  function enhanceAboutHover() {
    const cards = document.querySelectorAll(
      ".about-skill-card, .about-number-card, .about-final-card, .story-chapter"
    );

    cards.forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty("--x", `${x}%`);
        card.style.setProperty("--y", `${y}%`);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initAboutAnimations();
    enhanceAboutHover();
  });
})();
