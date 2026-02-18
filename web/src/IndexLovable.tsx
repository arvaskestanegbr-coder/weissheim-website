import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ContactForm from "./components/ContactForm";
import { SECTION_IDS, type SectionId } from "./config/site";
import { trackAmazonClick, trackContactOpen } from "./lib/analytics";
import ContactSection from "./sections/ContactSection";
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
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-20% 0px -55% 0px",
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
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <SiteHeader
        scrolled={scrolled}
        mobileMenuOpen={mobileMenuOpen}
        activeSection={activeSection}
        onToggleMobileMenu={() => setMobileMenuOpen((open) => !open)}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
        onOpenContact={() => openContactModal("header_navigation")}
        onAmazonClick={trackAmazonClick}
      />

      <HeroSection onAmazonClick={trackAmazonClick} />
      <FeaturesSection />
      <ProductSection onAmazonClick={trackAmazonClick} />
      <SpecsSection />
      <ContactSection onOpenContact={() => openContactModal("contact_section")} />
      <FinalCtaSection onAmazonClick={trackAmazonClick} />

      <ContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />

      {scrolled && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-5 md:bottom-8 md:right-8 bg-primary text-primary-foreground h-12 w-12 flex items-center justify-center rounded-full shadow-[0_14px_40px_rgba(15,23,42,0.18)] hover:shadow-[0_18px_55px_rgba(15,23,42,0.22)] hover:-translate-y-0.5 hover:bg-primary/90 transition-all transform-gpu z-40"
          aria-label="Nach oben scrollen"
        >
          <ChevronDown size={24} className="rotate-180" />
        </button>
      )}

      <MobileStickyCta
        onAmazonClick={trackAmazonClick}
        onOpenContact={() => openContactModal("sticky_mobile")}
      />

      <SiteFooter onOpenContact={() => openContactModal("footer")} />
    </div>
  );
};

export default Index;
