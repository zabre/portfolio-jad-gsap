(function () {
  "use strict";

  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactFormStatus");

  function initContactAnimations() {
    if (!window.gsap) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.from(".contact-title", {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.15
    });

    gsap.from(".contact-intro", {
      y: 28,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.45
    });

    gsap.from(".contact-panel", {
      y: 60,
      opacity: 0,
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.35
    });

    gsap.to(".contact-orb-one", {
      x: 40,
      y: -30,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".contact-orb-two", {
      x: -35,
      y: 26,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  function initMockForm() {
    if (!form || !status) return;

  }

  function initInputFocus() {
    const fields = document.querySelectorAll(".form-field input, .form-field textarea, .form-field select");

    fields.forEach((field) => {
      field.addEventListener("focus", () => {
        field.closest(".form-field")?.classList.add("is-focused");
      });

      field.addEventListener("blur", () => {
        field.closest(".form-field")?.classList.remove("is-focused");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initContactAnimations();
    initMockForm();
    initInputFocus();
  });
})();
