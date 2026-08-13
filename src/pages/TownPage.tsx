import AnswerBlock from "@/components/seo/AnswerBlock";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, Phone, MapPin, Mountain, 
  Shield, Star, CloudLightning, Home, HardHat,
  BookOpen
} from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";
import RelatedLinks from "@/components/RelatedLinks";
import TownServiceSections from "@/components/TownServiceSections";
import TownLocalServiceBlocks from "@/components/TownLocalServiceBlocks";
import FeaturedProjects from "@/components/FeaturedProjects";
import SectionDivider from "@/components/SectionDivider";
import TartanBackground from "@/components/TartanBackground";
import BuiltForWNC from "@/components/BuiltForWNC";
import ProjectConcierge from "@/components/ProjectConcierge";
import TownProofBlock from "@/components/TownProofBlock";
import NearbyTowns from "@/components/NearbyTowns";
import {
  TownEmergencyBand,
  TownServicesGrid,
  TownCTABand,
  TownWhyChoose,
  TownFAQ,
  TownEstimateCTA,
  TownCTAStrip,
} from "@/components/town/TownLandingSections";
import { getTownBySlug, getLocalRelevance, towns } from "@/data/towns";
import { getTownProofContent } from "@/data/town-proof";
import { blogPosts } from "@/data/blogs";
import { getTownFAQs } from "@/data/town-faqs-generated";
import { getRelevantBlogsForTown } from "@/data/content-support";
import ConversionTrustBlock from "@/components/trust/ConversionTrustBlock";
import AttributedReviews from "@/components/trust/AttributedReviews";
import WhoShowsUp from "@/components/trust/WhoShowsUp";
import LocalProjectProof from "@/components/trust/LocalProjectProof";
import { getCountyHubLink, getTownBlogLinks, estimateLink } from "@/lib/internal-links";
import LocalLinkWeb from "@/components/LocalLinkWeb";
import { getTownLinkWeb } from "@/lib/local-link-graph";

const TownPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const town = getTownBySlug(slug || "");

  if (!town) {
    return (
      <>
        <Header />
        <main id="main-content" className="section-padding text-center pt-32 min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-heading font-bold text-foreground">Service Area Not Found</h1>
          <Link to="/service-areas" className="text-primary underline mt-4 inline-block">View All Service Areas</Link>
        </main>
        <Footer />
      </>
    );
  }

  const townProof = getTownProofContent(town.slug);
  const relevantBlogs = getRelevantBlogsForTown(town.name);
  const townFaqs = getTownFAQs(town.slug, townProof?.faqs);
  const localRelevance = getLocalRelevance(town.slug);

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
          faqs: townFaqs,
          page: { title: town.metaTitle, description: town.metaDescription },
        })}
      />
      <Header />
      <PageBreadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/service-areas" },
          { name: `${town.name}, ${town.state}`, url: `/service-areas/${town.slug}` },
        ]}
      />
      <main id="main-content">
        {/* 1. Premium Hero */}
        <section className="dark-surface relative min-h-[90svh] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img width={1600} height={1067} loading="eager" fetchPriority="high" decoding="async" 
              src={town.heroImage} 
              alt={`Mountain home in Western North Carolina — Highlander Roofing & Construction service area: ${town.name}, ${town.state}`}
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
                <span className="text-[10px] md:text-[11px] font-body font-bold text-[hsl(var(--gold-ink))] uppercase tracking-[0.3em]">{town.name} · {town.county}, {town.state}</span>
              </div>
            </motion.div>

            <div className="max-w-4xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-display-lg md:text-display-xl font-heading font-bold mb-6 text-white tracking-tightest leading-[0.9] drop-shadow-lg"
              >
                Roofing &amp; Construction in <br />
                <span className="text-[hsl(var(--gold-ink))]">{town.name}, NC</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-lg md:text-2xl text-white/95 mb-6 max-w-2xl leading-relaxed font-body font-bold drop-shadow-md"
              >
                {town.description}
              </motion.p>

              {/* One genuinely local roofing reality, above the fold */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="mb-10 max-w-2xl border-l-2 border-[hsl(var(--highland-gold))] pl-4 text-[15px] md:text-base text-white/90 font-body leading-relaxed drop-shadow-md"
              >
                <span className="font-bold text-[hsl(var(--gold-ink))]">{town.name} reality: </span>
                {town.climateExposure}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 md:gap-6"
              >
                <Link to="/request-inspection" className="cta-gradient cta-glow text-accent-foreground font-heading font-bold text-[15px] md:text-[17px] px-10 py-6 rounded-none inline-flex items-center justify-center gap-3 shadow-2xl min-w-[300px] hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Request an Inspection in {town.name} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:+18285247773" className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-[15px] md:text-[17px] px-10 py-6 rounded-none inline-flex items-center justify-center gap-3 shadow-xl min-w-[240px] hover:bg-white/20 hover:border-white/40 transition-all">
                  <Phone className="w-5 h-5 text-[hsl(var(--gold-ink))]" /> (828) 524-7773
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
                    <span className="text-[11px] md:text-[12px] uppercase tracking-widest text-white/85 font-bold mb-1">{stat.label}</span>
                    <span className="text-base md:text-lg font-heading font-bold text-white flex items-center gap-2">
                      <stat.icon className="w-3.5 h-3.5 text-[hsl(var(--gold-ink))]" />
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AnswerBlock
          question={`Does Highlander do roofing and construction in ${town.name}, ${town.state}?`}
          answer={`Yes. Highlander Roofing Services, Inc. is based at 76 Creative Dr, Franklin, NC 28734 and works throughout ${town.name} and the rest of ${town.county} County. We handle roof repair, roof replacement, metal roofing, gutters, and construction work built for Western North Carolina mountain weather.`}
          points={[
            `Local crews serving ${town.name}, ${town.state}`,
            "Call 828-524-7773 to reach the team directly",
            "Roofing, exteriors, and construction under one contractor",
            "Estimates scoped in person, not over guesswork",
          ]}
        />

        {/* 1.5 Local Relevance — tight, conversion-focused per-town intro */}
        {localRelevance && (
          <section className="py-16 md:py-20 bg-secondary/40 border-y border-border/60">
            <div className="container-tight">
              <ScrollReveal variant="fade">
                <div className="max-w-3xl">
                  <span className="eyebrow mb-4 block">Why {town.name}, {town.state}</span>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6 leading-tight">
                    Local roofing &amp; construction in <span className="text-primary italic">{town.name}</span>
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-body">
                    {localRelevance}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* 1.6 Storm / Emergency band — high-urgency CTA under the fold */}
        <TownEmergencyBand town={town} />

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
                    <h3 className="font-heading font-bold text-foreground mb-2 text-lg uppercase tracking-wider">Local Insight</h3>
                    <p className="text-muted-foreground leading-relaxed font-body">{town.localVibe}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <div className="bg-secondary p-8 border relative z-10 shadow-sm">
              <h4 className="text-sm font-heading font-bold text-foreground mb-8 uppercase tracking-[0.3em] border-b border-border pb-6 flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
                {town.name} Site Realities
              </h4>
              <ul className="space-y-8">
                {[
                  { label: "Construction Context", value: town.constructionContext },
                  { label: "Style Tendency", value: town.styleTendency },
                  { label: "Notable Areas", value: town.notableNeighborhoods.join(', ') }
                ].map((item, i) => (
                  <li key={i}>
                    <p className="text-[11px] font-bold text-[hsl(var(--gold-ink))] uppercase tracking-widest mb-1.5">{item.label}</p>
                    <p className="text-lg text-foreground font-heading font-bold leading-tight">{item.value}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. LOCAL PROOF — real work and real voices from this town first */}
        {townProof && <TownProofBlock town={town} content={townProof} />}

        <FeaturedProjects location={town.name} />

        <div className="container-tight pt-4 md:pt-8 space-y-14">
          <LocalProjectProof town={{ name: town.name, slug: town.slug, county: town.county }} category="roofing" />
          <AttributedReviews town={town.name} category="roofing" />
        </div>

        <WhoShowsUp town={town.name} />

        <TownWhyChoose town={town} />

        {/* 3.5 Mid-page thin CTA strip */}
        <TownCTAStrip town={town} />

        <SectionDivider variant="diamond" />

        {/* 4. SERVICES FOR THIS TOWN */}
        <TownServiceSections town={town} />

        <TownServicesGrid town={town} />

        <TownLocalServiceBlocks town={town} />

        {/* 4.5 Cinematic mid-page CTA band */}
        <TownCTABand town={town} />

        {/* 5. Built for WNC Factors */}
        <BuiltForWNC />

        {/* 7. Localized Blog & Knowledge Base */}
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
          <TartanBackground opacity={0.015} />
          <div className="container-tight relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <ScrollReveal variant="fade">
                  <span className="eyebrow mb-4 block">Knowledge Base</span>
                </ScrollReveal>
                <HeadingReveal delay={0.1}>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                    Researching in <span className="text-primary italic">{town.name}?</span>
                  </h2>
                </HeadingReveal>
                <ScrollReveal variant="rise-subtle" delay={0.2}>
                  <p className="text-lg text-muted-foreground mt-4 font-body leading-relaxed">
                    Mountain projects require specific knowledge. Explore our field guides on roofing, construction, and local conditions.
                  </p>
                </ScrollReveal>
              </div>
              <ScrollReveal variant="fade" delay={0.3}>
                <Link to="/blog" className="group inline-flex items-center gap-2 text-primary font-heading font-bold text-sm tracking-wide hover:text-primary/80 transition-all border-b border-primary/20 pb-1">
                  Browse All Resources <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </ScrollReveal>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {relevantBlogs.map((post, i) => (
                <ScrollReveal key={post.slug} variant="rise-subtle" delay={i * 0.1}>
                  <Link to={`/blog/${post.slug}`} className="group h-full flex flex-col bg-background border border-border p-8 hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-xl relative overflow-hidden">
                    {/* Subtle category badge */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[10px] font-body font-bold uppercase tracking-[0.2em] text-primary/80 bg-primary/5 px-2.5 py-1">
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
                      <span className="text-primary text-[13px] font-heading font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </span>
                      {post.town === town.name && (
                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                          <MapPin className="w-3 h-3" /> Local Info
                        </span>
                      )}
                    </div>

                    {/* Background accent */}
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                      <BookOpen className="w-16 h-16 -rotate-12" />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            {/* Content Depth Bridge */}
            <ScrollReveal variant="fade" delay={0.4}>
              <div className="mt-16 p-8 bg-primary/[0.02] border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/5 flex items-center justify-center rounded-none border border-primary/10">
                    <Mountain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground text-lg mb-1">Established in {town.name}</h4>
                    <p className="text-base text-muted-foreground font-body leading-relaxed max-w-xl">We support every service area with real project data and mountain-proven advice.</p>
                  </div>
                </div>
                <Link to="/recent-projects" className="text-sm md:text-base font-heading font-bold text-foreground hover:text-primary transition-colors flex items-center gap-2 group whitespace-nowrap">
                  View {town.name} Portfolio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <ProjectConcierge />
        
        {/* 7.5 Town-specific FAQ (uses proof FAQs if available) */}
        <TownFAQ town={town} faqs={townFaqs} />

        {/* 7.6 Town-mapped estimate CTA */}
        <TownEstimateCTA town={town} />

        {/* 8. Internal Linking Engine - Nearby Areas */}
        <NearbyTowns currentTown={town} />

        <LocalLinkWeb
          heading={`Everything we cover in and around ${town.name}, NC`}
          intro={`Local service pages, neighboring towns, ${town.county} coverage, and field guides written for ${town.name} conditions.`}
          groups={getTownLinkWeb(town)}
        />

        <div className="container-tight pt-16 md:pt-20 space-y-14">
          <LocalProjectProof town={{ name: town.name, slug: town.slug, county: town.county }} category="roofing" />
          <AttributedReviews town={town.name} category="roofing" />
        </div>
        <WhoShowsUp town={town.name} />
        <InspectionForm />
        <RelatedLinks
          eyebrow="Explore Services"
          heading={`Roofing & construction for ${town.name} homeowners`}
          columns={2}
          links={[
            ...(getCountyHubLink(town.county) ? [getCountyHubLink(town.county)!] : []),
            { label: "Roofing Services Hub", href: "/roofing", description: "Full roofing division overview" },
            { label: "Roof Repair in Western NC", href: "/roofing/roof-repair", description: "Leaks, storm damage, and repair" },
            { label: "Roof Replacement Options", href: "/roofing/roof-replacement", description: "Materials and process" },
            { label: "Metal Roofing for Mountain Homes", href: "/roofing/metal", description: "Standing seam and metal panels" },
            { label: "Construction Division", href: "/construction", description: "Additions, renovations, and more" },
            { label: "Design & Planning Services", href: "/construction/design", description: "Design agreements and planning" },
            { label: "Outdoor Living Projects", href: "/construction/outdoor-living", description: "Porches, decks, and outdoor rooms" },
            ...getTownBlogLinks(town.name, 3),
            estimateLink,
            { label: "Contact Highlander", href: "/contact", description: "Reach a Western NC project advisor" },
          ]}
        />
      </main>
      <ConversionTrustBlock variant="band" town={town.name} />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default TownPage;