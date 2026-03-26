(() => {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");
  const navLinks = nav ? nav.querySelectorAll("a[href^='#']") : [];

  // Mobile navigation toggle
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((a) => {
      a.addEventListener("click", () => {
        if (nav.classList.contains("is-open")) {
          nav.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Close on Escape for accessibility
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Smooth scroll for same-page anchors
  document.addEventListener("click", (e) => {
    const link = e.target && e.target.closest ? e.target.closest("a[href^='#']") : null;
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Contact form UX
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form || !status) return;

  const fields = {
    name: form.querySelector("#name"),
    email: form.querySelector("#email"),
    phone: form.querySelector("#phone"),
    service: form.querySelector("#service"),
    message: form.querySelector("#message"),
  };

  const showFieldError = (fieldEl, msg) => {
    if (!fieldEl) return;
    const errorEl = fieldEl.parentElement.querySelector(".field-error");
    if (!errorEl) return;
    errorEl.textContent = msg || "";
  };

  const clearErrors = () => {
    Object.values(fields).forEach((el) => {
      if (!el) return;
      showFieldError(el, "");
    });
    status.textContent = "";
  };

  const emailLooksValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const name = fields.name?.value?.trim() ?? "";
    const email = fields.email?.value?.trim() ?? "";
    const phone = fields.phone?.value?.trim() ?? "";
    const service = fields.service?.value ?? "";
    const message = fields.message?.value?.trim() ?? "";

    let ok = true;

    if (!name) {
      showFieldError(fields.name, "Please enter your name.");
      ok = false;
    }

    if (!email || !emailLooksValid(email)) {
      showFieldError(fields.email, "Please enter a valid email address.");
      ok = false;
    }

    if (phone && phone.replace(/[^\d+]/g, "").length < 7) {
      showFieldError(fields.phone, "Please enter a valid phone number (or leave blank).");
      ok = false;
    }

    if (!service) {
      showFieldError(fields.service, "Please select a service interest.");
      ok = false;
    }

    if (!message) {
      showFieldError(fields.message, "Please add a message.");
      ok = false;
    }

    if (!ok) {
      status.textContent = "Please fix the highlighted fields and try again.";
      status.style.color = "#b91c1c";
      return;
    }

    // In a real site you'd POST this data to a backend.
    status.textContent = "Thanks! Your message is ready to send. (Demo form)";
    status.style.color = "#0b2a4a";
    form.reset();
  });
})();

