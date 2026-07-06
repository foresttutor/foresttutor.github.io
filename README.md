# Forest Tutoring

Static website for Forest Tutoring, hosted with GitHub Pages.

## Overview

This site is a single-page tutoring homepage built from the HTML5 UP Landed
template and customized for Forest Tutoring. The page includes:

- Smooth-scrolling navigation for desktop, mobile, and section arrows
- About, Experience, Education, Testimonials, Tutoring Services, and Contact sections
- A testimonial carousel with arrows, dots, side-click navigation, keyboard support, and mobile swipe
- Contact form links in the header, services area, and bottom call-to-action
- Facebook link in the footer

## Local Preview

From the repository root:

```sh
python3 -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000/
```

## Project Structure

```text
index.html          Main page
assets/css/         Stylesheets, Font Awesome CSS, and CSS images
assets/js/          Runtime JavaScript
assets/webfonts/    Font Awesome webfonts
images/             Site images used by the homepage
```

Unused template demo pages, Sass sources, blank placeholder images, and unused
JavaScript plugins were removed so the published site stays focused on the live
homepage.

## Verification

Useful checks before publishing:

```sh
node --check assets/js/main.js
npx --yes htmlhint index.html
git diff --check
```

To verify local assets over HTTP:

```sh
python3 -m http.server 8000
```

Then confirm the page and referenced assets load from `http://127.0.0.1:8000/`.
