import { Link } from "react-router-dom";
import { Shield, Star, Clock, BadgeCheck, ArrowRight, Users, MapPin, Hammer } from "lucide-react";
import { customerReviews, type CustomerReview } from "@/data/reviews";
import { projectDetails } from "@/data/projects";
import { towns } from "@/data/towns";
import { counties } from "@/data/counties";
import { BUSINESS, CREDENTIALS as BUSINESS_CREDENTIALS, REVIEW_LINE_AS_OF } from "@/data/business";

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
  /**
   * full    — card with project photo, credentials and a review (form sidebars)
   * compact — same card without the photo
   * band    — full-width horizontal proof strip for service and town pages
   */
  variant?: "full" | "compact" | "band";
  className?: string;
}

/** Verifiable items only — sourced from BUSINESS.credentials. */
const CREDENTIALS = BUSINESS_CREDENTIALS.map((c, i) => ({
  icon: i === 0 ? Shield : BadgeCheck,
  label: c.label,
  href: c.href,
}));

const ConversionTrustBlock = ({
  category = "roofing",
  town,
  variant = "full",
  className = "",
}: ConversionTrustBlockProps) => {
  const review = pickReview(category, town);
  const project = pickProject(category, town);

  if (variant === "band") {
    const items = [
      { icon: Shield, label: BUSINESS.licenseNumber, detail: "Licensed NC General Contractor · fully insured" },
      { icon: Users, label: `Family-owned in Franklin since ${BUSINESS.foundingYear}`, detail: "Showrooms in Franklin & Sylva" },
      { icon: Star, label: REVIEW_LINE_AS_OF, detail: "Google Business Profile reviews" },
      { icon: MapPin, label: `${towns.length} WNC towns served`, detail: `Across ${counties.length} mountain counties` },
      project
        ? { icon: Hammer, label: `Recent: ${project.type}`, detail: `${project.location} · ${project.scope}` }
        : { icon: Hammer, label: "Recent mountain projects", detail: "Documented start to finish" },
    ];

    return (
      <section
        aria-label="Credentials and service coverage"
        className={`border-y border-border bg-secondary/40 ${className}`}
      >
        <div className="container-tight px-6 md:px-10 py-8 md:py-10">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
            {items.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <item.icon className="w-4 h-4 mt-0.5 text-[hsl(var(--gold-ink))] flex-shrink-0" />
                <div>
                  <p className="text-body-xs font-heading font-bold text-foreground leading-snug">{item.label}</p>
                  <p className="text-body-xs font-body text-muted-foreground leading-relaxed mt-0.5">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <aside
      aria-label="Credentials, reviews and response time"
      className={`bg-card border border-border rounded-sm overflow-hidden ${className}`}
    >
      {variant === "full" && project && (
        <Link to={`/projects/${project.slug}`} className="block relative group">
          <img width={1600} height={1067}
            src={project.heroImage}
            alt={`${project.type} project completed by Highlander in ${project.location}`}
            loading="lazy"
            decoding="async"
            className="w-full h-40 md:h-44 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute bottom-0 left-0 right-0 bg-foreground/70 text-background text-caption font-body px-3 py-2 flex items-center justify-between gap-2">
            <span>{project.type} — {project.location}</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          </span>
        </Link>
      )}

      <div className="p-5 space-y-4">
        <div className="flex items-start gap-2.5">
          <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
          <p className="text-body-xs font-body font-medium text-foreground leading-relaxed">
            {RESPONSE_PROMISE}
          </p>
        </div>

        <ul className="grid gap-1.5">
          {CREDENTIALS.map((c) => (
            <li key={c.label} className="flex items-center gap-2 text-body-xs font-body text-muted-foreground">
              <c.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              {c.href ? (
                <a href={c.href} target="_blank" rel="noopener noreferrer nofollow" className="hover:text-foreground transition-colors underline underline-offset-2">
                  {c.label}
                </a>
              ) : (
                c.label
              )}
            </li>
          ))}
        </ul>

        {review && (
          <figure className="border-t border-border pt-4">
            <div className="flex gap-0.5 mb-2" role="img" aria-label={`${review.ratingValue} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-[hsl(var(--gold-ink))]" aria-hidden="true" />
              ))}
            </div>
            <blockquote className="text-body-xs font-body leading-relaxed text-foreground/85">
              "{review.reviewBody.length > 190 ? `${review.reviewBody.slice(0, 190).trim()}…` : review.reviewBody}"
            </blockquote>
            <figcaption className="mt-2 text-caption font-body text-muted-foreground">
              {review.authorName} · {review.location} · {review.project}
            </figcaption>
          </figure>
        )}
      </div>
    </aside>
  );
};

export default ConversionTrustBlock;
