import { useId, useState, type Ref } from "react";
import { PRODUCT_IMAGE_VIEWER_CONTENT as content } from "../config/site";

interface ProductImageViewerProps {
  src: string;
  alt: string;
  imageRef?: Ref<HTMLImageElement>;
}

export default function ProductImageViewer({ src, alt, imageRef }: ProductImageViewerProps) {
  const [view, setView] = useState<"product" | "dimensions">("product");
  const viewerId = useId();
  const imageId = `${viewerId}-image`;
  const descriptionId = `${viewerId}-description`;
  const showDimensions = view === "dimensions";

  return (
    <div className="relative z-10 w-full max-w-[620px] mix-blend-multiply font-['Space_Grotesk'] text-[#0A0A0A]">
      <div id={imageId} className="group/image relative aspect-[4/5] w-full">
        {/* Keep the image transform free for the existing GSAP color transition. */}
        <div className={`absolute inset-0 origin-center mix-blend-multiply transition-transform duration-500 ease-out motion-reduce:transition-none ${showDimensions ? "scale-[0.88]" : "scale-100 motion-safe:group-hover/image:-translate-y-2 motion-safe:group-hover/image:scale-[1.03]"}`}>
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            aria-describedby={showDimensions ? descriptionId : undefined}
            className="h-full w-full object-contain mix-blend-multiply"
            width={2000}
            height={2500}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            sizes="(min-width: 1280px) 620px, (min-width: 1024px) 45vw, 92vw"
          />
        </div>

        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 text-[#78684F] transition-opacity duration-300 motion-reduce:transition-none ${showDimensions ? "opacity-100" : "opacity-0"}`}
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" fill="none" stroke="currentColor" strokeWidth="1">
            {/* Height, width and depth follow the photographed product's perspective. */}
            <path d="M 16 6.6 V 93.5 M 14.5 6.6 H 17.5 M 14.5 93.5 H 17.5" vectorEffect="non-scaling-stroke" />
            <path d="M 25 97 H 67 M 25 95.8 V 98.2 M 67 95.8 V 98.2" vectorEffect="non-scaling-stroke" />
            <path d="M 72 96 L 82 92.5 M 71.4 95.1 L 72.6 96.9 M 81.4 91.6 L 82.6 93.4" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="absolute left-[16%] top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap bg-[#FAF8F3] px-2 py-0.5 text-[11px] font-medium tracking-[0.04em] sm:text-xs">
            {content.heightLabel}
          </span>
          <span className="absolute left-[46%] top-[97%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-[#FAF8F3] px-2 py-0.5 text-[11px] font-medium tracking-[0.04em] sm:text-xs">
            {content.widthLabel}
          </span>
          <span className="absolute right-0 top-[90%] -translate-y-1/2 whitespace-nowrap bg-[#FAF8F3] px-1 py-0.5 text-[11px] font-medium tracking-[0.04em] sm:right-[1%] sm:text-xs">
            {content.depthLabel}
          </span>
        </div>
      </div>

      <div className="mt-5 flex justify-center" role="group" aria-label={content.controlsLabel}>
        {([
          { id: "product", label: content.productLabel },
          { id: "dimensions", label: content.dimensionsLabel },
        ] as const).map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={view === item.id}
            aria-controls={imageId}
            onClick={() => setView(item.id)}
            className={`relative min-h-11 min-w-[104px] border border-[#78684F]/30 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors last:-ml-px focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#78684F] ${view === item.id ? "border-[#0A0A0A] bg-[#0A0A0A] text-[#FAF8F3]" : "bg-[#FAF8F3] text-[#78684F] hover:border-[#78684F] hover:bg-[#F0EBE3]"}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        id={descriptionId}
        aria-hidden={!showDimensions}
        className={`mt-3 text-center transition-opacity duration-300 motion-reduce:transition-none ${showDimensions ? "opacity-100" : "opacity-0"}`}
      >
        <p className="text-[11px] leading-5 text-[#78684F]">{content.dimensionsSummary}</p>
        <p className="text-[11px] leading-5 text-[#0A0A0A]/55">{content.dimensionsNote}</p>
      </div>
      <p role="status" aria-atomic="true" className="sr-only">
        {showDimensions ? content.dimensionsAnnouncement : ""}
      </p>
    </div>
  );
}
