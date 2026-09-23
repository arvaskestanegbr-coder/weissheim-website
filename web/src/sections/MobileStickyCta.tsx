import { useEffect, useState } from "react";
import { ArrowUp, MessageCircleQuestion, ShoppingCart } from "lucide-react";
import { AMAZON_PRODUCT_URL, MOBILE_ACTIONS_CONTENT } from "../config/site";

interface MobileStickyCtaProps {
  onAmazonClick: (source: string) => void;
  onOpenContact: () => void;
  onScrollToTop: () => void;
  amazonUrl?: string;
  suppressed?: boolean;
}

export default function MobileStickyCta({
  onAmazonClick,
  onOpenContact,
  onScrollToTop,
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
      role="group"
      aria-label={MOBILE_ACTIONS_CONTENT.label}
      className="md:hidden fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-[max(0.75rem,env(safe-area-inset-left))] right-[max(0.75rem,env(safe-area-inset-right))] z-40 mx-auto max-w-md rounded-2xl border border-white/20 bg-[#1C1C1E] p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
    >
      <div className="flex items-center gap-1">
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-[#C9B99A] px-2 text-[12px] font-semibold text-[#0A0A0A] transition-colors hover:bg-[#DFD3BD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF8F3]"
          onClick={() => onAmazonClick("sticky_mobile")}
          data-analytics-id="amazon-sticky-mobile"
        >
          <ShoppingCart size={16} aria-hidden="true" />
          {MOBILE_ACTIONS_CONTENT.buyLabel}
        </a>
        <button
          type="button"
          onClick={onOpenContact}
          aria-label={MOBILE_ACTIONS_CONTENT.contactAccessibleLabel}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-[10px] px-3 text-[12px] font-medium text-[#FAF8F3]/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9B99A]"
        >
          <MessageCircleQuestion size={17} aria-hidden="true" />
          <span>{MOBILE_ACTIONS_CONTENT.contactLabel}</span>
        </button>
        <span className="h-5 w-px shrink-0 bg-white/15" aria-hidden="true" />
        <button
          type="button"
          onClick={onScrollToTop}
          aria-label={MOBILE_ACTIONS_CONTENT.backToTopAccessibleLabel}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] text-[#FAF8F3]/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9B99A]"
        >
          <ArrowUp size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
