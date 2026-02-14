import { Home, Package, Star } from "lucide-react";
import { Card } from "../ui/card";
import Reveal from "../Reveal";

export default function Features() {
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
          <Reveal from="up" distance={24} delayMs={0}>
            <Card className="p-10 hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)] hover:-translate-y-1">
              <div className="w-14 h-14 mb-6 bg-primary rounded-2xl flex items-center justify-center">
                <Home className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3 text-foreground">
                Hygienisch &amp; durchdacht
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Hochwertige, waschbare Oxford 600D Taschen für maximale Hygiene.
                Damit bleibt deine Wäsche frisch und geruchsfrei.
              </p>
            </Card>
          </Reveal>

          <Reveal from="up" distance={24} delayMs={100}>
            <Card className="p-10 hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)] hover:-translate-y-1">
              <div className="w-14 h-14 mb-6 bg-primary rounded-2xl flex items-center justify-center">
                <Package className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3 text-foreground">
                Flexible Mobilität
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Mit Rollen ausgestattet – perfekt für deinen Alltag und auch
                beim Umzug. Leicht zu bewegen.
              </p>
            </Card>
          </Reveal>

          <Reveal from="up" distance={24} delayMs={200}>
            <Card className="p-10 hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)] hover:-translate-y-1">
              <div className="w-14 h-14 mb-6 bg-primary rounded-2xl flex items-center justify-center">
                <Star className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3 text-foreground">
                Ästhetischer Stauraum
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Elegante Holzablage und Stahlrahmen – wirkt wie ein
                hochwertiges Möbelstück in deinem Zuhause.
              </p>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
