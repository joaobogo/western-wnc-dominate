import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Calendar, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { TrustBadgeStrip, ReassuranceBlock } from "@/components/trust";
import { PremiumLightbox, GalleryCard } from "@/components/gallery";
import type { LightboxProject } from "@/components/gallery";
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

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

interface Project extends LightboxProject {
  category: string;
  scope: string;
  duration: string;
  highlight: string;
}

const projects: Project[] = [
  { title: "Standing Seam Metal — Dark Bronze", type: "Metal Roofing", description: "Complex multi-gable standing seam metal roof in dark bronze. Precision panel work on steep pitches with custom trim detailing and concealed fastener system throughout.", image: metal005, category: "roofing", location: "Highlands, NC", scope: "3,200 sq ft roof replacement", duration: "8 days", highlight: "Custom-fabricated panels for 12/12 pitch" },
  { title: "Standing Seam Metal — Mountain Cabin", type: "Metal Roofing", description: "Green standing seam metal on a log cabin nestled in the WNC mountains. Engineered for decades of snow load, wind exposure, and UV at 4,200 feet elevation.", image: metal006, category: "roofing", location: "Cashiers, NC", scope: "Full roof replacement", duration: "6 days", highlight: "Engineered for 4,200 ft elevation exposure" },
  { title: "Metal Panel — Silver", type: "Metal Roofing", description: "Clean silver metal panel installation with complex hip-and-valley geometry. Every intersection precision-cut and sealed for permanent weather protection.", image: metal008, category: "roofing", location: "Franklin, NC", scope: "2,800 sq ft re-roof", duration: "7 days", highlight: "Complex hip-and-valley geometry" },
  { title: "Metal Roof — Rural Home", type: "Metal Roofing", description: "Brown metal panel installation on a brick home in the WNC countryside. Material selected for longevity and visual harmony with the surrounding mountain landscape.", image: metal003, category: "roofing", location: "Sylva, NC", scope: "Full roof replacement", duration: "5 days", highlight: "50-year material warranty" },
  { title: "Architectural Shingles — Weathered Wood", type: "Asphalt Shingles", description: "CertainTeed Landmark shingles on a multi-level mountain home with screen porch. Premium materials installed by Master Shingle Applicator certified crew.", image: asphaltHero, category: "roofing", location: "Waynesville, NC", scope: "4,100 sq ft roof replacement", duration: "4 days", highlight: "CertainTeed SureStart PLUS™ warranty" },
  { title: "Asphalt & Metal Combo — Highlands Estate", type: "Mixed Materials", description: "Craftsman mountain home featuring architectural shingles with standing seam metal accent roofing and natural stone exterior accents. Dual-material design for maximum curb appeal.", image: asphalt007, category: "roofing", location: "Highlands, NC", scope: "Dual-material roof system", duration: "10 days", highlight: "Architectural shingle + metal accent design" },
  { title: "Architectural Shingles — Slate Gray", type: "Asphalt Shingles", description: "Aerial drone view of a large residential shingle replacement in slate gray with complex roof intersections. Every valley and ridge executed to CertainTeed specifications.", image: asphalt006, category: "roofing", location: "Franklin, NC", scope: "3,500 sq ft complex roof", duration: "5 days", highlight: "12 roof intersections, zero callbacks" },
  { title: "Architectural Shingles — Brown", type: "Asphalt Shingles", description: "Full architectural shingle roof replacement with clean hip-and-ridge lines on a residential property. Ventilation upgraded during installation for improved attic performance.", image: asphalt008, category: "roofing", location: "Bryson City, NC", scope: "Complete re-roof + ventilation", duration: "4 days", highlight: "Ventilation system upgraded during install" },
  { title: "Architectural Shingles — Hunter Green", type: "Asphalt Shingles", description: "Bird's-eye view of a large complex residential roof with hunter green CertainTeed architectural shingles. Precision work on multiple dormers and valleys.", image: asphalt002, category: "roofing", location: "Macon County, NC", scope: "5,200 sq ft multi-dormer roof", duration: "6 days", highlight: "Largest residential project of Q3 2024" },
  { title: "Cedar Shake — Estate Home", type: "Cedar Shake", description: "Stunning cedar shake roof on a luxury estate in Highlands. Intricate multi-gable design with copper ridge accents. Hand-selected premium cedar with natural preservative treatment.", image: cedar004, category: "roofing", location: "Highlands, NC", scope: "Premium cedar shake installation", duration: "14 days", highlight: "Hand-selected cedar with copper ridge accents" },
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

const Gallery = () => {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const handleLightboxNav = useCallback((idx: number) => setLightbox(idx), []);

  return (
    <>
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

        {/* ── PROJECT GRID ── */}
        <section className="section-padding bg-background relative">
          <ArchitecturalLines variant="light" opacity={0.015} direction="right" />
          <div className="container-tight relative z-10">
            {/* Filters */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilter(cat.value)}
                  className={`px-5 py-2 rounded-sm text-sm font-semibold btn-ghost-interactive ${
                    filter === cat.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-[hsl(var(--highland-gold)/0.2)]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <GalleryCard
                    key={project.title}
                    title={project.title}
                    image={project.image}
                    type={project.type!}
                    description={project.description!}
                    location={project.location!}
                    scope={project.scope}
                    duration={project.duration}
                    highlight={project.highlight}
                    index={i}
                    onClick={() => setLightbox(projects.indexOf(project))}
                  />
                ))}
              </AnimatePresence>
            </div>
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
                to="/request-inspection"
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
