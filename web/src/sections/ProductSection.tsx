import { ShoppingCart } from "lucide-react";
import Reveal from "../components/Reveal";
import { AMAZON_PRODUCT_URL, PRODUCT_BENEFITS } from "../config/site";
import produktWeiss from "../assets/produkt-weiss.webp";

interface ProductSectionProps {
  onAmazonClick: (source: string) => void;
}

export default function ProductSection({ onAmazonClick }: ProductSectionProps) {
  return (
    <section id="produkt" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Image */}
          <Reveal from="left" distance={30}>
            <div className="group relative flex justify-center">
              {/* Warm beige bg behind white product — creates subtle framing */}
              <div className="absolute inset-8 rounded-3xl bg-[#F5F0E8]" />
              <img
                src={produktWeiss}
                alt="WEISSHEIM Wäschesammler – Weiße Variante"
                className="relative z-10 w-full max-w-[480px] h-auto object-contain mix-blend-multiply transform-gpu transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-2 group-hover:scale-[1.02]"
                width={2000}
                height={2500}
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1280px) 480px, (min-width: 768px) 42vw, 88vw"
              />
            </div>
          </Reveal>

          {/* Content */}
          <Reveal from="right" distance={30} delayMs={150}>
            <div>
              {/* Eyebrow */}
              <div className="mb-4 inline-flex items-center gap-2">
                <span className="h-px w-8 bg-[#87CEEB]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#2B90C8]">
                  Das Produkt
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground leading-[1.1]">
                WEISSHEIM Wäschesammler mit System
              </h2>

              <p className="text-sm md:text-base text-muted-foreground mb-8 leading-7">
                Mit 4 Fächern und großzügigen 200 L Volumen kombinierst du smartes
                Sortieren mit elegantem Design. Dank Haken-System und abnehmbaren
                Oxford 600D Taschen wird deine Wäscheverwaltung stressfrei.
              </p>

              {/* Benefits list — Himmelblau left border accent */}
              <div className="space-y-3 mb-10">
                {PRODUCT_BENEFITS.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 border-l-2 border-[#87CEEB] pl-4 py-0.5"
                  >
                    <span className="text-sm text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <a
                href={AMAZON_PRODUCT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-semibold text-background transition-all hover:bg-foreground/80 active:scale-[0.98]"
                onClick={() => onAmazonClick("product_section")}
                data-analytics-id="amazon-product-section"
              >
                <ShoppingCart size={16} />
                Jetzt auf Amazon kaufen
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
