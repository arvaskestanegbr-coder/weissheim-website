import { useState, useEffect, useRef, useCallback } from "react";
import { ShoppingCart, Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../components/MagneticButton";
import { AMAZON_PRODUCT_URL, AMAZON_REVIEWS_URL, AMAZON_RATING, PRODUCT_COLORS, HERO_ROTATING_WORDS } from "../config/site";
import produktWeiss from "../assets/produkt-weiss.webp";
import produktSchwarz from "../assets/produkt-schwarz.webp";

const PRODUCT_IMAGES: Record<string, string> = {
  Beige: produktWeiss,
  Schwarz: produktSchwarz,
};

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onAmazonClick: (source: string) => void;
}

/* ─── Rotating words — luxury two-layer crossfade ─── */
/*
 * Architecture:
 *   - Two absolutely-positioned <span> layers (A + B) alternate roles
 *   - Current word fades out (up 7px, blur 4px, scale 0.995, clip from bottom)
 *   - Next word fades in (from 7px below, unblur, scale → 1, clip reveal from top)
 *   - Width is measured at runtime via a hidden measurement span + ResizeObserver
 *     to prevent any layout shift when words have different pixel widths.
 *   - prefers-reduced-motion: skips all animation, swaps text instantly.
 *   - GSAP context ensures all timelines + delayed calls are killed on unmount.
 */
function RotatingWord({ words }: { words: string[] }) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const layerARef = useRef<HTMLSpanElement>(null);
  const layerBRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const measure = measureRef.current;
    const layerA = layerARef.current;
    const layerB = layerBRef.current;
    if (!wrap || !measure || !layerA || !layerB || words.length < 2) return;

    /* ── Runtime width measurement ── */
    const calcWidth = () => {
      let max = 0;
      for (const w of words) {
        measure.textContent = w;
        max = Math.max(max, measure.getBoundingClientRect().width);
      }
      measure.textContent = "";
      wrap.style.width = `${Math.ceil(max + 1)}px`;
    };
    calcWidth();

    const ro = new ResizeObserver(calcWidth);
    if (wrap.parentElement) ro.observe(wrap.parentElement);

    /* ── Reduced motion: instant swap, no animation ── */
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) {
      layerA.textContent = words[0];
      gsap.set(layerA, { opacity: 1 });
      gsap.set(layerB, { opacity: 0 });
      let idx = 0;
      const timer = setInterval(() => {
        idx = (idx + 1) % words.length;
        layerA.textContent = words[idx];
      }, 4000);
      return () => { clearInterval(timer); ro.disconnect(); };
    }

    /* ── Animation constants ── */
    const EASE = "power2.out";
    const HOLD = 3.2;
    const DUR = 0.85;
    const OVERLAP = 0.55;

    /* ── Initial state ── */
    layerA.textContent = words[0];
    gsap.set(layerA, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", clipPath: "inset(0% 0% 0% 0%)" });
    gsap.set(layerB, { opacity: 0 });

    let currentIndex = 0;
    let aIsCurrent = true;

    /* ── GSAP context for clean teardown ── */
    const ctx = gsap.context(() => {
      function scheduleNext() {
        gsap.delayedCall(HOLD, () => {
          const nextIndex = (currentIndex + 1) % words.length;
          const outLayer = (aIsCurrent ? layerA : layerB)!;
          const inLayer = (aIsCurrent ? layerB : layerA)!;

          // Prepare next word while layer is still invisible
          inLayer.textContent = words[nextIndex];

          const tl = gsap.timeline({
            onComplete: () => {
              currentIndex = nextIndex;
              aIsCurrent = !aIsCurrent;
              scheduleNext();
            },
          });

          // Out: drift up + blur + fade + micro-scale + clip from bottom
          tl.to(outLayer, {
            y: -7,
            opacity: 0,
            scale: 0.995,
            filter: "blur(4px)",
            clipPath: "inset(0% 0% 25% 0%)",
            duration: DUR,
            ease: EASE,
          });

          // In: from below + unblur + reveal + scale normalize
          tl.fromTo(inLayer,
            {
              y: 7,
              opacity: 0,
              scale: 1.005,
              filter: "blur(4px)",
              clipPath: "inset(25% 0% 0% 0%)",
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              clipPath: "inset(0% 0% 0% 0%)",
              duration: DUR,
              ease: EASE,
            },
            `-=${OVERLAP}`,
          );
        });
      }

      scheduleNext();
    });

    return () => { ctx.revert(); ro.disconnect(); };
  }, [words]);

  const layerStyle: React.CSSProperties = {
    willChange: "transform, opacity, filter",
    backfaceVisibility: "hidden",
  };

  return (
    <span ref={wrapRef} className="relative inline-block align-baseline">
      {/* Hidden measurement span — inherits parent serif font */}
      <span
        ref={measureRef}
        className="invisible absolute left-0 top-0 whitespace-nowrap pointer-events-none"
        aria-hidden="true"
      />
      {/* Height spacer (invisible, keeps line height stable) */}
      <span className="invisible" aria-hidden="true">{words[0]}</span>
      {/* Layer A */}
      <span ref={layerARef} className="absolute left-0 top-0 whitespace-nowrap" style={layerStyle} />
      {/* Layer B */}
      <span ref={layerBRef} className="absolute left-0 top-0 whitespace-nowrap" style={layerStyle} />
    </span>
  );
}

/* ─── Floating gold particles (subtle, few) ─── */
function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const tweens: gsap.core.Tween[] = [];

    for (let i = 0; i < 5; i++) {
      const dot = document.createElement("div");
      const size = 2 + Math.random() * 2.5;
      dot.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(135deg,#C9B99A,#A09178);opacity:0;pointer-events:none;will-change:transform,opacity;`;
      container.appendChild(dot);
      particles.push(dot);

      gsap.set(dot, { left: `${20 + Math.random() * 60}%`, top: `${20 + Math.random() * 60}%` });

      const tween = gsap.to(dot, {
        y: `random(-30, 30)`,
        x: `random(-15, 15)`,
        opacity: `random(0.08, 0.2)`,
        duration: `random(4, 7)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.6,
      });
      tweens.push(tween);
    }

    return () => {
      tweens.forEach((t) => t.kill());
      particles.forEach((p) => p.remove());
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden" />;
}

/* (HoverZoomImage removed — CSS-only hover like deployed version) */

/* ─── Animated eyebrow line (draws in) ─── */
function AnimatedEyebrowLine() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.8, ease: "power3.out", delay: 0.2 },
    );
  }, []);

  return <span ref={ref} className="h-px w-10 bg-[#C9B99A] block" />;
}

export default function HeroSection({ onAmazonClick }: HeroSectionProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState("Beige");
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const productImgRef = useRef<HTMLImageElement>(null);

  // Parallax: container scrolls slower (not the image itself, so CSS hover still works)
  useEffect(() => {
    const wrapper = parallaxRef.current;
    const section = sectionRef.current;
    if (!wrapper || !section) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        gsap.set(wrapper, { y: self.progress * 55 });
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
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      );
    }

    if (headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll(".hero-line");
      tl.fromTo(lines,
        { opacity: 0, y: 32, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power3.out", stagger: 0.12 },
        "-=0.4",
      );
    }

    if (subtextRef.current) {
      tl.fromTo(subtextRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.5",
      );
    }

    if (ctaRef.current) {
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.45",
      );
    }

    return () => { tl.kill(); };
  }, []);

  const handleColorSwitch = useCallback((colorName: string) => {
    if (colorName === selectedColor) return;
    const img = productImgRef.current;
    if (!img) {
      setSelectedColor(colorName);
      return;
    }
    // Crossfade: fade out → swap → fade in, then clear inline styles for CSS hover
    gsap.to(img, {
      opacity: 0,
      scale: 0.97,
      filter: "blur(4px)",
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setSelectedColor(colorName);
        gsap.fromTo(img,
          { opacity: 0, scale: 1.03, filter: "blur(4px)" },
          {
            opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.4, ease: "power2.out",
            onComplete: () => { gsap.set(img, { clearProps: "transform,opacity,filter" }); },
          },
        );
      },
    });
  }, [selectedColor]);

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

      {/* Floating particles */}
      <FloatingParticles />

      {/* Warm radial glow behind product area */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(ellipse_at_center_right,rgba(201,185,154,0.05),transparent_70%)]" />

      <div className="container relative mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 items-center">

          {/* Text: headline, subtext, color swatches — row 1 left on desktop, order 1 on mobile */}
          <div className="order-1 lg:col-start-1 lg:row-start-1 lg:pr-16">
            {/* Eyebrow — animated line draw-in */}
            <div ref={eyebrowRef} className="mb-8 flex items-center gap-3" style={{ opacity: 0 }}>
              <AnimatedEyebrowLine />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9B99A]">
                Premium Wäscheorganizer
              </span>
            </div>

            {/* Headline — rotating last word with clip */}
            <h1
              ref={headlineRef}
              className="text-[36px] sm:text-[48px] md:text-[88px] lg:text-[96px] leading-[0.92] mb-8 text-[#0A0A0A]"
            >
              <span className="hero-line block">Ordnung,</span>
              <span className="hero-line block">die man</span>
              <span className="hero-line block text-[#0A0A0A]/30">
                <RotatingWord words={HERO_ROTATING_WORDS} />
              </span>
            </h1>

            <p
              ref={subtextRef}
              className="text-base md:text-lg text-[#0A0A0A]/50 mb-10 leading-7 max-w-sm font-[Space_Grotesk]"
              style={{ opacity: 0 }}
            >
              200 Liter, 4 abnehmbare Fächer, Rollen — und eine elegante Holzablage.
              Für Haushalte, die Ordnung ernst nehmen.
            </p>

            {/* Color swatches — clickable, switches product image */}
            <div ref={ctaRef} style={{ opacity: 0 }}>
              <div className="flex items-center gap-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0A0A0A]/30">
                  Farben
                </span>
                <div className="flex items-center gap-4">
                  {PRODUCT_COLORS.map((color) => {
                    const isActive = selectedColor === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => handleColorSwitch(color.name)}
                        className="group/swatch flex items-center gap-2 cursor-pointer"
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full transition-all duration-300 group-hover/swatch:scale-125 ${color.bgClass} ${
                            isActive ? "ring-2 ring-[#C9B99A] ring-offset-2 ring-offset-[#FAF8F3]" : "ring-1 ring-black/10"
                          }`}
                        />
                        <span className={`text-[11px] font-medium transition-colors duration-300 ${
                          isActive ? "text-[#0A0A0A]" : "text-[#0A0A0A]/40 group-hover/swatch:text-[#0A0A0A]/70"
                        }`}>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Product image — right column spanning both rows on desktop, order 2 on mobile */}
          <div ref={parallaxRef} className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 group relative flex justify-center lg:justify-end bg-[#FAF8F3] border-0 ring-0 outline-none shadow-none overflow-visible p-6 before:content-[''] before:pointer-events-none before:absolute before:inset-[-16%] before:rounded-[999px] before:bg-[radial-gradient(circle_at_center,rgba(10,10,10,0.12),transparent_62%)] before:blur-3xl before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100">
            <img
              ref={productImgRef}
              src={PRODUCT_IMAGES[selectedColor] ?? produktWeiss}
              alt={`WEISSHEIM Wäschesammler – ${selectedColor} Variante`}
              className="relative z-10 w-full max-w-[620px] h-auto object-contain mix-blend-multiply transform-gpu transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-2 group-hover:scale-[1.03]"
              width={2000}
              height={2500}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="(min-width: 1280px) 620px, (min-width: 1024px) 45vw, 92vw"
            />
          </div>

          {/* CTAs + Rating — below product on mobile (order 3), row 2 left on desktop */}
          <div className="order-3 lg:col-start-1 lg:row-start-2 lg:pr-16">
            <div className="flex flex-col sm:flex-row gap-4">
              <MagneticButton
                as="a"
                href={AMAZON_PRODUCT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 bg-[#0A0A0A] text-[#FAF8F3] px-8 py-4 text-[13px] font-semibold tracking-wider uppercase transition-colors duration-300 hover:bg-[#0A0A0A]/80 overflow-hidden"
                onClick={() => onAmazonClick("hero_primary")}
                data-analytics-id="amazon-hero-primary"
              >
                <ShoppingCart size={15} className="relative z-10" />
                <span className="relative z-10">Jetzt auf Amazon</span>
                <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 animate-shimmer" style={{ background: "linear-gradient(105deg, transparent 30%, rgba(201,185,154,0.15) 50%, transparent 70%)" }} />
                </div>
              </MagneticButton>
              <MagneticButton
                as="a"
                href="#produkt"
                className="group relative inline-flex items-center justify-center gap-2 border border-[#0A0A0A]/20 text-[#0A0A0A]/60 px-8 py-4 text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 hover:border-[#C9B99A]/50 hover:text-[#0A0A0A] overflow-hidden"
              >
                <span className="relative z-10">Mehr erfahren</span>
                <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 animate-shimmer" style={{ background: "linear-gradient(105deg, transparent 30%, rgba(201,185,154,0.1) 50%, transparent 70%)" }} />
                </div>
              </MagneticButton>
            </div>

            {/* Amazon star rating — social proof (entire area clickable) */}
            <a
              href={AMAZON_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center sm:justify-start gap-2 transition-opacity duration-300 hover:opacity-75"
              onClick={() => onAmazonClick("hero_rating")}
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, i) => {
                  const fill = Math.min(1, Math.max(0, AMAZON_RATING.stars - i));
                  return (
                    <span key={i} className="relative">
                      <Star size={14} className="text-[#0A0A0A]/10" />
                      {fill > 0 && (
                        <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                          <Star size={14} className="text-[#E8A030] fill-[#E8A030]" />
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
              <span className="text-[13px] font-medium text-[#0A0A0A]/70 font-[Space_Grotesk]">
                {AMAZON_RATING.stars.toLocaleString("de-DE")}
              </span>
              <span className="text-[13px] text-[#0A0A0A]/40 font-[Space_Grotesk]">
                ({AMAZON_RATING.count} Bewertungen)
              </span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
