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
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-[#0A0A0A]/10 bg-[#FAF8F3]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FAF8F3]/85 px-4 py-3">
      <div className="mx-auto flex max-w-md items-center gap-2.5">
        <a
          href={AMAZON_PRODUCT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 bg-[#0A0A0A] text-[#FAF8F3] px-4 text-[13px] font-semibold tracking-wider uppercase transition-colors hover:bg-[#0A0A0A]/80"
          onClick={() => onAmazonClick("sticky_mobile")}
          data-analytics-id="amazon-sticky-mobile"
        >
          <ShoppingCart size={15} />
          Jetzt kaufen
        </a>
        <button
          type="button"
          onClick={onOpenContact}
          className="inline-flex h-12 items-center justify-center gap-2 border border-[#0A0A0A]/20 bg-transparent text-[#0A0A0A]/60 px-4 text-[13px] font-semibold tracking-wider uppercase transition-colors hover:border-[#0A0A0A]/40 hover:text-[#0A0A0A]"
        >
          <MessageCircleQuestion size={15} />
          Fragen?
        </button>
      </div>
    </div>
  );
}
