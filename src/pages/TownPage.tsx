import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, Phone, CheckCircle, MapPin, Wind, CloudRain, Mountain, 
  Home, HardHat, BookOpen, Shield, Star, Hammer, RotateCcw, 
  CloudLightning, Layers, TreePine, Paintbrush, Building, Wrench, Droplets,
  Building2, Users, Compass
} from "lucide-react";
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
                town.slug === 'highlands-nc' ? "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" :
                town.slug === 'cashiers-nc' ? "https://images.unsplash.com/photo-1439396087961-99bc12bd8830?auto=format&fit=crop&q=80&w=2000" :
                town.slug === 'franklin-nc' ? "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=2000" :
                town.slug === 'waynesville-nc' ? "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2000" :
                "https://images.unsplash.com/photo-1516706562725-aa47c4701923?auto=format&fit=crop&q=80&w=2000"
              } 
              alt={`${town.name}, NC mountain landscapes`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.95)] via-[hsl(var(--hero-overlay)/0.8)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay))] via-transparent to-transparent" />
            
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
                    <span className="font-bold text-[10px] uppercase tracking-[0.3em]">{town.county}</span>
                  </div>
                  <div className="h-px w-12 bg-[hsl(var(--highland-gold)/0.3)]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Market Authority</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-heading font-bold mb-8 text-primary-foreground tracking-tightest leading-[0.92]">
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

        {/* 3 & 4. Roofing & Construction Dual Division Section */}
        <section className="section-padding bg-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto", backgroundRepeat: "repeat" }} />
          <div className="container-tight relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">A Dual-Division Strategy for {town.name}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">We treat Roofing and Construction with equal importance, ensuring every project integrates perfectly with your home's structure and the mountain landscape.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Roofing Column */}
              <div className="space-y-10">
                <div className="border-l-4 border-primary pl-8 py-2">
                  <h3 className="text-3xl font-heading font-bold text-foreground mb-4 uppercase tracking-tight">Roofing Excellence</h3>
                  <p className="text-muted-foreground leading-relaxed font-body">
                    Addressing the {town.climateExposure} concerns with high-performance systems. Our {town.name} crews specialize in {town.serviceDemandMix.filter(s => s.toLowerCase().includes('roof')).join(' and ')}.
                  </p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {roofingServices.map((service) => (
                    <Link 
                      key={service.slug} 
                      to={`/services/${service.slug}`}
                      className="group p-6 bg-card border border-border hover:border-primary/30 transition-all rounded-sm"
                    >
                      <service.icon className="w-6 h-6 text-primary mb-4" />
                      <h4 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">{service.title}</h4>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2 font-body">{service.description}</p>
                    </Link>
                  ))}
                </div>
                
                <Link to="/roofing" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all uppercase tracking-widest text-[11px] border-b border-primary/20 pb-1">
                  All Roofing Solutions <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Construction Column */}
              <div className="space-y-10">
                <div className="border-l-4 border-[hsl(var(--highland-gold))] pl-8 py-2">
                  <h3 className="text-3xl font-heading font-bold text-foreground mb-4 uppercase tracking-tight">Custom Construction</h3>
                  <p className="text-muted-foreground leading-relaxed font-body">
                    {town.constructionContext}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {constructionServices.map((service) => (
                    <Link 
                      key={service.slug} 
                      to={service.slug === 'outdoor-living' ? '/construction/outdoor-living' : '/construction'}
                      className="group p-6 bg-card border border-border hover:border-[hsl(var(--highland-gold)/0.3)] transition-all rounded-sm"
                    >
                      <service.icon className="w-6 h-6 text-[hsl(var(--highland-gold))] mb-4" />
                      <h4 className="font-heading font-bold text-foreground group-hover:text-[hsl(var(--highland-gold))] transition-colors">{service.title}</h4>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2 font-body">{service.description}</p>
                    </Link>
                  ))}
                </div>

                <div className="relative aspect-[16/6] overflow-hidden border border-border">
                   <img src={marketVisualImg} alt="Local construction market authority" className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                   <div className="absolute bottom-4 left-6 flex items-center gap-2">
                      <div className="w-6 h-px bg-[hsl(var(--highland-gold)/0.4)]" />
                      <span className="text-[9px] font-body font-bold uppercase tracking-[0.2em] text-muted-foreground/50">Local Project Scope</span>
                   </div>
                </div>

                <Link to="/layouts-planning" className="inline-flex items-center gap-2 text-[hsl(var(--highland-gold))] font-bold hover:gap-3 transition-all uppercase tracking-widest text-[11px] border-b border-[hsl(var(--highland-gold)/0.2)] pb-1">
                  Design & Planning in {town.name} <ArrowRight className="w-4 h-4" />
                </Link>

                
                <div className="relative aspect-[16/5] overflow-hidden border border-border">
                   <img src={localPlanningImg} alt="Local project design and planning" className="w-full h-full object-cover grayscale opacity-20 hover:opacity-40 transition-opacity duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Design & Planning Bridge — Town-specific intelligence */}
        <section className="py-12 bg-secondary/20">
          <div className="container-tight">
            <div className="bg-white border border-[hsl(var(--highland-gold)/0.15)] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 group/bridge">
              <div className="w-14 h-14 rounded-full bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center border border-[hsl(var(--highland-gold)/0.2)] group-hover/bridge:scale-110 transition-transform duration-500">
                <Compass className="w-6 h-6 text-[hsl(var(--highland-gold))]" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-lg font-heading font-bold text-foreground mb-2">Planning Your {town.name} Addition?</h4>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">
                  We provide localized Design & Planning support for {town.name} homeowners. From navigating local {town.county} County building codes to mountain-responsive layouts, we ensure your project is build-ready.
                </p>
              </div>
              <Link to="/layouts-planning" className="group/btn inline-flex items-center gap-2 text-[12px] font-heading font-bold uppercase tracking-wider text-foreground hover:text-[hsl(var(--highland-gold))] transition-colors">
                View Planning Services <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>


        {/* 5, 6 & 7. Proof, Special Consideration & FAQ */}
        {townProof ? (
          <TownProofBlock 
            town={town} 
            content={townProof} 
          />
        ) : null}

        {/* 10. Supporting content / local insights */}
        {(existingBlogs.length > 0 || localBlogs.length > 0) && (
          <section className="section-padding bg-secondary/30">
            <div className="container-tight">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div className="max-w-xl">
                  <h2 className="text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))] font-bold mb-4">Local Knowledge</h2>
                  <h3 className="text-3xl font-heading font-bold text-foreground">Insights for {town.name} Homeowners</h3>
                </div>
                <Link to="/blog" className="text-sm font-bold text-primary inline-flex items-center gap-2 hover:gap-3 transition-all">
                  Browse All Resources <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {existingBlogs.length > 0 ? (
                  existingBlogs.map((post) => (
                    <Link 
                      key={post.slug} 
                      to={`/blog/${post.slug}`}
                      className="group bg-card border border-border p-6 hover:border-primary/20 transition-all rounded-sm flex flex-col"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-4 h-4 text-[hsl(var(--highland-gold)/0.6)]" />
                        <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/60">{post.category}</span>
                      </div>
                      <h4 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-3 leading-tight">{post.title}</h4>
                      <p className="text-sm text-muted-foreground mb-6 line-clamp-2 font-body flex-grow">{post.excerpt}</p>
                      <span className="text-xs font-bold text-primary flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                        Read Local Guide <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  ))
                ) : (
                  blogPosts.filter(b => b.category === "Construction" || b.category === "Design").slice(0, 3).map((post) => (
                    <Link 
                      key={post.slug} 
                      to={`/blog/${post.slug}`}
                      className="group bg-card border border-border p-6 hover:border-primary/20 transition-all rounded-sm flex flex-col"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-4 h-4 text-[hsl(var(--highland-gold)/0.6)]" />
                        <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/60">{post.category}</span>
                      </div>
                      <h4 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-3 leading-tight">{post.title}</h4>
                      <p className="text-sm text-muted-foreground mb-6 line-clamp-2 font-body flex-grow">{post.excerpt}</p>
                      <span className="text-xs font-bold text-primary flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                        Read Planning Guide <ArrowRight className="w-3.5 h-3.5" />
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
