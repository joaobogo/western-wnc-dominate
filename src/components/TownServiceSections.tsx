import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Home, HardHat } from "lucide-react";
import type { TownData } from "@/data/towns";

interface TownServiceSectionsProps {
  town: TownData;
}

const TownServiceSections = ({ town }: TownServiceSectionsProps) => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-tight">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Roofing Pillar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col group"
          >
            <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-6">
              <Home className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-foreground">Roofing in {town.name}</h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              {town.name}'s specific {town.climateExposure.toLowerCase()} demands a higher caliber of roofing expertise. We design and install roofing systems that aren't just functional, but built to withstand the unique pressures of {town.name}'s elevation.
            </p>
            <Link 
              to={`/service-areas/${town.slug}/roof-replacement`}
              className="inline-flex items-center gap-2 text-primary font-heading font-bold hover:gap-3 transition-all mt-auto"
            >
              Explore {town.name} Roofing <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Construction Pillar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col group"
          >
            <div className="w-16 h-16 bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center mb-6">
              <HardHat className="w-8 h-8 text-[hsl(var(--highland-gold))]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-foreground">Construction in {town.name}</h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              {town.constructionContext} From master suite additions to custom outdoor living spaces, our {town.name} construction division uses the same disciplined, owner-led approach we apply to our roofing projects.
            </p>
            <Link 
              to={`/service-areas/${town.slug}/additions`}
              className="inline-flex items-center gap-2 text-[hsl(var(--highland-gold))] font-heading font-bold hover:gap-3 transition-all mt-auto"
            >
              Explore {town.name} Construction <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TownServiceSections;
