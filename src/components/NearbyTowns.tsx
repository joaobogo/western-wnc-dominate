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
  // 1. Find towns in the same county
  const sameCountyTowns = towns.filter(
    (t) => t.county === currentTown.county && t.slug !== currentTown.slug
  );

  // 2. If same county is thin, find other towns in WNC (fallback)
  // In a real app, this could be based on geographical distance
  const otherTowns = towns
    .filter((t) => t.county !== currentTown.county && t.slug !== currentTown.slug)
    .slice(0, 4 - sameCountyTowns.length);

  const displayedTowns = [...sameCountyTowns, ...otherTowns].slice(0, 4);

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
                Highlander Roofing & Construction maintains local crews throughout Western North Carolina. If you're near {currentTown.name}, we're likely in your neighborhood this week.
              </p>
            </div>
            <Link to="/service-areas" className="text-primary font-heading font-bold text-sm tracking-wide flex items-center gap-2 group border-b border-primary/20 pb-1 hover:text-primary/80 transition-all">
              View All Areas <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
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
                  <MapPin className="w-4 h-4 text-primary/60" />
                  <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {town.name}
                  </h3>
                </div>
                <p className="text-muted-foreground text-[13px] font-body leading-relaxed mb-6 line-clamp-2">
                  {town.description.split('.')[0]}.
                </p>
                <span className="mt-auto text-primary text-[12px] font-heading font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                  Service Details <ArrowRight className="w-3 h-3" />
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
