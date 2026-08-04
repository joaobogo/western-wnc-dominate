import { Link } from "react-router-dom";
import { Shield, Star, Clock, BadgeCheck, ArrowRight } from "lucide-react";
import { customerReviews, type CustomerReview } from "@/data/reviews";
import { projectDetails } from "@/data/projects";

/**
 * Proof block designed to sit directly beside or beneath a page's primary CTA.
 *
 * Shows four things a visitor needs before they submit: credentials, a real
 * local review, a real project photo from the same service, and a specific
 * response-time promise. Every claim here is drawn from CLAIMS_AUDIT.md —
 * no warranty language and no 24/7 availability claims.
 */

export type TrustCategory = "roofing" | "construction" | "storm" | "commercial";

const RESPONSE_PROMISE = "Every inquiry gets a personal reply within 24 hours — most the same business day.";

/** Reviews that reference warranty terms are excluded: unverified claim surface. */
const safeReviews = customerReviews.filter((r) => !/warrant/i.test(r.reviewBody));

function pickReview(category: TrustCategory, town?: string): CustomerReview | undefined {
  const inTown = town
    ? safeReviews.filter((r) => r.location.toLowerCase().startsWith(town.toLowerCase()))
    : [];
  return (
    inTown.find((r) => r.category === category) ||
    inTown[0] ||
    safeReviews.find((r) => r.category === category) ||
    safeReviews.find((r) => r.featured) ||
    safeReviews[0]
  );
}

function pickProject(category: TrustCategory, town?: string) {
  const base = category === "construction" ? "construction" : "roofing";
  const pool = projectDetails.filter((p) => p.category === base);
  const local = town ? pool.filter((p) => p.location.toLowerCase().startsWith(town.toLowerCase())) : [];
  return local[0] || pool[0] || projectDetails[0];
}

interface ConversionTrustBlockProps {
  category?: TrustCategory;
  /** Town name, e.g. "Highlands" — pulls a local review/project when available. */
  town?: string;
  /** Compact drops the project photo — use inside narrow form sidebars. */
  variant?: "full" | "compact";
  className?: string;
}

const CREDENTIALS = [
  { icon: Shield, label: "Licensed NC General Contractor" },
  { icon: BadgeCheck, label: "Fully insured" },
  { icon: BadgeCheck, label: "CertainTeed ShingleMaster Credentialed" },
  { icon: BadgeCheck, label: "HAAG Certified Inspector" },
];

const ConversionTrustBlock = ({
  category = "roofing",
  town,
  variant = "full",
  className = "",
}: ConversionTrustBlockProps) => {
  const review = pickReview(category, town);
  const project = pickProject(category, town);

  return (
    <aside
      aria-label="Credentials, reviews and response time"
      className={`bg-card border border-border rounded-sm overflow-hidden ${className}`}
    >
      {variant === "full" && project && (
        <Link to={`/projects/${project.slug}`} className="block relative group">
          <img
            src={project.heroImage}
            alt={`${project.type} project completed by Highlander in ${project.location}`}
            loading="lazy"
            decoding="async"
            className="w-full h-40 md:h-44 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute bottom-0 left-0 right-0 bg-foreground/70 text-background text-[11px] font-body px-3 py-2 flex items-center justify-between gap-2">
            <span>{project.type} — {project.location}</span>
            <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
          </span>
        </Link>
      )}

      <div className="p-5 space-y-4">
        <div className="flex items-start gap-2.5">
          <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-[13px] font-body font-medium text-foreground leading-relaxed">
            {RESPONSE_PROMISE}
          </p>
        </div>

        <ul className="grid gap-1.5">
          {CREDENTIALS.map((c) => (
            <li key={c.label} className="flex items-center gap-2 text-[12px] font-body text-muted-foreground">
              <c.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              {c.label}
            </li>
          ))}
        </ul>

        {review && (
          <figure className="border-t border-border pt-4">
            <div className="flex gap-0.5 mb-2" role="img" aria-label={`${review.ratingValue} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-accent text-accent" />
              ))}
            </div>
            <blockquote className="text-[13px] font-body leading-relaxed text-foreground/85">
              "{review.reviewBody.length > 190 ? `${review.reviewBody.slice(0, 190).trim()}…` : review.reviewBody}"
            </blockquote>
            <figcaption className="mt-2 text-[11px] font-body text-muted-foreground">
              {review.authorName} · {review.location} · {review.project}
            </figcaption>
          </figure>
        )}
      </div>
    </aside>
  );
};

export default ConversionTrustBlock;
