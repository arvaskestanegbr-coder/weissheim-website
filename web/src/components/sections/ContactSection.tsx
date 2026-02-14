import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import Reveal from "../Reveal";

interface ContactSectionProps {
  onContactOpen: () => void;
}

export default function ContactSection({ onContactOpen }: ContactSectionProps) {
  return (
    <section id="kontakt" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl text-center">
        <Reveal from="up" distance={24}>
          <div>
            <div className="w-20 h-20 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
              <Mail className="w-10 h-10 text-foreground" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground leading-[1.05]">
              Hast du Fragen?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-10 leading-7 md:leading-8">
              Wir sind für dich da. Kontaktiere uns gern bei Fragen zu unseren
              Produkten oder deiner Bestellung.
            </p>
            <Button
              size="lg"
              variant="outline"
              onClick={onContactOpen}
            >
              Kontakt aufnehmen
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
