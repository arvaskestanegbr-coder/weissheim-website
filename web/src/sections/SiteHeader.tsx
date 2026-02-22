import { Menu, X } from "lucide-react";
import { AMAZON_PRODUCT_URL, NAV_ITEMS, type SectionId } from "../config/site";
import weissheimLogo from "../assets/weissheim-logo-transparent.webp";

interface SiteHeaderProps {
  scrolled: boolean;
  heroIsDark?: boolean;
  mobileMenuOpen: boolean;
  activeSection: SectionId;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;
  onOpenContact: () => void;
  onAmazonClick: (source: string) => void;
}

export default function SiteHeader({
  scrolled,
  mobileMenuOpen,
  activeSection,
  onToggleMobileMenu,
  onCloseMobileMenu,
  onOpenContact,
  onAmazonClick,
}: SiteHeaderProps) {
  return (
    <nav
      className={`sticky top-0 z-50 bg-black border-b-[3px] border-black transition-all duration-150 ${
        scrolled ? "shadow-[0_4px_0_#000]" : ""
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <img
          src={weissheimLogo}
          alt="WEISSHEIM Logo"
          className="h-10 md:h-12 w-auto invert"
          width={400}
          height={252}
          decoding="async"
        />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 ml-auto mr-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-[14px] font-medium uppercase tracking-widest transition-colors ${
                activeSection === item.id
                  ? "text-[#87CEEB]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onOpenContact}
            className="text-[14px] font-medium uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          >
            Kontakt
          </button>
        </div>

        {/* Desktop CTA */}
        <a
          href={AMAZON_PRODUCT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center justify-center border-[3px] border-[#87CEEB] bg-[#87CEEB] px-5 py-2 text-sm font-bold text-black uppercase tracking-wide shadow-[3px_3px_0_#fff] hover:shadow-[5px_5px_0_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
          onClick={() => onAmazonClick("header_desktop")}
          data-analytics-id="amazon-header-desktop"
        >
          Jetzt kaufen
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center border-[2px] border-white text-white hover:bg-white hover:text-black transition-colors"
          aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        className={`md:hidden overflow-hidden transition-all duration-200 ease-in-out border-t-[3px] border-white/20 ${
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="bg-black px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={onCloseMobileMenu}
              className={`block px-4 py-3 text-base font-medium uppercase tracking-widest transition-colors border-l-[3px] ${
                activeSection === item.id
                  ? "border-[#87CEEB] text-[#87CEEB]"
                  : "border-transparent text-white/60 hover:text-white hover:border-white/40"
              }`}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => { onCloseMobileMenu(); onOpenContact(); }}
            className="block w-full text-left px-4 py-3 text-base font-medium uppercase tracking-widest text-white/60 hover:text-white border-l-[3px] border-transparent hover:border-white/40 transition-colors"
          >
            Kontakt
          </button>
          <div className="pt-3">
            <a
              href={AMAZON_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center border-[3px] border-[#87CEEB] bg-[#87CEEB] py-3 text-sm font-bold text-black uppercase tracking-wide shadow-[3px_3px_0_#fff]"
              onClick={() => onAmazonClick("header_mobile")}
              data-analytics-id="amazon-header-mobile"
            >
              Jetzt kaufen
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
