import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, Phone, MapPin, Mountain, 
  Shield, Star, Hammer, Home, Wind, CloudLightning, Compass,
  BookOpen
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import TartanBackground from "@/components/TartanBackground";
import SectionDivider from "@/components/SectionDivider";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import { getCountyBySlug } from "@/data/counties";
import { towns } from "@/data/towns";
import { getRelevantBlogsForTown } from "@/data/content-support";
import logo from "@/assets/logo.png";


const CountyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const county = getCountyBySlug(slug || "");

  if (!county) {
    return (
      <>
        <Header />
        <main className="section-padding text-center pt-32 min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-heading font-bold text-foreground">County Not Found</h1>
          <Link to="/service-areas" className="text-primary underline mt-4 inline-block">View All Service Areas</Link>
        </main>
        <Footer />
      </>
    );
  }

  const countyTowns = towns.filter(t => county.towns.includes(t.name));
  const relevantBlogs = getRelevantBlogsForTown(countyTowns[0]?.name || "Highlands");

  return (
    <>
      <SEOHead
        title={county.metaTitle}
        description={county.metaDescription}
        path={`/service-areas/county/${county.slug}`}
      />
      <Header />
      <main>
        {/* 1. County Hero — Premium Mountain Visual */}
        <section className="relative min-h-[85svh] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={county.heroImage} 
              alt={`${county.name} mountain construction context`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45 md:bg-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <TartanBackground opacity={0.03} />
          </div>

          <div className="container-tight relative z-10 px-6 py-24 w-full">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-10 md:h-12 w-1 bg-[hsl(var(--highland-gold))]" />
              <div className="flex flex-col">
                <span className="text-[16px] md:text-[18px] font-heading font-bold text-white tracking-[0.15em] uppercase">Highlander Roofing & Construction</span>
                <span className="text-[10px] md:text-[11px] font-body font-bold text-[hsl(var(--highland-gold))] uppercase tracking-[0.3em]">{county.name} Authority</span>
              </div>
            </motion.div>

            <div className="max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-display-lg md:text-display-xl font-heading font-bold mb-6 md:mb-10 text-white tracking-tightest leading-[0.9] drop-shadow-lg">
                  Built for the <br />
                  <span className="text-[hsl(var(--highland-gold))] italic">{county.name} Corridor.</span>
                </h1>

                <p className="text-lg md:text-2xl text-white/95 mb-12 max-w-2xl leading-relaxed font-body font-bold drop-shadow-md">
                  {county.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5">
                  <Link to="/consultation" className="cta-gradient cta-glow text-accent-foreground font-heading font-bold text-[14px] md:text-[16px] px-10 py-5 rounded-none inline-flex items-center justify-center gap-3 shadow-2xl min-w-[300px]">
                    Start a {county.name} Project <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a href="tel:8283979211" className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-[14px] md:text-[16px] px-10 py-5 rounded-none inline-flex items-center justify-center gap-3 shadow-xl min-w-[240px]">
                    <Phone className="w-5 h-5 text-[hsl(var(--highland-gold))]" /> (828) 397-9211
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Trust bar — Balanced for all devices */}
          <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/40 backdrop-blur-lg">
            <div className="container-tight px-4 sm:px-6 py-4 md:py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {county.facts.map((fact, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[11px] md:text-[12px] uppercase tracking-widest text-white/60 font-bold mb-1">{fact.label}</span>
                    <span className="text-base md:text-lg font-heading font-bold text-white flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-[hsl(var(--highland-gold))]" />
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* 2. County Intelligence — New Authority Section */}
        <section className="py-24 bg-background border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto" }} />
          <div className="container-tight relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <span className="eyebrow mb-4 block">{county.name} Authority</span>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8 leading-tight">
                    Regional knowledge. <br />
                    <span className="italic text-primary">Master-class execution.</span>
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-10 font-body">
                    Highlander is more than a regional contractor. We are a specialized mountain defense team. In <span className="text-foreground font-bold">{county.name}</span>, we account for the specific atmospheric and structural realities that lowland builders miss.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex gap-6 items-start group">
                      <div className="w-12 h-12 bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <Home className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-foreground mb-2 text-lg uppercase tracking-wider">Housing Profile</h4>
                        <p className="text-muted-foreground leading-relaxed font-body">{county.housingContext}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-6 items-start group">
                      <div className="w-12 h-12 bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <Wind className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-foreground mb-2 text-lg uppercase tracking-wider">Climate Realities</h4>
                        <p className="text-muted-foreground leading-relaxed font-body">{county.climateRealities}</p>
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
                      Key Communities
                    </h4>
                    <div className="grid gap-4">
                      {countyTowns.map((town) => (
                        <Link 
                          key={town.slug} 
                          to={`/service-areas/${town.slug}`}
                          className="group block p-4 bg-secondary/30 border border-border hover:border-primary/30 transition-all"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">{town.name}</span>
                            <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </div>
                          <p className="text-xs text-muted-foreground font-body line-clamp-1">{town.description}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 3. Division Callouts */}
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto" }} />
          <div className="container-tight relative z-10">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-primary p-10 text-white relative overflow-hidden group">
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "200px auto" }} />
                <Home className="w-10 h-10 text-[hsl(var(--highland-gold))] mb-6" />
                <h3 className="text-2xl font-heading font-bold mb-4 uppercase tracking-tighter">Roofing</h3>
                <p className="text-white/70 text-sm mb-8 font-body leading-relaxed">
                  Specialized mountain systems designed for {county.name} weather. Shingle, metal, and premium Brava synthetic installations.
                </p>
                <Link to="/roofing" className="inline-flex items-center gap-2 font-bold text-[hsl(var(--highland-gold))] hover:gap-4 transition-all text-sm">
                  Roofing Solutions <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-card border border-border p-10 relative overflow-hidden group">
                <Hammer className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-2xl font-heading font-bold mb-4 uppercase tracking-tighter">Construction</h3>
                <p className="text-muted-foreground text-sm mb-8 font-body leading-relaxed">
                  Expanding {county.name} homes with engineered additions, premium outdoor living, and structural modernization.
                </p>
                <Link to="/construction" className="inline-flex items-center gap-2 font-bold text-primary hover:gap-4 transition-all text-sm">
                  Construction Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-secondary p-10 relative overflow-hidden group border border-border">
                <Compass className="w-10 h-10 text-[hsl(var(--highland-gold))] mb-6" />
                <h3 className="text-2xl font-heading font-bold mb-4 uppercase tracking-tighter">Design Support</h3>
                <p className="text-muted-foreground text-sm mb-8 font-body leading-relaxed">
                  Pre-construction planning, layouts, and site-specific guidance to ensure your {county.name} project is built right from the start.
                </p>
                <Link to="/layouts-planning" className="inline-flex items-center gap-2 font-bold text-[hsl(var(--highland-gold))] hover:gap-4 transition-all text-sm">
                  Planning Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* 4. Conversion Block — Premium and Direct */}
        <section className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto" }} />
          <div className="container-tight relative z-10 text-center">
            <span className="eyebrow mb-6 block text-[hsl(var(--highland-gold))]">Start Your Project</span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 leading-tight">
              Ready to Discuss Your <br className="hidden md:block" /> {county.name} Property?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 font-body leading-relaxed">
              From historic roof replacement to engineered home additions, we provide the highest standard of craftsmanship in {county.name}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/consultation" className="cta-gradient text-accent-foreground font-heading font-bold text-lg px-12 py-6 rounded-none inline-flex items-center gap-3 hover:scale-105 transition-all shadow-2xl min-w-[280px] justify-center">
                Request an Assessment <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:8283979211" className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg px-12 py-6 rounded-none inline-flex items-center gap-3 hover:bg-white/20 transition-all min-w-[240px] justify-center">
                <Phone className="w-5 h-5 text-[hsl(var(--highland-gold))]" /> (828) 397-9211
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

export default CountyPage;
