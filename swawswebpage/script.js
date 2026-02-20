document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  const form = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  // Smooth scrolling for anchor links
  header.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
      const id = target.getAttribute("href").slice(1);
      const section = document.getElementById(id);
      if (section) {
        event.preventDefault();
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        const top =
          section.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
        window.scrollTo({
          top,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
        if (nav && nav.classList.contains("open")) {
          nav.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      }
    }
  });

  // Smooth scrolling for in-page CTAs
  document.body.addEventListener("click", (event) => {
    const target = event.target.closest("a");
    if (!target) return;
    const href = target.getAttribute("href");
    if (href && href.startsWith("#") && !target.closest("header")) {
      const id = href.slice(1);
      const section = document.getElementById(id);
      if (section) {
        event.preventDefault();
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        const top =
          section.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
        window.scrollTo({
          top,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }
    }
  });

  // Mobile nav toggle
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Simple contact form handling (frontend only)
  if (form && formStatus) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      formStatus.textContent = "";

      if (!form.checkValidity()) {
        formStatus.textContent = "Please fill in the required fields.";
        formStatus.style.color = "#ffb347";
        return;
      }

      form.reset();
      formStatus.textContent =
        "Thank you for reaching out. Our team will contact you shortly.";
      formStatus.style.color = "";
    });
  }
});

