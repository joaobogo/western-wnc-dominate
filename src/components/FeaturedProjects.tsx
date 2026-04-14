import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, ArrowUpRight } from "lucide-react";
import { useState, useRef } from "react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";

import metalRoof from "@/assets/gallery/metal-005.webp";
import cedarRoof from "@/assets/gallery/cedar-004.webp";
import asphaltRoof from "@/assets/gallery/asphalt-hero.webp";
import metalCabin from "@/assets/gallery/metal-006.webp";
import asphaltLarge from "@/assets/gallery/asphalt-006.webp";
import cedarDetail from "@/assets/gallery/cedar-003.jpg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const projects = [
  {
    title: "Standing Seam Metal — Estate Home",
    location: "Cashiers, NC",
    elevation: "3,800 ft",
    category: "Metal Roofing",
    type: "roofing" as const,
    outcome: "Complex multi-gable standing seam installation with concealed fasteners. Engineered for 140mph wind uplift.",
    image: metalRoof,
    size: "hero" as const,
  },
  {
    title: "Cedar Shake — Mountain Estate",
    location: "Highlands, NC",
    elevation: "4,118 ft",
    category: "Cedar Shake",
    type: "roofing" as const,
    outcome: "Full cedar shake replacement with copper ridge accents and integrated ice & water shield for heavy snow loads.",
    image: cedarRoof,
    size: "standard" as const,
  },
  {
    title: "Architectural Shingles — Multi-Level",
    location: "Franklin, NC",
    elevation: "2,100 ft",
    category: "Asphalt",
    type: "roofing" as const,
    outcome: "CertainTeed Landmark PRO in Weathered Wood. 14 squares, 6 penetrations, completed in 3 days.",
    image: asphaltRoof,
    size: "standard" as const,
  },
  {
    title: "Roof & Exterior Renovation",
    location: "Sylva, NC",
    elevation: "2,040 ft",
    category: "Full Renovation",
    type: "construction" as const,
    outcome: "Complete roof replacement paired with new siding, fascia, and soffit rebuild. Single team, single timeline.",
    image: asphaltLarge,
    size: "wide" as const,
  },
  {
    title: "Mountain Cabin — Metal Roof & Deck",
    location: "Bryson City, NC",
    elevation: "1,740 ft",
    category: "Roofing + Deck",
    type: "construction" as const,
    outcome: "Standing seam metal roof with wraparound deck and railing system. Built for heavy snow and year-round exposure.",
    image: metalCabin,
    size: "standard" as const,
  },
  {
    title: "Cedar Restoration & Gutter System",
    location: "Highlands, NC",
    elevation: "4,118 ft",
    category: "Restoration",
    type: "roofing" as const,
    outcome: "Selective cedar shake repair with seamless aluminum gutters and leaf guard. Extended roof life by 15+ years.",
    image: cedarDetail,
    size: "standard" as const,
  },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Roofing", value: "roofing" },
  { label: "Construction", value: "construction" },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isHero = project.size === "hero";
  const isWide = project.size === "wide";

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
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, scale: 0.97 }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: HIGHLAND_EASE }}
      className={`group relative rounded-none overflow-hidden cursor-pointer ${
        isHero ? "md:col-span-2 md:row-span-2" : isWide ? "md:col-span-2" : ""
      }`}
    >
      <Link to="/gallery" className="block relative h-full">
        {/* Image */}
        <div className={`relative overflow-hidden ${
          isHero ? "aspect-[4/3] md:aspect-[16/10]" : isWide ? "aspect-[21/9]" : "aspect-[4/3]"
        }`}>
          {/* Curtain reveal */}
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.1, delay: index * 0.05, ease: HIGHLAND_EASE }}
            className="absolute inset-0"
          >
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: index * 0.05 + 0.15, ease: HIGHLAND_EASE }}
            />
          </motion.div>

          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal))] via-[hsl(var(--heritage-charcoal)/0.08)] to-transparent group-hover:from-[hsl(var(--heritage-charcoal)/0.95)] transition-all duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--heritage-charcoal)/0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Hover image zoom */}
          <div className="absolute inset-0 group-hover:scale-[1.06] transition-transform duration-[1.4s]" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />

          {/* Gold bottom edge — draw on hover */}
          <div className="absolute bottom-0 left-0 w-0 group-hover:w-2/3 h-[2px] bg-gradient-to-r from-[hsl(var(--highland-gold))] to-[hsl(var(--highland-gold)/0)] transition-all duration-700 z-20" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />

          {/* Category pill — top left */}
          <div className="absolute top-4 md:top-5 left-4 md:left-6 z-10">
            <span className="text-[9px] font-body font-bold uppercase tracking-[0.18em] text-white/70 bg-white/[0.06] backdrop-blur-md border border-white/[0.08] px-3 py-1.5 group-hover:border-[hsl(var(--highland-gold)/0.2)] group-hover:text-white/90 transition-all duration-500">
              {project.category}
            </span>
          </div>

          {/* Elevation badge — top right */}
          <div className="absolute top-4 md:top-5 right-4 md:right-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
            <span className="text-[9px] font-body font-semibold tracking-[0.12em] text-[hsl(var(--highland-gold)/0.6)]">
              ▲ {project.elevation}
            </span>
          </div>

          {/* Content overlay — bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 z-10">
            {/* Location */}
            <div className="flex items-center gap-1.5 mb-2.5">
              <MapPin className="w-2.5 h-2.5 text-[hsl(var(--highland-gold)/0.5)]" />
              <span className="text-[10px] font-body font-semibold uppercase tracking-[0.15em] text-white/35">
                {project.location}
              </span>
            </div>

            {/* Title */}
            <h3 className={`font-heading font-bold text-white leading-tight tracking-tight mb-0 group-hover:text-[hsl(var(--highland-gold-light))] transition-colors duration-500 ${
              isHero ? "text-xl md:text-2xl lg:text-3xl" : "text-base md:text-lg"
            }`}>
              {project.title}
            </h3>

            {/* Outcome — reveal on hover */}
            <div className="max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
              <p className="text-white/50 text-[13px] font-body leading-relaxed mt-3 pr-12">
                {project.outcome}
              </p>
            </div>
          </div>

          {/* Arrow icon — bottom right */}
          <div className="absolute bottom-5 md:bottom-7 right-5 md:right-7 z-10">
            <div className="w-10 h-10 rounded-none border border-white/0 group-hover:border-[hsl(var(--highland-gold)/0.3)] bg-transparent group-hover:bg-[hsl(var(--highland-gold)/0.08)] backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <ArrowUpRight className="w-4 h-4 text-white/80 group-hover:text-[hsl(var(--highland-gold))] transition-colors" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const FeaturedProjects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.type === activeFilter);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 tartan-bg opacity-20" />

      <div className="container-tight relative z-10">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <ScrollReveal variant="fade">
              <span className="eyebrow mb-3 block">Selected Work</span>
            </ScrollReveal>
            <HeadingReveal delay={0.1}>
              <h2 className="section-heading mb-3">
                Projects That Speak<br className="hidden md:block" />
                <span className="text-[hsl(var(--highland-gold))]"> for Themselves.</span>
              </h2>
            </HeadingReveal>
            <ScrollReveal variant="rise-subtle" delay={0.2}>
              <p className="text-muted-foreground text-[15px] font-body max-w-md leading-relaxed">
                Estate metal roofs at 4,000 feet. Full exterior renovations in the valley. Every project photographed, documented, and warrantied.
              </p>
            </ScrollReveal>
          </div>

          {/* Filter pills */}
          <ScrollReveal variant="rise-subtle" delay={0.25}>
            <div className="flex gap-1.5">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`text-[10px] font-body font-bold uppercase tracking-[0.15em] px-5 py-2.5 rounded-none transition-all duration-300 ${
                    activeFilter === f.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent border border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Project grid — editorial layout */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Gallery CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-12 md:mt-16"
        >
          <GoldLine width="3rem" centered delay={0.2} className="mb-6" />
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-2.5 font-heading font-bold text-[13px] tracking-wide text-foreground hover:text-[hsl(var(--highland-gold))] transition-colors duration-300"
          >
            View the Full Portfolio
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-[11px] text-muted-foreground/50 font-body mt-2">
            500+ projects across 8 WNC counties
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
