Zeige eine strukturierte Übersicht des WEISSHEIM-Projekts:

## WEISSHEIM Projekt — Hilfe & Übersicht

### Verfügbare Slash-Commands
| Command | Beschreibung |
|---|---|
| `/deploy` | Build ausführen + Deploy-Checkliste |
| `/help` | Diese Übersicht anzeigen |

### Projektstruktur
```
web/src/
├── config/site.ts      ← Alle Konstanten, URLs, Texte
├── LandingPage.tsx     ← Hauptseite (Einstiegspunkt)
├── sections/           ← Seitenabschnitte (Hero, Features, etc.)
├── components/         ← Wiederverwendbare Komponenten
└── assets/             ← Bilder (WebP)

.claude/
├── rules/general.md    ← Git & Deploy Regeln
└── rules/frontend.md   ← React/Tailwind Coding-Regeln

features/INDEX.md       ← Feature-Status-Tracking
```

### Häufige Aufgaben
- **Inhalt ändern:** `web/src/config/site.ts` bearbeiten
- **Neuen Abschnitt:** `web/src/sections/` + in `LandingPage.tsx` einbinden
- **Deployment:** `/deploy` ausführen
- **Lokale Entwicklung:** `cd web && npm run dev`

### Wichtige Links
- Live-Site: https://weissheim.com
- GitHub Pages: Branch `main`, Ordner `docs/`
- Formulare: Web3Forms (API Key in `web/.env.local`)
