import { ShoppingCart } from "lucide-react";
import Reveal from "../components/Reveal";
import MagneticButton from "../components/MagneticButton";
import { AMAZON_PRODUCT_URL, PRODUCT_BENEFITS } from "../config/site";
import produktSchwarz from "../assets/produkt-schwarz.webp";

interface ProductSectionProps {
  onAmazonClick: (source: string) => void;
}

export default function ProductSection({ onAmazonClick }: ProductSectionProps) {
  return (
    <section id="produkt" className="relative bg-[#FAF8F3] py-24 md:py-32 px-5 md:px-8 overflow-hidden">
      {/* Subtle dot texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #0A0A0A 0.5px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Shimmer sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 animate-shimmer"
          style={{ background: "linear-gradient(105deg, transparent 40%, rgba(201,185,154,0.025) 50%, transparent 60%)" }}
        />
      </div>

      <div className="container relative mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">

          {/* Image — CSS hover zoom + radial shadow (matches live site) */}
          <Reveal from="left" distance={24}>
            <div className="group relative flex justify-center bg-[#FAF8F3] border-0 ring-0 outline-none shadow-none overflow-visible p-6 before:content-[''] before:pointer-events-none before:absolute before:inset-[-16%] before:rounded-[999px] before:bg-[radial-gradient(circle_at_center,rgba(10,10,10,0.12),transparent_62%)] before:blur-3xl before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100">
              <img
                src={produktSchwarz}
                alt="WEISSHEIM Wäschesammler – Schwarze Variante"
                className="relative z-10 w-full max-w-[560px] h-auto object-contain mix-blend-multiply transform-gpu transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-2 group-hover:scale-[1.03]"
                width={2000}
                height={2500}
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1280px) 560px, (min-width: 768px) 45vw, 92vw"
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

              {/* Benefits list — premium thin-line style with hover */}
              <div className="mb-12">
                {PRODUCT_BENEFITS.map((benefit, i) => (
                  <div
                    key={benefit}
                    className={`group/benefit flex items-center gap-4 py-3.5 transition-all duration-300 hover:translate-x-1 ${
                      i < PRODUCT_BENEFITS.length - 1 ? "border-b border-[#0A0A0A]/8" : ""
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9B99A] flex-shrink-0 transition-transform duration-300 group-hover/benefit:scale-150" />
                    <span className="text-[14px] text-[#0A0A0A]/70 font-[Space_Grotesk] transition-colors duration-300 group-hover/benefit:text-[#0A0A0A]">{benefit}</span>
                  </div>
                ))}
              </div>

              <MagneticButton
                as="a"
                href={AMAZON_PRODUCT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2.5 bg-[#0A0A0A] text-[#FAF8F3] px-8 py-4 text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#0A0A0A]/80 overflow-hidden"
                onClick={() => onAmazonClick("product_section")}
                data-analytics-id="amazon-product-section"
              >
                <ShoppingCart size={15} className="relative z-10" />
                <span className="relative z-10">Jetzt auf Amazon kaufen</span>
                <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 animate-shimmer" style={{ background: "linear-gradient(105deg, transparent 30%, rgba(201,185,154,0.15) 50%, transparent 70%)" }} />
                </div>
              </MagneticButton>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
