import { ShoppingCart } from "lucide-react";
import Reveal from "../components/Reveal";
import { AMAZON_PRODUCT_URL } from "../config/site";

interface FinalCtaSectionProps {
  onAmazonClick: (source: string) => void;
}

export default function FinalCtaSection({ onAmazonClick }: FinalCtaSectionProps) {
  return (
    <section className="relative bg-[#0A0A0A] py-28 md:py-40 px-5 md:px-8 overflow-hidden">
      {/* Subtle warm gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,185,154,0.06),transparent_70%)]" />

      <div className="container relative mx-auto max-w-3xl text-center">
        <Reveal from="up" distance={24}>
          <div>
            {/* Eyebrow */}
            <div className="mb-8 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#C9B99A]/40" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9B99A] font-[Space_Grotesk]">
                Jetzt bestellen
              </span>
              <span className="h-px w-10 bg-[#C9B99A]/40" />
            </div>

            <h2 className="text-5xl md:text-7xl text-[#FAF8F3] leading-[0.95] mb-8">
              Bereit für echte<br />
              <em className="text-[#C9B99A]">Ordnung?</em>
            </h2>

            <p className="text-[15px] text-[#FAF8F3]/35 mb-14 leading-7 max-w-md mx-auto font-[Space_Grotesk]">
              Bestell jetzt deinen WEISSHEIM Wäschesammler und erlebe den Unterschied.
              Direkt über Amazon — schnelle Lieferung, 30 Tage Rückgabe.
            </p>

            <a
              href={AMAZON_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#FAF8F3] text-[#0A0A0A] px-10 py-5 text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#FAF8F3]/85 font-[Space_Grotesk]"
              onClick={() => onAmazonClick("final_cta")}
              data-analytics-id="amazon-final-cta"
            >
              <ShoppingCart size={15} />
              Jetzt auf Amazon kaufen
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
