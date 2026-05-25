import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle, MapPin } from "lucide-react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";
import TownProofBlock from "@/components/TownProofBlock";
import BuilderPromoBlock from "@/components/builder/BuilderPromoBlock";
import { getTownBySlug, towns } from "@/data/towns";
import { getTownProofContent } from "@/data/town-proof";
import { services } from "@/data/services";

const TownPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const town = getTownBySlug(slug || "");

  if (!town) {
    return (
      <>
        <SEOHead
          title="Service Area Not Found | Highlander Roofing"
          description="The requested service area was not found. Browse all Western North Carolina locations we serve."
          path={`/service-areas/${slug || ""}`}
          noindex
        />
        <Header />
        <main className="section-padding text-center pt-32">
          <h1 className="text-3xl font-heading font-bold">Town Not Found</h1>
          <Link to="/service-areas" className="text-primary underline mt-4 inline-block">View All Service Areas</Link>
        </main>
        <Footer />
      </>
    );
  }

  const otherTowns = towns.filter(t => t.slug !== slug).slice(0, 4);
  const townProof = getTownProofContent(town.slug);
  const schemaFaqs = townProof?.faqs ?? [];

  return (
    <>
      <SEOHead
        title={town.metaTitle}
        description={town.metaDescription}
        path={`/service-areas/${town.slug}`}
        jsonLd={buildPageSchema({
          type: "town",
          town: {
            name: town.name,
            slug: town.slug,
            county: town.county,
            state: town.state,
            description: town.description,
          },
          faqs: schemaFaqs,
        })}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[60svh] flex flex-col items-center justify-center overflow-hidden">
          {/* Background image + overlay */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" 
              alt={`${town.name}, NC landscapes`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.95)] via-[hsl(var(--hero-overlay)/0.85)] to-[hsl(var(--hero-overlay)/0.4)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay))] via-transparent to-transparent" />
            
            {/* Grain texture */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
          </div>

          <div className="container-tight relative z-10 px-6 md:px-10 lg:px-20 py-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 text-[hsl(var(--highland-gold))] mb-6">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  className="h-px bg-[hsl(var(--highland-gold))]"
                />
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-semibold text-[11px] uppercase tracking-[0.25em]">{town.county}, {town.state}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-primary-foreground tracking-tight max-w-4xl\">\n                Premium Roofing & Construction in <span className=\"text-[hsl(var(--highland-gold))]\">{town.name}, NC</span>\n              </h1>
              
              <p className="text-primary-foreground/70 max-w-2xl text-base md:text-lg mb-10 leading-relaxed font-body">
                Owner-led roofing and construction built for {town.county.replace(' County','')} weather. Local crews, written scope, photo-documented work — no call centers, no high-pressure quotes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/consultation"
                  className="cta-gradient cta-glow text-accent-foreground font-heading font-bold text-[14px] px-10 py-[18px] rounded-none inline-flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 tracking-wide"
                >
                  Request a Project Assessment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:8283979211"
                  className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.12] text-primary-foreground font-semibold text-[14px] px-9 py-[17px] rounded-none inline-flex items-center justify-center gap-2.5 hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-300"
                >
                  <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.6)]" /> (828) 397-9211
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Local Proof + Features */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">\n                  Roofing & Construction Expertise in {town.name}\n                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{town.localProof}</p>
                <ul className="space-y-3">
                  {town.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <div className="bg-secondary rounded-lg p-8">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                    What working with us looks like in {town.name}
                  </h3>
                  <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                    <li className="flex gap-3"><CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /><span><strong className="text-foreground font-semibold">On-site within days.</strong> Local crews, not a dispatch line.</span></li>
                    <li className="flex gap-3"><CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /><span><strong className="text-foreground font-semibold">Written scope before work begins.</strong> You see the plan and the price, in writing.</span></li>
                    <li className="flex gap-3"><CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /><span><strong className="text-foreground font-semibold">Same crew, start to finish.</strong> No subcontracted install work.</span></li>
                    <li className="flex gap-3"><CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /><span><strong className="text-foreground font-semibold">Warranty documentation at walkthrough.</strong> Manufacturer-backed, hand-delivered.</span></li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {townProof ? <TownProofBlock town={town} content={townProof} /> : null}

        <BuilderPromoBlock
          variant="band"
          town={town.name}
          title={`Build Your Roofing Project in ${town.name}`}
          body={`An optional guided pathway for ${town.name}-area homeowners. Specify project type, material, and priorities — we use it to prepare a sharper on-site assessment with mountain-exposure detailing built in.`}
        />

        <BuilderPromoBlock
          mode="construction"
          variant="band"
          town={town.name}
          title={`Plan Your ${town.name} Construction Project`}
          body={`Optional guided pathway for ${town.name}-area additions, porches, decks, outdoor living, and flatwork projects. Sharpens the first conversation — never replaces it.`}
        />

        {/* Services in this town */}
        <section className="section-padding section-dark">
          <div className="container-tight">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
              Our Services in {town.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  to={s.slug.includes("commercial") ? `/${s.slug}` : `/services/${s.slug}`}
                  className="group bg-dark-section-foreground/5 border border-dark-section-foreground/10 rounded-lg p-6 hover:bg-dark-section-foreground/10 hover:border-accent/30 transition-all"
                >
                  <s.icon className="w-8 h-8 text-accent mb-3" />
                  <h3 className="font-heading font-semibold text-dark-section-foreground mb-1 group-hover:text-accent transition-colors">{s.title}</h3>
                  <p className="text-dark-section-foreground/60 text-sm">{s.description.slice(0, 80)}…</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Towns */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Nearby Service Areas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {otherTowns.map((t) => (
                <Link
                  key={t.slug}
                  to={`/service-areas/${t.slug}`}
                  className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <MapPin className="w-5 h-5 text-primary mx-auto mb-2" />
                  <span className="font-heading font-semibold text-foreground">{t.name}</span>
                  <p className="text-muted-foreground text-xs mt-1">{t.county}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link to="/service-areas" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                View All Service Areas <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <InspectionForm />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default TownPage;
