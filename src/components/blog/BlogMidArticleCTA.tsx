import { PHONE_DISPLAY, PHONE_TEL } from "@/data/business";
import CTAProofLine from "@/components/trust/CTAProofLine";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, MapPin } from "lucide-react";
import { trackCtaClick } from "@/lib/gtm";
import type { BlogCtaTarget } from "@/lib/blog-cta";

interface Props {
  cta: BlogCtaTarget;
  town?: string;
}

/**
 * Contextual mid-article CTA (CRO Prompt 35). Tied to the post topic and town
 * so it reads as the next step in the article, not an ad break.
 */
const BlogMidArticleCTA = ({ cta, town }: Props) => (
  <aside className="my-12 max-w-[68ch] border-y border-border py-7">
    <span className="block text-caption font-body font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-ink))] mb-3">
      From the field
    </span>
    {town && (
      <span className="inline-flex items-center gap-1.5 text-caption font-body font-bold uppercase tracking-[0.14em] text-muted-foreground mb-2">
        <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" /> {town}, NC
      </span>
    )}
    <h2 className="font-heading font-bold text-foreground text-xl md:text-2xl leading-snug mb-2">{cta.midHeadline}</h2>
    <p className="text-muted-foreground text-base leading-relaxed mb-5">{cta.midBody}</p>
    <div className="flex flex-col sm:flex-row gap-3">
      <Link
        to={cta.callFirst ? cta.servicePath : "/request-inspection"}
        onClick={() =>
          trackCtaClick({
            cta_location: "blog_mid_article",
            cta_text: cta.callFirst ? cta.ctaLabel : "Request an Inspection",
            cta_type: "primary",
            destination_url: cta.callFirst ? cta.servicePath : "/request-inspection",
            town: town ?? null,
          })
        }
        className="btn btn-primary btn-sm"
      >
        {cta.callFirst ? cta.ctaLabel : "Request an Inspection"} <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
      <a
        href={PHONE_TEL}
        className="btn btn-secondary btn-sm"
      >
        <Phone className="w-4 h-4" aria-hidden="true" /> {PHONE_DISPLAY}
      </a>
    </div>
    <CTAProofLine align="start" className="mt-4" />
  </aside>
);

export default BlogMidArticleCTA;
