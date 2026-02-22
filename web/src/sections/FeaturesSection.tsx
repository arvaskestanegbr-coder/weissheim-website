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
    <section id="vorteile" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <Reveal className="mb-16" from="up" distance={24}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.05] max-w-xs">
              Warum WEISSHEIM?
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs md:text-right leading-6">
              Die perfekte Lösung für deine organisierte Wäscheverwaltung — jeden Tag.
            </p>
          </div>
        </Reveal>

        <div className="border-t border-slate-100">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.title} from="up" distance={16} delayMs={index * 80}>
              <div className="flex items-start gap-8 md:gap-16 py-8 md:py-10 border-b border-slate-100">
                {/* Big number */}
                <span className="text-[56px] md:text-[72px] leading-none font-bold text-slate-100 select-none tabular-nums flex-shrink-0 pt-1">
                  0{index + 1}
                </span>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EBF6FD] flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-4 h-4 text-[#2B90C8]" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base leading-7 text-muted-foreground max-w-lg">
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
