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
        {/* 1. Localized Hero */}
        <section className="relative min-h-[70svh] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" 
              alt={`${town.name}, NC landscapes`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.95)] via-[hsl(var(--hero-overlay)/0.85)] to-[hsl(var(--hero-overlay)/0.4)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay))] via-transparent to-transparent" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
          </div>

          <div className="container-tight relative z-10 px-6 md:px-10 lg:px-20 py-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 text-[hsl(var(--highland-gold))] mb-6">
                <motion.div initial={{ width: 0 }} animate={{ width: 40 }} className="h-px bg-[hsl(var(--highland-gold))]" />
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-semibold text-[11px] uppercase tracking-[0.25em]">{town.county}, {town.state}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-6 text-primary-foreground tracking-tight max-w-5xl leading-[1.1]">
                Roofing & Construction Built for <span className="text-[hsl(var(--highland-gold))]">{town.name}</span>
              </h1>
              
              <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-4xl">
                {[
                  { icon: Mountain, label: "Elevation", value: town.elevation },
                  { icon: CloudRain, label: "Local Focus", value: town.housingProfile },
                  { icon: HardHat, label: "Authority", value: "Licensed GC" }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-sm">
                    <stat.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-primary-foreground/40 font-semibold">{stat.label}</p>
                      <p className="text-sm font-heading font-bold text-primary-foreground">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/consultation" className="cta-gradient cta-glow text-accent-foreground font-heading font-bold text-[14px] px-10 py-[18px] rounded-none inline-flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 tracking-wide">
                  Start a {town.name} Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:8283979211" className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.12] text-primary-foreground font-semibold text-[14px] px-9 py-[17px] rounded-none inline-flex items-center justify-center gap-2.5 hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-300">
                  <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.6)]" /> (828) 397-9211
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. Localized Authority Section */}
        <section className="py-16 md:py-24 bg-card border-b border-border">
          <div className="container-tight">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7">
                <h2 className="text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))] font-bold mb-4">Market Authority</h2>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6 leading-tight">Genuinely Local. Built for <span className="italic">{town.name}</span>.</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-body">{town.marketAuthorityAngle}</p>
                
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-none bg-primary/5 flex items-center justify-center shrink-0 mt-1 border border-primary/10">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-foreground mb-1 text-base uppercase tracking-wider">Local Insight</h4>
                      <p className="text-muted-foreground leading-relaxed text-sm">{town.localVibe}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-none bg-primary/5 flex items-center justify-center shrink-0 mt-1 border border-primary/10">
                      <Wind className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-foreground mb-1 text-base uppercase tracking-wider">Climate Exposure</h4>
                      <p className="text-muted-foreground leading-relaxed text-sm">{town.climateExposure}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-5">
                <div className="relative p-8 bg-secondary border border-border overflow-hidden rounded-sm">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-[hsl(var(--highland-gold)/0.05)] rounded-full blur-3xl" />
                  <h4 className="text-xs font-heading font-bold text-foreground mb-6 uppercase tracking-widest border-b border-border pb-4">Area Realities</h4>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-foreground font-heading">Common Demand</p>
                        <p className="text-xs text-muted-foreground mt-0.5 font-body">Frequent requests for {town.serviceDemandMix.join(', ')}.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-foreground font-heading">Style Tendencies</p>
                        <p className="text-xs text-muted-foreground mt-0.5 font-body">A preference for {town.styleTendency} architectural details.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-foreground font-heading">Neighborhoods</p>
                        <p className="text-xs text-muted-foreground mt-0.5 font-body">Serving {town.notableNeighborhoods.join(', ')} and surrounding areas.</p>
                      </div>
                    </li>
                  </ul>
                </div>
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

                <Link to="/layouts-planning" className="inline-flex items-center gap-2 text-[hsl(var(--highland-gold))] font-bold hover:gap-3 transition-all uppercase tracking-widest text-[11px] border-b border-[hsl(var(--highland-gold)/0.2)] pb-1">
                  Explore Your Project Scope <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
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
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Factual Insights for {town.name} Homeowners</h3>
                </div>
                <Link to="/blog" className="text-primary font-bold inline-flex items-center gap-2 hover:underline font-heading text-sm uppercase tracking-wider">
                  View All Insights <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {existingBlogs.map((post) => (
                  <Link key={post.slug} to={`/blog/${post.slug}`} className="group bg-card border border-border p-6 rounded-sm hover:border-primary/30 transition-all flex flex-col h-full">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-4">
                      <BookOpen className="w-3 h-3" />
                      {post.category}
                    </div>
                    <h4 className="text-lg font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">{post.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow font-body">{post.excerpt}</p>
                    <span className="text-[11px] font-bold text-primary flex items-center gap-1.5 uppercase tracking-wider font-heading">
                      Read Guide <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
                
                {/* Proposed Local Topics */}
                {existingBlogs.length < 3 && localBlogs.map((topic, i) => (
                  <div key={i} className="bg-background/50 border border-dashed border-border p-6 rounded-sm flex flex-col">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold mb-4 flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded-sm bg-secondary text-[8px]">{topic.serviceCategory}</span>
                      Upcoming Guide
                    </div>
                    <h4 className="text-lg font-heading font-bold text-foreground/60 mb-3 leading-snug">{topic.title}</h4>
                    <p className="text-sm text-muted-foreground/60 leading-relaxed mb-6 flex-grow font-body">{topic.description}</p>
                    <span className="text-[11px] font-bold text-muted-foreground/40 flex items-center gap-1.5 uppercase tracking-wider font-heading">
                      In Development
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 9. Next Steps / Advanced Builders */}
        <section className="bg-background">
          <BuilderPromoBlock
            variant="band"
            town={town.name}
            title={`Build Your Roofing Project in ${town.name}`}
            body={`An optional guided pathway for ${town.name}-area homeowners. Specify project type, material, and priorities — we use it to prepare a sharper on-site assessment with mountain-exposure detailing built in.`}
          />

          <BuilderPromoBlock
            mode="construction"
            variant="band"
            town={town.name}
            title={`Plan Your ${town.name} Construction Project`}
            body={`Optional guided pathway for ${town.name}-area additions, porches, decks, outdoor living, and flatwork projects. Sharpens the first conversation — never replaces it.`}
          />
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
