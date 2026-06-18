import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone, ArrowRight, HelpCircle } from "lucide-react";
import SEOHead, { breadcrumbSchema, organizationSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

type QA = { q: string; a: string };
type Category = { id: string; label: string; items: QA[] };

const categories: Category[] = [
  {
    id: "inspections",
    label: "Roof Inspections",
    items: [
      { q: "How often should I have my roof inspected in Western North Carolina?", a: "We recommend a professional roof inspection at least once a year, plus after any major storm. WNC weather — wind, hail, ice, and heavy rain — can cause damage that isn't visible from the ground." },
      { q: "Do you charge for roof inspections?", a: "Standard residential roof inspections are free for homeowners in Franklin, Highlands, Cashiers, Sylva, and surrounding Western NC areas. Specialty assessments (forensic or insurance-specific) may include a fee — we'll let you know upfront." },
      { q: "How long does a roof inspection take?", a: "Most residential inspections take 45 to 90 minutes, including a walk-through with you afterward to review findings and photos." },
    ],
  },
  {
    id: "repairs",
    label: "Roof Repairs",
    items: [
      { q: "Can a leak be repaired, or do I need a full roof replacement?", a: "It depends on the age of the roof, the extent of the damage, and the underlying decking condition. Many leaks can be repaired affordably. Contact Highlander for a project-specific assessment before assuming a replacement is needed." },
      { q: "Do you repair other contractors' roofs?", a: "Yes. We frequently repair roofs we didn't install, including correcting workmanship issues from storm chasers or out-of-state crews." },
      { q: "How quickly can you respond to a roof repair?", a: "Most non-emergency repair calls are scheduled within a few business days. Active leaks and storm-related damage are prioritized for same-day or next-day response when possible." },
    ],
  },
  {
    id: "replacement",
    label: "Roof Replacement",
    items: [
      { q: "How long does a roof replacement take?", a: "Most residential roof replacements in WNC take 1 to 3 days of on-site work, depending on size, pitch, and material. Complex metal or specialty systems may take longer." },
      { q: "What roofing materials do you install?", a: "Asphalt shingles (CertainTeed), standing-seam and exposed-fastener metal, synthetic slate and shake, and specialty systems suited to the WNC climate and elevation." },
      { q: "Will you remove my old roof or roof over it?", a: "We strongly recommend a full tear-off and replacement. Roofing over existing layers hides decking issues and can void manufacturer warranties." },
    ],
  },
  {
    id: "storm",
    label: "Storm Damage",
    items: [
      { q: "What should I do immediately after a storm?", a: "Document any visible damage with photos, avoid climbing on the roof yourself, and call Highlander to schedule a free storm-damage inspection. We'll provide a detailed report you can share with your insurance carrier." },
      { q: "Will my insurance cover storm damage to my roof?", a: "It depends on your policy, the cause of damage, and the age of the roof. Many WNC homeowners are covered for wind, hail, and falling-tree damage. We'll help you understand what's likely covered, but your carrier makes the final determination." },
    ],
  },
  {
    id: "insurance",
    label: "Insurance Claims",
    items: [
      { q: "Do you work with my insurance company?", a: "Yes. We routinely document damage, meet adjusters on-site, and provide the photos, measurements, and scope of work your carrier needs to process a claim fairly." },
      { q: "Should I call my insurance company before calling you?", a: "We usually recommend a free Highlander inspection first. If there's no real damage, there's no reason to file. If there is, we'll help you understand what you're filing on before you make the call." },
    ],
  },
  {
    id: "emergency",
    label: "Emergency Roof Leaks",
    items: [
      { q: "What counts as a roofing emergency?", a: "Active interior leaks, missing sections of roofing after a storm, tree impact, or any condition allowing water into your home. Call (828) 524-7773 and we'll prioritize your response." },
      { q: "Do you offer emergency tarping?", a: "Yes. When safe weather conditions allow, we can tarp a damaged roof to stop further water intrusion until permanent repairs can be completed." },
    ],
  },
  {
    id: "metal",
    label: "Metal Roofing",
    items: [
      { q: "Is metal roofing a good choice for the WNC mountains?", a: "Metal is an excellent choice for many Western NC homes — it sheds snow and ice well, performs in high winds, and can last 40+ years with proper installation. We'll help you decide if it's the right fit for your home and budget." },
      { q: "How much more does a metal roof cost compared to shingles?", a: "Metal typically costs more upfront than asphalt shingles, but lasts longer. The exact difference depends on the system you choose. Request an estimate for a side-by-side comparison." },
    ],
  },
  {
    id: "shingle",
    label: "Shingle Roofing",
    items: [
      { q: "What brand of shingles do you install?", a: "We specialize in CertainTeed shingles as a CertainTeed ShingleMaster contractor. Other premium brands can be sourced on request." },
      { q: "How long do asphalt shingles last in Western NC?", a: "Quality dimensional asphalt shingles typically last 25 to 30 years with proper installation and ventilation. Premium shingles can last longer." },
    ],
  },
  {
    id: "commercial",
    label: "Commercial Roofing",
    items: [
      { q: "Do you handle commercial roofing projects?", a: "Yes. Highlander installs and repairs TPO, EPDM, metal, and modified-bitumen systems for commercial properties throughout Western North Carolina." },
      { q: "Can you work around our business hours?", a: "Absolutely. We schedule commercial work to minimize disruption — including evenings, weekends, or phased crews when needed." },
    ],
  },
  {
    id: "residential",
    label: "Residential Roofing",
    items: [
      { q: "What areas do you serve for residential roofing?", a: "Franklin, Highlands, Cashiers, Sylva, and the surrounding Western North Carolina counties — Macon, Jackson, Swain, Haywood, and nearby." },
      { q: "Will my home be protected during the project?", a: "Yes. We protect landscaping, gutters, siding, and the work area with tarps and equipment placement. We clean up daily and perform a magnetic nail sweep at completion." },
    ],
  },
  {
    id: "gutters",
    label: "Gutters",
    items: [
      { q: "Do you install and replace gutters?", a: "Yes. We install seamless aluminum gutters and gutter guards as part of roofing projects or as standalone work. Contact us for a project-specific quote." },
      { q: "Why are gutters important in the WNC mountains?", a: "Heavy mountain rainfall and steep terrain make proper drainage critical. Well-designed gutters protect your foundation, siding, and landscaping from water damage." },
    ],
  },
  {
    id: "construction",
    label: "Construction Projects",
    items: [
      { q: "What construction projects do you take on?", a: "Home additions, renovations, outdoor living spaces, decks, porches, sunrooms, and exterior improvements. We focus on projects that benefit from the same accountability and craft standards as our roofing work." },
      { q: "Are you licensed to perform general construction?", a: "Yes. Highlander Construction operates under an NC General Contractor license, fully insured." },
    ],
  },
  {
    id: "additions",
    label: "Home Additions",
    items: [
      { q: "How long does a home addition typically take?", a: "Most additions take 8 to 16 weeks from groundbreaking, depending on size, complexity, permitting, and material lead times. We'll provide a project-specific schedule before work begins." },
      { q: "Do you handle design as well as construction?", a: "Yes. Highlander offers in-house design services through our paid, three-phase Design & Consultation Agreement — scope, plans and 3D views, then a permit set — so your project is fully defined before construction pricing is finalized." },
    ],
  },
  {
    id: "outdoor",
    label: "Outdoor Living",
    items: [
      { q: "What outdoor living projects do you build?", a: "Decks, screened porches, covered patios, pergolas, and outdoor entertaining spaces designed to handle WNC weather and complement the character of your home." },
      { q: "Can you build outdoor structures on sloped mountain lots?", a: "Yes. Sloped lots are a Highlander specialty — we engineer foundations, drainage, and framing for the realities of mountain terrain." },
    ],
  },
  {
    id: "service-areas",
    label: "Service Areas",
    items: [
      { q: "What towns and counties do you serve?", a: "Franklin, Highlands, Cashiers, Sylva, and the surrounding Western North Carolina region — including Macon, Jackson, Swain, and Haywood counties." },
      { q: "Do you travel outside Western North Carolina?", a: "We focus on Western NC so we can stand behind every project. For projects outside our standard area, contact us and we'll let you know if we can help." },
    ],
  },
  {
    id: "financing",
    label: "Financing",
    items: [
      { q: "Do you offer financing for roofing or construction?", a: "Yes. We offer financing options for qualified homeowners on most projects. See our Financing page or ask your estimator for current programs and rates." },
    ],
  },
  {
    id: "warranties",
    label: "Warranties",
    items: [
      { q: "What warranties do you offer?", a: "Highlander backs our workmanship with a written warranty, in addition to the manufacturer warranties that come with your roofing or building materials. Specific terms vary by project — your estimator will walk you through everything before signing." },
    ],
  },
  {
    id: "timelines",
    label: "Project Timelines",
    items: [
      { q: "How quickly can you start my project?", a: "Lead times vary by season and project type. Storm work and active leaks are prioritized. For planned roofing or construction work, your estimator will give you a realistic start window when we provide your estimate." },
    ],
  },
  {
    id: "cleanup",
    label: "Cleanup",
    items: [
      { q: "What does cleanup look like at the end of a project?", a: "Daily site cleanup during the project, a final detailed cleanup, and a magnetic nail sweep on roofing jobs. We leave the property the way we'd want our own home left." },
    ],
  },
  {
    id: "permits",
    label: "Permits",
    items: [
      { q: "Do I need a permit for my roof or construction project?", a: "Most construction work and many roofing projects require local permits. Highlander handles permitting on your behalf and ensures all work meets WNC code requirements." },
    ],
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: categories.flatMap((c) =>
    c.items.map((qa) => ({
      "@type": "Question",
      name: qa.q,
      acceptedAnswer: { "@type": "Answer", text: qa.a },
    }))
  ),
};

const FAQ = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      <SEOHead
        title="FAQ — Roofing & Construction Questions | Highlander"
        description="Answers to common questions about roofing, repairs, storm damage, insurance, construction, additions, outdoor living, warranties, and permits in Western North Carolina."
        path="/faq"
        jsonLd={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "FAQ", url: "/faq" },
          ]),
          faqJsonLd,
        ]}
      />
      <Header />
      <main>
        {/* HERO */}
        <section className="bg-heritage-charcoal pt-32 md:pt-40 pb-14 md:pb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "300px auto" }} />
          <div className="container-tight relative z-10">
            <span className="text-[11px] md:text-[12px] font-body font-bold uppercase tracking-[0.3em] text-[hsl(var(--highland-gold))] block mb-4">
              Homeowner Questions, Answered
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6 max-w-3xl">
              Frequently Asked <span className="text-[hsl(var(--highland-gold))]">Questions</span>
            </h1>
            <p className="text-white/75 text-lg md:text-xl max-w-2xl leading-relaxed font-body">
              Practical answers about roofing, repairs, storm damage, insurance, construction, and home projects in Western North Carolina. For project-specific guidance, contact Highlander directly.
            </p>
          </div>
        </section>

        {/* CATEGORY NAV */}
        <section className="bg-secondary border-y border-border sticky top-[var(--header-height,80px)] z-30">
          <div className="container-tight py-3 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {categories.map((c) => (
                <a key={c.id} href={`#${c.id}`} className="text-xs md:text-sm font-body font-bold uppercase tracking-wider px-3 py-2 text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-sm transition-colors whitespace-nowrap">
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ CONTENT */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl space-y-14 md:space-y-16">
            {categories.map((cat) => (
              <div key={cat.id} id={cat.id} className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">{cat.label}</h2>
                </div>
                <div className="border-t border-border">
                  {cat.items.map((qa, i) => {
                    const key = `${cat.id}-${i}`;
                    const isOpen = open === key;
                    return (
                      <div key={key} className="border-b border-border">
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : key)}
                          aria-expanded={isOpen}
                          className="w-full text-left py-5 md:py-6 flex items-start justify-between gap-6 group"
                        >
                          <span className="font-heading font-bold text-foreground text-base md:text-lg leading-snug group-hover:text-primary transition-colors">
                            {qa.q}
                          </span>
                          <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 mt-1 transition-transform ${isOpen ? "rotate-180 text-primary" : ""}`} />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <p className="text-muted-foreground font-body leading-relaxed pb-6 pr-10">
                                {qa.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="section-padding bg-primary">
          <div className="container-tight text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="text-primary-foreground/75 mb-8 max-w-xl mx-auto">
              Every home is different. For specific guidance on your roof, repair, or construction project, contact Highlander directly — a real WNC team member will answer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/consultation" className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                Request a Free Estimate <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+18285247773" aria-label="Call Highlander Roofing & Construction at 828-524-7773" className="border border-primary-foreground/30 text-primary-foreground font-semibold px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-primary-foreground/10 transition-colors">
                <Phone className="w-5 h-5" /> Call (828) 524-7773
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default FAQ;