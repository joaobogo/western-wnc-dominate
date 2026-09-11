import { Fragment, useMemo, useState } from "react";
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
import heroImg from "@/assets/gallery/asphalt-hero.webp";
import roofingImg from "@/assets/gallery/asphalt-008.webp";
import repairImg from "@/assets/gallery/asphalt-003.webp";
import metalImg from "@/assets/gallery/metal-005.webp";
import cedarImg from "@/assets/gallery/cedar-005.webp";
import constructionImg from "@/assets/division-construction-v2.webp";
import designImg from "@/assets/division-design.webp";
import metal005 from "@/assets/gallery/metal-005.webp";
import metal006 from "@/assets/gallery/metal-006.webp";
import metal008 from "@/assets/gallery/metal-008.webp";
import metal003 from "@/assets/gallery/metal-003.webp";
import asphalt008 from "@/assets/gallery/asphalt-008.webp";
import asphalt007 from "@/assets/gallery/asphalt-007.webp";
import asphalt006 from "@/assets/gallery/asphalt-006.webp";
import asphaltHero from "@/assets/gallery/asphalt-hero.webp";
import asphalt002 from "@/assets/gallery/asphalt-002.webp";
import cedar005 from "@/assets/gallery/cedar-005.webp";

const categoryCards = [
  { icon: Home, title: "Roofing", desc: "Shingle, metal, and cedar roofing systems built for steep mountain rooflines.", img: roofingImg, href: "/roofing" },
  { icon: Wrench, title: "Roof Repairs", desc: "Storm response, leak repair, and detail work that protects your home long-term.", img: repairImg, href: "/roofing/roof-repair" },
  { icon: HardHat, title: "Construction", desc: "Additions, renovations, and full-scope building from a licensed general contractor.", img: constructionImg, href: "/construction" },
  { icon: Droplets, title: "Gutters", desc: "Seamless gutters and exterior water management built for WNC weather patterns.", img: metalImg, href: "/exterior-improvements" },
  { icon: Trees, title: "Outdoor Living", desc: "Porches, decks, pergolas, and outdoor spaces designed for mountain terrain.", img: cedarImg, href: "/construction/outdoor-living" },
  { icon: Ruler, title: "Design Services", desc: "Pre-construction layout and planning support before the first board is cut.", img: designImg, href: "/layouts-planning" },
];

const pathCards = [
  { q: "Need roofing help?", href: "/roofing", cta: "Explore Roofing" },
  { q: "Planning a construction project?", href: "/construction", cta: "Explore Construction" },
  { q: "Need gutters or exterior protection?", href: "/exterior-improvements", cta: "View Exterior Services" },
  { q: "Improving outdoor living space?", href: "/construction/outdoor-living", cta: "View Outdoor Living" },
  { q: "Not sure where to start?", href: "/contact", cta: "Talk to Highlander" },
];

const completedProjects = [
  { title: "Standing Seam Metal — Dark Bronze", type: "Metal Roofing", description: "Complex multi-gable standing seam metal roof in dark bronze. Precision panel work on steep pitches with custom trim detailing and concealed fastener system throughout.", image: metal005, location: "Highlands, NC", scope: "3,200 sq ft roof replacement", duration: "8 days", slug: "standing-seam-metal-dark-bronze-highlands" },
  { title: "CertainTeed Landmark — Weathered Wood", type: "Asphalt Shingles", description: "CertainTeed Landmark shingles on a multi-level mountain home with screen porch. Premium materials installed by ShingleMaster Credentialed Contractor certified crew.", image: asphaltHero, location: "Waynesville, NC", scope: "4,100 sq ft roof replacement", duration: "4 days", slug: "certainteed-landmark-weathered-wood-waynesville" },
  { title: "Cedar Shake — Estate Home", type: "Cedar Shake", description: "Stunning cedar shake roof on a luxury estate in Highlands. Intricate multi-gable design with copper ridge accents. Hand-selected premium cedar with natural preservative treatment.", image: cedar005, location: "Highlands, NC", scope: "Premium cedar shake installation", duration: "14 days", slug: "cedar-shake-estate-highlands" },
  { title: "Standing Seam Metal — Mountain Cabin", type: "Metal Roofing", description: "Green standing seam metal on a log cabin nestled in the WNC mountains. Engineered for decades of snow load, wind exposure, and UV at 4,200 feet elevation.", image: metal006, location: "Cashiers, NC", scope: "Full roof replacement", duration: "6 days" },
  { title: "Asphalt & Metal Combo — Highlands Estate", type: "Mixed Materials", description: "Craftsman mountain home featuring dimensional shingles with standing seam metal accent roofing and natural stone exterior accents. Dual-material design for maximum curb appeal.", image: asphalt007, location: "Highlands, NC", scope: "Dual-material roof system", duration: "10 days" },
  { title: "Metal Panel — Silver", type: "Metal Roofing", description: "Clean silver metal panel installation with complex hip-and-valley geometry. Every intersection precision-cut and sealed for permanent weather protection.", image: metal008, location: "Franklin, NC", scope: "2,800 sq ft re-roof", duration: "7 days" },
  { title: "Dimensional Shingles — Slate Gray", type: "Asphalt Shingles", description: "Aerial drone view of a large residential shingle replacement in slate gray with complex roof intersections. Every valley and ridge executed to manufacturer specifications.", image: asphalt006, location: "Franklin, NC", scope: "3,500 sq ft complex roof", duration: "5 days" },
  { title: "Dimensional Shingles — Brown", type: "Asphalt Shingles", description: "Full dimensional shingle roof replacement with clean hip-and-ridge lines on a residential property. Ventilation upgraded during installation for improved attic performance.", image: asphalt008, location: "Bryson City, NC", scope: "Complete re-roof + ventilation", duration: "4 days" },
  { title: "Metal Roof — Rural Home", type: "Metal Roofing", description: "Brown metal panel installation on a brick home in the WNC countryside. Material selected for longevity and visual harmony with the surrounding mountain landscape.", image: metal003, location: "Sylva, NC", scope: "Full roof replacement", duration: "5 days" },
  { title: "Dimensional Shingles — Hunter Green", type: "Asphalt Shingles", description: "Bird's-eye view of a large complex residential roof with hunter green dimensional shingles. Precision work on multiple dormers and valleys.", image: asphalt002, location: "Macon County, NC", scope: "5,200 sq ft multi-dormer roof", duration: "6 days" },
];

const RecentProjects = () => {
  const materialFilters = useMemo(
    () => ["All Work", ...Array.from(new Set(completedProjects.map((p) => p.type)))],
    [],
  );
  const [material, setMaterial] = useState("All Work");
  const visibleProjects = completedProjects.filter(
    (p) => material === "All Work" || p.type === material,
  );

  return (
    <>
      <SEOHead
        title="Recent Projects | Highlander Building Services"
        description="See recent Highlander Building Services projects and service updates across Franklin, Highlands, Cashiers, Sylva, and Western North Carolina."
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
            <img width={1600} height={900} loading="eager" decoding="async"
              src={heroImg}
              alt="Standing seam metal roof on a mountain home built by Highlander Building Services in Western North Carolina"
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
              <Link to="/contact" className="btn btn-primary btn-md">
                Get My Written Estimate <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link to="/roofing" className="btn btn-secondary btn-md">
                Explore Our Services
              </Link>
            </div>
          </div>
        </section>

        {/* Section 1: Service categories */}
        <section className="py-16 md:py-24 bg-background">
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
                    <img
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
                      See This Project <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1b: Completed Project Portfolio */}
        <section className="py-16 md:py-24 bg-background border-t border-border/60">
          <div className="container-tight">
            <div className="max-w-3xl mb-12">
              <p className="text-[hsl(var(--gold-ink))] font-bold text-xs uppercase tracking-[0.25em] mb-4">
                Completed Project Portfolio
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-tight">
                Real WNC Homes. Real Highlander Work.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                These aren't stock photos. Every image below represents a real Western North Carolina
                home we've protected — across metal, shingle, cedar shake, and mixed-material roofing systems.
              </p>
            </div>

            {/* Filter bar */}
            <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter projects by work type">
              {materialFilters.map((m) => (
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
                secondaryAction={{ label: "Get my written estimate", to: "/contact" }}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {visibleProjects.map((p, i) => {
                const closesTriplet = (i + 1) % 3 === 0 && i !== visibleProjects.length - 1;
                // Masonry rhythm: every 5th tile runs wide with a 16:9 crop.
                const wide = i % 5 === 0;
                const CardInner = (
                  <>
                    <div className={`overflow-hidden bg-secondary relative ${wide ? "aspect-[16/9]" : "aspect-project"}`}>
                      <img
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
                      {/* Hover reveal — scope and location over the image */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-5 text-center bg-[hsl(var(--heritage-charcoal)/0.62)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500">
                        <span className="text-caption font-body font-bold uppercase tracking-[0.2em] text-[hsl(var(--gold-ink))] flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" aria-hidden="true" /> {p.location}
                        </span>
                        <span className="text-white font-heading font-bold text-base md:text-lg leading-snug flex items-center gap-2">
                          <Ruler className="w-4 h-4 opacity-80" aria-hidden="true" /> {p.scope}
                        </span>
                        <span className="text-white/80 text-caption font-body uppercase tracking-[0.18em] flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" aria-hidden="true" /> {p.duration}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-base font-heading font-bold text-foreground mb-2 leading-snug group-hover:text-[hsl(var(--heritage-green))] transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {p.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground font-body">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" aria-hidden="true" /> {p.location}</span>
                        <span className="flex items-center gap-1"><Ruler className="w-4 h-4" aria-hidden="true" /> {p.scope}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" aria-hidden="true" /> {p.duration}</span>
                      </div>
                    </div>
                  </>
                );

                return (
                  <Fragment key={p.title}>
                    {p.slug ? (
                      <Link
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
                        className={`group bg-card border border-border hover:border-[hsl(var(--highland-gold))]/40 rounded-sm overflow-hidden transition-all card-lift block ${wide ? "md:col-span-2" : ""}`}
                      >
                        {CardInner}
                      </Link>
                    ) : (
                      <div className={`group bg-card border border-border rounded-sm overflow-hidden ${wide ? "md:col-span-2" : ""}`}>
                        {CardInner}
                      </div>
                    )}
                    {closesTriplet && (
                      <GalleryInlineCTA
                        position={Math.ceil((i + 1) / 3)}
                        towns={Array.from(
                          new Set(visibleProjects.slice(i - 2, i + 1).map((x) => x.location)),
                        )}
                      />
                    )}
                  </Fragment>
                );
              })}
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
      <PageCloseCTA eyebrow="Next Step" heading="Ready to start your own project?" body="Tell us about your property and a Highlander advisor will follow up with scope, materials, and timing." secondaryLabel="Read homeowner reviews" secondaryTo="/reviews" context="recent-projects" />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default RecentProjects;