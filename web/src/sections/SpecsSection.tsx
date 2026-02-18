import { Card } from "../components/ui/card";
import Reveal from "../components/Reveal";
import { SPECS } from "../config/site";

export default function SpecsSection() {
  return (
    <section id="ueber-uns" className="py-20 px-4 bg-slate-50">
      <div className="container mx-auto max-w-6xl">
        <Reveal className="text-center mb-16" from="up" distance={24}>
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-foreground leading-[1.05]">
              Technische Details
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Hochwertige Materialien und durchdachte Konstruktion für deinen Alltag
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECS.map((spec, index) => (
            <Reveal key={spec.label} from="up" distance={24} delayMs={index * 80}>
              <Card className="p-6 hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)] hover:-translate-y-1">
                <div className="text-2xl mb-4">{spec.icon}</div>
                <p className="text-xs text-muted-foreground mb-1">{spec.label}</p>
                <p className="text-sm font-medium text-foreground">{spec.value}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
