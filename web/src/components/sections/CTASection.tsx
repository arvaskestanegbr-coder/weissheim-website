import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import Reveal from "../Reveal";
import { AMAZON_URL } from "../../constants";

export default function CTASection() {
  return (
    <section className="py-20 md:py-24 px-4 bg-slate-50">
      <div className="container mx-auto max-w-4xl text-center">
        <Reveal from="up" distance={24}>
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground leading-[1.05]">
              Bereit für eine organisierte Wäscheverwaltung?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-10 leading-7 md:leading-8">
              Bestell jetzt deinen WEISSHEIM Wäschesammler und erlebe den Unterschied.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg w-full sm:w-auto" asChild>
                <a
                  href={AMAZON_URL}
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
  );
}
