import Reveal from "../components/Reveal";

const FEATURES = [
  {
    number: "01",
    title: "Hygienisch & durchdacht",
    description:
      "Hochwertige, waschbare Oxford 600D Taschen für maximale Hygiene. Damit bleibt deine Wäsche frisch und geruchsfrei.",
  },
  {
    number: "02",
    title: "Flexible Mobilität",
    description:
      "Mit Rollen ausgestattet – perfekt für deinen Alltag und auch beim Umzug. Leicht zu bewegen, wo du es brauchst.",
  },
  {
    number: "03",
    title: "Ästhetischer Stauraum",
    description:
      "Elegante Holzablage und Stahlrahmen – wirkt wie ein hochwertiges Möbelstück, nicht wie ein Wäschesortierer.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="vorteile" className="bg-[#0A0A0A] py-24 md:py-32 px-5 md:px-8">
      <div className="container mx-auto max-w-5xl">

        <Reveal className="mb-20" from="up" distance={20}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-4xl md:text-6xl text-[#FAF8F3] leading-[1.0]">
              Warum<br />
              <em>WEISSHEIM?</em>
            </h2>
            <p className="text-sm text-[#FAF8F3]/35 max-w-56 md:text-right leading-6 font-[Space_Grotesk]">
              Die perfekte Lösung für deine organisierte Wäscheverwaltung.
            </p>
          </div>
        </Reveal>

        <div>
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.number} from="up" distance={16} delayMs={index * 60}>
              <div className={`flex gap-8 md:gap-16 py-10 ${index < FEATURES.length - 1 ? "border-b border-[#FAF8F3]/8" : ""}`}>
                {/* Number */}
                <span className="text-[13px] font-semibold text-[#C9B99A] tracking-[0.15em] tabular-nums flex-shrink-0 pt-1.5 font-[Space_Grotesk]">
                  {feature.number}
                </span>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl text-[#FAF8F3] mb-4 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[15px] leading-7 text-[#FAF8F3]/40 max-w-lg font-[Space_Grotesk]">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
