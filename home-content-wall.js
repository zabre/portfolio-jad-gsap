(function () {
  "use strict";

  const SELECTORS = {
    wall: "#homeContentWall",
    rows: ".home-wall-row",
    rowOne: ".home-wall-row-one",
    rowTwo: ".home-wall-row-two",
    rowThree: ".home-wall-row-three",
    cards: ".home-wall-card",
    images: ".home-wall-card img",
    titleWrap: ".home-wall-title-wrap",
    titleSpans: ".home-wall-title span",
    introItems: ".home-wall-kicker, .home-wall-subtitle, .home-wall-actions",
  };

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function isTouchDevice() {
    return window.matchMedia("(pointer: coarse)").matches;
  }

  function initImageLoadedState() {
    const images = document.querySelectorAll(SELECTORS.images);

    images.forEach((img) => {
      if (img.complete) {
        img.classList.add("is-loaded");
        return;
      }

      img.addEventListener(
        "load",
        () => {
          img.classList.add("is-loaded");
        },
        { once: true }
      );

      img.addEventListener(
        "error",
        () => {
          img.classList.add("is-error");
        },
        { once: true }
      );
    });
  }

  function initIntroAnimation() {
    const wall = document.querySelector(SELECTORS.wall);
    if (!wall || !window.gsap || prefersReducedMotion()) {
      document.documentElement.classList.add("motion-safe-disabled");
      return;
    }

    gsap.set(SELECTORS.cards, {
      opacity: 0,
      y: 52,
      scale: 0.94,
      rotate: () => gsap.utils.random(-2, 2),
      transformOrigin: "50% 50%",
    });

    gsap.set(SELECTORS.titleSpans, {
      opacity: 0,
      yPercent: 105,
    });

    gsap.set(SELECTORS.introItems, {
      opacity: 0,
      y: 22,
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "power4.out",
      },
    });

    tl.to(SELECTORS.cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 1.15,
      stagger: {
        amount: 0.9,
        from: "random",
      },
    })
      .to(
        SELECTORS.titleSpans,
        {
          opacity: 1,
          yPercent: 0,
          duration: 1,
          stagger: 0.1,
        },
        "-=0.72"
      )
      .to(
        SELECTORS.introItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.55"
      );
  }

  function initScrollMotion() {
    const wall = document.querySelector(SELECTORS.wall);
    if (!wall || !window.gsap || !window.ScrollTrigger || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.to(SELECTORS.rowOne, {
        xPercent: -7,
        ease: "none",
        scrollTrigger: {
          trigger: wall,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      gsap.to(SELECTORS.rowTwo, {
        xPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: wall,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      gsap.to(SELECTORS.rowThree, {
        xPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: wall,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      gsap.to(SELECTORS.titleWrap, {
        yPercent: -8,
        scale: 0.985,
        opacity: 0.95,
        ease: "none",
        scrollTrigger: {
          trigger: wall,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    mm.add("(max-width: 768px)", () => {
      gsap.to(SELECTORS.titleWrap, {
        yPercent: -4,
        opacity: 0.98,
        ease: "none",
        scrollTrigger: {
          trigger: wall,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
  }

  function initPointerReactiveWall() {
    const wall = document.querySelector(SELECTORS.wall);
    const rows = document.querySelectorAll(SELECTORS.rows);

    if (!wall || !window.gsap || prefersReducedMotion() || isTouchDevice()) return;

    const setRowOneX = gsap.quickTo(SELECTORS.rowOne, "x", {
      duration: 0.8,
      ease: "power3.out",
    });

    const setRowTwoX = gsap.quickTo(SELECTORS.rowTwo, "x", {
      duration: 0.8,
      ease: "power3.out",
    });

    const setRowThreeX = gsap.quickTo(SELECTORS.rowThree, "x", {
      duration: 0.8,
      ease: "power3.out",
    });

    const setTitleX = gsap.quickTo(SELECTORS.titleWrap, "x", {
      duration: 0.8,
      ease: "power3.out",
    });

    const setTitleY = gsap.quickTo(SELECTORS.titleWrap, "y", {
      duration: 0.8,
      ease: "power3.out",
    });

    function handlePointerMove(event) {
      const rect = wall.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      setRowOneX(x * -34);
      setRowTwoX(x * 42);
      setRowThreeX(x * -28);

      setTitleX(x * 10);
      setTitleY(y * 8);

      wall.style.setProperty("--pointer-x", `${(x + 0.5) * 100}%`);
      wall.style.setProperty("--pointer-y", `${(y + 0.5) * 100}%`);
    }

    function resetPointerMotion() {
      setRowOneX(0);
      setRowTwoX(0);
      setRowThreeX(0);
      setTitleX(0);
      setTitleY(0);
    }

    wall.addEventListener("pointermove", handlePointerMove);
    wall.addEventListener("pointerleave", resetPointerMotion);

    rows.forEach((row) => {
      row.style.willChange = "transform";
    });
  }

  function initCardTilt() {
    const cards = document.querySelectorAll(SELECTORS.cards);

    if (!cards.length || !window.gsap || prefersReducedMotion() || isTouchDevice()) return;

    cards.forEach((card) => {
      const image = card.querySelector("img");

      const rotateX = gsap.quickTo(card, "rotationX", {
        duration: 0.45,
        ease: "power3.out",
      });

      const rotateY = gsap.quickTo(card, "rotationY", {
        duration: 0.45,
        ease: "power3.out",
      });

      const moveImageX = image
        ? gsap.quickTo(image, "x", {
            duration: 0.55,
            ease: "power3.out",
          })
        : null;

      const moveImageY = image
        ? gsap.quickTo(image, "y", {
            duration: 0.55,
            ease: "power3.out",
          })
        : null;

      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();

        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;

        const rx = (py - 0.5) * -8;
        const ry = (px - 0.5) * 8;

        rotateX(rx);
        rotateY(ry);

        if (moveImageX && moveImageY) {
          moveImageX((px - 0.5) * -10);
          moveImageY((py - 0.5) * -10);
        }

        card.style.setProperty("--x", `${px * 100}%`);
        card.style.setProperty("--y", `${py * 100}%`);
      });

      card.addEventListener("pointerleave", () => {
        rotateX(0);
        rotateY(0);

        if (moveImageX && moveImageY) {
          moveImageX(0);
          moveImageY(0);
        }
      });
    });
  }

  function initWall() {
    const wall = document.querySelector(SELECTORS.wall);
    if (!wall) return;

    initImageLoadedState();
    initIntroAnimation();
    initScrollMotion();
    initPointerReactiveWall();
    initCardTilt();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWall);
  } else {
    initWall();
  }
})();
