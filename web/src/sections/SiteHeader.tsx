import { Menu, X } from "lucide-react";
import { AMAZON_PRODUCT_URL, NAV_ITEMS, type SectionId } from "../config/site";
import weissheimLogo from "../assets/weissheim-logo.webp";

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
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#0A0A0A]/8 py-0"
          : "bg-transparent py-0"
      }`}
    >
      <div className="container mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <img
          src={weissheimLogo}
          alt="WEISSHEIM Logo"
          className="h-12 md:h-14 w-auto"
          width={400}
          height={252}
          decoding="async"
        />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 ml-auto mr-10">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-[13px] font-medium tracking-wider uppercase transition-colors duration-200 ${
                activeSection === item.id
                  ? "text-[#0A0A0A]"
                  : "text-[#0A0A0A]/45 hover:text-[#0A0A0A]"
              }`}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onOpenContact}
            className="text-[13px] font-medium tracking-wider uppercase text-[#0A0A0A]/45 hover:text-[#0A0A0A] transition-colors duration-200"
          >
            Kontakt
          </button>
        </div>

        {/* Desktop CTA */}
        <a
          href={AMAZON_PRODUCT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center justify-center bg-[#0A0A0A] text-[#FAF8F3] px-6 py-2.5 text-[13px] font-semibold tracking-wider uppercase transition-all duration-200 hover:bg-[#0A0A0A]/80"
          onClick={() => onAmazonClick("header_desktop")}
          data-analytics-id="amazon-header-desktop"
        >
          Jetzt kaufen
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center text-[#0A0A0A] hover:text-[#0A0A0A]/60 transition-colors"
          aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="bg-[#FAF8F3] border-t border-[#0A0A0A]/8 px-5 py-5 space-y-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={onCloseMobileMenu}
              className={`block py-3 text-[13px] font-medium tracking-wider uppercase transition-colors ${
                activeSection === item.id
                  ? "text-[#0A0A0A]"
                  : "text-[#0A0A0A]/45 hover:text-[#0A0A0A]"
              }`}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => { onCloseMobileMenu(); onOpenContact(); }}
            className="block w-full text-left py-3 text-[13px] font-medium tracking-wider uppercase text-[#0A0A0A]/45 hover:text-[#0A0A0A] transition-colors"
          >
            Kontakt
          </button>
          <div className="pt-3">
            <a
              href={AMAZON_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center bg-[#0A0A0A] text-[#FAF8F3] py-3.5 text-[13px] font-semibold tracking-wider uppercase"
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
