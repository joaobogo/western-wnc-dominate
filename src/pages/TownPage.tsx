import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, Phone, CheckCircle, MapPin, Wind, CloudRain, Mountain, 
  Home, HardHat, BookOpen, Shield, Star, Hammer, RotateCcw, 
  CloudLightning, Layers, TreePine, Paintbrush, Building, Wrench, Droplets,
  Building2, Users, Compass, ArrowUpRight
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
const marketVisualImg = "https://images.unsplash.com/photo-1518005020251-58296d87ba60?auto=format&fit=crop&q=80&w=1000";
const localPlanningImg = "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1000";
const highElevationDetailImg = "https://images.unsplash.com/photo-1516706562725-aa47c4701923?auto=format&fit=crop&q=80&w=1000";
const mountainStructureImg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000";

import { services } from "@/data/services";
import { localBlogTopics } from "@/data/local-blog-topics";
import { blogPosts } from "@/data/blogs";

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
        {/* 1. Localized Hero — Highly Improved with mountain backgrounds */}
        <section className="relative min-h-[85svh] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={
                town.slug === 'highlands-nc' ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" : // Authentic mountain estate with slate-style roof
                town.slug === 'cashiers-nc' ? "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" : // Believable ridgetop residence
                town.slug === 'franklin-nc' ? "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=2000" : // Grounded family home construction
                town.slug === 'waynesville-nc' ? "https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=2000" : // Premium craftsman ridgetop
                town.slug === 'sylva-nc' ? "https://images.unsplash.com/photo-1600607687920-4e2a12cf1a57?auto=format&fit=crop&q=80&w=2000" : // Real residential renovation context
                town.slug === 'bryson-city-nc' ? "https://images.unsplash.com/photo-1449156001437-3a166a6cb7f2?auto=format&fit=crop&q=80&w=2000" : // Authentic cabin siding/roofing
                town.slug === 'cullowhee-nc' ? "https://images.unsplash.com/photo-1513584684374-8bdb7483fe8f?auto=format&fit=crop&q=80&w=2000" : // Modern residential structure
                town.slug === 'dillsboro-nc' ? "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=2000" : // Believable village cottage
                "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=2000"


              } 
              alt={`${town.name}, NC mountain roofing and construction context`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.92)] via-[hsl(var(--hero-overlay)/0.75)] to-[hsl(var(--hero-overlay)/0.1)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay))] via-transparent to-transparent opacity-80" />
            
            {/* Subtle Tartan Overlay */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto" }} />
            
            {/* Design Datum Lines */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
              <div className="absolute left-[10%] top-0 bottom-0 w-px bg-white" />
              <div className="absolute right-[10%] top-0 bottom-0 w-px bg-white" />
            </div>
          </div>

          <div className="container-tight relative z-10 px-6 md:px-10 lg:px-20 py-24">
            <div className="max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-4 text-[hsl(var(--highland-gold))] mb-8">
                  <div className="flex items-center gap-2 px-3 py-1 bg-[hsl(var(--highland-gold)/0.15)] border border-[hsl(var(--highland-gold)/0.2)]">
                    <MapPin className="w-3.5 h-3.5" />
                    <Link to={`/service-areas/county/${town.county.toLowerCase().replace(' ', '-')}`} className="font-bold text-[10px] uppercase tracking-[0.3em] hover:text-white transition-colors">{town.county}</Link>
                  </div>
                  <div className="h-px w-12 bg-[hsl(var(--highland-gold)/0.3)]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Market Authority</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 text-primary-foreground tracking-tightest leading-[0.92] drop-shadow-sm">
                  Built for the <br />
                  <span className="text-[hsl(var(--highland-gold))] italic font-medium">{town.name} Peaks.</span>
                </h1>

                <p className="text-xl md:text-2xl text-white/50 mb-12 max-w-2xl leading-relaxed font-body font-light">
                  {town.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5">
                  <Link to="/consultation" className="cta-gradient cta-glow text-accent-foreground font-heading font-bold text-[15px] px-10 py-5 rounded-none inline-flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 tracking-wide">
                    Start a {town.name} Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a href="tel:8283979211" className="bg-white/[0.04] backdrop-blur-md border border-white/[0.12] text-primary-foreground font-semibold text-[15px] px-10 py-5 rounded-none inline-flex items-center justify-center gap-3 hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-300">
                    <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.6)]" /> (828) 397-9211
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Trust bar inside hero */}
          <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/5 bg-black/20 backdrop-blur-md">
            <div className="container-tight px-6 py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { icon: Mountain, label: "Peak Elevation", value: town.elevation },
                  { icon: CloudLightning, label: "Storm Ready", value: "Class 4 Rated" },
                  { icon: Shield, label: "Credential", value: "Licensed GC" },
                  { icon: Star, label: "Local Trust", value: "4.9★ Rated" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold mb-1">{stat.label}</span>
                    <span className="text-sm font-heading font-bold text-white flex items-center gap-2">
                      <stat.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold))]" />
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
                    <h4 className="text-xs font-heading font-bold text-foreground mb-8 uppercase tracking-[0.3em] border-b border-border pb-6 flex items-center gap-3">
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
                          <p className="text-[10px] font-bold text-[hsl(var(--highland-gold))] uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="text-base text-foreground font-heading font-bold leading-tight group-hover:text-primary transition-colors">{item.value}</p>
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

        {/* 3 & 4. Roofing & Construction Dual Division Section — Highly Visual */}
        <section className="section-padding bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto", backgroundRepeat: "repeat" }} />
          
          <div className="container-tight relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="eyebrow mb-4 block">Dual Division Strategy</span>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">Expertise across the <br className="hidden md:block" /> full exterior envelope.</h2>
              <p className="text-xl text-muted-foreground font-body leading-relaxed">
                In {town.name}, roofing and construction aren't separate concerns. We treat the structure and its covering as a single unified system built to handle the peaks.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Roofing Column */}
              <div className="flex flex-col h-full">
                <div className="bg-primary p-10 md:p-14 text-white flex-1 relative overflow-hidden group">
                  {/* Subtle Pattern */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "200px auto" }} />
                  
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-white/10 flex items-center justify-center border border-white/20">
                        <Home className="w-6 h-6 text-[hsl(var(--highland-gold))]" />
                      </div>
                      <h3 className="text-3xl font-heading font-bold uppercase tracking-tightest">Roofing Division</h3>
                    </div>

                    <p className="text-white/60 text-lg mb-10 leading-relaxed font-body">
                      Addressing the {town.climateExposure.toLowerCase()} with high-performance systems. Our {town.name} crews specialize in {town.serviceDemandMix.filter(s => s.toLowerCase().includes('roof')).join(' and ')}.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-12">
                      {roofingServices.map((service) => (
                        <Link 
                          key={service.slug} 
                          to={`/services/${service.slug}`}
                          className="group/item flex items-center justify-between p-5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[hsl(var(--highland-gold)/0.4)] transition-all duration-300"
                        >
                          <span className="font-heading font-bold text-sm tracking-wide">{service.title}</span>
                          <ArrowUpRight className="w-4 h-4 text-[hsl(var(--highland-gold)/0.5)] group-hover/item:text-[hsl(var(--highland-gold))] transition-colors" />
                        </Link>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <Link to="/roofing" className="inline-flex items-center gap-3 text-[hsl(var(--highland-gold))] font-bold hover:gap-5 transition-all uppercase tracking-widest text-[11px] border-b border-[hsl(var(--highland-gold)/0.3)] pb-2">
                        View All Roofing Solutions <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Construction Column */}
              <div className="flex flex-col h-full">
                <div className="bg-card p-10 md:p-14 border border-border flex-1 relative overflow-hidden group">
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-primary/5 flex items-center justify-center border border-primary/10">
                        <Hammer className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-3xl font-heading font-bold uppercase tracking-tightest">Construction Division</h3>
                    </div>

                    <p className="text-muted-foreground text-lg mb-10 leading-relaxed font-body">
                      {town.constructionContext}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-12">
                      {constructionServices.map((service) => (
                        <Link 
                          key={service.slug} 
                          to={service.slug === 'outdoor-living' ? '/construction/outdoor-living' : '/construction'}
                          className="group/item flex items-center justify-between p-5 bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-300"
                        >
                          <span className="font-heading font-bold text-sm tracking-wide text-foreground">{service.title}</span>
                          <ArrowUpRight className="w-4 h-4 text-primary/30 group-hover/item:text-primary transition-colors" />
                        </Link>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <Link to="/layouts-planning" className="inline-flex items-center gap-3 text-primary font-bold hover:gap-5 transition-all uppercase tracking-widest text-[11px] border-b border-primary/20 pb-2">
                        Design & Planning in {town.name} <ArrowRight className="w-4 h-4" />
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
