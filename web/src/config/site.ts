export const AMAZON_PRODUCT_URL =
  "https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C";

// Verified color variants, both with four bags.
export const AMAZON_PRODUCT_URLS = {
  Beige: "https://www.amazon.de/dp/B0F3YS8JHV?th=1",
  Schwarz: "https://www.amazon.de/dp/B0F3ZBN75C?th=1",
} as const;

export type ProductColor = keyof typeof AMAZON_PRODUCT_URLS;

export const SECTION_IDS = ["vorteile", "produkt", "ueber-uns", "kontakt"] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const NAV_ITEMS: Array<{ id: SectionId; label: string }> = [
  { id: "vorteile", label: "Vorteile" },
  { id: "produkt", label: "Produkt" },
  { id: "ueber-uns", label: "Details" },
];

export const PRODUCT_BENEFITS = [
  "200 L Volumen – 4 abnehmbare Oxford 600D Taschen",
  "Smartes Haken-System für zeitsparende Handhabung",
  "Wäschekorb mit Rollen – mobil und flexibel",
  "Elegante Holzablage + verstärkter Stahlrahmen",
  "Waschbare Taschen – hygienisch und geruchsfrei",
  "Verfügbar in Schwarz und Beige",
];

export const HERO_STATS = [
  { number: "200", unit: "Liter", label: "Volumen", icon: "Package" },
  { number: "4", unit: "Fächer", label: "Abnehmbare Taschen", icon: "LayoutGrid" },
];

export const SPECS = [
  { label: "Material", value: "Oxford 600D", desc: "Hochdichtes, reißfestes Polyester", icon: "Layers" },
  { label: "Rahmen", value: "Stabiler Stahlrahmen", desc: "Pulverbeschichtet & rostgeschützt", icon: "Wrench" },
  { label: "Mobilität", value: "Mit Rollen", desc: "360° drehbar, mit Bremse", icon: "Disc3" },
  { label: "Ablage", value: "Holz-Ablagefläche", desc: "Holzplatte als zusätzliche Ablage", icon: "PanelTop" },
];

export const PRODUCT_COLORS = [
  { name: "Beige", bgClass: "bg-[#C8B99A]", alt: "WEISSHEIM Wäschesortierer mit vier beigen Taschen und Holzablage" },
  { name: "Schwarz", bgClass: "bg-[#1C1C1E]", alt: "WEISSHEIM Wäschesortierer mit vier schwarzen Taschen und Holzablage" },
] as const;

export const HERO_HIGHLIGHTS = ["200 L Volumen", "4 Fächer", "Mit Rollen"];

export const HERO_ROTATING_WORDS = ["spürt.", "liebt.", "sieht.", "lebt."];

// Produktseite statt /product-reviews/: Amazon verlangt dort inzwischen einen Login.
export const AMAZON_REVIEWS_URL = "https://www.amazon.de/dp/B0F3YS8JHV?th=1#customerReviews";

export const AMAZON_RATING = {
  stars: 4.5,
  count: 37,
  label: "Amazon Bewertungen",
  asOf: "Stand: 16. Oktober 2026",
};

export interface CustomerReview {
  author: string;
  stars: number;
  date: string;
  variant: string;
  /** Unveränderter Auszug aus der Rezension. Leer = Karte wird nicht angezeigt. */
  quote: string;
  url: string;
}

/**
 * Nur echte Rezensionen mit „Verifizierter Kauf“. Auszüge wörtlich übernehmen,
 * Kürzungen nur mit „…“ markieren, nichts umformulieren (UWG § 5b Abs. 3).
 */
export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    author: "Johanna H.",
    stars: 5,
    date: "2. September 2026",
    variant: "Beige, 4 Taschen",
    quote:
      "Ist nun schon ein halbes Jahr in gebrauch und hilft mir, mein wäschechaos im Zaum zu halten. Wir sind eine vierköpfige Familie.",
    url: AMAZON_REVIEWS_URL,
  },
  {
    author: "Steffi",
    stars: 5,
    date: "9. September 2026",
    variant: "Schwarz, 4 Taschen",
    quote:
      "Viele Besucher die es bei mir gesehen haben waren begeistert und wollen es sich auch anschaffen, da es viel stauraum hat aber nur wenig Platz einnimmt. Perfekt für kleinere HWR.",
    url: AMAZON_REVIEWS_URL,
  },
  {
    author: "didik",
    stars: 5,
    date: "18. August 2026",
    variant: "Beige, 4 Taschen",
    quote:
      "Gut ist auch das obere Ablagebrett. Macht das ganze noch stabiler.",
    url: AMAZON_REVIEWS_URL,
  },
];

export const REVIEWS_CONTENT = {
  eyebrow: "Kundenstimmen",
  headingTop: "Echte",
  headingEmphasis: "Stimmen.",
  intro: "Was Käuferinnen und Käufer auf Amazon über ihren WEISSHEIM schreiben.",
  verifiedLabel: "Verifizierter Kauf",
  readMoreLabel: "Ganze Rezension auf Amazon",
  allReviewsLabel: "Alle Bewertungen auf Amazon lesen",
  sourceNote:
    "Wir zeigen ausschließlich Rezensionen mit dem Amazon-Kennzeichen „Verifizierter Kauf“. Damit bestätigt Amazon, dass die Person das Produkt dort gekauft hat. Die Auszüge sind wörtlich übernommen.",
} as const;

export const FAQS: Array<{ question: string; answer: string }> = [
  {
    question: "Wie lange dauert die Lieferung?",
    answer:
      "Wir versenden über Amazon Prime aus Berlin. Deutschlandweit bekommst du deine Bestellung in der Regel innerhalb von 1–3 Werktagen.",
  },
  {
    question: "Welche Maße hat der Wäschesortierer?",
    answer:
      "Der WEISSHEIM Wäschesortierer hat eine Höhe von 144,5 cm, eine Breite von 70 cm und eine Tiefe von 30 cm – kompakt genug für jede Ecke, groß genug für den ganzen Haushalt.",
  },
  {
    question: "In welchen Farben ist er erhältlich?",
    answer:
      "Du kannst zwischen zwei Farben wählen: Beige und Schwarz. Beide Varianten sind auf Amazon verfügbar.",
  },
  {
    question: "Wie lange gilt das Rückgaberecht?",
    answer:
      "Wir gewähren dir freiwillig 30 Tage Rückgaberecht – doppelt so lang wie gesetzlich vorgeschrieben. Deine Zufriedenheit hat für uns oberste Priorität.",
  },
  {
    question: "Wie reinige ich die Taschen?",
    answer:
      "Ganz einfach: Haken aus den Schlaufen entnehmen, Bodenplatte herausnehmen, Tasche in die Waschmaschine oder per Hand waschen. Das Oxford 600D-Material ist hochdichtes, reißfestes Polyester mit wasserabweisender PU-Beschichtung – robust, leicht und pflegeleicht.",
  },
];

/** Rechteinhaber im Footer. Das Jahr wird zur Laufzeit ergänzt. */
export const COPYRIGHT_HOLDER = "WEISSHEIM. Alle Rechte vorbehalten.";

export const MOBILE_ACTIONS_CONTENT = {
  label: "Schnellzugriff",
  buyLabel: "Jetzt kaufen",
  contactLabel: "Fragen",
  contactAccessibleLabel: "Fragen? Kontakt öffnen",
  backToTopLabel: "Nach oben",
  backToTopAccessibleLabel: "Nach oben scrollen",
} as const;

export const PRODUCT_IMAGE_VIEWER_CONTENT = {
  controlsLabel: "Produktansicht wählen",
  productLabel: "Produkt",
  dimensionsLabel: "Maße",
  heightLabel: "144,5 cm",
  widthLabel: "70 cm",
  depthLabel: "30 cm",
  dimensionsSummary: "H 144,5 × B 70 × T 30 cm",
  dimensionsNote: "Illustrative Maßlinien, nicht maßstabsgetreu.",
  dimensionsAnnouncement:
    "Produktmaße: Höhe 144,5 Zentimeter, Breite 70 Zentimeter, Tiefe 30 Zentimeter. Die Maßlinien dienen zur Orientierung und sind nicht maßstabsgetreu.",
} as const;
