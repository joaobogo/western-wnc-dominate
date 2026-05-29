import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, Phone, MapPin, Mountain, 
  Shield, Star, CloudLightning, Home, HardHat
} from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";
import TwoPillars from "@/components/TwoPillars";
import FeaturedProjects from "@/components/FeaturedProjects";
import SectionDivider from "@/components/SectionDivider";
import TartanBackground from "@/components/TartanBackground";
import BuiltForWNC from "@/components/BuiltForWNC";
import ProjectConcierge from "@/components/ProjectConcierge";
import TownProofBlock from "@/components/TownProofBlock";
import { getTownBySlug, towns } from "@/data/towns";
import { getTownProofContent } from "@/data/town-proof";
import { blogPosts } from "@/data/blogs";

const TownPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const town = getTownBySlug(slug || "");

  if (!town) {
    return (
      <>
        <Header />
        <main className="section-padding text-center pt-32 min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-heading font-bold text-foreground">Service Area Not Found</h1>
          <Link to="/service-areas" className="text-primary underline mt-4 inline-block">View All Service Areas</Link>
        </main>
        <Footer />
      </>
    );
  }

  const townProof = getTownProofContent(town.slug);
  const existingBlogs = blogPosts.filter(b => b.town === town.name).slice(0, 3);

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
          faqs: townProof?.faqs ?? [],
        })}
      />
      <Header />
      <main>
        {/* 1. Premium Hero */}
        <section className="relative min-h-[90svh] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={town.heroImage} 
              alt={`${town.name} NC mountain roofing and construction`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45 md:bg-transparent md:bg-gradient-to-r md:from-black/75 md:via-black/35 md:to-transparent" />
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
                <span className="text-[10px] md:text-[11px] font-body font-bold text-[hsl(var(--highland-gold))] uppercase tracking-[0.3em]">{town.name} Division</span>
              </div>
            </motion.div>

            <div className="max-w-4xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-display-lg md:text-display-xl font-heading font-bold mb-6 text-white tracking-tightest leading-[0.9] drop-shadow-lg"
              >
                Built for the <br />
                <span className="text-[hsl(var(--highland-gold))]">{town.name} Peaks.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-lg md:text-2xl text-white/95 mb-10 max-w-2xl leading-relaxed font-body font-bold drop-shadow-md"
              >
                {town.description}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 md:gap-6"
              >
                <Link to="/consultation" className="cta-gradient cta-glow text-accent-foreground font-heading font-bold text-[14px] md:text-[16px] px-8 py-5 rounded-none inline-flex items-center justify-center gap-3 shadow-2xl min-w-[300px]">
                  Request a {town.name} Assessment <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:8283979211" className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-[14px] md:text-[16px] px-8 py-5 rounded-none inline-flex items-center justify-center gap-3 shadow-xl min-w-[240px]">
                  <Phone className="w-5 h-5 text-[hsl(var(--highland-gold))]" /> (828) 397-9211
                </a>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/40 backdrop-blur-lg">
            <div className="container-tight px-4 sm:px-6 py-4 md:py-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {[
                  { icon: Mountain, label: "Elevation", value: town.elevation },
                  { icon: CloudLightning, label: "Storm Ready", value: "Class 4 Rated" },
                  { icon: Shield, label: "Credential", value: "Licensed GC" },
                  { icon: Star, label: "Local Trust", value: "4.9★ Rated" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[11px] md:text-[12px] uppercase tracking-widest text-white/60 font-bold mb-1">{stat.label}</span>
                    <span className="text-base md:text-lg font-heading font-bold text-white flex items-center gap-2">
                      <stat.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold))]" />
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Authority Section */}
        <section className="py-24 bg-background relative overflow-hidden">
          <TartanBackground opacity={0.02} />
          <div className="container-tight grid lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal variant="fade">
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
                  <div className="w-12 h-12 bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2 text-lg uppercase tracking-wider">Local Insight</h4>
                    <p className="text-muted-foreground leading-relaxed font-body">{town.localVibe}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <div className="bg-secondary p-8 border relative z-10 shadow-sm">
              <h4 className="text-sm font-heading font-bold text-foreground mb-8 uppercase tracking-[0.3em] border-b border-border pb-6 flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
                {town.name} Site Realities
              </h4>
              <ul className="space-y-8">
                {[
                  { label: "Construction Context", value: town.constructionContext },
                  { label: "Style Tendency", value: town.styleTendency },
                  { label: "Notable Areas", value: town.notableNeighborhoods.join(', ') }
                ].map((item, i) => (
                  <li key={i}>
                    <p className="text-[11px] font-bold text-[hsl(var(--highland-gold))] uppercase tracking-widest mb-1.5">{item.label}</p>
                    <p className="text-lg text-foreground font-heading font-bold leading-tight">{item.value}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Dual Pathway */}
        <TwoPillars />

        {/* 4. Local Proof */}
        {townProof && <TownProofBlock town={town} content={townProof} />}

        <SectionDivider variant="diamond" />

        {/* 5. Featured Projects */}
        <FeaturedProjects />

        {/* 6. Built for WNC Factors */}
        <BuiltForWNC />

        {/* 7. Localized Blog Section */}
        {existingBlogs.length > 0 && (
          <section className="py-24 bg-background">
            <div className="container-tight text-center mb-16">
              <span className="eyebrow mb-4 block">Knowledge Base</span>
              <h2 className="text-4xl font-heading font-bold">Researching for {town.name}?</h2>
            </div>
            <div className="container-tight grid md:grid-cols-3 gap-8">
              {existingBlogs.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="group block border border-border p-6 hover:border-primary transition-colors">
                  <h3 className="font-heading font-bold text-xl mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  <span className="text-primary text-sm font-bold flex items-center gap-2">Read Article <ArrowRight className="w-4 h-4" /></span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <ProjectConcierge />
        <InspectionForm />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default TownPage;