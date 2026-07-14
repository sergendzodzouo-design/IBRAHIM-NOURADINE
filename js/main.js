// ==========================================================================
// IBRAHIM NOURADINE — Site vitrine — interactions
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Menu mobile ---------- */
  const toggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Ferme le menu après un clic sur un lien
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Ombre du header au scroll ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Révélation au scroll (respecte prefers-reduced-motion) ---------- */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const revealEls = document.querySelectorAll("[data-reveal]");

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Pas d'IntersectionObserver ou mouvement réduit : tout est visible directement
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Lien de nav actif selon la section visible ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".main-nav a, .mobile-nav a");

  if (sections.length && "IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              link.classList.toggle(
                "is-active",
                link.getAttribute("href") === `#${id}`
              );
            });
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((section) => navObserver.observe(section));
  }

  /* ---------- Année du footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Compteurs numériques (stats & réalisations) ---------- */
  // Anime "62", "+50%", "4 018", "35 ans", "10+" ... de 0 vers leur valeur,
  // en conservant préfixe ("+") et suffixe ("%", " ans") intacts.
  function formatNumber(n) {
    return n.toLocaleString("fr-FR");
  }

  function parseCountTarget(text) {
    const match = text.match(/\d[\d\s]*/);
    if (!match) return null;
    const numericValue = parseInt(match[0].replace(/\s/g, ""), 10);
    if (!numericValue) return null;
    return {
      numericValue,
      prefix: text.slice(0, match.index),
      suffix: text.slice(match.index + match[0].length),
    };
  }

  function animateCount(el) {
    const original = el.textContent.trim();
    const parsed = parseCountTarget(original);
    if (!parsed) return;

    const { numericValue, prefix, suffix } = parsed;
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.round(numericValue * eased);
      el.textContent = `${prefix}${formatNumber(current)}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = original; // valeur finale exacte, sans arrondi de locale
      }
    }
    requestAnimationFrame(tick);
  }

  const countEls = document.querySelectorAll(
    ".stat-num, .result-num, .portrait-badge .num"
  );

  if (!prefersReducedMotion && "IntersectionObserver" in window && countEls.length) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    countEls.forEach((el) => countObserver.observe(el));
  }

  /* ---------- Ligne de timeline "qui se dessine" ---------- */
  const timeline = document.querySelector(".timeline");
  if (timeline) {
    if (!prefersReducedMotion && "IntersectionObserver" in window) {
      const timelineObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              timeline.classList.add("is-drawn");
              timelineObserver.unobserve(timeline);
            }
          });
        },
        { threshold: 0.15 }
      );
      timelineObserver.observe(timeline);
    } else {
      timeline.classList.add("is-drawn");
    }
  }

  /* ---------- Spotlight suivant la souris (cartes Expertise & Contact) ---------- */
  if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
    document
      .querySelectorAll(".expertise-card, .cta-card")
      .forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
          card.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
        });
      });
  }
});