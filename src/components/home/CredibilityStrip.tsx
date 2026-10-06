import { Star, ShieldCheck, MapPin } from "lucide-react";
import { GOOGLE_REVIEW_AGGREGATE } from "@/data/reviews";
import { FRANKLIN_STREET } from "@/data/business";

/**
 * Tight three-item proof band directly under the hero.
 * Rating, licensing, locality — verifiable facts only.
 * No guarantees, warranty promises, or response-time claims.
 */
const CredibilityStrip = () => {
  const { ratingValue, reviewCount } = GOOGLE_REVIEW_AGGREGATE;

  const proof = [
    {
      icon: Star,
      label: `${ratingValue}★ Google`,
      detail: `${reviewCount} verified homeowner reviews`,
    },
    {
      icon: ShieldCheck,
      label: "Licensed NC General Contractor",
      detail: "CertainTeed Credentialed Contractor",
    },
    {
      icon: MapPin,
      label: "Based in Franklin",
      detail: `${FRANKLIN_STREET} · Franklin, NC`,
    },
  ];

  return (
    <section
      aria-label="Highlander credibility"
      className="bg-primary text-primary-foreground border-y border-[hsl(var(--highland-gold)/0.25)]"
    >
      <div className="container-tight py-5 md:py-6">
        <ul className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[hsl(var(--highland-gold)/0.18)]">
          {proof.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-3 justify-center py-3 sm:py-0 sm:px-6 text-center sm:text-left"
            >
              <item.icon
                className="w-5 h-5 flex-shrink-0 text-[hsl(var(--gold-ink))]"
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="block font-body text-sm font-semibold leading-tight">
                  {item.label}
                </span>
                <span className="block font-body text-body-xs text-primary-foreground leading-snug">
                  {item.detail}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CredibilityStrip;
