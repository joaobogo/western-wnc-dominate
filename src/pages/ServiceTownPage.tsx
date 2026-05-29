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
import { blogPosts } from "@/data/blogs";
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
              src={town.heroImage} 
              alt={`${entry.serviceLabel} in ${town.name}, NC — Highlander roofing and construction`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.4)] via-[hsl(var(--hero-overlay)/0.2)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.35)] via-transparent to-transparent" />
            
            {/* Heritage Tartan Accent — Restrained and Subtle */}
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "300px auto" }} />
            
            {/* Subtle Bottom Heritage Trim */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[url('/tartan.png')] bg-repeat-x bg-[length:100px_auto] opacity-30 z-30" />
          </div>

          <div className="container-tight relative z-10 pt-32 md:pt-40 pb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 text-[hsl(var(--highland-gold))] mb-4 text-sm font-body font-bold uppercase tracking-wider">
                <Link to="/service-areas" className="hover:underline">Service Areas</Link>
                <span>/</span>
                <Link to={`/service-areas/${town.slug}`} className="hover:underline">{town.name}</Link>
                <span>/</span>
                <span className="text-white/70">{entry.serviceLabel}</span>
              </div>
              <div className="flex items-center gap-2 text-[hsl(var(--highland-gold))] mb-6">
                <MapPin className="w-4 h-4" />
                <span className="font-bold text-sm uppercase tracking-[0.2em]">
                  {town.county}, {town.state}
                </span>
              </div>
              <h1 className="text-display-lg md:text-display-xl font-heading font-bold mb-4 text-balance leading-[0.95] tracking-tightest text-white">
                {entry.h1}
              </h1>
              <p className="text-body-lg md:text-body-xl text-white/85 max-w-2xl mb-10 leading-relaxed font-medium drop-shadow-sm">
                {entry.intro}
              </p>
              <div className="flex flex-col sm:flex-row gap-5 mb-16">
                <Link
                  to="/consultation"
                  className="cta-gradient text-accent-foreground font-heading font-bold text-[16px] md:text-[18px] px-10 py-5 rounded-none inline-flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-2xl border border-[hsl(var(--highland-gold)/0.4)] min-w-[280px]"
                >
                  Request a {entry.serviceLabel} Assessment <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:8283979211"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-[16px] md:text-[18px] px-10 py-5 rounded-none inline-flex items-center justify-center gap-3 hover:bg-white/20 hover:border-white/30 transition-all duration-300 shadow-xl min-w-[240px]"
                >
                  <Phone className="w-5 h-5 text-[hsl(var(--highland-gold))]" /> (828) 397-9211
                </a>
              </div>
            </motion.div>
          </div>

          {/* Bottom Trust bar — Balanced for all devices */}
          <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/40 backdrop-blur-lg">
            <div className="container-tight px-4 sm:px-6 py-4 md:py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {[
                  { label: "Service Area", value: `${town.name}, NC` },
                  { label: "Response", value: "Priority" },
                  { label: "Warranty", value: "Highlander Certified" },
                  { label: "Status", value: "Active Division" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-white/60 font-bold mb-0.5 md:mb-1">{stat.label}</span>
                    <span className="text-xs md:text-sm font-heading font-bold text-white uppercase tracking-tight">
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

        {/* Knowledge Base Integration */}
        <section className="section-padding bg-muted/10 border-t border-border">
          <div className="container-tight">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="eyebrow mb-3 block">Expertise</span>
                <h3 className="text-3xl font-heading font-bold">{entry.serviceLabel} Insights</h3>
                <p className="text-muted-foreground mt-2 font-body">Expert guidance on {entry.serviceLabel.toLowerCase()} in {town.name}.</p>
              </div>
              <Link to="/blog" className="text-sm font-bold text-primary inline-flex items-center gap-2 hover:gap-3 transition-all border-b border-primary/20 pb-1 group">
                Full Knowledge Base <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts
                .filter(b => b.category.toLowerCase().includes(entry.serviceLabel.toLowerCase().split(' ')[0]) || b.town === town.name)
                .slice(0, 3)
                .map((post) => (
                  <Link 
                    key={post.slug} 
                    to={`/blog/${post.slug}`}
                    className="group bg-card border border-border p-6 hover:border-primary/30 transition-all flex flex-col h-full shadow-sm hover:shadow-lg"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-none bg-primary/5 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-primary rotate-[-45deg]" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60">{post.category}</span>
                    </div>
                    <h4 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-3 leading-tight">{post.title}</h4>
                    <p className="text-sm text-muted-foreground mb-6 line-clamp-3 font-body flex-grow">{post.excerpt}</p>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-primary flex items-center gap-2 group-hover:gap-4 transition-all">
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
            </div>
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

        {/* Final Conversion Pathway */}
        <section className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto" }} />
          <div className="container-tight relative z-10 text-center">
            <span className="eyebrow mb-6 block text-[hsl(var(--highland-gold))]">Start Your Project</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 leading-tight">
              Ready to Upgrade Your <br className="hidden md:block" /> {town.name} Property?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 font-body leading-relaxed">
              Our {town.name} division specializes in {entry.serviceLabel} and residential construction. Let's discuss your scope and timing today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/consultation" className="cta-gradient text-accent-foreground font-heading font-bold text-lg px-12 py-6 rounded-none inline-flex items-center gap-3 hover:scale-105 transition-all shadow-2xl min-w-[280px] justify-center">
                Request a {entry.serviceLabel} Assessment <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:8283979211" className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg px-12 py-6 rounded-none inline-flex items-center justify-center gap-3 hover:bg-white/20 transition-all min-w-[240px]">
                <Phone className="w-5 h-5 text-[hsl(var(--highland-gold))]" /> (828) 397-9211
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

export default ServiceTownPage;