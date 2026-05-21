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
        <section className="section-padding section-dark pt-32 md:pt-40">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 text-accent mb-3">
                <MapPin className="w-4 h-4" />
                <span className="font-semibold text-sm uppercase tracking-wider">{town.county}, {town.state}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-balance">
                Premium Roofing in {town.name}, NC
              </h1>
              <p className="text-dark-section-foreground/70 max-w-2xl text-base md:text-lg mb-8">
                Owner-led roofing built for {town.county.replace(' County','')} weather. Local crews, written scope, photo-documented work — no call centers, no high-pressure quotes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/consultation"
                  className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Request a Roof Assessment <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:8283979211"
                  className="border border-dark-section-foreground/30 text-dark-section-foreground font-semibold px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:bg-dark-section-foreground/10 transition-colors"
                >
                  <Phone className="w-5 h-5" /> Speak With a Project Advisor
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
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                  Local Roofing Expertise in {town.name}
                </h2>
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
