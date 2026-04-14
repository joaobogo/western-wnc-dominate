import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Hammer, RotateCcw, CloudLightning, Layers, Building2, Wrench, Droplets, TreePine, HardHat, Home } from "lucide-react";
import type { Division } from "@/lib/division-theme";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

interface ServiceItem {
  icon: typeof Hammer;
  title: string;
  outcome: string;
  href: string;
  division: Division;
}

const roofingServices: ServiceItem[] = [
  { icon: Hammer, title: "Roof Repair", outcome: "Targeted fixes that stop leaks and prevent costly escalation — documented, warrantied, resolved on the first visit.", href: "/services/roof-repair", division: "roofing" },
  { icon: RotateCcw, title: "Roof Replacement", outcome: "A complete roof system engineered for your elevation, wind exposure, and the next 30+ years of mountain weather.", href: "/services/roof-replacement", division: "roofing" },
  { icon: CloudLightning, title: "Storm Damage", outcome: "24-hour response, full photo documentation, and direct insurance coordination — so you're protected, not left waiting.", href: "/services/storm-damage", division: "roofing" },
  { icon: Layers, title: "Metal Roofing", outcome: "50+ year performance, superior wind resistance, and energy savings — the definitive choice for serious mountain properties.", href: "/services/metal-roofing", division: "roofing" },
  { icon: Building2, title: "Commercial Roofing", outcome: "Condition reporting, preventative maintenance, and full-scope solutions for property managers and facility owners.", href: "/commercial-roofing", division: "roofing" },
];

const constructionServices: ServiceItem[] = [
  { icon: Droplets, title: "Gutter Systems", outcome: "High-capacity seamless gutters and leaf guard systems engineered for WNC's 60+ inches of annual rainfall.", href: "/gutters", division: "roofing" },
  { icon: TreePine, title: "Outdoor Living", outcome: "Custom decks, covered porches, and pergolas designed to frame mountain views and withstand year-round exposure.", href: "/outdoor-living", division: "construction" },
  { icon: HardHat, title: "Construction", outcome: "Siding, framing, additions, and complete exterior transformations — same crew, same standards, licensed GC oversight.", href: "/construction-services", division: "construction" },
  { icon: Wrench, title: "Maintenance Programs", outcome: "Scheduled inspections and preventative care that extend roof life and eliminate costly surprises before they happen.", href: "/commercial-maintenance", division: "roofing" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: HIGHLAND_EASE } },
};

const accentMap = {
  roofing: {
    iconBg: "bg-primary/6 group-hover:bg-primary/12",
    iconColor: "text-primary",
    ctaColor: "text-primary",
    topLine: "bg-gradient-to-r from-transparent via-[hsl(var(--heritage-green)/0.3)] to-transparent",
    label: "Roofing",
  },
  construction: {
    iconBg: "bg-[hsl(var(--highland-gold)/0.06)] group-hover:bg-[hsl(var(--highland-gold)/0.14)]",
    iconColor: "text-[hsl(var(--highland-gold))]",
    ctaColor: "text-[hsl(var(--highland-gold))]",
    topLine: "bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.35)] to-transparent",
    label: "Construction",
  },
};

const ServiceCard = ({ service }: { service: ServiceItem }) => {
  const accent = accentMap[service.division];
  return (
    <motion.div variants={itemVariants} className="h-full">
      <Link
        to={service.href}
        className="group relative block h-full card-premium tartan-hover p-0"
      >
        {/* Top accent line */}
        <div className={`h-[2px] w-full ${accent.topLine}`} />

        <div className="p-6 md:p-7 flex flex-col h-full relative z-10">
          {/* Icon + division label row */}
          <div className="flex items-center justify-between mb-5">
            <motion.div
              className={`w-11 h-11 rounded-none flex items-center justify-center transition-colors duration-300 ${accent.iconBg}`}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.2 }}
            >
              <service.icon className={`w-5 h-5 ${accent.iconColor}`} />
            </motion.div>
            <span className={`text-[9px] font-body font-semibold uppercase tracking-[0.14em] opacity-40 group-hover:opacity-60 transition-opacity ${accent.iconColor}`}>
              {accent.label}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-heading font-bold text-foreground mb-2.5 group-hover:text-primary transition-colors duration-200">
            {service.title}
          </h3>

          {/* Outcome copy */}
          <p className="text-muted-foreground text-[13px] leading-relaxed font-body mb-6 flex-grow">
            {service.outcome}
          </p>

          {/* CTA */}
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center gap-1.5 font-semibold text-sm font-body ${accent.ctaColor} group-hover:gap-2.5 transition-all duration-200`}>
              Learn More <ArrowRight className="w-3.5 h-3.5 btn-arrow-icon" />
            </span>
            {/* Subtle arrow circle on hover */}
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:border-primary/20 transition-all duration-300">
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ServicesGrid = () => {
  return (
    <section className="section-padding bg-background tartan-bg">
      <div className="container-tight">
        <div className="text-center mb-12 md:mb-16">
          <ScrollReveal variant="fade">
            <span className="eyebrow mb-3 block">What We Do</span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="section-heading mb-4">
              Roofing & Construction<br className="hidden md:block" /> Engineered for Mountain Properties.
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.25}>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg font-body">
              From precision roof systems to full exterior renovations — every project is specified for your property's elevation, exposure, and architectural character.
            </p>
          </ScrollReveal>
        </div>

        {/* Roofing */}
        <div className="mb-10">
          <ScrollReveal variant="slide-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-none bg-primary/8 flex items-center justify-center">
                <Home className="w-4 h-4 text-primary" />
              </div>
              <span className="eyebrow text-primary">Roofing Services</span>
              <div className="flex-1 h-px bg-border" />
            </div>
          </ScrollReveal>
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
        <div className="mt-4">
          <ScrollReveal variant="slide-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-none bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center">
                <HardHat className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
              </div>
              <span className="eyebrow text-[hsl(var(--highland-gold))]">Building & Construction</span>
              <div className="flex-1 h-px bg-border" />
            </div>
          </ScrollReveal>
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
