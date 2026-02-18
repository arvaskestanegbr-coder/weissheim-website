import { Home, Package, Star } from "lucide-react";
import { Card } from "../components/ui/card";
import Reveal from "../components/Reveal";

const FEATURES = [
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
    <section id="vorteile" className="py-20 px-4 bg-slate-50">
      <div className="container mx-auto max-w-6xl">
        <Reveal className="text-center mb-16" from="up" distance={24}>
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-foreground leading-[1.05]">
              Warum WEISSHEIM?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Die perfekte Lösung für deine organisierte Wäscheverwaltung
            </p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.title} from="up" distance={24} delayMs={index * 100}>
              <Card className="p-10 hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)] hover:-translate-y-1">
                <div className="w-14 h-14 mb-6 bg-primary rounded-2xl flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
