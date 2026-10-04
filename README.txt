afarhank.dev — portfolio v3
===========================

WHAT CHANGED
------------
- User-provided AFK signature is tightly cropped and visible in the top-left.
- Signature automatically appears white in dark mode and black in light mode.
- Signature artwork is also used to create the browser favicon.
- Default dark theme + remembered light theme option.
- Slow red glow drift + extremely subtle animated grain in both themes.
- Animated hand-drawn red underline under "Farhan".
- Rebuilt, stable typewriter: CS Student / Developer / Problem Solver.
- One-time 20px / 500ms fade-up reveal animations.
- Compact homepage spacing and smaller #more section.
- Desktop top navigation and footer both include:
  projects, awards, certifications, GitHub, LinkedIn, blog, contact.
- Mobile navigation collapses into a simple menu.
- Contact page keeps Copy Email -> Copied ✓ for two seconds.
- SEO: canonical URLs, descriptions, Open Graph image, Person structured data,
  sitemap, robots.txt, web manifest, favicon, Apple touch icon, and 404 page.
- Clean URLs on Cloudflare Pages via the _redirects file.

DEPLOYING THIS VERSION
----------------------
Replace the files in your existing GitHub repository with the contents of this
folder, then commit the changes. Because the repository is already connected to
Cloudflare Pages, Cloudflare should deploy the update automatically.

IMPORTANT
---------
Keep index.html, style.css, script.js, _redirects, robots.txt, sitemap.xml,
site.webmanifest, and the assets folder at the repository root.
