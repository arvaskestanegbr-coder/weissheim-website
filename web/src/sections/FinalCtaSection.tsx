import { useEffect, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../components/Reveal";
import MagneticButton from "../components/MagneticButton";
import { AMAZON_PRODUCT_URL } from "../config/site";
import { prefersReducedMotion } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

interface FinalCtaSectionProps {
  onAmazonClick: (source: string) => void;
}

/* ─── Floating gold particles ─── */
function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return;

    const particles: HTMLDivElement[] = [];
    const tweens: gsap.core.Tween[] = [];

    for (let i = 0; i < 6; i++) {
      const dot = document.createElement("div");
      const size = 2 + Math.random() * 3;
      dot.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(135deg,#C9B99A,#A09178);opacity:0;pointer-events:none;will-change:transform,opacity;`;
      container.appendChild(dot);
      particles.push(dot);

      gsap.set(dot, { left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` });

      const tween = gsap.to(dot, {
        y: `random(-40, 40)`,
        x: `random(-20, 20)`,
        opacity: `random(0.1, 0.25)`,
        duration: `random(3, 6)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.5,
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

/* ─── Animated eyebrow lines ─── */
function AnimatedEyebrowLine({ direction }: { direction: "left" | "right" }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { scaleX: 1 });
      return;
    }
    gsap.set(el, { scaleX: 0, transformOrigin: direction === "left" ? "right center" : "left center" });
    const st = ScrollTrigger.create({
      trigger: el, start: "top 90%", once: true,
      onEnter: () => { gsap.to(el, { scaleX: 1, duration: 1, ease: "power3.out", delay: 0.3 }); },
    });
    return () => st.kill();
  }, [direction]);

  return <span ref={ref} className="h-px w-10 bg-[#C9B99A]/40 block" />;
}

export default function FinalCtaSection({ onAmazonClick }: FinalCtaSectionProps) {
  return (
    <section className="relative bg-[#0A0A0A] py-28 md:py-40 px-5 md:px-8 overflow-hidden">
      {/* Dot texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #FAF8F3 0.5px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Subtle warm gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,185,154,0.06),transparent_70%)]" />

      {/* Floating particles */}
      <FloatingParticles />

      <div className="container relative mx-auto max-w-3xl text-center">
        <Reveal from="up" distance={24}>
          <div>
            {/* Eyebrow */}
            <div className="mb-8 flex items-center justify-center gap-3">
              <AnimatedEyebrowLine direction="left" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9B99A] font-[Space_Grotesk]">
                Jetzt bestellen
              </span>
              <AnimatedEyebrowLine direction="right" />
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-7xl text-[#FAF8F3] leading-[0.95] mb-8">
              Bereit für echte<br />
              <em className="text-[#C9B99A]">Ordnung?</em>
            </h2>

            <p className="text-[15px] text-[#FAF8F3]/60 mb-14 leading-7 max-w-md mx-auto font-[Space_Grotesk]">
              Bestell jetzt deinen WEISSHEIM Wäschesammler und erlebe den Unterschied.
              Direkt über Amazon — schnelle Lieferung, 30 Tage Rückgabe.
            </p>

            <MagneticButton
              as="a"
              href={AMAZON_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2.5 bg-[#FAF8F3] text-[#0A0A0A] px-10 py-5 text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#FAF8F3]/85 font-[Space_Grotesk] overflow-hidden"
              onClick={() => onAmazonClick("final_cta")}
              data-analytics-id="amazon-final-cta"
            >
              <ShoppingCart size={15} className="relative z-10" />
              <span className="relative z-10">Jetzt auf Amazon kaufen</span>
              {/* Button shimmer on hover */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 animate-shimmer" style={{ background: "linear-gradient(105deg, transparent 30%, rgba(201,185,154,0.3) 50%, transparent 70%)" }} />
              </div>
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
