(function () {
  "use strict";

  function initHomeContentWall() {
    const wall = document.getElementById("homeContentWall");
    if (!wall) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!window.gsap || reduceMotion) return;

    gsap.from(".home-wall-card", {
      opacity: 0,
      y: 60,
      scale: 0.96,
      duration: 1.1,
      stagger: {
        amount: 0.8,
        from: "random"
      },
      ease: "power4.out",
      delay: 0.15
    });

    gsap.from(".home-wall-title span", {
      opacity: 0,
      y: 90,
      duration: 1,
      stagger: 0.12,
      ease: "power4.out",
      delay: 0.35
    });

    gsap.from(".home-wall-kicker, .home-wall-subtitle, .home-wall-actions", {
      opacity: 0,
      y: 24,
      duration: 0.75,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.8
    });

    gsap.to(".home-wall-row-one", {
      xPercent: -5,
      scrollTrigger: {
        trigger: wall,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });

    gsap.to(".home-wall-row-two", {
      xPercent: 6,
      scrollTrigger: {
        trigger: wall,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });

    gsap.to(".home-wall-row-three", {
      xPercent: -4,
      scrollTrigger: {
        trigger: wall,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });

    gsap.to(".home-wall-title-wrap", {
      yPercent: -10,
      opacity: 0.92,
      scrollTrigger: {
        trigger: wall,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });
  }

  function enhanceWallHover() {
    const cards = document.querySelectorAll(".home-wall-card");

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
    initHomeContentWall();
    enhanceWallHover();
  });
})();
