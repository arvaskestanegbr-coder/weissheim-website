import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import Reveal from "../Reveal";
import produktSchwarz from "../../assets/produkt-schwarz.webp";
import { AMAZON_URL } from "../../constants";

export default function Hero() {
  return (
    <section className="pt-16 md:pt-36 pb-20 md:pb-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24 items-center">
          <Reveal from="left" distance={30}>
            <div className="max-w-xl">
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 text-foreground leading-[1.05]">
                Wäschesammler mit System
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-7 md:leading-8">
                Hol dir den WEISSHEIM Wäschesammler mit 4 Fächern – 200 L
                Volumen und abnehmbaren Taschen. Mit Rollen für maximale
                Flexibilität in deinem Alltag.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg w-full sm:w-auto" asChild>
                  <a
                    href={AMAZON_URL}
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
  );
}
