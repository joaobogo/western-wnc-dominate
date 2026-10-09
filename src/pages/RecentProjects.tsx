import { useState } from "react";
import GalleryImage from "@/components/media/GalleryImage";
import WorkGallery from "@/components/gallery/WorkGallery";
import { Link } from "react-router-dom";
import { ArrowRight, Home, HardHat, Wrench, Trees, Ruler, Droplets, MapPin, Calendar, ImageOff } from "lucide-react";
import EmptyState from "@/components/states/EmptyState";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import RealWorkWidget from "@/components/RealWorkWidget";
import PageCloseCTA from "@/components/PageCloseCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import GalleryInlineCTA from "@/components/projects/GalleryInlineCTA";
import { trackGalleryProjectOpen } from "@/lib/gtm";
import { projectDetails } from "@/data/projects";
// Hero, tiles and project cards each use a different photo, so nothing repeats on this page.
import heroImg from "@/assets/work/roof-charcoal-garage-mountains.webp";
// Close-up detail shots that look too similar to wider photos in the same grid
// (they appear on the Roof Repair page instead).
import copperDormerDetail from "@/assets/work/roof-copper-dormer-detail.webp";
import chimneyDetail from "@/assets/work/roof-chimney-flashing-detail.webp";
import charcoalHip from "@/assets/work/roof-charcoal-hip-detail.webp";
import roofingImg from "@/assets/gallery/asphalt-008.webp";
import repairImg from "@/assets/gallery/asphalt-003.webp";
import guttersImg from "@/assets/gallery/gutters-002.jpg";
import constructionImg from "@/assets/division-construction-v2.webp";
import designImg from "@/assets/division-design.webp";

const outdoorImg = "/media/9860ca9e-outdoor-living-cashiers.webp";

const categoryCards = [
  { icon: Home, title: "Roofing", desc: "Shingle, metal, and cedar roofing systems built for steep mountain rooflines.", img: roofingImg, href: "/roofing" },
  { icon: Wrench, title: "Roof Repairs", desc: "Leak repair, storm-damage assessment, and detail work scoped for the roof condition.", img: repairImg, href: "/roofing/roof-repair" },
  { icon: HardHat, title: "Construction", desc: "Additions, renovations, and full-scope building from a licensed general contractor.", img: constructionImg, href: "/construction" },
  { icon: Droplets, title: "Gutters", desc: "Seamless gutters and exterior water management built for WNC weather patterns.", img: guttersImg, href: "/roofing/gutters" },
  { icon: Trees, title: "Outdoor Living", desc: "Porches, decks, pergolas, and outdoor spaces designed for mountain terrain.", img: outdoorImg, href: "/construction/outdoor-living" },
  { icon: Ruler, title: "Design Services", desc: "Pre-construction layout and planning support before the first board is cut.", img: designImg, href: "/construction/design" },
];

const pathCards = [
  { q: "Need roofing help?", href: "/roofing", cta: "Explore Roofing" },
  { q: "Planning a construction project?", href: "/construction", cta: "Explore Construction" },
  { q: "Need gutters or exterior protection?", href: "/exterior-improvements", cta: "View Exterior Services" },
  { q: "Improving outdoor living space?", href: "/construction/outdoor-living", cta: "View Outdoor Living" },
  { q: "Not sure where to start?", href: "/contact", cta: "Talk to Highlander" },
];

const CONSTRUCTION_TYPES = new Set(["Home Addition", "Deck Rebuild"]);

const completedProjects = projectDetails.map((project) => ({
  title: project.title,
  type: project.type,
  description: project.summary,
  image: project.heroImage,
  location: project.location,
  scope: project.scope,
  duration: project.duration,
  slug: project.slug,
  division: CONSTRUCTION_TYPES.has(project.type) ? "Construction" : "Roofing",
}));

// Projects split only by division, the same way the work gallery does.
const PROJECT_FILTERS = ["All Work", "Roofing", "Construction"] as const;

const RecentProjects = () => {
  const [material, setMaterial] = useState<(typeof PROJECT_FILTERS)[number]>("All Work");
  const visibleProjects = completedProjects.filter(
    (p) => material === "All Work" || p.division === material,
  );

  return (
    <>
      <SEOHead
        title="Highlander Project Gallery in Western NC"
        description="See documented Highlander roofing case studies and recent project activity across Western North Carolina, with the scope and location of each job."
        path="/recent-projects"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Recent Projects", url: "/recent-projects" },
        ])}
      />
      <Header />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Recent Projects", url: "/recent-projects" }]} />
      <main id="main-content">
        {/* Hero */}
        <section className="relative bg-secondary text-foreground overflow-hidden border-b border-border">
          <div className="absolute inset-0">
            <GalleryImage width={1600} height={900} loading="eager" decoding="async" sizes="100vw"
              src={heroImg}
              alt="Charcoal dimensional shingle roof with dormers by Highlander Building Services, overlooking the Western North Carolina mountains"
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/75 to-secondary/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-secondary/60" />
          </div>
          <div className="container-tight relative hero-clears-header pb-14 md:pb-20 pt-8 md:pt-12">
            <p className="text-[hsl(var(--gold-ink))] font-bold text-xs uppercase tracking-[0.25em] mb-4">
              Project Activity · Western North Carolina
            </p>
            <h1 className="text-display-md md:text-display-lg font-heading font-bold text-[hsl(var(--heritage-green))] mb-6 leading-[1.05] tracking-tightest">
              Recent Projects
            </h1>
            <p className="text-body-lg md:text-body-xl text-foreground/85 max-w-3xl leading-relaxed font-medium mb-6">
              See how Highlander Building Services helps homeowners and property owners across
              Franklin, Highlands, Cashiers, Sylva, and Western North Carolina protect, improve,
              and plan their properties through roofing, construction, gutters, outdoor living,
              and design-led construction support.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link to="/request-inspection" className="btn btn-primary btn-md">
                Get My Written Estimate <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link to="/roofing" className="btn btn-secondary btn-md">
                Explore Our Services
              </Link>
            </div>
          </div>
        </section>

        {/* Completed project portfolio — first thing after the hero */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-tight">
            <div className="max-w-3xl mb-12">
              <p className="text-[hsl(var(--gold-ink))] font-bold text-xs uppercase tracking-[0.25em] mb-4">
                Completed Project Portfolio
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-tight">
                Real WNC Homes. Real Highlander Work.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Each case study below is backed by a project-detail record with a location, scope, materials, and documented project narrative.
              </p>
            </div>

            {/* Filter bar */}
            <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter projects by work type">
              {PROJECT_FILTERS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMaterial(m)}
                  aria-pressed={material === m}
                  className={`text-caption font-body font-bold uppercase tracking-[0.18em] px-4 py-2.5 border rounded-sm transition-colors duration-300 min-h-[44px] ${
                    material === m
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-background border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {visibleProjects.length === 0 && (
              <EmptyState
                icon={ImageOff}
                title="No projects in this category yet"
                description="We photograph work as crews wrap up, so this filter will fill in. In the meantime, see all completed work or tell us about your own project."
                primaryAction={{ label: "See all work", onClick: () => setMaterial("All Work") }}
                secondaryAction={{ label: "Get my written estimate", to: "/request-inspection" }}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProjects.map((p, i) => (
                <Link
                  key={p.title}
                  to={`/projects/${p.slug}`}
                  onClick={() =>
                    trackGalleryProjectOpen({
                      gallery: "recent_projects",
                      project_title: p.title,
                      project_location: p.location,
                      project_category: p.type,
                      position: i,
                    })
                  }
                  className="group bg-card border border-border hover:border-[hsl(var(--highland-gold))]/40 rounded-sm overflow-hidden transition-all card-lift flex flex-col"
                >
                  <div className="overflow-hidden bg-secondary relative aspect-[4/3]">
                    <GalleryImage
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      src={p.image}
                      alt={`${p.title} — ${p.location}`}
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 text-caption font-body font-bold uppercase tracking-[0.15em] bg-white/90 text-[hsl(var(--heritage-green))] px-2.5 py-1 rounded-sm">
                      {p.type}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-base font-heading font-bold text-foreground mb-2 leading-snug group-hover:text-[hsl(var(--heritage-green))] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                      {p.description}
                    </p>
                    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground font-body">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" aria-hidden="true" /> {p.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" aria-hidden="true" /> {p.duration}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {visibleProjects.length > 0 && (
              <GalleryInlineCTA
                className="mt-10"
                position={1}
                towns={Array.from(new Set(visibleProjects.map((x) => x.location)))}
              />
            )}
          </div>
        </section>

        {/* Section 1c: Work gallery — roofing and construction photography */}
        <section className="py-16 md:py-24 bg-secondary/40 border-t border-border/60" aria-labelledby="work-gallery-heading">
          <div className="container-tight">
            <div className="max-w-3xl mb-10">
              <p className="text-[hsl(var(--gold-ink))] font-bold text-xs uppercase tracking-[0.25em] mb-4">Work Gallery</p>
              <h2 id="work-gallery-heading" className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-tight">
                Roofs and Builds Across the Mountains.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Photos from Highlander roofing and construction jobs. Tap any photo to see it full size.
              </p>
            </div>
            <WorkGallery
              layout="grid"
              excludeImages={[heroImg, copperDormerDetail, chimneyDetail, charcoalHip, ...completedProjects.map((p) => p.image)]}
            />
          </div>
        </section>

        {/* Services — after the real work */}
        <section className="py-16 md:py-24 bg-background border-t border-border/60">
          <div className="container-tight">
            <div className="max-w-3xl mb-12">
              <p className="text-[hsl(var(--gold-ink))] font-bold text-xs uppercase tracking-[0.25em] mb-4">What We Build</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-tight">
                Built for Mountain Homes, Weather, and Real-World Conditions
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                From steep rooflines and storm repairs to additions, gutters, porches, and outdoor living
                spaces, Highlander's work is shaped by the homes, terrain, and weather patterns of
                Western North Carolina.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categoryCards.map((card) => (
                <Link key={card.title} to={card.href} className="group bg-card border border-border hover:border-[hsl(var(--highland-gold))]/40 rounded-sm overflow-hidden transition-all card-lift">
                  <div className="aspect-project overflow-hidden bg-secondary">
                    <GalleryImage
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      src={card.img}
                      alt={`${card.title} — Highlander Building Services`}
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 bg-[hsl(var(--heritage-green))]/10 flex items-center justify-center rounded-sm">
                        <card.icon className="w-4 h-4 text-[hsl(var(--heritage-green))]" />
                      </div>
                      <h3 className="text-lg font-heading font-bold text-foreground">{card.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{card.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--heritage-green))] group-hover:gap-2.5 transition-all">
                      Explore Service <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* RealWork Labs — Recent Project Updates (vendor widget target: #rwl-output) */}
        <RealWorkWidget />

        <section className="py-16 md:py-24 bg-background">
          <div className="container-tight">
            <div className="max-w-3xl mb-12">
              <p className="text-[hsl(var(--gold-ink))] font-bold text-xs uppercase tracking-[0.25em] mb-4">Find Your Path</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-tight">
                What Project Type Are You Planning?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Tell us roughly what you're trying to solve and we'll route you to the right Highlander team.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pathCards.map((p) => (
                <Link key={p.q} to={p.href} className="group bg-card border border-border hover:border-[hsl(var(--heritage-green))]/40 rounded-sm p-6 transition-all card-lift flex flex-col justify-between">
                  <h3 className="text-base font-heading font-bold text-foreground mb-4 leading-snug">{p.q}</h3>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--heritage-green))] group-hover:gap-2.5 transition-all">
                    {p.cta} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Service Areas */}
        <section className="py-16 md:py-20 bg-secondary/40">
          <div className="container-tight">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-[hsl(var(--gold-ink))] font-bold text-xs uppercase tracking-[0.25em] mb-4">
                <MapPin className="w-4 h-4" aria-hidden="true" /> Service Areas
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-tight">
                Serving Franklin, Highlands, Cashiers, Sylva, and Western North Carolina
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Highlander serves homeowners across Western North Carolina with roofing, construction,
                gutter, and exterior services built for mountain communities.
              </p>
              <Link to="/service-areas" className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--heritage-green))] hover:gap-3 transition-all">
                View All Service Areas <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PageCloseCTA eyebrow="Next Step" heading="Ready to start your own project?" body="Tell us about your property and Highlander will discuss the next step, then document the applicable scope and estimate before work is authorized." secondaryLabel="Read homeowner reviews" secondaryTo="/reviews" context="recent-projects" />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default RecentProjects;