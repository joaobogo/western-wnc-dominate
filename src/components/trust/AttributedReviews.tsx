import { Star, Quote } from "lucide-react";
import { useLocation } from "react-router-dom";
import { customerReviews, type CustomerReview } from "@/data/reviews";

/** Small deterministic hash so each page shows a different pair of real reviews (site audit m6). */
const hash = (s: string) => {
  let h = 2166136261;
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  return h;
};

type ReviewCategory = CustomerReview["category"];

const firstName = (author: string) => author.split(/[\s&]/)[0];

/**
 * Picks two real reviews from src/data/reviews — never invented copy.
 * Preference: same town + matching service category, then town, then category,
 * then featured, then most recent.
 */
export const pickAttributedReviews = (
  opts: { town?: string; category?: ReviewCategory; seed?: string } = {},
  limit = 2,
): CustomerReview[] => {
  const { town, category, seed } = opts;
  const score = (r: CustomerReview) => {
    let s = 0;
    if (town && r.location.toLowerCase().startsWith(town.toLowerCase())) s += 4;
    if (category && r.category === category) s += 2;
    if (r.featured) s += 1;
    return s;
  };
  return [...customerReviews]
    .sort(
      (a, b) =>
        score(b) - score(a) ||
        (seed
          ? hash(seed + a.authorName) - hash(seed + b.authorName)
          : new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()),
    )
    .slice(0, limit);
};

interface AttributedReviewsProps {
  town?: string;
  category?: ReviewCategory;
  heading?: string;
  tone?: "light" | "dark";
  className?: string;
}

const AttributedReviews = ({
  town,
  category,
  heading,
  tone = "light",
  className = "",
}: AttributedReviewsProps) => {
  const { pathname } = useLocation();
  const reviews = pickAttributedReviews({ town, category, seed: pathname });
  if (!reviews.length) return null;

  const isDark = tone === "dark";
  const title =
    heading ?? (town ? `What ${town}-area homeowners say` : "What homeowners say");

  return (
    <section className={`${className}`} aria-label="Customer reviews">
      <h2
        className={`font-heading font-bold text-lg md:text-xl mb-4 ${
          isDark ? "text-dark-section-foreground" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {reviews.map((r) => (
          <figure
            key={`${r.authorName}-${r.datePublished}`}
            className={`rounded-sm p-5 border ${
              isDark
                ? "border-[hsl(var(--highland-gold)/0.15)] bg-[hsl(var(--dark-section-foreground)/0.04)]"
                : "bg-card border-border"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="flex" role="img" aria-label={`${r.ratingValue} out of 5 stars`}>
                {Array.from({ length: r.ratingValue }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[hsl(var(--gold-ink))] text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                ))}
              </div>
              <Quote
                className={`w-3.5 h-3.5 ml-auto ${
                  isDark ? "text-dark-section-muted" : "text-muted-foreground/50"
                }`} aria-hidden="true" />
            </div>
            <blockquote
              className={`text-body-xs md:text-sm leading-relaxed font-body ${
                isDark ? "text-dark-section-foreground" : "text-muted-foreground"
              }`}
            >
              "{r.reviewBody}"
            </blockquote>
            <figcaption
              className={`mt-4 pt-3 border-t text-body-xs font-body ${
                isDark
                  ? "border-[hsl(var(--highland-gold)/0.12)] text-dark-section-muted"
                  : "border-border text-muted-foreground"
              }`}
            >
              <span
                className={`font-semibold ${
                  isDark ? "text-dark-section-foreground" : "text-foreground"
                }`}
              >
                {firstName(r.authorName)}
              </span>
              {" · "}
              {r.location}
              {" · "}
              {r.project}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default AttributedReviews;
