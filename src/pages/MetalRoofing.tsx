import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle, Shield, Wind, Snowflake, Home, ChevronRight } from "lucide-react";
import metalImg from "@/assets/gallery/metal-005.webp";
import metalMobileHero from "@/assets/heroes/metal-mobile.jpg";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";
import BuilderPromoBlock from "@/components/builder/BuilderPromoBlock";
import CTABlock from "@/components/CTABlock";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getServiceTownEntriesForService } from "@/data/service-town-content";
import { getTownBySlug } from "@/data/towns";
import RelatedLinks from "@/components/RelatedLinks";

const faqs = [
  { q: "How long does a metal roof last in Western NC?", a: "A properly specified and installed standing seam system is a 40+ year roof. Failures we see in the field are almost always install-detail issues at flashings and terminations — not panel failures." },
  { q: "Is metal louder than asphalt inside the home?", a: "Properly installed metal over solid decking and underlayment is not noticeably louder than asphalt. The 'tin roof' sound comes from open framing, not residential metal systems." },
  { q: "Can metal go directly over my existing roof?", a: "Sometimes, but in the WNC mountains we almost always recommend a full tear-off so we can verify decking and install proper underlayment before panels go down." },
  { q: "How is metal priced versus asphalt?", a: "Up front, metal is typically 1.5–2.5× the cost of dimensional asphalt. Over 30+ years it is usually the cheaper roof per year once you include replacement cycles." },
  { q: "What metal profile is right for a mountain home?", a: "Standing seam (concealed fastener) is the premium choice for most designer mountain homes. Exposed-fastener panels still have a place on outbuildings, simple gable roofs, and budget-driven projects." },
];

const MetalRoofing = () => {
  const pairings = getServiceTownEntriesForService("metal-roofing");
  return (
    <>
      <SEOHead
        title="Metal Roofing in Western NC | Standing Seam & Premium Metal | Highlander"
        description="Standing seam and exposed-fastener metal roofing across Franklin, Highlands, Cashiers, and Sylva. Engineered for mountain weather, installed by a licensed contractor."
        path="/roofing/metal"
        jsonLd={buildPageSchema({
          type: "service",
          service: {
            name: "Metal Roofing",
            description: "Standing seam and exposed-fastener metal roofing across Western North Carolina.",
            url: "https://western-wnc-dominate.lovable.app/roofing/metal",
            areaServed: "Western North Carolina",
          },
          breadcrumbs: [
            { name: "Home", url: "https://western-wnc-dominate.lovable.app/" },
            { name: "Roofing", url: "https://western-wnc-dominate.lovable.app/roofing" },
            { name: "Metal Roofing", url: "https://western-wnc-dominate.lovable.app/roofing/metal" },
          ],
          faqs: faqs.map((f) => ({ question: f.q, answer: f.a })),
        })}
      />
      <Header />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative min-h-[65vh] md:min-h-[85vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <picture>
              <source media="(max-width: 767px)" srcSet={metalMobileHero} />
              <img src={metalImg} alt="Standing seam metal roof on a Western North Carolina mountain home" className="w-full h-full object-cover object-[50%_30%] md:object-center" loading="eager" />
            </picture>
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
                  <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-white/85">Roofing</span>
                </Link>
                <ChevronRight className="w-3 h-3 text-white/90" />
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))]">Metal Roofing</span>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.05] tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                  Metal Roofing Built
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h2 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.05] tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                  for Mountain Weather.
                </motion.h2>
              </div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }} className="text-base md:text-lg text-white/90 max-w-xl mb-10 leading-relaxed font-body font-medium drop-shadow-sm">
                Standing seam and exposed-fastener metal systems engineered for Western NC elevation, wind, snow load, and rainfall. Specified and installed as a complete system by a team-led, licensed contractor.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-semibold text-sm px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                  Start Your Metal Roof Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
              { icon: Shield, title: "Long-life system", body: "Designed as a forever roof — substrate, underlayment, panels, and trims specified together so the warranty actually holds." },
              { icon: Wind, title: "Wind-rated", body: "Standing seam panels with concealed clips resist uplift across the Highlands Plateau and exposed mountain ridgelines." },
              { icon: Snowflake, title: "Snow & ice planned", body: "Snow retention designed into the system at walkways, entries, and outdoor living spaces — not bolted on after the fact." },
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
              <h2 className="section-heading mb-4">A Complete Metal Roof<br className="hidden md:block" /> System — Not Just Panels.</h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {[
                "Standing seam metal (concealed fastener) — the premium choice for design-forward mountain homes",
                "Exposed-fastener metal panels — appropriate for outbuildings and budget-driven projects",
                "Full ice-and-water shield underlayment, well past code minimum at eaves and valleys",
                "Snow retention designed for the specific roof, not stocked as a one-size accessory",
                "Coordinated trim and termination detailing so warranties hold across the full assembly",
                "ARB submission packages for club community projects",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-foreground/80 font-body leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─── REQUEST ASSESSMENT (full-width, like the rest of the site) ─── */}
        <InspectionForm />

        {pairings.length > 0 && (
          <section className="section-padding bg-background">
            <div className="container-tight">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Metal roofing by town</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pairings.map((p) => {
                  const t = getTownBySlug(p.townSlug);
                  if (!t) return null;
                  return (
                    <Link key={p.townSlug} to={`/service-areas/${p.townSlug}/metal-roofing`} className="border border-border rounded-lg p-5 hover:border-accent transition-colors group">
                      <div className="text-sm text-accent mb-1">{t.county}</div>
                      <div className="font-heading font-bold group-hover:text-accent transition-colors">Metal Roofing in {t.name}, NC</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ─── FAQS (matches RoofRepair / RoofReplacement) ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Metal Roofing FAQs</span>
              <h2 className="section-heading mb-4">Common Questions About<br className="hidden md:block" /> Metal Roofing.</h2>
            </motion.div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  <AccordionItem value={`m-${i}`} className="bg-card border border-border rounded-sm px-5 md:px-7 data-[state=open]:border-primary/15 data-[state=open]:shadow-sm transition-all duration-300">
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
          preset="metal_upgrade"
          title="Configure your standing seam project"
          body="An optional guided pathway for homeowners upgrading to metal. Specify profile, color direction, snow guards, and mountain-exposure detailing — we use it to prepare a precise on-site assessment."
          ctaLabel="Build Your Metal Roof Plan"
        />
        <CTABlock />
      <RelatedLinks
          eyebrow="Keep Exploring"
          heading="Related pages you may find useful"
          columns={2}
          links={[
            { label: "Roofing Services Hub", href: "/roofing", description: "Full roofing division overview" },
            { label: "Residential Roofing Services", href: "/roofing/residential", description: "Shingle, metal, and cedar options" },
            { label: "Roof Replacement Options", href: "/roofing/roof-replacement", description: "Planning and material selection" },
            { label: "Metal vs Shingle Roof in Western NC", href: "/blog/metal-vs-shingle-roof-western-nc", description: "How the two materials compare" },
            { label: "Best Roofing Materials in Highlands, NC", href: "/blog/best-roofing-materials-highlands-nc", description: "Local-climate-first material guide" },
            { label: "Request an Inspection", href: "/request-inspection", description: "Talk metal specifics with an advisor" }
          ]}
        />
      </main>

      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default MetalRoofing;