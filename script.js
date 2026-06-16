document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle Logic
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = themeToggleBtn.querySelector("i");
  
  // Check local storage or system preferences
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  
  const currentTheme = savedTheme || (systemPrefersLight ? "light" : "dark");
  
  // Apply initial theme
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener("click", () => {
    const activeTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = activeTheme === "light" ? "dark" : "light";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === "light") {
      themeIcon.className = "bx bx-moon";
    } else {
      themeIcon.className = "bx bx-sun";
    }
  }

  // Scroll Reveal Observer
  const revealElements = document.querySelectorAll(".reveal");
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Optional: stop observing once revealed
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Active Nav Link On Scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-item");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) {
        current = s.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + current
      );
    });
  });

  // Contact Form Submission & Toast Handling
  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("form-submit");
  const toast = document.getElementById("toast");

  if (contactForm && submitBtn && toast) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const nameVal = document.getElementById("contact-name").value.trim();
      const emailVal = document.getElementById("contact-email").value.trim();
      const messageVal = document.getElementById("contact-message").value.trim();

      if (!nameVal || !emailVal || !messageVal) {
        return;
      }

      // Visual sending state
      submitBtn.disabled = true;
      submitBtn.innerText = "SENDING...";

      // Simulate network request
      setTimeout(() => {
        // Reset state
        submitBtn.disabled = false;
        submitBtn.innerText = "SEND MESSAGE";
        contactForm.reset();

        // Show Toast
        toast.classList.add("show");

        // Hide Toast after 3.5s
        setTimeout(() => {
          toast.classList.remove("show");
        }, 3500);

      }, 1500);
    });
  }
});
