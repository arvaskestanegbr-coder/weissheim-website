# WEISS-9 — Mobiler Feinschliff und gemeinsame Aktionsleiste

Der Nutzer hat die Feinschliff-Vorschau am 23. September 2026 zur Veröffentlichung auf weissheim.com freigegeben. Die Produktionsfassung übernimmt die geprüften Oberflächenänderungen aus Vorschau-Commit `29101af` auf Basis von `2a64c6c`.

Freigegebene Vorschau: https://feinschliff--weissheim-designvorschau-2026.netlify.app/

## Gestaltung und Bedienung

- Eine gemeinsame anthrazitfarbene mobile Aktionsleiste ersetzt die drei getrennten Kästchen. Ein warmer Kaufbutton, beschrifteter Kontaktzugang und integrierter Nach-oben-Pfeil bleiben auf hellen und dunklen Abschnitten erkennbar. Alle Aktionen sind mindestens 44 px hoch; Bildschirmränder und Safe Areas werden berücksichtigt.
- Die Leiste erscheint nach dem Hero und verschwindet bei sichtbaren Kaufbuttons, Kontaktabschnitt, Footer oder geöffnetem Menü. Der bisherige freistehende Nach-oben-Button bleibt am Desktop. Im mobilen Footer gibt es einen Nach-oben-Button; der Rücksprung setzt den Tastaturfokus auf den Hauptinhalt.
- Vorteile und FAQ haben auf kleinen Displays weniger seitliche Einrückung, passendere Abstände und besser lesbaren Fließtext. Desktopabstände bleiben erhalten.
- Mobile Kontaktfelder verwenden 16 px Schrift, damit iOS Safari beim Fokussieren nicht wegen kleiner Formularschrift vergrößert. Tab aus dem mobilen Menü schließt es ohne den Fokus zurückzuziehen; Escape und Kontaktöffnung behalten den Rückfokus.
- Die Desktopnavigation verwendet am Tablet kleinere Abstände, sodass der Kaufbutton einzeilig bleibt.

## Veröffentlichung und Prüfung

Die separate Vorschau bleibt als Netlify-Draft erhalten. Ihre Build-Skripte und Noindex-Metadaten werden nicht in den Produktionsbranch übernommen. Die Live-Seite verwendet weiterhin den bestehenden GitHub-Pages-Workflow, den Canonical auf weissheim.com und die normale robots.txt/Sitemap. Rechtstexte, Kontaktversand, Produktdaten und Kaufziele bleiben unverändert.

Prüfung: ESLint, TypeScript, Produktions-Smoke-Check und gesonderter Vorschaubuild. Browserprüfung auf kleinen Mobilgeräten, Tablet und Desktop: helle/dunkle Abschnitte, sichere Abstände, Maß- und Farbwechsel, Kaufziel-Synchronisierung, FAQ, Menü-Tastaturbedienung, Kontakt-Rückfokus und Seitenabschluss. Keine Formulare versenden oder Bestellungen auslösen.

In der freigegebenen Vorschau erfolgreich geprüft: 320, 340, 390, 768 und 1440 px Ansichtsbreite; kein horizontaler Überlauf, alle drei mobilen Aktionen 44 px hoch, Kontakt-Rückfokus und Tab-Ausstieg korrekt. Netlify-Draft `6ab41f88360e9729d131deb6` bleibt separat verfügbar. Vor Veröffentlichung laufen ESLint, TypeScript und Produktions-Smoke-Checks erneut; danach werden die öffentlichen Assets und die Live-Bedienung überprüft.
