import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import weissheimLogo from "./assets/weissheim-logo.png";
import ContactForm from "./components/ContactForm";
import { Home, Package, Star, Mail } from "lucide-react";

const Index = () => {
  const [contactFormOpen, setContactFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <img
            src={weissheimLogo}
            alt="WEISSHEIM Logo"
            className="h-20 md:h-24 w-auto"
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
      <section className="py-20 md:py-32 px-4 animate-fade-in">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground font-serif">
            Wäschesammler mit System
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Der WEISSHEIM Wäschesammler 4 Fächer – 200 L Volumen mit
            abnehmbaren Taschen. Wäschekorb 2 Fächer, Wäscheschrank,
            Wäschesortierer mit Rollen für flexible Mobilität.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="text-lg px-8" asChild>
              <a
                href="https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C"
                target="_blank"
                rel="noopener noreferrer"
              >
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
      </section>

      {/* Features Section */}
      <section id="vorteile" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground font-serif">
            Warum WEISSHEIM?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Home className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                Hygienisch &amp; durchdacht
              </h3>
              <p className="text-muted-foreground">
                Hochwertige, waschbare Oxford 600D Taschen für maximale Hygiene.
                Bleibt stets frisch und geruchsfrei.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                Flexible Mobilität
              </h3>
              <p className="text-muted-foreground">
                Mit Rollen ausgestattet – perfekt für den täglichen Gebrauch und
                beim Umzug. Leicht zu bewegen.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                Ästhetischer Stauraum
              </h3>
              <p className="text-muted-foreground">
                Elegante Holzablage und Stahlrahmen – sieht aus wie ein
                hochwertiges Möbelstück für dein Zuhause.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="produkt" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-secondary/50 rounded-lg aspect-square flex items-center justify-center">
                <Package className="w-48 h-48 text-primary/30" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground font-serif">
                WEISSHEIM Wäschesammler mit System
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Der WEISSHEIM Wäschesammler 4 Fächer mit großzügigem 200 L
                Volumen kombiniert intelligentes Sortier-System mit elegantem
                Design. Dank des smarten Haken-Systems und abnehmbaren Oxford
                600D Taschen wird deine Wäscheverwaltung stressfrei und
                effizient.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-foreground">
                    200 L Volumen – 4 abnehmbare Oxford 600D Taschen
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-foreground">
                    Smartes Haken-System für zeitsparende Handhabung
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-foreground">
                    Wäschekorb mit Rollen – mobil und flexibel
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-foreground">
                    Elegante Holzablage + verstärkter Stahlrahmen
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-foreground">
                    Waschbare Taschen – hygienisch und geruchsfrei
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-foreground">
                    Verfügbar in Schwarz, Beige und Himmelblau
                  </span>
                </li>
              </ul>
              <Button size="lg" asChild>
                <a
                  href="https://www.amazon.de/WEISSHEIM%C2%AE-W%C3%A4schesammler-abnehmbaren-W%C3%A4scheschrank-W%C3%A4schesortierer/dp/B0F3ZBN75C"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jetzt auf Amazon ansehen
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground font-serif">
              Das sagen unsere Kunden
            </h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < 4
                        ? "fill-primary text-primary"
                        : "fill-primary/70 text-primary/70"
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-foreground">4.7/5</span>
            </div>
            <p className="text-muted-foreground">
              Basierend auf verifizierten Amazon-Bewertungen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-foreground mb-4 italic">
                &quot;Endlich Ordnung im Badezimmer! Die abnehmbaren Taschen
                sind super praktisch und das smarte Haken-System macht alles so
                einfach. Klare Kaufempfehlung!&quot;
              </p>
              <p className="text-sm text-muted-foreground font-semibold">
                – Sandra M.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-foreground mb-4 italic">
                &quot;Sehr stabil und hochwertig verarbeitet. Die Rollen machen
                den Transport zur Waschmaschine kinderleicht. Das
                Preis-Leistungs-Verhältnis ist top!&quot;
              </p>
              <p className="text-sm text-muted-foreground font-semibold">
                – Michael K.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-foreground mb-4 italic">
                &quot;Die 4 Fächer sind perfekt für unsere Familie. Weiß, Bunt,
                Schwarz und Feinwäsche – alles getrennt. Die Holzablage
                obendrauf ist ein schönes Detail.&quot;
              </p>
              <p className="text-sm text-muted-foreground font-semibold">
                – Anna L.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="ueber-uns" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground font-serif">
            Über WEISSHEIM
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            WEISSHEIM steht für Qualität, Funktionalität und zeitloses Design.
            Als Amazon FBM Händler bieten wir dir durchdachte Haushaltsprodukte,
            die deinen Alltag erleichtern und dein Zuhause verschönern.
          </p>
          <p className="text-lg text-muted-foreground">
            Unsere Mission ist es, Produkte zu entwickeln, die nicht nur
            praktisch sind, sondern auch ästhetisch überzeugen und sich
            nahtlos in dein Zuhause integrieren.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground font-serif">
            Hast du Fragen?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
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
      </section>

      {/* Kontaktformular (Dialog) */}
      <ContactForm
        open={contactFormOpen}
        onOpenChange={setContactFormOpen}
      />

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img
                src={weissheimLogo}
                alt="WEISSHEIM Logo"
                className="h-14 mb-4"
              />
              <p className="text-muted-foreground text-sm">
                Premium Wäschesammler &amp; Wäschesortierer für mehr Ordnung.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#produkt"
                    className="hover:text-primary transition-colors"
                  >
                    Produkt
                  </a>
                </li>
                <li>
                  <a
                    href="#vorteile"
                    className="hover:text-primary transition-colors"
                  >
                    Vorteile
                  </a>
                </li>
                <li>
                  <a
                    href="#ueber-uns"
                    className="hover:text-primary transition-colors"
                  >
                    Über uns
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setContactFormOpen(true)}
                    className="hover:text-primary transition-colors"
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
                    className="hover:text-primary transition-colors"
                  >
                    Impressum
                  </a>
                </li>
                <li>
                  <a
                    href="/datenschutz.html"
                    className="hover:text-primary transition-colors"
                  >
                    Datenschutzerklärung
                  </a>
                </li>
                <li>
                  <a
                    href="/agb.html"
                    className="hover:text-primary transition-colors"
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
