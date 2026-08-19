import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Phone, Shield, Award, Mountain, Compass, Users, Star, CloudLightning, Clock } from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import TartanBackground from "@/components/TartanBackground";

import StickyMobileCTA from "@/components/StickyMobileCTA";
import { MountainContours } from "@/components/motion/BackgroundTexture";
import { towns } from "@/data/towns";
import serviceAreasHeroAsset from "@/assets/service-areas-hero-smokies.jpg.asset.json";
import serviceAreasHeroFallbackAsset from "@/assets/service-areas-hero.jpg.asset.json";
import RealWorkWidget from "@/components/RealWorkWidget";
const SERVICE_AREAS_HERO = serviceAreasHeroAsset.url;
const SERVICE_AREAS_HERO_FALLBACK = serviceAreasHeroFallbackAsset.url;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const serviceStats = [
  { value: "4.9★", label: "Google Rating", detail: "Verified reviews" },
  { 
    value: "10+", 
    label: "Counties Served", 
    detail: (
      <span className="flex gap-1.5 flex-wrap">
        <Link to="/service-areas/county/macon-county" className="hover:text-[hsl(var(--gold-ink))] transition-colors">Macon</Link> · 
        <Link to="/service-areas/county/jackson-county" className="hover:text-[hsl(var(--gold-ink))] transition-colors">Jackson</Link> · 
        <Link to="/service-areas/county/buncombe-county" className="hover:text-[hsl(var(--gold-ink))] transition-colors">Buncombe</Link> · 
        <Link to="/service-areas/county/henderson-county" className="hover:text-[hsl(var(--gold-ink))] transition-colors">Henderson</Link> ·
        <Link to="/service-areas/county/transylvania-county" className="hover:text-[hsl(var(--gold-ink))] transition-colors">Transylvania</Link>
      </span>
    ) 
  },
  { value: "Rapid", label: "Response Time", detail: "Emergency & Standard" },
  { value: "4.9★", label: "Average Rating", detail: "150+ Verified Reviews" },
];

const whyLocal = [
  { icon: Mountain, title: "We Know the Terrain", detail: "Elevation, slope, soil composition, and microclimates affect every project. We've built across this region long enough to know what each town demands." },
  { icon: CloudLightning, title: "We Know the Weather", detail: "From Highlands' 80+ inches of annual rain to Waynesville's ice storms — we spec materials and methods for your area's exact exposure profile." },
  { icon: Users, title: "Local In-House Crews", detail: "Our teams live and work here. They know the roads, the building codes, and the inspectors." },
  { icon: Clock, title: "Fast Response Anywhere in WNC", detail: "With offices in Franklin and Sylva, we reach every town in our service area the same day. Emergency response is prioritized." },
];

const primaryTowns = towns.slice(0, 6);
const secondaryTowns = towns.slice(6);

const ServiceAreas = () => {
  return (
    <>
      <SEOHead
        title="Service Areas | Roofing & Construction Across Western NC"
        description="Highlander Building Services serves Highlands, Cashiers, Franklin, Sylva, Bryson City, Waynesville, Cullowhee, and Dillsboro. Local crews, Rapid response."
        path="/service-areas"
        jsonLd={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Service Areas", url: "/service-areas" }])}
      />
      <Header />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Service Areas", url: "/service-areas" }]} />
      <main id="main-content">
        <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-end overflow-hidden">
          <div className="absolute inset-0 section-dark">
            <img
              src={SERVICE_AREAS_HERO}
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src !== SERVICE_AREAS_HERO_FALLBACK) img.src = SERVICE_AREAS_HERO_FALLBACK;
              }}
              alt="Sunlit Blue Ridge and Smoky Mountains over a Western North Carolina town at golden hour"
              className="w-full h-full object-cover object-[60%_center]"
              width={1920}
              height={1080}
              loading="eager"
              fetchPriority="high"
            />
            {/* Premium readability gradients — keeps the Smoky Mountains bright while
                anchoring the lower-left text area with strong contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.85)] via-[hsl(var(--hero-overlay)/0.25)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.7)] via-[hsl(var(--hero-overlay)/0.1)] to-transparent" />
            <TartanBackground opacity={0.04} variant="dark" />
          </div>

          <MountainContours variant="dark" opacity={0.05} />
          <div className="relative z-10 w-full hero-clears-header pb-24 md:pb-32 px-5 md:px-8 lg:px-16">
            <div className="container-tight">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
                  className="lg:col-span-7"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Compass className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                    <span className="text-body-xs font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--gold-ink))]">Service Areas · Western North Carolina</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-display font-heading font-bold text-white mb-6 leading-[1.05] tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]">
                    We serve Western North Carolina with crews who{" "}
                    <span className="text-[hsl(var(--gold-ink))]">know these towns.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-white max-w-xl mb-10 leading-relaxed font-body font-medium drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
                    Highlander is locally operated, with offices in Franklin and Sylva. Our crews know the roads, the building codes, the inspectors, and the weather patterns that shape every mountain home in this region.
                  </p>
                </motion.div>

                {/* Right: quick stats */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15, ease: HIGHLAND_EASE }}
                  className="lg:col-span-5"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {serviceStats.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: HIGHLAND_EASE }}
                        className="rounded-sm border border-white/25 bg-[hsl(var(--heritage-charcoal)/0.55)] backdrop-blur-xl p-4 md:p-5 shadow-floating"
                      >
                        <span className="text-2xl md:text-3xl font-heading font-bold text-[hsl(var(--gold-ink))] leading-none block mb-2">{stat.value}</span>
                        <span className="text-body-xs font-heading font-bold text-white block uppercase tracking-[0.12em] mb-1.5">{stat.label}</span>
                        <span className="text-body-xs text-white/95 font-body leading-snug block">{stat.detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ PRIMARY TOWNS — Detailed cards ═══ */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center mb-12"
            >
              <span className="eyebrow mb-3 block">Primary Service Areas</span>
              <h2 className="section-heading mb-4">Home Base Towns</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-muted-foreground text-sm max-w-lg mx-auto font-body">
                Our core service area, where our offices, crews, and local relationships are deepest.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              {primaryTowns.map((town, i) => (
                <motion.div
                  key={town.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    to={`/service-areas/${town.slug}`}
                    className="group block bg-card border border-border p-6 md:p-8 hover:border-primary/25 hover:shadow-raised transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="h-px w-full absolute top-0 left-0 right-0 bg-gradient-to-r from-transparent via-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                          <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors">{town.name}, NC</h3>
                        </div>
                        <p className="text-muted-foreground text-body-xs font-body font-bold">{town.county}</p>
                      </div>
                      <div className="flex flex-wrap gap-1 shrink-0">
                        <span className="text-caption font-body font-bold uppercase tracking-[0.12em] px-2 py-1 bg-primary/8 text-primary rounded-sm">Roofing</span>
                        <span className="text-caption font-body font-bold uppercase tracking-[0.12em] px-2 py-1 bg-[hsl(var(--highland-gold)/0.1)] text-[hsl(var(--gold-ink))] rounded-sm">Construction</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4 line-clamp-3">{town.description}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {town.features.slice(0, 3).map((f) => (
                        <span key={f} className="text-body-xs font-body font-bold text-muted-foreground bg-secondary px-3 py-1 rounded-sm">{f}</span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2.5 transition-all font-body">
                      View {town.name} Services <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ WHY LOCAL MATTERS — Dark section ═══ */}
        <section className="section-padding section-dark tartan-dark">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">Local Knowledge</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-4 leading-tight">
                Why &#8220;Local&#8221; Isn't Just<br /> a Marketing Claim.
              </h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto" />
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {whyLocal.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="bg-[hsl(var(--dark-section-foreground)/0.04)] border border-dark-section-border p-6"
                >
                  <item.icon className="w-6 h-6 text-[hsl(var(--highland-gold)/0.6)] mb-4" />
                  <h3 className="font-heading font-bold text-lg text-[hsl(var(--dark-section-foreground))] mb-2">{item.title}</h3>
                  <p className="text-dark-section-muted text-sm font-body leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SECONDARY TOWNS — Compact grid ═══ */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="eyebrow mb-3 block">Extended Coverage</span>
              <h2 className="section-heading mb-4">Additional Communities We Serve</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-muted-foreground text-sm max-w-lg mx-auto font-body">
                Full roofing and construction services — same crews, same standards, same warranty.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {secondaryTowns.map((town, i) => (
                <motion.div
                  key={town.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={`/service-areas/${town.slug}`}
                    className="group block bg-card border border-border p-5 hover:border-primary/20 hover:shadow-flat transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-primary/80" aria-hidden="true" />
                      <h3 className="font-heading font-semibold text-base text-foreground group-hover:text-primary transition-colors">{town.name}, NC</h3>
                    </div>
                    <p className="text-muted-foreground text-xs font-body mb-3">{town.county}</p>
                    <p className="text-muted-foreground text-body-xs font-body leading-relaxed line-clamp-2 mb-4 font-bold">{town.description.slice(0, 100)}…</p>
                    <span className="inline-flex items-center gap-1 text-primary/70 font-medium text-xs group-hover:gap-2 group-hover:text-primary transition-all font-body">
                      View Details <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CLOSING CTA — Location-aware ═══ */}
        <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 tartan-dark opacity-30" />
          <div className="container-tight relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <span className="eyebrow mb-5 block text-[hsl(var(--gold-ink))]">Your Town, Our Team</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1]">
                Wherever You Are in WNC,<br />
                We're Already Nearby.
              </h2>
              <p className="text-primary-foreground text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-body leading-relaxed font-bold drop-shadow-sm">
                Tell us about your property and we'll connect you with the right team for your area.
                Same standards, same warranty, same crew accountability — regardless of which town you're in.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/consultation"
                  className="btn btn-primary btn-lg group md:text-xl min-w-[320px]"
                >
                  <span className="relative z-10">See What My Property Needs</span>
                  <ArrowRight className="w-4 h-4 relative z-10 btn-arrow-icon" aria-hidden="true" />
                </Link>
                <a
                  href="tel:+18285247773"
                  className="btn btn-secondary btn-lg btn-on-dark md:text-xl min-w-[240px]"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" /> (828) 524-7773
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-6 mt-8 text-primary-foreground text-sm font-bold uppercase tracking-wider">
                <span>Franklin & Sylva Offices</span>
                <span className="text-primary-foreground/15">•</span>
                <span>Same-Day Contact</span>
                <span className="text-primary-foreground/15">•</span>
                <span>All Three Divisions Available</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <RealWorkWidget />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default ServiceAreas;
