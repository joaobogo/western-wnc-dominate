import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { trackCtaClick } from "@/lib/gtm";
import type { BlogCtaTarget } from "@/lib/blog-cta";

interface Props {
  cta: BlogCtaTarget;
  town?: string;
}

/**
 * Closing CTA (CRO Prompt 35): the relevant service page plus the phone number.
 * The local link web stays below this block.
 */
const BlogClosingCTA = ({ cta, town }: Props) => (
  <section
    className="mt-14 border-t-2 border-[hsl(var(--highland-gold))] bg-secondary/40 p-6 md:p-9"
    aria-labelledby="blog-closing-cta"
  >
    <span className="block text-caption font-body font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-ink))] mb-3">
      Next step
    </span>
    <h2
      id="blog-closing-cta"
      className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight mb-3"
    >
      {cta.closeHeadline}
    </h2>
    <p className="text-muted-foreground text-base leading-relaxed mb-6 max-w-[60ch]">{cta.closeBody}</p>
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href="tel:+18285247773"
        className="btn btn-primary btn-md"
      >
        <Phone className="w-4 h-4" /> Call (828) 524-7773
      </a>
      <Link
        to={cta.servicePath}
        onClick={() =>
          trackCtaClick({
            cta_location: "blog_closing",
            cta_text: cta.ctaLabel,
            cta_type: "secondary",
            destination_url: cta.servicePath,
            town: town ?? null,
          })
        }
        className="btn btn-secondary btn-md"
      >
        {cta.ctaLabel} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
    <p className="text-muted-foreground text-xs mt-5">
      Calls are answered by the local team during working hours. Messages get a reply within one business day.
    </p>
  </section>
);

export default BlogClosingCTA;
