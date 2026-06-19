import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle, Award, Leaf, Clock, Home, ChevronRight } from "lucide-react";
import bravaHero from "@/assets/gallery/cedar-005.jpg";
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
        {/* ─── HERO ─── */}
        <section className="relative min-h-[65vh] md:min-h-[85vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img src={bravaHero} alt="Brava synthetic shake roofing on a Western North Carolina mountain home" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.75)] via-[hsl(var(--hero-overlay)/0.45)] to-[hsl(var(--hero-overlay)/0.2)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.65)] via-transparent to-[hsl(var(--hero-overlay)/0.25)]" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.6)] to-[hsl(var(--heritage-green)/0)] z-10" />
          <motion.div className="absolute left-0 top-0 w-[2px] z-20" style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "100%" }} transition={{ duration: 2, delay: 0.5 }} />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-14 md:pb-20 pt-32 md:pt-40">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex items-center gap-3 mb-6">
                <Link to="/roofing" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-7 h-7 rounded-sm bg-white/10 flex items-center justify-center"><Home className="w-3.5 h-3.5 text-white" /></div>
                  <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-white/60">Roofing</span>
                </Link>
                <ChevronRight className="w-3 h-3 text-white/70" />
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))]">Brava Synthetic</span>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.05] tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                  Brava Synthetic Shake
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.05] tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                  &amp; Slate Roofing.
                </motion.h1>
              </div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }} className="text-base md:text-lg text-white/90 max-w-xl mb-10 leading-relaxed font-body font-medium drop-shadow-sm">
                The look of cedar or natural slate, without the weight, the splitting, or the maintenance cycle. Specified and installed as a complete system across Western NC's premium homes.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-semibold text-sm px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                  Start Your Brava Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:+18285247773" className="bg-white/5 backdrop-blur-sm border border-white/15 text-white font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" /> (828) 524-7773
                </a>
              </motion.div>
            </div>
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
          <div className="container-tight max-w-4xl">
            <div className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">What We Install</span>
              <h2 className="section-heading mb-4">A Complete Brava System —<br className="hidden md:block" /> Specified for Your Home.</h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
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
                  <span className="text-foreground/80 font-body leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─── REQUEST ASSESSMENT (full-width) ─── */}
        <InspectionForm />

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

        {/* ─── FAQS (matches site-wide style) ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Brava Roofing FAQs</span>
              <h2 className="section-heading mb-4">Common Questions About<br className="hidden md:block" /> Brava Roofing.</h2>
            </motion.div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  <AccordionItem value={`b-${i}`} className="bg-card border border-border rounded-sm px-5 md:px-7 data-[state=open]:border-primary/15 data-[state=open]:shadow-sm transition-all duration-300">
                    <AccordionTrigger className="py-5 md:py-6 hover:no-underline gap-4">
                      <span className="font-heading font-semibold text-foreground text-[15px] leading-snug text-left">{f.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pr-2">
                      <p className="text-muted-foreground text-sm leading-relaxed font-body">{f.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
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