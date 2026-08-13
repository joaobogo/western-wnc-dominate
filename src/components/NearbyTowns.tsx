import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { towns, TownData } from "@/data/towns";
import { ScrollReveal } from "@/components/motion";

interface NearbyTownsProps {
  currentTown: TownData;
}

/**
 * Internal Linking Engine — Nearby Towns
 * Finds towns in the same county or adjacent areas to build local relevance and 
 * improve SEO crawl depth for all town pages.
 */
const NearbyTowns = ({ currentTown }: NearbyTownsProps) => {
  // Curated adjacency — real geographic neighbors, not just same-county.
  // Keeps nearby links natural (e.g. Highlands → Cashiers even though different counties).
  const adjacency: Record<string, string[]> = {
    "highlands-nc": ["cashiers-nc", "franklin-nc", "scaly-mountain-nc", "lake-glenville-nc"],
    "cashiers-nc": ["highlands-nc", "sapphire-nc", "lake-glenville-nc", "sylva-nc"],
    "franklin-nc": ["highlands-nc", "otto-nc", "sylva-nc", "cashiers-nc"],
    "sylva-nc": ["dillsboro-nc", "cullowhee-nc", "cashiers-nc", "waynesville-nc"],
    "dillsboro-nc": ["sylva-nc", "cullowhee-nc", "bryson-city-nc", "waynesville-nc"],
    "cullowhee-nc": ["sylva-nc", "dillsboro-nc", "cashiers-nc", "waynesville-nc"],
    "bryson-city-nc": ["cherokee-nc", "dillsboro-nc", "sylva-nc", "waynesville-nc"],
    "cherokee-nc": ["bryson-city-nc", "sylva-nc", "waynesville-nc", "dillsboro-nc"],
    "waynesville-nc": ["sylva-nc", "asheville-nc", "hendersonville-nc", "bryson-city-nc"],
    "asheville-nc": ["hendersonville-nc", "waynesville-nc", "brevard-nc", "sylva-nc"],
    "hendersonville-nc": ["asheville-nc", "brevard-nc", "waynesville-nc", "sapphire-nc"],
    "brevard-nc": ["hendersonville-nc", "lake-toxaway-nc", "sapphire-nc", "asheville-nc"],
    "lake-toxaway-nc": ["sapphire-nc", "cashiers-nc", "brevard-nc", "lake-glenville-nc"],
    "sapphire-nc": ["cashiers-nc", "lake-toxaway-nc", "highlands-nc", "lake-glenville-nc"],
    "lake-glenville-nc": ["cashiers-nc", "highlands-nc", "sylva-nc", "sapphire-nc"],
    "scaly-mountain-nc": ["highlands-nc", "franklin-nc", "otto-nc", "cashiers-nc"],
    "otto-nc": ["franklin-nc", "highlands-nc", "scaly-mountain-nc", "hayesville-nc"],
    "hayesville-nc": ["murphy-nc", "franklin-nc", "otto-nc", "cherokee-nc"],
    "murphy-nc": ["hayesville-nc", "cherokee-nc", "franklin-nc", "bryson-city-nc"],
  };

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
                Serving the <span className="text-primary italic">{currentTown.county}</span> Corridor.
              </h2>
              <p className="text-muted-foreground mt-4 font-body leading-relaxed">
                Highlander Building Services maintains local crews throughout Western North Carolina. If you're near {currentTown.name}, we're likely in your neighborhood this week.
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
                <p className="text-muted-foreground text-body-xs font-body leading-relaxed mb-6 line-clamp-2">
                  {town.description.split('.')[0]}.
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
