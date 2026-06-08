(function () {
  "use strict";

  /**
   * Données projets.
   * Les liens viennent de ta feuille CSV.
   * Pour Instagram, on garde l’URL publique puis on génère le blockquote embed.
   * Pour YouTube, on convertit automatiquement watch?v= en /embed/.
   */
  const PROJECT_EMBEDS = {
    "brut-ia": {
      title: "Brut.IA",
      category: "Journalisme · IA · Social content",
      description:
        "Sélection de contenus réalisés autour de l’intelligence artificielle, des formats courts, de la culture digitale et de l’actualité tech.",
      urls: [
        "https://www.instagram.com/brut_ia/reel/CtRowCiPLyv/?hl=fr",
        "http://instagram.com/brut_ia/reel/CtqvQ0yRKC6/?hl=fr",
        "https://www.instagram.com/p/CuUywe_AcD2/?hl=fr",
        "https://www.instagram.com/p/CwVHwIZtgPW/?hl=fr",
        "https://www.instagram.com/p/Cu7c61osxbM/?hl=fr",
        "https://www.instagram.com/p/CvhzzLVtrGL/?hl=fr"
      ]
    },

    "societe-generale": {
      title: "Société Générale",
      category: "Sport · Rugby · Social content",
      description:
        "Contenus social media et formats courts autour d’activations rugby et de prises de parole de marque.",
      urls: [
        "https://www.instagram.com/p/DKzpa8OiO0M/?hl=fr",
        "https://www.instagram.com/p/DJJaYJHCncT/?hl=fr",
        "https://www.instagram.com/p/DIWbvlHC4ij/?hl=fr",
        "https://www.instagram.com/p/DF0Hxvzihlf/?hl=fr",
        "https://www.instagram.com/p/C6Y-sMTIQ1q/?hl=fr",
        "https://www.instagram.com/p/C23B-gWiVgS/?hl=fr"
      ]
    },

    "total-energies": {
      title: "TotalEnergies",
      category: "Activation · Sport · Réseaux sociaux",
      description:
        "Série de reels et contenus courts produits pour des activations social media.",
      urls: [
        "https://www.instagram.com/reel/C1oC0bVQb3d/?hl=fr",
        "https://www.instagram.com/reel/C1sQZ8mI9nI/?hl=fr",
        "https://www.instagram.com/reel/C1VfYzHI2bO/?hl=fr",
        "https://www.instagram.com/reel/C1l4xZ8I5aC/?hl=fr",
        "https://www.instagram.com/reel/C1g5J3NIz1s/?hl=fr",
        "https://www.instagram.com/reel/C1ufvr9NHIK/?hl=fr",
        "https://www.instagram.com/reel/C1PAoIcNM3t/?hl=fr"
      ]
    },

    "publicis-sport": {
      title: "Publicis Sport",
      category: "Football · Rugby · Brand activation",
      description:
        "Sélection de contenus sport autour de projets football, rugby et activations de marque.",
      urls: [
        "https://www.instagram.com/football2gether/reel/DLz_se0t00z/?hl=fr",
        "https://www.instagram.com/collectifrugby_/reel/DLxsXB-q7ol/"
      ]
    },

    "sanofi": {
      title: "Sanofi",
      category: "Corporate · Social content",
      description:
        "Formats courts et contenus verticaux pour des prises de parole corporate et réseaux sociaux.",
      urls: [
        "https://www.instagram.com/reels/DFc7eTnsc29/",
        "https://www.instagram.com/reels/DB89nCICibC/"
      ]
    },

    "axa-liverpool": {
      title: "AXA × Liverpool",
      category: "Brand content · YouTube",
      description:
        "Contenu vidéo autour d’une collaboration entre AXA et Liverpool.",
      urls: [
        "https://www.youtube.com/watch?v=2LjNhKFZwe4"
      ]
    },

    "captain-skipper": {
      title: "Captain Skipper",
      category: "Branding · Direction artistique",
      description:
        "Direction artistique, univers visuel et accompagnement créatif autour du Salon Nautique de Paris.",
      urls: []
    },

    "madi3ch": {
      title: "Madi3ch مادي أش",
      category: "Startup · Maroc · UI/UX",
      description:
        "Madi3ch est une application mobile anti-gaspillage alimentaire pensée pour le marché marocain. Le projet couvre le branding, l’UI/UX, le motion design et la stratégie de lancement.",
      urls: []
    }
  };

  const modal = document.getElementById("projectModal");
  const modalBackdrop = document.getElementById("projectModalBackdrop");
  const modalClose = document.getElementById("projectModalClose");
  const modalTitle = document.getElementById("projectModalTitle");
  const modalCategory = document.getElementById("projectModalCategory");
  const modalBody = document.getElementById("projectModalBody");

  if (!modal || !modalBody) return;

  let lastFocusedElement = null;

  function isInstagramUrl(url) {
    return /instagram\.com/i.test(url);
  }

  function isYoutubeUrl(url) {
    return /youtube\.com|youtu\.be/i.test(url);
  }

  function getYoutubeEmbedUrl(url) {
    try {
      const parsed = new URL(url);

      if (parsed.hostname.includes("youtu.be")) {
        const id = parsed.pathname.replace("/", "");
        return `https://www.youtube.com/embed/${id}`;
      }

      const videoId = parsed.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      return url;
    } catch (error) {
      return url;
    }
  }

  function normalizeInstagramUrl(url) {
    return url.replace("http://", "https://");
  }

  function createInstagramEmbed(url) {
    const cleanUrl = normalizeInstagramUrl(url);

    return `
      <div class="project-embed-card project-embed-card-instagram">
        <blockquote
          class="instagram-media"
          data-instgrm-permalink="${cleanUrl}"
          data-instgrm-version="14"
          style="background:#FFF; border:0; border-radius:16px; box-shadow:none; margin:0 auto; max-width:540px; min-width:280px; width:100%;">
        </blockquote>

        <a class="project-embed-fallback" href="${cleanUrl}" target="_blank" rel="noopener noreferrer">
          Ouvrir sur Instagram ↗
        </a>
      </div>
    `;
  }

  function createYoutubeEmbed(url) {
    const embedUrl = getYoutubeEmbedUrl(url);

    return `
      <div class="project-embed-card project-embed-card-youtube">
        <div class="project-youtube-frame">
          <iframe
            src="${embedUrl}"
            title="Vidéo YouTube"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
          </iframe>
        </div>

        <a class="project-embed-fallback" href="${url}" target="_blank" rel="noopener noreferrer">
          Ouvrir sur YouTube ↗
        </a>
      </div>
    `;
  }

  function createTextProject(projectKey, project) {
    if (projectKey === "madi3ch") {
      return `
        <div class="project-detail-text">
          <h3>Le projet</h3>
          <p>
            Madi3ch <span lang="ar">مادي أش</span> — « C’est pas grave » — est une application mobile
            anti-gaspillage alimentaire pensée pour le marché marocain.
          </p>

          <h3>Mon rôle</h3>
          <ul>
            <li>Direction artistique et branding complet</li>
            <li>Design UI/UX de l’application</li>
            <li>Production de contenus vidéo et motion design</li>
            <li>Stratégie de lancement réseaux sociaux</li>
            <li>Adaptation culturelle au marché marocain</li>
          </ul>

          <div class="project-detail-stats">
            <div>
              <strong>12</strong>
              <span>semaines</span>
            </div>

            <div>
              <strong>3</strong>
              <span>plateformes</span>
            </div>

            <div>
              <strong>1</strong>
              <span>startup</span>
            </div>
          </div>
        </div>
      `;
    }

    if (projectKey === "captain-skipper") {
      return `
        <div class="project-detail-text">
          <h3>Direction artistique</h3>
          <p>
            Travail d’identité visuelle, direction artistique et accompagnement créatif
            autour d’un univers nautique premium.
          </p>

          <h3>Objectif</h3>
          <p>
            Construire une présence visuelle claire, élégante et facilement déclinable
            sur les supports de communication.
          </p>
        </div>
      `;
    }

    return `
      <div class="project-detail-text">
        <p>${project.description || "Projet en cours de mise à jour."}</p>
      </div>
    `;
  }

  function loadInstagramScript() {
    const existingScript = document.querySelector('script[src*="instagram.com/embed.js"]');

    if (existingScript) {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(script);
  }

  function refreshInstagramEmbeds() {
    window.setTimeout(() => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      } else {
        loadInstagramScript();
      }
    }, 80);
  }

  function renderProject(projectKey) {
    const project = PROJECT_EMBEDS[projectKey];

    if (!project) {
      modalBody.innerHTML = `
        <div class="project-detail-text">
          <p>Projet introuvable.</p>
        </div>
      `;
      return;
    }

    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;

    const intro = `
      <div class="project-modal-intro">
        <p>${project.description || ""}</p>
      </div>
    `;

    if (!project.urls || project.urls.length === 0) {
      modalBody.innerHTML = intro + createTextProject(projectKey, project);
      return;
    }

    const embeds = project.urls
      .map((url) => {
        if (isInstagramUrl(url)) return createInstagramEmbed(url);
        if (isYoutubeUrl(url)) return createYoutubeEmbed(url);

        return `
          <div class="project-embed-card">
            <a class="project-embed-fallback" href="${url}" target="_blank" rel="noopener noreferrer">
              Ouvrir le contenu ↗
            </a>
          </div>
        `;
      })
      .join("");

    modalBody.innerHTML = `
      ${intro}
      <div class="project-embeds-grid">
        ${embeds}
      </div>
    `;

    if (project.urls.some(isInstagramUrl)) {
      refreshInstagramEmbeds();
    }
  }

  function openModal(projectKey) {
    lastFocusedElement = document.activeElement;

    renderProject(projectKey);

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const box = modal.querySelector(".project-modal-box");

    if (window.gsap && box) {
      gsap.fromTo(
        modalBackdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );

      gsap.fromTo(
        box,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }
      );
    }

    if (modalClose) {
      modalClose.focus({ preventScroll: true });
    }
  }

  function closeModal() {
    const box = modal.querySelector(".project-modal-box");

    const finishClose = () => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      modalBody.innerHTML = "";

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

      gsap.to(modalBackdrop, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: finishClose
      });
    } else {
      finishClose();
    }
  }

  function bindCards() {
    const cards = document.querySelectorAll("[data-embed-list]");

    cards.forEach((card) => {
      const projectKey = card.getAttribute("data-embed-list");
      const button = card.querySelector(".open-project-embeds");

      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");

      const trigger = (event) => {
        if (event) event.preventDefault();
        openModal(projectKey);
      };

      card.addEventListener("click", trigger);

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openModal(projectKey);
        }
      });

      if (button) {
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          trigger(event);
        });
      }
    });
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  document.addEventListener("DOMContentLoaded", bindCards);
})();
