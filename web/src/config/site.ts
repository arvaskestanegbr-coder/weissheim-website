export const AMAZON_PRODUCT_URL =
  "https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C";

export const SECTION_IDS = ["produkt", "vorteile", "ueber-uns"] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const NAV_ITEMS: Array<{ id: SectionId; label: string }> = [
  { id: "produkt", label: "Produkt" },
  { id: "vorteile", label: "Vorteile" },
  { id: "ueber-uns", label: "Details" },
];

export const PRODUCT_BENEFITS = [
  "200 L Volumen – 4 abnehmbare Oxford 600D Taschen",
  "Smartes Haken-System für zeitsparende Handhabung",
  "Wäschekorb mit Rollen – mobil und flexibel",
  "Elegante Holzablage + verstärkter Stahlrahmen",
  "Waschbare Taschen – hygienisch und geruchsfrei",
  "Verfügbar in Schwarz, Beige und Himmelblau",
];

export const SPECS = [
  { label: "Volumen", value: "200 Liter", icon: "Package" },
  { label: "Fächer", value: "4 abnehmbare Taschen", icon: "LayoutGrid" },
  { label: "Material", value: "Oxford 600D", icon: "Layers" },
  { label: "Rahmen", value: "Stabiler Stahlrahmen", icon: "Wrench" },
  { label: "Mobilität", value: "Mit Rollen", icon: "Disc3" },
  { label: "Ablage", value: "Holz-Ablagefläche", icon: "PanelTop" },
];

export const PRODUCT_COLORS = [
  { name: "Himmelblau", bgClass: "bg-[#87CEEB]" },
  { name: "Beige", bgClass: "bg-[#C8B99A]" },
  { name: "Schwarz", bgClass: "bg-[#1C1C1E]" },
];

export const HERO_HIGHLIGHTS = ["200 L Volumen", "4 Fächer", "Mit Rollen"];

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
      "Du kannst zwischen drei Farben wählen: Himmelblau, Beige und Schwarz. Alle Varianten sind auf Amazon verfügbar.",
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
