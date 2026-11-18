import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { getProjectBySlug, type ProjectDetail } from "@/data/projects";
import { smallSrc } from "@/lib/gallery-srcset";

interface ProjectSpotlightProps {
  /** Project slugs from src/data/projects.ts. Unknown slugs are skipped. */
  slugs: string[];
  eyebrow?: string;
  heading: string;
  intro?: string;
  className?: string;
}

/**
 * A real, documented Highlander job on the service page it belongs to
 * (Nov 2026 local SEO analysis: service pages showed no matching jobs).
 * Every fact on the card (title, town, scope, duration, highlight) comes
 * from the project record; nothing is written here.
 */
const ProjectSpotlight = ({ slugs, eyebrow = "Recent Project", heading, intro, className = "" }: ProjectSpotlightProps) => {
  const projects = slugs.map(getProjectBySlug).filter((p): p is ProjectDetail => !!p);
  if (!projects.length) return null;
  const two = projects.length > 1;

  return (
    <section className={`section-padding bg-background ${className}`} aria-labelledby="project-spotlight-heading">
      <div className="container-tight">
        <div className="max-w-2xl mb-8">
          <span className="eyebrow mb-3 block">{eyebrow}</span>
          <h2 id="project-spotlight-heading" className="section-heading mb-3">
            {heading}
          </h2>
          {intro && <p className="text-muted-foreground font-body leading-relaxed">{intro}</p>}
        </div>
        <ul className={`grid gap-6 ${two ? "md:grid-cols-2" : "md:grid-cols-1 max-w-4xl"}`}>
          {projects.map((p) => (
            <li key={p.slug} className="group overflow-hidden border border-border bg-card rounded-sm">
              <Link to={`/projects/${p.slug}`} className={`block ${two ? "" : "md:grid md:grid-cols-2"}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={smallSrc(p.cardImage ?? p.heroImage)}
                    alt={`${p.title}, a ${p.type.toLowerCase()} project completed by Highlander in ${p.location}`}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    style={p.heroPosition ? { objectPosition: p.heroPosition } : undefined}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <p className="mb-2 flex items-center gap-1.5 text-caption font-body font-bold uppercase tracking-[0.14em] text-[hsl(var(--gold-ink))]">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {p.location} · {p.type}
                  </p>
                  <h3 className="mb-2 font-heading text-xl font-bold text-foreground">{p.title}</h3>
                  <p className="mb-3 text-body-sm font-body text-muted-foreground">
                    {p.scope} · {p.duration}
                  </p>
                  <p className="mb-4 text-body-sm font-body leading-relaxed text-foreground/85">{p.highlight}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    See the full project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProjectSpotlight;
