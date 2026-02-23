import { useEffect, useRef, useCallback, type MouseEvent as ReactMouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Wrench, Disc3, PanelTop, type LucideIcon } from "lucide-react";
import Reveal from "../components/Reveal";
import { HERO_STATS, SPECS } from "../config/site";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, LucideIcon> = {
  Layers,
  Wrench,
  Disc3,
  PanelTop,
};

/* ─── Count-up number with bounce ─── */
function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: "power2.out",
          onUpdate: () => { el.textContent = Math.round(obj.val).toString(); },
          onComplete: () => {
            gsap.fromTo(el, { scale: 1.08 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" });
          },
        });
      },
    });
    return () => st.kill();
  }, [target]);

  return <span ref={ref} className="inline-block">0</span>;
}

/* ─── Parallax ghost number ─── */
function ParallaxNumber({ number, isDark }: { number: string; isDark: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el, start: "top bottom", end: "bottom top", scrub: 1.5,
      onUpdate: (self) => { gsap.set(el, { y: self.progress * -30 }); },
    });
    return () => st.kill();
  }, []);

  return (
    <span ref={ref} className={`absolute -right-4 -top-6 text-[80px] sm:text-[140px] md:text-[220px] font-bold leading-none select-none pointer-events-none will-change-transform ${isDark ? "text-white/[0.04]" : "text-[#0A0A0A]/[0.03]"}`}>
      {number}
    </span>
  );
}

/* ─── Floating gold particles ─── */
function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const tweens: gsap.core.Tween[] = [];

    for (let i = 0; i < 6; i++) {
      const dot = document.createElement("div");
      const size = 2 + Math.random() * 3;
      dot.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: linear-gradient(135deg, #C9B99A, #A09178);
        opacity: 0;
        pointer-events: none;
        will-change: transform, opacity;
      `;
      container.appendChild(dot);
      particles.push(dot);

      const startX = Math.random() * 100;
      const startY = Math.random() * 100;

      gsap.set(dot, { left: `${startX}%`, top: `${startY}%` });

      const tween = gsap.to(dot, {
        y: `random(-40, 40)`,
        x: `random(-20, 20)`,
        opacity: `random(0.15, 0.4)`,
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

/* ─── 3D tilt card wrapper with cursor spotlight ─── */
function TiltCard({ children, className, isDark }: { children: React.ReactNode; className?: string; isDark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: x * 6,
      rotateX: -y * 6,
      duration: 0.4,
      ease: "power2.out",
    });

    // Cursor spotlight
    if (spotlightRef.current && isDark) {
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      spotlightRef.current.style.background = `radial-gradient(350px circle at ${px}px ${py}px, rgba(201,185,154,0.08), transparent 60%)`;
      gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
    }
  }, [isDark]);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power2.out" });
    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, { opacity: 0, duration: 0.4 });
    }
  }, []);

  return (
    <div className="h-full" style={{ perspective: "800px" }}>
      <div
        ref={ref}
        className={className}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ transformStyle: "preserve-3d" }}
      >
        {isDark && <div ref={spotlightRef} className="pointer-events-none absolute inset-0 z-[5] opacity-0 rounded-sm" />}
        {children}
      </div>
    </div>
  );
}

/* ─── Magnetic hover card for detail specs ─── */
function MagneticCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      x: x * 8,
      y: y * 8,
      rotateX: -y * 4,
      rotateY: x * 4,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  }, []);

  return (
    <div className="h-full" style={{ perspective: "600px" }}>
      <div
        ref={ref}
        className={className}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
}

/* ─── Animated icon ring ─── */
let iconRingCounter = 0;

function IconRing({ children }: { children: React.ReactNode }) {
  const idRef = useRef(`icon-ring-grad-${++iconRingCounter}`);
  const gradId = idRef.current;

  return (
    <div className="relative mb-5 inline-flex items-center justify-center w-11 h-11">
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="20" fill="none" stroke="#C9B99A" strokeWidth="1" strokeOpacity={0.15} />
        <circle
          cx="22" cy="22" r="20"
          fill="none" stroke={`url(#${gradId})`} strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="126"
          className="animate-icon-ring"
        />
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C9B99A" />
            <stop offset="100%" stopColor="#A09178" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative z-10 text-[#C9B99A] transition-all duration-300 group-hover:text-[#A09178] group-hover:scale-110">
        {children}
      </div>
    </div>
  );
}

/* ─── Animated corner accents ─── */
function CornerAccents({ isDark }: { isDark: boolean }) {
  const color = isDark ? "rgba(201,185,154,0.2)" : "rgba(201,185,154,0.25)";
  return (
    <>
      <span className="absolute top-3 right-3 w-4 h-4 pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` }} />
      <span className="absolute bottom-3 left-3 w-4 h-4 pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` }} />
    </>
  );
}

/* ─── Context hints ─── */
const STAT_CONTEXT: Record<string, string> = {
  "200": "= ca. 8 volle Wäschekörbe",
  "4": "Sortiere nach Farbe, Temperatur & mehr",
};

/* ─── Animated line decoration between sections ─── */
function GoldDivider() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { scaleX: 0, transformOrigin: "center center" });
    const st = ScrollTrigger.create({
      trigger: el, start: "top 90%", once: true,
      onEnter: () => { gsap.to(el, { scaleX: 1, duration: 1.2, ease: "power3.out", delay: 0.5 }); },
    });
    return () => st.kill();
  }, []);

  return (
    <div className="flex items-center justify-center my-5 md:my-5 gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-[#C9B99A]/30" />
      <div ref={ref} className="h-px w-24 bg-gradient-to-r from-transparent via-[#C9B99A]/40 to-transparent" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#C9B99A]/30" />
    </div>
  );
}

/* ─── Stagger-in for detail card icons (draw on scroll) ─── */
function ScrollDrawIcon({ icon: Icon }: { icon: LucideIcon }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const paths = el.querySelectorAll("path, line, polyline, circle, rect");
    paths.forEach((path) => {
      const svgPath = path as SVGGeometryElement;
      if (svgPath.getTotalLength) {
        const len = svgPath.getTotalLength();
        gsap.set(svgPath, { strokeDasharray: len, strokeDashoffset: len });
      }
    });

    const st = ScrollTrigger.create({
      trigger: el, start: "top 90%", once: true,
      onEnter: () => {
        paths.forEach((path, i) => {
          const svgPath = path as SVGGeometryElement;
          if (typeof svgPath.getTotalLength === "function") {
            gsap.to(svgPath, { strokeDashoffset: 0, duration: 1, ease: "power2.out", delay: 0.3 + i * 0.1 });
          }
        });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div ref={ref}>
      <Icon size={20} strokeWidth={1.5} />
    </div>
  );
}

/* ─── Main section ─── */
export default function SpecsSection() {
  return (
    <section id="ueber-uns" className="bg-[#F0EBE3] py-24 md:py-32 px-5 md:px-8 overflow-hidden">
      <div className="container mx-auto max-w-5xl">

        <Reveal className="mb-16" from="up" distance={20}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-4xl md:text-6xl text-[#0A0A0A] leading-[1.0]">
              Technische<br />
              <em>Details.</em>
            </h2>
            <p className="text-sm text-[#0A0A0A]/45 max-w-56 md:text-right leading-6 font-[Space_Grotesk]">
              Hochwertige Materialien und durchdachte Konstruktion
            </p>
          </div>
        </Reveal>

        {/* Hero stats — 3D tilt, asymmetric */}
        <div className="grid grid-cols-2 gap-4 md:gap-5 mb-0">
          {HERO_STATS.map((stat, i) => {
            const isDark = i === 0;
            return (
              <Reveal key={stat.label} from="up" distance={20} delayMs={i * 120} className="h-full">
                <TiltCard isDark={isDark} className={`group relative rounded-sm p-8 md:p-10 overflow-hidden transition-shadow duration-500 hover:shadow-[0_16px_56px_rgba(0,0,0,0.14)] h-full ${
                  isDark
                    ? "bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#1a1a1a]"
                    : "bg-[#FAF8F3]"
                }`}>
                  {/* Corner accents on hover */}
                  <CornerAccents isDark={isDark} />

                  {/* Left accent bar with glow */}
                  <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-[#C9B99A]" />
                  <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-[#C9B99A] blur-sm animate-glow" />

                  {/* Dot texture on dark card */}
                  {isDark && (
                    <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, #FAF8F3 0.5px, transparent 0)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                  )}

                  {/* Shimmer sweep on dark card */}
                  {isDark && (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      <div className="absolute inset-0 animate-shimmer"
                        style={{ background: "linear-gradient(105deg, transparent 40%, rgba(201,185,154,0.06) 50%, transparent 60%)" }}
                      />
                    </div>
                  )}

                  {/* Floating particles on dark card */}
                  {isDark && <FloatingParticles />}

                  {/* Parallax ghost number */}
                  <ParallaxNumber number={stat.number} isDark={isDark} />

                  <div className="relative z-[6]" style={{ transform: "translateZ(20px)" }}>
                    <div className="flex items-baseline gap-2.5 mb-2">
                      <span className={`text-5xl sm:text-7xl md:text-[104px] font-bold leading-none tracking-tighter ${isDark ? "text-[#FAF8F3]" : "text-[#0A0A0A]"}`}>
                        <CountUp target={Number(stat.number)} />
                      </span>
                      <span className="text-xl md:text-2xl font-medium text-[#C9B99A] font-[Space_Grotesk]">
                        {stat.unit}
                      </span>
                    </div>
                    <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] font-[Space_Grotesk] mb-1 ${isDark ? "text-[#FAF8F3]/40" : "text-[#0A0A0A]/40"}`}>
                      {stat.label}
                    </p>
                    {/* Context hint */}
                    {STAT_CONTEXT[stat.number] && (
                      <p className={`text-[12px] italic font-[Space_Grotesk] ${isDark ? "text-[#C9B99A]/50" : "text-[#C9B99A]/70"}`}>
                        {STAT_CONTEXT[stat.number]}
                      </p>
                    )}
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        {/* Gold divider between hero and detail */}
        <GoldDivider />

        {/* Detail specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {SPECS.map((spec, index) => {
            const Icon = spec.icon ? ICON_MAP[spec.icon] : null;
            return (
              <Reveal key={spec.label} from="up" distance={16} delayMs={200 + index * 60} className="h-full">
                <MagneticCard className="h-full group relative bg-[#FAF8F3]/60 rounded-sm p-6 md:p-7 transition-all duration-300 hover:bg-[#FAF8F3] hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] overflow-hidden cursor-default">
                  {/* Bottom accent line slide-in */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C9B99A] to-[#A09178] transform -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0" />

                  {/* Top accent line (opposite direction) */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#A09178] to-[#C9B99A] transform translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0" />

                  {/* Shimmer on hover */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 animate-shimmer" style={{ background: "linear-gradient(105deg, transparent 40%, rgba(201,185,154,0.08) 50%, transparent 60%)" }} />
                  </div>

                  {/* Corner accents */}
                  <CornerAccents isDark={false} />

                  {/* Icon with animated ring */}
                  {Icon && (
                    <IconRing>
                      <ScrollDrawIcon icon={Icon} />
                    </IconRing>
                  )}

                  <p className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0A0A0A]/35 mb-1.5 font-[Space_Grotesk]">{spec.label}</p>
                  <p className="relative text-base md:text-lg font-bold text-[#0A0A0A] leading-snug font-[Space_Grotesk]">{spec.value}</p>
                  {spec.desc && (
                    <p className="relative mt-2 text-[12px] text-[#0A0A0A]/35 leading-relaxed font-[Space_Grotesk] transition-colors duration-300 group-hover:text-[#0A0A0A]/50">{spec.desc}</p>
                  )}

                  {/* Index number watermark */}
                  <span className="absolute -bottom-2 -right-1 text-[64px] font-bold leading-none text-[#0A0A0A]/[0.02] select-none pointer-events-none font-[Space_Grotesk] transition-all duration-500 group-hover:text-[#C9B99A]/[0.06]">
                    0{index + 1}
                  </span>
                </MagneticCard>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
