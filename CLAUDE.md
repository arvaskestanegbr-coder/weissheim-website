# WEISSHEIM Website

Product landing page for the WEISSHEIM® laundry organizer. German language site.

## Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Fonts:** Self-hosted via Fontsource
- **Hosting:** GitHub Pages (custom domain: weissheim.com)
- **Forms:** Web3Forms (API key in `web/.env.local`)

## Project Structure

```
web/                    # Source code (Vite project)
├── src/
│   ├── LandingPage.tsx        # Main page component (entry point)
│   ├── main.tsx               # React root
│   ├── config/site.ts         # All constants, URLs, nav items, specs
│   ├── lib/                   # Analytics and motion-preference helpers
│   ├── sections/              # Page sections (Hero, Features, Product, etc.)
│   ├── components/            # Reusable components (ContactForm, Reveal, ui/)
│   └── assets/                # Images (WebP format)
├── public/                    # Static files (favicon, CNAME, legal pages)
├── plugins/legal-assets.ts   # Local fonts/logo for legal pages in dev and build
├── scripts/smoke-check.mjs   # Post-build verification
└── index.html                 # HTML template

docs/                   # Build output (git-ignored, built by CI)
_figma_export/          # Design reference (git-ignored, local only)

.claude/                # AI session configuration
├── settings.json              # Tool permissions
├── rules/
│   ├── general.md             # Git workflow, commit style
│   └── frontend.md            # React/Vite/Tailwind coding rules
└── skills/
    ├── requirements/SKILL.md  # /requirements slash command
    ├── requirements/template.md # Feature spec template
    ├── deploy/SKILL.md        # /deploy slash command
    └── help/SKILL.md          # /help slash command

features/               # Feature tracking
├── INDEX.md                   # Status of all features
└── README.md                  # How to document features
```

## Build & Deploy

```bash
npm run build    # Local build into docs/ (for checking only)
npm run smoke    # Builds, then verifies the output
```

Deploy = push to `main`. GitHub Actions
([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) lints, builds and
smoke-checks, then publishes to Pages. `docs/` is **not** committed — the build
happens on CI, so the live site cannot drift from the source.

The contact form needs `VITE_WEB3FORMS_ACCESS_KEY`: locally from
`web/.env.local`, on CI from the repository secret of the same name. Without it
the form fails silently, so the smoke check asserts the key is in the bundle.

## Key Decisions

- **Product image and color selection:** `ProductImageViewer.tsx` provides Product/Maße modes in the hero. `LandingPage` owns the selected color and synchronizes both product images and all Amazon purchase links through `AMAZON_PRODUCT_URLS`. `PRODUCT_IMAGE_VIEWER_CONTENT` holds the dimension labels. See `features/WEISS-8-massansicht.md`.
- **Mobile navigation and purchase bar:** The mobile menu overlays the page without changing section positions. The compact purchase bar appears after the hero and hides when an in-content purchase link, contact section or footer is visible.
- **Legal styling:** Static legal HTML uses `public/legal.css`; `plugins/legal-assets.ts` serves/emits the existing logo and Fontsource fonts. Legal text is unchanged. These assets are built by CI, not committed as copied binaries.
- **Design study:** The separate 2026 redesign remains on its preview branch/Netlify site. Production has no preview query routing, preview metadata or redesign assets.
- **Favicon:** ICO format (`web/public/favicon.ico`). SVG variant was removed.
- **Images:** All product/logo images in WebP format for performance.
- **Config:** All constants centralized in `web/src/config/site.ts` (Amazon URL, nav items, specs, features).
- **No router:** Single-page landing page. Legal pages (impressum, datenschutz, agb) are static HTML in `public/`.

## Important Files

| File | Purpose |
|---|---|
| `web/src/config/site.ts` | Central config (URLs, content, nav) |
| `web/src/LandingPage.tsx` | Main page layout + state |
| `web/src/components/ContactForm.tsx` | Web3Forms contact modal |
| `.github/workflows/deploy.yml` | Build + deploy pipeline |
| `web/public/favicon.ico` | Site favicon |

## Rules

- Run `npm run lint` and `npm run smoke` in `web/` before pushing
- Never edit files in `docs/` — it is git-ignored build output
- Keep `CLAUDE.md` updated when making structural changes

## Feature Overview

@features/INDEX.md
