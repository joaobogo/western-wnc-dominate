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
  <section className="mt-12 bg-primary rounded-sm p-6 md:p-8" aria-labelledby="blog-closing-cta">
    <h2
      id="blog-closing-cta"
      className="text-xl md:text-2xl font-heading font-bold text-primary-foreground mb-2"
    >
      {cta.closeHeadline}
    </h2>
    <p className="text-primary-foreground/85 text-sm leading-relaxed mb-5 max-w-xl">{cta.closeBody}</p>
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href="tel:+18285247773"
        className="cta-gradient text-accent-foreground font-bold px-6 py-3.5 rounded-sm inline-flex items-center justify-center gap-2 text-sm hover:opacity-90 transition-opacity"
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
        className="border border-primary-foreground/30 text-primary-foreground font-semibold px-6 py-3.5 rounded-sm inline-flex items-center justify-center gap-2 text-sm hover:bg-primary-foreground/10 transition-colors"
      >
        {cta.ctaLabel} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
    <p className="text-primary-foreground/70 text-xs mt-4">
      Calls are answered by the local team during working hours. Messages get a reply within one business day.
    </p>
  </section>
);

export default BlogClosingCTA;
