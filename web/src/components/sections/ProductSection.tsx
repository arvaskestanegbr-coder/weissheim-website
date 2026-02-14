import { Check, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import Reveal from "../Reveal";
import produktWeiss from "../../assets/produkt-weiss.webp";
import { AMAZON_URL, FEATURES } from "../../constants";

export default function ProductSection() {
  return (
    <section id="produkt" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
          <Reveal from="left" distance={30}>
            <div className="group relative flex justify-center bg-transparent border-0 ring-0 outline-none shadow-none overflow-visible before:content-[''] before:pointer-events-none before:absolute before:inset-[-16%] before:rounded-[999px] before:bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.18),transparent_62%)] before:blur-3xl before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100">
              <img
                src={produktWeiss}
                alt="WEISSHEIM Wäschesammler – Weiße Variante"
                className="relative z-10 w-full max-w-[560px] h-auto object-contain transform-gpu transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-2 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal from="right" distance={30} delayMs={150}>
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground leading-[1.05]">
                WEISSHEIM Wäschesammler mit System
              </h2>

              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-7 md:leading-8">
                Mit dem WEISSHEIM Wäschesammler mit 4 Fächern und großzügigen
                200 L Volumen kombinierst du smartes Sortieren mit elegantem
                Design. Dank Haken-System und abnehmbaren Oxford 600D Taschen
                wird deine Wäscheverwaltung stressfrei und effizient.
              </p>

              <div className="space-y-4 mb-10">
                {FEATURES.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                  >
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-primary-foreground" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" asChild>
                <a
                  href={AMAZON_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Jetzt auf Amazon kaufen
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
