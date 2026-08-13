import AnswerBlock from "@/components/seo/AnswerBlock";
import Section from "@/components/layout/Section";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, Phone, MapPin, Mountain,
  CloudLightning, Home
} from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageContext from "@/components/PageContext";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";
import TownLocalServiceBlocks from "@/components/TownLocalServiceBlocks";
import TartanBackground from "@/components/TartanBackground";
import TownProofBlock from "@/components/TownProofBlock";
import NearbyTowns from "@/components/NearbyTowns";
import {
  TownEmergencyBand,
  TownServicesGrid,
  TownFAQ,
  TownEstimateCTA,
  TownCTAStrip,
} from "@/components/town/TownLandingSections";
import { getTownBySlug, getLocalRelevance, towns } from "@/data/towns";
import { getTownProofContent } from "@/data/town-proof";
import { getTownFAQs } from "@/data/town-faqs-generated";
import ConversionTrustBlock from "@/components/trust/ConversionTrustBlock";
import AttributedReviews from "@/components/trust/AttributedReviews";
import LocalProjectProof from "@/components/trust/LocalProjectProof";
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
              alt={`Mountain home in Western North Carolina — Highlander Building Services service area: ${town.name}, ${town.state}`}
              className="w-full h-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[color:var(--scrim-flat)] md:bg-none md:bg-scrim-side" />
            <div aria-hidden="true" className="absolute inset-0 bg-scrim-hero" />
            <TartanBackground opacity={0.03} />
          </div>

          <div className="container-tight relative z-10 px-6 py-24 w-full">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-10 md:h-12 w-1 bg-[hsl(var(--highland-gold))]" />
              <div className="flex flex-col">
                <span className="text-body-sm md:text-body font-heading font-bold text-white tracking-[0.15em] uppercase">Highlander Building Services</span>
                <span className="text-caption md:text-caption font-body font-bold text-[hsl(var(--gold-ink))] uppercase tracking-[0.3em]">{town.name} · {town.county}, {town.state}</span>
              </div>
            </motion.div>

            <div className="max-w-4xl">
              <motion.h1 
                initial={{ opacity: 0, y: 16 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-display-lg md:text-display-xl font-heading font-bold mb-6 text-white tracking-tightest leading-[0.9] drop-shadow-lg"
              >
                Roofing &amp; Construction in{" "}
                <span className="text-[hsl(var(--gold-ink))]">{town.name}, NC</span>
              </motion.h1>

              <PageContext
                division="Roofing & Construction"
                area={`${town.name}, ${town.state} · ${town.county}`}
                tone="dark"
              />

              <motion.p 
                initial={{ opacity: 0, y: 16 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="hidden md:block text-lg md:text-2xl text-white/95 mb-6 max-w-2xl leading-relaxed font-body font-bold drop-shadow-md"
              >
                {town.description}
              </motion.p>

              {/* One genuinely local roofing reality, above the fold */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="mb-10 max-w-2xl border-l-2 border-[hsl(var(--highland-gold))] pl-4 text-body-sm md:text-base text-white/90 font-body leading-relaxed drop-shadow-md"
              >
                <span className="font-bold text-[hsl(var(--gold-ink))]">{town.name} reality: </span>
                {town.climateExposure}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 16 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 md:gap-6"
              >
                <Link to="/request-inspection" className="btn btn-primary btn-lg md:text-body-sm min-w-[300px]">
                  Request an Inspection in {town.name} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
                <a href="tel:+18285247773" className="btn btn-secondary btn-lg btn-on-dark md:text-body-sm min-w-[240px]">
                  <Phone className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" /> (828) 524-7773
                </a>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/40 backdrop-blur-lg">
            <div className="container-tight px-4 sm:px-6 py-4 md:py-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {[
                  { icon: MapPin, label: "Town", value: `${town.name}, ${town.state}` },
                  { icon: Home, label: "County", value: town.county },
                  { icon: Mountain, label: "Elevation", value: town.elevation },
                  { icon: CloudLightning, label: "Local Exposure", value: town.styleTendency }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-caption md:text-body-xs uppercase tracking-widest text-white/85 font-bold mb-1">{stat.label}</span>
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
          answer={`Yes. Highlander Building Services, Inc. is based at 76 Creative Dr, Franklin, NC 28734 and works throughout ${town.name} and the rest of ${town.county}. We handle roof repair, roof replacement, metal roofing, gutters, and construction work built for ${town.name} conditions.`}
          points={[
            `Local crews serving ${town.name}, ${town.state}`,
            "Call 828-524-7773 to reach the team directly",
            `${town.county} permitting and inspection experience`,
            "Estimates scoped in person, not over guesswork",
          ]}
        />

        {/* 2. LOCAL CONDITIONS — what is specific to this town */}
        <Section density="default" className="bg-secondary/40 border-y border-border/60" containerClassName="grid lg:grid-cols-2 gap-12 items-start">
          <ScrollReveal variant="fade">
            <span className="eyebrow mb-4 block">{town.name}, {town.county}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6 leading-tight">
              What roofs face in <span className="text-primary italic">{town.name}</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-body mb-6">
              {town.climateExposure}
            </p>
            {localRelevance && (
              <p className="text-base text-muted-foreground leading-relaxed font-body">
                {localRelevance}
              </p>
            )}
          </ScrollReveal>
          <div className="bg-background p-8 border relative z-10 shadow-flat">
            <h3 className="text-sm font-heading font-bold text-foreground mb-8 uppercase tracking-[0.3em] border-b border-border pb-6 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
              {town.name} Site Realities
            </h3>
            <ul className="space-y-8">
              {[
                { label: "Construction Context", value: town.constructionContext },
                { label: "Style Tendency", value: town.styleTendency },
                { label: "Local Insight", value: town.localVibe },
                { label: "Notable Areas", value: town.notableNeighborhoods.join(", ") },
              ].map((item, i) => (
                <li key={i}>
                  <p className="text-caption font-bold text-[hsl(var(--gold-ink))] uppercase tracking-widest mb-1.5">{item.label}</p>
                  <p className="text-base text-foreground font-body leading-snug">{item.value}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* 3. Storm / emergency band */}
        <TownEmergencyBand town={town} />

        {/* 4. SERVICES FOR THIS TOWN */}
        <TownServicesGrid town={town} />

        <TownLocalServiceBlocks town={town} />

        <TownCTAStrip town={town} />

        {/* 5. TWO LOCAL PROOF POINTS — local work, then local voices */}
        {townProof ? (
          <TownProofBlock town={town} content={townProof} />
        ) : (
          <div className="container-rhythm max-w-7xl pt-8 md:pt-12">
            <LocalProjectProof town={{ name: town.name, slug: town.slug, county: town.county }} category="roofing" />
          </div>
        )}

        <div className="container-rhythm max-w-7xl pt-8 md:pt-12">
          <AttributedReviews town={town.name} category="roofing" />
        </div>

        {/* 6. TOWN-SPECIFIC FAQ */}
        <TownFAQ town={town} faqs={townFaqs} />

        <InspectionForm />

        {/* 7. NEARBY COVERAGE */}
        <NearbyTowns currentTown={town} />

        <LocalLinkWeb
          heading={`Everything we cover in and around ${town.name}, NC`}
          intro={`Local service pages, neighboring towns, ${town.county} coverage, and field guides written for ${town.name} conditions.`}
          groups={getTownLinkWeb(town)}
        />

        {/* 8. CLOSING CTA */}
        <TownEstimateCTA town={town} />
      </main>

      <ConversionTrustBlock variant="band" town={town.name} />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default TownPage;