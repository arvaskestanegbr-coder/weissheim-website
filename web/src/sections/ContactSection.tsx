import { useEffect, useRef } from "react";
import { Mail } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../components/Reveal";
import { prefersReducedMotion } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  onOpenContact: () => void;
}

/* ─── Animated icon ring ─── */
function IconRing() {
  const ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { strokeDashoffset: 0 });
      return;
    }
    gsap.set(el, { strokeDashoffset: 282 });
    const st = ScrollTrigger.create({
      trigger: el, start: "top 85%", once: true,
      onEnter: () => { gsap.to(el, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out", delay: 0.3 }); },
    });
    return () => st.kill();
  }, []);

  return (
    <div className="relative w-14 h-14 mx-auto mb-10">
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="26" fill="none" stroke="#C9B99A" strokeWidth="1" strokeOpacity={0.15} />
        <circle
          ref={ref}
          cx="28" cy="28" r="26"
          fill="none" stroke="url(#contact-ring-grad)" strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="282"
          strokeDashoffset="282"
        />
        <defs>
          <linearGradient id="contact-ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C9B99A" />
            <stop offset="100%" stopColor="#A09178" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Mail className="w-6 h-6 text-[#C9B99A]" strokeWidth={1.5} />
      </div>
    </div>
  );
}

export default function ContactSection({ onOpenContact }: ContactSectionProps) {
  return (
    <section id="kontakt" className="relative bg-[#0A0A0A] py-24 md:py-32 px-5 md:px-8 overflow-hidden">
      {/* Dot texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #FAF8F3 0.5px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,185,154,0.04),transparent_60%)]" />

      <div className="container relative mx-auto max-w-4xl text-center">
        <Reveal from="up" distance={20}>
          <div>
            <IconRing />
            <h2 className="text-4xl md:text-6xl text-[#FAF8F3] leading-[1.0] mb-6">
              Hast du<br />
              <em>Fragen?</em>
            </h2>
            <p className="text-base text-[#FAF8F3]/60 mb-12 leading-7 max-w-md mx-auto font-[Space_Grotesk]">
              Wir sind für dich da. Kontaktiere uns gern bei Fragen zu unseren Produkten oder
              deiner Bestellung.
            </p>
            <button
              type="button"
              onClick={onOpenContact}
              className="group relative inline-flex items-center justify-center border border-[#FAF8F3]/40 text-[#FAF8F3]/80 px-8 py-4 text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 hover:border-[#C9B99A] hover:text-[#FAF8F3] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FAF8F3]"
            >
              <span className="relative z-10">Kontakt aufnehmen</span>
              {/* Shimmer on hover */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 animate-shimmer" style={{ background: "linear-gradient(105deg, transparent 30%, rgba(201,185,154,0.15) 50%, transparent 70%)" }} />
              </div>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
