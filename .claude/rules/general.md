# Allgemeine Regeln — WEISSHEIM Projekt

## Git-Workflow

- **Branch-Strategie:** Feature-Branches von `main` abzweigen (`feature/beschreibung`)
- **Kein direkter Push auf `main`** ohne vorherigen Build-Check
- **Vor jedem Push:** `npm run build` in `web/` muss erfolgreich durchlaufen

## Commit-Konventionen

Format: `<type>: <kurze Beschreibung>` (Englisch, Kleinschreibung)

| Type | Wann |
|---|---|
| `feat` | Neue Funktionalität |
| `fix` | Bugfix |
| `refactor` | Code-Umstrukturierung ohne Funktionsänderung |
| `docs` | Nur Dokumentation |
| `style` | Nur Formatierung/Styling |
| `chore` | Build, Config, Dependencies |

Beispiele:
```
feat: add newsletter signup section
fix: correct mobile padding in hero
docs: update CLAUDE.md with new structure
chore: bump tailwind to v4
```

## Build & Deploy

1. Änderungen in `web/src/` machen
2. `cd web && npm run build` ausführen
3. Build-Output landet in `docs/` (automatisch)
4. Commit + Push auf `main` → GitHub Pages deployed automatisch

## Allgemeine Regeln

- `docs/` **niemals manuell bearbeiten** — wird vom Build überschrieben
- Keine neuen npm-Pakete ohne Absprache installieren
- Keine Änderungen an `.env.local` committen
- `CLAUDE.md` aktuell halten bei strukturellen Änderungen
- **Immer Datei lesen vor dem Bearbeiten** — niemals Inhalte aus dem Gedächtnis annehmen
- **Nach Context-Compaction:** `features/INDEX.md` und relevante Dateien neu lesen bevor weitergemacht wird
- **Handoff-Format:** Am Ende jeder Aufgabe den nächsten Schritt nennen: `"Nächster Schritt: /skillname um [Aktion]"`

## Commit-Format mit Feature-IDs

Wenn ein Feature-Ticket existiert (WEISS-X), dieses im Commit nennen:
```
feat(WEISS-7): add scroll-to-top button
fix(WEISS-4): correct form submission error handling
```
