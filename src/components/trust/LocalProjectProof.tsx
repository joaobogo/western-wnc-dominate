import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { projectDetails, type ProjectDetail } from "@/data/projects";
import { getNeighborTowns } from "@/data/town-neighbors";

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
  /** Jobs that match the page's service (e.g. metal roofs on a metal page) go first, nearest first. */
  prefer?: (p: ProjectDetail) => boolean,
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

  const byDistance = [
    ...pool.filter(inTown),
    ...pool.filter((p) => !inTown(p) && isNeighbor(p)),
    ...pool.filter((p) => !inTown(p) && !isNeighbor(p) && p.county === town.county),
    ...pool.filter(
      (p) => !inTown(p) && !isNeighbor(p) && p.county !== town.county,
    ),
  ];
  // Service match first, then the page's division, then everything else, each
  // nearest first (a Sylva deck should not outrank a roof on a roofing page).
  const tiers = [
    prefer ? byDistance.filter(prefer) : [],
    category ? byDistance.filter((p) => p.category === category) : [],
    byDistance,
  ];
  const ranked = tiers.flat();

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
  /** How many real projects to show. Never fabricates — caps at what exists. */
  limit?: number;
  className?: string;
  /**
   * Town pages (P3.6): show ONLY projects done in this town. When fewer than
   * `limit` exist, the gap is filled with an honest "send us your address"
   * line instead of work from other towns or stock imagery.
   */
  strictTown?: boolean;
  /** Photos already on the page (e.g. the hero). A project whose photo is one of
   *  them shows another of its own photos instead; it is skipped only when it
   *  has no other photo. */
  excludeImages?: string[];
  /** Service match, passed to pickLocalProjects. */
  prefer?: (p: ProjectDetail) => boolean;
}

/** Copy shown when a town has fewer real projects than the block can hold. */
const NEAREST_ROOF_LINE = "Send us your address and we'll show you the nearest roof we've done";

const LocalProjectProof = ({
  town,
  category,
  heading,
  limit = 2,
  className = "",
  strictTown = false,
  excludeImages = [],
  prefer,
}: LocalProjectProofProps) => {
  const repeats = (img: string) => excludeImages.includes(img);
  /** The photo to show: the hero, or another of the project's own photos when the hero is already on the page. */
  const photoFor = (p: ProjectDetail) =>
    [p.heroImage, p.cardImage, ...p.galleryImages].find((img): img is string => !!img && !repeats(img));
  const usable = (p: ProjectDetail) =>
    p.beforeAfter ? ![p.beforeAfter.before, p.beforeAfter.after].some(repeats) : !!photoFor(p);
  const all = pickLocalProjects(town, category, strictTown ? 50 : limit + excludeImages.length + 3, prefer)
    .filter(({ project }) => usable(project))
    .slice(0, strictTown ? 50 : limit);
  const picks = strictTown ? all.filter((p) => p.proximity === `In ${town.name}`).slice(0, limit) : all;
  const short = strictTown && picks.length < limit;
  if (!picks.length && !short) return null;

  return (
    <section className={className} aria-label={`Recent work near ${town.name}`}>
      <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-1">
        {heading ?? (strictTown ? `Recent ${town.name} projects` : `Recent work near ${town.name}`)}
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        {strictTown
          ? `Real Highlander projects completed in ${town.name} — nothing relocated, nothing staged.`
          : "Real Highlander projects, labeled with the town where the work was actually done."}
      </p>
      {short && (
        <p className="mb-6 font-body text-body text-foreground" data-nearest-roof-line>
          {picks.length ? `We have more ${town.name} work than fits here. ` : ""}
          <Link to="/request-inspection" className="text-primary underline underline-offset-4 hover:no-underline">
            {NEAREST_ROOF_LINE}
          </Link>
          .
        </p>
      )}
      {picks.length > 0 && (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  src={photoFor(project)}
                  alt={`${project.title} — ${project.location}`}
                  width={1200}
                  height={800}
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
      )}
    </section>
  );
};

export default LocalProjectProof;
