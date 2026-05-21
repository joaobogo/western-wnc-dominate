import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle, Award, Leaf, Clock } from "lucide-react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";
import BuilderPromoBlock from "@/components/builder/BuilderPromoBlock";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getServiceTownEntriesForService } from "@/data/service-town-content";
import { getTownBySlug } from "@/data/towns";

const faqs = [
  { q: "How does Brava compare to real cedar shake?", a: "Brava holds color and profile dramatically longer than cedar in mountain climates. Real cedar cups, splits, and grows moss in the moisture and UV conditions across Highlands and Cashiers." },
  { q: "Is Brava heavy enough to need framing reinforcement?", a: "No. Brava is significantly lighter than natural slate and roughly comparable to architectural asphalt. Existing framing almost always accepts it without modification." },
  { q: "Will Brava be approved by my club community ARB?", a: "Most WNC club community ARBs approve Brava with documentation. We prepare and submit the package including profile and color samples." },
  { q: "What's the lead time on a Brava order?", a: "Brava is made-to-order in your specified color blend. We plan for several weeks of lead time and quote accordingly." },
  { q: "What warranty does Brava carry?", a: "Brava carries a 50-year limited material warranty. We handle registration as part of the install." },
];

const SyntheticRoofing = () => {
  const pairings = getServiceTownEntriesForService("synthetic-brava");
  return (
    <>
      <SEOHead
        title="Brava Synthetic Roofing in Western NC | Shake & Slate | Highlander"
        description="Brava synthetic shake and slate roofing across Highlands, Cashiers, and Western NC. Premium aesthetic, mountain-grade durability, 50-year warranty."
        path="/roofing/brava-synthetic"
        jsonLd={buildPageSchema({
          type: "service",
          service: {
            name: "Brava Synthetic Roofing",
            description: "Brava synthetic shake and slate roofing across Western North Carolina.",
            url: "https://western-wnc-dominate.lovable.app/roofing/brava-synthetic",
            areaServed: "Western North Carolina",
          },
          breadcrumbs: [
            { name: "Home", url: "https://western-wnc-dominate.lovable.app/" },
            { name: "Roofing", url: "https://western-wnc-dominate.lovable.app/roofing" },
            { name: "Brava Synthetic Roofing", url: "https://western-wnc-dominate.lovable.app/roofing/brava-synthetic" },
          ],
          faqs: faqs.map((f) => ({ question: f.q, answer: f.a })),
        })}
      />
      <Header />
      <main>
        <section className="section-padding section-dark pt-32 md:pt-40">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
                Roofing · Premium · Synthetic
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 text-balance">
                Brava Synthetic Shake & Slate Roofing
              </h1>
              <p className="text-dark-section-foreground/70 max-w-2xl text-base md:text-lg mb-8">
                The look of cedar or natural slate, without the weight, the splitting, or the maintenance cycle. Specified and installed as a complete system across Western NC's premium homes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/start-project" className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  Start Your Brava Project <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:8283979211" className="border border-accent/40 text-accent font-bold px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:bg-accent/10 transition-colors">
                  <Phone className="w-5 h-5" /> (828) 397-9211
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-tight grid md:grid-cols-3 gap-6">
            {[
              { icon: Award, title: "50-year warranty", body: "Limited material warranty registered as part of every install." },
              { icon: Leaf, title: "Lightweight composite", body: "Significantly lighter than slate; no structural reinforcement typically required." },
              { icon: Clock, title: "Holds its profile", body: "Color and shape stable through UV, freeze-thaw, and the rainfall load WNC delivers." },
            ].map((b) => (
              <div key={b.title} className="border border-border rounded-lg p-6">
                <b.icon className="w-8 h-8 text-accent mb-3" />
                <div className="font-heading font-bold text-xl mb-2">{b.title}</div>
                <p className="text-foreground/70">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-padding bg-muted/20">
          <div className="container-tight grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl md:text-3xl font-heading font-bold">What we install</h2>
              <ul className="space-y-3">
                {[
                  "Brava Old World Slate — the look of quarried slate at a fraction of the weight",
                  "Brava Cedar Shake — the look of cedar without the splitting, cupping, or moss",
                  "Coordinated color blending specified to the home, not pulled from stock",
                  "Full ice-and-water shield underlayment for mountain climates",
                  "Trim, ridge, and termination detailing installed as a complete system",
                  "ARB submission packages and warranty registration handled for you",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="bg-background border border-border rounded-lg p-6 h-fit sticky top-24">
              <h3 className="font-heading font-bold text-xl mb-2">Request an Assessment</h3>
              <p className="text-sm text-foreground/70 mb-4">Brava projects start with an on-site consultation.</p>
              <InspectionForm />
            </aside>
          </div>
        </section>

        {pairings.length > 0 && (
          <section className="section-padding bg-background">
            <div className="container-tight">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Brava roofing by town</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pairings.map((p) => {
                  const t = getTownBySlug(p.townSlug);
                  if (!t) return null;
                  return (
                    <Link key={p.townSlug} to={`/service-areas/${p.townSlug}/synthetic-brava`} className="border border-border rounded-lg p-5 hover:border-accent transition-colors group">
                      <div className="text-sm text-accent mb-1">{t.county}</div>
                      <div className="font-heading font-bold group-hover:text-accent transition-colors">Brava Synthetic Roofing in {t.name}, NC</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section className="section-padding bg-muted/20">
          <div className="container-tight max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Brava Roofing FAQs</h2>
            <Accordion type="single" collapsible>
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`b-${i}`}>
                  <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-foreground/80">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <BuilderPromoBlock
          variant="band"
          preset="synthetic_upgrade"
          title="Configure your Brava synthetic roof"
          body="An optional guided pathway for homeowners specifying a Brava shake or slate system — profile, color blend, ARB documentation, and detailing. We use it to prepare a precise on-site assessment."
          ctaLabel="Build Your Brava Roof Plan"
        />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default SyntheticRoofing;