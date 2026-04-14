import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Hammer, RotateCcw, CloudLightning, Layers, Building2, Wrench, Droplets, TreePine, HardHat } from "lucide-react";

const roofingServices = [
  { icon: Hammer, title: "Roof Repair", description: "Leak diagnostics, shingle replacement, and targeted repairs for mountain weather.", href: "/services/roof-repair" },
  { icon: RotateCcw, title: "Roof Replacement", description: "Full tear-off and installation with premium materials engineered for elevation.", href: "/services/roof-replacement" },
  { icon: CloudLightning, title: "Storm Damage", description: "Rapid response, professional documentation, and insurance coordination.", href: "/services/storm-damage" },
  { icon: Layers, title: "Metal Roofing", description: "Standing seam and exposed fastener systems with 50+ year lifespans.", href: "/services/metal-roofing" },
  { icon: Building2, title: "Commercial Roofing", description: "Inspections, maintenance programs, and full-scope commercial solutions.", href: "/commercial-roofing" },
];

const constructionServices = [
  { icon: Droplets, title: "Gutter Services", description: "Seamless gutters, gutter guards, and mountain water management.", href: "/gutters" },
  { icon: TreePine, title: "Outdoor Living", description: "Custom decks, screened porches, pergolas, and exterior living spaces.", href: "/outdoor-living" },
  { icon: HardHat, title: "Construction", description: "Siding, framing, additions, and exterior renovations by a licensed GC.", href: "/construction-services" },
  { icon: Wrench, title: "Maintenance Programs", description: "Preventative roof and property maintenance to protect your investment.", href: "/commercial-maintenance" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const ServiceCard = ({ service }: { service: typeof roofingServices[0] }) => (
  <motion.div variants={itemVariants}>
    <Link
      to={service.href}
      className="group card-premium tartan-hover block p-6 md:p-7 h-full"
    >
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors duration-300">
          <service.icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed font-body">
          {service.description}
        </p>
        <span className="inline-flex items-center gap-1.5 text-accent font-medium text-sm font-body group-hover:gap-2.5 transition-all">
          Learn More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  </motion.div>
);

const ServicesGrid = () => {
  return (
    <section className="section-padding bg-background tartan-bg">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="eyebrow mb-3 block">Our Expertise</span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="section-heading mb-4"
            >
              Roofing & Construction<br className="hidden md:block" /> for Mountain Properties
            </motion.h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg font-body">
            From precision roof work to exterior construction — every project is executed with the craftsmanship WNC properties demand.
          </p>
        </motion.div>

        {/* Roofing */}
        <div className="mb-8">
          <div className="heritage-line pb-3 mb-5">
            <span className="eyebrow text-muted-foreground">Roofing</span>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          >
            {roofingServices.map((s) => <ServiceCard key={s.title} service={s} />)}
          </motion.div>
        </div>

        {/* Construction */}
        <div className="mt-12">
          <div className="heritage-line pb-3 mb-5">
            <span className="eyebrow text-muted-foreground">Construction</span>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {constructionServices.map((s) => <ServiceCard key={s.title} service={s} />)}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;