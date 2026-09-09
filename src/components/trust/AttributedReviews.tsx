import ReviewCard from "@/components/reviews/ReviewCard";
import {
  REVIEWS,
  reviewsForService,
  reviewsForTown,
  type Review,
  type ServiceTag,
} from "@/data/reviews";

/**
 * A short strip of REAL published reviews, filtered to the page it sits on.
 *
 * If nothing matches, the whole section is omitted — never a placeholder, a
 * sample, or an unrelated review used as filler. Today only Dillsboro has a
 * town match, so most town pages fall back to their service tags or render
 * nothing at all. That is the intended behaviour.
 */
interface AttributedReviewsProps {
  /** Service tags this page is about. Omit on the homepage to show the newest. */
  services?: ServiceTag[];
  /** Town name as it appears in the reviews data (e.g. "Dillsboro"). */
  town?: string;
  heading?: string;
  tone?: "light" | "dark";
  limit?: number;
  className?: string;
}

export const pickReviews = ({
  services,
  town,
  limit = 2,
}: {
  services?: ServiceTag[];
  town?: string;
  limit?: number;
}): Review[] => {
  // A town page shows only reviews that name that town. Today that is Dillsboro
  // alone, so every other town page renders nothing — deliberate, per spec.
  if (town) return reviewsForTown(town).slice(0, limit);

  // `services` provided (even as an empty list) means "match strictly". An empty
  // list is how a page says it has no matching review category at all, e.g.
  // construction, and must NOT fall through to the newest-reviews default.
  if (services !== undefined) return reviewsForService(services).slice(0, limit);

  // Unscoped (homepage): the newest published reviews.
  return [...REVIEWS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
};

const AttributedReviews = ({
  services,
  town,
  heading,
  tone = "light",
  limit = 2,
  className = "",
}: AttributedReviewsProps) => {
  const reviews = pickReviews({ services, town, limit });

  // Nothing relevant to show — render nothing at all.
  if (reviews.length === 0) return null;

  const dark = tone === "dark";

  return (
    <section aria-label="Customer reviews" className={className}>
      {heading && (
        <h2
          className={`text-2xl md:text-3xl font-heading font-bold mb-6 leading-tight ${
            dark ? "text-dark-section-foreground" : "text-foreground"
          }`}
        >
          {heading}
        </h2>
      )}
      <div className={`grid gap-5 ${reviews.length > 1 ? "md:grid-cols-2" : ""}`}>
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} tone={tone} />
        ))}
      </div>
    </section>
  );
};

export default AttributedReviews;
