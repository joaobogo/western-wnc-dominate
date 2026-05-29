import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle, MapPin } from "lucide-react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";
import { getTownBySlug, towns } from "@/data/towns";
import {
  getServiceTownEntry,
  getServiceTownEntriesForTown,
} from "@/data/service-town-content";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ServiceTownPage = () => {
  const { townSlug = "", serviceSlug = "" } = useParams();
  const town = getTownBySlug(townSlug);
  const entry = getServiceTownEntry(townSlug, serviceSlug);

  if (!town || !entry) {
    return <Navigate to={town ? `/service-areas/${town.slug}` : "/service-areas"} replace />;
  }

  const relatedForTown = getServiceTownEntriesForTown(townSlug).filter(
    (e) => e.serviceSlug !== serviceSlug,
  );
  const otherTowns = towns.filter((t) => t.slug !== townSlug).slice(0, 4);

  return (
    <>
      <SEOHead
        title={entry.metaTitle}
        description={entry.metaDescription}
        path={`/service-areas/${townSlug}/${serviceSlug}`}
        jsonLd={buildPageSchema({
          type: "town",
          town: {
            name: town.name,
            slug: town.slug,
            county: town.county,
            state: town.state,
            description: entry.intro,
          },
          faqs: entry.faqs.map((f) => ({ question: f.q, answer: f.a })),
        })}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[60svh] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={
                town.slug === 'highlands-nc' ? "https://images.unsplash.com/photo-1600607687920-4e2a12cf1a57?auto=format&fit=crop&q=80&w=2000" :
                town.slug === 'cashiers-nc' ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" :
                town.slug === 'franklin-nc' ? "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=2000" :
                town.slug === 'waynesville-nc' ? "https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=2000" :
                town.slug === 'sylva-nc' ? "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" :
                town.slug === 'bryson-city-nc' ? "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=2000" :
                town.slug === 'cullowhee-nc' ? "https://images.unsplash.com/photo-1513584684374-8bdb7483fe8f?auto=format&fit=crop&q=80&w=2000" :
                town.slug === 'dillsboro-nc' ? "https://images.unsplash.com/photo-1449156001437-3a166a6cb7f2?auto=format&fit=crop&q=80&w=2000" :
                "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=2000"
              } 

              alt={`${entry.serviceLabel} in ${town.name}, NC — Highlander roofing and construction`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.92)] via-[hsl(var(--hero-overlay)/0.75)] to-[hsl(var(--hero-overlay)/0.1)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay))] via-transparent to-transparent opacity-80" />
            
            {/* Subtle Tartan Overlay */}
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto" }} />
          </div>

          <div className="container-tight relative z-10 pt-32 md:pt-40 pb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 text-accent mb-3 text-sm">
                <Link to="/service-areas" className="hover:underline">Service Areas</Link>
                <span>/</span>
                <Link to={`/service-areas/${town.slug}`} className="hover:underline">{town.name}</Link>
                <span>/</span>
                <span className="text-dark-section-foreground/70">{entry.serviceLabel}</span>
              </div>
              <div className="flex items-center gap-2 text-accent mb-3">
                <MapPin className="w-4 h-4" />
                <span className="font-semibold text-sm uppercase tracking-wider">
                  {town.county}, {town.state}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-balance">
                {entry.h1}
              </h1>
              <p className="text-dark-section-foreground/70 max-w-2xl text-base md:text-lg mb-8">
                {entry.intro}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <Link
                  to="/consultation"
                  className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Request a {entry.serviceLabel} Assessment <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:8283979211"
                  className="border border-accent/40 text-accent font-bold px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:bg-accent/10 transition-colors"
                >
                  <Phone className="w-5 h-5" /> Speak With a Project Advisor
                </a>
              </div>
            </motion.div>
          </div>

          {/* Bottom Trust bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/5 bg-black/20 backdrop-blur-md">
            <div className="container-tight px-6 py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: "Service Area", value: `${town.name}, NC` },
                  { label: "Response", value: "Priority" },
                  { label: "Warranty", value: "Highlander Certified" },
                  { label: "Status", value: "Active Division" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold mb-1">{stat.label}</span>
                    <span className="text-sm font-heading font-bold text-white uppercase tracking-tight">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Local context */}
        <section className="section-padding bg-background">
          <div className="container-tight grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                  Why this matters in {town.name}
                </h2>
                <p className="text-foreground/80 leading-relaxed">{entry.localContext}</p>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                  Who this is for
                </h2>
                <p className="text-foreground/80 leading-relaxed">{entry.whoItsFor}</p>
              </div>
              <div className="border-l-2 border-accent pl-6 py-2">
                <p className="text-foreground/90 italic leading-relaxed">{entry.proofNote}</p>
              </div>
            </div>

            {/* Inline lead form */}
            <aside className="bg-muted/30 rounded-lg p-6 h-fit sticky top-24">
              <h3 className="font-heading font-bold text-xl mb-2">
                {entry.serviceLabel} in {town.name}
              </h3>
              <p className="text-sm text-foreground/70 mb-4">
                Tell us the basics. A project advisor responds within as soon as possible — most {town.name} assessments are on the calendar inside 48 hours.
              </p>
              <InspectionForm />
            </aside>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-muted/20">
          <div className="container-tight max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
              {entry.serviceLabel} in {town.name} — Frequently Asked
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {entry.faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-foreground/80">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Related — same town */}
        {relatedForTown.length > 0 && (
          <section className="section-padding bg-background">
            <div className="container-tight">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
                Other services we provide in {town.name}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedForTown.map((r) => (
                  <Link
                    key={r.serviceSlug}
                    to={`/service-areas/${town.slug}/${r.serviceSlug}`}
                    className="border border-border rounded-lg p-5 hover:border-accent transition-colors group"
                  >
                    <div className="flex items-center gap-2 text-accent mb-1 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>{town.name}, NC</span>
                    </div>
                    <div className="font-heading font-bold group-hover:text-accent transition-colors">
                      {r.serviceLabel}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to={`/service-areas/${town.slug}`}
                  className="text-accent font-semibold inline-flex items-center gap-2 hover:underline"
                >
                  See full {town.name} overview <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Other towns */}
        <section className="section-padding bg-muted/20">
          <div className="container-tight">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
              Other Western NC towns we serve
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherTowns.map((t) => (
                <Link
                  key={t.slug}
                  to={`/service-areas/${t.slug}`}
                  className="border border-border rounded-lg p-5 hover:border-accent transition-colors"
                >
                  <div className="flex items-center gap-2 text-accent mb-1 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{t.county}</span>
                  </div>
                  <div className="font-heading font-bold">{t.name}, NC</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default ServiceTownPage;