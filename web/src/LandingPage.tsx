import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ContactForm from "./components/ContactForm";
import Preloader from "./components/Preloader";
import { SECTION_IDS, type SectionId } from "./config/site";
import { trackAmazonClick, trackContactOpen } from "./lib/analytics";
import ContactSection from "./sections/ContactSection";
import FaqSection from "./sections/FaqSection";
import FeaturesSection from "./sections/FeaturesSection";
import FinalCtaSection from "./sections/FinalCtaSection";
import HeroSection from "./sections/HeroSection";
import MobileStickyCta from "./sections/MobileStickyCta";
import ProductSection from "./sections/ProductSection";
import SiteFooter from "./sections/SiteFooter";
import SiteHeader from "./sections/SiteHeader";
import SpecsSection from "./sections/SpecsSection";

const Index = () => {
  const [contactFormOpen, setContactFormOpen] = useState(false);
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
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        const topEntry = visible[0];
        const id = topEntry?.target?.id as SectionId | undefined;

        if (id) {
          setActiveSection(id);
        }
      },
      {
        root: null,
        threshold: [0, 0.1, 0.2, 0.35, 0.5],
        rootMargin: "-15% 0px -45% 0px",
      },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const openContactModal = (source: string) => {
    trackContactOpen(source);
    setContactFormOpen(true);
  };

  return (
    <>
      <Preloader />
      <div className="min-h-screen bg-[#FAF8F3] pb-24 md:pb-0">
        <a href="#vorteile" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-[#0A0A0A] focus:text-[#FAF8F3] focus:px-4 focus:py-2">
          Zum Inhalt springen
        </a>
        <SiteHeader
          scrolled={scrolled}
          mobileMenuOpen={mobileMenuOpen}
          activeSection={activeSection}
          onToggleMobileMenu={() => setMobileMenuOpen((open) => !open)}
          onCloseMobileMenu={() => setMobileMenuOpen(false)}
          onOpenContact={() => openContactModal("header_navigation")}
          onAmazonClick={trackAmazonClick}
        />

        <main>
          <HeroSection onAmazonClick={trackAmazonClick} />
          <FeaturesSection />
          <ProductSection onAmazonClick={trackAmazonClick} />
          <SpecsSection />
          <ContactSection onOpenContact={() => openContactModal("contact_section")} />
          <FaqSection />
          <FinalCtaSection onAmazonClick={trackAmazonClick} />
        </main>

        <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-24 right-5 md:bottom-8 md:right-8 h-11 w-11 flex items-center justify-center border border-[#0A0A0A]/15 bg-[#FAF8F3] text-[#0A0A0A]/50 hover:border-[#0A0A0A]/30 hover:text-[#0A0A0A] transition-all duration-300 transform-gpu z-40 shadow-sm ${scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          aria-label="Nach oben scrollen"
        >
          <ChevronDown size={18} className="rotate-180" />
        </button>

        <MobileStickyCta
          onAmazonClick={trackAmazonClick}
          onOpenContact={() => openContactModal("sticky_mobile")}
        />

        <SiteFooter onOpenContact={() => openContactModal("footer")} />
      </div>
    </>
  );
};

export default Index;
