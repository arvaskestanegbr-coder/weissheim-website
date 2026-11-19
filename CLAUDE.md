# WEISSHEIM Website

Product landing page for the WEISSHEIM® laundry organizer. German language site.

## Tech Stack

- **Homepage:** Static HTML with progressive enhancement, TypeScript and Vite
- **Styling:** Local CSS; system fonts on the product page
- **Hosting:** GitHub Pages (custom domain: weissheim.com)
- **Forms:** Web3Forms (API key in `web/.env.local`)

## Project Structure

```
web/                    # Source code (Vite project)
├── src/
│   ├── main.tsx               # Production module entry (contact and Amazon-click events)
│   ├── kontakt-startseite.ts  # Accessible contact form and Web3Forms submission
│   └── lib/analytics.ts       # Existing local website events
├── public/
│   ├── wb4/                  # Homepage CSS, JS, libraries, WebP frames and product films
│   └── ...                   # Favicon, CNAME, social image and legal pages
├── plugins/legal-assets.ts   # Local fonts/logo for legal pages in dev and build
├── scripts/smoke-check.mjs   # Post-build verification
└── index.html                 # Product content, navigation and metadata

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
`web/.env.local`, on CI from the repository secret of the same name. The finished production bundle is checked for the configured key.

## Key Decisions

- **WB4 product page:** Five shared WebP sheets with 176 × 220 tiles in eight columns provide all 140 poses. The first covers frames 0, 8, …, 136, 139. The next two add the remaining even frames, the last two the odd frames. Full-resolution originals load around the current pose, with a priority request when scrolling stops. Standbilder, reduced motion and data saving use the static product view. Both films start on demand; the assembly film has portrait and landscape versions and seven chapter links.
- **Color selection and purchase:** Each color card has its own Amazon offer and review link. The offer next to the size selector follows the selected color. Both offers remain accessible without JavaScript.
- **Navigation:** Contact and color choices are directly accessible. The mobile menu contains dimensions, help and the optional motion switch. Existing fragment links include `#produkt`, `#vorteile`, `#stimmen`, `#ueber-uns` and `#kontakt`.
- **Separate preview:** The older Netlify preview remains on its separate branch. The local study, its pipeline and its internal PDF are maintained in the company repository.
- **Favicon:** ICO format (`web/public/favicon.ico`).
- **No router:** Single-page landing page. Legal pages (impressum, datenschutz, agb) are static HTML in `public/`.

## Important Files

| File | Purpose |
|---|---|
| `web/index.html` | Product story, accessible text, legal links and metadata |
| `web/public/wb4/` | Product imagery, both video formats and interactive controls |
| `web/src/kontakt-startseite.ts` | Customer contact form |
| `.github/workflows/deploy.yml` | Build + deploy pipeline |
| `web/public/favicon.ico` | Site favicon |

## Rules

- Run `npm run lint` and `npm run smoke` in `web/` before pushing
- Never edit files in `docs/` — it is git-ignored build output
- Keep `CLAUDE.md` updated when making structural changes

## Feature Overview

@features/INDEX.md
