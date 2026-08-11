// ============================================================
// HERO TYPEWRITER
// ============================================================
(function () {
  const el = document.getElementById("typewriter");
  if (!el) return;

  const fullText = "Hey, I'm Giannis.";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    el.textContent = fullText;
    return;
  }

  let i = 0;
  const typingSpeed = 55; // ms per character

  function type() {
    if (i <= fullText.length) {
      el.textContent = fullText.slice(0, i);
      i++;
      setTimeout(type, typingSpeed);
    }
  }

  type();
})();

// Subtle fade-and-rise reveal as sections enter the viewport.
// Respects prefers-reduced-motion by doing nothing (elements are
// already visible by default via the no-JS fallback below).
const revealEls = document.querySelectorAll(".reveal");

if (revealEls.length && "IntersectionObserver" in window) {
  revealEls.forEach((el) => el.classList.add("reveal-armed"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
}
// If IntersectionObserver isn't supported, elements stay in their
// default visible state — nothing to do.

// ============================================================
// PROJECT DETAILS MODAL
// ============================================================
const overlay = document.getElementById("modal-overlay");
const modal = overlay ? overlay.querySelector(".modal") : null;
const modalTitle = document.getElementById("modal-title");
const modalGallery = document.getElementById("modal-gallery");
const modalTags = document.getElementById("modal-tags");
const modalBody = document.getElementById("modal-body");
const modalLinks = document.getElementById("modal-links");
const modalClose = document.getElementById("modal-close");

let lastFocusedEl = null;

function openModal(card) {
  const title = card.querySelector("h3").textContent;
  const tags = card.querySelector(".tags");
  const full = card.querySelector(".project-full");
  const links = card.querySelector(".project-links");

  modalTitle.textContent = title;
  modalTags.innerHTML = tags ? tags.innerHTML : "";
  modalGallery.innerHTML = full ? full.querySelector(".gallery").innerHTML : "";
  modalBody.innerHTML = full
    ? Array.from(full.querySelectorAll("p")).map((p) => `<p>${p.innerHTML}</p>`).join("")
    : "";
  modalLinks.innerHTML = links ? links.innerHTML : "";

  lastFocusedEl = document.activeElement;
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeModal() {
  overlay.hidden = true;
  document.body.style.overflow = "";
  if (lastFocusedEl) lastFocusedEl.focus();
}

document.querySelectorAll(".details-btn").forEach((btn) => {
  btn.addEventListener("click", () => openModal(btn.closest(".project-card")));
});

if (overlay) {
  modalClose.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) closeModal();
    // simple focus trap while modal is open
    if (e.key === "Tab" && !overlay.hidden) {
      const focusable = modal.querySelectorAll('button, a[href]');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}
