Führe die folgende Deploy-Checkliste für das WEISSHEIM-Projekt durch und berichte über jeden Schritt:

## Deploy-Checkliste

Gebaut und veröffentlicht wird von GitHub Actions ([.github/workflows/deploy.yml](../../../.github/workflows/deploy.yml)).
Der Build-Output `docs/` ist **nicht** versioniert — lokal bauen dient nur der Kontrolle vor dem Push.

1. **Lokal prüfen**
   ```bash
   cd web && npm run lint && npm run smoke
   ```
   `smoke` baut selbst und prüft danach das Ergebnis, unter anderem ob der
   Web3Forms-Key im Bundle gelandet ist. Rot = nicht pushen.

2. **Git-Status prüfen**
   `git status` + `git diff --stat`. In `docs/` darf nichts auftauchen
   (ist in `.gitignore`).

3. **Push auf `main`**
   Löst den Workflow aus. Auf den Ausgang warten:
   ```bash
   gh run watch --exit-status
   ```
   Beide Jobs (`build`, `deploy`) müssen grün sein.

4. **Live verifizieren — in dieser Reihenfolge**

   Niemals die Asset-URL abfragen, bevor der Workflow fertig ist: Cloudflare
   cached eine 404 für vier Stunden und legt damit die Seite lahm.

   ```bash
   ASSET=$(curl -s https://weissheim.com/ | grep -o 'assets/index-[A-Za-z0-9_-]*\.js' | head -1)
   curl -s -o /dev/null -w "origin=%{http_code}\n" "https://weissheim.com/$ASSET?cb=$RANDOM"   # zuerst
   curl -s -o /dev/null -w "cdn=%{http_code}\n"    "https://weissheim.com/$ASSET"              # erst danach
   ```

5. **Zusammenfassung**
   Berichte: Lint/Smoke grün? Workflow-Status? Live erreichbar?
   Bei Fehlschlag: `gh run view --log-failed`.

> Deployt wird ausschließlich über den Workflow. Die alte Variante
> (`docs/` committen, Pages serviert aus dem Branch) gilt nicht mehr.
