# WEISS-10 — Kundenstimmen aus Amazon-Rezensionen

Neuer Abschnitt „Echte Stimmen.“ direkt nach „Warum WEISSHEIM?“ (`web/src/sections/ReviewsSection.tsx`, Inhalte in `CUSTOMER_REVIEWS` und `REVIEWS_CONTENT` in `web/src/config/site.ts`).

## Auswahl (16. Oktober 2026)

Drei 5-Sterne-Rezensionen mit „Verifizierter Kauf“, alle 4-Taschen-Variante, von Attila freigegeben:

| Autor | Variante | Datum | Amazon-ID |
|---|---|---|---|
| Johanna H. | Beige, 4 Taschen | 2. September 2026 | R959SNGRQHD3I |
| Steffi | Schwarz, 4 Taschen | 9. September 2026 | R2XC8KW4X3PJOK |
| didik | Beige, 4 Taschen | 18. August 2026 | RY8M5SFC19Z94 |

## Regeln

- Auszüge wörtlich übernehmen, Kürzungen nur mit „…“, nichts umformulieren.
- Nur Rezensionen mit „Verifizierter Kauf“. Der Hinweis zur Herkunft unter den Karten erfüllt die Informationspflicht aus § 5b Abs. 3 UWG.
- Keine Rezensionen von Angehörigen oder Bekannten des Verkäufers.
- Eine Karte mit leerem `quote` wird nicht angezeigt; ohne Auszüge bleibt der ganze Abschnitt ausgeblendet.
- Gesamtwertung (`AMAZON_RATING`) bleibt neben den Auszügen sichtbar, damit die Auswahl nicht geschönt wirkt.

## Links

Amazon leitet `/product-reviews/…` und `/gp/customer-reviews/…` für nicht angemeldete Besucher auf die Anmeldeseite um (geprüft am 16. Oktober 2026). Alle Bewertungslinks, auch der im Hero, zeigen deshalb auf die öffentliche Produktseite mit `#customerReviews`; dort stehen alle drei Rezensionen.
