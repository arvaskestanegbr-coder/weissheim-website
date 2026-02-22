import weissheimLogo from "../assets/weissheim-logo.webp";
import { NAV_ITEMS } from "../config/site";

interface SiteFooterProps {
  onOpenContact: () => void;
}

export default function SiteFooter({ onOpenContact }: SiteFooterProps) {
  return (
    <footer className="bg-[#0A0A0A] px-5 md:px-8 pt-16 pb-10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          <div className="md:col-span-2">
            <img src={weissheimLogo} alt="WEISSHEIM Logo" className="h-8 w-auto mb-5 invert opacity-60" />
            <p className="text-[14px] text-[#FAF8F3]/30 leading-6 max-w-xs font-[Space_Grotesk]">
              Premium Wäschesammler &amp; Wäschesortierer für mehr Ordnung bei dir zuhause.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FAF8F3]/30 mb-5 font-[Space_Grotesk]">Links</p>
            <ul className="space-y-3 text-[14px] text-[#FAF8F3]/35 font-[Space_Grotesk]">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="hover:text-[#FAF8F3]/70 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="hover:text-[#FAF8F3]/70 transition-colors"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FAF8F3]/30 mb-5 font-[Space_Grotesk]">Rechtliches</p>
            <ul className="space-y-3 text-[14px] text-[#FAF8F3]/35 font-[Space_Grotesk]">
              <li>
                <a href="/impressum.html" className="hover:text-[#FAF8F3]/70 transition-colors">
                  Impressum
                </a>
              </li>
              <li>
                <a href="/datenschutz.html" className="hover:text-[#FAF8F3]/70 transition-colors">
                  Datenschutzerklärung
                </a>
              </li>
              <li>
                <a href="/agb.html" className="hover:text-[#FAF8F3]/70 transition-colors">
                  AGB / Hinweise
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[#FAF8F3]/8 text-center text-[13px] text-[#FAF8F3]/20 font-[Space_Grotesk]">
          <p>© 2026 WEISSHEIM. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
