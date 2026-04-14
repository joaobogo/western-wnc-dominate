import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { useState } from "react";
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

const FeaturedProjects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.type === activeFilter);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <ArchitecturalLines variant="light" opacity={0.012} direction="left" />
      <div className="container-tight relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
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
                  className={`text-xs font-body font-semibold uppercase tracking-[0.12em] px-4 py-2 rounded-sm btn-ghost-interactive ${
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
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: HIGHLAND_EASE }}
              className={`group relative rounded-sm overflow-hidden cursor-pointer card-lift ${
                project.featured && activeFilter === "all" ? "md:col-span-2" : ""
              }`}
            >
              <div className={`relative overflow-hidden ${
                project.featured && activeFilter === "all" ? "aspect-[16/7]" : "aspect-[4/3]"
              }`}>
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover img-zoom"
                  loading="lazy"
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: HIGHLAND_EASE }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0.85)] via-[hsl(var(--heritage-charcoal)/0.2)] to-[hsl(var(--heritage-charcoal)/0.05)] group-hover:from-[hsl(var(--heritage-charcoal)/0.9)] transition-all duration-500" />

                <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] font-body font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-sm z-10">
                  {project.category}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 z-10">
                  <div className="flex items-center gap-1.5 text-white/50 text-xs mb-2 font-body">
                    <MapPin className="w-3 h-3" />
                    {project.location}
                  </div>
                  <h3 className="font-heading font-bold text-lg md:text-xl text-white mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <div className="proof-card-outcome">
                    <p className="text-white/60 text-sm font-body leading-relaxed pt-1">
                      {project.outcome}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-5 right-5 md:bottom-7 md:right-7 w-10 h-10 rounded-sm bg-white/0 group-hover:bg-white/10 backdrop-blur-sm border border-white/0 group-hover:border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal variant="fade" delay={0.3} className="text-center mt-8">
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
