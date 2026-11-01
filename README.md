# HEXA Technologies — Official Website

React + Vite + TypeScript + Tailwind CSS + Framer Motion + Lucide.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then builds to /dist
npm run preview    # serve the production build locally
```

Requires Node 18+ (Node 20/22 recommended).

## Project structure

```
src/
  config/site.ts          ← all real-world settings + product image paths
  lib/scroll.ts           ← smooth scroll, anchor handling, contact prefill
  hooks/                  ← useScrollSpy, useMotionPrefs (reduced-motion / low-power)
  components/
    ui/                   ← Button (magnetic), TiltCard, Reveal, Particles, Logo,
                            ProductImage, BrandOrb, StatusBadge
    layout/               ← Loader, Navbar, Footer, LegalModal
    sections/             ← Hero, Intro, Features, HowItWorks, Ecosystem,
                            Showcase, Pricing, Vision, ComingSoon, Contact
  App.tsx · main.tsx · index.css
public/                   ← favicon, og-image, robots.txt, images/product/ (yours)
```

## 1. Add your product images (important)

No product photos were available when this site was generated, so the site shows
neutral branded placeholders instead of inventing a device. Add your real photos to
`public/images/product/` using these names (or edit `PRODUCT_IMAGES` in `src/config/site.ts`):

| File | Used in |
| --- | --- |
| `hexa-ai-hero.png` | Hero (transparent PNG works best) |
| `hexa-ai-front.jpg` | Intro section + gallery |
| `hexa-ai-side.jpg` | Gallery |
| `hexa-ai-led-closeup.jpg` | Gallery |
| `hexa-ai-unboxing.jpg` | Gallery |
| `hexa-ai-accessories.jpg` | Gallery |

Each image appears automatically as soon as the file exists. Compress them first
(WebP/AVIF, ~1600px wide max) for good Lighthouse scores. Also replace
`public/og-image.svg` with a 1200×630 PNG/JPG for social sharing if you like.

## 2. Contact form integration point

The form validates fully, but **will not pretend to send** without a backend.

1. Copy `.env.example` to `.env`.
2. Set `VITE_CONTACT_ENDPOINT` to any endpoint accepting a JSON `POST`
   (Formspree, Web3Forms, a Netlify/Vercel function, your own API).
   Payload: `{ name, email, category, subject, message }`. A `2xx` reply = success.
3. Optionally set `VITE_CONTACT_EMAIL` to show a public email address.

## 3. Other configuration (`.env`)

- `VITE_LAUNCH_DATE` — ISO date. When set, the Coming Soon section shows a live
  countdown; when empty it shows the Coming Soon animation.
- `VITE_INSTAGRAM_URL`, `VITE_YOUTUBE_URL`, `VITE_LINKEDIN_URL` — unset profiles are
  rendered as disabled "coming soon" icons rather than dead links.

## 4. Honest feature labelling

Feature/ecosystem statuses (`Concept`, `Coming soon`, `In development`) are set in the
section files. Update them as things are built and tested; only call something
available once it truly is. The ₹4,999 price is labelled as a *planned target price*,
and there is no checkout. The Privacy Policy and Terms are **draft starter text** —
have a lawyer review them before launch.

## Deploy

**Vercel** — push to GitHub → *Add New Project* → import the repo. Framework: Vite,
build `npm run build`, output `dist` (already in `vercel.json`). Add the `.env`
values under *Settings → Environment Variables*.

**Netlify** — *Add new site → Import from Git*. Build `npm run build`, publish
`dist` (already in `netlify.toml`). Add env vars under *Site settings → Environment*.
Or drag-and-drop the `dist` folder after `npm run build`.

After deploying, uncomment and set the canonical URL in `index.html` and the
sitemap line in `public/robots.txt`.

## Accessibility & performance notes

- Honors `prefers-reduced-motion`; particles, parallax, tilt and magnetic effects are
  disabled on reduced-motion, touch-only and low-powered devices.
- Skip link, semantic landmarks, keyboard-operable menu/carousel/modal, ARIA labels.
- Images lazy-load; React and Framer Motion are split into separate chunks.
