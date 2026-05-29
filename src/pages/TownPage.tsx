// Standardizing content and layout for TownPage.tsx
// All towns must have:
// - Hero image + localized hero text
// - Localized authority block
// - Two-column dual-pathway (Roofing | Construction)
// - Proof moment / Testimonials
// - FAQ block (localized)
// - Related content (blog posts)
// - CTA structure

import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, Phone, MapPin, Mountain, 
  Shield, Star, CloudLightning, Home
} from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";
import TwoPillars from "@/components/TwoPillars";
import FeaturedProjects from "@/components/FeaturedProjects";
import ServicesGrid from "@/components/ServicesGrid";
import SectionDivider from "@/components/SectionDivider";
import TartanBackground from "@/components/TartanBackground";
import BuiltForWNC from "@/components/BuiltForWNC";
import ProjectConcierge from "@/components/ProjectConcierge";
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
  const schemaFaqs = townProof?.faqs ?? [];
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
          faqs: schemaFaqs,
        })}
      />
      <Header />
      <main>
        {/* 1. Standardized Hero */}
        <section className="relative min-h-[85svh] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={town.heroImage} alt={`${town.name} roofing and construction`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="container-tight relative z-10 px-6 py-24 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-display-lg md:text-display-xl font-heading font-bold mb-6 text-white tracking-tight leading-[0.9]">
              Highlander Roofing & Construction <br />
              <span className="text-[hsl(var(--highland-gold))] italic">for {town.name}.</span>
            </motion.h1>
            <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-body font-medium">
              {town.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/consultation" className="cta-gradient text-accent-foreground font-bold px-8 py-4">Request Assessment</Link>
            </div>
          </div>
        </section>

        {/* 2. Authority Section */}
        <section className="py-24 bg-background">
          <div className="container-tight grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="eyebrow mb-4 block">{town.county} Authority</span>
              <h2 className="text-4xl font-heading font-bold mb-6">Expertise for {town.name} Realities</h2>
              <p className="text-lg text-muted-foreground mb-8">{town.constructionContext}</p>
              <div className="grid grid-cols-2 gap-4">
                {town.features.map(f => (
                  <div key={f} className="flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /> {f}</div>
                ))}
              </div>
            </div>
            <div className="bg-secondary p-8 border">
              <h4 className="font-bold mb-4">Area Highlights</h4>
              <ul className="space-y-4">
                <li><strong className="text-primary">Style:</strong> {town.styleTendency}</li>
                <li><strong className="text-primary">Climate:</strong> {town.climateExposure}</li>
                <li><strong className="text-primary">Notable Neighborhoods:</strong> {town.notableNeighborhoods.join(', ')}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Standard Pillars */}
        <TwoPillars />

        {/* 4. Featured Projects */}
        <FeaturedProjects />

        {/* 5. Built for WNC */}
        <BuiltForWNC />

        {/* 6. FAQ Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container-tight">
            <h2 className="text-3xl font-heading font-bold text-center mb-16">{town.name} Homeowner FAQs</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {schemaFaqs.map((faq, i) => (
                <div key={i} className="bg-background p-6 border shadow-sm">
                  <h4 className="font-bold mb-3">{faq.question}</h4>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProjectConcierge />
        <InspectionForm />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default TownPage;