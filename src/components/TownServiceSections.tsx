import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Home, HardHat, Compass } from "lucide-react";
import type { TownData } from "@/data/towns";
import { ScrollReveal } from "./motion";

interface TownServiceSectionsProps {
  town: TownData;
}

const TownServiceSections = ({ town }: TownServiceSectionsProps) => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-tight">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Roofing Pillar */}
          <ScrollReveal variant="rise-subtle">
            <div className="flex flex-col h-full bg-secondary/30 border border-border p-10 group relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-8 border border-primary/10">
                <Home className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-foreground leading-tight">Roofing in <br />{town.name}</h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-10 text-sm">
                {town.name}'s specific {town.climateExposure.toLowerCase()} demands a higher caliber of roofing expertise. We design and install roofing systems that aren't just functional, but built to withstand the unique pressures of {town.name}'s elevation.
              </p>
              <Link 
                to={`/service-areas/${town.slug}/roof-replacement`}
                className="inline-flex items-center gap-2 text-primary font-heading font-bold hover:gap-3 transition-all mt-auto text-sm uppercase tracking-widest"
              >
                Explore {town.name} Roofing <ArrowRight className="w-4 h-4" />
              </Link>
              
              {/* Subtle background icon */}
              <Home className="absolute -bottom-4 -right-4 w-32 h-32 text-primary opacity-[0.03] group-hover:scale-110 transition-transform duration-700" />
            </div>
          </ScrollReveal>

          {/* Construction Pillar */}
          <ScrollReveal variant="rise-subtle" delay={0.1}>
            <div className="flex flex-col h-full bg-background border border-border p-10 group relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center mb-8 border border-[hsl(var(--highland-gold)/0.1)]">
                <HardHat className="w-8 h-8 text-[hsl(var(--gold-ink))]" />
              </div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-foreground leading-tight">Construction in <br />{town.name}</h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-10 text-sm">
                {town.constructionContext} From master suite additions to custom outdoor living spaces, our {town.name} construction division uses the same disciplined, team-led approach we apply to our roofing projects.
              </p>
              <Link 
                to={`/service-areas/${town.slug}/additions`}
                className="inline-flex items-center gap-2 text-[hsl(var(--gold-ink))] font-heading font-bold hover:gap-3 transition-all mt-auto text-sm uppercase tracking-widest"
              >
                Explore {town.name} Construction <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Subtle background icon */}
              <HardHat className="absolute -bottom-4 -right-4 w-32 h-32 text-[hsl(var(--gold-ink))] opacity-[0.03] group-hover:scale-110 transition-transform duration-700" />
            </div>
          </ScrollReveal>

          {/* Design Pillar */}
          <ScrollReveal variant="rise-subtle" delay={0.2}>
            <div className="flex flex-col h-full bg-secondary/30 border border-border p-10 group relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 bg-primary/5 flex items-center justify-center mb-8 border border-primary/5">
                <Compass className="w-8 h-8 text-primary/80" />
              </div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-foreground leading-tight">Design & Support in <br />{town.name}</h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-10 text-sm">
                Before the first nail is driven, we provide {town.name} homeowners with professional design support, site-specific planning, and structural layouts to ensure project success.
              </p>
              <Link 
                to="/layouts-planning"
                className="inline-flex items-center gap-2 text-foreground font-heading font-bold hover:gap-3 transition-all mt-auto text-sm uppercase tracking-widest"
              >
                Explore Design Services <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Subtle background icon */}
              <Compass className="absolute -bottom-4 -right-4 w-32 h-32 text-foreground opacity-[0.03] group-hover:scale-110 transition-transform duration-700" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default TownServiceSections;
