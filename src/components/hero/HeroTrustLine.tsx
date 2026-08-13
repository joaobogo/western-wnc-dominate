import { GOOGLE_REVIEW_AGGREGATE } from "@/data/reviews";

/**
 * Single-line hero trust proof. One line, three verifiable facts.
 * Used above the fold on every major hero so the trust signal is never lost.
 */
const HeroTrustLine = ({ className = "" }: { className?: string }) => {
  const { ratingValue, reviewCount } = GOOGLE_REVIEW_AGGREGATE;
  const items = [
    `${ratingValue}★ Google · ${reviewCount}+ reviews`,
    "Licensed & insured",
    "Crews based in Franklin, NC",
  ];

  return (
    <p
      className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 font-body text-caption md:text-body-xs font-semibold uppercase tracking-[0.1em] text-primary-foreground ${className}`}
    >
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-2.5">
          {i > 0 && (
            <span aria-hidden="true" className="h-3 w-px bg-primary-foreground/30" />
          )}
          <span className={i === 0 ? "text-[hsl(var(--gold-ink))]" : undefined}>{item}</span>
        </span>
      ))}
    </p>
  );
};

export default HeroTrustLine;