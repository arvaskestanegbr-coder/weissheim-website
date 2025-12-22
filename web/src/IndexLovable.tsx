import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import weissheimLogo from "./assets/weissheim-logo.png";
import ContactForm from "./components/ContactForm";
import { Home, Package, Star, Mail, ShoppingCart, Check } from "lucide-react";
import schwarz4er from "./assets/Schwarz-4er.jpg";
import produktWeiss from "./assets/produkt-weiss.png";
import Reveal from "./components/Reveal";

const Index = () => {
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <nav
        className={`border-b border-border sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background shadow-md"
            : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        }`}
      >
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <img
            src={weissheimLogo}
            alt="WEISSHEIM Logo"
            className="h-24 md:h-32 w-auto"
          />
          <div className="hidden md:flex gap-8">
            <a
              href="#produkt"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Produkt
            </a>
            <a
              href="#vorteile"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Vorteile
            </a>
            <a
              href="#ueber-uns"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Über uns
            </a>
            <a
              href="#kontakt"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Kontakt
            </a>
          </div>
          <Button variant="default" asChild>
            <a
              href="https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jetzt kaufen
            </a>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-44 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal from="left" distance={30}>
              <div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground font-serif">
                  Wäschesammler mit System
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                  Der WEISSHEIM Wäschesammler 4 Fächer – 200 L Volumen mit
                  abnehmbaren Taschen. Wäschekorb 2 Fächer, Wäscheschrank,
                  Wäschesortierer mit Rollen für flexible Mobilität.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg px-8" asChild>
                    <a
                      href="https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <ShoppingCart size={20} />
                      Zu Amazon
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8"
                    asChild
                  >
                    <a href="#produkt">Mehr erfahren</a>
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal from="right" distance={30} delayMs={150}>
              <div className="relative flex justify-center">
                <img
                  src={produktWeiss}
                  alt="WEISSHEIM Wäschesammler – Weiße Variante"
                  className="w-full max-w-[620px] h-auto transform transition-transform duration-500 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="vorteile" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <Reveal className="text-center mb-16" from="up" distance={24}>
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4 text-foreground font-serif">
                Warum WEISSHEIM?
              </h2>
              <p className="text-xl text-muted-foreground">
                Die perfekte Lösung für organisierte Wäscheverwaltung
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            <Reveal from="up" distance={24} delayMs={0}>
              <Card className="p-8 text-center hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-2xl flex items-center justify-center">
                  <Home className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  Hygienisch &amp; durchdacht
                </h3>
                <p className="text-muted-foreground">
                  Hochwertige, waschbare Oxford 600D Taschen für maximale Hygiene.
                  Bleibt stets frisch und geruchsfrei.
                </p>
              </Card>
            </Reveal>

            <Reveal from="up" distance={24} delayMs={100}>
              <Card className="p-8 text-center hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-2xl flex items-center justify-center">
                  <Package className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  Flexible Mobilität
                </h3>
                <p className="text-muted-foreground">
                  Mit Rollen ausgestattet – perfekt für den täglichen Gebrauch und
                  beim Umzug. Leicht zu bewegen.
                </p>
              </Card>
            </Reveal>

            <Reveal from="up" distance={24} delayMs={200}>
              <Card className="p-8 text-center hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-2xl flex items-center justify-center">
                  <Star className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  Ästhetischer Stauraum
                </h3>
                <p className="text-muted-foreground">
                  Elegante Holzablage und Stahlrahmen – sieht aus wie ein
                  hochwertiges Möbelstück für dein Zuhause.
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="produkt" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal from="left" distance={30}>
              <div className="flex justify-center">
                <img
                  src={schwarz4er}
                  alt="WEISSHEIM Wäschesammler 4 Fächer – Schwarz"
                  className="w-full max-w-[520px] h-auto object-contain"
                  loading="lazy"
                />
              </div>
            </Reveal>

            <Reveal from="right" distance={30} delayMs={150}>
              <div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground font-serif">
                  WEISSHEIM Wäschesammler mit System
                </h2>

                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Der WEISSHEIM Wäschesammler 4 Fächer mit großzügigem 200 L
                  Volumen kombiniert intelligentes Sortier-System mit elegantem
                  Design. Dank des smarten Haken-Systems und abnehmbaren Oxford
                  600D Taschen wird deine Wäscheverwaltung stressfrei und
                  effizient.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 bg-secondary/30 p-4 rounded-xl hover:bg-secondary/50 transition-colors">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-primary-foreground" />
                    </div>
                    <span className="text-foreground">
                      200 L Volumen – 4 abnehmbare Oxford 600D Taschen
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-secondary/30 p-4 rounded-xl hover:bg-secondary/50 transition-colors">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-primary-foreground" />
                    </div>
                    <span className="text-foreground">
                      Smartes Haken-System für zeitsparende Handhabung
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-secondary/30 p-4 rounded-xl hover:bg-secondary/50 transition-colors">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-primary-foreground" />
                    </div>
                    <span className="text-foreground">
                      Wäschekorb mit Rollen – mobil und flexibel
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-secondary/30 p-4 rounded-xl hover:bg-secondary/50 transition-colors">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-primary-foreground" />
                    </div>
                    <span className="text-foreground">
                      Elegante Holzablage + verstärkter Stahlrahmen
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-secondary/30 p-4 rounded-xl hover:bg-secondary/50 transition-colors">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-primary-foreground" />
                    </div>
                    <span className="text-foreground">
                      Waschbare Taschen – hygienisch und geruchsfrei
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-secondary/30 p-4 rounded-xl hover:bg-secondary/50 transition-colors">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-primary-foreground" />
                    </div>
                    <span className="text-foreground">
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

      {/* Reviews Section */}
      {null}

      {/* About Section */}
      <section id="ueber-uns" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <Reveal className="text-center mb-16" from="up" distance={24}>
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4 text-foreground font-serif">
                Technische Details
              </h2>
              <p className="text-xl text-muted-foreground">
                Hochwertige Materialien und durchdachte Konstruktion
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specs.map((spec, index) => (
              <Reveal key={spec.label} from="up" distance={24} delayMs={index * 80}>
                <div className="bg-background p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="text-4xl mb-3">{spec.icon}</div>
                  <p className="text-sm text-muted-foreground mb-1">{spec.label}</p>
                  <p className="text-xl text-foreground">{spec.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Reveal from="up" distance={24}>
            <div>
              <div className="w-20 h-20 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
                <Mail className="w-10 h-10 text-foreground" />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground font-serif">
                Hast du Fragen?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
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

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Reveal from="up" distance={24}>
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground font-serif">
                Bereit für eine organisierte Wäscheverwaltung?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Bestellen Sie jetzt Ihren WEISSHEIM Wäschesammler und erleben Sie den Unterschied
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8" asChild>
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
            </div>
          </Reveal>
        </div>
      </section>

      {/* Kontaktformular (Dialog) */}
      <ContactForm
        open={contactFormOpen}
        onOpenChange={setContactFormOpen}
      />

      {/* Footer */}
      <footer className="py-12 px-4 bg-background border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <img
                src={weissheimLogo}
                alt="WEISSHEIM Logo"
                className="h-16 w-auto mb-4"
              />
              <p className="text-muted-foreground">
                Premium Wäschesammler &amp; Wäschesortierer für mehr Ordnung.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Links</h4>
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
                    Über uns
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
              <h4 className="font-semibold mb-4 text-foreground">
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
