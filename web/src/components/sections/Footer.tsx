import weissheimLogo from "../../assets/weissheim-logo.webp";

interface FooterProps {
  onContactOpen: () => void;
}

export default function Footer({ onContactOpen }: FooterProps) {
  return (
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
            <h4 className="font-semibold mb-4 text-foreground">Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#produkt" className="hover:text-foreground transition-colors">
                  Produkt
                </a>
              </li>
              <li>
                <a href="#vorteile" className="hover:text-foreground transition-colors">
                  Vorteile
                </a>
              </li>
              <li>
                <a href="#ueber-uns" className="hover:text-foreground transition-colors">
                  Details
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onContactOpen}
                  className="hover:text-foreground transition-colors"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Rechtliches</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/impressum.html" className="hover:text-foreground transition-colors">
                  Impressum
                </a>
              </li>
              <li>
                <a href="/datenschutz.html" className="hover:text-foreground transition-colors">
                  Datenschutzerklärung
                </a>
              </li>
              <li>
                <a href="/agb.html" className="hover:text-foreground transition-colors">
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
  );
}
