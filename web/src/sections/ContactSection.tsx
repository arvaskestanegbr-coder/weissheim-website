import { Mail } from "lucide-react";
import Reveal from "../components/Reveal";

interface ContactSectionProps {
  onOpenContact: () => void;
}

export default function ContactSection({ onOpenContact }: ContactSectionProps) {
  return (
    <section id="kontakt" className="bg-black border-b-[3px] border-black py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <Reveal from="up" distance={24}>
          <div>
            <div className="w-16 h-16 mx-auto mb-8 border-[3px] border-[#87CEEB] bg-[#87CEEB] flex items-center justify-center shadow-[4px_4px_0_#fff]">
              <Mail className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-4xl md:text-6xl leading-none mb-6 text-white">
              Hast du<br />
              <span className="text-[#87CEEB]">Fragen?</span>
            </h2>
            <p className="text-base md:text-lg text-white/50 mb-10 leading-7 md:leading-8 max-w-xl mx-auto">
              Wir sind für dich da. Kontaktiere uns gern bei Fragen zu unseren Produkten oder
              deiner Bestellung.
            </p>
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center justify-center border-[3px] border-white bg-white px-8 py-4 text-sm font-bold text-black uppercase tracking-wide shadow-[5px_5px_0_#87CEEB] hover:shadow-[7px_7px_0_#87CEEB] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
            >
              Kontakt aufnehmen
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
