import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { towns } from "@/data/towns";
import { INDEXABLE_TOWN_SERVICES } from "@/data/indexable-town-services";

interface TownServiceLinksProps {
  /** Service slug as used in /service-areas/<town>/<service>. */
  service: string;
  /** Lower-case service name for the link text, e.g. "metal roofing". */
  label: string;
  heading: string;
  intro?: string;
  className?: string;
}

/**
 * Links from a service or cost page to the same service in each town that has
 * its own indexable page (Nov 2026 local SEO analysis). Only pages in the
 * sitemap are linked; hidden (noindex) town pages are not.
 */
const TownServiceLinks = ({ service, label, heading, intro, className = "" }: TownServiceLinksProps) => {
  const townSlugs = INDEXABLE_TOWN_SERVICES[service] ?? [];
  const items = townSlugs
    .map((slug) => towns.find((t) => t.slug === slug))
    .filter((t): t is (typeof towns)[number] => !!t);
  if (!items.length) return null;

  return (
    <section className={`section-padding bg-secondary/40 ${className}`} aria-labelledby={`town-links-${service}`}>
      <div className="container-tight">
        <div className="max-w-2xl mb-6">
          <span className="eyebrow mb-3 block">By Town</span>
          <h2 id={`town-links-${service}`} className="section-heading mb-3">
            {heading}
          </h2>
          {intro && <p className="text-muted-foreground font-body leading-relaxed">{intro}</p>}
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((t) => (
            <li key={t.slug}>
              <Link
                to={`/service-areas/${t.slug}/${service}`}
                className="group flex h-full items-start justify-between gap-3 border border-border bg-card px-5 py-4 rounded-sm hover:border-primary/40 transition-colors"
              >
                <span>
                  <span className="block font-heading font-bold text-foreground">
                    {label.charAt(0).toUpperCase() + label.slice(1)} in {t.name}
                  </span>
                  <span className="mt-1 flex items-center gap-1 text-body-xs font-body text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {t.county} · {t.elevation}
                  </span>
                </span>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TownServiceLinks;
