import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield, Users, Mountain, Award, Heart, Eye, Hammer, TreePine, Home, CheckCircle, Star, MapPin, Calendar, Quote } from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import teamPhoto from "@/assets/team-photo.webp";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const values = [
  { icon: Eye, title: "Transparency Over Tactics", description: "We give honest assessments. If your roof doesn't need replacing, we'll tell you. No pressure, no upselling, no manufactured urgency." },
  { icon: Hammer, title: "Craftsmanship as Standard", description: "Every project reflects our personal standard — not the minimum required. We build like we're building for our own family." },
  { icon: Heart, title: "Relationships Over Transactions", description: "We don't chase projects. We earn trust. Most of our work comes from referrals and repeat clients who've seen what we deliver." },
  { icon: Mountain, title: "Mountain-Built Knowledge", description: "We understand what elevation, weather exposure, and WNC terrain demand from a roof and a structure. That knowledge is earned, not taught." },
  { icon: Users, title: "Accountability You Can See", description: "The owner walks your property. Your crew lead is on-site daily. When you call, a real person answers. That's how it should work." },
  { icon: Shield, title: "Licensed, Insured, Certified", description: "Licensed NC General Contractor. CertainTeed Master Shingle Applicator. Fully insured. We carry the credentials because we've earned them." },
];

const craftsmanshipPrinciples = [
  { title: "Material Selection", detail: "We spec materials based on your property's exposure, not the lowest bid. Every component is rated for WNC conditions." },
  { title: "Installation Precision", detail: "Our crews follow manufacturer-exact installation protocols. Shortcuts aren't tolerated — period." },
  { title: "Finish Quality", detail: "We inspect every detail before final walkthrough. Flashing, trim, cleanup — nothing is left incomplete." },
  { title: "Long-Term Accountability", detail: "We're here after the project ends. Warranty support, maintenance guidance, and a team you can actually reach." },
];

const milestones = [
  { year: "2017", event: "Founded in Franklin, NC", detail: "Started with a truck, a ladder, and a commitment to doing roofing right in these mountains." },
  { year: "2019", event: "CertainTeed Master Applicator", detail: "Earned the industry's highest installer certification — awarded to the top 1% nationally." },
  { year: "2021", event: "Second Office in Sylva", detail: "Expanded into Jackson County to better serve the western reaches of our service area." },
  { year: "2022", event: "Construction Division Launched", detail: "Client demand drove expansion into additions, renovations, and outdoor living builds." },
  { year: "2024", event: "Best of Macon County", detail: "Voted Reader's Choice — the recognition that matters most because it comes from our neighbors." },
];

const About = () => {
  return (
    <>
      <SEOHead
        title="About Highlander | Roofing & Construction in Western NC Since Day One"
        description="Meet Highlander Roofing & Construction — a premium roofing and construction company serving Western North Carolina. Licensed, certified, locally owned."
        path="/about"
        jsonLd={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "About", url: "/about" }])}
      />
      <Header />
      <main>
        {/* ── HERO — Cinematic editorial with image overlap ── */}
        <section className="relative min-h-[55vh] md:min-h-[65vh] flex items-end overflow-hidden">
          <div className="absolute inset-0 section-dark tartan-dark" />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[hsl(var(--highland-gold)/0)] via-[hsl(var(--highland-gold)/0.4)] to-[hsl(var(--highland-gold)/0)]" />
          <motion.div className="absolute left-0 top-0 w-[2px]" style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "100%" }} transition={{ duration: 2.2, delay: 0.5, ease: HIGHLAND_EASE }} />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-16 md:pb-24 pt-32 md:pt-40">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex items-center gap-3 mb-6">
                <MapPin className="w-4 h-4 text-[hsl(var(--highland-gold)/0.5)]" />
                <span className="text-[10px] md:text-[11px] font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--highland-gold))]">Franklin & Sylva, North Carolina</span>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: HIGHLAND_EASE }} className="text-4xl md:text-5xl lg:text-[3.75rem] font-heading font-bold text-[hsl(var(--dark-section-foreground))] leading-[1.05] tracking-tight">
                  Built on Trust.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.65, ease: HIGHLAND_EASE }} className="text-4xl md:text-5xl lg:text-[3.75rem] font-heading font-bold tracking-tight leading-[1.05]">
                  <span className="text-[hsl(var(--highland-gold))]">Rooted in These Mountains.</span>
                </motion.h1>
              </div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }} className="text-base md:text-lg text-[hsl(var(--dark-section-foreground)/0.5)] max-w-xl mb-10 leading-relaxed font-body">
                Highlander Roofing & Construction is a family-owned company based in Franklin and Sylva, NC.
                We protect homes and build spaces across Western North Carolina — with the kind of care,
                craft, and accountability that only comes from people who live here.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-heading font-bold text-[15px] px-10 py-4.5 rounded-none inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden tracking-wide">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Talk With Our Team</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:8283979211" className="group bg-white/5 backdrop-blur-sm border border-white/15 text-[hsl(var(--dark-section-foreground))] font-medium text-base px-8 py-4 rounded-none inline-flex items-center justify-center gap-2.5 hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.6)]" /> (828) 397-9211
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TEAM PHOTO — Overlapping editorial block ── */}
        <section className="relative bg-background">
          <div className="container-tight px-4 md:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative -mt-12 md:-mt-20"
            >
              <div className="relative">
                <div className="absolute -inset-3 md:-inset-4 bg-primary/10 rounded-sm -z-10" />
                <div className="absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3 w-24 h-24 md:w-32 md:h-32 bg-accent/20 rounded-sm -z-10" />
                <div className="overflow-hidden rounded-sm shadow-2xl">
                  <img src={teamPhoto} alt="The Highlander Roofing & Construction team — over 20 local professionals serving Western North Carolina" className="w-full object-cover" />
                </div>
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.5 }} className="absolute -bottom-6 left-4 md:left-8 bg-primary text-primary-foreground px-5 py-3 md:px-6 md:py-4 rounded-sm shadow-lg">
                  <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">Est. 2017</p>
                  <p className="text-sm md:text-base font-heading font-bold">20+ Local Professionals</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.5 }} className="absolute -bottom-6 right-4 md:right-8 bg-card border border-border px-4 py-3 md:px-5 md:py-4 rounded-sm shadow-lg flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">2024 Reader's Choice</p>
                    <p className="text-xs md:text-sm font-semibold text-foreground">Best of Macon County</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── OWNER QUOTE — Personal, editorial, unique to About ── */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container-tight max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
              <Quote className="w-8 h-8 text-[hsl(var(--highland-gold)/0.2)] mx-auto mb-6 rotate-180" />
              <blockquote className="text-xl md:text-2xl lg:text-[1.75rem] font-heading font-bold text-foreground leading-[1.3] mb-6 text-balance italic">
                We didn't start this company to be the biggest contractor in the region. We started it because we believed homeowners in these mountains deserved better. Better communication. Better craft. Better follow-through. That's still what drives every project we accept.
              </blockquote>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.3)] mx-auto mb-4" />
              <p className="text-sm font-heading font-bold text-foreground">James McAllister</p>
              <p className="text-xs text-muted-foreground font-body">Owner & Licensed General Contractor</p>
            </motion.div>
          </div>
        </section>

        {/* ── BRAND STORY — Two-column editorial ── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: HIGHLAND_EASE }}>
                <span className="eyebrow mb-3 block">Our Story</span>
                <h2 className="section-heading mb-6">The Name Means<br /> Something Here.</h2>
                <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mb-6" />
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The name Highlander wasn't chosen from a branding playbook. It comes from a quieter
                  place — a respect for highland values that shaped the way this company was built.
                  Resilience. Loyalty. The idea that your work should speak louder than your marketing.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We started this company because we saw too many WNC homeowners getting poor service
                  from out-of-state crews who didn't understand mountain roofing. Storm chasers would
                  roll in after every weather event, do questionable work, and disappear before the
                  first leak showed up.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We're different. We live here. Our kids go to school here. When we put a roof on
                  your home, we drive past it every day. That accountability isn't a policy —
                  it's a way of life.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: HIGHLAND_EASE, delay: 0.15 }}>
                <span className="eyebrow mb-3 block">Who We Are</span>
                <h2 className="section-heading mb-6">Family Roots.<br /> Mountain Standards.</h2>
                <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mb-6" />
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Highlander is a family-owned and operated company with two locations — Franklin and
                  Sylva, NC. We've completed hundreds of roofing and construction projects across
                  Macon, Jackson, Swain, Haywood, and surrounding counties.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Every project is led by our owner, James McAllister — a licensed NC General
                  Contractor and CertainTeed Master Shingle Applicator who personally handles
                  estimates, approves every scope of work, and walks every final inspection.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We don't subcontract critical work. Our in-house crews are trained, vetted, and
                  held to a standard that most contractors don't even set. When your project is
                  done, we want it to reflect who we are — not just what we do.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TIMELINE — Heritage milestones, unique to About ── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <Calendar className="w-5 h-5 text-[hsl(var(--highland-gold)/0.3)] mx-auto mb-4" />
              <h2 className="section-heading mb-4">The Road So Far</h2>
              <p className="text-muted-foreground text-sm max-w-lg mx-auto">Not a linear climb — a series of commitments that built something worth standing behind.</p>
            </motion.div>
            <div className="relative">
              <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`relative flex items-start gap-6 mb-10 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:gap-12`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
                    <span className="text-lg font-heading font-bold text-[hsl(var(--highland-gold))]">{m.year}</span>
                    <h3 className="font-heading font-bold text-foreground text-base mt-1">{m.event}</h3>
                    <p className="text-muted-foreground text-sm font-body mt-1 leading-relaxed">{m.detail}</p>
                  </div>
                  <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[hsl(var(--highland-gold))] border-2 border-background mt-1.5" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="eyebrow mb-3 block">What We Stand For</span>
              <h2 className="section-heading mb-4">Values That Shape Every Decision</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These aren't slogans on a wall. They're the principles that guide how we hire,
                how we plan, and how we build. If we can't do it this way, we don't do it.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} className="card-premium p-6 md:p-8">
                  <div className="w-11 h-11 rounded-sm bg-primary/10 flex items-center justify-center mb-4">
                    <v.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CRAFTSMANSHIP PHILOSOPHY (Dark) ── */}
        <section className="section-padding section-dark tartan-dark">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: HIGHLAND_EASE }}>
                <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Our Philosophy</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-6 leading-tight">
                  Craftsmanship Isn't a<br /> Marketing Word Here.
                </h2>
                <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mb-6" />
                <p className="text-[hsl(var(--dark-section-foreground)/0.7)] leading-relaxed mb-4">
                  In an industry where "quality craftsmanship" is printed on every business card,
                  we understand why that phrase means nothing anymore. So we don't rely on words.
                  We rely on systems.
                </p>
                <p className="text-[hsl(var(--dark-section-foreground)/0.7)] leading-relaxed">
                  Every Highlander project follows the same discipline: careful material selection,
                  manufacturer-exact installation, detailed inspection, and personal accountability
                  from start to finish. The result isn't a promise — it's a pattern you can see
                  in every project we've ever completed.
                </p>
              </motion.div>
              <div className="space-y-4">
                {craftsmanshipPrinciples.map((p, i) => (
                  <motion.div key={p.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="border border-[hsl(var(--highland-gold)/0.12)] rounded-sm p-5 md:p-6 bg-[hsl(var(--dark-section-foreground)/0.03)]">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[hsl(var(--highland-gold))] flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-heading font-semibold text-[hsl(var(--dark-section-foreground))] mb-1">{p.title}</h3>
                        <p className="text-[hsl(var(--dark-section-foreground)/0.6)] text-sm leading-relaxed">{p.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WNC ROOTS ── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="eyebrow mb-3 block">Western North Carolina</span>
              <h2 className="section-heading mb-4">This Is Our Home. Not Our Territory.</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We don't "serve" Western North Carolina like it's a market on a map. We live in these
                mountains. We understand the elevation changes, the weather patterns, the way a north-facing
                slope ages a roof differently than a south-facing one.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: TreePine, title: "Franklin & Sylva Based", detail: "Two local offices. Deep roots in Macon and Jackson counties. We're your neighbors." },
                { icon: Mountain, title: "Elevation-Aware Building", detail: "From 2,000 to 5,000+ feet — we spec materials and methods for your property's specific exposure." },
                { icon: Home, title: "Mountain Architecture", detail: "We understand WNC home styles, proportions, and materials. Our work enhances — never clashes." },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="text-center p-8">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPANSION: Roofing → Construction ── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: HIGHLAND_EASE }}>
                <span className="eyebrow mb-3 block">Our Growth</span>
                <h2 className="section-heading mb-6">From Roofing Specialists to<br /> Full-Service Builders.</h2>
                <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mb-6" />
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We didn't wake up one morning and decide to add "& Construction" to our name.
                  It happened because our clients kept asking. After years of seeing our roofing
                  quality, planning discipline, and communication standards, homeowners began
                  asking: "Can you handle our addition too? What about our outdoor living space?"
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The answer was yes — because the same values that make a great roofing company
                  make a great construction partner. Precision. Accountability. Respect for the home.
                  Communication that doesn't disappear after the contract is signed.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, Highlander's Construction Division handles home additions, renovations,
                  outdoor living builds, and custom projects — all with the same crew quality,
                  project oversight, and finish standards that built our roofing reputation.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: HIGHLAND_EASE, delay: 0.15 }} className="space-y-4">
                {[
                  { label: "Roofing Division", items: ["Residential & Commercial Roofing", "Roof Replacement & Repair", "Storm Damage & Insurance", "Specialty Roofing Systems"] },
                  { label: "Construction Division", items: ["Home Additions & Expansions", "Renovations & Exterior Improvements", "Outdoor Living & Exterior Builds", "Custom Construction Projects"] },
                ].map((division) => (
                  <div key={division.label} className="card-premium p-6">
                    <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      {division.label}
                    </h3>
                    <ul className="space-y-2">
                      {division.items.map((item) => (
                        <li key={item} className="text-muted-foreground text-sm flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TRUST SECTION ── */}
        <section className="section-padding section-dark tartan-dark">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Why Homeowners Trust Us</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-4 leading-tight">
                Trust Is Built. Not Claimed.
              </h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-[hsl(var(--dark-section-foreground)/0.6)] max-w-2xl mx-auto">
                We don't ask you to trust us because we say we're trustworthy. We ask you to look
                at our work, talk to our clients, and see how we operate.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { stat: "500+", label: "Projects completed across WNC" },
                { stat: "4.9★", label: "Average across Google & Facebook" },
                { stat: "24hr", label: "Response time on every inquiry" },
                { stat: "In-House", label: "Crews — never subcontracted" },
              ].map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="text-center p-6 border border-[hsl(var(--highland-gold)/0.1)] rounded-sm">
                  <p className="text-3xl md:text-4xl font-heading font-bold text-[hsl(var(--highland-gold))] mb-2">{item.stat}</p>
                  <p className="text-[hsl(var(--dark-section-foreground)/0.6)] text-sm">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ── */}
        <section className="section-padding bg-primary">
          <div className="container-tight text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: HIGHLAND_EASE }}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
                Ready to Work With a Team<br /> That Builds Like It Matters?
              </h2>
              <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
                Start a conversation with our team — no pressure, no upselling. Just honest advice
                from people who build in these mountains every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/consultation" className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  Talk With Our Team <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:8283979211" className="border border-primary-foreground/30 text-primary-foreground font-semibold px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-primary-foreground/10 transition-colors">
                  <Phone className="w-5 h-5" /> (828) 397-9211
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-6 mt-8 text-primary-foreground/50 text-xs font-medium uppercase tracking-wider">
                <span>Licensed & Insured</span>
                <span className="text-primary-foreground/20">•</span>
                <span>CertainTeed Master Applicator</span>
                <span className="text-primary-foreground/20">•</span>
                <span>In-House Crews</span>
                <span className="text-primary-foreground/20">•</span>
                <span>WNC Specialists</span>
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

export default About;
