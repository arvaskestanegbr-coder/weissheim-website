import { Menu, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { AMAZON_PRODUCT_URL, NAV_ITEMS, type SectionId } from "../config/site";
import weissheimLogo from "../assets/weissheim-logo.webp";

interface SiteHeaderProps {
  scrolled: boolean;
  mobileMenuOpen: boolean;
  activeSection: SectionId;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;
  onOpenContact: () => void;
  onAmazonClick: (source: string) => void;
}

const baseLinkClass =
  "relative text-[15px] lg:text-base font-medium tracking-tight transition-colors";

function navLinkClass(activeSection: SectionId, section: SectionId): string {
  return `${baseLinkClass} ${
    activeSection === section
      ? "text-foreground"
      : "text-foreground/70 hover:text-foreground"
  }`;
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-md shadow-sm py-1"
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
            }`}
            width={400}
            height={252}
            decoding="async"
          />
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm shadow-md hover:scale-105 active:scale-95 transition-all duration-200 ${
              scrolled ? "bg-white/60 hover:bg-white/80" : "bg-white/80 hover:bg-white"
            }`}
            aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <div className="relative h-5 w-5">
              <Menu
                className={`absolute inset-0 h-5 w-5 text-foreground transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                className={`absolute inset-0 h-5 w-5 text-foreground transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                }`}
              />
            </div>
          </button>
        </div>

        <div className="relative hidden md:flex gap-8 items-center ml-auto mr-6">
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={navLinkClass(activeSection, item.id)}>
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onOpenContact}
            className="relative text-[15px] lg:text-base font-medium tracking-tight text-foreground/70 hover:text-foreground transition-colors"
          >
            Kontakt
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="default" className="px-6" asChild>
            <a
              href={AMAZON_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onAmazonClick("header_desktop")}
              data-analytics-id="amazon-header-desktop"
            >
              Jetzt kaufen
            </a>
          </Button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 pb-4">
          <div className="rounded-2xl p-4 mt-2 bg-white/70 backdrop-blur-md shadow-lg">
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
              <Button size="lg" className="w-full" asChild>
                <a
                  href={AMAZON_PRODUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onAmazonClick("header_mobile")}
                  data-analytics-id="amazon-header-mobile"
                >
                  Jetzt kaufen
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
