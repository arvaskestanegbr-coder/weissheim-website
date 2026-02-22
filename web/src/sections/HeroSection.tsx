import { ShoppingCart } from "lucide-react";
import Reveal from "../components/Reveal";
import { AMAZON_PRODUCT_URL, PRODUCT_COLORS } from "../config/site";
import produktWeiss from "../assets/produkt-weiss.webp";

interface HeroSectionProps {
  onAmazonClick: (source: string) => void;
}

export default function HeroSection({ onAmazonClick }: HeroSectionProps) {
  return (
    <section className="relative bg-[#FAFAF5] border-b-[3px] border-black overflow-hidden">
      {/* Decorative diagonal stripe top-right */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[420px] h-[420px] opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container relative mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: Copy */}
          <Reveal from="left" distance={40}>
            <div>
              {/* Tag */}
              <div className="mb-6 inline-block border-[3px] border-black bg-[#87CEEB] px-4 py-1 shadow-[3px_3px_0_#000]">
                <span className="text-xs font-bold uppercase tracking-widest text-black">
                  Premium Wäscheorganizer
                </span>
              </div>

              <h1 className="text-5xl md:text-[72px] leading-none mb-6 text-black">
                Wäsche<br />
                sammler<br />
                <span className="relative inline-block">
                  mit System
                  <span className="absolute -bottom-1 left-0 w-full h-[5px] bg-[#87CEEB]" />
                </span>
                .
              </h1>

              <p className="text-base md:text-lg text-black/60 mb-8 leading-7 max-w-md">
                200 Liter, 4 abnehmbare Fächer, Rollen — und eine elegante Holzablage.
                Gedacht für Haushalte, die Ordnung ernst nehmen.
              </p>

              {/* Color swatches */}
              <div className="mb-10 flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-widest text-black/40">
                  Farben
                </span>
                <div className="flex items-center gap-3">
                  {PRODUCT_COLORS.map((color) => (
                    <div key={color.name} className="flex items-center gap-1.5">
                      <span
                        className={`w-4 h-4 border-[2px] border-black inline-block ${color.bgClass}`}
                      />
                      <span className="text-xs font-medium text-black/50">{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={AMAZON_PRODUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-[3px] border-black bg-black px-8 py-4 text-sm font-bold text-[#FAFAF5] uppercase tracking-wide shadow-[5px_5px_0_#87CEEB] hover:shadow-[7px_7px_0_#87CEEB] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                  onClick={() => onAmazonClick("hero_primary")}
                  data-analytics-id="amazon-hero-primary"
                >
                  <ShoppingCart size={18} />
                  Jetzt auf Amazon
                </a>
                <a
                  href="#produkt"
                  className="inline-flex items-center justify-center gap-2 border-[3px] border-black bg-[#FAFAF5] px-8 py-4 text-sm font-bold text-black uppercase tracking-wide shadow-[5px_5px_0_#000] hover:shadow-[7px_7px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                >
                  Mehr erfahren
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right: Product in bordered frame */}
          <Reveal from="right" distance={40} delayMs={100}>
            <div className="group relative flex justify-center lg:justify-end">
              {/* Frame */}
              <div className="relative border-[3px] border-black shadow-[8px_8px_0_#000] bg-[#F0EBE0] p-6 md:p-8 max-w-[460px] w-full">
                {/* Corner label */}
                <div className="absolute -top-[3px] -left-[3px] border-[3px] border-black bg-[#87CEEB] px-3 py-0.5 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black">
                    200 L · 4 Fächer
                  </span>
                </div>
                <img
                  src={produktWeiss}
                  alt="WEISSHEIM Wäschesammler – Weiße Variante"
                  className="w-full h-auto object-contain mix-blend-multiply transform-gpu transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-2"
                  width={2000}
                  height={2500}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  sizes="(min-width: 1280px) 460px, (min-width: 1024px) 42vw, 80vw"
                />
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
