import { Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getCallReason } from "@/lib/urgent-intent";
import CTAProofPoints from "@/components/trust/CTAProofPoints";

interface CallFirstCTAProps {
  /** Town name for the reason line + analytics segmentation. */
  townName?: string | null;
  townSlug?: string | null;
  /** Analytics click location, e.g. "hero" or "page_close". */
  location?: string;
  /** Optional secondary (form) path so the page is never a dead end. */
  secondaryLabel?: string;
  secondaryTo?: string;
  /** Override the one-line reason to call instead of writing. */
  reason?: string;
  tone?: "dark" | "light";
  className?: string;
}

/**
 * Phone as a first-class conversion (CRO Prompt 12). The tap-to-call button is
 * the primary action, the number is visible as text, and a single line explains
 * why calling beats writing. phone_click fires from the global GTM delegate
 * with page_type and town attached.
 */
const CallFirstCTA = ({
  townName,
  townSlug,
  location = "hero",
  secondaryLabel,
  secondaryTo,
  reason,
  tone = "dark",
  className = "",
}: CallFirstCTAProps) => {
  const { pathname } = useLocation();
  const dark = tone === "dark";

  return (
    <div
      className={className}
      data-gtm-location={location}
      {...(townSlug ? { "data-gtm-town": townSlug } : {})}
    >
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
        <a
          href="tel:+18285247773"
          aria-label="Call Highlander at (828) 524-7773"
          className="btn btn-primary btn-md md:text-body md:px-10"
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          <span>Call (828) 524-7773</span>
        </a>
        {secondaryLabel && secondaryTo && (
          <Link
            to={secondaryTo}
            className={`font-body font-semibold text-body-xs md:text-body-sm px-6 py-3 rounded-sm inline-flex items-center justify-center min-h-[48px] transition-all ${
              dark
                ? "border border-white/20 text-white/90 hover:bg-white/10"
                : "border border-border text-foreground hover:bg-muted"
            }`}
          >
            {secondaryLabel}
          </Link>
        )}
      </div>
      <p
        className={`mt-3 text-body-xs md:text-body-xs font-body leading-snug max-w-xl ${
          dark ? "text-white/80" : "text-muted-foreground"
        }`}
      >
        {reason ?? getCallReason(pathname, townName)}
      </p>
      <CTAProofPoints
        align="start"
        tone={dark ? "dark" : "light"}
        area={townName ? `${townName} and the surrounding area` : undefined}
        className="mt-4"
      />
    </div>
  );
};

export default CallFirstCTA;
