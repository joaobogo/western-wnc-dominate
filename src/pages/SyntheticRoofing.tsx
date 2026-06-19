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
  { q: "Is Brava heavy enough to need framing reinforcement?", a: "No. Brava is significantly lighter than natural slate and roughly comparable to standard asphalt shingles. Existing framing almost always accepts it without modification." },
  { q: "Will Brava be approved by my club community ARB?", a: "Most WNC club community ARBs approve Brava with documentation. We prepare and submit the package including profile and color samples." },
  { q: "What's the lead time on a Brava order?", a: "Brava is made-to-order in your specified color blend. We plan for several weeks of lead time and quote accordingly." },
  { q: "What warranty does Brava carry?", a: "Brava carries a manufacturer limited material warranty. We handle registration as part of the install." },
];

const SyntheticRoofing = () => {
  const pairings = getServiceTownEntriesForService("synthetic-brava");
  return (
    <>
      <SEOHead
        title="Brava Synthetic Roofing in Western NC | Shake & Slate | Highlander"
        description="Brava synthetic shake and slate roofing across Highlands, Cashiers, and Western NC. Premium aesthetic, mountain-grade durability, manufacturer warranty."
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
        <section className="relative min-h-[65vh] md:min-h-[85vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" alt="Synthetic shake roofing" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.6)] via-[hsl(var(--hero-overlay)/0.3)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.5)] via-transparent to-transparent" />
          </div>
          <div className="container-tight relative z-10 pb-14 md:pb-20 pt-32 md:pt-40">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <div className="text-[hsl(var(--highland-gold))] text-[10px] font-body font-semibold uppercase tracking-[0.2em] mb-6">
                Roofing · Premium · Synthetic
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-balance text-primary-foreground leading-[1.05] tracking-tight">
                Brava Synthetic Shake & Slate Roofing
              </h1>
              <p className="text-white/85 max-w-2xl text-base md:text-lg mb-8 font-body leading-relaxed">
                The look of cedar or natural slate, without the weight, the splitting, or the maintenance cycle. Specified and installed as a complete system across Western NC's premium homes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/consultation" className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  Start Your Brava Project <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:+18285247773" className="bg-white/5 backdrop-blur-sm border border-white/15 text-primary-foreground font-medium px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                  <Phone className="w-5 h-5" /> (828) 524-7773
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-tight grid md:grid-cols-3 gap-6">
            {[
              { icon: Award, title: "manufacturer warranty", body: "Limited material warranty registered as part of every install." },
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
          <div className="container-tight grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3 space-y-6">
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
            <aside className="lg:col-span-2 bg-background border border-border rounded-lg p-6 md:p-8 h-fit lg:sticky lg:top-24">
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

        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <div className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Brava Roofing FAQs</span>
              <h2 className="section-heading mb-4">Common Questions About<br className="hidden md:block" /> Brava Roofing.</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`b-${i}`} className="bg-card border border-border rounded-sm px-5 md:px-7 data-[state=open]:border-primary/15 data-[state=open]:shadow-sm transition-all duration-300">
                  <AccordionTrigger className="py-5 md:py-6 hover:no-underline gap-4">
                    <span className="font-heading font-semibold text-foreground text-[15px] leading-snug text-left">{f.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pr-2">
                    <p className="text-muted-foreground text-sm leading-relaxed font-body">{f.a}</p>
                  </AccordionContent>
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