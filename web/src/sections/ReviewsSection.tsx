import { BadgeCheck, ExternalLink, Star } from "lucide-react";
import Reveal from "../components/Reveal";
import { AMAZON_RATING, AMAZON_REVIEWS_URL, CUSTOMER_REVIEWS, REVIEWS_CONTENT, type CustomerReview } from "../config/site";

interface ReviewsSectionProps {
  onAmazonClick: (source: string) => void;
}

function StarRow({ stars, size }: { stars: number; size: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.min(1, Math.max(0, stars - i));
        return (
          <span key={i} className="relative">
            <Star size={size} className="text-[#0A0A0A]/10" />
            {fill > 0 && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star size={size} className="text-[#E8A030] fill-[#E8A030]" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function ReviewCard({ review, index, onAmazonClick }: { review: CustomerReview; index: number; onAmazonClick: (source: string) => void }) {
  return (
    <Reveal from="up" distance={16} delayMs={index * 80} className="h-full">
      <figure className="flex h-full flex-col border border-[#0A0A0A]/10 bg-[#FAF8F3] p-6 md:p-8">
        <StarRow stars={review.stars} size={16} />
        <span className="sr-only">{review.stars} von 5 Sternen</span>

        <blockquote cite={review.url} className="mt-5 flex-1">
          <p className="font-['Cormorant_Garamond'] text-[23px] md:text-[25px] font-bold italic leading-[1.25] text-[#0A0A0A]">
            „{review.quote}“
          </p>
        </blockquote>

        <figcaption className="mt-8 border-t border-[#0A0A0A]/10 pt-5 font-[Space_Grotesk]">
          <p className="text-[15px] font-semibold text-[#0A0A0A]">{review.author}</p>
          <p className="mt-1 text-[13px] leading-5 text-[#0A0A0A]/60">
            {review.variant}<br />
            {review.date}
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#78684F]">
            <BadgeCheck size={14} aria-hidden="true" />
            {REVIEWS_CONTENT.verifiedLabel}
          </p>
          <a
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onAmazonClick(`review_${index + 1}`)}
            className="mt-4 flex min-h-6 items-center gap-1.5 rounded-sm text-[13px] text-[#0A0A0A]/70 underline decoration-[#0A0A0A]/20 underline-offset-4 transition-colors hover:text-[#0A0A0A] hover:decoration-[#0A0A0A]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#78684F]"
          >
            {REVIEWS_CONTENT.readMoreLabel}
            <ExternalLink size={13} aria-hidden="true" />
          </a>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export default function ReviewsSection({ onAmazonClick }: ReviewsSectionProps) {
  const reviews = CUSTOMER_REVIEWS.filter((review) => review.quote.trim() !== "");
  if (reviews.length === 0) return null;

  return (
    <section id="stimmen" className="relative bg-[#F0EBE3] py-24 md:py-32 px-5 md:px-8 overflow-hidden">
      <div className="container relative mx-auto max-w-6xl">

        <Reveal className="mb-10 md:mb-16" from="up" distance={20}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="relative">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#78684F] font-[Space_Grotesk]">
                {REVIEWS_CONTENT.eyebrow}
              </p>
              <h2 className="text-4xl md:text-6xl text-[#0A0A0A] leading-[1.0]">
                {REVIEWS_CONTENT.headingTop}<br />
                <em className="text-[#0A0A0A]/50">{REVIEWS_CONTENT.headingEmphasis}</em>
              </h2>
              <div className="absolute -left-5 top-2 bottom-2 w-[2px] rounded-full bg-[#C9B99A]/30" />
            </div>
            <p className="max-w-sm text-[15px] leading-6 text-[#0A0A0A]/60 md:text-right font-[Space_Grotesk]">
              {REVIEWS_CONTENT.intro}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {reviews.map((review, index) => (
            <ReviewCard key={review.author} review={review} index={index} onAmazonClick={onAmazonClick} />
          ))}
        </div>

        <Reveal from="up" distance={12} className="mt-10 md:mt-14">
          <div className="flex flex-col gap-5 border-t border-[#0A0A0A]/10 pt-8 md:flex-row md:items-start md:justify-between md:gap-12 font-[Space_Grotesk]">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <StarRow stars={AMAZON_RATING.stars} size={18} />
              <p className="text-[15px] text-[#0A0A0A]">
                <span className="font-semibold">{AMAZON_RATING.stars.toLocaleString("de-DE")} von 5</span>
                <span className="text-[#0A0A0A]/60"> · {AMAZON_RATING.count} {AMAZON_RATING.label} · {AMAZON_RATING.asOf}</span>
              </p>
              <a
                href={AMAZON_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onAmazonClick("reviews_all")}
                className="inline-flex min-h-6 items-center gap-1.5 rounded-sm text-[14px] font-semibold text-[#0A0A0A] underline decoration-[#0A0A0A]/30 underline-offset-4 transition-colors hover:decoration-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#78684F]"
              >
                {REVIEWS_CONTENT.allReviewsLabel}
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
            <p className="max-w-md text-[12px] leading-5 text-[#0A0A0A]/55 md:text-right">
              {REVIEWS_CONTENT.sourceNote}
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
