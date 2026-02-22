import { Mail } from "lucide-react";
import Reveal from "../components/Reveal";

interface ContactSectionProps {
  onOpenContact: () => void;
}

export default function ContactSection({ onOpenContact }: ContactSectionProps) {
  return (
    <section id="kontakt" className="bg-[#0A0A0A] py-24 md:py-32 px-5 md:px-8">
      <div className="container mx-auto max-w-4xl text-center">
        <Reveal from="up" distance={20}>
          <div>
            <div className="w-14 h-14 mx-auto mb-10 flex items-center justify-center border border-[#C9B99A]/30 rounded-full">
              <Mail className="w-6 h-6 text-[#C9B99A]" strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl md:text-6xl text-[#FAF8F3] leading-[1.0] mb-6">
              Hast du<br />
              <em>Fragen?</em>
            </h2>
            <p className="text-base text-[#FAF8F3]/35 mb-12 leading-7 max-w-md mx-auto font-[Space_Grotesk]">
              Wir sind für dich da. Kontaktiere uns gern bei Fragen zu unseren Produkten oder
              deiner Bestellung.
            </p>
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center justify-center border border-[#FAF8F3]/20 text-[#FAF8F3]/70 px-8 py-4 text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 hover:border-[#FAF8F3]/50 hover:text-[#FAF8F3]"
            >
              Kontakt aufnehmen
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
