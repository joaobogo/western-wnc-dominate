import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Calendar, Ruler, Eye, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { ReassuranceBlock } from "@/components/trust";
import { PremiumLightbox } from "@/components/gallery";
import type { LightboxProject } from "@/components/gallery";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";
import { MountainContours, ArchitecturalLines, TextureOverlay } from "@/components/motion/BackgroundTexture";

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

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease: HIGHLAND_EASE },
};

interface Project extends LightboxProject {
  category: string;
  scope: string;
  duration: string;
  highlight: string;
  slug?: string; // links to /projects/:slug if available
  featured?: boolean;
}

const projects: Project[] = [
  { title: "Standing Seam Metal — Dark Bronze", type: "Metal Roofing", description: "Complex multi-gable standing seam metal roof in dark bronze. Precision panel work on steep pitches with custom trim detailing and concealed fastener system throughout.", image: metal005, category: "roofing", location: "Highlands, NC", scope: "3,200 sq ft roof replacement", duration: "8 days", highlight: "Custom-fabricated panels for 12/12 pitch", slug: "standing-seam-metal-dark-bronze-highlands", featured: true },
  { title: "CertainTeed Landmark — Weathered Wood", type: "Asphalt Shingles", description: "CertainTeed Landmark shingles on a multi-level mountain home with screen porch. Premium materials installed by Master Shingle Applicator certified crew.", image: asphaltHero, category: "roofing", location: "Waynesville, NC", scope: "4,100 sq ft roof replacement", duration: "4 days", highlight: "CertainTeed SureStart PLUS™ warranty", slug: "certainteed-landmark-weathered-wood-waynesville" },
  { title: "Cedar Shake — Estate Home", type: "Cedar Shake", description: "Stunning cedar shake roof on a luxury estate in Highlands. Intricate multi-gable design with copper ridge accents. Hand-selected premium cedar with natural preservative treatment.", image: cedar004, category: "roofing", location: "Highlands, NC", scope: "Premium cedar shake installation", duration: "14 days", highlight: "Hand-selected cedar with copper ridge accents", slug: "cedar-shake-estate-highlands" },
  { title: "Standing Seam Metal — Mountain Cabin", type: "Metal Roofing", description: "Green standing seam metal on a log cabin nestled in the WNC mountains. Engineered for decades of snow load, wind exposure, and UV at 4,200 feet elevation.", image: metal006, category: "roofing", location: "Cashiers, NC", scope: "Full roof replacement", duration: "6 days", highlight: "Engineered for 4,200 ft elevation exposure" },
  { title: "Metal Panel — Silver", type: "Metal Roofing", description: "Clean silver metal panel installation with complex hip-and-valley geometry. Every intersection precision-cut and sealed for permanent weather protection.", image: metal008, category: "roofing", location: "Franklin, NC", scope: "2,800 sq ft re-roof", duration: "7 days", highlight: "Complex hip-and-valley geometry" },
  { title: "Asphalt & Metal Combo — Highlands Estate", type: "Mixed Materials", description: "Craftsman mountain home featuring architectural shingles with standing seam metal accent roofing and natural stone exterior accents. Dual-material design for maximum curb appeal.", image: asphalt007, category: "roofing", location: "Highlands, NC", scope: "Dual-material roof system", duration: "10 days", highlight: "Architectural shingle + metal accent design" },
  { title: "Architectural Shingles — Slate Gray", type: "Asphalt Shingles", description: "Aerial drone view of a large residential shingle replacement in slate gray with complex roof intersections. Every valley and ridge executed to CertainTeed specifications.", image: asphalt006, category: "roofing", location: "Franklin, NC", scope: "3,500 sq ft complex roof", duration: "5 days", highlight: "12 roof intersections, zero callbacks" },
  { title: "Architectural Shingles — Brown", type: "Asphalt Shingles", description: "Full architectural shingle roof replacement with clean hip-and-ridge lines on a residential property. Ventilation upgraded during installation for improved attic performance.", image: asphalt008, category: "roofing", location: "Bryson City, NC", scope: "Complete re-roof + ventilation", duration: "4 days", highlight: "Ventilation system upgraded during install" },
  { title: "Metal Roof — Rural Home", type: "Metal Roofing", description: "Brown metal panel installation on a brick home in the WNC countryside. Material selected for longevity and visual harmony with the surrounding mountain landscape.", image: metal003, category: "roofing", location: "Sylva, NC", scope: "Full roof replacement", duration: "5 days", highlight: "50-year material warranty" },
  { title: "Architectural Shingles — Hunter Green", type: "Asphalt Shingles", description: "Bird's-eye view of a large complex residential roof with hunter green CertainTeed architectural shingles. Precision work on multiple dormers and valleys.", image: asphalt002, category: "roofing", location: "Macon County, NC", scope: "5,200 sq ft multi-dormer roof", duration: "6 days", highlight: "Largest residential project of Q3 2024" },
];

const categories = [
  { label: "All Projects", value: "all" },
  { label: "Roofing", value: "roofing" },
  { label: "Construction", value: "construction" },
];

const projectStats = [
  { value: "500+", label: "Projects Completed" },
  { value: "8", label: "Counties Served" },
  { value: "Zero", label: "Unresolved Callbacks" },
  { value: "100%", label: "Owner-Inspected" },
];

/* ── EDITORIAL PROJECT CARD ── */
const EditorialCard = ({ project, index, isFeatured, onClick }: {
  project: Project;
  index: number;
  isFeatured?: boolean;
  onClick: () => void;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 28 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12, scale: 0.97 }}
    transition={{ delay: index * 0.06, duration: 0.5, ease: HIGHLAND_EASE }}
    className={`group relative rounded-none overflow-hidden cursor-pointer ${
      isFeatured ? "md:col-span-2 md:row-span-2" : ""
    }`}
    onClick={onClick}
  >
    {/* Image */}
    <div className={`relative overflow-hidden ${
      isFeatured ? "aspect-[4/3] md:aspect-[16/10]" : "aspect-[4/3]"
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

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal))] via-[hsl(var(--heritage-charcoal)/0.08)] to-transparent group-hover:from-[hsl(var(--heritage-charcoal)/0.95)] transition-all duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />

      {/* Gold bottom edge */}
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-2/3 h-[2px] bg-gradient-to-r from-[hsl(var(--highland-gold))] to-[hsl(var(--highland-gold)/0)] transition-all duration-700 z-20" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />

      {/* Category badge */}
      <div className="absolute top-4 md:top-5 left-4 md:left-6 z-10">
        <span className="text-[9px] font-body font-bold uppercase tracking-[0.18em] text-white/70 bg-white/[0.06] backdrop-blur-md border border-white/[0.08] px-3 py-1.5 group-hover:border-[hsl(var(--highland-gold)/0.2)] group-hover:text-white/90 transition-all duration-500">
          {project.type}
        </span>
      </div>

      {/* Case Study badge */}
      {project.slug && (
        <div className="absolute top-4 md:top-5 right-4 md:right-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
          <span className="text-[8px] font-body font-bold uppercase tracking-[0.18em] text-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.1)] backdrop-blur-md border border-[hsl(var(--highland-gold)/0.15)] px-2.5 py-1">
            Case Study
          </span>
        </div>
      )}

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 z-10">
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin className="w-2.5 h-2.5 text-[hsl(var(--highland-gold)/0.5)]" />
          <span className="text-[10px] font-body font-semibold uppercase tracking-[0.15em] text-white/35">
            {project.location}
          </span>
        </div>

        <h3 className={`font-heading font-bold text-white leading-tight tracking-tight mb-0 group-hover:text-[hsl(var(--highland-gold-light))] transition-colors duration-500 ${
          isFeatured ? "text-xl md:text-2xl lg:text-3xl" : "text-base md:text-lg"
        }`}>
          {project.title}
        </h3>

        {/* Hover reveal: scope + duration + highlight */}
        <div className="max-h-0 group-hover:max-h-32 overflow-hidden transition-all duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
          <div className="flex items-center gap-4 text-white/40 text-[11px] font-body mt-2.5">
            <span className="flex items-center gap-1"><Ruler className="w-3 h-3" /> {project.scope}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {project.duration}</span>
          </div>
          <p className="text-white/40 text-[12px] font-body leading-relaxed mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highland-gold)/0.4)] flex-shrink-0" />
            {project.highlight}
          </p>
          {project.slug && (
            <Link
              to={`/projects/${project.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 mt-3 text-[10px] font-body font-bold uppercase tracking-[0.15em] text-[hsl(var(--highland-gold))] hover:text-[hsl(var(--highland-gold-light))] transition-colors"
            >
              Read Full Case Study <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>

      {/* Arrow icon */}
      <div className="absolute bottom-5 md:bottom-7 right-5 md:right-7 z-10">
        <div className="w-10 h-10 rounded-none border border-white/0 group-hover:border-[hsl(var(--highland-gold)/0.3)] bg-transparent group-hover:bg-[hsl(var(--highland-gold)/0.08)] backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Eye className="w-4 h-4 text-white/80 group-hover:text-[hsl(var(--highland-gold))] transition-colors" />
        </div>
      </div>
    </div>
  </motion.div>
);

const Gallery = () => {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const handleLightboxNav = useCallback((idx: number) => setLightbox(idx), []);

  return (
    <>
      <SEOHead
        title="Project Gallery | Roofing & Construction Portfolio in Western NC"
        description="Browse 500+ completed roofing and construction projects across Western North Carolina. Metal, shingle, cedar shake roofs plus additions, renovations, and outdoor living."
        path="/gallery"
        jsonLd={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Projects", url: "/gallery" }])}
      />
      <Header />
      <main>
        {/* ── HERO ── */}
        <section className="relative section-dark pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 tartan-dark" />
          <MountainContours variant="dark" opacity={0.04} />
          <TextureOverlay opacity={0.02} />
          <div className="container-tight relative z-10 px-5 md:px-8 lg:px-16">
            <motion.div {...fadeUp} className="max-w-3xl">
              <span className="eyebrow mb-4 block text-[hsl(var(--highland-gold))]">Project Showcase</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-6 leading-[1.1]">
                Our Work Speaks.<br />
                <span className="text-[hsl(var(--highland-gold))]">Every Detail Matters.</span>
              </h1>
              <div className="w-16 h-px bg-[hsl(var(--highland-gold)/0.4)] mb-6" />
              <p className="text-[hsl(var(--dark-section-foreground)/0.7)] text-base md:text-lg leading-relaxed max-w-2xl">
                Real projects across Western North Carolina. Every image represents a home we've 
                protected, a space we've built, and a standard we refuse to lower.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── PROJECT STATS STRIP ── */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.35), hsl(var(--highland-gold) / 0))' }} />
          <div className="container-tight px-5 md:px-8 py-8 md:py-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-primary-foreground/8">
              {projectStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex flex-col items-center text-center md:px-6"
                >
                  <span className="text-3xl md:text-4xl font-heading font-bold text-[hsl(var(--highland-gold))] leading-none mb-1.5">{stat.value}</span>
                  <span className="text-sm font-heading font-semibold text-primary-foreground/85">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.35), hsl(var(--highland-gold) / 0))' }} />
        </section>

        {/* ── PROJECT GRID — EDITORIAL LAYOUT ── */}
        <section className="section-padding bg-background relative">
          <ArchitecturalLines variant="light" opacity={0.015} direction="right" />
          <div className="container-tight relative z-10">
            {/* Header + Filters */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
              <div>
                <ScrollReveal variant="fade">
                  <span className="eyebrow mb-3 block">Portfolio</span>
                </ScrollReveal>
                <HeadingReveal delay={0.1}>
                  <h2 className="section-heading mb-3">
                    Every Project,{" "}
                    <span className="text-[hsl(var(--highland-gold))]">Documented.</span>
                  </h2>
                </HeadingReveal>
                <ScrollReveal variant="rise-subtle" delay={0.2}>
                  <p className="text-muted-foreground text-[15px] font-body max-w-md leading-relaxed">
                    Click any project to view details. Projects with full case studies include materials, process highlights, and before-and-after documentation.
                  </p>
                </ScrollReveal>
              </div>
              <ScrollReveal variant="rise-subtle" delay={0.25}>
                <div className="flex gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setFilter(cat.value)}
                      className={`text-[10px] font-body font-bold uppercase tracking-[0.15em] px-5 py-2.5 rounded-none transition-all duration-300 ${
                        filter === cat.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-transparent border border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Grid — 3-col editorial with featured card */}
            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {filtered.map((project, i) => (
                  <EditorialCard
                    key={project.title}
                    project={project}
                    index={i}
                    isFeatured={i === 0 && project.featured}
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
                Want results like these on your property?
              </p>
              <Link
                to="/consultation"
                className="cta-gradient text-accent-foreground font-bold px-6 py-3 rounded-sm inline-flex items-center gap-2 btn-primary-interactive"
              >
                Schedule a Consultation <ArrowRight className="w-4 h-4 btn-arrow-icon" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── VISUAL STORYTELLING ── */}
        <section className="section-padding section-dark relative overflow-hidden">
          <div className="absolute inset-0 tartan-dark" />
          <MountainContours variant="dark" opacity={0.03} />
          <div className="container-tight relative z-10">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Our Approach</span>
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
                { title: "Material Strategy", detail: "We spec materials for your property's specific conditions — elevation, weather exposure, architectural style, and long-term performance." },
                { title: "Precision Execution", detail: "Our in-house crews follow manufacturer-exact protocols. Every detail is documented, inspected, and held to our standard." },
                { title: "Owner Walkthrough", detail: "James personally inspects every completed project before handover. Nothing leaves our hands until it meets our standard." },
              ].map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="border border-[hsl(var(--highland-gold)/0.1)] rounded-sm p-6 bg-[hsl(var(--dark-section-foreground)/0.03)] text-center process-connector"
                >
                  <span className="text-3xl font-heading font-bold text-[hsl(var(--highland-gold)/0.2)] mb-3 block">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-heading font-semibold text-[hsl(var(--dark-section-foreground))] mb-2">{step.title}</h3>
                  <p className="text-[hsl(var(--dark-section-foreground)/0.6)] text-sm leading-relaxed">{step.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ── */}
        <ReassuranceBlock
          headline={"Your Project Could Be\nOur Next Showcase."}
          subheadline="Schedule a consultation and let's discuss what's possible for your home. Every great project starts with a conversation."
          ctaText="Discuss Your Project"
        />
      </main>

      {/* ── PREMIUM LIGHTBOX ── */}
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
