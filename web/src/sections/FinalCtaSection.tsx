import { ShoppingCart } from "lucide-react";
import Reveal from "../components/Reveal";
import { AMAZON_PRODUCT_URL } from "../config/site";

interface FinalCtaSectionProps {
  onAmazonClick: (source: string) => void;
}

export default function FinalCtaSection({ onAmazonClick }: FinalCtaSectionProps) {
  return (
    <section className="bg-black py-24 md:py-32 px-4 overflow-hidden">
      {/* Diagonal stripe texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container relative mx-auto max-w-3xl text-center">
        <Reveal from="up" distance={32}>
          <div>
            {/* Tag */}
            <div className="mb-8 inline-block border-[3px] border-[#87CEEB] bg-[#87CEEB] px-6 py-1.5 shadow-[4px_4px_0_#fff]">
              <span className="text-xs font-bold uppercase tracking-widest text-black">
                Jetzt bestellen
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl leading-none mb-6 text-white">
              Bereit für<br />
              echte<br />
              <span className="text-[#87CEEB]">Ordnung?</span>
            </h2>

            <p className="text-base md:text-lg text-white/50 mb-12 leading-7 max-w-xl mx-auto">
              Bestell jetzt deinen WEISSHEIM Wäschesammler und erlebe den Unterschied.
              Direkt über Amazon — schnelle Lieferung, 30 Tage Rückgabe.
            </p>

            <a
              href={AMAZON_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-[3px] border-[#87CEEB] bg-[#87CEEB] px-10 py-5 text-base font-bold text-black uppercase tracking-wide shadow-[6px_6px_0_#fff] hover:shadow-[8px_8px_0_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
              onClick={() => onAmazonClick("final_cta")}
              data-analytics-id="amazon-final-cta"
            >
              <ShoppingCart size={20} />
              Jetzt auf Amazon kaufen
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
