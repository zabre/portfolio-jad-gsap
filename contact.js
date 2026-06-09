(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initContactAnimations() {
    if (!window.gsap || prefersReducedMotion) return;

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.8,
      },
    });

    tl.from(".contact-hero .section-kicker", {
      opacity: 0,
      y: 18,
    })
      .from(
        ".contact-hero h1",
        {
          opacity: 0,
          y: 32,
        },
        "-=0.55"
      )
      .from(
        ".contact-hero p",
        {
          opacity: 0,
          y: 24,
        },
        "-=0.5"
      )
      .from(
        ".contact-card, .contact-form-panel",
        {
          opacity: 0,
          y: 36,
          stagger: 0.12,
        },
        "-=0.45"
      );
  }

  function initFormFocusStates() {
    const fields = document.querySelectorAll(
      ".brief-field input, .brief-field select, .brief-field textarea"
    );

    fields.forEach((field) => {
      field.addEventListener("focus", () => {
        field.closest(".brief-field")?.classList.add("is-focused");
      });

      field.addEventListener("blur", () => {
        field.closest(".brief-field")?.classList.remove("is-focused");
      });
    });
  }

  function initContactPage() {
    initContactAnimations();
    initFormFocusStates();

    // Important :
    // On ne bloque PAS le submit.
    // Pas de event.preventDefault().
    // Netlify Forms doit recevoir la soumission naturellement.
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContactPage);
  } else {
    initContactPage();
  }
})();
