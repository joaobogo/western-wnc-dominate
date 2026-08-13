import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { trackCtaClick } from "@/lib/gtm";
import { getProjectServiceTags, getTownPath } from "@/lib/project-service-tags";

interface Props {
  location: string;
  type: string;
  category: "roofing" | "construction" | string;
  className?: string;
}

/**
 * Location-aware CTA for project detail pages (CRO Prompt 36):
 * "We do this work in {town} — request a scope", plus the service tags so a
 * visitor can jump straight to the matching service page.
 */
const ProjectLocationCTA = ({ location, type, category, className = "" }: Props) => {
  const { town, path: townPath } = getTownPath(location);
  const tags = getProjectServiceTags(type, category);
  const scopePath = category === "construction" ? "/construction/consultation" : "/request-inspection";

  return (
    <section className={`bg-primary rounded-sm p-6 md:p-8 ${className}`} aria-labelledby="project-location-cta">
      <span className="inline-flex items-center gap-1.5 text-caption font-body font-bold uppercase tracking-[0.15em] text-[hsl(var(--gold-ink))] mb-3">
        <MapPin className="w-4 h-4" aria-hidden="true"> {location}
      </span>
      <h2
        id="project-location-cta"
        className="text-xl md:text-2xl font-heading font-bold text-primary-foreground mb-2"
      >
        We do this work in {town} — request a scope
      </h2>
      <p className="text-primary-foreground/85 text-sm leading-relaxed mb-5 max-w-xl">
        Same crews, same standard. We'll look at your {type.toLowerCase()} project in person and put the scope,
        materials, and timing in writing before anything starts.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Link
          to={scopePath}
          onClick={() =>
            trackCtaClick({
              cta_location: "project_detail_location_cta",
              cta_text: "Request a Scope",
              cta_type: "primary",
              destination_url: scopePath,
              town,
            })
          }
          className="cta-gradient text-accent-foreground font-bold px-6 py-3.5 rounded-sm inline-flex items-center justify-center gap-2 text-sm hover:opacity-90 transition-opacity"
        >
          Request a Scope <ArrowRight className="w-4 h-4" aria-hidden="true">
        </Link>
        <a
          href="tel:+18285247773"
          className="btn btn-secondary btn-md btn-on-dark"
        >
          <Phone className="w-4 h-4" aria-hidden="true"> (828) 524-7773
        </a>
      </div>

      <div className="border-t border-primary-foreground/15 pt-5">
        <p className="text-caption font-body font-bold uppercase tracking-[0.15em] text-primary-foreground/60 mb-3">
          Services on this project
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.path}
              to={tag.path}
              onClick={() =>
                trackCtaClick({
                  cta_location: "project_detail_service_tag",
                  cta_text: tag.label,
                  cta_type: "tag",
                  destination_url: tag.path,
                  town,
                })
              }
              className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors px-3 py-2 rounded-sm"
            >
              {tag.label} <ArrowRight className="w-4 h-4" aria-hidden="true">
            </Link>
          ))}
          {townPath && (
            <Link
              to={townPath}
              className="btn btn-ghost btn-sm btn-on-dark"
            >
              Roofing in {town}, NC <ArrowRight className="w-4 h-4" aria-hidden="true">
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectLocationCTA;
