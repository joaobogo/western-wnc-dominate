import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Calendar, Ruler, Eye, Camera, Award, Star, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { ReassuranceBlock } from "@/components/trust";
import { PremiumLightbox } from "@/components/gallery";
import type { LightboxProject } from "@/components/gallery";
import { MountainContours, TextureOverlay } from "@/components/motion/BackgroundTexture";

import metal005 from "@/assets/gallery/metal-005.webp";
import metal006 from "@/assets/gallery/metal-006.webp";
import metal008 from "@/assets/gallery/metal-008.webp";
import metal003 from "@/assets/gallery/metal-003.webp";
import asphalt008 from "@/assets/gallery/asphalt-008.webp";
import asphalt007 from "@/assets/gallery/asphalt-007.webp";
import asphalt006 from "@/assets/gallery/asphalt-006.webp";
import asphaltHero from "@/assets/gallery/asphalt-hero.webp";
import asphalt002 from "@/assets/gallery/asphalt-002.jpg";
import cedar004 from "@/assets/gallery/cedar-004.webp";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

interface Project extends LightboxProject {
  category: string;
  scope: string;
  duration: string;
  highlight: string;
  slug?: string;
  featured?: boolean;
}

const projects: Project[] = [
  { title: "Standing Seam Metal — Dark Bronze", type: "Metal Roofing", description: "Complex multi-gable standing seam metal roof in dark bronze. Precision panel work on steep pitches with custom trim detailing and concealed fastener system throughout.", image: metal005, category: "roofing", location: "Highlands, NC", scope: "3,200 sq ft roof replacement", duration: "8 days", highlight: "Custom-fabricated panels for 12/12 pitch", slug: "standing-seam-metal-dark-bronze-highlands", featured: true },
  { title: "CertainTeed Landmark — Weathered Wood", type: "Asphalt Shingles", description: "CertainTeed Landmark shingles on a multi-level mountain home with screen porch. Premium materials installed by Master Shingle Applicator certified crew.", image: asphaltHero, category: "roofing", location: "Waynesville, NC", scope: "4,100 sq ft roof replacement", duration: "4 days", highlight: "CertainTeed SureStart PLUS™ warranty", slug: "certainteed-landmark-weathered-wood-waynesville" },
  { title: "Cedar Shake — Estate Home", type: "Cedar Shake", description: "Stunning cedar shake roof on a luxury estate in Highlands. Intricate multi-gable design with copper ridge accents. Hand-selected premium cedar with natural preservative treatment.", image: cedar004, category: "roofing", location: "Highlands, NC", scope: "Premium cedar shake installation", duration: "14 days", highlight: "Hand-selected cedar with copper ridge accents", slug: "cedar-shake-estate-highlands" },
  { title: "Standing Seam Metal — Mountain Cabin", type: "Metal Roofing", description: "Green standing seam metal on a log cabin nestled in the WNC mountains. Engineered for decades of snow load, wind exposure, and UV at 4,200 feet elevation.", image: metal006, category: "roofing", location: "Cashiers, NC", scope: "Full roof replacement", duration: "6 days", highlight: "Engineered for 4,200 ft elevation exposure" },
  { title: "Metal Panel — Silver", type: "Metal Roofing", description: "Clean silver metal panel installation with complex hip-and-valley geometry. Every intersection precision-cut and sealed for permanent weather protection.", image: metal008, category: "roofing", location: "Franklin, NC", scope: "2,800 sq ft re-roof", duration: "7 days", highlight: "Complex hip-and-valley geometry" },
  { title: "Asphalt & Metal Combo — Highlands Estate", type: "Mixed Materials", description: "Craftsman mountain home featuring dimensional shingles with standing seam metal accent roofing and natural stone exterior accents. Dual-material design for maximum curb appeal.", image: asphalt007, category: "roofing", location: "Highlands, NC", scope: "Dual-material roof system", duration: "10 days", highlight: "Premium shingle + metal accent design" },
  { title: "Dimensional Shingles — Slate Gray", type: "Asphalt Shingles", description: "Aerial drone view of a large residential shingle replacement in slate gray with complex roof intersections. Every valley and ridge executed to CertainTeed specifications.", image: asphalt006, category: "roofing", location: "Franklin, NC", scope: "3,500 sq ft complex roof", duration: "5 days", highlight: "12 roof intersections, zero callbacks" },
  { title: "Dimensional Shingles — Brown", type: "Asphalt Shingles", description: "Full dimensional shingle roof replacement with clean hip-and-ridge lines on a residential property. Ventilation upgraded during installation for improved attic performance.", image: asphalt008, category: "roofing", location: "Bryson City, NC", scope: "Complete re-roof + ventilation", duration: "4 days", highlight: "Ventilation system upgraded during install" },
  { title: "Metal Roof — Rural Home", type: "Metal Roofing", description: "Brown metal panel installation on a brick home in the WNC countryside. Material selected for longevity and visual harmony with the surrounding mountain landscape.", image: metal003, category: "roofing", location: "Sylva, NC", scope: "Full roof replacement", duration: "5 days", highlight: "50-year material warranty" },
  { title: "Dimensional Shingles — Hunter Green", type: "Asphalt Shingles", description: "Bird's-eye view of a large complex residential roof with hunter green CertainTeed dimensional shingles. Precision work on multiple dormers and valleys.", image: asphalt002, category: "roofing", location: "Macon County, NC", scope: "5,200 sq ft multi-dormer roof", duration: "6 days", highlight: "Largest residential project of Q3 2024" },
];

const categories = [
  { label: "All", value: "all" },
  { label: "Roofing", value: "roofing" },
  { label: "Construction", value: "construction" },
];

const materialTypes = ["All Materials", "Metal", "Asphalt", "Cedar", "Mixed"];

/* ── CINEMATIC HERO CARD — used for the spotlight ── */
const SpotlightCard = ({ project, onClick }: { project: Project; onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: HIGHLAND_EASE }}
    className="group relative cursor-pointer overflow-hidden"
    onClick={onClick}
  >
    <div className="relative aspect-[21/9] md:aspect-[21/8] overflow-hidden">
      <motion.img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
        loading="eager"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, ease: HIGHLAND_EASE }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0.7)] via-[hsl(var(--heritage-charcoal)/0.15)] to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--heritage-charcoal)/0.5)] to-transparent" />

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16 z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] md:text-[12px] font-body font-bold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.15)] backdrop-blur-sm border border-[hsl(var(--highland-gold)/0.3)] px-3 py-1.5">
              Featured Project
            </span>
            <span className="text-[11px] md:text-[12px] font-body font-bold uppercase tracking-[0.15em] text-white/85 bg-white/10 backdrop-blur-sm px-2.5 py-1.5">
              {project.type}
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-[1.08] mb-4 group-hover:text-[hsl(var(--highland-gold-light))] transition-colors duration-500">
            {project.title}
          </h2>
          <p className="text-white/65 text-base md:text-lg font-body max-w-xl leading-relaxed mb-5 hidden md:block font-medium">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center gap-5 text-white/60 text-[13px] md:text-[14px] font-body font-medium">
            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {project.location}</span>
            <span className="flex items-center gap-1.5"><Ruler className="w-3 h-3" /> {project.scope}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {project.duration}</span>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="absolute bottom-8 md:bottom-12 right-8 md:right-12 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-12 h-12 border border-[hsl(var(--highland-gold)/0.3)] bg-[hsl(var(--highland-gold)/0.08)] backdrop-blur-sm flex items-center justify-center">
          <Eye className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
        </div>
      </div>

      {/* Gold bottom edge */}
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-[hsl(var(--highland-gold))] via-[hsl(var(--highland-gold)/0.6)] to-[hsl(var(--highland-gold)/0)] transition-all duration-1000" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />
    </div>
  </motion.div>
);

/* ── EDITORIAL CARD — masonry variant ── */
const EditorialCard = ({ project, index, size, onClick }: {
  project: Project;
  index: number;
  size: "tall" | "wide" | "standard";
  onClick: () => void;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 28 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12, scale: 0.97 }}
    transition={{ delay: index * 0.05, duration: 0.5, ease: HIGHLAND_EASE }}
    className={`group relative rounded-none overflow-hidden cursor-pointer ${
      size === "tall" ? "md:row-span-2" : size === "wide" ? "md:col-span-2" : ""
    }`}
    onClick={onClick}
  >
    <div className={`relative overflow-hidden ${
      size === "tall" ? "aspect-[3/4] md:aspect-[3/5]" : size === "wide" ? "aspect-[4/3] md:aspect-[16/9]" : "aspect-[4/3]"
    }`}>
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        whileInView={{ clipPath: "inset(0 0 0% 0)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, delay: index * 0.04, ease: HIGHLAND_EASE }}
        className="absolute inset-0"
      >
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading={index < 3 ? "eager" : "lazy"}
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: index * 0.04 + 0.1, ease: HIGHLAND_EASE }}
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0.8)] via-transparent to-transparent group-hover:from-[hsl(var(--heritage-charcoal)/0.9)] transition-all duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />

      {/* Gold edge */}
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-2/3 h-[2px] bg-gradient-to-r from-[hsl(var(--highland-gold))] to-[hsl(var(--highland-gold)/0)] transition-all duration-700 z-20" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />

      {/* Badge */}
      <div className="absolute top-4 md:top-5 left-4 md:left-5 z-10">
        <span className="text-[11px] font-body font-bold uppercase tracking-[0.18em] text-white/90 bg-white/[0.1] backdrop-blur-md border border-white/[0.2] px-3 py-1.5 group-hover:border-[hsl(var(--highland-gold)/0.4)] group-hover:text-white transition-all duration-500">
          {project.type}
        </span>
      </div>

      {project.slug && (
        <div className="absolute top-4 md:top-5 right-4 md:right-5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
          <span className="text-[10px] font-body font-bold uppercase tracking-[0.18em] text-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.2)] backdrop-blur-md border border-[hsl(var(--highland-gold)/0.3)] px-2.5 py-1.5">
            Case Study
          </span>
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin className="w-2.5 h-2.5 text-[hsl(var(--highland-gold)/0.5)]" />
          <span className="text-[12px] font-body font-bold uppercase tracking-[0.15em] text-white/50">{project.location}</span>
        </div>
        <h3 className={`font-heading font-bold text-white leading-tight tracking-tight group-hover:text-[hsl(var(--highland-gold-light))] transition-colors duration-500 ${
          size === "wide" ? "text-lg md:text-2xl" : "text-base md:text-lg"
        }`}>
          {project.title}
        </h3>

        {/* Hover reveal */}
        <div className="max-h-0 group-hover:max-h-36 overflow-hidden transition-all duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
          <p className="text-white/40 text-[12px] font-body leading-relaxed mt-2 line-clamp-2">{project.description}</p>
          <div className="flex items-center gap-4 text-white/35 text-[11px] font-body mt-2">
            <span className="flex items-center gap-1"><Ruler className="w-3 h-3" /> {project.scope}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {project.duration}</span>
          </div>
          <p className="text-[hsl(var(--highland-gold)/0.6)] text-[11px] font-body mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highland-gold)/0.4)]" />
            {project.highlight}
          </p>
          {project.slug && (
            <Link
              to={`/projects/${project.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 mt-2.5 text-[10px] font-body font-bold uppercase tracking-[0.15em] text-[hsl(var(--highland-gold))] hover:text-[hsl(var(--highland-gold-light))] transition-colors"
            >
              Full Case Study <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>

      {/* Eye */}
      <div className="absolute bottom-5 right-5 z-10">
        <div className="w-9 h-9 border border-white/0 group-hover:border-[hsl(var(--highland-gold)/0.3)] bg-transparent group-hover:bg-[hsl(var(--highland-gold)/0.08)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Eye className="w-3.5 h-3.5 text-white/60 group-hover:text-[hsl(var(--highland-gold))]" />
        </div>
      </div>
    </div>
  </motion.div>
);

/* Size pattern for visual rhythm */
const sizePattern: Array<"tall" | "wide" | "standard"> = [
  "standard", "tall", "standard", "wide", "standard", "standard",
  "standard", "standard", "tall", "standard",
];

const Gallery = () => {
  const [filter, setFilter] = useState("all");
  const [materialFilter, setMaterialFilter] = useState("All Materials");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = projects
    .filter((p) => filter === "all" || p.category === filter)
    .filter((p) => materialFilter === "All Materials" || p.type.toLowerCase().includes(materialFilter.toLowerCase()));

  const featuredProject = projects.find((p) => p.featured);
  const handleLightboxNav = useCallback((idx: number) => setLightbox(idx), []);

  return (
    <>
      <SEOHead
        title="Project Gallery | Western NC Roofing & Construction"
        description="Browse completed roofing and construction projects across Western North Carolina. Metal, shingle, cedar shake roofs plus additions, renovations, and outdoor living."
        path="/gallery"
        jsonLd={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Projects", url: "/gallery" }])}
      />
      <Header />
      <main>
        {/* ── HERO — Centered cinematic, no sidebar (unique to Gallery) ── */}
        <section className="relative section-dark overflow-hidden">
          <div className="absolute inset-0 tartan-dark" />
          <MountainContours variant="dark" opacity={0.04} />
          {/* Horizontal gold line draws across top */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] z-20"
            style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.5), hsl(var(--highland-gold) / 0))" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, delay: 0.3, ease: HIGHLAND_EASE }}
          />
          <div className="relative z-10 pt-32 md:pt-40 pb-12 md:pb-16 px-5 md:px-8 lg:px-16">
            <div className="container-tight">
              {/* Centered hero — no grid, no sidebar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: HIGHLAND_EASE }}
                className="text-center max-w-3xl mx-auto"
              >
                <div className="inline-flex items-center gap-3 mb-6">
                  <Camera className="w-4 h-4 text-[hsl(var(--highland-gold)/0.5)]" />
                  <span className="text-[10px] font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--highland-gold))]">Project Portfolio</span>
                </div>
                <motion.h1
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2, ease: HIGHLAND_EASE }}
                  className="text-4xl md:text-5xl lg:text-[4rem] font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-6 leading-[1.04] tracking-tight"
                >
                  Every Project Is a Commitment{" "}
                  <span className="text-[hsl(var(--highland-gold))]">Made Visible.</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-[hsl(var(--dark-section-foreground)/0.5)] text-base md:text-lg leading-relaxed max-w-xl mx-auto"
                >
                  These aren't stock photos. Every image here represents a real WNC home we've protected,
                  a real space we've built, and a standard we refuse to lower.
                </motion.p>
              </motion.div>

              {/* Stats as horizontal strip below — not sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: HIGHLAND_EASE }}
                className="mt-10 pt-8 border-t border-[hsl(var(--dark-section-foreground)/0.06)]"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-[hsl(var(--dark-section-foreground)/0.08)]">
                  {[
                    { value: "4.9★", label: "Google Rating" },
                    { value: "8", label: "Counties Served" },
                    { value: "10y", label: "Labor Warranty" },
                    { value: "100%", label: "Owner-Inspected" },
                  ].map((stat, i) => (
                    <div key={stat.label} className="flex flex-col items-center text-center md:px-6">
                      <span className="text-2xl md:text-3xl font-heading font-bold text-[hsl(var(--highland-gold))] leading-none mb-1">{stat.value}</span>
                      <span className="text-[10px] uppercase tracking-wider text-[hsl(var(--dark-section-foreground)/0.35)] font-body">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FEATURED PROJECT SPOTLIGHT ── */}
        {featuredProject && filter === "all" && materialFilter === "All Materials" && (
          <section className="bg-[hsl(var(--heritage-charcoal))]">
            <SpotlightCard
              project={featuredProject}
              onClick={() => setLightbox(projects.indexOf(featuredProject))}
            />
          </section>
        )}

        {/* ── FILTER BAR — elegant inline ── */}
        <section className="bg-background border-b border-border sticky top-[72px] z-30">
          <div className="container-tight px-5 md:px-8">
            <div className="flex items-center justify-between py-4 gap-4 overflow-x-auto">
              <div className="flex items-center gap-2 flex-shrink-0">
                <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                <div className="flex gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setFilter(cat.value)}
                      className={`text-[10px] font-body font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-none transition-all duration-300 ${
                        filter === cat.value
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                {materialTypes.map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setMaterialFilter(mat)}
                    className={`text-[10px] font-body font-semibold px-3 py-1.5 rounded-sm transition-all duration-200 ${
                      materialFilter === mat
                        ? "bg-secondary text-foreground border border-border"
                        : "text-muted-foreground/60 hover:text-muted-foreground"
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── MASONRY GRID ── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="eyebrow mb-2 block">Portfolio</span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  {filtered.length} Project{filtered.length !== 1 ? "s" : ""}
                </h2>
              </div>
              <p className="text-muted-foreground text-xs font-body hidden md:block">
                Click any project to explore. Case studies include full documentation.
              </p>
            </div>

            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 auto-rows-auto">
                {filtered.map((project, i) => (
                  <EditorialCard
                    key={project.title}
                    project={project}
                    index={i}
                    size={sizePattern[i % sizePattern.length]}
                    onClick={() => setLightbox(projects.indexOf(project))}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── MID CTA ── */}
        <section className="bg-primary py-10 md:py-12 relative overflow-hidden">
          <TextureOverlay opacity={0.02} />
          <div className="container-tight text-center px-5 md:px-8 relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
              <p className="text-primary-foreground font-heading font-semibold text-lg">
                Imagine results like these on your property.
              </p>
              <Link
                to="/consultation"
                className="cta-gradient text-accent-foreground font-bold px-6 py-3 rounded-sm inline-flex items-center gap-2 btn-primary-interactive"
              >
                Start a Similar Project <ArrowRight className="w-4 h-4 btn-arrow-icon" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── PROCESS STORYTELLING ── */}
        <section className="section-padding section-dark relative overflow-hidden">
          <div className="absolute inset-0 tartan-dark" />
          <MountainContours variant="dark" opacity={0.03} />
          <div className="container-tight relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Our Process</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-4 leading-tight">
                Every Project Tells a Story
              </h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-[hsl(var(--dark-section-foreground)/0.6)] max-w-2xl mx-auto">
                Behind every completed project is a process — careful planning, precise execution,
                and personal accountability from the first conversation to the final walkthrough.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { title: "Site Assessment", detail: "Every project begins with a thorough property evaluation — understanding terrain, exposure, existing conditions, and your goals." },
                { title: "Material Strategy", detail: "We spec materials for your property's specific conditions — elevation, weather exposure, home style, and long-term performance." },
                { title: "Precision Execution", detail: "Our in-house crews follow manufacturer-exact protocols. Every detail is documented, inspected, and held to our standard." },
                { title: "Owner Walkthrough", detail: "James personally inspects every completed project before handover. Nothing leaves our hands until it meets our standard." },
              ].map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="border border-[hsl(var(--highland-gold)/0.1)] rounded-sm p-6 bg-[hsl(var(--dark-section-foreground)/0.03)] text-center"
                >
                  <span className="text-3xl font-heading font-bold text-[hsl(var(--highland-gold)/0.2)] mb-3 block">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-heading font-semibold text-[hsl(var(--dark-section-foreground))] mb-2">{step.title}</h3>
                  <p className="text-[hsl(var(--dark-section-foreground)/0.6)] text-sm leading-relaxed">{step.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ReassuranceBlock
          headline={"Your Project Could Be\nOur Next Showcase."}
          subheadline="Every project here started the same way yours could — with a conversation about what's possible for your home."
          ctaText="Your Project Could Be Next"
        />
      </main>

      <PremiumLightbox
        projects={projects}
        currentIndex={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={handleLightboxNav}
      />

      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Gallery;
