afarhank.dev — portfolio v4
===========================

WHAT CHANGED
------------
- Farhan underline animation slowed to 1.45 seconds so it is noticeable on load.
- Removed the small "Computer Science @ UCalgary · Calgary, Canada" line above the name.
- Added detailed project showcases to the homepage and /projects page:
  1. Calgary Traffic Risk Intelligence (screenshot, description, tools, live demo, GitHub)
  2. Campus Gym Usage Analysis (description, tools, GitHub, bundled PDF report)
  3. Cybersecurity Hacking Challenge (description, tools, bundled PDF report)
  4. Habit Tracker remains a minimal title row.
- Awards page now lists 2025 and 2024 Dean's List entries separately, plus the
  International Undergraduate Award and 2024 admission scholarships.
- Certifications page now shows three honest in-progress study targets:
  AWS Certified Cloud Practitioner, AWS Certified Solutions Architect - Associate,
  and CompTIA Security+.
- Added ?v=4 cache-busting to style.css and script.js references so browsers are
  much less likely to mix old CSS/JS with a new deployment.
- Preserved the existing dark/light themes, signature, navigation, glow/grain
  background, typewriter, reveal animations, footer, and responsive behavior.

PROJECT FILES
-------------
- Traffic dashboard screenshot:
  assets/projects/calgary-traffic-risk-dashboard.png
- Campus Gym report:
  assets/reports/campus-gym-usage-report.pdf
- Cybersecurity Hacking Challenge report:
  assets/reports/cybersecurity-hacking-challenge-report.pdf

DEPLOYING THIS VERSION
----------------------
Replace the files in your existing GitHub repository with the contents of this
folder, then commit. Cloudflare Pages will deploy the update automatically.

IMPORTANT
---------
Do NOT add the old _redirects file back. Cloudflare Pages already supports clean
URLs such as /projects for projects.html, and the old redirect rules caused a
redirect loop in the previous deployment.
