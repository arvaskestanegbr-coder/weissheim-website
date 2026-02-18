import { ArrowUpRight, BadgeCheck } from "lucide-react";
import {
  TESTSIEGER_DOMAIN,
  TESTSIEGER_PERIOD,
  TESTSIEGER_RATING,
  TESTSIEGER_URL,
} from "../config/site";

interface TestsiegerBannerProps {
  onClick: () => void;
}

export default function TestsiegerBanner({ onClick }: TestsiegerBannerProps) {
  return (
    <a
      href={TESTSIEGER_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      data-analytics-id="testsieger-hero-banner"
      className="group block w-full max-w-2xl rounded-[28px] overflow-hidden border border-slate-200 shadow-[0_18px_45px_rgba(15,23,42,0.10)] hover:-translate-y-0.5 hover:shadow-[0_24px_58px_rgba(15,23,42,0.14)] transition-all"
      aria-label="Zum externen Testbericht bei testsieger-online.de"
    >
      <div className="bg-gradient-to-r from-[#1f5fd4] to-[#2a7bed] px-6 py-4 text-center">
        <span className="text-sm md:text-base font-semibold tracking-tight text-white/95">
          {TESTSIEGER_DOMAIN}
        </span>
      </div>

      <div className="bg-black border-y-4 border-[#d7bf84] px-4 py-4 md:py-5 text-center">
        <span className="text-[clamp(1.5rem,4.2vw,2.85rem)] font-black tracking-tight text-white leading-none">
          {TESTSIEGER_RATING}
        </span>
      </div>

      <div className="bg-gradient-to-r from-[#1f5fd4] via-[#236be1] to-[#2b84f8] px-6 py-5 md:py-6">
        <div className="flex items-center justify-between gap-4">
          <div className="text-white">
            <p className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Wäschesammler
            </p>
            <p className="mt-1 text-xl md:text-2xl font-medium text-white/90">Weissheim</p>
            <p className="mt-4 text-base md:text-lg font-semibold">
              Testzeitraum: <span className="font-extrabold">{TESTSIEGER_PERIOD}</span>
            </p>
          </div>

          <div className="flex flex-col items-center shrink-0">
            <div className="h-16 w-16 md:h-20 md:w-20 rounded-full border-4 border-[#d7bf84] bg-white/95 text-[#1f5fd4] flex items-center justify-center shadow-md">
              <BadgeCheck className="h-8 w-8 md:h-10 md:w-10" />
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-white/95 text-sm md:text-base">
          <span className="font-medium">Zum Testbericht</span>
          <span className="inline-flex items-center gap-1 font-semibold">
            ansehen <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </a>
  );
}
