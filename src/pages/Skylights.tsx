import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle, Sun, Droplets, Wrench, Shield, Award } from "lucide-react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { towns } from "@/data/towns";
import veluxLogo from "@/assets/velux-certified-logo.jpg";

const faqs = [
  { q: "Are you a certified VELUX installer?", a: "Yes. Highlander is a VELUX Certified Installer — trained and accredited by VELUX to install their skylights and Sun Tunnels to manufacturer specification. That accreditation is what unlocks VELUX's installation warranty on top of the product warranty." },
  { q: "Do skylights leak?", a: "Properly installed VELUX skylights with their engineered flashing kit don't leak. Almost every leak we're called out to inspect traces back to a non-kit flashing job, an aging seal on a 20+ year unit, or surrounding roof failure — not the skylight itself." },
  { q: "Can a skylight be added to an existing roof?", a: "In most cases, yes. We coordinate the cut, framing, flashing, and interior light shaft as a single scope so the skylight and the roof system are warrantied together — not handed off between trades." },
  { q: "How long does a VELUX skylight last?", a: "VELUX deck-mounted skylights typically run 20–25 years before the seals and flashings warrant replacement. We document install date and unit IDs at handoff so future service work is straightforward." },
  { q: "Do you replace skylights during a roof replacement?", a: "We strongly recommend it. Reflashing an aging skylight under a brand-new roof is the most common source of preventable leaks we see in the field. Replacement is far cheaper now than a callback later." },
];

const issues = [
  { icon: Droplets, title: "Active leaks around the curb", body: "Usually a flashing kit issue, failed seal on an aging unit, or improper underlayment integration — not the skylight glass itself." },
  { icon: Sun, title: "Condensation on the interior glass", body: "Often a ventilation and humidity issue inside the home, not a skylight defect. We diagnose before we replace." },
  { icon: Wrench, title: "Cracked or fogged glazing", body: "Failed insulating glass unit. The skylight frame can stay; the glazing is replaced as a serviceable component on most VELUX models." },
  { icon: Shield, title: "Old skylights under a new roof", body: "If your skylights are 15+ years old and you're re-roofing, replace them in the same scope. Re-flashing aged units under a new roof is the #1 preventable leak source we see." },
];

const services = [
  "VELUX deck-mounted skylights (fixed, venting, electric, solar-powered)",
  "VELUX Sun Tunnel installation for interior rooms with no roof access",
  "Engineered VELUX flashing kits — never a field-fabricated substitute",
  "Full interior light shaft framing, drywall, and finish coordination",
  "Skylight replacement during roof replacement (single scope, single warranty)",
  "Leak diagnosis, flashing repair, and glazing replacement on existing units",
];

const Skylights = () => {
  return (
    <>
      <SEOHead
        title="VELUX Skylight Installation in Western NC | Highlander Roofing"
        description="VELUX Certified Installer for Franklin, Highlands, Cashiers & Sylva. Skylight installation, replacement, leak repair, and Sun Tunnels — fully warranted, owner-led."
        path="/roofing/skylights"
        jsonLd={buildPageSchema({
          type: "service",
          service: {
            name: "VELUX Skylight Installation",
            description: "VELUX Certified skylight installation, replacement, and repair across Western North Carolina.",
            url: "https://western-wnc-dominate.lovable.app/roofing/skylights",
            areaServed: "Western North Carolina",
          },
          breadcrumbs: [
            { name: "Home", url: "https://western-wnc-dominate.lovable.app/" },
            { name: "Roofing", url: "https://western-wnc-dominate.lovable.app/roofing" },
            { name: "Skylights", url: "https://western-wnc-dominate.lovable.app/roofing/skylights" },
          ],
          faqs: faqs.map((f) => ({ question: f.q, answer: f.a })),
        })}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="section-padding section-dark pt-32 md:pt-40">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-white rounded-sm flex items-center justify-center overflow-hidden">
                  <img src={veluxLogo} alt="VELUX Certified Installer" className="w-full h-full object-contain" />
                </div>
                <span className="text-[10px] md:text-[11px] font-body font-semibold uppercase tracking-[0.25em] text-[hsl(var(--highland-gold))]">
                  VELUX Certified Installer
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 text-balance">
                Skylight Installation & Repair, Done Right.
              </h1>
              <p className="text-dark-section-foreground/70 max-w-2xl text-base md:text-lg mb-8">
                Owner-led, VELUX Certified skylight installation across Western NC. Deck-mounted units, Sun Tunnels, and full leak diagnosis — coordinated with the roof system so the warranty actually holds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/consultation" className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  Request a Skylight Assessment <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:8283979211" className="border border-accent/40 text-accent font-bold px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:bg-accent/10 transition-colors">
                  <Phone className="w-5 h-5" /> (828) 397-9211
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What we install */}
        <section className="section-padding bg-background">
          <div className="container-tight grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider">
                <Award className="w-4 h-4" /> Manufacturer-Accredited Scope
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold">What VELUX Certified installation includes</h2>
              <p className="text-foreground/70">
                A VELUX Certified Installer is trained and accredited by VELUX to install their skylights to spec — flashing kit, underlayment integration, fasteners, and interior shaft all coordinated as one assembly. That's what makes the VELUX installation warranty stick.
              </p>
              <ul className="space-y-3">
                {services.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="bg-secondary/40 border border-border rounded-lg p-6 h-fit">
              <h3 className="font-heading font-bold text-xl mb-2">Request an Assessment</h3>
              <p className="text-sm text-foreground/70 mb-4">Most skylight assessments are scheduled within 48 hours.</p>
              <InspectionForm />
            </aside>
          </div>
        </section>

        {/* Typical issues */}
        <section className="section-padding bg-muted/20">
          <div className="container-tight">
            <div className="max-w-2xl mb-10">
              <div className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">Common Skylight Issues</div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">What we actually see in the field</h2>
              <p className="text-foreground/70">
                Most "bad skylight" calls aren't a defective skylight. Here's what's really happening — and how we diagnose it before recommending a replacement.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {issues.map((i) => (
                <div key={i.title} className="border border-border rounded-lg p-6 bg-background">
                  <i.icon className="w-7 h-7 text-accent mb-3" />
                  <div className="font-heading font-bold text-lg mb-2">{i.title}</div>
                  <p className="text-foreground/70 text-sm leading-relaxed">{i.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related services */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Related roofing services</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { href: "/roofing/roof-replacement", title: "Roof Replacement", desc: "Replace skylights in the same scope as the roof." },
                { href: "/roofing/roof-repair", title: "Roof Repair", desc: "Targeted flashing and leak repair around penetrations." },
                { href: "/roofing/metal", title: "Metal Roofing", desc: "Standing seam systems with skylight integration." },
                { href: "/roofing/storm-damage", title: "Storm Damage", desc: "Hail and impact damage on skylight glazing." },
                { href: "/roofing/brava-synthetic", title: "Brava / Synthetic", desc: "Premium composite roofs with VELUX integration." },
                { href: "/roofing", title: "All Roofing Services", desc: "Browse our full roofing division." },
              ].map((s) => (
                <Link key={s.href} to={s.href} className="border border-border rounded-lg p-5 hover:border-accent transition-colors group">
                  <div className="font-heading font-bold mb-1 group-hover:text-accent transition-colors">{s.title}</div>
                  <p className="text-sm text-foreground/65">{s.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Service areas */}
        <section className="section-padding bg-muted/20">
          <div className="container-tight">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Skylight service across Western NC</h2>
            <p className="text-foreground/70 mb-8 max-w-2xl">VELUX Certified skylight installation and repair throughout our Western North Carolina service area.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {towns.map((t) => (
                <Link
                  key={t.slug}
                  to={`/service-areas/${t.slug}`}
                  className="bg-background border border-border rounded-lg p-4 text-center hover:border-accent/40 hover:shadow transition-all"
                >
                  <div className="font-heading font-semibold text-foreground">{t.name}</div>
                  <p className="text-muted-foreground text-xs mt-1">{t.county}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Skylight FAQs</h2>
            <Accordion type="single" collapsible>
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`sk-${i}`}>
                  <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-foreground/80">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Skylights;