import { ShoppingCart } from "lucide-react";
import Reveal from "../components/Reveal";
import { AMAZON_PRODUCT_URL, PRODUCT_BENEFITS } from "../config/site";
import produktWeiss from "../assets/produkt-weiss.webp";

interface ProductSectionProps {
  onAmazonClick: (source: string) => void;
}

export default function ProductSection({ onAmazonClick }: ProductSectionProps) {
  return (
    <section id="produkt" className="bg-[#FAFAF5] border-b-[3px] border-black py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Image */}
          <Reveal from="left" distance={30}>
            <div className="group relative flex justify-center">
              <div className="relative border-[3px] border-black shadow-[8px_8px_0_#000] bg-[#F0EBE0] p-6 md:p-8 w-full">
                {/* Tag */}
                <div className="absolute -top-[3px] -right-[3px] border-[3px] border-black bg-black px-3 py-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#87CEEB]">
                    Oxford 600D
                  </span>
                </div>
                <img
                  src={produktWeiss}
                  alt="WEISSHEIM Wäschesammler – Weiße Variante"
                  className="w-full h-auto object-contain mix-blend-multiply transform-gpu transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-2"
                  width={2000}
                  height={2500}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1280px) 480px, (min-width: 768px) 42vw, 88vw"
                />
              </div>
            </div>
          </Reveal>

          {/* Content */}
          <Reveal from="right" distance={30} delayMs={150}>
            <div>
              {/* Eyebrow tag */}
              <div className="mb-6 inline-block border-[3px] border-black bg-black px-4 py-1 shadow-[3px_3px_0_#87CEEB]">
                <span className="text-xs font-bold uppercase tracking-widest text-[#87CEEB]">
                  Das Produkt
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl leading-none mb-6 text-black">
                WEISSHEIM<br />Wäschesammler<br />
                <span className="text-black/40">mit System.</span>
              </h2>

              <p className="text-sm md:text-base text-black/55 mb-8 leading-7">
                Mit 4 Fächern und großzügigen 200 L Volumen kombinierst du smartes
                Sortieren mit elegantem Design. Dank Haken-System und abnehmbaren
                Oxford 600D Taschen wird deine Wäscheverwaltung stressfrei.
              </p>

              {/* Benefits list */}
              <div className="space-y-0 mb-10 border-[3px] border-black shadow-[4px_4px_0_#87CEEB]">
                {PRODUCT_BENEFITS.map((benefit, i) => (
                  <div
                    key={benefit}
                    className={`flex items-center gap-3 px-5 py-3.5 bg-white ${
                      i < PRODUCT_BENEFITS.length - 1 ? "border-b-[3px] border-black" : ""
                    }`}
                  >
                    <span className="w-2 h-2 bg-[#87CEEB] border-[2px] border-black flex-shrink-0" />
                    <span className="text-sm font-medium text-black">{benefit}</span>
                  </div>
                ))}
              </div>

              <a
                href={AMAZON_PRODUCT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-[3px] border-black bg-black px-8 py-4 text-sm font-bold text-[#FAFAF5] uppercase tracking-wide shadow-[5px_5px_0_#87CEEB] hover:shadow-[7px_7px_0_#87CEEB] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                onClick={() => onAmazonClick("product_section")}
                data-analytics-id="amazon-product-section"
              >
                <ShoppingCart size={16} />
                Jetzt auf Amazon kaufen
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
