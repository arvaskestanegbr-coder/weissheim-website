import Reveal from "../components/Reveal";
import { SPECS } from "../config/site";

export default function SpecsSection() {
  return (
    <section id="ueber-uns" className="bg-[#F0EBE3] py-24 md:py-32 px-5 md:px-8">
      <div className="container mx-auto max-w-5xl">

        <Reveal className="mb-16" from="up" distance={20}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-4xl md:text-6xl text-[#0A0A0A] leading-[1.0]">
              Technische<br />
              <em>Details.</em>
            </h2>
            <p className="text-sm text-[#0A0A0A]/45 max-w-56 md:text-right leading-6 font-[Space_Grotesk]">
              Hochwertige Materialien und durchdachte Konstruktion
            </p>
          </div>
        </Reveal>

        <Reveal from="up" distance={20} delayMs={80}>
          <div className="grid grid-cols-2 md:grid-cols-3">
            {SPECS.map((spec, index) => (
              <div
                key={spec.label}
                className={`py-8 md:py-10 px-0 ${
                  // Right padding for non-last in row
                  index % 3 !== 2 ? "md:pr-10" : ""
                } ${
                  // Left padding for non-first in row
                  index % 3 !== 0 ? "md:pl-10 md:border-l border-[#0A0A0A]/12" : ""
                } ${
                  // Mobile: right border for even items
                  index % 2 === 0 ? "pr-6 border-r border-[#0A0A0A]/12" : "pl-6"
                } ${
                  // Bottom border except last row
                  index < 4 ? "border-b border-[#0A0A0A]/12" : ""
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0A0A0A]/35 mb-3 font-[Space_Grotesk]">
                  {spec.label}
                </p>
                <p className="text-xl md:text-2xl font-bold text-[#0A0A0A] leading-tight font-[Space_Grotesk]">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}
