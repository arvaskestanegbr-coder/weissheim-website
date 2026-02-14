import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import weissheimLogo from "../../assets/weissheim-logo.webp";
import { AMAZON_URL, SECTION_IDS, type SectionId } from "../../constants";

interface NavbarProps {
  onContactOpen: () => void;
}

export default function Navbar({ onContactOpen }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("vorteile");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const elements = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        const top = visible[0];
        const id = top?.target?.id as SectionId | undefined;
        if (id) setActiveSection(id);
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-20% 0px -55% 0px",
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const navLinkClass = useMemo(() => {
    const base =
      "relative text-[15px] lg:text-base font-medium tracking-tight transition-colors";

    return (id: SectionId) => {
      const isActive = activeSection === id;
      return `${base} ${
        isActive
          ? "text-foreground"
          : "text-foreground/70 hover:text-foreground"
      }`;
    };
  }, [activeSection]);

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
          />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm shadow-md hover:scale-105 active:scale-95 transition-all duration-200 ${
              scrolled
                ? "bg-white/60 hover:bg-white/80"
                : "bg-white/80 hover:bg-white"
            }`}
            aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
          >
            <div className="relative h-5 w-5">
              <Menu
                className={`absolute inset-0 h-5 w-5 text-foreground transition-all duration-300 ${
                  mobileMenuOpen
                    ? "opacity-0 rotate-90 scale-0"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                className={`absolute inset-0 h-5 w-5 text-foreground transition-all duration-300 ${
                  mobileMenuOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-0"
                }`}
              />
            </div>
          </button>
        </div>

        <div className="relative hidden md:flex gap-8 items-center ml-auto mr-6">
          <a href="#produkt" className={navLinkClass("produkt")}>Produkt</a>
          <a href="#vorteile" className={navLinkClass("vorteile")}>Vorteile</a>
          <a href="#ueber-uns" className={navLinkClass("ueber-uns")}>Details</a>
          <button
            type="button"
            onClick={onContactOpen}
            className="relative text-[15px] lg:text-base font-medium tracking-tight text-foreground/70 hover:text-foreground transition-colors"
          >
            Kontakt
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="default" className="px-6" asChild>
            <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer">
              Jetzt kaufen
            </a>
          </Button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 pb-4">
          <div className="rounded-2xl p-4 mt-2 bg-white/70 backdrop-blur-md shadow-lg">
            <div className="space-y-1">
              <a
                href="#produkt"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-gray-100 rounded-xl transition-colors"
              >
                Produkt
              </a>
              <a
                href="#vorteile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-gray-100 rounded-xl transition-colors"
              >
                Vorteile
              </a>
              <a
                href="#ueber-uns"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-gray-100 rounded-xl transition-colors"
              >
                Details
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactOpen();
                }}
                className="block w-full text-left px-4 py-3 text-lg font-medium text-foreground hover:bg-gray-100 rounded-xl transition-colors"
              >
                Kontakt
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <Button size="lg" className="w-full" asChild>
                <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer">
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
