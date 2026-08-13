import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import CTAProofPoints from "@/components/trust/CTAProofPoints";

type Props = {
  /** Short line above the headline, e.g. "Storm Response". */
  eyebrow?: string;
  heading?: string;
  body?: string;
  /** Primary CTA — always a form. */
  primaryLabel?: string;
  primaryTo?: string;
  /** Optional third path so a page is never a dead end. */
  secondaryLabel?: string;
  secondaryTo?: string;
  /** Used for analytics so we can see which page closed the lead. */
  context: string;
};

/**
 * The closing conversion block every content page ends with: one form CTA,
 * one phone CTA, and an optional secondary path onward. Deliberately light
 * compared to CTABlock so it can sit at the bottom of any page.
 */
const PageCloseCTA = ({
  eyebrow = "Next Step",
  heading = "Ready to talk about your property?",
  body = "Tell us what's going on and a Highlander advisor will follow up personally with a clear next step — no obligation, no sales pressure.",
  primaryLabel = "Get My Written Estimate",
  primaryTo = "/consultation",
  secondaryLabel,
  secondaryTo,
  context,
}: Props) => {
  return (
    <section aria-label="Next step" className="section-dark dark-surface border-t border-dark-section-border">
      <div className="section-padding">
        <div className="container-tight max-w-3xl text-center">
          <span className="text-caption font-body font-semibold uppercase tracking-[0.3em] text-[hsl(var(--gold-ink))] mb-4 block">
            {eyebrow}
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-dark-section-foreground mb-4 leading-[1.15]">
            {heading}
          </h2>
          <p className="text-dark-section-foreground font-body text-body-sm md:text-body-sm leading-relaxed mb-8">
            {body}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <Link
              to={primaryTo}
              onClick={() => trackEvent("cta_click", { label: primaryLabel, elementId: `page-close-cta-${context}` })}
              className="cta-gradient text-accent-foreground font-body font-bold text-sm md:text-base px-8 md:px-12 py-4 rounded-none inline-flex items-center justify-center gap-3 hover:opacity-90 transition-all uppercase tracking-[0.1em] min-h-[56px]"
            >
              {primaryLabel}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href="tel:+18285247773"
              onClick={() => trackEvent("phone_click", { label: "Phone CTA", elementId: `page-close-call-${context}` })}
              className="border-2 border-dark-section-border text-dark-section-foreground font-body font-bold text-sm md:text-base px-8 py-4 rounded-none inline-flex items-center justify-center gap-3 hover:bg-dark-section-foreground/[0.08] transition-all min-h-[56px]"
            >
              <Phone className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
              (828) 524-7773
            </a>
          </div>
          <CTAProofPoints tone="dark" className="mt-6" />
          {secondaryLabel && secondaryTo && (
            <p className="mt-6 text-body-xs font-body">
              <Link to={secondaryTo} className="text-dark-section-muted underline hover:text-[hsl(var(--gold-ink))] transition-colors">
                {secondaryLabel}
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageCloseCTA;
