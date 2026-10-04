/* ================================================================
   afarhank.dev — shared interactions
   Plain JavaScript only. Each feature is isolated so one failure does
   not break the rest of the website.
   ================================================================ */

(() => {
  "use strict";

  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Dark / light theme ---------- */
  const themeButton = document.querySelector("[data-theme-toggle]");

  // Apply a theme and optionally remember it for the visitor's next page load.
  function applyTheme(theme, persist = true) {
    const nextTheme = theme === "light" ? "light" : "dark";
    root.dataset.theme = nextTheme;

    // Keep the browser toolbar color in sync with the selected theme.
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute("content", nextTheme === "light" ? "#f7f5ef" : "#090909");
    }

    // Remember the user's choice when storage is available.
    if (persist) {
      try {
        localStorage.setItem("theme", nextTheme);
      } catch (_) {
        // Storage can be blocked in privacy modes; the site still works without it.
      }
    }

    // Keep the theme button accessible and descriptive.
    if (themeButton) {
      const isLight = nextTheme === "light";
      const label = isLight ? "Switch to dark theme" : "Switch to light theme";
      themeButton.setAttribute("aria-label", label);
      themeButton.setAttribute("title", label);
      themeButton.setAttribute("aria-pressed", String(isLight));
    }
  }

  // Dark is the default; a previously saved light preference wins.
  let savedTheme = "dark";
  try {
    savedTheme = localStorage.getItem("theme") || "dark";
  } catch (_) {
    savedTheme = "dark";
  }
  applyTheme(savedTheme, false);

  themeButton?.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "light" ? "dark" : "light");
  });

  /* ---------- 2. Responsive navigation ---------- */
  const menuButton = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-nav]");

  function closeMobileMenu() {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    mobileMenu.classList.remove("is-open");
  }

  menuButton?.addEventListener("click", () => {
    if (!mobileMenu) return;
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    mobileMenu.classList.toggle("is-open", !isOpen);
  });

  // Close the menu after choosing a destination.
  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Escape closes the menu for keyboard users.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });

  /* ---------- 3. Smooth typewriter hero ---------- */
  const typeTarget = document.querySelector("[data-typewriter]");

  // Small Promise helper keeps the timing logic readable and consistent.
  const wait = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

  async function runTypewriter() {
    if (!typeTarget) return;

    const rawPhrases = typeTarget.dataset.typewriter || "CS Student|Developer|Problem Solver";
    const phrases = rawPhrases.split("|").map((phrase) => phrase.trim()).filter(Boolean);

    if (!phrases.length) return;

    // Reduced-motion visitors see a stable phrase instead of animated typing.
    if (prefersReducedMotion) {
      typeTarget.textContent = phrases[0];
      return;
    }

    const typeSpeed = 82;
    const deleteSpeed = 44;
    const completedPause = 1000;
    const betweenPhrasesPause = 260;

    while (true) {
      for (const phrase of phrases) {
        // Type one character at a time.
        for (let index = 1; index <= phrase.length; index += 1) {
          typeTarget.textContent = phrase.slice(0, index);
          await wait(typeSpeed);
        }

        // Leave the complete phrase visible while the thin cursor blinks.
        await wait(completedPause);

        // Delete smoothly before moving to the next phrase.
        for (let index = phrase.length - 1; index >= 0; index -= 1) {
          typeTarget.textContent = phrase.slice(0, index);
          await wait(deleteSpeed);
        }

        await wait(betweenPhrasesPause);
      }
    }
  }

  // Start after the first paint so the hero appears naturally before typing begins.
  if (typeTarget) {
    window.setTimeout(() => {
      runTypewriter().catch(() => {
        // Fallback: if animation is interrupted, keep useful visible text.
        typeTarget.textContent = "CS Student";
      });
    }, 260);
  }

  /* ---------- 4. One-time fade-up reveal on scroll ---------- */
  const revealItems = document.querySelectorAll("[data-reveal]");

  if (revealItems.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      // Never hide content if the browser cannot or should not animate it.
      revealItems.forEach((item) => item.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            // Each element animates once, then stops being observed.
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -5% 0px"
        }
      );

      revealItems.forEach((item) => observer.observe(item));
    }
  }

  /* ---------- 5. Copy-email button ---------- */
  const copyButton = document.querySelector("[data-copy-email]");

  if (copyButton) {
    const email = copyButton.dataset.copyEmail;
    const label = copyButton.querySelector(".copy-label");
    let resetTimer;

    // Fallback for browsers where the modern Clipboard API is unavailable.
    function fallbackCopy() {
      const temporaryField = document.createElement("textarea");
      temporaryField.value = email;
      temporaryField.setAttribute("readonly", "");
      temporaryField.style.position = "fixed";
      temporaryField.style.opacity = "0";
      document.body.appendChild(temporaryField);
      temporaryField.select();
      document.execCommand("copy");
      temporaryField.remove();
    }

    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(email);
      } catch (_) {
        fallbackCopy();
      }

      window.clearTimeout(resetTimer);

      if (label) label.textContent = "Copied ✓";
      copyButton.classList.add("is-copied");

      // Minimal feedback lasts exactly two seconds, then returns to normal.
      resetTimer = window.setTimeout(() => {
        if (label) label.textContent = "Copy Email";
        copyButton.classList.remove("is-copied");
      }, 2000);
    });
  }
})();
