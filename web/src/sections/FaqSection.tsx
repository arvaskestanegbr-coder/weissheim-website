import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "../components/Reveal";
import { FAQS } from "../config/site";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-[#FAFAF5] border-b-[3px] border-black py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <Reveal className="mb-14" from="up" distance={24}>
          <div>
            <h2 className="text-4xl md:text-6xl leading-none mb-4 text-black">
              Häufige<br />
              <span className="text-black/40">Fragen.</span>
            </h2>
            <p className="text-base text-black/50">
              Alles Wichtige rund um Lieferung, Maße und Pflege
            </p>
          </div>
        </Reveal>
        <Reveal from="up" distance={24} delayMs={100}>
          <div className="border-[3px] border-black shadow-[6px_6px_0_#87CEEB]">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question} className={index < FAQS.length - 1 ? "border-b-[3px] border-black" : ""}>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className={`w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors ${isOpen ? "bg-[#87CEEB]" : "bg-white hover:bg-[#F0EBE0]"}`}
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-bold text-black">{faq.question}</span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-black transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ease-in-out bg-white ${isOpen ? "max-h-96" : "max-h-0"}`}
                  >
                    <p className="px-6 py-5 text-sm leading-7 text-black/60 border-t-[3px] border-black">{faq.answer}</p>
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
