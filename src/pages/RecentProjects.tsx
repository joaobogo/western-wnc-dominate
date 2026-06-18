import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Home, HardHat, Wrench, Trees, Ruler, Droplets, MapPin } from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import heroImg from "@/assets/gallery/asphalt-hero.webp";
import roofingImg from "@/assets/gallery/asphalt-008.webp";
import repairImg from "@/assets/gallery/asphalt-003.jpg";
import metalImg from "@/assets/gallery/metal-005.webp";
import cedarImg from "@/assets/gallery/cedar-005.jpg";
import constructionImg from "@/assets/division-construction-v2.jpg";
import designImg from "@/assets/division-design.jpg";

declare global {
  interface Window {
    rwlPlugin?: { init: (host: string, key: string) => void };
  }
}

const categoryCards = [
  { icon: Home, title: "Roofing", desc: "Shingle, metal, and cedar roofing systems built for steep mountain rooflines.", img: roofingImg, href: "/roofing" },
  { icon: Wrench, title: "Roof Repairs", desc: "Storm response, leak repair, and detail work that protects your home long-term.", img: repairImg, href: "/roof-repair" },
  { icon: HardHat, title: "Construction", desc: "Additions, renovations, and full-scope building from a licensed general contractor.", img: constructionImg, href: "/construction" },
  { icon: Droplets, title: "Gutters", desc: "Seamless gutters and exterior water management built for WNC weather patterns.", img: metalImg, href: "/exterior-improvements" },
  { icon: Trees, title: "Outdoor Living", desc: "Porches, decks, pergolas, and outdoor spaces designed for mountain terrain.", img: cedarImg, href: "/outdoor-living" },
  { icon: Ruler, title: "Design Services", desc: "Pre-construction layout and planning support before the first board is cut.", img: designImg, href: "/layouts-planning" },
];

const pathCards = [
  { q: "Need roofing help?", href: "/roofing", cta: "Explore Roofing" },
  { q: "Planning a construction project?", href: "/construction", cta: "Explore Construction" },
  { q: "Need gutters or exterior protection?", href: "/exterior-improvements", cta: "View Exterior Services" },
  { q: "Improving outdoor living space?", href: "/outdoor-living", cta: "View Outdoor Living" },
  { q: "Not sure where to start?", href: "/contact", cta: "Talk to Highlander" },
];

const RecentProjects = () => {
  useEffect(() => {
    if (window.rwlPlugin && typeof window.rwlPlugin.init === "function") {
      try {
        window.rwlPlugin.init("https://app.realworklabs.com", "SxCxaBpYsO_fVnK0");
      } catch {
        /* no-op */
      }
    }
  }, []);

  return (
    <>
      <SEOHead
        title="Recent Projects | Highlander Roofing Services"
        description="See recent Highlander Roofing Services projects and service updates across Franklin, Highlands, Cashiers, Sylva, and Western North Carolina."
        path="/recent-projects"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Recent Projects", url: "/recent-projects" },
        ])}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-[hsl(var(--highland-green))] text-white overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Highlander roofing project in Western North Carolina" className="w-full h-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--highland-green))]/95 via-[hsl(var(--highland-green))]/85 to-[hsl(var(--highland-green))]/95" />
          </div>
          <div className="container-tight relative py-20 md:py-28">
            <p className="text-[hsl(var(--highland-gold))] font-bold text-xs uppercase tracking-[0.25em] mb-4">
              Project Activity · Western North Carolina
            </p>
            <h1 className="text-display-md md:text-display-lg font-heading font-bold mb-6 leading-[1.05] tracking-tightest">
              Recent Projects
            </h1>
            <p className="text-body-lg md:text-body-xl text-white/85 max-w-3xl leading-relaxed font-medium mb-8">
              See how Highlander Roofing Services helps homeowners and property owners across
              Franklin, Highlands, Cashiers, Sylva, and Western North Carolina protect, improve,
              and plan their properties through roofing, construction, gutters, outdoor living,
              and design-led construction support.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact" className="cta-gradient text-accent-foreground font-semibold text-sm px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                Request a Free Estimate <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/services" className="border border-white/30 text-white font-semibold text-sm px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                Explore Our Services
              </Link>
            </div>
          </div>
        </section>

        {/* Section 1: Service categories */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-tight">
            <div className="max-w-3xl mb-12">
              <p className="text-[hsl(var(--highland-gold))] font-bold text-xs uppercase tracking-[0.25em] mb-4">What We Build</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-tight">
                Built for Mountain Homes, Weather, and Real-World Conditions
              </h2>
              <p className="text-foreground/75 text-lg leading-relaxed">
                From steep rooflines and storm repairs to additions, gutters, porches, and outdoor living
                spaces, Highlander's work is shaped by the homes, terrain, and weather patterns of
                Western North Carolina.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categoryCards.map((card) => (
                <Link key={card.title} to={card.href} className="group bg-card border border-border hover:border-[hsl(var(--highland-gold))]/40 rounded-sm overflow-hidden transition-all card-lift">
                  <div className="aspect-[4/3] overflow-hidden bg-secondary">
                    <img src={card.img} alt={`${card.title} — Highlander Roofing Services`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 bg-[hsl(var(--highland-green))]/10 flex items-center justify-center rounded-sm">
                        <card.icon className="w-4 h-4 text-[hsl(var(--highland-green))]" />
                      </div>
                      <h3 className="text-lg font-heading font-bold text-foreground">{card.title}</h3>
                    </div>
                    <p className="text-sm text-foreground/70 leading-relaxed mb-4">{card.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--highland-green))] group-hover:gap-2.5 transition-all">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: RealWork widget */}
        <section className="py-16 md:py-24 bg-secondary/40 border-y border-border/60">
          <div className="container-tight">
            <div className="max-w-3xl mb-10">
              <p className="text-[hsl(var(--highland-gold))] font-bold text-xs uppercase tracking-[0.25em] mb-4">Live Project Feed</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-tight">
                Recent Project Updates
              </h2>
              <p className="text-foreground/75 text-lg leading-relaxed">
                Browse recent Highlander project activity from across Western North Carolina.
                This feed may update as new roofing, construction, gutter, and exterior projects are added.
              </p>
            </div>
            <div className="bg-background border border-border rounded-sm p-6 md:p-8">
              <div id="rwl-output" className="min-h-[400px] w-full" />
              <div className="mt-6 pt-6 border-t border-border/60">
                <p className="text-sm text-foreground/60 font-body mb-4">
                  Recent project updates are loading. If the feed does not appear, please refresh
                  the page or contact Highlander directly to discuss your roofing, construction,
                  gutter, or outdoor living project.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--highland-green))] hover:gap-3 transition-all">
                  Request a Free Estimate <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Path cards */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-tight">
            <div className="max-w-3xl mb-12">
              <p className="text-[hsl(var(--highland-gold))] font-bold text-xs uppercase tracking-[0.25em] mb-4">Find Your Path</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-tight">
                What Project Type Are You Planning?
              </h2>
              <p className="text-foreground/75 text-lg leading-relaxed">
                Tell us roughly what you're trying to solve and we'll route you to the right Highlander team.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pathCards.map((p) => (
                <Link key={p.q} to={p.href} className="group bg-card border border-border hover:border-[hsl(var(--highland-green))]/40 rounded-sm p-6 transition-all card-lift flex flex-col justify-between">
                  <h3 className="text-base font-heading font-bold text-foreground mb-4 leading-snug">{p.q}</h3>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--highland-green))] group-hover:gap-2.5 transition-all">
                    {p.cta} <ArrowRight className="w-3.5 h-3.5" />
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
              <div className="flex items-center gap-2 text-[hsl(var(--highland-gold))] font-bold text-xs uppercase tracking-[0.25em] mb-4">
                <MapPin className="w-3.5 h-3.5" /> Service Areas
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-tight">
                Serving Franklin, Highlands, Cashiers, Sylva, and Western North Carolina
              </h2>
              <p className="text-foreground/75 text-lg leading-relaxed mb-8">
                Highlander serves homeowners across Western North Carolina with roofing, construction,
                gutter, and exterior services built for mountain communities.
              </p>
              <Link to="/service-areas" className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--highland-green))] hover:gap-3 transition-all">
                View All Service Areas <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[hsl(var(--highland-green))] text-white">
          <div className="container-tight py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Ready to Talk About Your Project?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Tell Highlander what you are planning, where the property is located, and what kind of help
              you need. Our team will help you determine the right next step.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="cta-gradient text-accent-foreground font-semibold text-sm px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                Request a Free Estimate <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+18285247773" className="border border-white/30 text-white font-semibold text-sm px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                <Phone className="w-4 h-4" /> 828-524-7773
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default RecentProjects;