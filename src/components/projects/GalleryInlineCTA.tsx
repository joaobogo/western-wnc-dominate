import { PHONE_DISPLAY } from "@/data/business";
import CTAProofLine from "@/components/trust/CTAProofLine";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { trackGalleryCtaClick } from "@/lib/gtm";

interface Props {
  /** Which break this is (1-based) — used for analytics only. */
  position: number;
  /** Towns represented in the projects just above this block. */
  towns?: string[];
  className?: string;
}

/**
 * Inline CTA placed after every three projects (CRO Prompt 36). Proof pages
 * should sell: each set of three gets an exit to a scope request or a call.
 */
const GalleryInlineCTA = ({ position, towns = [], className = "" }: Props) => {
  const townLine =
    towns.length > 0
      ? `We've worked in ${towns.slice(0, 3).join(", ")} — yours could be next.`
      : "Real WNC homes, real crews, written scopes.";

  return (
    <div
      className={`md:col-span-2 lg:col-span-3 bg-secondary/60 border border-border rounded-sm p-6 md:p-7 flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-between gap-4 ${className}`}
    >
      <div>
        <p className="font-heading font-bold text-foreground text-base md:text-lg">
          Want work like this on your home?
        </p>
        <p className="text-muted-foreground text-sm mt-1">{townLine}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 md:flex-shrink-0">
        <Link
          to="/request-inspection"
          onClick={() =>
            trackGalleryCtaClick({
              gallery: "project_gallery",
              cta_text: "Request a Scope",
              destination_url: "/request-inspection",
              cta_position: `gallery_inline_${position}`,
            })
          }
          className="cta-gradient text-accent-foreground font-bold px-5 py-3 rounded-sm inline-flex items-center justify-center gap-2 text-sm hover:opacity-90 transition-opacity"
        >
          Request a Scope <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
        <a
          href="tel:+18285247773"
          className="btn btn-secondary btn-sm"
        >
          <Phone className="w-4 h-4" aria-hidden="true" /> {PHONE_DISPLAY}
        </a>
      </div>
      <CTAProofLine align="start" className="md:basis-full" />
    </div>
  );
};

export default GalleryInlineCTA;
