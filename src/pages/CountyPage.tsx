import { PHONE_DISPLAY, PHONE_PLAIN, PHONE_TEL } from "@/data/business";
import AnswerBlock from "@/components/seo/AnswerBlock";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, Phone, MapPin, Mountain, 
  Shield, Star, Hammer, Home, Wind, CloudLightning, Compass,
  BookOpen
} from "lucide-react";
import SEOHead, { buildPageSchema, faqSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageContext from "@/components/PageContext";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import TartanBackground from "@/components/TartanBackground";
import SectionDivider from "@/components/SectionDivider";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import { getCountyBySlug } from "@/data/counties";
import { towns } from "@/data/towns";
import { getRelevantBlogsForTown } from "@/data/content-support";
import logo from "@/assets/logo.svg";
import ConversionTrustBlock from "@/components/trust/ConversionTrustBlock";
import LocalLinkWeb from "@/components/LocalLinkWeb";
import { getCountyLinkWeb } from "@/lib/local-link-graph";

const CountyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const county = getCountyBySlug(slug || "");

  if (!county) {
    return (
      <>
        <Header />
        <main id="main-content" className="section-padding text-center pt-32 min-h-[60vh] flex flex-col items-center justify-center">
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
        // T2 (15 Sep 2026 SEO spec): county hubs are now indexable. They are the
        // 301 destination for the doorway URLs of ~30 small communities that have
        // no page of their own, and a noindex target would throw that equity away.
        // Counties H3 dropped stay noindex,follow — reachable, out of the index.
        noindex={county.indexable === false ? "follow" : false}
        jsonLd={buildPageSchema({
          type: "county",
          county: {
            name: county.name,
            state: "NC",
            slug: county.slug,
            description: county.metaDescription,
          },
          page: { title: county.metaTitle, description: county.metaDescription },
          faqs: county.faqs?.map((f) => ({ question: f.q, answer: f.a })),
        })}
      />
      <Header />
      <PageBreadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/service-areas" },
          { name: county.name, url: `/service-areas/county/${county.slug}` },
        ]}
      />
      <main id="main-content">
        {/* 1. County Hero — Premium Mountain Visual */}
        <section className="dark-surface relative min-h-[85svh] flex flex-col items-center justify-center overflow-hidden hero-clears-header pb-32 md:pb-48">
          <div className="absolute inset-0">
            <img width={1600} height={1067} loading="eager" fetchPriority="high" decoding="async" 
              src={county.heroImage} 
              alt={`Mountain landscape in Western North Carolina — Highlander Building Services service area: ${county.name}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45 md:bg-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <TartanBackground opacity={0.03} />
          </div>

          <div className="container-tight relative z-10 px-6 pb-20 w-full">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-10 md:h-12 w-1 bg-[hsl(var(--highland-gold))]" />
              <div className="flex flex-col">
                <span className="text-body-sm md:text-body font-heading font-bold text-white tracking-[0.15em] uppercase">Highlander Building Services</span>
                <span className="text-caption md:text-caption font-body font-bold text-[hsl(var(--gold-ink))] uppercase tracking-[0.3em]">{county.name} Division</span>
              </div>
            </motion.div>

            <div className="max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-display-lg md:text-display-xl font-heading font-bold mb-6 md:mb-10 text-white tracking-tightest leading-[0.9] drop-shadow-lg">
                  Built for the <br />
                  <span className="text-[hsl(var(--gold-ink))] italic">{county.name} Corridor.</span>
                </h1>

                <PageContext
                  division="Roofing & Construction"
                  area={`${county.name}, North Carolina`}
                  tone="dark"
                  className="-mt-4"
                />

                <p className="text-lg md:text-2xl text-white/95 mb-12 max-w-2xl leading-relaxed font-body font-bold drop-shadow-md">
                  {county.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5">
                  <Link to="/request-inspection" className="btn btn-primary btn-lg md:text-body-sm min-w-[320px]">
                    Start a {county.name} Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                  <a href={PHONE_TEL} className="btn btn-secondary btn-lg btn-on-dark md:text-body-sm min-w-[240px]">
                    <Phone className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" /> {PHONE_DISPLAY}
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
                    <span className="text-caption md:text-body-xs uppercase tracking-widest text-white/85 font-bold mb-1">
                      {fact.label}
                    </span>
                    <span className="text-base md:text-lg font-heading font-bold text-white flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AnswerBlock
          question={`Does Highlander serve ${county.name}, North Carolina?`}
          answer={`Yes. Highlander Building Services, Inc. works across ${county.name} from our Franklin, NC base, covering roof repair, roof replacement, metal roofing, gutters, and construction projects for mountain homes and commercial buildings.`}
          points={[
            `Crews across ${county.name}`,
            `Call ${PHONE_PLAIN} to talk with the team`,
            "Roofing and construction handled in-house",
          ]}
        />

        {/* 2. County Intelligence — Authority Section */}
        <section className="py-24 bg-background relative overflow-hidden">
          <TartanBackground opacity={0.02} />
          <div className="container-tight relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <ScrollReveal variant="fade">
                  <span className="eyebrow mb-4 block">{county.name} Intelligence</span>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8 leading-tight text-balance">
                    Regional knowledge. <br />
                    <span className="italic text-primary">Master-class execution.</span>
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-10 font-body">
                    Highlander is more than a regional contractor. We are a specialized mountain defense team. In <span className="text-foreground font-bold">{county.name}</span>, we account for the specific atmospheric and structural realities that lowland builders miss.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex gap-6 items-start group">
                      <div className="w-12 h-12 bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10">
                        <Home className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-foreground mb-2 text-lg uppercase tracking-wider">Housing Profile</h3>
                        <p className="text-muted-foreground leading-relaxed font-body">{county.housingContext}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-6 items-start group">
                      <div className="w-12 h-12 bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center shrink-0 border border-[hsl(var(--highland-gold)/0.2)]">
                        <Wind className="w-6 h-6 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-foreground mb-2 text-lg uppercase tracking-wider">Climate Realities</h3>
                        <p className="text-muted-foreground leading-relaxed font-body">{county.climateRealities}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              <div className="relative">
                <div className="bg-secondary p-8 border border-border relative z-10 shadow-flat">
                  <h3 className="text-sm font-heading font-bold text-foreground mb-8 uppercase tracking-[0.3em] border-b border-border pb-6 flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                    {county.name} Communities
                  </h3>
                  <div className="grid gap-4">
                    {countyTowns.map((town) => (
                      <Link 
                        key={town.slug} 
                        to={`/service-areas/${town.slug}`}
                        className="group block p-5 bg-background border border-border hover:border-primary/30 transition-all shadow-flat hover:shadow-raised"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-heading font-bold text-foreground group-hover:text-primary transition-colors uppercase tracking-tight">{town.name}</span>
                          <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true" />
                        </div>
                        <p className="text-xs text-muted-foreground font-body line-clamp-1">{town.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider variant="diamond" />

        {/* 3. Division Callouts */}
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
          <TartanBackground opacity={0.015} />
          <div className="container-tight relative z-10">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="eyebrow mb-4 block">Division Overview</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">Complete local service.</h2>
              <p className="text-lg text-muted-foreground max-w-2xl font-body leading-relaxed">Highlander serves {county.name} from its Franklin and Sylva showrooms, with roofing and construction handled by one team.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <ScrollReveal variant="rise-subtle">
                <div className="bg-primary p-10 text-white h-full flex flex-col group relative overflow-hidden">
                  <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "200px auto" }} />
                  <Home className="w-6 h-6 text-[hsl(var(--gold-ink))] mb-6" aria-hidden="true" />
                  <h3 className="text-2xl font-heading font-bold mb-4 uppercase tracking-tighter">Roofing</h3>
                  <p className="text-white/90 text-sm mb-8 font-body leading-relaxed">
                    Specialized mountain systems designed for {county.name} weather. Shingle, metal, and premium Brava synthetic installations.
                  </p>
                  <Link to="/roofing" className="mt-auto inline-flex items-center gap-2 font-bold text-[hsl(var(--gold-ink))] hover:gap-4 transition-all text-sm uppercase tracking-widest">
                    Roofing Solutions <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="rise-subtle" delay={0.1}>
                <div className="bg-background border border-border p-10 h-full flex flex-col group shadow-flat relative overflow-hidden">
                  <Hammer className="w-6 h-6 text-primary mb-6" aria-hidden="true" />
                  <h3 className="text-2xl font-heading font-bold mb-4 uppercase tracking-tighter text-foreground">Construction</h3>
                  <p className="text-muted-foreground text-sm mb-8 font-body leading-relaxed">
                    Expanding {county.name} homes with engineered additions, premium outdoor living, and structural modernization.
                  </p>
                  <Link to="/construction" className="mt-auto inline-flex items-center gap-2 font-bold text-primary hover:gap-4 transition-all text-sm uppercase tracking-widest">
                    Construction Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="rise-subtle" delay={0.2}>
                <div className="bg-secondary p-10 h-full flex flex-col group border border-border shadow-flat relative overflow-hidden">
                  <Compass className="w-6 h-6 text-[hsl(var(--gold-ink))] mb-6" aria-hidden="true" />
                  <h3 className="text-2xl font-heading font-bold mb-4 uppercase tracking-tighter text-foreground">Design Support</h3>
                  <p className="text-muted-foreground text-sm mb-8 font-body leading-relaxed">
                    Pre-construction planning, layouts, and site-specific guidance to ensure your {county.name} project is built right from the start.
                  </p>
                  <Link to="/construction/design" className="mt-auto inline-flex items-center gap-2 font-bold text-[hsl(var(--gold-ink))] hover:gap-4 transition-all text-sm uppercase tracking-widest">
                    Planning Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 4. Localized Blog & Knowledge Base */}
        <section className="py-24 bg-background relative overflow-hidden">
          <TartanBackground opacity={0.015} />
          <div className="container-tight relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <ScrollReveal variant="fade">
                  <span className="eyebrow mb-4 block">Regional Intelligence</span>
                </ScrollReveal>
                <HeadingReveal delay={0.1}>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight text-balance">
                    Expertise in <span className="text-primary italic">{county.name}.</span>
                  </h2>
                </HeadingReveal>
                <ScrollReveal variant="rise-subtle" delay={0.2}>
                  <p className="text-lg text-muted-foreground mt-4 font-body leading-relaxed">
                    Explore our field guides on mountain roofing, construction, and local conditions specifically for {county.name} property owners.
                  </p>
                </ScrollReveal>
              </div>
              <ScrollReveal variant="fade" delay={0.3}>
                <Link to="/blog" className="group inline-flex items-center gap-2 text-primary font-heading font-bold text-sm tracking-wide hover:text-primary/80 transition-all border-b border-primary/20 pb-1">
                  Browse All Resources <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </ScrollReveal>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {relevantBlogs.map((post, i) => (
                <ScrollReveal key={post.slug} variant="rise-subtle" delay={i * 0.1}>
                  <Link to={`/blog/${post.slug}`} className="group h-full flex flex-col bg-card border border-border p-8 hover:border-primary/30 transition-all duration-500 shadow-flat hover:shadow-floating relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-caption font-body font-bold uppercase tracking-[0.2em] text-primary/80 bg-primary/5 px-2.5 py-1">
                        {post.category}
                      </span>
                      <div className="h-px flex-1 bg-border/40" />
                    </div>
                    
                    <h3 className="font-heading font-bold text-xl lg:text-2xl mb-4 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8 line-clamp-3 font-body">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-border/40 flex items-center justify-between">
                      <span className="text-primary text-body-xs font-heading font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read Guide <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>

                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                      <BookOpen className="w-6 h-6 -rotate-12" aria-hidden="true" />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Final Conversion Pathway */}
        {(county.permitting || county.faqs?.length) && (
          <section className="py-24 bg-muted/20 border-t border-border">
            <div className="container-tight max-w-3xl">
              {county.permitting && (
                <>
                  <span className="eyebrow mb-4 block">Permitting</span>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                    Permits and inspections in {county.name}
                  </h2>
                  <p className="text-muted-foreground font-body leading-relaxed mb-12">
                    {county.permitting}
                  </p>
                </>
              )}
              {!!county.faqs?.length && (
                <>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                    {county.name}: Frequently Asked
                  </h2>
                  <div className="space-y-6">
                    {county.faqs.map((f, i) => (
                      <div key={i} className="border-b border-border pb-6 last:border-0">
                        <h3 className="font-heading font-bold text-foreground mb-2">{f.q}</h3>
                        <p className="text-muted-foreground font-body leading-relaxed">{f.a}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        <section className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto" }} />
          <div className="container-tight relative z-10 text-center">
            <span className="eyebrow mb-6 block text-[hsl(var(--gold-ink))] uppercase tracking-widest">Start Your Project</span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 leading-tight text-white text-balance">
              Ready to Discuss Your <br className="hidden md:block" /> {county.name} Property?
            </h2>
            <p className="text-xl md:text-2xl text-white/85 max-w-2xl mx-auto mb-12 font-body leading-relaxed font-bold drop-shadow-sm">
              From historic roof replacement to engineered home additions, we provide the highest standard of craftsmanship in {county.name}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/request-inspection" className="btn btn-primary btn-lg md:text-xl min-w-[320px]">
                Start a {county.name} Assessment <ArrowRight className="w-6 h-6" aria-hidden="true" />
              </Link>
              <a href={PHONE_TEL} className="btn btn-secondary btn-lg btn-on-dark min-w-[240px]">
                <Phone className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" /> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        <LocalLinkWeb
          heading={`Explore ${county.name} town by town`}
          intro={`Town landing pages, local service pages, and field guides written for ${county.name} conditions.`}
          groups={getCountyLinkWeb(county.name, county.towns)}
        />
      </main>
      <ConversionTrustBlock variant="band" />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default CountyPage;
