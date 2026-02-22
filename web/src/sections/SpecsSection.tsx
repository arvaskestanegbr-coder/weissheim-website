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
    <section id="ueber-uns" className="py-20 px-4 bg-slate-50">
      <div className="container mx-auto max-w-5xl">
        <Reveal className="mb-14" from="up" distance={24}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.05]">
              Technische Details
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs md:text-right leading-6">
              Hochwertige Materialien und durchdachte Konstruktion für deinen Alltag
            </p>
          </div>
        </Reveal>

        {/* Newspaper-style data grid */}
        <Reveal from="up" distance={24} delayMs={100}>
          <div className="grid grid-cols-2 md:grid-cols-3 border-t border-l border-slate-200 rounded-2xl overflow-hidden">
            {SPECS.map((spec) => {
              const Icon = ICON_MAP[spec.icon];
              return (
                <div
                  key={spec.label}
                  className="border-b border-r border-slate-200 bg-white p-6 md:p-8 group hover:bg-[#F8FCFF] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-4">
                    {Icon && (
                      <Icon
                        size={18}
                        className="text-[#2B90C8] flex-shrink-0"
                        strokeWidth={1.5}
                      />
                    )}
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      {spec.label}
                    </span>
                  </div>
                  <p className="text-lg md:text-xl font-bold text-foreground leading-tight">
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
