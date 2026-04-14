import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Hammer, RotateCcw, CloudLightning, Layers, Building2, Wrench, Droplets, TreePine, HardHat } from "lucide-react";

const roofingServices = [
  { icon: Hammer, title: "Roof Repair", description: "Leak diagnostics, shingle replacement, and targeted repairs built for mountain weather.", href: "/services/roof-repair" },
  { icon: RotateCcw, title: "Roof Replacement", description: "Full tear-off and installation with premium materials engineered for WNC elevation.", href: "/services/roof-replacement" },
  { icon: CloudLightning, title: "Storm Damage", description: "Rapid response, professional documentation, and insurance coordination.", href: "/services/storm-damage" },
  { icon: Layers, title: "Metal Roofing", description: "Standing seam and exposed fastener systems with 50+ year lifespans.", href: "/services/metal-roofing" },
  { icon: Building2, title: "Commercial Roofing", description: "Inspections, maintenance programs, and full-scope commercial solutions.", href: "/commercial-roofing" },
];

const constructionServices = [
  { icon: Droplets, title: "Gutter Services", description: "Seamless gutters, gutter guards, and water management for mountain properties.", href: "/gutters" },
  { icon: TreePine, title: "Outdoor Living", description: "Custom decks, screened porches, pergolas, and exterior living spaces.", href: "/outdoor-living" },
  { icon: HardHat, title: "Construction", description: "Siding, framing, additions, and exterior renovations by a licensed GC.", href: "/construction-services" },
  { icon: Wrench, title: "Maintenance Programs", description: "Preventative roof and property maintenance to protect your investment.", href: "/commercial-maintenance" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const ServiceCard = ({ service }: { service: typeof roofingServices[0] }) => (
  <motion.div variants={itemVariants}>
    <Link
      to={service.href}
      className="group block bg-card border border-border rounded-sm p-6 md:p-8 hover:border-accent/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full"
    >
      <div className="absolute top-0 left-0 w-0.5 h-0 bg-accent group-hover:h-full transition-all duration-500" />
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-sm bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors duration-300">
          <service.icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {service.description}
        </p>
        <span className="inline-flex items-center gap-1 text-accent font-medium text-sm group-hover:gap-2 transition-all">
          Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  </motion.div>
);

const ServicesGrid = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.p
            className="text-accent font-semibold text-sm uppercase tracking-[0.15em] mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Expertise
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4"
            >
              Roofing & Construction
              <br className="hidden md:block" /> for Mountain Properties
            </motion.h2>
          </div>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            From precision roof work to exterior construction, every project is executed with the craftsmanship WNC properties demand.
          </motion.p>
        </motion.div>

        {/* Roofing */}
        <div className="mb-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4 heritage-divider pb-3"
          >
            Roofing Services
          </motion.p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          >
            {roofingServices.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </motion.div>
        </div>

        {/* Construction */}
        <div className="mt-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4 heritage-divider pb-3"
          >
            Construction Services
          </motion.p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {constructionServices.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;