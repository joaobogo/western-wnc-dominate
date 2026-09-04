import { Star } from "lucide-react";
import { gbpReviewUrl, isReviewUrlPlaceholder, type BusinessLocation } from "@/data/business";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface LeaveReviewLinkProps {
  /** Showroom whose Google Business Profile receives the review. */
  location: BusinessLocation;
  /** Visible text; defaults to "Leave a Google review — <Showroom name>". */
  label?: string;
  className?: string;
}

/**
 * "Leave a Google review" link for one showroom. Opens the profile's review
 * dialog in a new tab (BusinessLocation.reviewUrl via gbpReviewUrl) and reports
 * the click through the existing analytics helper as `review_link_click` with
 * the showroom id as the location parameter — no extra tag.
 */
const LeaveReviewLink = ({ location, label, className }: LeaveReviewLinkProps) => {
  const href = gbpReviewUrl(location);
  const onClick = () => {
    void trackEvent("review_link_click", {
      label: location.id,
      elementId: `review-link-${location.id}`,
      metadata: { location: location.id, showroom: location.name, placeholder: isReviewUrlPlaceholder(location) },
    });
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-location={location.id}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 font-body font-medium text-primary underline underline-offset-4 hover:no-underline",
        className,
      )}
    >
      <Star className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{label ?? `Leave a Google review — ${location.name}`}</span>
    </a>
  );
};

export default LeaveReviewLink;
