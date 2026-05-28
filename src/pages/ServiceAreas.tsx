import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Phone, Shield, Award, Mountain, Compass, Users, Star, CloudLightning, Clock } from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TartanBackground from "@/components/TartanBackground";

import StickyMobileCTA from "@/components/StickyMobileCTA";
import { MountainContours } from "@/components/motion/BackgroundTexture";
import { towns } from "@/data/towns";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const serviceStats = [
  { value: "4.9★", label: "Google Rating", detail: "Verified reviews" },
  { value: "8", label: "Counties Served", detail: "Macon · Jackson · Swain · Haywood" },
  { value: "Rapid", label: "Response Time", detail: "Emergency & Standard" },
  { value: "4.9★", label: "Average Rating", detail: "150+ Verified Reviews" },
];

const whyLocal = [
  { icon: Mountain, title: "We Know the Terrain", detail: "Elevation, slope, soil composition, and microclimates affect every project. We've built across this region long enough to know what each town demands." },
  { icon: CloudLightning, title: "We Know the Weather", detail: "From Highlands' 80+ inches of annual rain to Waynesville's ice storms — we spec materials and methods for your area's exact exposure profile." },
  { icon: Users, title: "Local Crews, Not Subcontractors", detail: "Our teams live and work here. They know the roads, the building codes, and the inspectors. No anonymous subcontractor rotation." },
  { icon: Clock, title: "Fast Response Anywhere in WNC", detail: "With offices in Franklin and Sylva, we reach every town in our service area within 45 minutes. Emergency response is prioritized." },
];

const primaryTowns = towns.slice(0, 4);
const secondaryTowns = towns.slice(4);

const ServiceAreas = () => {
  return (
    <>
      <SEOHead
        title="Service Areas | Roofing & Construction Across Western NC"
        description="Highlander Roofing & Construction serves Highlands, Cashiers, Franklin, Sylva, Bryson City, Waynesville, Cullowhee, and Dillsboro. Local crews, Rapid response."
        path="/service-areas"
        jsonLd={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Service Areas", url: "/service-areas" }])}
      />
      <Header />
      <main>
        {/* ═══ HERO — Map-centric, local pride ═══ */}
        <section className="relative min-h-[50vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 section-dark">
            <img 
              src="https://images.unsplash.com/photo-1516706562725-aa47c4701923?auto=format&fit=crop&q=80&w=2000" 
              alt="The mountains of Western North Carolina"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
            <TartanBackground opacity={0.15} variant="dark" />
          </div>

          <MountainContours variant="dark" opacity={0.05} />
          <div className="relative z-10 pt-32 md:pt-40 pb-16 md:pb-20 px-5 md:px-8 lg:px-16">
            <div className="container-tight">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: HIGHLAND_EASE }}
                  className="lg:col-span-7"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <Compass className="w-4 h-4 text-[hsl(var(--highland-gold)/0.5)]" />
                    <span className="text-[10px] font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--highland-gold))]">Service Areas</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-5 leading-[1.06] tracking-tight">
                    We Don't Just Serve<br />
                    These Towns — We<br />
                    <span className="text-[hsl(var(--highland-gold))]">Build in Them Every Week.</span>
                  </h1>
                  <div className="w-16 h-px bg-[hsl(var(--highland-gold)/0.4)] mb-5" />
                  <p className="text-[hsl(var(--dark-section-foreground)/0.55)] text-base md:text-lg leading-relaxed max-w-lg">
                    Locally operated with offices in Franklin and Sylva. Our crews know the roads,
                    the building codes, the inspectors, and the weather patterns that make every
                    town in Western North Carolina unique.
                  </p>
                </motion.div>

                {/* Right: quick stats */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: HIGHLAND_EASE }}
                  className="lg:col-span-5"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {serviceStats.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: HIGHLAND_EASE }}
                        className="border border-[hsl(var(--dark-section-foreground)/0.08)] bg-[hsl(var(--dark-section-foreground)/0.03)] p-4"
                      >
                        <span className="text-2xl font-heading font-bold text-[hsl(var(--highland-gold))] leading-none block mb-1">{stat.value}</span>
                        <span className="text-xs font-heading font-semibold text-[hsl(var(--dark-section-foreground)/0.7)] block">{stat.label}</span>
                        <span className="text-[10px] text-[hsl(var(--dark-section-foreground)/0.35)] font-body">{stat.detail}</span>
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
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="eyebrow mb-3 block">Primary Service Areas</span>
              <h2 className="section-heading mb-4">Home Base Towns</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-muted-foreground text-sm max-w-lg mx-auto font-body">
                Our core service area — where our offices, crews, and local relationships are deepest.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              {primaryTowns.map((town, i) => (
                <motion.div
                  key={town.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <Link
                    to={`/service-areas/${town.slug}`}
                    className="group block bg-card border border-border p-6 md:p-8 hover:border-primary/25 hover:shadow-[0_8px_30px_-8px_hsl(var(--heritage-green)/0.08)] transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="h-px w-full absolute top-0 left-0 right-0 bg-gradient-to-r from-transparent via-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-4 h-4 text-primary" />
                          <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors">{town.name}, NC</h3>
                        </div>
                        <p className="text-muted-foreground/50 text-xs font-body">{town.county}</p>
                      </div>
                      <div className="flex gap-1">
                        <span className="text-[8px] font-body font-bold uppercase tracking-[0.12em] px-2 py-0.5 bg-primary/8 text-primary rounded-sm">Roofing</span>
                        <span className="text-[8px] font-body font-bold uppercase tracking-[0.12em] px-2 py-0.5 bg-[hsl(var(--highland-gold)/0.1)] text-[hsl(var(--highland-gold))] rounded-sm">Construction</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4 line-clamp-3">{town.description}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {town.features.slice(0, 3).map((f) => (
                        <span key={f} className="text-[10px] font-body text-muted-foreground/60 bg-secondary px-2 py-1 rounded-sm">{f}</span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2.5 transition-all font-body">
                      View {town.name} Services <ArrowRight className="w-3.5 h-3.5" />
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
              <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Local Knowledge</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-4 leading-tight">
                Why &#8220;Local&#8221; Isn't Just<br /> a Marketing Claim.
              </h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto" />
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {whyLocal.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="bg-[hsl(var(--dark-section-foreground)/0.04)] border border-[hsl(var(--dark-section-foreground)/0.06)] p-6"
                >
                  <item.icon className="w-6 h-6 text-[hsl(var(--highland-gold)/0.6)] mb-4" />
                  <h3 className="font-heading font-bold text-lg text-[hsl(var(--dark-section-foreground))] mb-2">{item.title}</h3>
                  <p className="text-[hsl(var(--dark-section-foreground)/0.45)] text-sm font-body leading-relaxed">{item.detail}</p>
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
                    className="group block bg-card border border-border p-5 hover:border-primary/20 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-primary/60" />
                      <h3 className="font-heading font-semibold text-base text-foreground group-hover:text-primary transition-colors">{town.name}, NC</h3>
                    </div>
                    <p className="text-muted-foreground/50 text-xs font-body mb-3">{town.county}</p>
                    <p className="text-muted-foreground text-[13px] font-body leading-relaxed line-clamp-2 mb-4">{town.description.slice(0, 100)}…</p>
                    <span className="inline-flex items-center gap-1 text-primary/70 font-medium text-xs group-hover:gap-2 group-hover:text-primary transition-all font-body">
                      View Details <ArrowRight className="w-3 h-3" />
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <span className="eyebrow mb-5 block text-[hsl(var(--highland-gold))]">Your Town, Our Team</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1]">
                Wherever You Are in WNC,<br />
                We're Already Nearby.
              </h2>
              <p className="text-primary-foreground/50 text-base md:text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
                Tell us about your property and we'll connect you with the right team for your area.
                Same standards, same warranty, same crew accountability — regardless of which town you're in.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/consultation"
                  className="group cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 btn-primary-interactive"
                >
                  <span className="relative z-10">Discuss Your Property</span>
                  <ArrowRight className="w-4 h-4 relative z-10 btn-arrow-icon" />
                </Link>
                <a
                  href="tel:8283979211"
                  className="bg-primary-foreground/8 border border-primary-foreground/15 text-primary-foreground font-medium px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-primary-foreground/12 transition-colors"
                >
                  <Phone className="w-4 h-4" /> (828) 397-9211
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-6 mt-8 text-primary-foreground/35 text-xs font-medium uppercase tracking-wider">
                <span>Franklin & Sylva Offices</span>
                <span className="text-primary-foreground/15">•</span>
                <span>45-Min Max Response</span>
                <span className="text-primary-foreground/15">•</span>
                <span>Both Divisions Available</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default ServiceAreas;
