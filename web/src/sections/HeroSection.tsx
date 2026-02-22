import { useEffect, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../components/MagneticButton";
import { AMAZON_PRODUCT_URL, PRODUCT_COLORS } from "../config/site";
import produktWeiss from "../assets/produkt-weiss.webp";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onAmazonClick: (source: string) => void;
}

export default function HeroSection({ onAmazonClick }: HeroSectionProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Parallax: product image scrolls slower than page
  useEffect(() => {
    const img = imgRef.current;
    const section = sectionRef.current;
    if (!img || !section) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        gsap.set(img, { y: self.progress * 55 });
      },
    });
    return () => st.kill();
  }, []);

  // Stagger entrance animation for hero text
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    if (eyebrowRef.current) {
      tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
    }

    if (headlineRef.current) {
      // Animate each line individually
      const lines = headlineRef.current.querySelectorAll(".hero-line");
      tl.fromTo(lines,
        { opacity: 0, y: 32, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power3.out", stagger: 0.12 },
        "-=0.4"
      );
    }

    if (subtextRef.current) {
      tl.fromTo(subtextRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.5"
      );
    }

    if (ctaRef.current) {
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.45"
      );
    }

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FAF8F3] overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* Subtle warm dot texture */}
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
            {/* Eyebrow — animated separately */}
            <div ref={eyebrowRef} className="mb-8 flex items-center gap-3" style={{ opacity: 0 }}>
              <span className="h-px w-10 bg-[#C9B99A]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9B99A]">
                Premium Wäscheorganizer
              </span>
            </div>

            {/* Headline — each line animates individually */}
            <h1
              ref={headlineRef}
              className="text-[60px] md:text-[88px] lg:text-[96px] leading-[0.92] mb-8 text-[#0A0A0A] overflow-hidden"
            >
              <span className="hero-line block">Ordnung,</span>
              <span className="hero-line block">die man</span>
              <em className="hero-line block not-italic text-[#0A0A0A]/30">spürt.</em>
            </h1>

            <p
              ref={subtextRef}
              className="text-base md:text-lg text-[#0A0A0A]/50 mb-10 leading-7 max-w-sm font-[Space_Grotesk]"
              style={{ opacity: 0 }}
            >
              200 Liter, 4 abnehmbare Fächer, Rollen — und eine elegante Holzablage.
              Für Haushalte, die Ordnung ernst nehmen.
            </p>

            <div ref={ctaRef} style={{ opacity: 0 }}>
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

              {/* CTAs — Magnetic buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton
                  as="a"
                  href={AMAZON_PRODUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#0A0A0A] text-[#FAF8F3] px-8 py-4 text-[13px] font-semibold tracking-wider uppercase transition-colors duration-300 hover:bg-[#0A0A0A]/80"
                  onClick={() => onAmazonClick("hero_primary")}
                  data-analytics-id="amazon-hero-primary"
                  strength={0.25}
                >
                  <ShoppingCart size={15} />
                  Jetzt auf Amazon
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="#produkt"
                  className="inline-flex items-center justify-center gap-2 border border-[#0A0A0A]/20 text-[#0A0A0A]/60 px-8 py-4 text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 hover:border-[#0A0A0A]/50 hover:text-[#0A0A0A]"
                  strength={0.2}
                >
                  Mehr erfahren
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right: Product — editorial float, parallax via GSAP */}
          <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
            <div className="absolute inset-0 bg-[#F0EBE3] rounded-full scale-[0.75] blur-3xl opacity-60" />
            <img
              ref={imgRef}
              src={produktWeiss}
              alt="WEISSHEIM Wäschesammler – Beige Variante"
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
