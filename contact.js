(function () {
  "use strict";

  function initFormFocusStates() {
    const fields = document.querySelectorAll(
      ".brief-field input, .brief-field select, .brief-field textarea"
    );

    fields.forEach((field) => {
      field.addEventListener("focus", () => {
        const parent = field.closest(".brief-field");
        if (parent) parent.classList.add("is-focused");
      });

      field.addEventListener("blur", () => {
        const parent = field.closest(".brief-field");
        if (parent) parent.classList.remove("is-focused");
      });
    });
  }

  function initSubmitState() {
    const form = document.querySelector("#contactForm");
    if (!form) return;

    const submitButton = form.querySelector(".brief-submit");
    if (!submitButton) return;

    form.addEventListener("submit", () => {
      submitButton.disabled = true;
      submitButton.textContent = "Envoi en cours...";
    });
  }

  function initContactPage() {
    initFormFocusStates();
    initSubmitState();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContactPage);
  } else {
    initContactPage();
  }
})();
