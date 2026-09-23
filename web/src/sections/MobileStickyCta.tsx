import { useEffect, useState } from "react";
import { MessageCircleQuestion, ShoppingCart } from "lucide-react";
import { AMAZON_PRODUCT_URL } from "../config/site";

interface MobileStickyCtaProps {
  onAmazonClick: (source: string) => void;
  onOpenContact: () => void;
  amazonUrl?: string;
  suppressed?: boolean;
}

export default function MobileStickyCta({
  onAmazonClick,
  onOpenContact,
  amazonUrl = AMAZON_PRODUCT_URL,
  suppressed = false,
}: MobileStickyCtaProps) {
  const [contextVisible, setContextVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-sticky-cta-hero]");
    if (!hero) return;
    const alternatives = Array.from(document.querySelectorAll<HTMLElement>(
      '[data-analytics-id="amazon-product-section"], [data-analytics-id="amazon-final-cta"], #kontakt, footer',
    ));
    const visibleAlternatives = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) continue;
        if (entry.isIntersecting) visibleAlternatives.add(entry.target);
        else visibleAlternatives.delete(entry.target);
      }
      setContextVisible(hero.getBoundingClientRect().bottom <= 80 && visibleAlternatives.size === 0);
    }, { rootMargin: "-80px 0px 0px", threshold: 0 });
    observer.observe(hero);
    alternatives.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      hidden={!contextVisible || suppressed}
      className="md:hidden fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] right-[calc(4.5rem+env(safe-area-inset-right))] z-40 border border-[#78684F]/20 bg-[#FAF8F3]/95 p-1.5 shadow-lg backdrop-blur"
    >
      <div className="mx-auto flex max-w-md items-center gap-2.5">
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 px-2 text-[11px] whitespace-nowrap flex-1 items-center justify-center gap-2 bg-[#0A0A0A] text-[#FAF8F3] font-semibold tracking-wider uppercase transition-colors hover:bg-[#0A0A0A]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
          onClick={() => onAmazonClick("sticky_mobile")}
          data-analytics-id="amazon-sticky-mobile"
        >
          <ShoppingCart size={15} />
          Jetzt kaufen
        </a>
        <button
          type="button"
          onClick={onOpenContact}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center gap-2 border border-[#0A0A0A]/30 bg-transparent text-[#0A0A0A]/70 text-[13px] font-semibold tracking-wider uppercase transition-colors hover:border-[#0A0A0A]/50 hover:text-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
        >
          <MessageCircleQuestion size={15} />
          <span className="sr-only">Fragen?</span>
        </button>
      </div>
    </div>
  );
}
