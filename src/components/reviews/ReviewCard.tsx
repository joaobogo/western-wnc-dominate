import { useId, useState } from "react";
import { Star, ExternalLink } from "lucide-react";
import {
  SERVICE_LABELS,
  reviewDateLabel,
  type Review,
} from "@/data/reviews";

/**
 * A single published review.
 *
 * The full review text is always in the DOM — long ones are clamped with CSS
 * only, so the stored string is never truncated and search engines and screen
 * readers still see the whole thing.
 */
const COLLAPSE_AT = 320;

interface ReviewCardProps {
  review: Review;
  tone?: "light" | "dark";
}

const ReviewCard = ({ review, tone = "light" }: ReviewCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const bodyId = useId();
  const isLong = review.text.length > COLLAPSE_AT;
  const displayDate = reviewDateLabel(review);

  const dark = tone === "dark";
  const border = dark ? "border-dark-section-border" : "border-border";
  const heading = dark ? "text-dark-section-foreground" : "text-foreground";
  const muted = dark ? "text-dark-section-muted" : "text-muted-foreground";

  return (
    <figure className={`flex h-full flex-col border ${border} ${dark ? "bg-dark-section-foreground/[0.03]" : "bg-card"} p-6 rounded-sm`}>
      <div
        className="flex items-center gap-0.5 mb-3"
        role="img"
        aria-label={`${review.rating} out of 5 stars`}
      >
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-[hsl(var(--highland-gold))] text-[hsl(var(--highland-gold))]"
            aria-hidden="true"
          />
        ))}
      </div>

      <blockquote
        id={bodyId}
        className={`${muted} font-body text-sm leading-relaxed ${
          isLong && !expanded ? "line-clamp-6" : ""
        }`}
      >
        {review.text}
      </blockquote>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={bodyId}
          className={`mt-2 self-start text-caption font-body font-semibold uppercase tracking-[0.15em] ${
            dark ? "text-[hsl(var(--gold-ink))]" : "text-foreground"
          } underline underline-offset-4 hover:opacity-80 transition-opacity min-h-[44px] md:min-h-0 inline-flex items-center`}
        >
          {expanded ? "Show less" : "Read full review"}
        </button>
      )}

      <figcaption className={`mt-4 pt-4 border-t ${border}`}>
        <span className={`block font-heading font-bold text-sm ${heading}`}>{review.name}</span>
        <span className={`block text-caption font-body ${muted}`}>
          {[displayDate, review.town ? `${review.town}, NC` : ""].filter(Boolean).join(" · ")}
        </span>

        <span className="mt-3 flex flex-wrap items-center gap-1.5">
          {review.service
            .filter((s) => s !== "general")
            .map((s) => (
              <span
                key={s}
                className={`text-caption font-body px-2 py-0.5 border ${border} ${muted} rounded-sm`}
              >
                {SERVICE_LABELS[s]}
              </span>
            ))}
        </span>

        <a
          href={review.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-3 inline-flex items-center gap-1.5 text-caption font-body ${muted} underline underline-offset-4 hover:opacity-80 transition-opacity min-h-[44px] md:min-h-0`}
        >
          via {review.source}
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </figcaption>
    </figure>
  );
};

export default ReviewCard;
