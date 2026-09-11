import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";

import metalRoof from "@/assets/gallery/metal-005.webp";
import cedarRoof from "@/assets/gallery/cedar-005.webp";
import asphaltRoof from "@/assets/gallery/asphalt-hero.webp";
import metalCabin from "@/assets/gallery/metal-006.webp";
import asphaltLarge from "@/assets/gallery/asphalt-006.webp";
import cedarDetail from "@/assets/gallery/cedar-001.webp";
// Mobile audit F5: phones were being sent the 1800px masters (up to 550KB)
// for a 334px-wide slot. Responsive sets let a phone pick the 480px rendition.
import metalRoofAvif from "@/assets/gallery/metal-005.webp?w=480;800;1200&format=avif&as=srcset";
import metalRoofWebp from "@/assets/gallery/metal-005.webp?w=480;800;1200&format=webp&as=srcset";
import cedarRoofAvif from "@/assets/gallery/cedar-005.webp?w=480;800;1200&format=avif&as=srcset";
import cedarRoofWebp from "@/assets/gallery/cedar-005.webp?w=480;800;1200&format=webp&as=srcset";
import asphaltRoofAvif from "@/assets/gallery/asphalt-hero.webp?w=480;800;1200&format=avif&as=srcset";
import asphaltRoofWebp from "@/assets/gallery/asphalt-hero.webp?w=480;800;1200&format=webp&as=srcset";
import metalCabinAvif from "@/assets/gallery/metal-006.webp?w=480;800;1200&format=avif&as=srcset";
import metalCabinWebp from "@/assets/gallery/metal-006.webp?w=480;800;1200&format=webp&as=srcset";
import asphaltLargeAvif from "@/assets/gallery/asphalt-006.webp?w=480;800;1200&format=avif&as=srcset";
import asphaltLargeWebp from "@/assets/gallery/asphalt-006.webp?w=480;800;1200&format=webp&as=srcset";
import cedarDetailAvif from "@/assets/gallery/cedar-001.webp?w=480;800;1200&format=avif&as=srcset";
import cedarDetailWebp from "@/assets/gallery/cedar-001.webp?w=480;800;1200&format=webp&as=srcset";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const projects = [
  {
    title: "Project Design",
    location: "Highlands, NC",
    elevation: "4,118 ft",
    category: "Design",
    type: "construction" as const,
    outcome: "Complete layout planning and scope definition for a significant multi-level addition. Resolved terrain challenges before build.",
    image: asphaltLarge,
    size: "hero" as const,
  },
  {
    title: "Standing Seam Metal — Estate Home",
    location: "Cashiers, NC",
    elevation: "3,800 ft",
    category: "Metal Roofing",
    type: "roofing" as const,
    outcome: "Complex multi-gable standing seam installation with concealed fasteners. Engineered for 140mph wind uplift.",
    image: metalRoof,
    size: "standard" as const,
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
    title: "Dimensional Shingles — Multi-Level",
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
  const isHero = project.size === "hero";
  const isWide = project.size === "wide";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: Math.min(index * 0.04, 0.2), duration: 0.4, ease: HIGHLAND_EASE }}
      className={`group relative rounded-none overflow-hidden cursor-pointer ${
        isHero ? "md:col-span-2 md:row-span-2" : isWide ? "md:col-span-2" : ""
      }`}
    >
      <Link to="/recent-projects" className="block relative h-full">
        {/* Image */}
        <div className={`relative overflow-hidden bg-muted ${
          isHero ? "aspect-project md:aspect-hero" : isWide ? "aspect-panorama" : "aspect-project"
        }`}>
          <picture>
            {SRCSETS.get(project.image) && (
              <>
                <source type="image/avif" srcSet={SRCSETS.get(project.image)!.avif} sizes={IMG_SIZES} />
                <source type="image/webp" srcSet={SRCSETS.get(project.image)!.webp} sizes={IMG_SIZES} />
              </>
            )}
          <img width={1200} height={900}
            src={project.image}
            alt={`${project.title} — ${project.category} project by Highlander Building Services in ${project.location ?? "Western North Carolina"}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] will-change-transform"
            loading="lazy"
            decoding="async"
          />
          </picture>

          {/* Scrim token — text-over-image legibility */}
          <div aria-hidden="true" className="absolute inset-0 bg-scrim-bottom opacity-90 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Gold bottom edge — draw on hover */}
          <div className="absolute bottom-0 left-0 w-0 group-hover:w-2/3 h-[2px] bg-gradient-to-r from-[hsl(var(--highland-gold))] to-[hsl(var(--highland-gold)/0)] transition-all duration-700 z-20" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />

          {/* Category pill — top left */}
          <div className="absolute top-4 md:top-5 left-4 md:left-6 z-10">
            <span className="text-caption font-body font-bold uppercase tracking-[0.18em] text-white bg-[hsl(var(--heritage-charcoal)/0.55)] backdrop-blur-md border border-white/20 px-3 py-1.5 group-hover:border-[hsl(var(--highland-gold)/0.5)] transition-all duration-500">
              {project.category}
            </span>
          </div>

          {/* Elevation badge — top right */}
          <div className="absolute top-4 md:top-5 right-4 md:right-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
            <span className="text-caption font-body font-semibold tracking-[0.12em] text-[hsl(var(--gold-ink))] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              ▲ {project.elevation}
            </span>
          </div>

          {/* Content overlay — bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 z-10">
            {/* Location */}
            <div className="flex items-center gap-1.5 mb-2.5">
              <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
              <span className="text-caption font-body font-semibold uppercase tracking-[0.15em] text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
                {project.location}
              </span>
            </div>

            {/* Title */}
            <h3 className={`font-heading font-bold text-white leading-[1.1] tracking-tight mb-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] group-hover:text-[hsl(var(--highland-gold-light))] transition-colors duration-500 ${
              isHero ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-2xl"
            }`}>
              {project.title}
            </h3>

            {/* Outcome — reveal on hover */}
            <div className="max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
              <p className="text-white text-body-sm md:text-body-sm font-body leading-relaxed mt-3 pr-12 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] font-bold">
                {project.outcome}

              </p>
            </div>
          </div>

          {/* Arrow icon — bottom right */}
          <div className="absolute bottom-5 md:bottom-7 right-5 md:right-7 z-10">
            <div className="w-10 h-10 rounded-none border border-white/0 group-hover:border-[hsl(var(--highland-gold)/0.3)] bg-transparent group-hover:bg-[hsl(var(--highland-gold)/0.08)] backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <ArrowUpRight className="w-4 h-4 text-white/95 group-hover:text-[hsl(var(--gold-ink))] transition-colors" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/** One card fills the width on phones, ~half on tablets, ~a third on desktop. */
const IMG_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

const SRCSETS = new Map<string, { avif: string; webp: string }>([
  [metalRoof, { avif: metalRoofAvif, webp: metalRoofWebp }],
  [cedarRoof, { avif: cedarRoofAvif, webp: cedarRoofWebp }],
  [asphaltRoof, { avif: asphaltRoofAvif, webp: asphaltRoofWebp }],
  [metalCabin, { avif: metalCabinAvif, webp: metalCabinWebp }],
  [asphaltLarge, { avif: asphaltLargeAvif, webp: asphaltLargeWebp }],
  [cedarDetail, { avif: cedarDetailAvif, webp: cedarDetailWebp }],
]);

export const FeaturedProjects = ({ location }: { location?: string }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  // Always show the full portfolio preview. When a `location` is provided
  // (e.g. town pages), surface matching projects first so the section still
  // feels local, but never hide the rest of the portfolio.
  const matchesLocation = (loc: string) =>
    !!location && (loc.includes(location) || loc.includes(location.split(',')[0]));

  const byFilter = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.type === activeFilter);

  const displayProjects = location
    ? [...byFilter].sort((a, b) => Number(matchesLocation(b.location)) - Number(matchesLocation(a.location)))
    : byFilter;

  return (
    <>
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 tartan-bg opacity-10" />

        <div className="container-tight relative z-10" id="projects">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <ScrollReveal variant="fade">
              <span className="eyebrow mb-3 block">Selected Work</span>
            </ScrollReveal>
            <HeadingReveal delay={0.1}>
              <h2 className="section-heading mb-3">
                Projects That Speak<br className="hidden md:block" />
                <span className="text-[hsl(var(--gold-ink))]"> for Themselves.</span>
              </h2>
            </HeadingReveal>
            <ScrollReveal variant="rise-subtle" delay={0.2}>
              <p className="text-muted-foreground text-body-sm font-body max-w-md leading-relaxed">
                Real roofs at real elevations. Every project photographed on completion and documented.
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
                  className={`text-caption font-body font-bold uppercase tracking-[0.15em] px-5 py-2.5 rounded-none transition-all duration-300 ${
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

        {/* Project grid — horizontal scroll */}
        <div
          className="flex overflow-x-auto pb-8 gap-4 snap-x snap-mandatory scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {displayProjects.map((project, i) => (
            <div key={project.title} className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] snap-start">
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>

        {/* Gallery CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <GoldLine width="3rem" centered delay={0.2} className="mb-6" />
          <Link
            to="/recent-projects"
            className="group inline-flex min-h-[44px] items-center gap-2.5 font-heading font-bold text-body-xs tracking-wide text-foreground hover:text-[hsl(var(--gold-ink))] transition-colors duration-300"
          >
            View the Full Portfolio
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
          <p className="text-body-xs text-foreground font-body font-semibold mt-3">
            Mountain-proven across 8 WNC counties
          </p>
        </motion.div>
        </div>
      </section>
    </>
  );
};

export default FeaturedProjects;
