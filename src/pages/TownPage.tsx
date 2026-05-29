import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, Phone, CheckCircle, MapPin, Wind, CloudRain, Mountain, 
  Home, HardHat, BookOpen, Shield, Star, Hammer, RotateCcw, 
  CloudLightning, Layers, TreePine, Paintbrush, Building, Wrench, Droplets,
  Building2, Users, Compass, ArrowUpRight, Camera
} from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";
import TownProofBlock from "@/components/TownProofBlock";
import BuilderPromoBlock from "@/components/builder/BuilderPromoBlock";
import { getTownBySlug, towns } from "@/data/towns";
import { getTownProofContent } from "@/data/town-proof";
const marketVisualImg = "https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=1200"; // Mountain valley
const localPlanningImg = "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1200"; // Blueprints
const highElevationDetailImg = "https://images.unsplash.com/photo-1626264290769-61d0d3a8301f?auto=format&fit=crop&q=80&w=1200"; // Wood detail
const mountainStructureImg = "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&q=80&w=1200"; // Mountain structure

import { services } from "@/data/services";
import { localBlogTopics } from "@/data/local-blog-topics";
import { blogPosts } from "@/data/blogs";
import { projectDetails } from "@/data/projects";
import logo from "@/assets/logo.png";

const TownPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const town = getTownBySlug(slug || "");

  if (!town) {
    return (
      <>
        <SEOHead
          title="Service Area Not Found | Highlander Roofing"
          description="The requested service area was not found. Browse all Western North Carolina locations we serve."
          path={`/service-areas/${slug || ""}`}
          noindex
        />
        <Header />
        <main className="section-padding text-center pt-32">
          <h1 className="text-3xl font-heading font-bold text-foreground">Town Not Found</h1>
          <Link to="/service-areas" className="text-primary underline mt-4 inline-block">View All Service Areas</Link>
        </main>
        <Footer />
      </>
    );
  }

  const otherTowns = towns.filter(t => t.slug !== slug).slice(0, 4);
  const townProof = getTownProofContent(town.slug);
  const schemaFaqs = townProof?.faqs ?? [];
  const localBlogs = localBlogTopics.find(bt => bt.townSlug === town.slug)?.topics || [];
  const existingBlogs = blogPosts.filter(b => b.town === town.name).slice(0, 3);

  // Group services by division for the dual-path display
  const roofingServices = services.filter(s => s.division === 'roofing').slice(0, 4);
  const constructionServices = services.filter(s => s.division === 'construction').slice(0, 4);

  return (
    <>
      <SEOHead
        title={town.metaTitle}
        description={town.metaDescription}
        path={`/service-areas/${town.slug}`}
        jsonLd={buildPageSchema({
          type: "town",
          town: {
            name: town.name,
            slug: town.slug,
            county: town.county,
            state: town.state,
            description: town.description,
          },
          faqs: schemaFaqs,
        })}
      />
      <Header />
      <main>
        {/* 1. Localized Hero — High Impact, Catch Attention Immediately */}
        <section className="relative min-h-[90svh] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={town.heroImage} 
              alt={`${town.name}, NC mountain roofing and construction context`}
              className="w-full h-full object-cover"
            />
            {/* Optimized overlays for contrast and readability */}
            <div className="absolute inset-0 bg-black/40 md:bg-transparent md:bg-gradient-to-r md:from-black/70 md:via-black/30 md:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            
            {/* Heritage Tartan Accent — Restrained and Subtle */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "300px auto" }} />
          </div>

          <div className="container-tight relative z-10 px-6 md:px-10 lg:px-20 py-24 w-full">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-10 md:h-12 w-1 bg-[hsl(var(--highland-gold))]" />
              <div className="flex flex-col">
                <span className="text-[16px] md:text-[18px] font-heading font-bold text-white tracking-[0.15em] uppercase">Highlander Roofing & Construction</span>
                <span className="text-[10px] md:text-[11px] font-body font-bold text-[hsl(var(--highland-gold))] uppercase tracking-[0.3em]">Official {town.name} Division</span>
              </div>
            </motion.div>

            <div className="max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="text-display-lg md:text-display-xl font-heading font-bold mb-6 text-white tracking-tightest leading-[0.9] drop-shadow-lg">
                  Built for the <br />
                  <span className="text-[hsl(var(--highland-gold))]">{town.name} Peaks.</span>
                </h1>

                <p className="text-lg md:text-2xl text-white/95 mb-10 max-w-2xl leading-relaxed font-body font-medium drop-shadow-md">
                  Premium roofing authority and residential construction for {town.name} homeowners. We combine hometown standards with master-class craftsmanship built for the actual physics of the WNC plateau.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                  <Link to="/consultation" className="cta-gradient text-accent-foreground font-heading font-bold text-[15px] px-10 py-5 rounded-none inline-flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 tracking-wide shadow-2xl border border-[hsl(var(--highland-gold)/0.4)]">
                    Start a {town.name} Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                  <a href="tel:8283979211" className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-[15px] px-10 py-5 rounded-none inline-flex items-center justify-center gap-3 hover:bg-white/20 hover:border-white/30 transition-all duration-300 shadow-xl">
                    <Phone className="w-4 h-4 text-[hsl(var(--highland-gold))]" /> (828) 397-9211
                  </a>
                </div>

                <div className="mt-12 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--highland-gold))]" />
                    <span className="text-[11px] md:text-[12px] font-bold text-white/80 uppercase tracking-widest">Licensed GC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--highland-gold))]" />
                    <span className="text-[11px] md:text-[12px] font-bold text-white/80 uppercase tracking-widest">4.9★ Google Rating</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Trust bar inside hero — Balanced for all devices */}
          <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/40 backdrop-blur-lg">
            <div className="container-tight px-4 sm:px-6 py-4 md:py-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {[
                  { icon: Mountain, label: "Peak Elevation", value: town.elevation },
                  { icon: CloudLightning, label: "Storm Ready", value: "Class 4 Rated" },
                  { icon: Shield, label: "Credential", value: "Licensed GC" },
                  { icon: Star, label: "Local Trust", value: "4.9★ Rated" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[11px] md:text-[12px] uppercase tracking-widest text-white/60 font-bold mb-1 md:mb-1.5">{stat.label}</span>
                    <span className="text-base md:text-lg font-heading font-bold text-white flex items-center gap-2 md:gap-3">
                      <stat.icon className="w-3.5 md:w-4 h-3.5 md:h-4 text-[hsl(var(--highland-gold))]" />
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Localized Authority Section — Detailed Market Insights */}
        <section className="py-24 bg-background border-b border-border relative overflow-hidden">
          {/* Subtle watermark background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto" }} />
          
          <div className="container-tight relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <span className="eyebrow mb-4 block">Regional Intelligence</span>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8 leading-tight">
                    More than a zip code. <br />
                    <span className="italic text-primary">A specific set of physics.</span>
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-10 font-body">
                    Western North Carolina roofing and construction aren't generic. In <span className="text-foreground font-bold">{town.name}</span>, we account for {town.climateExposure.toLowerCase()} which demands a higher caliber of material selection and installation discipline.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex gap-6 items-start group">
                      <div className="w-12 h-12 bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-foreground mb-2 text-lg uppercase tracking-wider">Local Insight</h4>
                        <p className="text-muted-foreground leading-relaxed font-body">{town.localVibe}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-6 items-start group">
                      <div className="w-12 h-12 bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <Wind className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-foreground mb-2 text-lg uppercase tracking-wider">Climate Exposure</h4>
                        <p className="text-muted-foreground leading-relaxed font-body">{town.climateExposure}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="relative">
                <div className="bg-secondary p-1 md:p-2 border border-border relative z-10">
                  <div className="bg-white p-8 md:p-12">
                    <h4 className="text-sm font-heading font-bold text-foreground mb-8 uppercase tracking-[0.3em] border-b border-border pb-6 flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
                      {town.name} Site Realities
                    </h4>
                    <ul className="space-y-8">
                      {[
                        { label: "Service Demand", value: town.serviceDemandMix.join(', ') },
                        { label: "Style Tendency", value: town.styleTendency },
                        { label: "Notable Areas", value: town.notableNeighborhoods.join(', ') }
                      ].map((item, i) => (
                        <li key={i} className="group">
                          <p className="text-[11px] md:text-[12px] font-bold text-[hsl(var(--highland-gold))] uppercase tracking-widest mb-1.5">{item.label}</p>
                          <p className="text-lg text-foreground font-heading font-bold leading-tight group-hover:text-primary transition-colors">{item.value}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-12 pt-8 border-t border-border">
                      <p className="text-sm font-body italic text-muted-foreground leading-relaxed">
                        "{town.marketAuthorityAngle}"
                      </p>
                    </div>
                  </div>
                </div>
                {/* Visual Accent */}
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* 3, 4 & 5. Roofing, Construction & Design Three-Pillar Section — Highly Visual */}
        <section className="section-padding bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto", backgroundRepeat: "repeat" }} />
          
          <div className="container-tight relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="eyebrow mb-4 block">Roofing · Construction · Design & Planning</span>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">Mastery across the <br className="hidden md:block" /> full project lifecycle.</h2>
              <p className="text-xl text-muted-foreground font-body leading-relaxed">
                In {town.name}, roofing, construction, and design aren't separate concerns. We treat the property as a single unified system — from initial layout to final inspection.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="flex flex-col h-full group/col">
                <div className="bg-primary p-8 md:p-12 text-white flex-1 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1635424710928-0544e8512eca?auto=format&fit=crop&q=80&w=1200" 
                    alt="Mountain roofing authority"
                    className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover/col:scale-105 transition-transform duration-[3s]"
                  />
                  {/* Subtle Pattern */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "200px auto" }} />
                  
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-white/10 flex items-center justify-center border border-white/20">
                        <Home className="w-6 h-6 text-[hsl(var(--highland-gold))]" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold uppercase tracking-tightest">Roofing Mastery</h3>
                    </div>

                    <p className="text-white/70 text-base md:text-lg mb-8 leading-relaxed font-body">
                      The primary defense for {town.name} homes. We specialize in high-elevation roof systems designed for {town.climateExposure.toLowerCase()}.
                    </p>

                    <div className="space-y-3 mb-10">
                      {[
                        { title: "Roof Replacement", href: "/services/roof-replacement", desc: "Full-system upgrades with mountain-rated materials." },
                        { title: "Metal Roofing", href: "/services/metal-roofing", desc: "Lifetime protection for ridgeline and forest lots." },
                        { title: "Roof Repair", href: "/services/roof-repair", desc: "Targeted leak detection and storm damage fixes." },
                        { title: "Brava / Synthetic", href: "/roofing/brava-synthetic", desc: "Luxury slate and shake aesthetics with composite durability." }
                      ].map((s) => (
                        <Link 
                          key={s.title} 
                          to={s.href}
                          className="group/item block p-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[hsl(var(--highland-gold)/0.4)] transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-heading font-bold text-sm tracking-wide">{s.title}</span>
                            <ArrowUpRight className="w-4 h-4 text-[hsl(var(--highland-gold)/0.5)] group-hover/item:text-[hsl(var(--highland-gold))] transition-colors" />
                          </div>
                          <p className="text-[12px] text-white/50 leading-tight">{s.desc}</p>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/10">
                      <Link to="/roofing" className="inline-flex items-center gap-3 text-[hsl(var(--highland-gold))] font-bold hover:gap-5 transition-all uppercase tracking-widest text-[11px]">
                        Explore Our Roofing Division <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col h-full group/col">
                <div className="bg-card p-8 md:p-12 border border-border flex-1 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                    alt="Mountain construction craftsmanship"
                    className="absolute inset-0 w-full h-full object-cover opacity-[0.03] group-hover/col:scale-105 transition-transform duration-[3s]"
                  />
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary/5 flex items-center justify-center border border-primary/10">
                        <Hammer className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold uppercase tracking-tightest">Residential Construction</h3>
                    </div>

                    <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed font-body">
                      {town.constructionContext} We build porches, additions, and outdoor spaces that expand your living footprint.
                    </p>

                    <div className="space-y-3 mb-10">
                      {[
                        { title: "Home Additions", href: "/construction/additions", desc: "Master suites, garage apartments, and footprint expansions." },
                        { title: "Outdoor Living", href: "/construction/outdoor-living", desc: "Custom decks, screened porches, and timber-frame pavilions." },
                        { title: "Mountain Porches", href: "/construction/outdoor-living", desc: "High-end screened enclosures for the WNC lifestyle." },
                        { title: "Fire Pits & Flatwork", href: "/construction", desc: "Functional stone spaces and scoped residential concrete." }
                      ].map((s) => (
                        <Link 
                          key={s.title} 
                          to={s.href}
                          className="group/item block p-4 bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-heading font-bold text-sm tracking-wide text-foreground">{s.title}</span>
                            <ArrowUpRight className="w-4 h-4 text-primary/30 group-hover/item:text-primary transition-colors" />
                          </div>
                          <p className="text-[12px] text-muted-foreground leading-tight">{s.desc}</p>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-auto pt-6 border-t border-border">
                      <Link to="/construction" className="inline-flex items-center gap-3 text-primary font-bold hover:gap-5 transition-all uppercase tracking-widest text-[11px]">
                        View Construction Services <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                  
                  {/* Decorative Construction Background Detail */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rotate-45 translate-x-16 translate-y-16" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Visual Details — Adding more mountain flavor */}
        <section className="py-20 md:py-32 bg-background relative overflow-hidden">
          <div className="container-tight">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <ScrollReveal variant="slide-right">
                <div className="relative aspect-[16/10] overflow-hidden border border-border group">
                  <img src={highElevationDetailImg} alt={`${town.name} high-elevation building detail`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:opacity-0 transition-opacity" />
                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 block mb-2">High-Altitude Detail</span>
                    <h4 className="text-white font-heading font-bold text-lg">Engineering for the Plateau</h4>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal variant="slide-left" delay={0.2}>
                <div className="relative aspect-[16/10] overflow-hidden border border-border group">
                  <img src={mountainStructureImg} alt={`${town.name} mountain structure detail`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:opacity-0 transition-opacity" />
                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 block mb-2">Structural Integrity</span>
                    <h4 className="text-white font-heading font-bold text-lg">Built for {town.elevation}</h4>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Local Design & Planning Bridge — Town-specific intelligence */}
        <section className="py-20 bg-background">
          <div className="container-tight">
            <div className="bg-secondary/40 border border-border p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 group/bridge relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              
              <div className="w-20 h-20 rounded-none bg-primary text-white flex items-center justify-center shrink-0 shadow-xl relative z-10">
                <Compass className="w-10 h-10" />
              </div>
              
              <div className="flex-1 text-center lg:text-left relative z-10">
                <h4 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Planning Your {town.name} Addition?</h4>
                <p className="text-lg text-muted-foreground leading-relaxed font-body max-w-2xl">
                  We provide localized Design & Planning support for {town.name} homeowners. From navigating {town.county} building codes to mountain-responsive layouts, we ensure your project is built with intention.
                </p>
              </div>
              
              <div className="shrink-0 relative z-10">
                <Link to="/layouts-planning" className="cta-gradient text-accent-foreground font-heading font-bold text-[14px] px-10 py-5 rounded-none inline-flex items-center gap-3 hover:scale-105 transition-all">
                  View Planning Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 5, 6 & 7. Proof, Special Consideration & FAQ */}
        {townProof ? (
          <div className="border-t border-border">
            <TownProofBlock 
              town={town} 
              content={townProof} 
            />
          </div>
        ) : null}

        {/* 10. Supporting content / local insights */}
        {(existingBlogs.length > 0 || localBlogs.length > 0) && (
          <section className="section-padding bg-card border-t border-border relative overflow-hidden">
            <div className="container-tight relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div className="max-w-xl">
                  <span className="eyebrow mb-4 block">Local Knowledge</span>
                  <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">Insights for {town.name} Homeowners</h3>
                </div>
                <Link to="/blog" className="text-sm font-bold text-primary inline-flex items-center gap-2 hover:gap-3 transition-all border-b border-primary/20 pb-1">
                  Browse All Resources <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {existingBlogs.length > 0 ? (
                  existingBlogs.map((post) => (
                    <Link 
                      key={post.slug} 
                      to={`/blog/${post.slug}`}
                      className="group bg-background border border-border p-8 hover:border-primary/30 transition-all flex flex-col h-full shadow-sm hover:shadow-xl"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-none bg-primary/5 flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">{post.category}</span>
                      </div>
                      <h4 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors mb-4 leading-tight">{post.title}</h4>
                      <p className="text-sm text-muted-foreground mb-8 line-clamp-3 font-body flex-grow leading-relaxed">{post.excerpt}</p>
                      <span className="text-[11px] uppercase tracking-widest font-bold text-primary flex items-center gap-2 group-hover:gap-4 transition-all">
                        Read Local Guide <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  ))
                ) : (
                  blogPosts.filter(b => b.category === "Construction" || b.category === "Design").slice(0, 3).map((post) => (
                    <Link 
                      key={post.slug} 
                      to={`/blog/${post.slug}`}
                      className="group bg-background border border-border p-8 hover:border-primary/30 transition-all flex flex-col h-full shadow-sm hover:shadow-xl"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-none bg-primary/5 flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">{post.category}</span>
                      </div>
                      <h4 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors mb-4 leading-tight">{post.title}</h4>
                      <p className="text-sm text-muted-foreground mb-8 line-clamp-3 font-body flex-grow leading-relaxed">{post.excerpt}</p>
                      <span className="text-[11px] uppercase tracking-widest font-bold text-primary flex items-center gap-2 group-hover:gap-4 transition-all">
                        Read Planning Guide <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </section>
        )}

        {/* Builder Promo - Link to Interactive Tools */}
        <section className="py-12 bg-background border-y border-border">
          <div className="container-tight">
            <div className="bg-secondary/50 p-8 md:p-12 border border-border flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl text-center md:text-left">
                <h3 className="text-2xl font-heading font-bold text-foreground mb-3 tracking-tight">Try Our Interactive Builders</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">
                  Visualize your new roof or plan your construction project budget in minutes using our custom {town.name} building tools.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/roofing-builder" className="text-xs font-bold bg-primary text-primary-foreground px-6 py-3 hover:bg-primary/90 transition-colors uppercase tracking-widest text-center">Roof Builder</Link>
                <Link to="/construction-builder" className="text-xs font-bold border border-primary text-primary px-6 py-3 hover:bg-primary/5 transition-colors uppercase tracking-widest text-center">Project Builder</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Real Proof: Project Showcase Strip */}
        <section className="py-16 bg-background border-t border-border overflow-hidden">
          <div className="container-tight">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
              <div>
                <span className="eyebrow mb-2 block">Real Results</span>
                <h3 className="text-3xl font-heading font-bold">Recent Projects Near {town.name}</h3>
              </div>
              <Link to="/gallery" className="text-sm font-bold text-primary inline-flex items-center gap-2 hover:gap-3 transition-all">
                View Full Gallery <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectDetails
                .filter(p => p.location.includes(town.name) || p.county === town.county)
                .slice(0, 3)
                .map((project, i) => (
                  <Link 
                    key={project.slug} 
                    to={`/projects/${project.slug}`}
                    className="group relative aspect-[4/3] overflow-hidden border border-border"
                  >
                    <img 
                      src={project.heroImage} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="flex items-center gap-2 text-[hsl(var(--highland-gold))] mb-1">
                        <Camera className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{project.type}</span>
                      </div>
                      <h4 className="text-white font-heading font-bold text-lg leading-tight">{project.title}</h4>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* 8. Service area / nearby communities */}
        <section className="section-padding bg-secondary/10">
          <div className="container-tight">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Nearby Service Areas in {town.county}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {otherTowns.map((t) => (
                <Link
                  key={t.slug}
                  to={`/service-areas/${t.slug}`}
                  className="bg-card border border-border rounded-sm p-4 text-center hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <MapPin className="w-5 h-5 text-primary mx-auto mb-2" />
                  <span className="font-heading font-semibold text-foreground text-sm">{t.name}</span>
                  <p className="text-muted-foreground text-[10px] mt-1 uppercase tracking-wider">{t.county}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/service-areas" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all uppercase tracking-widest text-[11px]">
                View All Service Areas <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA Form */}
        <InspectionForm />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default TownPage;
