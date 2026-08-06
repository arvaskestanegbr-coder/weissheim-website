import weissheimLogo from "../assets/weissheim-logo.webp";
import { NAV_ITEMS } from "../config/site";

interface SiteFooterProps {
  onOpenContact: () => void;
}

export default function SiteFooter({ onOpenContact }: SiteFooterProps) {
  return (
    <footer className="relative bg-[#0A0A0A] px-5 md:px-8 pt-16 pb-10 overflow-hidden">
      {/* Dot texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #FAF8F3 0.5px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container relative mx-auto max-w-6xl">
        {/* Gold divider at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9B99A]/20 to-transparent" />

        <div className="grid md:grid-cols-4 gap-10 mb-14">
          <div className="md:col-span-2">
            <img src={weissheimLogo} alt="WEISSHEIM Logo" className="h-20 md:h-28 w-auto mb-5 invert opacity-60" width={400} height={252} loading="lazy" decoding="async" />
            <p className="text-[14px] text-[#FAF8F3]/60 leading-6 max-w-xs font-[Space_Grotesk]">
              Premium Wäschesammler &amp; Wäschesortierer für mehr Ordnung bei dir zuhause.
            </p>
          </div>
          <div className="md:pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FAF8F3]/60 mb-5 font-[Space_Grotesk]">Links</p>
            <ul className="space-y-3 text-[14px] text-[#FAF8F3]/60 font-[Space_Grotesk]">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="rounded-sm hover:text-[#C9B99A] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9B99A]">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="rounded-sm hover:text-[#C9B99A] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9B99A]"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>
          <div className="md:pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FAF8F3]/60 mb-5 font-[Space_Grotesk]">Rechtliches</p>
            <ul className="space-y-3 text-[14px] text-[#FAF8F3]/60 font-[Space_Grotesk]">
              <li>
                <a href="/impressum.html" className="rounded-sm hover:text-[#C9B99A] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9B99A]">
                  Impressum
                </a>
              </li>
              <li>
                <a href="/datenschutz.html" className="rounded-sm hover:text-[#C9B99A] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9B99A]">
                  Datenschutzerklärung
                </a>
              </li>
              <li>
                <a href="/agb.html" className="rounded-sm hover:text-[#C9B99A] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9B99A]">
                  AGB / Hinweise
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[#FAF8F3]/8 text-center">
          <p className="text-[13px] text-[#FAF8F3]/50 font-[Space_Grotesk]">© 2026 WEISSHEIM. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
