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
    <section className="py-20 px-4 bg-slate-50">
      <div className="container mx-auto max-w-3xl">
        <Reveal className="text-center mb-16" from="up" distance={24}>
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-foreground leading-[1.05]">
              Häufige Fragen
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Alles Wichtige rund um Lieferung, Maße und Pflege
            </p>
          </div>
        </Reveal>
        <Reveal from="up" distance={24} delayMs={100}>
          <div className="divide-y divide-border border border-border rounded-[28px] overflow-hidden bg-background">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between gap-4 px-8 py-6 text-left hover:bg-slate-100 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-foreground">{faq.question}</span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`}
                  >
                    <p className="px-8 pb-6 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
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
