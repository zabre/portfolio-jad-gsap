(function () {
  "use strict";

  const pathHero = document.getElementById("projectPathHero");
  const pathSwitcher = document.getElementById("projectPathSwitcher");
  const pathButtons = document.querySelectorAll("[data-path-target]");
  const pathSections = document.querySelectorAll("[data-path-section]");
  const switchButtons = document.querySelectorAll(".path-switch");

  const uxModal = document.getElementById("uxModal");
  const uxModalBackdrop = document.getElementById("uxModalBackdrop");
  const uxModalClose = document.getElementById("uxModalClose");
  const uxModalMedia = document.getElementById("uxModalMedia");
  const uxModalCategory = document.getElementById("uxModalCategory");
  const uxModalTitle = document.getElementById("uxModalTitle");
  const uxModalDescription = document.getElementById("uxModalDescription");
  const uxModalTags = document.getElementById("uxModalTags");
  const uxModalLink = document.getElementById("uxModalLink");

  const UX_PROJECTS = {
    "fake-off": {
      title: "Fake Off",
      category: "UX/UI · Application mobile · Désinformation",
      image: "assets/projects/fake-off.png",
      description:
        "Application ludique conçue pour l’association Fake Off, dédiée à la lutte contre la désinformation. Chaque jour, les utilisateurs découvrent des quiz interactifs pour tester et renforcer leurs réflexes face aux fake news. L’application intègre également une intelligence artificielle capable d’analyser rapidement un article et d’indiquer s’il est fiable ou trompeur.",
      tags: ["Mobile app", "Quiz", "IA", "UX writing", "Citoyenneté"],
      link: "#"
    },

    adidas: {
      title: "Adidas × Will Smith",
      category: "UX/UI · Landing page · E-commerce",
      image: "assets/projects/adidas-will-smith.png",
      description:
        "Refonte de la page d’accueil Adidas pour mettre en avant une collaboration fictive entre Stan Smith et Will Smith. Le projet explore comment valoriser une campagne originale tout en respectant l’identité visuelle forte d’Adidas et les codes d’une expérience e-commerce reconnue.",
      tags: ["Landing page", "E-commerce", "Direction artistique", "Responsive", "Campaign"],
      link: "#"
    },

    determines: {
      title: "Les Déterminés",
      category: "UX/UI · Site web · Association",
      image: "assets/projects/les-determines.png",
      description:
        "Création d’un site internet pour Les Déterminés, une association qui accompagne les jeunes entrepreneurs issus de quartiers populaires. Le projet couvre l’architecture du site, la conception des différents onglets et l’optimisation de la fluidité de navigation, afin de proposer une expérience claire et intuitive.",
      tags: ["Site web", "Association", "Architecture information", "Navigation", "Impact"],
      link: "#"
    },

    redbull: {
      title: "RedBull Club",
      category: "UX/UI · Application sportive · Mobile",
      image: "assets/projects/redbull-club.png",
      description:
        "Création de RedBull Club, une application sportive pensée sur mesure pour la marque. L’application propose chaque semaine des activités adaptées aux envies des utilisateurs, permet de suivre leurs progrès et donne accès à des cours en ligne ou en présentiel près de chez eux.",
      tags: ["Mobile app", "Sport", "Gamification", "Abonnement", "Engagement"],
      link: "#"
    },

    wingfoil: {
      title: "WingFoil",
      category: "UX/UI · Refonte site web · Sport de glisse",
      image: "assets/projects/wingfoil.png",
      description:
        "Refonte complète du site d’une école spécialisée dans l’enseignement du wingfoil. Chaque aspect du site a été repensé pour le rendre plus moderne, plus attractif et surtout plus intuitif pour les utilisateurs. Le projet met en avant la transformation entre l’ancienne version et une nouvelle expérience plus claire.",
      tags: ["Refonte", "Sport", "Webdesign", "Responsive", "Expérience utilisateur"],
      link: "https://www.wing-and-foil-school.com/"
    }
  };

  let lastFocusedElement = null;

  function setPath(target) {
    if (!target) return;

    pathSections.forEach((section) => {
      const isActive = section.getAttribute("data-path-section") === target;
      section.classList.toggle("active", isActive);
    });

    switchButtons.forEach((button) => {
      const isActive = button.getAttribute("data-path-target") === target;
      button.classList.toggle("active", isActive);
    });

    if (pathSwitcher) {
      pathSwitcher.classList.add("visible");
    }

    if (pathHero) {
      pathHero.classList.add("is-collapsed");
    }

    const activeSection = document.querySelector(`[data-path-section="${target}"]`);

    if (window.gsap && activeSection) {
      gsap.fromTo(
        activeSection,
        { opacity: 0, y: 42 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }
      );

      gsap.fromTo(
        activeSection.querySelectorAll(".project-card, .ux-project-card"),
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.1
        }
      );
    }

    window.setTimeout(() => {
      activeSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);

    const url = new URL(window.location.href);
    url.searchParams.set("path", target);
    window.history.replaceState({}, "", url);
  }

  function initPathSelection() {
    pathButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-path-target");
        setPath(target);
      });
    });

    const params = new URLSearchParams(window.location.search);
    const requestedPath = params.get("path");

    if (requestedPath === "content" || requestedPath === "uiux") {
      window.setTimeout(() => setPath(requestedPath), 250);
    }
  }

  function initPathHeroAnimation() {
    if (!window.gsap) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.from(".project-path-title", {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.15
    });

    gsap.from(".project-path-intro", {
      y: 28,
      opacity: 0,
      duration: 0.75,
      ease: "power3.out",
      delay: 0.42
    });

    gsap.from(".path-card", {
      y: 70,
      opacity: 0,
      rotate: 2,
      duration: 0.9,
      stagger: 0.14,
      ease: "power4.out",
      delay: 0.55
    });

    gsap.to(".path-orb-one", {
      x: 50,
      y: -30,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".path-orb-two", {
      x: -45,
      y: 36,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  function enhancePathCards() {
    const cards = document.querySelectorAll(".path-card, .ux-project-card");

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

  function renderUxModal(projectKey) {
    const project = UX_PROJECTS[projectKey];
    if (!project) return;

    uxModalMedia.innerHTML = `
      <img src="${project.image}" alt="${project.title}" />
    `;

    uxModalCategory.textContent = project.category;
    uxModalTitle.textContent = project.title;
    uxModalDescription.textContent = project.description;

    uxModalTags.innerHTML = project.tags
      .map((tag) => `<span>${tag}</span>`)
      .join("");

    uxModalLink.href = project.link || "#";

    if (project.link && project.link !== "#") {
      uxModalLink.textContent = "Voir le site ↗";
      uxModalLink.classList.remove("disabled");
    } else {
      uxModalLink.textContent = "Lien Figma bientôt disponible ↗";
      uxModalLink.classList.add("disabled");
    }
  }

  function openUxModal(projectKey) {
    if (!uxModal) return;

    lastFocusedElement = document.activeElement;

    renderUxModal(projectKey);

    uxModal.classList.add("open");
    uxModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const box = uxModal.querySelector(".ux-modal-box");

    if (window.gsap && box) {
      gsap.fromTo(
        uxModalBackdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );

      gsap.fromTo(
        box,
        { opacity: 0, y: 46, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.48, ease: "power3.out" }
      );
    }

    uxModalClose?.focus({ preventScroll: true });
  }

  function closeUxModal() {
    if (!uxModal) return;

    const box = uxModal.querySelector(".ux-modal-box");

    const finish = () => {
      uxModal.classList.remove("open");
      uxModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      uxModalMedia.innerHTML = "";

      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus({ preventScroll: true });
      }
    };

    if (window.gsap && box) {
      gsap.to(box, {
        opacity: 0,
        y: 30,
        scale: 0.96,
        duration: 0.25,
        ease: "power2.in"
      });

      gsap.to(uxModalBackdrop, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: finish
      });
    } else {
      finish();
    }
  }

  function initUxModal() {
    const uxCards = document.querySelectorAll("[data-ux-modal]");

    uxCards.forEach((card) => {
      const projectKey = card.getAttribute("data-ux-modal");
      const button = card.querySelector(".ux-project-open");

      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");

      card.addEventListener("click", () => openUxModal(projectKey));

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openUxModal(projectKey);
        }
      });

      if (button) {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          openUxModal(projectKey);
        });
      }
    });

    uxModalClose?.addEventListener("click", closeUxModal);
    uxModalBackdrop?.addEventListener("click", closeUxModal);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && uxModal?.classList.contains("open")) {
        closeUxModal();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initPathSelection();
    initPathHeroAnimation();
    enhancePathCards();
    initUxModal();
  });
})();
