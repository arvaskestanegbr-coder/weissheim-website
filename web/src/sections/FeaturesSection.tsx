import { Home, Package, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "../components/Reveal";

const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Home,
    title: "Hygienisch & durchdacht",
    description:
      "Hochwertige, waschbare Oxford 600D Taschen für maximale Hygiene. Damit bleibt deine Wäsche frisch und geruchsfrei.",
  },
  {
    icon: Package,
    title: "Flexible Mobilität",
    description:
      "Mit Rollen ausgestattet – perfekt für deinen Alltag und auch beim Umzug. Leicht zu bewegen.",
  },
  {
    icon: Star,
    title: "Ästhetischer Stauraum",
    description:
      "Elegante Holzablage und Stahlrahmen – wirkt wie ein hochwertiges Möbelstück in deinem Zuhause.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="vorteile" className="bg-black border-b-[3px] border-black py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <Reveal className="mb-14" from="up" distance={24}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-6xl leading-none text-white">
              Warum<br />
              <span className="text-[#87CEEB]">WEISSHEIM?</span>
            </h2>
            <p className="text-sm text-white/50 max-w-xs md:text-right leading-6">
              Die perfekte Lösung für deine organisierte Wäscheverwaltung — jeden Tag.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-0 border-[3px] border-white shadow-[6px_6px_0_#87CEEB]">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.title} from="up" distance={16} delayMs={index * 80}>
              <div className={`p-8 md:p-10 group h-full ${index < FEATURES.length - 1 ? "border-b-[3px] md:border-b-0 md:border-r-[3px] border-white/20" : ""}`}>
                {/* Number + icon row */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[56px] leading-none font-bold text-white/10 select-none tabular-nums">
                    0{index + 1}
                  </span>
                  <div className="border-[3px] border-[#87CEEB] bg-[#87CEEB] p-2.5 shadow-[3px_3px_0_#fff]">
                    <feature.icon className="w-5 h-5 text-black" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-sm leading-7 text-white/55">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
