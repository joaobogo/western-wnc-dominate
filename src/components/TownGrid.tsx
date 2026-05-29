import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";

const towns = [
  { name: "Highlands", slug: "highlands-nc", county: "Macon County" },
  { name: "Cashiers", slug: "cashiers-nc", county: "Jackson County" },
  { name: "Franklin", slug: "franklin-nc", county: "Macon County" },
  { name: "Sylva", slug: "sylva-nc", county: "Jackson County" },
  { name: "Bryson City", slug: "bryson-city-nc", county: "Swain County" },
  { name: "Waynesville", slug: "waynesville-nc", county: "Haywood County" },
  { name: "Cullowhee", slug: "cullowhee-nc", county: "Jackson County" },
  { name: "Dillsboro", slug: "dillsboro-nc", county: "Jackson County" },
];

const TownGrid = () => {
  return (
    <section className="section-padding section-dark tartan-dark">
      <div className="container-tight">
        <div className="text-center mb-12 md:mb-16">
          <ScrollReveal variant="fade">
            <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Service Territory</span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
              Rooted in Western<br className="hidden md:block" /> North Carolina.
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.25}>
            <p className="text-dark-section-foreground/75 max-w-2xl mx-auto text-lg md:text-xl font-body leading-relaxed">
              Locally owned with crews positioned across all the mountains. We focus on Western North Carolina, 
              covering 8 primary counties with a deep understanding of the unique microclimates and elevations that define mountain living.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer stagger={0.05} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {towns.map((town) => (
            <StaggerItem key={town.slug} variant="rise">
              <Link
                to={`/service-areas/${town.slug}`}
                className="group block bg-dark-section-foreground/[0.06] border border-dark-section-foreground/[0.15] rounded-none p-6 md:p-8 hover:bg-dark-section-foreground/[0.08] hover:border-[hsl(var(--highland-gold)/0.3)] card-lift transition-all duration-500 shadow-sm"
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
              >
                <MapPin className="w-4 h-4 text-[hsl(var(--highland-gold))] mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-heading font-bold text-lg text-dark-section-foreground mb-1.5">
                  {town.name}
                </h3>
                <p className="text-dark-section-foreground/45 text-[13px] mt-1 font-body font-medium">{town.county}</p>
                <div className="mt-3 pt-3 border-t border-dark-section-foreground/6">
                  <span className="text-[hsl(var(--highland-gold)/0.85)] text-[12px] font-body font-bold uppercase tracking-[0.12em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-1.5">
                    View Area <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

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
