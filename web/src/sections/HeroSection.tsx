import { ShoppingCart } from "lucide-react";
import { Button } from "../components/ui/button";
import Reveal from "../components/Reveal";
import { AMAZON_PRODUCT_URL, HERO_HIGHLIGHTS, PRODUCT_COLORS } from "../config/site";
import produktSchwarz from "../assets/produkt-schwarz.webp";

interface HeroSectionProps {
  onAmazonClick: (source: string) => void;
}

export default function HeroSection({ onAmazonClick }: HeroSectionProps) {
  return (
    <section className="pt-16 md:pt-36 pb-20 md:pb-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24 items-center">
          <Reveal from="left" distance={30}>
            <div className="max-w-xl">
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 text-foreground leading-[1.05]">
                Wäschesammler mit System
              </h1>

              <div className="mb-6 flex flex-wrap gap-2">
                {HERO_HIGHLIGHTS.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              <div className="mb-8 flex items-center gap-3">
                <span className="text-xs text-muted-foreground">Farbe:</span>
                <div className="flex items-center gap-3">
                  {PRODUCT_COLORS.map((color) => (
                    <div key={color.name} className="flex items-center gap-1.5">
                      <span
                        className={`w-4 h-4 rounded-full ring-1 ring-slate-200 inline-block ${color.bgClass}`}
                      />
                      <span className="text-xs text-slate-600">{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-7 md:leading-8">
                Hol dir den WEISSHEIM Wäschesammler mit 4 Fächern – 200 L Volumen und
                abnehmbaren Taschen. Mit Rollen für maximale Flexibilität in deinem Alltag.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg w-full sm:w-auto" asChild>
                  <a
                    href={AMAZON_PRODUCT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2"
                    onClick={() => onAmazonClick("hero_primary")}
                    data-analytics-id="amazon-hero-primary"
                  >
                    <ShoppingCart size={20} />
                    Zu Amazon
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="text-lg w-full sm:w-auto" asChild>
                  <a href="#produkt">Mehr erfahren</a>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal from="right" distance={30} delayMs={150}>
            <div className="group relative mt-10 lg:mt-0 flex justify-center lg:justify-end bg-transparent border-0 ring-0 outline-none shadow-none overflow-visible before:content-[''] before:pointer-events-none before:absolute before:inset-[-16%] before:rounded-[999px] before:bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.18),transparent_62%)] before:blur-3xl before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100">
              <img
                src={produktSchwarz}
                alt="WEISSHEIM Wäschesammler – Schwarze Variante"
                className="relative z-10 w-full max-w-[620px] h-auto transform-gpu transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-2 group-hover:scale-[1.03]"
                width={2000}
                height={2500}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sizes="(min-width: 1280px) 620px, (min-width: 1024px) 45vw, 92vw"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
