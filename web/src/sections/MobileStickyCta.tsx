import { MessageCircleQuestion, ShoppingCart } from "lucide-react";
import { AMAZON_PRODUCT_URL } from "../config/site";

interface MobileStickyCtaProps {
  onAmazonClick: (source: string) => void;
  onOpenContact: () => void;
}

export default function MobileStickyCta({
  onAmazonClick,
  onOpenContact,
}: MobileStickyCtaProps) {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 px-4 py-3">
      <div className="mx-auto flex max-w-md items-center gap-2">
        <a
          href={AMAZON_PRODUCT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
          onClick={() => onAmazonClick("sticky_mobile")}
          data-analytics-id="amazon-sticky-mobile"
        >
          <ShoppingCart size={16} />
          Jetzt kaufen
        </a>
        <button
          type="button"
          onClick={onOpenContact}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-sm font-medium text-foreground transition hover:bg-slate-50"
        >
          <MessageCircleQuestion size={16} />
          Fragen?
        </button>
      </div>
    </div>
  );
}
