import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, Phone, MapPin, Mountain, 
  Shield, Star, Hammer, Home, Wind, CloudLightning
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { getCountyBySlug } from "@/data/counties";
import { towns } from "@/data/towns";

const CountyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const county = getCountyBySlug(slug || "");

  if (!county) {
    return (
      <>
        <Header />
        <main className="section-padding text-center pt-32">
          <h1 className="text-3xl font-heading font-bold text-foreground">County Not Found</h1>
          <Link to="/service-areas" className="text-primary underline mt-4 inline-block">View All Service Areas</Link>
        </main>
        <Footer />
      </>
    );
  }

  const countyTowns = towns.filter(t => county.towns.includes(t.name));

  return (
    <>
      <SEOHead
        title={county.metaTitle}
        description={county.metaDescription}
        path={`/service-areas/${county.slug}`}
      />
      <Header />
      <main>
        {/* 1. County Hero — Premium Mountain Visual */}
        <section className="relative min-h-[70svh] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={county.heroImage} 
              alt={`${county.name} mountain construction context`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.95)] via-[hsl(var(--hero-overlay)/0.8)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay))] via-transparent to-transparent" />
            
            {/* Subtle Tartan Overlay */}
            <div className="absolute inset-0 opacity-[0.12] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto" }} />
          </div>

          <div className="container-tight relative z-10 px-6 py-24">
            <div className="max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 text-[hsl(var(--highland-gold))] mb-8">
                  <div className="flex items-center gap-2 px-3 py-1 bg-[hsl(var(--highland-gold)/0.15)] border border-[hsl(var(--highland-gold)/0.2)]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="font-bold text-[10px] uppercase tracking-[0.3em]">Western North Carolina</span>
                  </div>
                  <div className="h-px w-12 bg-[hsl(var(--highland-gold)/0.3)]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">County Authority</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 text-primary-foreground tracking-tightest leading-[0.92]">
                  Defending <br />
                  <span className="text-[hsl(var(--highland-gold))] italic font-medium">{county.name}.</span>
                </h1>

                <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl leading-relaxed font-body font-light">
                  {county.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5">
                  <Link to="/consultation" className="cta-gradient cta-glow text-accent-foreground font-heading font-bold text-[15px] px-10 py-5 rounded-none inline-flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                    Start a {county.name} Project <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="tel:8283979211" className="bg-white/[0.04] backdrop-blur-md border border-white/[0.12] text-primary-foreground font-semibold text-[15px] px-10 py-5 rounded-none inline-flex items-center justify-center gap-3">
                    <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.6)]" /> (828) 397-9211
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Trust bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/5 bg-black/20 backdrop-blur-md">
            <div className="container-tight px-6 py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {county.facts.map((fact, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold mb-1">{fact.label}</span>
                    <span className="text-sm font-heading font-bold text-white flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-[hsl(var(--highland-gold))]" />
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Key Communities in County */}
        <section className="py-24 bg-background">
          <div className="container-tight">
            <div className="text-center mb-16">
              <span className="eyebrow mb-4 block">Regional Coverage</span>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-6">Communities We Serve in {county.name}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto font-body">
                We provide full roofing and construction services to every corner of {county.name}, with specialized teams for each micro-climate.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {countyTowns.map((town) => (
                <Link 
                  key={town.slug} 
                  to={`/service-areas/${town.slug}`}
                  className="group block bg-card border border-border p-8 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <h3 className="text-2xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">{town.name}</h3>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-muted-foreground mb-6 line-clamp-2 font-body">{town.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {town.features.slice(0, 3).map(f => (
                      <span key={f} className="text-[10px] font-bold uppercase tracking-wider bg-secondary px-2 py-1 rounded">{f}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Division Callouts */}
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto" }} />
          <div className="container-tight relative z-10">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-primary p-12 text-white relative overflow-hidden group">
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "200px auto" }} />
                <Home className="w-12 h-12 text-[hsl(var(--highland-gold))] mb-6" />
                <h3 className="text-3xl font-heading font-bold mb-4 uppercase tracking-tighter">Roofing Division</h3>
                <p className="text-white/70 mb-8 font-body leading-relaxed">
                  Specialized in mountain roofing systems designed for the unique weather patterns of {county.name}. From emergency storm repairs to premium Brava synthetic shake installations.
                </p>
                <Link to="/roofing" className="inline-flex items-center gap-2 font-bold text-[hsl(var(--highland-gold))] hover:gap-4 transition-all">
                  Explore Roofing Solutions <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-card border border-border p-12 relative overflow-hidden group">
                <Hammer className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-3xl font-heading font-bold mb-4 uppercase tracking-tighter">Construction Division</h3>
                <p className="text-muted-foreground mb-8 font-body leading-relaxed">
                  Expanding and enhancing {county.name} properties with engineered home additions, premium outdoor living spaces, and whole-home structural modernization.
                </p>
                <Link to="/construction" className="inline-flex items-center gap-2 font-bold text-primary hover:gap-4 transition-all">
                  Explore Construction Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
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
