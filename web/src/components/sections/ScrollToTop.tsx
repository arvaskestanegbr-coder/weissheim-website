import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ScrollToTop() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!scrolled) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-5 md:bottom-8 md:right-8 bg-primary text-primary-foreground h-12 w-12 flex items-center justify-center rounded-full shadow-[0_14px_40px_rgba(15,23,42,0.18)] hover:shadow-[0_18px_55px_rgba(15,23,42,0.22)] hover:-translate-y-0.5 hover:bg-primary/90 transition-all transform-gpu z-40"
      aria-label="Nach oben scrollen"
    >
      <ChevronDown size={24} className="rotate-180" />
    </button>
  );
}
