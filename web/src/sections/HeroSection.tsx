import { ShoppingCart } from "lucide-react";
import Reveal from "../components/Reveal";
import { AMAZON_PRODUCT_URL, HERO_HIGHLIGHTS, PRODUCT_COLORS } from "../config/site";
import produktTransparent from "../assets/produkt-schwarz-transparent.webp";

interface HeroSectionProps {
  onAmazonClick: (source: string) => void;
}

export default function HeroSection({ onAmazonClick }: HeroSectionProps) {
  return (
    <section className="relative pt-16 md:pt-36 pb-20 md:pb-32 px-4 bg-[#0C1628] overflow-hidden">
      {/* Subtle grid texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Himmelblau ambient glow top-right */}
      <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(135,206,235,0.12),transparent_70%)] blur-3xl" />

      <div className="container relative mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <Reveal from="left" distance={40}>
            <div className="max-w-xl">
              {/* Eyebrow */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#87CEEB]/30 bg-[#87CEEB]/10 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#87CEEB]" />
                <span className="text-xs font-medium tracking-widest text-[#87CEEB] uppercase">
                  Premium Wäscheorganizer
                </span>
              </div>

              <h1 className="text-5xl md:text-[68px] font-bold tracking-tight mb-6 text-white leading-[1.02]">
                Wäschesammler<br />
                <span className="text-[#87CEEB]">mit System.</span>
              </h1>

              {/* Highlights */}
              <div className="mb-6 flex flex-wrap gap-2">
                {HERO_HIGHLIGHTS.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium text-white/70"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              {/* Color swatches */}
              <div className="mb-8 flex items-center gap-3">
                <span className="text-xs text-white/40 uppercase tracking-wider">Farbe</span>
                <div className="flex items-center gap-4">
                  {PRODUCT_COLORS.map((color) => (
                    <div key={color.name} className="flex items-center gap-1.5">
                      <span
                        className={`w-3.5 h-3.5 rounded-full ring-1 ring-white/20 inline-block ${color.bgClass}`}
                      />
                      <span className="text-xs text-white/50">{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-base md:text-lg text-white/60 mb-10 leading-7">
                200 Liter, 4 abnehmbare Fächer, Rollen — und eine elegante Holzablage.
                Gedacht für Haushalte, die Ordnung ernst nehmen.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={AMAZON_PRODUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#87CEEB] px-8 py-3.5 text-sm font-semibold text-[#0C1628] transition-all hover:bg-[#A8DCF0] hover:shadow-[0_0_40px_rgba(135,206,235,0.3)] active:scale-[0.98]"
                  onClick={() => onAmazonClick("hero_primary")}
                  data-analytics-id="amazon-hero-primary"
                >
                  <ShoppingCart size={16} />
                  Jetzt auf Amazon kaufen
                </a>
                <a
                  href="#produkt"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-medium text-white/70 transition-all hover:border-white/40 hover:text-white hover:bg-white/5"
                >
                  Mehr erfahren
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right: Product image (transparent, floats freely) */}
          <Reveal from="right" distance={40} delayMs={150}>
            <div className="group relative mt-8 lg:mt-0 flex justify-center lg:justify-end">
              {/* Himmelblau product glow */}
              <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-[radial-gradient(ellipse_at_center,rgba(135,206,235,0.25),transparent_70%)] blur-2xl" />
              <img
                src={produktTransparent}
                alt="WEISSHEIM Wäschesammler – Schwarze Variante"
                className="relative z-10 w-full max-w-[520px] h-auto transform-gpu transition-transform duration-700 ease-out will-change-transform group-hover:-translate-y-3 group-hover:scale-[1.02] drop-shadow-[0_40px_60px_rgba(0,0,0,0.5)]"
                width={2000}
                height={2500}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, 80vw"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
