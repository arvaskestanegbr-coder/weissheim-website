import { useEffect, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../components/Reveal";
import { AMAZON_PRODUCT_URL, PRODUCT_COLORS } from "../config/site";
import produktWeiss from "../assets/produkt-weiss.webp";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onAmazonClick: (source: string) => void;
}

export default function HeroSection({ onAmazonClick }: HeroSectionProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const section = sectionRef.current;
    if (!img || !section) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(img, { y: self.progress * 60 });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FAF8F3] overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* Subtle warm texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #0A0A0A 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container relative mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28 w-full">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-0 items-center">

          {/* Left: Copy */}
          <div className="lg:pr-16">
            <Reveal from="up" distance={20} delayMs={0}>
              {/* Eyebrow */}
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px w-10 bg-[#C9B99A]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9B99A]">
                  Premium Wäscheorganizer
                </span>
              </div>
            </Reveal>

            <Reveal from="up" distance={24} delayMs={80}>
              <h1 className="text-[60px] md:text-[88px] lg:text-[96px] leading-[0.92] mb-8 text-[#0A0A0A]">
                Ordnung,<br />
                die man<br />
                <em className="not-italic text-[#0A0A0A]/30">spürt.</em>
              </h1>
            </Reveal>

            <Reveal from="up" distance={20} delayMs={160}>
              <p className="text-base md:text-lg text-[#0A0A0A]/50 mb-10 leading-7 max-w-sm font-[Space_Grotesk]">
                200 Liter, 4 abnehmbare Fächer, Rollen — und eine elegante Holzablage.
                Für Haushalte, die Ordnung ernst nehmen.
              </p>
            </Reveal>

            <Reveal from="up" distance={16} delayMs={240}>
              {/* Color swatches */}
              <div className="mb-10 flex items-center gap-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0A0A0A]/30">
                  Farben
                </span>
                <div className="flex items-center gap-4">
                  {PRODUCT_COLORS.map((color) => (
                    <div key={color.name} className="flex items-center gap-2">
                      <span
                        className={`w-3.5 h-3.5 rounded-full ring-1 ring-black/10 ${color.bgClass}`}
                      />
                      <span className="text-[11px] text-[#0A0A0A]/40 font-medium">{color.name}</span>
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
                  className="inline-flex items-center justify-center gap-2.5 bg-[#0A0A0A] text-[#FAF8F3] px-8 py-4 text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#0A0A0A]/80"
                  onClick={() => onAmazonClick("hero_primary")}
                  data-analytics-id="amazon-hero-primary"
                >
                  <ShoppingCart size={15} />
                  Jetzt auf Amazon
                </a>
                <a
                  href="#produkt"
                  className="inline-flex items-center justify-center gap-2 border border-[#0A0A0A]/20 text-[#0A0A0A]/60 px-8 py-4 text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 hover:border-[#0A0A0A]/50 hover:text-[#0A0A0A]"
                >
                  Mehr erfahren
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: Product — editorial float, no frame */}
          <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
            {/* Warm wash behind product */}
            <div className="absolute inset-0 bg-[#F0EBE3] rounded-full scale-[0.75] blur-3xl opacity-60" />
            <img
              ref={imgRef}
              src={produktWeiss}
              alt="WEISSHEIM Wäschesammler"
              className="relative z-10 w-full max-w-[420px] lg:max-w-[480px] h-auto object-contain mix-blend-multiply will-change-transform"
              width={2000}
              height={2500}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="(min-width: 1280px) 480px, (min-width: 1024px) 42vw, 80vw"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
