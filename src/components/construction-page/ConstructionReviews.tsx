import { Link } from "react-router-dom";
import { ArrowRight, Quote, Star } from "lucide-react";
import { REVIEW_COUNT, REVIEW_RATING } from "@/data/business";
import { constructionReviews } from "@/lib/construction-reviews";

const Stars = ({ count = 5 }: { count?: number }) => (
  <span className="inline-flex" aria-hidden="true">
    {Array.from({ length: count }, (_, i) => (
      <Star key={i} className="h-4 w-4 fill-[hsl(var(--highland-gold))] text-[hsl(var(--highland-gold))]" />
    ))}
  </span>
);

/**
 * One review section per page (plan §3.2.8 and §5): only reviews that
 * mention building work, word for word, plus the overall rating line.
 * Never padded with roofing reviews.
 */
const ConstructionReviews = () => {
  const reviews = constructionReviews();
  return (
    <section className="section-padding bg-secondary/40" aria-labelledby="construction-reviews-heading">
      <div className="container-tight">
        <p className="eyebrow mb-2 block">Google reviews</p>
        <h2 id="construction-reviews-heading" className="section-heading">What customers say</h2>
        <p className="mt-3 inline-flex flex-wrap items-center gap-2 font-body text-sm font-semibold text-muted-foreground">
          <Stars />
          {REVIEW_RATING}/5 from {REVIEW_COUNT} Google reviews.
          {reviews.length > 0 && " Most are for roofing; these mention building work."}
        </p>
        {reviews.length > 0 && (
          <div className={`mt-8 grid gap-5 ${reviews.length > 1 ? "md:grid-cols-2" : ""} ${reviews.length > 2 ? "lg:grid-cols-3" : ""}`}>
            {reviews.map((review) => (
              <blockquote key={review.id} className="relative flex h-full flex-col rounded-sm border border-border bg-card p-6 shadow-sm">
                <Quote aria-hidden="true" className="absolute right-5 top-5 h-8 w-8 text-[hsl(var(--highland-gold))]/50" />
                <Stars count={review.rating} />
                <p className="mt-3 font-body text-[1.02rem] leading-relaxed text-foreground">“{review.text}”</p>
                <footer className="mt-auto pt-4 font-body text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">{review.name}</span> · {review.source} review
                </footer>
              </blockquote>
            ))}
          </div>
        )}
        <Link to="/reviews" className="mt-6 inline-flex min-h-12 items-center gap-1.5 font-bold text-primary underline-offset-4 hover:underline">
          Read all reviews <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};

export default ConstructionReviews;
