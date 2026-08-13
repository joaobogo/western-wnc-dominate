import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { projectDetails, type ProjectDetail } from "@/data/projects";
import { getNeighborTowns } from "@/lib/local-link-graph";

interface Picked {
  project: ProjectDetail;
  /** Honest label about how close this work actually is. */
  proximity: string;
}

/**
 * Two real projects filtered to the town, then its nearest neighbors, then the
 * same county, then the closest county we have work in. Location is always
 * labeled honestly — nothing is relocated to the page's town.
 */
export const pickLocalProjects = (
  town: { name: string; slug: string; county: string },
  category?: ProjectDetail["category"],
  limit = 2,
): Picked[] => {
  const neighborNames = getNeighborTowns(town.slug).map((t) => t.name);
  const inTown = (p: ProjectDetail) => p.location.startsWith(`${town.name},`);
  const isNeighbor = (p: ProjectDetail) =>
    neighborNames.some((n) => p.location.startsWith(`${n},`));

  const pool = category
    ? [
        ...projectDetails.filter((p) => p.category === category),
        ...projectDetails.filter((p) => p.category !== category),
      ]
    : [...projectDetails];

  const ranked = [
    ...pool.filter(inTown),
    ...pool.filter((p) => !inTown(p) && isNeighbor(p)),
    ...pool.filter((p) => !inTown(p) && !isNeighbor(p) && p.county === town.county),
    ...pool.filter(
      (p) => !inTown(p) && !isNeighbor(p) && p.county !== town.county,
    ),
  ];

  const seen = new Set<string>();
  return ranked
    .filter((p) => (seen.has(p.slug) ? false : (seen.add(p.slug), true)))
    .slice(0, limit)
    .map((p) => ({
      project: p,
      proximity: inTown(p)
        ? `In ${town.name}`
        : isNeighbor(p)
          ? `Nearby — ${p.location}`
          : p.county === town.county
            ? `Elsewhere in ${town.county} — ${p.location}`
            : `Closest completed project we can show — ${p.location} (${p.county})`,
    }));
};

interface LocalProjectProofProps {
  town: { name: string; slug: string; county: string };
  category?: ProjectDetail["category"];
  heading?: string;
  className?: string;
}

const LocalProjectProof = ({
  town,
  category,
  heading,
  className = "",
}: LocalProjectProofProps) => {
  const picks = pickLocalProjects(town, category);
  if (!picks.length) return null;

  return (
    <section className={className} aria-label={`Recent work near ${town.name}`}>
      <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-1">
        {heading ?? `Recent work near ${town.name}`}
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Real Highlander projects, labeled with the town where the work was actually done.
      </p>
      <div className="grid sm:grid-cols-2 gap-6">
        {picks.map(({ project, proximity }) => {
          const ba = project.beforeAfter;
          return (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="group bg-card border border-border rounded-sm overflow-hidden hover:border-primary/40 hover:shadow-raised transition-all"
            >
              {ba ? (
                <div className="grid grid-cols-2">
                  {[
                    { src: ba.before, label: ba.beforeLabel ?? "Before" },
                    { src: ba.after, label: ba.afterLabel ?? "After" },
                  ].map((img) => (
                    <figure key={img.label} className="relative">
                      <img
                        src={img.src}
                        alt={`${img.label} — ${project.title}, ${project.location}`}
                        loading="lazy"
                        decoding="async"
                        width={800}
                        height={600}
                        className="w-full h-36 md:h-40 object-cover"
                      />
                      <figcaption className="absolute bottom-0 left-0 bg-foreground/75 text-background text-caption font-body uppercase tracking-wider px-2 py-0.5">
                        {img.label}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <img
                  src={project.heroImage}
                  alt={`${project.title} — ${project.location}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-5">
                <span className="inline-flex items-center gap-1.5 text-caption font-body uppercase tracking-wider text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                  {proximity}
                </span>
                <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-body-xs text-muted-foreground mt-1 line-clamp-2">
                  {project.highlight}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  See the project <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default LocalProjectProof;
