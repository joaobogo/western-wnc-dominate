import { Link } from "react-router-dom";
import { ArrowRight, Phone, Shield } from "lucide-react";
import { trackCtaClick } from "@/lib/gtm";
import type { BlogCtaTarget } from "@/lib/blog-cta";

interface Props {
  cta: BlogCtaTarget;
  town?: string;
}

/** Sticky desktop sidebar CTA — stays in view for the length of the article. */
const BlogSidebarCTA = ({ cta, town }: Props) => (
  <div className="bg-primary rounded-sm p-5 md:p-6">
    <Shield className="w-6 h-6 text-[hsl(var(--gold-ink))] mb-3" aria-hidden="true" />
    <h2 className="font-heading font-bold text-primary-foreground text-sm mb-2">
      {town ? `Roofing help in ${town}, NC` : "Talk to a local roofer"}
    </h2>
    <p className="text-primary-foreground/85 text-xs leading-relaxed mb-4">
      Photos, findings, and a written scope — no pressure to buy anything.
    </p>
    <a
      href="tel:+18285247773"
      className="btn btn-primary btn-sm w-full mb-2.5"
    >
      <Phone className="w-4 h-4" aria-hidden="true" /> (828) 524-7773
    </a>
    <Link
      to={cta.callFirst ? cta.servicePath : "/request-inspection"}
      onClick={() =>
        trackCtaClick({
          cta_location: "blog_sidebar_sticky",
          cta_text: cta.callFirst ? cta.ctaLabel : "Request an Inspection",
          cta_type: "secondary",
          destination_url: cta.callFirst ? cta.servicePath : "/request-inspection",
          town: town ?? null,
        })
      }
      className="border border-primary-foreground/30 text-primary-foreground font-semibold px-4 py-3 rounded-sm inline-flex items-center gap-2 text-sm hover:bg-primary-foreground/10 transition-colors w-full justify-center"
    >
      {cta.callFirst ? cta.ctaLabel : "Request an Inspection"} <ArrowRight className="w-4 h-4" aria-hidden="true" />
    </Link>
  </div>
);

export default BlogSidebarCTA;
