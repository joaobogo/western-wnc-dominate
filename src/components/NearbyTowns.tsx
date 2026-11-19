import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { TOWN_ADJACENCY } from "@/data/town-neighbors";
import { towns, TownData } from "@/data/towns";
import { ScrollReveal } from "@/components/motion";

interface NearbyTownsProps {
  currentTown: TownData;
  /** Drop the Bryson City / Waynesville coverage clause (Franklin only). */
  omitCoverageExtension?: boolean;
}

/**
 * Internal Linking Engine — Nearby Towns
 * Finds towns in the same county or adjacent areas to build local relevance and 
 * improve SEO crawl depth for all town pages.
 */
const NearbyTowns = ({ currentTown, omitCoverageExtension }: NearbyTownsProps) => {
  // Curated adjacency — real geographic neighbors, not just same-county.
  // Keeps nearby links natural (e.g. Highlands → Cashiers even though different counties).
  // Shared with every other nearby-town block (src/data/town-neighbors.ts).
  const adjacency = TOWN_ADJACENCY;

  const neighborSlugs = adjacency[currentTown.slug] ?? [];
  const curated = neighborSlugs
    .map((s) => towns.find((t) => t.slug === s))
    .filter((t): t is TownData => !!t);

  // Fallback: same-county, then anything else in WNC — dedupe against curated.
  const seen = new Set(curated.map((t) => t.slug));
  const sameCounty = towns.filter(
    (t) => t.county === currentTown.county && t.slug !== currentTown.slug && !seen.has(t.slug)
  );
  sameCounty.forEach((t) => seen.add(t.slug));
  const fallback = towns.filter(
    (t) => t.slug !== currentTown.slug && !seen.has(t.slug)
  );

  const displayedTowns = [...curated, ...sameCounty, ...fallback].slice(0, 4);

  if (displayedTowns.length === 0) return null;

  return (
    <section className="py-24 bg-background border-t border-border/40">
      <div className="container-tight px-6">
        <ScrollReveal variant="fade">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <span className="eyebrow mb-4 block">Regional Coverage</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
                {["franklin-nc", "highlands-nc", "cashiers-nc"].includes(currentTown.slug) ? <>Local roofers serving the <span className="text-primary italic">{currentTown.county}</span> corridor.</> : <>Serving the <span className="text-primary italic">{currentTown.county}</span> Corridor.</>}
              </h2>
              <p className="text-muted-foreground mt-4 font-body leading-relaxed">
                Crews based in Franklin and Sylva cover {currentTown.county} and the towns around {currentTown.name} at {currentTown.elevation}{currentTown.slug === "franklin-nc" && !omitCoverageExtension ? ", with a service area that reaches Bryson City and Waynesville" : ""} — if you're nearby, we're likely in your neighborhood this week.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link to={`/service-areas/county/${currentTown.county.toLowerCase().replace(' ', '-')}`} className="text-primary font-heading font-bold text-sm tracking-wide flex items-center gap-2 group border-b border-primary/20 pb-1 hover:text-primary/80 transition-all">
                {currentTown.county} Overview <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link to="/service-areas" className="text-muted-foreground font-heading font-bold text-caption tracking-[0.1em] flex items-center gap-2 group hover:text-primary transition-all uppercase">
                All Areas <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>

        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedTowns.map((town, i) => (
            <ScrollReveal key={town.slug} variant="rise-subtle" delay={i * 0.1}>
              <Link 
                to={`/service-areas/${town.slug}`}
                className="group p-6 bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-primary/80" aria-hidden="true" />
                  <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {town.name}
                  </h3>
                </div>
                {/* A short fact line from towns.ts instead of the town's full intro
                    sentence — that sentence belongs on the town's own page and was
                    being repeated on 30–70 other pages (P3.4 boilerplate). */}
                <p className="text-muted-foreground text-body-xs font-body leading-relaxed mb-6 line-clamp-2">
                  {town.county} · {town.elevation}
                </p>
                <span className="mt-auto text-primary text-body-xs font-heading font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                  Service Details <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NearbyTowns;
