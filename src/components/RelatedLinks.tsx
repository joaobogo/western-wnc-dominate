import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface RelatedLinkItem {
  label: string;
  href: string;
  description?: string;
}

interface RelatedLinksProps {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  links: RelatedLinkItem[];
  columns?: 2 | 3;
  className?: string;
}

/**
 * Contextual internal-linking block. Used to strengthen the internal
 * link graph between backlink destination pages (roofing, construction,
 * service areas, blog, trust pages). Uses descriptive anchor text and
 * links only to canonical URLs.
 */
const RelatedLinks = ({
  eyebrow = "Keep Exploring",
  heading = "Related pages you may find useful",
  intro,
  links,
  columns = 2,
  className = "",
}: RelatedLinksProps) => {
  if (!links.length) return null;
  const gridCols = columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <section
      aria-label="Related pages"
      className={`section-padding bg-secondary/30 ${className}`}
    >
      <div className="container-tight max-w-6xl">
        <div className="mb-8 md:mb-10 text-center">
          {eyebrow && <span className="eyebrow mb-3 block">{eyebrow}</span>}
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            {heading}
          </h2>
          {intro && (
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm md:text-base">
              {intro}
            </p>
          )}
        </div>
        <ul className={`grid grid-cols-1 ${gridCols} gap-3 md:gap-4`}>
          {links.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="btn btn-secondary btn-md group md:px-6 md:py-5"
              >
                <div className="flex-1">
                  <div className="font-heading font-semibold text-foreground text-body-sm md:text-base leading-snug group-hover:text-primary transition-colors">
                    {item.label}
                  </div>
                  {item.description && (
                    <p className="text-muted-foreground text-xs md:text-sm mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 mt-1 text-primary opacity-70 group-hover:translate-x-1 transition-transform flex-shrink-0" aria-hidden="true">
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RelatedLinks;