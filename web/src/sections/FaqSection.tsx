import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Reveal from "../components/Reveal";
import { FAQS } from "../config/site";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-[#FAF8F3] py-24 md:py-32 px-5 md:px-8">
      <div className="container mx-auto max-w-3xl">

        <Reveal className="mb-16" from="up" distance={20}>
          <div>
            <h2 className="text-4xl md:text-6xl text-[#0A0A0A] leading-[1.0] mb-4">
              Häufige<br />
              <em className="text-[#0A0A0A]/25">Fragen.</em>
            </h2>
            <p className="text-[15px] text-[#0A0A0A]/40 font-[Space_Grotesk]">
              Alles Wichtige rund um Lieferung, Maße und Pflege
            </p>
          </div>
        </Reveal>

        <Reveal from="up" distance={16} delayMs={80}>
          <div>
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`border-t border-[#0A0A0A]/10 ${index === FAQS.length - 1 ? "border-b border-[#0A0A0A]/10" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className={`text-[15px] font-semibold leading-snug transition-colors duration-200 font-[Space_Grotesk] ${isOpen ? "text-[#0A0A0A]" : "text-[#0A0A0A]/70 group-hover:text-[#0A0A0A]"}`}>
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center border border-[#0A0A0A]/15 rounded-full transition-colors group-hover:border-[#0A0A0A]/30">
                      {isOpen
                        ? <Minus size={14} className="text-[#0A0A0A]/60" />
                        : <Plus size={14} className="text-[#0A0A0A]/40" />
                      }
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-64 pb-6" : "max-h-0"}`}
                  >
                    <p className="text-[14px] leading-7 text-[#0A0A0A]/45 font-[Space_Grotesk]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

      </div>
    </section>
  );
}
