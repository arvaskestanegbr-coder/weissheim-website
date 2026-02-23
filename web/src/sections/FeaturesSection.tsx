import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../components/Reveal";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    number: "01",
    title: "Hygienisch & durchdacht",
    description:
      "Hochwertige, waschbare Oxford 600D Taschen für maximale Hygiene. Damit bleibt deine Wäsche frisch und geruchsfrei.",
  },
  {
    number: "02",
    title: "Flexible Mobilität",
    description:
      "Mit Rollen ausgestattet – perfekt für deinen Alltag und auch beim Umzug. Leicht zu bewegen, wo du es brauchst.",
  },
  {
    number: "03",
    title: "Ästhetischer Stauraum",
    description:
      "Elegante Holzablage und Stahlrahmen – wirkt wie ein hochwertiges Möbelstück, nicht wie ein Wäschesortierer.",
  },
];

/* ─── Parallax ghost number ─── */
function GhostNumber({ number }: { number: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el, start: "top bottom", end: "bottom top", scrub: 1.5,
      onUpdate: (self) => { gsap.set(el, { y: self.progress * -20 }); },
    });
    return () => st.kill();
  }, []);

  return (
    <span ref={ref} className="absolute -right-2 top-1/2 -translate-y-1/2 text-[60px] sm:text-[100px] md:text-[180px] font-bold leading-none select-none pointer-events-none will-change-transform text-white/[0.02]">
      {number}
    </span>
  );
}

/* ─── Floating gold particles ─── */
function FloatingParticles({ count = 5, opacity = 0.2 }: { count?: number; opacity?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const tweens: gsap.core.Tween[] = [];

    for (let i = 0; i < count; i++) {
      const dot = document.createElement("div");
      const size = 2 + Math.random() * 3;
      dot.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(135deg,#C9B99A,#A09178);opacity:0;pointer-events:none;will-change:transform,opacity;`;
      container.appendChild(dot);
      particles.push(dot);

      gsap.set(dot, { left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` });

      const tween = gsap.to(dot, {
        y: `random(-30, 30)`,
        x: `random(-15, 15)`,
        opacity: `random(0.1, ${opacity})`,
        duration: `random(3, 6)`,
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
  }, [count, opacity]);

  return <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden" />;
}

/* ─── Feature row with hover effects ─── */
function FeatureRow({ feature, index, isLast }: { feature: typeof FEATURES[number]; index: number; isLast: boolean }) {
  const numberRef = useRef<HTMLSpanElement>(null);

  const handleEnter = useCallback(() => {
    if (numberRef.current) {
      gsap.to(numberRef.current, { scale: 1.15, duration: 0.4, ease: "power2.out" });
    }
  }, []);

  const handleLeave = useCallback(() => {
    if (numberRef.current) {
      gsap.to(numberRef.current, { scale: 1, duration: 0.4, ease: "power2.out" });
    }
  }, []);

  return (
    <Reveal from="up" distance={16} delayMs={index * 80}>
      <div
        className={`group relative flex gap-8 md:gap-16 py-10 transition-all duration-300 ${!isLast ? "border-b border-[#FAF8F3]/8" : ""}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* Ghost number background */}
        <GhostNumber number={feature.number} />

        {/* Hover shimmer */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 animate-shimmer" style={{ background: "linear-gradient(105deg, transparent 40%, rgba(201,185,154,0.04) 50%, transparent 60%)" }} />
        </div>

        {/* Hover accent line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#C9B99A]/30 to-transparent transform -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-0" />

        {/* Number */}
        <span
          ref={numberRef}
          className="relative text-[13px] font-semibold text-[#C9B99A] tracking-[0.15em] tabular-nums flex-shrink-0 pt-1.5 font-[Space_Grotesk] inline-block"
        >
          {feature.number}
        </span>

        <div className="relative flex-1">
          <h3 className="text-2xl md:text-3xl text-[#FAF8F3] mb-4 leading-tight transition-transform duration-300 group-hover:translate-x-2">
            {feature.title}
          </h3>
          <p className="text-[15px] leading-7 text-[#FAF8F3]/40 max-w-lg font-[Space_Grotesk] transition-colors duration-300 group-hover:text-[#FAF8F3]/55">
            {feature.description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function FeaturesSection() {
  return (
    <section id="vorteile" className="relative bg-[#0A0A0A] py-24 md:py-32 px-5 md:px-8 overflow-hidden">
      {/* Dot texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #FAF8F3 0.5px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Floating particles */}
      <FloatingParticles count={4} opacity={0.15} />

      {/* Subtle warm radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,185,154,0.04),transparent_60%)]" />

      <div className="container relative mx-auto max-w-5xl">

        <Reveal className="mb-20" from="up" distance={20}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="relative">
              <h2 className="text-4xl md:text-6xl text-[#FAF8F3] leading-[1.0]">
                Warum<br />
                <em>WEISSHEIM?</em>
              </h2>
              {/* Gold accent bar */}
              <div className="absolute -left-5 top-2 bottom-2 w-[3px] rounded-full bg-[#C9B99A]/40" />
              <div className="absolute -left-5 top-2 bottom-2 w-[3px] rounded-full bg-[#C9B99A]/40 blur-sm animate-glow" />
            </div>
            <p className="text-sm text-[#FAF8F3]/35 max-w-56 md:text-right leading-6 font-[Space_Grotesk]">
              Die perfekte Lösung für deine organisierte Wäscheverwaltung.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          {FEATURES.map((feature, index) => (
            <FeatureRow
              key={feature.number}
              feature={feature}
              index={index}
              isLast={index === FEATURES.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
