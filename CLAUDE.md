# WEISSHEIM Website

Product landing page for the WEISSHEIM® laundry organizer. German language site.

## Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Hosting:** GitHub Pages (custom domain: weissheim.com)
- **Forms:** Web3Forms (API key in `web/.env.local`)

## Project Structure

```
web/                    # Source code (Vite project)
├── src/
│   ├── LandingPage.tsx        # Main page component (entry point)
│   ├── main.tsx               # React root
│   ├── config/site.ts         # All constants, URLs, nav items, specs
│   ├── lib/analytics.ts       # Analytics helpers
│   ├── sections/              # Page sections (Hero, Features, Product, etc.)
│   ├── components/            # Reusable components (ContactForm, Reveal, ui/)
│   └── assets/                # Images (WebP format)
├── public/                    # Static files (favicon, CNAME, legal pages)
├── scripts/smoke-check.mjs   # Post-build verification
└── index.html                 # HTML template

docs/                   # Build output (served by GitHub Pages)
_figma_export/          # Design reference (git-ignored, local only)
```

## Build & Deploy

```bash
cd web && npm run build    # Builds to ../docs/
```

Deploy = push to `main`. GitHub Pages serves from `docs/`.

## Key Decisions

- **Favicon:** SVG with `prefers-color-scheme` — auto-switches black/white for light/dark browser mode. ICO fallback for older browsers.
- **Images:** All product/logo images in WebP format for performance.
- **Config:** All constants centralized in `web/src/config/site.ts` (Amazon URL, nav items, specs, features).
- **No router:** Single-page landing page. Legal pages (impressum, datenschutz, agb) are static HTML in `public/`.

## Important Files

| File | Purpose |
|---|---|
| `web/src/config/site.ts` | Central config (URLs, content, nav) |
| `web/src/LandingPage.tsx` | Main page layout + state |
| `web/src/components/ContactForm.tsx` | Web3Forms contact modal |
| `docs/index.html` | Live site entry (built, don't edit manually) |
| `web/public/favicon.svg` | Adaptive favicon (dark/light mode) |

## Rules

- Always run `npm run build` in `web/` after source changes before pushing
- Never edit files in `docs/` manually — they get overwritten by build
- Keep `CLAUDE.md` updated when making structural changes
