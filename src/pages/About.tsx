import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield, Users, Mountain, Award, Heart, Eye, Hammer, TreePine, Home, CheckCircle } from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import teamPhoto from "@/assets/team-photo.webp";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const values = [
  {
    icon: Eye,
    title: "Transparency Over Tactics",
    description: "We give honest assessments. If your roof doesn't need replacing, we'll tell you. No pressure, no upselling, no manufactured urgency.",
  },
  {
    icon: Hammer,
    title: "Craftsmanship as Standard",
    description: "Every project reflects our personal standard — not the minimum required. We build like we're building for our own family.",
  },
  {
    icon: Heart,
    title: "Relationships Over Transactions",
    description: "We don't chase projects. We earn trust. Most of our work comes from referrals and repeat clients who've seen what we deliver.",
  },
  {
    icon: Mountain,
    title: "Mountain-Built Knowledge",
    description: "We understand what elevation, weather exposure, and WNC terrain demand from a roof and a structure. That knowledge is earned, not taught.",
  },
  {
    icon: Users,
    title: "Accountability You Can See",
    description: "The owner walks your property. Your crew lead is on-site daily. When you call, a real person answers. That's how it should work.",
  },
  {
    icon: Shield,
    title: "Licensed, Insured, Certified",
    description: "Licensed NC General Contractor. CertainTeed Master Shingle Applicator. Fully insured. We carry the credentials because we've earned them.",
  },
];

const craftsmanshipPrinciples = [
  { title: "Material Selection", detail: "We spec materials based on your property's exposure, not the lowest bid. Every component is rated for WNC conditions." },
  { title: "Installation Precision", detail: "Our crews follow manufacturer-exact installation protocols. Shortcuts aren't tolerated — period." },
  { title: "Finish Quality", detail: "We inspect every detail before final walkthrough. Flashing, trim, cleanup — nothing is left incomplete." },
  { title: "Long-Term Accountability", detail: "We're here after the project ends. Warranty support, maintenance guidance, and a team you can actually reach." },
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
        {/* ── HERO ── */}
        <section className="relative section-dark pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 tartan-dark" />
          <div className="container-tight relative z-10 px-5 md:px-8 lg:px-16">
            <motion.div {...fadeUp} className="max-w-3xl">
              <span className="eyebrow mb-4 block text-[hsl(var(--highland-gold))]">About Highlander</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-6 leading-[1.1]">
                Built on Trust.<br />
                <span className="text-[hsl(var(--highland-gold))]">Rooted in These Mountains.</span>
              </h1>
              <div className="w-16 h-px bg-[hsl(var(--highland-gold)/0.4)] mb-6" />
              <p className="text-[hsl(var(--dark-section-foreground)/0.7)] text-base md:text-lg leading-relaxed max-w-2xl">
                Highlander Roofing & Construction is a family-owned company based in Franklin and Sylva, NC. 
                We protect homes and build spaces across Western North Carolina — with the kind of care, 
                craft, and accountability that only comes from people who live here.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── TEAM PHOTO — Editorial Hero Block ── */}
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
                  <img
                    src={teamPhoto}
                    alt="The Highlander Roofing & Construction team — over 20 local professionals serving Western North Carolina"
                    className="w-full object-cover"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute -bottom-6 left-4 md:left-8 bg-primary text-primary-foreground px-5 py-3 md:px-6 md:py-4 rounded-sm shadow-lg"
                >
                  <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">Est. 2017</p>
                  <p className="text-sm md:text-base font-heading font-bold">20+ Local Professionals</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -bottom-6 right-4 md:right-8 bg-card border border-border px-4 py-3 md:px-5 md:py-4 rounded-sm shadow-lg flex items-center gap-3"
                >
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

        {/* ── BRAND STORY ── */}
        <section className="section-padding bg-background pt-24 md:pt-32">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
              <motion.div {...fadeUp}>
                <span className="eyebrow mb-3 block">Our Story</span>
                <h2 className="section-heading mb-6">
                  The Name Means<br /> Something Here.
                </h2>
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
              <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
                <span className="eyebrow mb-3 block">Who We Are</span>
                <h2 className="section-heading mb-6">
                  Family Roots.<br /> Mountain Standards.
                </h2>
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

        {/* ── VALUES ── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="eyebrow mb-3 block">What We Stand For</span>
              <h2 className="section-heading mb-4">
                Values That Shape Every Decision
              </h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These aren't slogans on a wall. They're the principles that guide how we hire, 
                how we plan, and how we build. If we can't do it this way, we don't do it.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="card-premium p-6 md:p-8"
                >
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
              <motion.div {...fadeUp}>
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
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="border border-[hsl(var(--highland-gold)/0.12)] rounded-sm p-5 md:p-6 bg-[hsl(var(--dark-section-foreground)/0.03)]"
                  >
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
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="eyebrow mb-3 block">Western North Carolina</span>
              <h2 className="section-heading mb-4">
                This Is Our Home. Not Our Territory.
              </h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We don't "serve" Western North Carolina like it's a market on a map. We live in these 
                mountains. We understand the elevation changes, the weather patterns, the way a north-facing 
                slope ages a roof differently than a south-facing one. That knowledge isn't taught in a 
                training manual — it's earned over years of building here.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: TreePine, title: "Franklin & Sylva Based", detail: "Two local offices. Deep roots in Macon and Jackson counties. We're your neighbors." },
                { icon: Mountain, title: "Elevation-Aware Building", detail: "From 2,000 to 5,000+ feet — we spec materials and methods for your property's specific exposure." },
                { icon: Home, title: "Mountain Architecture", detail: "We understand WNC home styles, proportions, and materials. Our work enhances — never clashes." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center p-8"
                >
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
              <motion.div {...fadeUp}>
                <span className="eyebrow mb-3 block">Our Growth</span>
                <h2 className="section-heading mb-6">
                  From Roofing Specialists to<br /> Full-Service Builders.
                </h2>
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
              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.15 }}
                className="space-y-4"
              >
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
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Why Homeowners Trust Us</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-4 leading-tight">
                Trust Is Built. Not Claimed.
              </h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-[hsl(var(--dark-section-foreground)/0.6)] max-w-2xl mx-auto">
                We don't ask you to trust us because we say we're trustworthy. We ask you to look 
                at our work, talk to our clients, and see how we operate. The proof is in the pattern.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { stat: "Hundreds", label: "of projects completed across WNC" },
                { stat: "4.9★", label: "average across Google & Facebook reviews" },
                { stat: "24hr", label: "response time on every inquiry" },
                { stat: "In-House", label: "crews — never subcontracted" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center p-6 border border-[hsl(var(--highland-gold)/0.1)] rounded-sm"
                >
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
            <motion.div {...fadeUp}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
                Ready to Work With a Team<br /> That Builds Like It Matters?
              </h2>
              <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
                Schedule a free consultation and see what it feels like to work with a company 
                that treats your home the way we'd treat our own.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/request-inspection"
                  className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Schedule a Consultation <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:8283979211"
                  className="border border-primary-foreground/30 text-primary-foreground font-semibold px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-primary-foreground/10 transition-colors"
                >
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
