export const AMAZON_URL =
  "https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C";

export const SECTION_IDS = ["produkt", "vorteile", "ueber-uns"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export const SPECS = [
  { label: "Volumen", value: "200 Liter", icon: "📦" },
  { label: "Fächer", value: "4 abnehmbare Taschen", icon: "🗂️" },
  { label: "Material", value: "Oxford 600D", icon: "🧵" },
  { label: "Rahmen", value: "Stabiler Stahlrahmen", icon: "🔩" },
  { label: "Mobilität", value: "Mit Rollen", icon: "🛞" },
  { label: "Ablage", value: "Holz-Ablagefläche", icon: "🪵" },
] as const;

export const FEATURES = [
  "200 L Volumen – 4 abnehmbare Oxford 600D Taschen",
  "Smartes Haken-System für zeitsparende Handhabung",
  "Wäschekorb mit Rollen – mobil und flexibel",
  "Elegante Holzablage + verstärkter Stahlrahmen",
  "Waschbare Taschen – hygienisch und geruchsfrei",
  "Verfügbar in Schwarz, Beige und Himmelblau",
] as const;
