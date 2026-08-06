import { useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { AMAZON_PRODUCT_URL, NAV_ITEMS, type SectionId } from "../config/site";
import { prefersReducedMotion } from "../lib/motion";
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

/* ─── Nav link with underline indicators ─── */
function NavLink({
  href,
  active,
  onClick,
  children,
}: {
  href?: string;
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const className = `group/nav relative rounded-sm text-[13px] font-medium tracking-wider uppercase transition-colors duration-300 font-[Space_Grotesk] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A0A0A] ${
    active ? "text-[#0A0A0A]" : "text-[#0A0A0A]/60 hover:text-[#0A0A0A]"
  }`;

  const indicator = (
    <>
      {/* Hover underline — slides in from center */}
      <span className="absolute -bottom-1 left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-[#C9B99A]/40 transition-all duration-300 ease-out group-hover/nav:w-full" />
      {/* Active underline — gold, always visible */}
      {active && (
        <span className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-gradient-to-r from-[#C9B99A] to-[#A09178]" />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={className} onClick={onClick} aria-current={active ? "location" : undefined}>
        {children}
        {indicator}
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick} aria-current={active ? "location" : undefined}>
      {children}
      {indicator}
    </button>
  );
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
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);
  const prevMobileOpen = useRef(false);

  /* ─── Entrance animation ─── */
  useEffect(() => {
    if (prefersReducedMotion()) {
      if (logoRef.current) gsap.set(logoRef.current, { opacity: 1, x: 0, filter: "blur(0px)" });
      if (linksRef.current) gsap.set(linksRef.current.children, { opacity: 1, y: 0, filter: "blur(0px)" });
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1, x: 0, filter: "blur(0px)" });
      return;
    }

    if (logoRef.current) gsap.set(logoRef.current, { x: -12 });
    if (ctaRef.current) gsap.set(ctaRef.current, { x: 12 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.05 });

      if (logoRef.current) {
        tl.to(logoRef.current,
          { x: 0, duration: 0.7, ease: "power2.out" },
        );
      }

      if (linksRef.current) {
        const links = linksRef.current.children;
        tl.fromTo(links,
          { y: -8 },
          { y: 0, duration: 0.5, ease: "power2.out", stagger: 0.06 },
          "-=0.4",
        );
      }

      if (ctaRef.current) {
        tl.to(ctaRef.current,
          { x: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        );
      }
    });

    return () => { ctx.revert(); };
  }, []);

  /* ─── Mobile menu stagger animation ─── */
  useEffect(() => {
    const content = mobileContentRef.current;
    let tween: gsap.core.Tween | undefined;
    let focusTimer: number | undefined;

    if (mobileMenuOpen && content) {
      const items = content.querySelectorAll(".mobile-nav-item");
      const reduceMotion = prefersReducedMotion();

      if (reduceMotion) {
        gsap.set(items, { opacity: 1, x: 0 });
      } else {
        tween = gsap.fromTo(items,
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", stagger: 0.05, delay: 0.1 },
        );
      }

      focusTimer = window.setTimeout(() => {
        content.querySelector<HTMLElement>(".mobile-nav-item")?.focus({ preventScroll: true });
      }, reduceMotion ? 0 : 120);
    } else if (prevMobileOpen.current) {
      mobileToggleRef.current?.focus({ preventScroll: true });
    }

    prevMobileOpen.current = mobileMenuOpen;

    return () => {
      tween?.kill();
      if (focusTimer !== undefined) window.clearTimeout(focusTimer);
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      ref={navRef}
      aria-label="Hauptnavigation"
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FAF8F3]/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      {/* Bottom border — fades in on scroll */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0A0A0A]/8 to-transparent transition-opacity duration-500"
        style={{ opacity: scrolled ? 1 : 0 }}
      />

      <div className="container mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo — klickbar, scrollt nach oben */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" }); }}
          className="flex-shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
          aria-label="Zur Startseite"
        >
          <img
            ref={logoRef}
            src={weissheimLogo}
            alt="WEISSHEIM Logo"
            className="h-20 md:h-28 w-auto cursor-pointer"
            width={400}
            height={252}
            decoding="async"
          />
        </a>

        {/* Desktop nav — magnetic links with active indicator */}
        <div ref={linksRef} className="hidden md:flex items-center gap-8 ml-auto mr-10">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              href={`#${item.id}`}
              active={activeSection === item.id}
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink onClick={onOpenContact} active={activeSection === "kontakt"}>
            Kontakt
          </NavLink>
        </div>

        {/* Desktop CTA — with shimmer */}
        <a
          ref={ctaRef}
          href={AMAZON_PRODUCT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group hidden md:inline-flex items-center justify-center bg-[#0A0A0A] text-[#FAF8F3] px-6 py-2.5 text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#0A0A0A]/80 overflow-hidden relative font-[Space_Grotesk] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
          onClick={() => onAmazonClick("header_desktop")}
          data-analytics-id="amazon-header-desktop"
        >
          <span className="relative z-10">Jetzt kaufen</span>
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 animate-shimmer" style={{ background: "linear-gradient(105deg, transparent 30%, rgba(201,185,154,0.2) 50%, transparent 70%)" }} />
          </div>
        </a>

        {/* Mobile hamburger */}
        <button
          ref={mobileToggleRef}
          type="button"
          onClick={onToggleMobileMenu}
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-sm text-[#0A0A0A] hover:text-[#0A0A0A]/60 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
          aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu — staggered reveal */}
      <div
        id="mobile-navigation"
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
        className={`md:hidden transition-[max-height,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
          mobileMenuOpen
            ? "max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div ref={mobileContentRef} className="bg-[#FAF8F3] border-t border-[#0A0A0A]/8 px-5 py-5 space-y-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={onCloseMobileMenu}
              aria-current={activeSection === item.id ? "location" : undefined}
              className={`mobile-nav-item flex items-center py-3 text-[13px] tracking-wider uppercase transition-colors font-[Space_Grotesk] ${
                activeSection === item.id
                  ? "text-[#0A0A0A] font-bold"
                  : "text-[#0A0A0A]/60 font-medium hover:text-[#0A0A0A]"
              } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]`}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => { onCloseMobileMenu(); onOpenContact(); }}
            className="mobile-nav-item flex w-full rounded-sm text-left py-3 text-[13px] font-medium tracking-wider uppercase text-[#0A0A0A]/60 hover:text-[#0A0A0A] transition-colors font-[Space_Grotesk] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
          >
            Kontakt
          </button>
          <div className="mobile-nav-item pt-3">
            <a
              href={AMAZON_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-full items-center justify-center bg-[#0A0A0A] text-[#FAF8F3] py-3.5 text-[13px] font-semibold tracking-wider uppercase overflow-hidden font-[Space_Grotesk] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
              onClick={() => { onCloseMobileMenu(); onAmazonClick("header_mobile"); }}
              data-analytics-id="amazon-header-mobile"
            >
              <span className="relative z-10">Jetzt kaufen</span>
              <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 animate-shimmer" style={{ background: "linear-gradient(105deg, transparent 30%, rgba(201,185,154,0.2) 50%, transparent 70%)" }} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
