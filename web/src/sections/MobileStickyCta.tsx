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
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-black bg-black px-4 py-3">
      <div className="mx-auto flex max-w-md items-center gap-3">
        <a
          href={AMAZON_PRODUCT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 border-[3px] border-[#87CEEB] bg-[#87CEEB] px-4 text-sm font-bold text-black uppercase tracking-wide shadow-[3px_3px_0_#fff] transition hover:shadow-[4px_4px_0_#fff] hover:-translate-x-px hover:-translate-y-px"
          onClick={() => onAmazonClick("sticky_mobile")}
          data-analytics-id="amazon-sticky-mobile"
        >
          <ShoppingCart size={16} />
          Jetzt kaufen
        </a>
        <button
          type="button"
          onClick={onOpenContact}
          className="inline-flex h-12 items-center justify-center gap-2 border-[3px] border-white bg-black px-4 text-sm font-bold text-white uppercase tracking-wide transition hover:bg-white hover:text-black"
        >
          <MessageCircleQuestion size={16} />
          Fragen?
        </button>
      </div>
    </div>
  );
}
