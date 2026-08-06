import { useState, useRef, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../components/Reveal";
import { FAQS } from "../config/site";
import { prefersReducedMotion } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

/* ─── Animated gold accent on active FAQ ─── */
function FaqItem({ faq, index, isOpen, isLast, onToggle }: {
  faq: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  isLast: boolean;
  onToggle: () => void;
}) {
  const iconRef = useRef<HTMLSpanElement>(null);
  const triggerId = `faq-trigger-${index}`;
  const panelId = `faq-panel-${index}`;

  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;

    const endState = {
      rotate: isOpen ? 180 : 0,
      borderColor: isOpen ? "rgba(201,185,154,0.4)" : "rgba(10,10,10,0.15)",
    };

    if (prefersReducedMotion()) {
      gsap.set(icon, endState);
      return;
    }

    const tween = gsap.to(icon, {
      ...endState,
      duration: 0.3,
      ease: "power2.out",
    });

    return () => {
      tween.kill();
    };
  }, [isOpen]);

  return (
    <div
      className={`group relative border-t border-[#0A0A0A]/10 transition-colors duration-300 ${isOpen ? "bg-[#0A0A0A]/[0.02]" : ""} ${isLast ? "border-b border-[#0A0A0A]/10" : ""}`}
    >
      {/* Active gold accent bar */}
      <div
        aria-hidden="true"
        className={`absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C9B99A] to-[#A09178] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />

      <h3 className="font-[inherit] tracking-normal">
        <button
          id={triggerId}
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-6 py-6 pl-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0A0A0A]/70"
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className={`text-[12px] font-semibold tabular-nums font-[Space_Grotesk] transition-colors duration-300 ${isOpen ? "text-[#C9B99A]" : "text-[#0A0A0A]/20"}`}
            >
              0{index + 1}
            </span>
            <span className={`text-[15px] font-semibold leading-snug transition-colors duration-200 font-[Space_Grotesk] ${isOpen ? "text-[#0A0A0A]" : "text-[#0A0A0A]/70 group-hover:text-[#0A0A0A]"}`}>
              {faq.question}
            </span>
          </div>
          <span
            ref={iconRef}
            aria-hidden="true"
            className="flex-shrink-0 w-10 h-10 md:w-7 md:h-7 flex items-center justify-center border border-[#0A0A0A]/15 rounded-full transition-all duration-300 motion-reduce:transition-none group-hover:border-[#0A0A0A]/30"
          >
            {isOpen
              ? <Minus size={14} className="text-[#78684F]" />
              : <Plus size={14} className="text-[#0A0A0A]/70" />
            }
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isOpen}
        className="pb-6"
      >
        <p className="text-[14px] leading-7 text-[#0A0A0A]/65 font-[Space_Grotesk] pl-4 ml-8">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative bg-[#FAF8F3] py-24 md:py-32 px-5 md:px-8 overflow-hidden">
      {/* Subtle dot texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #0A0A0A 0.5px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container relative mx-auto max-w-3xl">

        <Reveal className="mb-16" from="up" distance={20}>
          <div className="relative">
            <h2 className="text-4xl md:text-6xl text-[#0A0A0A] leading-[1.0] mb-4">
              Häufige<br />
              <em className="text-[#0A0A0A]/50">Fragen.</em>
            </h2>
            <p className="text-[15px] text-[#0A0A0A]/60 font-[Space_Grotesk]">
              Alles Wichtige rund um Lieferung, Maße und Pflege
            </p>
            {/* Gold accent bar */}
            <div className="absolute -left-5 top-2 bottom-2 w-[2px] rounded-full bg-[#C9B99A]/30" />
          </div>
        </Reveal>

        <Reveal from="up" distance={16} delayMs={80}>
          <div>
            {FAQS.map((faq, index) => (
              <FaqItem
                key={faq.question}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                isLast={index === FAQS.length - 1}
                onToggle={() => toggle(index)}
              />
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}
