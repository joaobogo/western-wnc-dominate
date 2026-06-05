import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import { towns } from "@/data/towns";

const displayedTowns = towns.slice(0, 12); // Show top 12 on homepage grid

const TownGrid = ({ id }: { id?: string }) => {
  return (
    <section className="section-padding section-dark tartan-dark" id={id}>
      <div className="container-tight">
        <div className="text-center mb-12 md:mb-16">
          <ScrollReveal variant="fade">
            <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Service Territory</span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="text-display font-heading font-bold mb-6 text-white leading-[0.95] tracking-tightest">
              Rooted in Western<br className="hidden md:block" /> North Carolina.
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.25}>
            <p className="text-[20px] md:text-[24px] text-white max-w-2xl mx-auto font-bold leading-relaxed drop-shadow-md">
              Locally owned with crews positioned across all the mountains. We focus on Western North Carolina, 
              covering 8 primary counties with a deep understanding of the unique microclimates and elevations that define mountain living.
            </p>
          </ScrollReveal>
        </div>

        <div className="relative">
          <div 
            className="flex overflow-x-auto pb-10 gap-4 snap-x snap-mandatory scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch' 
            }}
          >
            <StaggerContainer 
              stagger={0.05} 
              className="flex gap-4"
            >
            {displayedTowns.map((town) => (
              <div key={town.slug} className="flex-shrink-0 w-[240px] md:w-[280px] snap-start">
                <StaggerItem variant="rise">
                  <Link
                    to={`/service-areas/${town.slug}`}
                    className="group block bg-dark-section-foreground/[0.06] border border-dark-section-foreground/[0.15] rounded-none p-6 md:p-8 hover:bg-dark-section-foreground/[0.08] hover:border-[hsl(var(--highland-gold)/0.3)] card-lift transition-all duration-500 shadow-sm h-full"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                  >
                    <MapPin className="w-4 h-4 text-[hsl(var(--highland-gold))] mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-heading font-bold text-lg text-dark-section-foreground mb-1.5">
                      {town.name}
                    </h3>
                    <p className="text-dark-section-foreground/60 text-[16px] mt-1 font-body font-bold">{town.county}</p>
                    <div className="mt-3 pt-3 border-t border-dark-section-foreground/6">
                      <span className="text-[hsl(var(--highland-gold)/0.85)] text-[12px] font-body font-bold uppercase tracking-[0.12em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-1.5">
                        View Area <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              </div>
            ))}
            </StaggerContainer>
          </div>
          
          {/* Subtle fade edges to indicate more content */}
          <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-primary to-transparent pointer-events-none z-10 hidden md:block" />
          <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-primary to-transparent pointer-events-none z-10 hidden md:block" />
        </div>

        <ScrollReveal variant="fade" delay={0.4} className="text-center mt-8">
          <Link
            to="/service-areas"
            className="group inline-flex items-center gap-2 text-[hsl(var(--highland-gold))] font-medium text-sm transition-all font-body link-draw"
          >
            View All Service Areas <ArrowRight className="w-3.5 h-3.5 btn-arrow-icon" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TownGrid;
