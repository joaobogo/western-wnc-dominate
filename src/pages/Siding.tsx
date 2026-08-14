import CostContextBlock from "@/components/conversion/CostContextBlock";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Shield, CheckCircle, ArrowRight, Phone, 
  Mountain, Droplets, Wind, Sun, Home, Layers,
  HardHat, Award, Clock
} from "lucide-react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import AnswerBlock from "@/components/seo/AnswerBlock";
import CommonConcerns from "@/components/conversion/CommonConcerns";
import TieredOffer from "@/components/conversion/TieredOffer";
import ConversionTrustBlock from "@/components/trust/ConversionTrustBlock";
import WhoShowsUp from "@/components/trust/WhoShowsUp";
import ServiceInternalLinks from "@/components/ServiceInternalLinks";

const Siding = () => {
  const faqs = [
    { q: "What siding material holds up best in Western North Carolina?", a: "Fiber cement (James Hardie) is our most recommended siding for WNC — it handles moisture, temperature swings, and UV exposure better than most alternatives. Cedar and premium composite trim are also strong choices depending on your home and budget." },
    { q: "Can you replace just damaged sections, or do I need full siding replacement?", a: "Many partial replacements are possible, especially after storm damage. Highlander will assess the existing system and recommend the smallest scope that protects the home long-term." },
    { q: "How long does siding installation typically take?", a: "Most residential projects in Franklin, Highlands, Cashiers, and Sylva take 1 to 3 weeks depending on size, complexity, and any required repairs to sheathing or trim." },
    { q: "Do you handle paint, trim, and exterior accents too?", a: "Yes. We coordinate trim, soffit, fascia, and decorative millwork as part of the siding scope. Painting and stain finishes can be included on most projects." },
    { q: "Who installs the siding — subcontractors or your own crews?", a: "Our in-house crews handle siding installation, with the same project manager coordinating trim, roofing, and gutter transitions." },
  ];
  return (
    <>
      <SEOHead
        title="Siding Installation in Western NC | Fiber Cement & Cedar"
        description="Mountain-grade siding installation across Highlands, Franklin, and Sylva. James Hardie fiber cement, natural cedar, and premium moisture-proof trim."
        path="/construction/siding"
        jsonLd={buildPageSchema({
          type: "service",
          service: {
            name: "Siding & Exterior Installation",
            description:
              "Fiber cement, cedar, and composite siding installation with flashing, trim, and moisture management for Western North Carolina homes.",
            url: "/construction/siding",
          },
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Construction", url: "/construction" },
            { name: "Siding & Exterior", url: "/construction/siding" },
          ],
          faqs: faqs.map((f) => ({ question: f.q, answer: f.a })),
        })}
      />
      <Header />
      <PageBreadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Construction", url: "/construction" },
          { name: "Siding & Exterior", url: "/construction/siding" },
        ]}
      />
      <main id="main-content">
        <section className="relative min-h-[60vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img width={1600} height={1067} loading="eager" fetchPriority="high" decoding="async" 
              src="https://images.unsplash.com/photo-1503387762-592dec58ef4e?auto=format&fit=crop&q=80&w=2000" 
              alt="Mountain home with premium siding and exterior finishes"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.7)] via-[hsl(var(--hero-overlay)/0.4)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.4)] via-transparent to-transparent" />
          </div>
          <div className="container-tight relative z-10 pt-32 md:pt-40">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">Construction Division</span>
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-white tracking-tight">Siding & Exterior.</h1>
              <p className="text-white/85 text-lg md:text-xl max-w-2xl mb-8 font-body leading-relaxed">
                Mountain-grade exterior protection. Fiber cement, natural cedar, and premium trim systems engineered for Western NC&apos;s moisture and elevation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/consultation" className="btn btn-primary btn-md group">
                  Get My Siding Scope & Price <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
                <a href="tel:+18285247773" className="btn btn-secondary btn-md btn-on-dark">
                  <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.6)]" aria-hidden="true" /> (828) 524-7773
                </a>
              </div>
            </motion.div>
          </div>
        </section>
        <AnswerBlock
          question="What is siding replacement, and when does a mountain home need it?"
          answer="Siding replacement removes failing exterior cladding and rebuilds the wall's weather barrier with new water-resistive layers, flashing, and finish material. It is typically needed when you see rot, persistent moisture staining, failing paint, or damage after a storm. Highlander handles siding as part of full exterior work across Western North Carolina."
          points={["Wall assembly repaired, not just covered", "Flashing and water-resistive barrier addressed", "Coordinated with roofing, trim, and gutters"]}
        />

        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-6">Built for Mountain Exposure.</h2>
                <p className="text-muted-foreground mb-8">
                  The mountains of Western North Carolina present a unique set of challenges for your home's exterior. High humidity, heavy rainfall, and constant temperature swings require more than just a "standard" siding job.
                </p>
                <ul className="space-y-4">
                  {[
                    "James Hardie fiber cement systems (Rot-proof, Fire-rated)",
                    "Natural cedar shake and lap siding",
                    "Premium PVC and composite trim (rot-resistant)",
                    "Advanced house-wrap and moisture management",
                    "Soffit, fascia, and decorative millwork",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-[hsl(var(--gold-ink))] shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-foreground/80 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative group overflow-hidden">
                <div className="bg-secondary/40 p-8 border border-border relative z-10">
                  <h3 className="text-xl font-heading font-bold mb-4">Why Highlander Siding?</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed font-body">
                    We approach siding as a complete envelope system — not just a cosmetic layer. Every corner, transition, and flashing detail is executed to prevent moisture intrusion, which is the #1 cause of structural decay in WNC homes.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-background border border-border group-hover:border-[hsl(var(--highland-gold)/0.2)] transition-colors">
                      <Droplets className="w-4 h-4 text-[hsl(var(--gold-ink))] mb-2" aria-hidden="true" />
                      <div className="text-caption font-bold uppercase tracking-wider">Moisture Proof</div>
                    </div>
                    <div className="p-4 bg-background border border-border group-hover:border-[hsl(var(--highland-gold)/0.2)] transition-colors">
                      <Wind className="w-4 h-4 text-[hsl(var(--gold-ink))] mb-2" aria-hidden="true" />
                      <div className="text-caption font-bold uppercase tracking-wider">Wind Rated</div>
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 bottom-0 w-1/2 h-1/2 opacity-[0.05] pointer-events-none grayscale translate-x-4 translate-y-4">
                   <img width={1600} height={1067} loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1518005020251-58296d87ba60?auto=format&fit=crop&q=80&w=800" alt="Texture detail" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section-padding bg-secondary">
          <div className="container-tight max-w-3xl">
            <div className="text-center mb-10">
              <span className="eyebrow mb-3 block">Siding FAQ</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">Common Siding Questions</h2>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {faqs.map((qa) => (
                <details key={qa.q} className="group py-5">
                  <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
                    <span className="font-heading font-bold text-foreground text-base md:text-lg leading-snug group-hover:text-primary transition-colors">{qa.q}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 rotate-90 group-open:-rotate-90 transition-transform" aria-hidden="true" />
                  </summary>
                  <p className="text-muted-foreground font-body leading-relaxed mt-3 pr-10">{qa.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <WhoShowsUp />

        {/* ── CLOSING CTA ── */}
        <section className="section-padding bg-primary">
          <div className="container-tight text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
              Ready to Protect Your WNC Home?
            </h2>
            <p className="text-primary-foreground mb-8 max-w-xl mx-auto">
              Request a free siding estimate from Highlander — serving Franklin, Highlands, Cashiers, Sylva, and the surrounding Western North Carolina mountains.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/consultation" className="btn btn-primary btn-md">
                Get My Written Estimate <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a href="tel:+18285247773" aria-label="Call Highlander Building Services at 828-524-7773" className="btn btn-secondary btn-md btn-on-dark">
                <Phone className="w-4 h-4" aria-hidden="true" /> Call (828) 524-7773
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 text-sm">
              <Link to="/construction/renovations" className="text-primary-foreground hover:text-primary-foreground underline-offset-4 hover:underline">Renovations</Link>
              <Link to="/construction/additions" className="text-primary-foreground hover:text-primary-foreground underline-offset-4 hover:underline">Home Additions</Link>
              <Link to="/construction/outdoor-living" className="text-primary-foreground hover:text-primary-foreground underline-offset-4 hover:underline">Outdoor Living</Link>
              <Link to="/roofing" className="text-primary-foreground hover:text-primary-foreground underline-offset-4 hover:underline">Roofing</Link>
            </div>
          </div>
        </section>
        <ServiceInternalLinks title="Siding & Exterior" slug="siding" intent="consultation" />
      </main>
      <CostContextBlock serviceLabel="siding" variant="exterior" />
      <CommonConcerns />
      <TieredOffer context="siding" primaryLabel="Get My Siding Scoped" />
      <ConversionTrustBlock variant="band" category="construction" />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Siding;
