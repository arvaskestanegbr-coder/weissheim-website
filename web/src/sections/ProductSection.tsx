import { ShoppingCart } from "lucide-react";
import Reveal from "../components/Reveal";
import { AMAZON_PRODUCT_URL, PRODUCT_BENEFITS } from "../config/site";
import produktWeiss from "../assets/produkt-weiss.webp";

interface ProductSectionProps {
  onAmazonClick: (source: string) => void;
}

export default function ProductSection({ onAmazonClick }: ProductSectionProps) {
  return (
    <section id="produkt" className="bg-[#FAF8F3] py-24 md:py-32 px-5 md:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image — editorial, no border, just space */}
          <Reveal from="left" distance={24}>
            <div className="group relative">
              {/* Warm wash behind */}
              <div className="absolute inset-8 bg-[#F0EBE3] rounded-full blur-2xl opacity-80" />
              <img
                src={produktWeiss}
                alt="WEISSHEIM Wäschesammler – Weiße Variante"
                className="relative z-10 w-full h-auto object-contain mix-blend-multiply transform-gpu transition-transform duration-700 ease-out will-change-transform group-hover:-translate-y-2"
                width={2000}
                height={2500}
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1280px) 480px, (min-width: 768px) 42vw, 88vw"
              />
            </div>
          </Reveal>

          {/* Content */}
          <Reveal from="right" distance={24} delayMs={100}>
            <div>
              {/* Eyebrow */}
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px w-10 bg-[#C9B99A]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9B99A]">
                  Das Produkt
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl text-[#0A0A0A] leading-[1.05] mb-6">
                WEISSHEIM<br />
                Wäschesammler<br />
                <em className="text-[#0A0A0A]/25">mit System.</em>
              </h2>

              <p className="text-[15px] text-[#0A0A0A]/50 mb-10 leading-7 font-[Space_Grotesk]">
                Mit 4 Fächern und großzügigen 200 L Volumen kombinierst du smartes
                Sortieren mit elegantem Design. Dank Haken-System und abnehmbaren
                Oxford 600D Taschen wird deine Wäscheverwaltung stressfrei.
              </p>

              {/* Benefits list — minimal thin-line style */}
              <div className="mb-12">
                {PRODUCT_BENEFITS.map((benefit, i) => (
                  <div
                    key={benefit}
                    className={`flex items-center gap-4 py-3.5 ${
                      i < PRODUCT_BENEFITS.length - 1 ? "border-b border-[#0A0A0A]/8" : ""
                    }`}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9B99A] flex-shrink-0" />
                    <span className="text-[14px] text-[#0A0A0A]/70 font-[Space_Grotesk]">{benefit}</span>
                  </div>
                ))}
              </div>

              <a
                href={AMAZON_PRODUCT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#0A0A0A] text-[#FAF8F3] px-8 py-4 text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#0A0A0A]/80"
                onClick={() => onAmazonClick("product_section")}
                data-analytics-id="amazon-product-section"
              >
                <ShoppingCart size={15} />
                Jetzt auf Amazon kaufen
              </a>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
