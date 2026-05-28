import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Hammer, RotateCcw, CloudLightning, Layers, Building2, HardHat, Wrench, TreePine, Home as HomeIcon, Ruler } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";
import { useRef } from "react";

import asphaltImg from "@/assets/gallery/asphalt-hero.webp";
import metalImg from "@/assets/gallery/metal-005.webp";
import stormImg from "@/assets/gallery/asphalt-006.webp";
import cedarImg from "@/assets/gallery/cedar-004.webp";
import metalRoof from "@/assets/gallery/metal-008.webp";
import asphalt2 from "@/assets/gallery/asphalt-002b.jpg";
import metal6 from "@/assets/gallery/metal-006.webp";
import asphalt3 from "@/assets/gallery/asphalt-003.jpg";
import cedar3 from "@/assets/gallery/cedar-003.jpg";
import metal10 from "@/assets/gallery/metal-010.jpg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

interface FeaturedService {
  icon: typeof Hammer;
  title: string;
  tagline: string;
  description: string;
  stat: string;
  statLabel: string;
  href: string;
  image: string;
  accent: "green" | "gold";
}

const services: FeaturedService[] = [
  {
    icon: RotateCcw,
    title: "Roof Replacement",
    tagline: "Engineered for your elevation",
    description: "Full tear-off and reinstall specified for your wind zone, ice load, and moisture exposure. CertainTeed-certified materials with manufacturer and labor warranty.",
    stat: "300+",
    statLabel: "replacements completed",
    href: "/services/roof-replacement",
    image: asphaltImg,
    accent: "green",
  },
  {
    icon: Layers,
    title: "Metal Roofing",
    tagline: "50-year rated. Mountain-tested.",
    description: "Standing seam and exposed fastener systems for properties above 2,500 feet. Superior wind uplift resistance, energy efficiency, and the longest-lasting roof you can install.",
    stat: "50yr",
    statLabel: "rated lifespan",
    href: "/services/metal-roofing",
    image: metalImg,
    accent: "green",
  },
  {
    icon: CloudLightning,
    title: "Storm Damage",
    tagline: "Rapid response. Fully documented.",
    description: "Emergency tarping, drone-documented damage assessment, and direct insurance coordination. We handle the paperwork so you handle nothing.",
    stat: "Rapid",
    statLabel: "response time",
    href: "/services/storm-damage",
    image: stormImg,
    accent: "green",
  },
  {
    icon: Hammer,
    title: "Roof Repair",
    tagline: "Fix the cause, not the symptom",
    description: "Leak tracing, flashing replacement, and structural repair — diagnosed accurately, documented fully, and warrantied in writing. One visit, one resolution.",
    stat: "1st",
    statLabel: "visit resolution",
    href: "/services/roof-repair",
    image: asphalt2,
    accent: "green",
  },
  {
    icon: Building2,
    title: "Commercial Roofing",
    tagline: "Asset protection, not patchwork",
    description: "Condition reporting, preventative maintenance, and full-scope solutions for property managers, HOAs, and facility owners across eight WNC counties.",
    stat: "8",
    statLabel: "counties served",
    href: "/commercial-roofing",
    image: metalRoof,
    accent: "green",
  },
  {
    icon: HardHat,
    title: "Home Additions",
    tagline: "Permitted, inspected, mountain-grade",
    description: "Structural additions designed for mountain terrain and built under licensed GC oversight. Same documentation, same accountability, same warranty as our roofing work.",
    stat: "40+",
    statLabel: "years combined exp.",
    href: "/construction/additions",
    image: metal6,
    accent: "gold",
  },
  {
    icon: Hammer,
    title: "Renovations",
    tagline: "Same standards. New spaces.",
    description: "Kitchen, bath, and full interior remodels with sequenced phases, written milestones, and warranty protection on every stage of work.",
    stat: "100%",
    statLabel: "licensed & insured",
    href: "/construction/renovations",
    image: asphalt3,
    accent: "gold",
  },
  {
    icon: Wrench,
    title: "Siding & Exteriors",
    tagline: "Weather-rated curb appeal",
    description: "Fiber cement, engineered wood, and board-and-batten — specified for WNC moisture and UV exposure. Protection and aesthetics in a single installation.",
    stat: "30yr",
    statLabel: "material warranty",
    href: "/construction/exterior",
    image: cedar3,
    accent: "gold",
  },
  {
    icon: TreePine,
    title: "Outdoor Living",
    tagline: "Four-season, mountain-engineered",
    description: "Custom decks, covered porches, and pergolas designed for elevation views and year-round weather. Built to the same documented standard as every project we take on.",
    stat: "4-Season",
    statLabel: "engineered",
    href: "/construction/outdoor-living",
    image: cedarImg,
    accent: "gold",
  },
  {
    icon: Ruler,
    title: "Design & Planning",
    tagline: "Layouts & project planning",
    description: "Layouts, floor plans, and project planning support for additions, outdoor living, and scoped residential work.",
    stat: "Concept",
    statLabel: "to construction",
    href: "/layouts-planning",
    image: asphaltImg, // Placeholder - consider if a more 'planning' oriented image exists
    accent: "gold",
  },
];

const ServiceCard = ({ service, index }: { service: FeaturedService; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isGold = service.accent === "gold";

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    cardRef.current.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.06, duration: 0.55, ease: HIGHLAND_EASE }}
      className="h-full"
    >
      <Link to={service.href} className="group relative block h-full bg-card border border-border rounded-none overflow-hidden spotlight-hover hover:border-[hsl(var(--highland-gold)/0.18)] transition-all duration-500">
        {/* Image strip — curtain reveal */}
        <div className="relative h-36 md:h-40 overflow-hidden">
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.9, delay: index * 0.04, ease: HIGHLAND_EASE }}
            className="absolute inset-0"
          >
            <motion.img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              loading="lazy"
              initial={{ scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: index * 0.04 + 0.1, ease: HIGHLAND_EASE }}
            />
          </motion.div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          <div className={`absolute inset-0 mix-blend-multiply opacity-10 ${
            isGold ? "bg-[hsl(var(--highland-gold))]" : "bg-[hsl(var(--heritage-green))]"
          }`} />

          {/* Stat floating in image */}
          <div className="absolute bottom-3 left-5">
            <span className={`text-xl md:text-2xl font-heading font-bold leading-none ${
              isGold ? "text-[hsl(var(--highland-gold))]" : "text-white"
            }`}>
              {service.stat}
            </span>
            <span className="block text-[8px] font-body text-white/40 uppercase tracking-[0.12em] mt-0.5">
              {service.statLabel}
            </span>
          </div>

          {/* Division tag */}
          <div className={`absolute top-3 right-3 text-[8px] font-body font-bold uppercase tracking-[0.15em] px-2 py-1 backdrop-blur-md ${
            isGold
              ? "text-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.1)] border border-[hsl(var(--highland-gold)/0.15)]"
              : "text-white/60 bg-white/5 border border-white/8"
          }`}>
            {isGold ? "Construction" : "Roofing"}
          </div>
        </div>

        {/* Accent line */}
        <div className={`h-[2px] w-full ${
          isGold
            ? "bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.4)] to-transparent"
            : "bg-gradient-to-r from-transparent via-[hsl(var(--heritage-green)/0.3)] to-transparent"
        }`} />

        {/* Left hover border */}
        <div className={`absolute left-0 top-0 w-[2px] h-0 group-hover:h-full transition-all duration-600 z-20 ${
          isGold ? "bg-[hsl(var(--highland-gold))]" : "bg-primary"
        }`} />

        {/* Content */}
        <div className="p-5 md:p-6 flex flex-col flex-1">
          {/* Icon + title */}
          <div className="flex items-start gap-3 mb-3">
            <div className={`w-9 h-9 rounded-none flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
              isGold
                ? "bg-[hsl(var(--highland-gold)/0.06)] group-hover:bg-[hsl(var(--highland-gold)/0.14)]"
                : "bg-primary/6 group-hover:bg-primary/12"
            }`}>
              <service.icon className={`w-4 h-4 ${isGold ? "text-[hsl(var(--highland-gold)/0.7)]" : "text-primary/60"}`} />
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-foreground leading-tight tracking-tight group-hover:text-foreground/90 transition-colors">
                {service.title}
              </h3>
              <span className={`text-[10px] font-body font-semibold uppercase tracking-[0.1em] mt-0.5 block ${
                isGold ? "text-[hsl(var(--highland-gold)/0.6)]" : "text-primary/40"
              }`}>
                {service.tagline}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-[12.5px] leading-[1.7] font-body mb-5 flex-1">
            {service.description}
          </p>

          {/* CTA row */}
          <div className="flex items-center justify-between pt-3 border-t border-border/60">
            <span className={`inline-flex items-center gap-1.5 font-heading font-bold text-[12px] tracking-wide group-hover:gap-2.5 transition-all duration-300 ${
              isGold ? "text-[hsl(var(--highland-gold))]" : "text-primary"
            }`}>
              Explore <ArrowRight className="w-3 h-3" />
            </span>
            <div className="w-7 h-7 rounded-none border border-border/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <ArrowRight className="w-3 h-3 text-muted-foreground/60" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ServicesGrid = () => {
  const roofing = services.filter(s => s.accent === "green");
  const construction = services.filter(s => s.accent === "gold");

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 tartan-bg opacity-30" />

      <div className="container-tight relative z-10">
        {/* Header */}
        <div className="text-center mb-14 md:mb-18">
          <ScrollReveal variant="fade">
            <span className="eyebrow mb-3 block">What We Do</span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="section-heading mb-4">
              Every Service Specified for<br className="hidden md:block" />
              <span className="text-[hsl(var(--highland-gold))]"> Your Property's Conditions.</span>
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.25}>
            <p className="text-muted-foreground max-w-xl mx-auto text-base font-body leading-relaxed">
              Roof systems, additions, renovations, and exterior work — each project scoped
              for your property's elevation, exposure, and layout character.
            </p>
          </ScrollReveal>
          <GoldLine width="4rem" centered delay={0.35} className="mt-6" />
        </div>

        {/* Roofing Division */}
        <div className="mb-12">
          <ScrollReveal variant="slide-left">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-8 h-8 rounded-none bg-primary/8 flex items-center justify-center">
                <HomeIcon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-[11px] font-body font-bold uppercase tracking-[0.2em] text-primary/70">
                Roofing Division
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {roofing.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
          </div>
        </div>

        {/* Construction Division */}
        <div>
          <ScrollReveal variant="slide-left">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-8 h-8 rounded-none bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center">
                <HardHat className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
              </div>
              <span className="text-[11px] font-body font-bold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold)/0.7)]">
                Construction Division
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-[hsl(var(--highland-gold)/0.15)] to-transparent" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {construction.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
