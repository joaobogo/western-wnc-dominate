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
  <aside className="my-10 border-l-2 border-[hsl(var(--highland-gold))] bg-secondary/50 rounded-sm p-5 md:p-6">
    {town && (
      <span className="inline-flex items-center gap-1.5 text-[10px] font-body font-bold uppercase tracking-[0.14em] text-muted-foreground mb-2">
        <MapPin className="w-3 h-3 text-[hsl(var(--gold-ink))]" /> {town}, NC
      </span>
    )}
    <h2 className="font-heading font-bold text-foreground text-base md:text-lg mb-2">{cta.midHeadline}</h2>
    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{cta.midBody}</p>
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
        className="cta-gradient text-accent-foreground font-bold px-5 py-3 rounded-sm inline-flex items-center justify-center gap-2 text-sm hover:opacity-90 transition-opacity"
      >
        {cta.callFirst ? cta.ctaLabel : "Request an Inspection"} <ArrowRight className="w-4 h-4" />
      </Link>
      <a
        href="tel:+18285247773"
        className="border border-primary/25 text-primary font-semibold px-5 py-3 rounded-sm inline-flex items-center justify-center gap-2 text-sm hover:bg-primary/5 transition-colors"
      >
        <Phone className="w-4 h-4" /> (828) 524-7773
      </a>
    </div>
  </aside>
);

export default BlogMidArticleCTA;
