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
            <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Service Areas</span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
              Serving Western<br className="hidden md:block" /> North Carolina
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.25}>
            <p className="text-dark-section-foreground/55 max-w-xl mx-auto text-base font-body">
              Locally operated with crews across the region. We know these mountains — and the properties that need protecting.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer stagger={0.05} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {towns.map((town) => (
            <StaggerItem key={town.slug} variant="rise">
              <Link
                to={`/service-areas/${town.slug}`}
                className="group block bg-dark-section-foreground/4 border border-dark-section-foreground/8 rounded-none p-4 md:p-5 hover:bg-dark-section-foreground/8 hover:border-[hsl(var(--highland-gold)/0.25)] card-lift transition-all duration-300"
              >
                <MapPin className="w-4 h-4 text-[hsl(var(--highland-gold))] mb-2 group-hover:scale-110 transition-transform duration-200" />
                <h3 className="font-heading font-semibold text-base text-dark-section-foreground">
                  {town.name}
                </h3>
                <p className="text-dark-section-foreground/40 text-xs mt-1 font-body">{town.county}</p>
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
