# Frontend-Regeln — WEISSHEIM Projekt

## Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** (Utility-First)
- Kein Router (Single-Page Landing Page)

## Komponenten & Struktur

- Neue Seitenabschnitte → `web/src/sections/`
- Wiederverwendbare Komponenten → `web/src/components/`
- Konfiguration & Konstanten → **ausschließlich** in `web/src/config/site.ts`
- Keine hardcodierten URLs, Texte oder Zahlen außerhalb von `site.ts`

## TypeScript

- Typen immer explizit definieren — kein `any`
- Props-Interfaces direkt über der Komponente definieren
- Funktionskomponenten bevorzugen (keine Klassen-Komponenten)

## Tailwind CSS

- Keine `style={}`-Inline-Styles — immer Tailwind-Klassen verwenden
- Responsive Design: Mobile-first (`sm:`, `md:`, `lg:`)
- Keine eigenen CSS-Klassen außer in `web/src/index.css` für globale Basis-Styles
- Dark-Mode via `dark:` Präfix wenn nötig

## Bilder & Assets

- Format: **ausschließlich WebP** für Produkt- und Lifestyle-Bilder
- Ablageort: `web/src/assets/`
- Kein Base64-Encoding von Bildern im Code

## Abhängigkeiten

- Keine neuen npm-Pakete ohne explizite Absprache
- Paketgröße immer prüfen — Landing Page soll schnell bleiben

## Qualität

- Vor Commit: `npm run lint` in `web/` ausführen
- Keine `console.log`-Statements in Production-Code
- Accessibility: `alt`-Tags für alle Bilder, semantisches HTML
