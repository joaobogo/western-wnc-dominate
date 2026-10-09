import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import WorkGallery from "@/components/gallery/WorkGallery";
import type { WorkDivision } from "@/data/work-photos";

interface WorkGallerySectionProps {
  eyebrow?: string;
  heading: string;
  body?: string;
  /** Show only one division (no filter tabs). Omit for the mixed gallery with tabs. */
  division?: WorkDivision;
  limit?: number;
  /** Photos already shown elsewhere on the page — skipped so nothing repeats. */
  excludeImages?: string[];
  className?: string;
}

/** A short, even-grid teaser of real work photos that links to the full gallery. */
const WorkGallerySection = ({
  eyebrow = "Work Gallery",
  heading,
  body,
  division,
  limit = 6,
  excludeImages,
  className = "bg-secondary/40",
}: WorkGallerySectionProps) => (
  <section className={`py-16 md:py-24 border-t border-border/60 ${className}`} aria-labelledby="work-gallery-teaser-heading">
    <div className="container-tight">
      <div className="max-w-3xl mb-10">
        <p className="text-[hsl(var(--gold-ink))] font-bold text-xs uppercase tracking-[0.25em] mb-4">{eyebrow}</p>
        <h2 id="work-gallery-teaser-heading" className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-tight">
          {heading}
        </h2>
        {body && <p className="text-muted-foreground text-lg leading-relaxed">{body}</p>}
      </div>
      <WorkGallery
        layout="grid"
        limit={limit}
        initialFilter={division ?? "all"}
        showFilters={!division}
        excludeImages={excludeImages}
      />
      <Link
        to="/recent-projects"
        className="mt-10 inline-flex min-h-[44px] items-center gap-2 font-body font-bold text-caption uppercase tracking-[0.15em] text-primary hover:text-primary/80 transition-colors"
      >
        See all recent projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  </section>
);

export default WorkGallerySection;
