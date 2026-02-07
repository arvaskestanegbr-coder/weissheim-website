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
      "relative text-[13px] lg:text-sm font-semibold uppercase tracking-[0.15em] transition-colors";

    return (id: "produkt" | "vorteile" | "ueber-uns") => {
      const isActive = activeSection === id;
      return `${base} ${
        isActive
          ? "text-foreground"
          : "text-foreground/70 hover:text-foreground"
      }`;
    };
  }, [activeSection]);

  const specs = [
    { label: "Volumen", value: "200 Liter", icon: "📦" },
    { label: "Fächer", value: "4 abnehmbare Taschen", icon: "🗂️" },
    { label: "Material", value: "Oxford 600D", icon: "🧵" },
    { label: "Rahmen", value: "Stabiler Stahlrahmen", icon: "🔩" },
    { label: "Mobilität", value: "Mit Rollen", icon: "🛞" },
    { label: "Ablage", value: "Holz-Ablagefläche", icon: "🪵" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/70 backdrop-blur-md shadow-sm py-1"
            : "bg-transparent py-2 md:py-4"
        }`}>
        <div className="container mx-auto px-4 md:px-6 md:flex md:items-center md:justify-between">
          {/* Mobile: Logo zentriert, Button rechts | Desktop: Logo links */}
          <div className={`flex items-center justify-between md:block transition-all duration-300`}>
            {/* Placeholder links für Layout-Balance (Mobile) */}
            <div className={`md:hidden w-10 h-10 ${scrolled ? "hidden" : "invisible"}`} />
            <img
              src={weissheimLogo}
              alt="WEISSHEIM Logo"
              className={`w-auto transition-all duration-300 ${
                scrolled ? "h-14 md:h-16 lg:h-20 -my-2" : "h-24 md:h-28 lg:h-32"
              }`}
            />
            {/* Hamburger Button - immer rechts (Mobile) */}
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
                <Menu className={`absolute inset-0 h-5 w-5 text-foreground transition-all duration-300 ${mobileMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}`} />
                <X className={`absolute inset-0 h-5 w-5 text-foreground transition-all duration-300 ${mobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}`} />
              </div>
            </button>
          </div>

          <div
            className="relative hidden md:flex gap-8 items-center ml-auto mr-6"
          >
            <a
              href="#produkt"
              className={navLinkClass("produkt")}
            >
              Produkt
            </a>
            <a
              href="#vorteile"
              className={navLinkClass("vorteile")}
            >
              Vorteile
            </a>
            <a
              href="#ueber-uns"
              className={navLinkClass("ueber-uns")}
            >
              Details
            </a>
            <button
              type="button"
              onClick={() => setContactFormOpen(true)}
              className="relative text-[13px] lg:text-sm font-semibold uppercase tracking-[0.15em] text-foreground/70 hover:text-foreground transition-colors"
            >
              Kontakt
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div>
              <Button variant="default" className="px-6" asChild>
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
        </div>
        {/* Mobile Dropdown Menu - direkt am Header */}
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
                  className="block px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-foreground hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Produkt
                </a>
                <a
                  href="#vorteile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-foreground hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Vorteile
                </a>
                <a
                  href="#ueber-uns"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-foreground hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Details
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setContactFormOpen(true);
                  }}
                  className="block w-full text-left px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-foreground hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Kontakt
                </button>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <Button size="lg" className="w-full" asChild>
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 md:pt-36 pb-20 md:pb-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24 items-center">
            <Reveal from="left" distance={30}>
              <div className="max-w-xl">
                <span className="label-tag">Premium Wäscheorganisation</span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 text-foreground leading-[1.0]">
                  Wäschesammler<br />
                  <em className="italic font-normal">mit System</em>
                </h1>
                <hr className="heading-rule-left" />
                <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-7 md:leading-8 font-light">
                  Hol dir den WEISSHEIM Wäschesammler mit 4 Fächern – 200 L
                  Volumen und abnehmbaren Taschen. Mit Rollen für maximale
                  Flexibilität in deinem Alltag.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg w-full sm:w-auto" asChild>
                    <a
                      href="https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2"
                    >
                      <ShoppingCart size={20} />
                      Zu Amazon
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg w-full sm:w-auto"
                    asChild
                  >
                    <a href="#produkt">Mehr erfahren</a>
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal from="right" distance={30} delayMs={150}>
              <div className="group relative mt-10 lg:mt-0 flex justify-center lg:justify-end bg-transparent border-0 ring-0 outline-none shadow-none overflow-visible before:content-[''] before:pointer-events-none before:absolute before:inset-[-16%] before:rounded-[999px] before:bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.18),transparent_62%)] before:blur-3xl before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100">
                <img
                  src={produktSchwarz}
                  alt="WEISSHEIM Wäschesammler – Schwarze Variante"
                  className="relative z-10 w-full max-w-[620px] h-auto transform-gpu transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-2 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="vorteile" className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <Reveal className="text-center mb-16" from="up" distance={24}>
            <div>
              <span className="label-tag">Vorteile</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2 text-foreground leading-[1.05]">
                Warum <em className="italic font-normal">WEISSHEIM?</em>
              </h2>
              <hr className="heading-rule" />
              <p className="text-base md:text-lg text-muted-foreground font-light">
                Die perfekte Lösung für deine organisierte Wäscheverwaltung
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            <Reveal from="up" distance={24} delayMs={0}>
              <Card className="p-10 hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)] hover:-translate-y-1">
                <div className="w-14 h-14 mb-6 bg-primary rounded-2xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-3 text-foreground italic">
                  Hygienisch &amp; durchdacht
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  Hochwertige, waschbare Oxford 600D Taschen für maximale Hygiene.
                  Damit bleibt deine Wäsche frisch und geruchsfrei.
                </p>
              </Card>
            </Reveal>

            <Reveal from="up" distance={24} delayMs={100}>
              <Card className="p-10 hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)] hover:-translate-y-1">
                <div className="w-14 h-14 mb-6 bg-primary rounded-2xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-3 text-foreground italic">
                  Flexible Mobilität
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  Mit Rollen ausgestattet – perfekt für deinen Alltag und auch
                  beim Umzug. Leicht zu bewegen.
                </p>
              </Card>
            </Reveal>

            <Reveal from="up" distance={24} delayMs={200}>
              <Card className="p-10 hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)] hover:-translate-y-1">
                <div className="w-14 h-14 mb-6 bg-primary rounded-2xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-3 text-foreground italic">
                  Ästhetischer Stauraum
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  Elegante Holzablage und Stahlrahmen – wirkt wie ein
                  hochwertiges Möbelstück in deinem Zuhause.
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="produkt" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
            <Reveal from="left" distance={30}>
              <div className="group relative flex justify-center bg-transparent border-0 ring-0 outline-none shadow-none overflow-visible before:content-[''] before:pointer-events-none before:absolute before:inset-[-16%] before:rounded-[999px] before:bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.18),transparent_62%)] before:blur-3xl before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100">
                <img
                  src={produktWeiss}
                  alt="WEISSHEIM Wäschesammler – Weiße Variante"
                  className="relative z-10 w-full max-w-[560px] h-auto object-contain transform-gpu transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-2 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            </Reveal>

            <Reveal from="right" distance={30} delayMs={150}>
              <div>
                <span className="label-tag">Das Produkt</span>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-foreground leading-[1.05]">
                  Wäschesammler<br />
                  <em className="italic font-normal">mit System</em>
                </h2>
                <hr className="heading-rule-left" />
                <p className="text-base md:text-lg text-muted-foreground mb-10 leading-7 md:leading-8 font-light">
                  Mit dem WEISSHEIM Wäschesammler mit 4 Fächern und großzügigen
                  200 L Volumen kombinierst du smartes Sortieren mit elegantem
                  Design. Dank Haken-System und abnehmbaren Oxford 600D Taschen
                  wird deine Wäscheverwaltung stressfrei und effizient.
                </p>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-primary-foreground" />
                    </div>
                    <span className="text-sm text-foreground">
                      200 L Volumen – 4 abnehmbare Oxford 600D Taschen
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-primary-foreground" />
                    </div>
                    <span className="text-sm text-foreground">
                      Smartes Haken-System für zeitsparende Handhabung
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-primary-foreground" />
                    </div>
                    <span className="text-sm text-foreground">
                      Wäschekorb mit Rollen – mobil und flexibel
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-primary-foreground" />
                    </div>
                    <span className="text-sm text-foreground">
                      Elegante Holzablage + verstärkter Stahlrahmen
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-primary-foreground" />
                    </div>
                    <span className="text-sm text-foreground">
                      Waschbare Taschen – hygienisch und geruchsfrei
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-primary-foreground" />
                    </div>
                    <span className="text-sm text-foreground">
                      Verfügbar in Schwarz, Beige und Himmelblau
                    </span>
                  </div>
                </div>

                <Button size="lg" asChild>
                  <a
                    href="https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    Jetzt auf Amazon kaufen
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="ueber-uns" className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <Reveal className="text-center mb-16" from="up" distance={24}>
            <div>
              <span className="label-tag">Spezifikationen</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2 text-foreground leading-[1.05]">
                Technische <em className="italic font-normal">Details</em>
              </h2>
              <hr className="heading-rule" />
              <p className="text-base md:text-lg text-muted-foreground font-light">
                Hochwertige Materialien und durchdachte Konstruktion für deinen Alltag
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specs.map((spec, index) => (
              <Reveal key={spec.label} from="up" distance={24} delayMs={index * 80}>
                <Card className="p-6 hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)] hover:-translate-y-1">
                  <div className="text-2xl mb-4">{spec.icon}</div>
                  <p className="text-xs text-muted-foreground mb-1">{spec.label}</p>
                  <p className="text-sm font-medium text-foreground">{spec.value}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <Reveal from="up" distance={24}>
            <div>
              <div className="w-20 h-20 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
                <Mail className="w-10 h-10 text-foreground" />
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-foreground leading-[1.05]">
                Hast du <em className="italic font-normal">Fragen?</em>
              </h2>
              <hr className="heading-rule" />
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-7 md:leading-8 font-light">
                Wir sind für dich da. Kontaktiere uns gern bei Fragen zu unseren
                Produkten oder deiner Bestellung.
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

      <section className="py-20 md:py-24 px-4 bg-slate-50">
        <div className="container mx-auto max-w-4xl text-center">
          <Reveal from="up" distance={24}>
            <div>
              <span className="label-tag">Jetzt starten</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-foreground leading-[1.05]">
                Bereit für <em className="italic font-normal">organisierte</em> Wäsche?
              </h2>
              <hr className="heading-rule" />
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-7 md:leading-8 font-light">
                Bestell jetzt deinen WEISSHEIM Wäschesammler und erlebe den Unterschied.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg w-full sm:w-auto" asChild>
                  <a
                    href="https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    Jetzt auf Amazon kaufen
                  </a>
                </Button>
              </div>
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
          className="fixed bottom-6 right-5 md:bottom-8 md:right-8 bg-primary text-primary-foreground h-12 w-12 flex items-center justify-center rounded-full shadow-[0_14px_40px_rgba(15,23,42,0.18)] hover:shadow-[0_18px_55px_rgba(15,23,42,0.22)] hover:-translate-y-0.5 hover:bg-primary/90 transition-all transform-gpu z-40"
          aria-label="Nach oben scrollen"
        >
          <ChevronDown size={24} className="rotate-180" />
        </button>
      )}

      {/* Footer */}
      <footer className="py-12 px-4 bg-white border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <img
                src={weissheimLogo}
                alt="WEISSHEIM Logo"
                className="h-16 w-auto mb-4"
              />
              <p className="text-muted-foreground">
                Premium Wäschesammler &amp; Wäschesortierer für mehr Ordnung bei dir zuhause.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground uppercase tracking-[0.15em] text-sm">Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#produkt"
                    className="hover:text-foreground transition-colors"
                  >
                    Produkt
                  </a>
                </li>
                <li>
                  <a
                    href="#vorteile"
                    className="hover:text-foreground transition-colors"
                  >
                    Vorteile
                  </a>
                </li>
                <li>
                  <a
                    href="#ueber-uns"
                    className="hover:text-foreground transition-colors"
                  >
                    Details
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setContactFormOpen(true)}
                    className="hover:text-foreground transition-colors"
                  >
                    Kontakt
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground uppercase tracking-[0.15em] text-sm">
                Rechtliches
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="/impressum.html"
                    className="hover:text-foreground transition-colors"
                  >
                    Impressum
                  </a>
                </li>
                <li>
                  <a
                    href="/datenschutz.html"
                    className="hover:text-foreground transition-colors"
                  >
                    Datenschutzerklärung
                  </a>
                </li>
                <li>
                  <a
                    href="/agb.html"
                    className="hover:text-foreground transition-colors"
                  >
                    AGB / Hinweise
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 WEISSHEIM. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
