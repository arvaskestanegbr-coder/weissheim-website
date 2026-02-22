import { ShoppingCart } from "lucide-react";
import Reveal from "../components/Reveal";
import { AMAZON_PRODUCT_URL } from "../config/site";

interface FinalCtaSectionProps {
  onAmazonClick: (source: string) => void;
}

export default function FinalCtaSection({ onAmazonClick }: FinalCtaSectionProps) {
  return (
    <section className="relative py-24 md:py-32 px-4 bg-[#0C1628] overflow-hidden">
      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Himmelblau glow center */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(135,206,235,0.10),transparent_65%)]" />

      <div className="container relative mx-auto max-w-3xl text-center">
        <Reveal from="up" distance={32}>
          <div>
            <div className="mb-6 inline-flex items-center gap-2">
              <span className="h-px w-8 bg-[#87CEEB]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#87CEEB]">
                Jetzt bestellen
              </span>
              <span className="h-px w-8 bg-[#87CEEB]" />
            </div>

            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white leading-[1.05]">
              Bereit für echte<br />
              <span className="text-[#87CEEB]">Ordnung?</span>
            </h2>

            <p className="text-base md:text-lg text-white/55 mb-12 leading-7 max-w-xl mx-auto">
              Bestell jetzt deinen WEISSHEIM Wäschesammler und erlebe den Unterschied.
              Direkt über Amazon — schnelle Lieferung, 30 Tage Rückgabe.
            </p>

            <a
              href={AMAZON_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#87CEEB] px-10 py-4 text-base font-semibold text-[#0C1628] transition-all hover:bg-[#A8DCF0] hover:shadow-[0_0_50px_rgba(135,206,235,0.3)] active:scale-[0.98]"
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
