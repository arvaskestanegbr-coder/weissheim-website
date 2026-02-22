import {
  Disc3,
  LayersIcon,
  LayoutGrid,
  Package,
  PanelTop,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Reveal from "../components/Reveal";
import { SPECS } from "../config/site";

const ICON_MAP: Record<string, LucideIcon> = {
  Package,
  LayoutGrid,
  Layers: LayersIcon,
  Wrench,
  Disc3,
  PanelTop,
};

export default function SpecsSection() {
  return (
    <section id="ueber-uns" className="bg-[#87CEEB] border-b-[3px] border-black py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <Reveal className="mb-14" from="up" distance={24}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-6xl leading-none text-black">
              Technische<br />
              Details.
            </h2>
            <p className="text-sm text-black/55 max-w-xs md:text-right leading-6">
              Hochwertige Materialien und durchdachte Konstruktion für deinen Alltag
            </p>
          </div>
        </Reveal>

        <Reveal from="up" distance={24} delayMs={100}>
          <div className="grid grid-cols-2 md:grid-cols-3 border-[3px] border-black shadow-[8px_8px_0_#000]">
            {SPECS.map((spec, index) => {
              const Icon = ICON_MAP[spec.icon];
              return (
                <div
                  key={spec.label}
                  className={`bg-[#FAFAF5] p-6 md:p-8 hover:bg-white transition-colors border-black ${
                    index % 2 === 0 ? "border-r-[3px]" : ""
                  } ${index < 4 ? "border-b-[3px]" : ""}`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    {Icon && (
                      <Icon
                        size={16}
                        className="text-black/40 flex-shrink-0"
                        strokeWidth={2}
                      />
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                      {spec.label}
                    </span>
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-black leading-tight">
                    {spec.value}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
