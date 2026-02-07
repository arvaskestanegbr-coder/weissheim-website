import { useEffect, useMemo, useState } from "react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import weissheimLogo from "./assets/weissheim-logo.webp";
import ContactForm from "./components/ContactForm";
import {
  Home,
  Package,
  Star,
  Mail,
  Menu,
  ShoppingCart,
  Check,
  ChevronDown,
  X,
  Shield,
  Truck,
  RefreshCw,
} from "lucide-react";
import produktWeiss from "./assets/produkt-weiss.webp";
import produktSchwarz from "./assets/produkt-schwarz.webp";
import Reveal from "./components/Reveal";

const Index = () => {
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "produkt" | "vorteile" | "ueber-uns"
  >("vorteile");

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
    const ids: Array<"produkt" | "vorteile" | "ueber-uns"> = [
      "produkt",
      "vorteile",
      "ueber-uns",
    ];

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        const top = visible[0];
        const id = top?.target?.id as "produkt" | "vorteile" | "ueber-uns" | undefined;
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
      "relative text-[11px] lg:text-xs font-semibold uppercase tracking-[0.2em] transition-colors";

    return (id: "produkt" | "vorteile" | "ueber-uns") => {
      const isActive = activeSection === id;
      return `${base} ${
        isActive
          ? "text-foreground"
          : "text-foreground/50 hover:text-foreground"
      }`;
    };
  }, [activeSection]);

  const specs = [
    { label: "Volumen", value: "200 Liter", detail: "Großzügiger Stauraum für die ganze Familie" },
    { label: "Fächer", value: "4 Taschen", detail: "Abnehmbar & individuell waschbar" },
    { label: "Material", value: "Oxford 600D", detail: "Reißfest, wasserabweisend & langlebig" },
    { label: "Rahmen", value: "Stahlrahmen", detail: "Verstärkte Konstruktion für maximale Stabilität" },
    { label: "Mobilität", value: "360° Rollen", detail: "Leichtgängig auf jedem Untergrund" },
    { label: "Ablage", value: "Echtholz", detail: "Elegante Ablagefläche als zusätzlicher Nutzen" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ─── Navigation ─── */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#fafaf8]/80 backdrop-blur-xl shadow-[0_1px_0_#e8e6e1] py-1"
            : "bg-transparent py-3 md:py-5"
        }`}>
        <div className="container mx-auto px-4 md:px-6 md:flex md:items-center md:justify-between">
          <div className="flex items-center justify-between md:block transition-all duration-300">
            <div className={`md:hidden w-10 h-10 ${scrolled ? "hidden" : "invisible"}`} />
            <img
              src={weissheimLogo}
              alt="WEISSHEIM Logo"
              className={`w-auto transition-all duration-500 ${
                scrolled ? "h-12 md:h-14 lg:h-16 -my-1" : "h-20 md:h-24 lg:h-28"
              }`}
            />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 ${
                scrolled
                  ? "bg-warm-100/60 hover:bg-warm-200/80 backdrop-blur-sm"
                  : "bg-white/80 hover:bg-white shadow-sm"
              }`}
              aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
            >
              <div className="relative h-5 w-5">
                <Menu className={`absolute inset-0 h-5 w-5 text-foreground transition-all duration-300 ${mobileMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}`} />
                <X className={`absolute inset-0 h-5 w-5 text-foreground transition-all duration-300 ${mobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}`} />
              </div>
            </button>
          </div>

          <div className="relative hidden md:flex gap-10 items-center ml-auto mr-8">
            <a href="#produkt" className={navLinkClass("produkt")}>Produkt</a>
            <a href="#vorteile" className={navLinkClass("vorteile")}>Vorteile</a>
            <a href="#ueber-uns" className={navLinkClass("ueber-uns")}>Details</a>
            <button
              type="button"
              onClick={() => setContactFormOpen(true)}
              className="relative text-[11px] lg:text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50 hover:text-foreground transition-colors"
            >
              Kontakt
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="default" className="px-7" asChild>
              <a
                href="https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jetzt kaufen
              </a>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}>
          <div className="container mx-auto px-4 pb-4">
            <div className="rounded-2xl p-5 mt-2 bg-white/80 backdrop-blur-xl shadow-lg border border-border/50">
              <div className="space-y-1">
                <a href="#produkt" onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground hover:text-accent transition-colors">
                  Produkt
                </a>
                <a href="#vorteile" onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground hover:text-accent transition-colors">
                  Vorteile
                </a>
                <a href="#ueber-uns" onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground hover:text-accent transition-colors">
                  Details
                </a>
                <button type="button"
                  onClick={() => { setMobileMenuOpen(false); setContactFormOpen(true); }}
                  className="block w-full text-left px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground hover:text-accent transition-colors">
                  Kontakt
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <Button size="lg" className="w-full" asChild>
                  <a href="https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C"
                    target="_blank" rel="noopener noreferrer">
                    Jetzt kaufen
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="pt-12 md:pt-28 pb-20 md:pb-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
            <Reveal from="left" distance={30}>
              <div className="max-w-xl">
                <span className="label-tag">Premium Wäscheorganisation</span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-3 text-foreground leading-[0.95]">
                  Ordnung,{" "}
                  <em className="italic font-normal">die man sieht.</em>
                </h1>
                <hr className="accent-line" />
                <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-8 font-light max-w-md">
                  Der WEISSHEIM Wäschesammler vereint 200&nbsp;L Volumen,
                  4&nbsp;abnehmbare Fächer und zeitloses Design –
                  für Haushalte mit Anspruch.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-base w-full sm:w-auto" asChild>
                    <a
                      href="https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} />
                      Auf Amazon entdecken
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="text-base w-full sm:w-auto" asChild>
                    <a href="#produkt">Mehr erfahren</a>
                  </Button>
                </div>

                {/* Trust Bar */}
                <div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-8">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-accent" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Premium Qualität</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck size={16} className="text-accent" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Schneller Versand</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw size={16} className="text-accent" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Einfache Rückgabe</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal from="right" distance={30} delayMs={150}>
              <div className="group relative mt-10 lg:mt-0 flex justify-center lg:justify-end bg-transparent overflow-visible">
                <div className="absolute inset-[-10%] rounded-full bg-warm-100 opacity-60 blur-3xl group-hover:opacity-80 transition-opacity duration-700" />
                <img
                  src={produktSchwarz}
                  alt="WEISSHEIM Wäschesammler – Schwarze Variante mit 4 Fächern und 200L Volumen"
                  className="relative z-10 w-full max-w-[580px] h-auto transform-gpu transition-transform duration-700 ease-out will-change-transform group-hover:-translate-y-3 group-hover:scale-[1.02]"
                  loading="eager"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── Trust / Social Proof Bar ─── */}
      <section className="py-14 md:py-16 px-4 bg-warm-gradient">
        <div className="container mx-auto max-w-5xl">
          <Reveal from="up" distance={16}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-serif font-bold text-foreground">200L</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">Volumen</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-serif font-bold text-foreground">4</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">Abnehmbare Fächer</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-serif font-bold text-foreground">600D</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">Oxford Material</p>
              </div>
              <div>
                <div className="flex justify-center gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">Premium Qualität</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── Features Section ─── */}
      <section id="vorteile" className="py-24 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <Reveal className="text-center mb-20" from="up" distance={24}>
            <div>
              <span className="label-tag">Vorteile</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2 text-foreground leading-[1.0]">
                Warum <em className="italic font-normal">WEISSHEIM?</em>
              </h2>
              <hr className="accent-line-center" />
              <p className="text-base md:text-lg text-muted-foreground font-light max-w-lg mx-auto">
                Durchdacht bis ins Detail – für alle, die bei Ordnung
                keine Kompromisse machen.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <Reveal from="up" distance={24} delayMs={0}>
              <Card className="p-10 group hover:shadow-[0_24px_60px_rgba(26,26,26,0.08)] hover:-translate-y-1.5">
                <div className="w-12 h-12 mb-6 bg-foreground rounded-xl flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                  <Home className="w-5 h-5 text-background" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-3 text-foreground">
                  Hygienisch &amp; durchdacht
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground font-light">
                  Hochwertige, waschbare Oxford 600D Taschen für maximale Hygiene.
                  Damit bleibt deine Wäsche frisch und geruchsfrei – jeden Tag.
                </p>
              </Card>
            </Reveal>

            <Reveal from="up" distance={24} delayMs={100}>
              <Card className="p-10 group hover:shadow-[0_24px_60px_rgba(26,26,26,0.08)] hover:-translate-y-1.5">
                <div className="w-12 h-12 mb-6 bg-foreground rounded-xl flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                  <Package className="w-5 h-5 text-background" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-3 text-foreground">
                  Flexible Mobilität
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground font-light">
                  360°-Rollen machen den Wäschesammler zum mobilen Begleiter –
                  ob im Badezimmer, Schlafzimmer oder beim Umzug.
                </p>
              </Card>
            </Reveal>

            <Reveal from="up" distance={24} delayMs={200}>
              <Card className="p-10 group hover:shadow-[0_24px_60px_rgba(26,26,26,0.08)] hover:-translate-y-1.5">
                <div className="w-12 h-12 mb-6 bg-foreground rounded-xl flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                  <Star className="w-5 h-5 text-background" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-3 text-foreground">
                  Ästhetischer Stauraum
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground font-light">
                  Elegante Echtholz-Ablage und verstärkter Stahlrahmen –
                  wirkt wie ein hochwertiges Möbelstück in deinem Zuhause.
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── Product Section ─── */}
      <section id="produkt" className="py-24 md:py-32 px-4 bg-warm-gradient">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
            <Reveal from="left" distance={30}>
              <div className="group relative flex justify-center overflow-visible">
                <div className="absolute inset-[-10%] rounded-full bg-warm-200/60 blur-3xl group-hover:bg-warm-200/80 transition-all duration-700" />
                <img
                  src={produktWeiss}
                  alt="WEISSHEIM Wäschesortierer – Weiße Variante mit abnehmbaren Oxford 600D Taschen"
                  className="relative z-10 w-full max-w-[520px] h-auto object-contain transform-gpu transition-transform duration-700 ease-out will-change-transform group-hover:-translate-y-3 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </Reveal>

            <Reveal from="right" distance={30} delayMs={150}>
              <div>
                <span className="label-tag">Das Produkt</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 text-foreground leading-[1.0]">
                  Wäschesammler{" "}
                  <em className="italic font-normal">mit System</em>
                </h2>
                <hr className="accent-line" />
                <p className="text-base md:text-lg text-muted-foreground mb-10 leading-8 font-light">
                  Mit dem WEISSHEIM Wäschesammler kombinierst du smartes Sortieren
                  mit elegantem Design. 4&nbsp;abnehmbare Oxford&nbsp;600D Taschen,
                  ein patentiertes Haken-System und 200&nbsp;L Volumen machen
                  Wäscheverwaltung stressfrei und effizient.
                </p>

                <div className="space-y-3 mb-10">
                  {[
                    "200 L Volumen – 4 abnehmbare Oxford 600D Taschen",
                    "Smartes Haken-System für zeitsparende Handhabung",
                    "Wäschekorb mit 360°-Rollen – mobil und flexibel",
                    "Elegante Echtholz-Ablage + verstärkter Stahlrahmen",
                    "Waschbare Taschen – hygienisch und geruchsfrei",
                    "Verfügbar in Schwarz, Beige und Himmelblau",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 mt-0.5 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-white" />
                      </div>
                      <span className="text-sm text-foreground font-light leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                <Button size="lg" asChild>
                  <a
                    href="https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Jetzt auf Amazon kaufen
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── Specs Section ─── */}
      <section id="ueber-uns" className="py-24 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <Reveal className="text-center mb-20" from="up" distance={24}>
            <div>
              <span className="label-tag">Spezifikationen</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2 text-foreground leading-[1.0]">
                Technische <em className="italic font-normal">Details</em>
              </h2>
              <hr className="accent-line-center" />
              <p className="text-base md:text-lg text-muted-foreground font-light max-w-lg mx-auto">
                Hochwertige Materialien und durchdachte Konstruktion
                für deinen Alltag.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {specs.map((spec, index) => (
              <Reveal key={spec.label} from="up" distance={24} delayMs={index * 80}>
                <div className="spec-card rounded-2xl border border-border bg-background p-7 shadow-sm hover:shadow-[0_16px_48px_rgba(26,26,26,0.06)] hover:-translate-y-1 transition-all duration-300">
                  <p className="text-[11px] text-accent uppercase tracking-[0.2em] font-semibold mb-2">{spec.label}</p>
                  <p className="text-2xl font-serif font-bold text-foreground mb-2">{spec.value}</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{spec.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── Dark CTA Section ─── */}
      <section className="py-24 md:py-32 px-4 bg-dark-section">
        <div className="container mx-auto max-w-4xl text-center">
          <Reveal from="up" distance={24}>
            <div>
              <span className="label-tag" style={{ color: '#d4b07a' }}>Jetzt starten</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-white leading-[1.0]">
                Bereit für{" "}
                <em className="italic font-normal text-accent-light">organisierte</em>{" "}
                Wäsche?
              </h2>
              <hr className="accent-line-center" />
              <p className="text-base md:text-lg text-warm-400 mb-12 leading-8 font-light max-w-lg mx-auto">
                Bestell jetzt deinen WEISSHEIM Wäschesammler und erlebe den
                Unterschied, den echte Qualität macht.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-base w-full sm:w-auto bg-accent hover:bg-accent-dark text-white border-0" asChild>
                  <a
                    href="https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Jetzt auf Amazon kaufen
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Contact Section ─── */}
      <section id="kontakt" className="py-24 md:py-28 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Reveal from="up" distance={24}>
            <div>
              <div className="w-16 h-16 mx-auto mb-6 bg-warm-100 rounded-full flex items-center justify-center border border-border">
                <Mail className="w-7 h-7 text-accent" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 text-foreground leading-[1.0]">
                Hast du <em className="italic font-normal">Fragen?</em>
              </h2>
              <hr className="accent-line-center" />
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-8 font-light max-w-md mx-auto">
                Wir sind für dich da. Kontaktiere uns gern bei Fragen zu
                unseren Produkten oder deiner Bestellung.
              </p>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setContactFormOpen(true)}
              >
                Kontakt aufnehmen
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Kontaktformular (Dialog) */}
      <ContactForm
        open={contactFormOpen}
        onOpenChange={setContactFormOpen}
      />

      {scrolled && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-5 md:bottom-8 md:right-8 bg-foreground text-background h-11 w-11 flex items-center justify-center rounded-full shadow-[0_8px_30px_rgba(26,26,26,0.2)] hover:shadow-[0_12px_40px_rgba(26,26,26,0.25)] hover:-translate-y-0.5 hover:bg-accent transition-all transform-gpu z-40"
          aria-label="Nach oben scrollen"
        >
          <ChevronDown size={20} className="rotate-180" />
        </button>
      )}

      {/* ─── Footer ─── */}
      <footer className="py-16 px-4 bg-foreground text-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-10 mb-14">
            <div className="md:col-span-2">
              <img
                src={weissheimLogo}
                alt="WEISSHEIM Logo"
                className="h-14 w-auto mb-5 brightness-0 invert"
              />
              <p className="text-warm-400 text-sm leading-relaxed font-light max-w-sm">
                Premium Wäschesammler &amp; Wäschesortierer für mehr Ordnung
                und Stil in deinem Zuhause. Designed für anspruchsvolle Haushalte.
              </p>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold mb-5 text-warm-300 uppercase tracking-[0.2em]">Navigation</h4>
              <ul className="space-y-3 text-sm text-warm-400">
                <li>
                  <a href="#produkt" className="hover:text-white transition-colors font-light">Produkt</a>
                </li>
                <li>
                  <a href="#vorteile" className="hover:text-white transition-colors font-light">Vorteile</a>
                </li>
                <li>
                  <a href="#ueber-uns" className="hover:text-white transition-colors font-light">Details</a>
                </li>
                <li>
                  <button type="button" onClick={() => setContactFormOpen(true)}
                    className="hover:text-white transition-colors font-light">
                    Kontakt
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold mb-5 text-warm-300 uppercase tracking-[0.2em]">Rechtliches</h4>
              <ul className="space-y-3 text-sm text-warm-400">
                <li>
                  <a href="/impressum.html" className="hover:text-white transition-colors font-light">Impressum</a>
                </li>
                <li>
                  <a href="/datenschutz.html" className="hover:text-white transition-colors font-light">Datenschutzerklärung</a>
                </li>
                <li>
                  <a href="/agb.html" className="hover:text-white transition-colors font-light">AGB / Hinweise</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-warm-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-warm-500 font-light">&copy; 2024 WEISSHEIM. Alle Rechte vorbehalten.</p>
            <p className="text-xs text-warm-500 font-light">Designed with precision in Germany.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
