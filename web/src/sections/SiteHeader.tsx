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

function navLinkClass(
  activeSection: SectionId,
  section: SectionId,
  useLightText: boolean,
): string {
  const base =
    "relative text-[15px] font-medium tracking-tight transition-colors";
  if (useLightText) {
    return `${base} ${
      activeSection === section ? "text-white" : "text-white/55 hover:text-white"
    }`;
  }
  return `${base} ${
    activeSection === section
      ? "text-foreground"
      : "text-foreground/60 hover:text-foreground"
  }`;
}

export default function SiteHeader({
  scrolled,
  heroIsDark,
  mobileMenuOpen,
  activeSection,
  onToggleMobileMenu,
  onCloseMobileMenu,
  onOpenContact,
  onAmazonClick,
}: SiteHeaderProps) {
  const useLightText = !scrolled && !!heroIsDark;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-1"
          : "bg-transparent py-2 md:py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 md:flex md:items-center md:justify-between">
        <div className="flex items-center justify-between md:block transition-all duration-300">
          <div className={`md:hidden w-10 h-10 ${scrolled ? "hidden" : "invisible"}`} />
          <img
            src={weissheimLogo}
            alt="WEISSHEIM Logo"
            className={`w-auto transition-all duration-300 ${
              scrolled ? "h-14 md:h-16 lg:h-20 -my-2" : "h-24 md:h-28 lg:h-32"
            } ${useLightText ? "invert brightness-200" : ""}`}
            width={400}
            height={252}
            decoding="async"
          />
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm shadow-md hover:scale-105 active:scale-95 transition-all duration-200 ${
              scrolled
                ? "bg-white/60 hover:bg-white/80"
                : useLightText
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-white/80 hover:bg-white"
            }`}
            aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <div className="relative h-5 w-5">
              <Menu
                className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                  useLightText ? "text-white" : "text-foreground"
                } ${
                  mobileMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                  useLightText ? "text-white" : "text-foreground"
                } ${
                  mobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                }`}
              />
            </div>
          </button>
        </div>

        <div className="relative hidden md:flex gap-8 items-center ml-auto mr-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={navLinkClass(activeSection, item.id, useLightText)}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onOpenContact}
            className={`relative text-[15px] font-medium tracking-tight transition-colors ${
              useLightText
                ? "text-white/55 hover:text-white"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Kontakt
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {useLightText ? (
            <a
              href={AMAZON_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#87CEEB] px-5 py-2 text-sm font-semibold text-[#0C1628] transition-all hover:bg-[#A8DCF0]"
              onClick={() => onAmazonClick("header_desktop")}
              data-analytics-id="amazon-header-desktop"
            >
              Jetzt kaufen
            </a>
          ) : (
            <a
              href={AMAZON_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-all hover:bg-foreground/80"
              onClick={() => onAmazonClick("header_desktop")}
              data-analytics-id="amazon-header-desktop"
            >
              Jetzt kaufen
            </a>
          )}
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 pb-4">
          <div className="rounded-2xl p-4 mt-2 bg-white/90 backdrop-blur-md shadow-lg">
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={onCloseMobileMenu}
                  className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-gray-100 rounded-xl transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  onCloseMobileMenu();
                  onOpenContact();
                }}
                className="block w-full text-left px-4 py-3 text-lg font-medium text-foreground hover:bg-gray-100 rounded-xl transition-colors"
              >
                Kontakt
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <a
                href={AMAZON_PRODUCT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-full bg-foreground py-3 text-base font-semibold text-background"
                onClick={() => onAmazonClick("header_mobile")}
                data-analytics-id="amazon-header-mobile"
              >
                Jetzt kaufen
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
