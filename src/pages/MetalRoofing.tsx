import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle, Shield, Wind, Snowflake } from "lucide-react";
import metalImg from "@/assets/gallery/metal-005.webp";
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
        <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img src={metalImg} alt="Metal roofing in WNC" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.6)] via-[hsl(var(--hero-overlay)/0.3)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.5)] via-transparent to-transparent" />
          </div>
          <div className="container-tight relative z-10 pb-16 md:pb-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
                Roofing · Metal
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 text-balance">
                Metal Roofing Built for Mountain Weather
              </h1>
              <p className="text-dark-section-foreground/70 max-w-2xl text-base md:text-lg mb-8">
                Standing seam and exposed-fastener metal systems engineered for Western NC elevation, wind, snow load, and rainfall. Specified and installed as a complete system by an owner-led, licensed contractor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/start-project" className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  Start Your Metal Roof Project <ArrowRight className="w-5 h-5" />
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
              { icon: Shield, title: "40+ year system", body: "Designed as a forever roof — substrate, underlayment, panels, and trims specified together so the warranty actually holds." },
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
          <div className="container-tight grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl md:text-3xl font-heading font-bold">What we install</h2>
              <ul className="space-y-3">
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
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="bg-background border border-border rounded-lg p-6 h-fit sticky top-24">
              <h3 className="font-heading font-bold text-xl mb-2">Request an Assessment</h3>
              <p className="text-sm text-foreground/70 mb-4">Most metal roof assessments are scheduled within 48 hours.</p>
              <InspectionForm />
            </aside>
          </div>
        </section>

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

        <section className="section-padding bg-muted/20">
          <div className="container-tight max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Metal Roofing FAQs</h2>
            <Accordion type="single" collapsible>
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`m-${i}`}>
                  <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-foreground/80">{f.a}</AccordionContent>
                </AccordionItem>
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
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default MetalRoofing;