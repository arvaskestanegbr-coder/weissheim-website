Führe die folgende Deploy-Checkliste für das WEISSHEIM-Projekt durch und berichte über jeden Schritt:

## Deploy-Checkliste

1. **Build ausführen**
   ```bash
   cd web && npm run build
   ```
   Prüfe ob der Build erfolgreich war (kein Fehler, `docs/` wurde aktualisiert).

2. **Smoke-Check**
   Prüfe ob `docs/index.html` existiert und nicht leer ist.

3. **Git-Status prüfen**
   Zeige welche Dateien geändert wurden (`git status` + `git diff --stat`).

4. **Zusammenfassung**
   Berichte:
   - Build erfolgreich? Ja/Nein
   - Welche Dateien wurden geändert?
   - Nächste Schritte: `git add`, `git commit`, `git push`

> Nach dem Push auf `main` deployed GitHub Pages automatisch auf weissheim.com (dauert ~1-2 Minuten).
