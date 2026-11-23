# Abu Sayaf — Engineering Portfolio

A lightweight, responsive personal portfolio based on the **user-supplied reference screenshot** (`design/reference-landing-page.png`). Implemented with **Astro 7, TypeScript, Tailwind CSS v4, and lean native JavaScript** — no React runtime or animation library.

## Design

- Warm off-white canvas, restrained green highlights, precise typography, and a narrow content column.
- Real HTML/CSS/SVG illustrations — **the reference screenshot is not used as a page image**.
- Clickable architecture explorer, component-level project diagrams, selectable engineering process, and accessible native `<details>`.
- Intentional negative space, responsive sections, reduced-motion support, keyboard navigation, and visible focus indicators.
- Case-study pages and engineering notes, rather than links that lead nowhere.

## Quick start

Requires Node.js **22.12+** and npm.

```bash
npm install
npm run dev
# Open the local address printed by Astro.
```

Production build and preview:

```bash
npm run check
npm run build
npm run preview
```

Source audit (works without installing packages):

```bash
npm test
```

## Customize before publishing

1. Open `src/data/site.ts`:
   - Confirm name, job title, headline, experience, introduction and project claims.
   - Add your **real** `email`, `github`, `linkedin`, `upwork`, and `youtube` URLs.
   - Add valid `videos[].url` values. Until configured, the video topics appear as non-clickable previews. No fake playback links are created.
2. Replace `public/images/avatar-placeholder.svg` with your actual photo. If using a `.webp` or `.avif`, update `site.avatar.src` and `site.avatar.alt` accordingly. This illustration is **not a verified likeness**.
3. Review `src/data/engineering.ts`, the two case studies in `src/pages/work`, and the two editable engineering-note drafts in `src/pages/notes` for factual accuracy and confidentiality.
4. Update `public/images/og-cover.png` if you want an actual portrait or personalized social preview.
5. Set the deployment domain as `PUBLIC_SITE_URL` (e.g. `https://your-domain.com`) on Vercel. This enables proper canonical URLs, social-image URLs, and a generated XML sitemap.

All unprovided external profiles are deliberately rendered as **inactive placeholders**, not dead links. `Previously Top Rated` and `$40k+ earned` reflect figures supplied by the portfolio owner; verify exact public wording against the actual Upwork profile before going live.

## Deploy to Vercel

1. Push this folder to a Git repository and import it in Vercel.
2. Select **Astro** (or let Vercel detect it).
3. Set Build Command: `npm run build`; Output Directory: `dist`.
4. Add environment variable `PUBLIC_SITE_URL=https://your-domain.com` in Production.
5. Deploy, connect your custom domain, and verify `robots.txt` and `sitemap-index.xml`.

There is no database, serverless API, or mandatory external resource. Content is rendered at build time. This repository deliberately avoids tracking live dependencies or injecting analytics without consent.

## Structure

```text
src/
  components/
    layout/        Header, footer
    sections/      Clickable project diagrams
    ui/            SVG icon, real/placeholder profile link
  data/            Site content, capabilities, architecture, project metadata
  layouts/         Shared SEO/JSON-LD document layout
  pages/           Homepage, case studies, engineering notes
  scripts/         ~small progressive enhancements (TypeScript)
  styles/          Tailwind v4 + design tokens + custom visual styles
public/
  images/          Avatar placeholder, social-share preview
  icons.svg        Self-hosted, reusable icon sprite
  favicon.svg
  robots.txt
design/
  reference-landing-page.png
```

## SEO & accessibility

The implementation includes semantic headings, one `h1` per page, descriptive titles and descriptions, Person + ProfilePage/WebPage JSON-LD, Open Graph, Twitter card metadata, `robots.txt`, and optional sitemap/canonical generation when `PUBLIC_SITE_URL` is configured. Interactive elements have real state changes, keyboard semantics, and focus visibility. Page scripts are small and added through Astro's bundled `<script>`.

**Search rankings and AI-search prominence are not guaranteed.** Genuine project evidence, accurate linked profiles, relevant writing, and valid metadata matter more than keyword stuffing.

## Known limits / QA status

- The sandbox had **no outbound DNS access to npm**, so dependencies could not be installed here; **`astro check`, the actual Astro production build, and Lighthouse audits have not been executed**. Run the commands above on an internet-connected machine or in Vercel, and address any version-specific warnings.
- An offline source preview was generated for structural inspection only. Browser navigation was blocked by this environment's browser security policy; **visual comparison at target screen sizes is pending**.
- `npm test` performs static checks, and `src/scripts/main.ts` was type-checked using the environment's global TypeScript compiler.
- Real avatar, social links and YouTube video URLs remain deliberately editable placeholders because they were not included in the supplied materials.

## Final production checklist

- [ ] Set correct public domain, email, and external profile links.
- [ ] Replace avatar illustration with permissioned portrait.
- [ ] Review all personal claims, projects, case studies, and notes.
- [ ] Run `npm install && npm run build` and fix any errors.
- [ ] Test navigation and interactive diagrams at 320, 375, 390, 768, 1024, 1440 and 1920px.
- [ ] Check keyboard navigation, focus, contrast and reduced-motion preferences.
- [ ] Check Lighthouse performance, LCP/INP/CLS, and social-sharing previews on the production URL.
- [ ] Ensure there are no browser-console errors or accidental horizontal overflow.

## Copyright and assets

The provided screenshot is included only as an optional internal design reference. Icons and architecture illustrations are recreated as local SVG symbols and CSS, not captured from the screenshot. No font files or private credentials are included.
