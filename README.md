# Industry Landing Pages

A portfolio of three high-converting, fast-loading landing pages for different industries, plus a portfolio hub that showcases them. Everything is hand-coded in plain **HTML, CSS and vanilla JavaScript**: no frameworks, no jQuery, no build step.

> All business names, people, addresses, phone numbers and testimonials are **fictional** and exist for demonstration only.

## Live demo

| Page | Link |
| --- | --- |
| Portfolio hub | https://sharvan10.github.io/industry-landing-pages/ |
| BrightSmile Dental Clinic | https://sharvan10.github.io/industry-landing-pages/dental/ |
| UrbanNest Realty | https://sharvan10.github.io/industry-landing-pages/real-estate/ |
| Spice Route Kitchen | https://sharvan10.github.io/industry-landing-pages/restaurant/ |

## The pages

### 1. BrightSmile Dental Clinic (`/dental/`)
A calm, trustworthy teal-and-mint design built around one goal: booked appointments.
- Hero with appointment and click-to-call CTAs, plus trust stats
- Services grid with starting prices and a "Why choose us" section
- Doctor profiles
- Interactive **before/after slider** (keyboard-accessible range input, inline SVG illustration)
- Clearly labelled fictional testimonials
- Insurance, membership and financing info
- Accessible **FAQ accordion** (`aria-expanded` / `aria-controls`)
- Validated appointment form (no past dates), map placeholder and footer
- `Dentist` JSON-LD schema

### 2. UrbanNest Realty (`/real-estate/`)
An editorial charcoal, sand and terracotta look with a working search experience.
- Full-bleed hero with a **property search bar** (location, type, max price) that filters the listings
- Featured listings grid with **JS filters by type and price**, a live result count and an empty state
- Animated **stats counter** (starts when scrolled into view, respects reduced motion)
- Agent profiles and testimonials
- Working **mortgage calculator** (amortisation formula, 0% edge case, conic-gradient donut chart)
- Validated contact form
- `RealEstateAgent` JSON-LD schema

### 3. Spice Route Kitchen (`/restaurant/`)
A warm, dark clay-and-saffron palette with an editorial serif (Fraunces).
- Hero with reservation CTA
- Menu with **ARIA tabs** (arrow keys, Home and End all work)
- Chef's specials, photo gallery and reviews
- Table reservation form (date, time, guests)
- Opening hours table with a live **"Open now / Closed"** indicator
- Location map placeholder and footer
- `Restaurant` JSON-LD schema

### 4. Portfolio hub (`/`)
"Landing Page Portfolio by Sharvan Kumar, Web Developer": a card for each page with a browser-frame preview, short description, tech used and a **View Live** button.

## Features

- **Mobile-first and fully responsive**, from 320px phones to wide desktops
- **Sticky header** with an accessible mobile menu (closes on Escape or link click)
- **Subtle animations**: reveal-on-scroll, hover lifts and floating accents, all disabled under `prefers-reduced-motion`
- **Client-side form validation** with inline, friendly error messages (`aria-invalid`, `aria-describedby`, `aria-live`) and a success message. No backend needed.
- **Graceful image fallback**: if a remote photo fails to load, a brand-coloured gradient shows instead of a broken image
- **Relative links everywhere**, so the site works under a GitHub Pages project path

## Performance and SEO highlights

- Lighthouse lab results from local testing: **100 Performance, 100 Accessibility, 100 SEO** on every page (mobile and desktop)
- No frameworks. Per-page payload is tiny (gzipped):

  | Page | HTML | CSS | JS |
  | --- | --- | --- | --- |
  | Hub | 3.5 KB | 2.9 KB | 2.0 KB |
  | Dental | 8.1 KB | 4.5 KB | 2.4 KB |
  | Real estate | 6.5 KB | 4.2 KB | 3.7 KB |
  | Restaurant | 7.1 KB | 4.1 KB | 2.8 KB |

- Hero image gets `fetchpriority="high"`. Everything else uses `loading="lazy"` and `decoding="async"`, with explicit `width`/`height` to prevent layout shift (CLS ≈ 0)
- Responsive `srcset` / `sizes` on hero images, plus `preconnect` to the image CDN
- System font stacks, or one Google Font loaded non-blocking with `font-display: swap` and `preconnect`
- All scripts are `defer`red. Inline SVG icons and illustrations, no icon fonts.
- Semantic HTML5 landmarks and one `h1` per page with a logical heading order
- Unique titles and meta descriptions, canonical URLs, **Open Graph** and Twitter tags
- **JSON-LD** structured data: `Dentist`, `RealEstateAgent`, `Restaurant`, `CollectionPage`
- `robots.txt`, `sitemap.xml` and a custom `404.html`
- Accessibility: skip links, visible `:focus-visible` styles, keyboard-operable widgets, AA colour contrast and labelled form controls
- Every page passes the W3C Nu HTML validator with zero errors

## Tech stack

- HTML5
- CSS3 (custom properties, Grid, Flexbox, `clamp()`, `aspect-ratio`, `conic-gradient`, `clip-path`)
- Vanilla JavaScript (ES5-compatible, IntersectionObserver)
- GitHub Actions and GitHub Pages
- Images: free-licence photos from [Unsplash](https://unsplash.com/) plus inline SVG illustrations

## Project structure

```
.
├── index.html              # Portfolio hub
├── 404.html
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── core.js             # Shared: nav, sticky header, reveal, form validation, image fallback
│   └── portfolio.css       # Hub styles
├── dental/                 # index.html, styles.css, main.js
├── real-estate/            # index.html, styles.css, main.js
├── restaurant/             # index.html, styles.css, main.js
└── .github/workflows/deploy.yml
```

## Run locally

No build step. Serve the folder with any static server:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080/.

## Deployment

`.github/workflows/deploy.yml` deploys the site to GitHub Pages on every push to `main`.

One-time setup: in the repository, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.

## Credits

Built by Sharvan Kumar.
