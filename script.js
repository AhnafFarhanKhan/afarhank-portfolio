(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function applyTheme(theme, persist = true) {
    const next = theme === 'light' ? 'light' : 'dark';
    root.dataset.theme = next;
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute('content', next === 'light' ? '#f6f3eb' : '#0a0a09');
    if (persist) {
      try { localStorage.setItem('theme', next); } catch (_) {}
    }
    if (themeButton) {
      const isLight = next === 'light';
      themeButton.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
      themeButton.setAttribute('title', isLight ? 'Switch to dark theme' : 'Switch to light theme');
      themeButton.setAttribute('aria-pressed', String(isLight));
    }
  }

  let savedTheme = 'dark';
  try { savedTheme = localStorage.getItem('theme') || 'dark'; } catch (_) {}
  applyTheme(savedTheme, false);

  themeButton?.addEventListener('click', () => {
    applyTheme(root.dataset.theme === 'light' ? 'dark' : 'light');
  });

  const typeTarget = document.querySelector('[data-typewriter]');
  const cursor = document.querySelector('.type-cursor');
  const phrases = ['CS Student', 'Developer', 'Problem Solver'];

  if (typeTarget) {
    if (reduceMotion) {
      typeTarget.textContent = phrases[0];
      cursor?.setAttribute('hidden', '');
    } else {
      let phraseIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const tick = () => {
        const phrase = phrases[phraseIndex];

        if (!deleting) {
          charIndex += 1;
          typeTarget.textContent = phrase.slice(0, charIndex);

          if (charIndex === phrase.length) {
            deleting = true;
            window.setTimeout(tick, 1000);
            return;
          }
          window.setTimeout(tick, 78);
        } else {
          charIndex -= 1;
          typeTarget.textContent = phrase.slice(0, charIndex);

          if (charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            window.setTimeout(tick, 280);
            return;
          }
          window.setTimeout(tick, 42);
        }
      };

      window.setTimeout(tick, 350);
    }
  }

  const revealItems = document.querySelectorAll('[data-reveal]');
  if (revealItems.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      revealItems.forEach((item) => observer.observe(item));
    }
  }

  const copyButton = document.querySelector('[data-copy-email]');
  if (copyButton) {
    const email = copyButton.dataset.copyEmail;
    const label = copyButton.querySelector('.copy-label');
    let timer;

    const fallbackCopy = () => {
      const input = document.createElement('textarea');
      input.value = email;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    };

    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
      } catch (_) {
        fallbackCopy();
      }

      window.clearTimeout(timer);
      if (label) label.textContent = 'Copied ✓';
      copyButton.classList.add('is-copied');

      timer = window.setTimeout(() => {
        if (label) label.textContent = 'Copy Email';
        copyButton.classList.remove('is-copied');
      }, 2000);
    });
  }
})();
