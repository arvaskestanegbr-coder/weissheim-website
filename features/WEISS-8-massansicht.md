# WEISS-8 — Produkt-/Maßansicht im bestehenden Design

Die am 23. September 2026 freigegebene Funktionsvorschau wird auf der normalen Startseite von weissheim.com aktiviert. Die separate große Designstudie bleibt unveröffentlicht auf der Produktionsdomain.

## Verhalten

- Im Hero wechselt „Produkt / Maße“ zwischen Foto und illustrativen Maßlinien: H 144,5 × B 70 × T 30 cm. Die Bild- und Beschriftungsflächen bleiben beim Umschalten gleich groß; Tastaturbedienung, Screenreader und reduzierte Bewegung werden unterstützt.
- Beige/Schwarz steuert beide Produktbilder und alle Kaufbuttons. Verifizierte Amazon-Varianten mit vier Taschen: Beige `B0F3YS8JHV`, Schwarz `B0F3ZBN75C`.
- Der Hover-Effekt hat keinen hellen rechteckigen Hintergrund. Die mobile Navigation überlagert die Seite, damit Sprungziele ihre Position behalten.
- Die kompakte mobile Kaufleiste erscheint erst nach dem Hero. Sie verschwindet bei sichtbaren Kaufbuttons, Kontaktabschnitt, Footer oder geöffnetem Menü.
- Die Bewertungsanzeige zeigt 4,7 / 44 Bewertungen (manueller Stand: 23. September 2026); der Link öffnet alle Rezensionen ohne Sternefilter.
- Impressum, Datenschutz und AGB übernehmen Schriften, Logo und Farben der Hauptseite. Die Rechtstexte bleiben unverändert.

## Umsetzung

Die Farbauswahl liegt in `LandingPage.tsx`; `AMAZON_PRODUCT_URLS` und `PRODUCT_IMAGE_VIEWER_CONTENT` sind in `config/site.ts` zentralisiert. `ProductImageViewer.tsx` verwaltet nur den lokalen Ansichtsmodus. `public/legal.css` gestaltet die Rechteseiten; `plugins/legal-assets.ts` liefert die vorhandenen lokalen Schrift- und Logoquellen im Dev-Server und im Produktionsbuild aus.

Der Produktionsstand enthält keine Vorschau-Schalter, Netlify-Metadaten, Noindex-Regeln der Vorschau oder Komponenten/Bilder der großen Designstudie. Canonical, CNAME und Sitemap bleiben auf weissheim.com ausgerichtet. Veröffentlichung ausschließlich über den bestehenden GitHub-Actions-Workflow.

## Prüfung

Lint, TypeScript und Build-/Smoke-Checks; Browserkontrolle von Hover, Ansichts- und Farbwechseln, farbabhängigen Kaufzielen, mobilen Abschnittssprüngen, Kontaktfokus, FAQ und Rechteseiten. Keine Testnachrichten oder Bestellungen versenden. Nach erfolgreichem Workflow zuerst Assets mit Cache-Buster und anschließend regulär abrufen, dann die Live-Bedienung kontrollieren.
