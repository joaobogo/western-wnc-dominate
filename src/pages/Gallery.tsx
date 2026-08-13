import { Fragment, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Calendar, Ruler, Eye, Camera, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCloseCTA from "@/components/PageCloseCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { ReassuranceBlock } from "@/components/trust";
import { PremiumLightbox, GalleryCard } from "@/components/gallery";
import type { LightboxProject } from "@/components/gallery";
import { MountainContours, TextureOverlay } from "@/components/motion/BackgroundTexture";
import GalleryInlineCTA from "@/components/projects/GalleryInlineCTA";

import metal005 from "@/assets/gallery/metal-005.webp";
import metal006 from "@/assets/gallery/metal-006.webp";
import metal008 from "@/assets/gallery/metal-008.webp";
import metal003 from "@/assets/gallery/metal-003.webp";
import asphalt008 from "@/assets/gallery/asphalt-008.webp";
import asphalt007 from "@/assets/gallery/asphalt-007.webp";
import asphalt006 from "@/assets/gallery/asphalt-006.webp";
import asphaltHero from "@/assets/gallery/asphalt-hero.webp";
import asphalt002 from "@/assets/gallery/asphalt-002.webp";
import cedar004 from "@/assets/gallery/cedar-005.webp";

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
  { title: "CertainTeed Landmark — Weathered Wood", type: "Asphalt Shingles", description: "CertainTeed Landmark shingles on a multi-level mountain home with screen porch. Premium materials installed by ShingleMaster Credentialed Contractor certified crew.", image: asphaltHero, category: "roofing", location: "Waynesville, NC", scope: "4,100 sq ft roof replacement", duration: "4 days", highlight: "CertainTeed SureStart PLUS™ warranty", slug: "certainteed-landmark-weathered-wood-waynesville" },
  { title: "Cedar Shake — Estate Home", type: "Cedar Shake", description: "Stunning cedar shake roof on a luxury estate in Highlands. Intricate multi-gable design with copper ridge accents. Hand-selected premium cedar with natural preservative treatment.", image: cedar004, category: "roofing", location: "Highlands, NC", scope: "Premium cedar shake installation", duration: "14 days", highlight: "Hand-selected cedar with copper ridge accents", slug: "cedar-shake-estate-highlands" },
  { title: "Standing Seam Metal — Mountain Cabin", type: "Metal Roofing", description: "Green standing seam metal on a log cabin nestled in the WNC mountains. Engineered for decades of snow load, wind exposure, and UV at 4,200 feet elevation.", image: metal006, category: "roofing", location: "Cashiers, NC", scope: "Full roof replacement", duration: "6 days", highlight: "Engineered for 4,200 ft elevation exposure" },
  { title: "Asphalt & Metal Combo — Highlands Estate", type: "Mixed Materials", description: "Craftsman mountain home featuring dimensional shingles with standing seam metal accent roofing and natural stone exterior accents. Dual-material design for maximum curb appeal.", image: asphalt007, category: "roofing", location: "Highlands, NC", scope: "Dual-material roof system", duration: "10 days", highlight: "Premium shingle + metal accent design" },
  { title: "Metal Panel — Silver", type: "Metal Roofing", description: "Clean silver metal panel installation with complex hip-and-valley geometry. Every intersection precision-cut and sealed for permanent weather protection.", image: metal008, category: "roofing", location: "Franklin, NC", scope: "2,800 sq ft re-roof", duration: "7 days", highlight: "Complex hip-and-valley geometry" },
  { title: "Dimensional Shingles — Slate Gray", type: "Asphalt Shingles", description: "Aerial drone view of a large residential shingle replacement in slate gray with complex roof intersections. Every valley and ridge executed to CertainTeed specifications.", image: asphalt006, category: "roofing", location: "Franklin, NC", scope: "3,500 sq ft complex roof", duration: "5 days", highlight: "12 roof intersections, zero callbacks" },
  { title: "Dimensional Shingles — Brown", type: "Asphalt Shingles", description: "Full dimensional shingle roof replacement with clean hip-and-ridge lines on a residential property. Ventilation upgraded during installation for improved attic performance.", image: asphalt008, category: "roofing", location: "Bryson City, NC", scope: "Complete re-roof + ventilation", duration: "4 days", highlight: "Ventilation system upgraded during install" },
  { title: "Metal Roof — Rural Home", type: "Metal Roofing", description: "Brown metal panel installation on a brick home in the WNC countryside. Material selected for longevity and visual harmony with the surrounding mountain landscape.", image: metal003, category: "roofing", location: "Sylva, NC", scope: "Full roof replacement", duration: "5 days", highlight: "manufacturer material warranty" },
  { title: "Dimensional Shingles — Hunter Green", type: "Asphalt Shingles", description: "Bird's-eye view of a large complex residential roof with hunter green CertainTeed dimensional shingles. Precision work on multiple dormers and valleys.", image: asphalt002, category: "roofing", location: "Macon County, NC", scope: "5,200 sq ft multi-dormer roof", duration: "6 days", highlight: "Largest residential project of Q3 2024" },
];

const categories = [
  { label: "All", value: "all" },
  { label: "Roofing", value: "roofing" },
  { label: "Construction", value: "construction" },
];

const materialTypes = ["All Materials", "Metal", "Asphalt", "Cedar", "Mixed"];

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

      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16 z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-caption md:text-body-xs font-body font-bold uppercase tracking-[0.2em] text-[hsl(var(--gold-ink))] bg-[hsl(var(--highland-gold)/0.15)] backdrop-blur-sm border border-[hsl(var(--highland-gold)/0.3)] px-3 py-1.5">
              Featured Project
            </span>
            <span className="text-caption md:text-body-xs font-body font-bold uppercase tracking-[0.15em] text-white/85 bg-white/10 backdrop-blur-sm px-2.5 py-1.5">
              {project.type}
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-[1.08] mb-4 group-hover:text-[hsl(var(--highland-gold-light))] transition-colors duration-500">
            {project.title}
          </h2>
          <p className="text-white/90 text-base md:text-lg font-body max-w-xl leading-relaxed mb-5 hidden md:block font-medium">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center gap-5 text-white/85 text-body-xs md:text-body-xs font-body font-medium">
            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {project.location}</span>
            <span className="flex items-center gap-1.5"><Ruler className="w-3 h-3" /> {project.scope}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {project.duration}</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 md:bottom-12 right-8 md:right-12 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-12 h-12 border border-[hsl(var(--highland-gold)/0.3)] bg-[hsl(var(--highland-gold)/0.08)] backdrop-blur-sm flex items-center justify-center">
          <Eye className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-[hsl(var(--highland-gold))] via-[hsl(var(--highland-gold)/0.6)] to-[hsl(var(--highland-gold)/0)] transition-all duration-1000" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />
    </div>
  </motion.div>
);

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
        description="Completed roofing and construction projects across Western North Carolina — metal, shingle, and cedar roofs plus additions and outdoor living."
        path="/recent-projects"
        jsonLd={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Projects", url: "/recent-projects" }])}
      />
      <Header />
      <main id="main-content">
        <section className="relative section-dark overflow-hidden">
          <div className="absolute inset-0 tartan-dark" />
          <MountainContours variant="dark" opacity={0.04} />
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] z-20"
            style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.5), hsl(var(--highland-gold) / 0))" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, delay: 0.3, ease: HIGHLAND_EASE }}
          />
          <div className="relative z-10 pt-32 md:pt-40 pb-12 md:pb-16 px-5 md:px-8 lg:px-16">
            <div className="container-tight">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-10 flex flex-col items-center"
              >
                <div className="h-12 w-px bg-gradient-to-b from-[hsl(var(--highland-gold)/0)] to-[hsl(var(--highland-gold)/0.5)] mb-4" />
                <span className="text-body-xs font-heading font-bold text-white tracking-[0.15em] uppercase">Highlander Heritage</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: HIGHLAND_EASE }}
                className="text-center max-w-3xl mx-auto"
              >
                <div className="inline-flex items-center gap-3 mb-6">
                  <Camera className="w-4 h-4 text-[hsl(var(--highland-gold)/0.9)]" />
                  <span className="text-caption font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--gold-ink))]">Project Portfolio</span>
                </div>
                <motion.h1
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2, ease: HIGHLAND_EASE }}
                  className="text-display-lg md:text-display-xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-6 leading-[0.95] tracking-tightest"
                >
                  Every Project Is a Commitment{" "}
                  <span className="text-[hsl(var(--gold-ink))]">Made Visible.</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-body-lg md:text-body-xl text-white/85 leading-relaxed max-w-xl mx-auto font-medium drop-shadow-sm"
                >
                  These aren't stock photos. Every image here represents a real WNC home we've protected,
                  a real space we've built, and a standard we refuse to lower.
                </motion.p>
              </motion.div>

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
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center text-center md:px-6">
                      <span className="text-2xl md:text-3xl font-heading font-bold text-[hsl(var(--gold-ink))] leading-none mb-1">{stat.value}</span>
                      <span className="text-caption uppercase tracking-wider text-[hsl(var(--dark-section-foreground)/0.35)] font-body">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {featuredProject && filter === "all" && materialFilter === "All Materials" && (
          <section className="bg-[hsl(var(--heritage-charcoal))]">
            <SpotlightCard
              project={featuredProject}
              onClick={() => setLightbox(projects.indexOf(featuredProject))}
            />
          </section>
        )}

        <section className="bg-secondary/50 border-b border-border sticky top-[72px] z-30 backdrop-blur-md">
          <div className="container-tight px-5 md:px-8 py-6">
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-wrap justify-center items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setFilter(cat.value)}
                    className={`text-caption font-body font-bold uppercase tracking-[0.2em] px-8 py-3.5 border transition-all duration-500 relative overflow-hidden group/btn ${
                      filter === cat.value
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    <span className="relative z-10">{cat.label} Projects</span>
                    {filter !== cat.value && (
                      <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
                {materialTypes.map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setMaterialFilter(mat)}
                    className={`text-caption font-body font-bold uppercase tracking-[0.2em] transition-all duration-300 relative py-1 ${
                      materialFilter === mat
                        ? "text-primary font-black"
                        : "text-muted-foreground hover:text-primary/70"
                    }`}
                  >
                    {mat}
                    {materialFilter === mat && (
                      <motion.div
                        layoutId="activeMaterial"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background relative min-h-[600px]">
          <div className="absolute inset-0 tartan-bg opacity-[0.03]" />
          <div className="container-tight relative z-10">
            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-muted-foreground font-body italic text-lg">No projects match your current filters. Try selecting "All".</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 auto-rows-auto items-start">
                <AnimatePresence mode="popLayout">
                  {filtered.map((project, i) => {
                    const originalIndex = projects.indexOf(project);
                    // CTA after every three projects — proof should sell, not just display.
                    const closesTriplet = (i + 1) % 3 === 0 && i !== filtered.length - 1;
                    return (
                      <Fragment key={project.title}>
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.5, delay: i * 0.05 }}
                        >
                          <GalleryCard
                            {...project}
                            index={i}
                            variant={i % 5 === 0 ? "wide" : "standard"}
                            onClick={() => setLightbox(originalIndex)}
                          />
                        </motion.div>
                        {closesTriplet && (
                          <GalleryInlineCTA
                            position={Math.ceil((i + 1) / 3)}
                            towns={Array.from(
                              new Set(filtered.slice(i - 2, i + 1).map((p) => p.location)),
                            )}
                          />
                        )}
                      </Fragment>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>

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
              <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">Our Process</span>
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
                { title: "Owner Walkthrough", detail: "The owner personally inspects every completed project before handover. Nothing leaves our hands until it meets the Highlander standard." },
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

        {/* ── PRE-LAUNCH ASSET REQUEST ── */}
        <section className="bg-secondary border-t border-border">
          <div className="container-tight section-padding max-w-4xl">
            <div className="card-premium p-8 md:p-10">
              <span className="eyebrow block mb-3">For the Highlander Team — Pre-Launch</span>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight mb-4">
                Real Project Photos Needed
              </h2>
              <p className="text-muted-foreground font-body mb-6">
                The gallery above shows real Highlander roofing projects. To deepen local proof and expand across both divisions, please send approved photos and details for the following:
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-foreground/85 font-body mb-6">
                {[
                  "Roofing project photos (Franklin, Highlands, Cashiers, Sylva)",
                  "Construction project photos (additions, renovations, custom builds)",
                  "Before / after pairs (same angle, clearly labeled)",
                  "Outdoor living photos (decks, porches, sunrooms, outdoor kitchens)",
                  "Storm damage repair / insurance work examples",
                  "Commercial roofing project photos",
                  "In-house crew on the job (safety gear visible)",
                  "Branded Highlander trucks, signage, and office photos",
                  "Charity / community event photos (with consent)",
                  "Rotary affiliation photo or logo (if approved for display)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highland-gold))] mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="font-heading font-bold text-foreground mb-2">For each project, please include:</p>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-foreground/80 font-body mb-6">
                {[
                  "Project type and materials used",
                  "Town or service area",
                  "Short description of the work",
                  "Problem solved (leak, storm, full replacement, etc.)",
                  "Approximate scope (sq ft, duration)",
                  "Homeowner permission to publish",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/60 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground italic">
                Until approved photos are provided, stock-style or generic mountain imagery on supporting pages will be flagged for replacement with real Highlander assets.
              </p>
            </div>
          </div>
        </section>
      </main>

      <PremiumLightbox
        projects={projects}
        currentIndex={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={handleLightboxNav}
      />

      <PageCloseCTA eyebrow="Next Step" heading="Want work like this on your home?" body="Share a few details about your property and a Highlander advisor will follow up with scope, materials, and timing." secondaryLabel="Explore our roofing services" secondaryTo="/roofing" context="gallery" />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Gallery;
