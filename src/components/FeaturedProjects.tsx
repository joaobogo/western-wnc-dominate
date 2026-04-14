import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { useState, useRef } from "react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import { ArchitecturalLines } from "@/components/motion/BackgroundTexture";

import metalRoof from "@/assets/gallery/metal-005.webp";
import cedarRoof from "@/assets/gallery/cedar-004.webp";
import asphaltRoof from "@/assets/gallery/asphalt-hero.webp";
import metalCabin from "@/assets/gallery/metal-006.webp";
import asphaltLarge from "@/assets/gallery/asphalt-006.webp";
import cedarDetail from "@/assets/gallery/cedar-003.jpg";

const projects = [
  { title: "Standing Seam Metal — Estate Home", location: "Cashiers, NC", category: "Metal Roofing", type: "roofing" as const, outcome: "Complex multi-gable standing seam installation with concealed fasteners. Engineered for 140mph wind uplift at 3,800ft elevation.", image: metalRoof, featured: true },
  { title: "Cedar Shake — Luxury Mountain Estate", location: "Highlands, NC", category: "Cedar Shake", type: "roofing" as const, outcome: "Full cedar shake replacement with copper ridge accents and integrated ice & water shield system for heavy snow loads.", image: cedarRoof, featured: false },
  { title: "Architectural Shingles — Multi-Level Home", location: "Franklin, NC", category: "Asphalt Shingles", type: "roofing" as const, outcome: "CertainTeed Landmark PRO in Weathered Wood. 14 squares with 6 penetrations, completed in 3 days with zero property damage.", image: asphaltRoof, featured: false },
  { title: "Roof & Exterior Renovation", location: "Sylva, NC", category: "Construction", type: "construction" as const, outcome: "Complete roof replacement paired with new siding, fascia, and soffit rebuild. Single team, single timeline, seamless result.", image: asphaltLarge, featured: false },
  { title: "Mountain Cabin — Metal Roof & Deck", location: "Bryson City, NC", category: "Roofing + Construction", type: "construction" as const, outcome: "Standing seam metal roof with a new wraparound deck and railing system. Built for heavy snow and year-round mountain living.", image: metalCabin, featured: false },
  { title: "Cedar Restoration & Gutter System", location: "Highlands, NC", category: "Restoration", type: "roofing" as const, outcome: "Selective cedar shake repair with new seamless aluminum gutters and leaf guard system. Extended roof life by 15+ years.", image: cedarDetail, featured: false },
];

const filters = [
  { label: "All Projects", value: "all" },
  { label: "Roofing", value: "roofing" },
  { label: "Construction", value: "construction" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const ProjectCard = ({ project, index, isFeatured }: { project: typeof projects[0]; index: number; isFeatured: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: HIGHLAND_EASE }}
      className={`group relative rounded-none overflow-hidden cursor-pointer spotlight-hover ${
        isFeatured ? "md:col-span-2" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${
        isFeatured ? "aspect-[16/7]" : "aspect-[4/3]"
      }`}>
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover img-zoom-dramatic"
          loading="lazy"
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: HIGHLAND_EASE }}
        />

        {/* Cinematic gradient — deeper, more dramatic */}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal))] via-[hsl(var(--heritage-charcoal)/0.15)] to-[hsl(var(--heritage-charcoal)/0.02)] group-hover:from-[hsl(var(--heritage-charcoal)/0.95)] transition-all duration-700" />

        {/* Gold edge accent on hover */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[hsl(var(--highland-gold))] to-[hsl(var(--highland-gold)/0)]"
          initial={{ width: 0 }}
          whileHover={{ width: "60%" }}
          transition={{ duration: 0.6, ease: HIGHLAND_EASE }}
        />

        <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] font-body font-semibold uppercase tracking-[0.15em] px-3 py-1.5 z-10">
          {project.category}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
          <div className="flex items-center gap-1.5 text-white/45 text-xs mb-2.5 font-body">
            <MapPin className="w-3 h-3" />
            {project.location}
          </div>
          <h3 className="font-heading font-bold text-lg md:text-xl text-white mb-2 leading-snug group-hover:text-[hsl(var(--highland-gold-light))] transition-colors duration-500">
            {project.title}
          </h3>
          <div className="proof-card-outcome">
            <p className="text-white/55 text-sm font-body leading-relaxed pt-1">
              {project.outcome}
            </p>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-11 h-11 rounded-none bg-white/0 group-hover:bg-[hsl(var(--highland-gold)/0.15)] backdrop-blur-sm border border-white/0 group-hover:border-[hsl(var(--highland-gold)/0.3)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 z-10">
          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedProjects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.type === activeFilter);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <ArchitecturalLines variant="light" opacity={0.012} direction="left" />
      <div className="container-tight relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <ScrollReveal variant="fade">
              <span className="eyebrow mb-3 block">Featured Projects</span>
            </ScrollReveal>
            <HeadingReveal delay={0.1}>
              <h2 className="section-heading">
                Projects That Speak<br className="hidden md:block" /> for Themselves.
              </h2>
            </HeadingReveal>
          </div>

          {/* Filter pills */}
          <ScrollReveal variant="rise-subtle" delay={0.2}>
            <div className="flex gap-2">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`text-xs font-body font-semibold uppercase tracking-[0.12em] px-4 py-2.5 rounded-none btn-ghost-interactive ${
                    activeFilter === f.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Project grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              isFeatured={project.featured && activeFilter === "all"}
            />
          ))}
        </motion.div>

        <ScrollReveal variant="fade" delay={0.3} className="text-center mt-10">
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors font-body link-draw"
          >
            View Full Project Gallery
            <ArrowRight className="w-3.5 h-3.5 btn-arrow-icon" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FeaturedProjects;
