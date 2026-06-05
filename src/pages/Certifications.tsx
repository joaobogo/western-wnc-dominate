import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Award, FileCheck, BadgeCheck, CheckCircle,
  Hammer, Eye, Users, Wrench, Star, Clock, Home, Mountain,
} from "lucide-react";
import badgeGafMasterElite from "@/assets/badge-gaf-master-elite.png";
import badgeCertainteedMaster from "@/assets/badge-certainteed-master.png";
import badgeJamesHardie from "@/assets/badge-james-hardie.png";
import badgeHaag from "@/assets/badge-haag.png";
import badgeVelux from "@/assets/logo-velux.png";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import {
  CredentialCards,
  TrustPillarGrid,
  TrustBadgeStrip,
  ReassuranceBlock,
  StandardsCallout,
} from "@/components/trust";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const certifications = [
  {
    icon: Award,
    title: "CertainTeed Master Shingle Applicator",
    badge: "Top 1% Nationally",
    image: badgeCertainteedMaster,
    description: "This is the highest credential CertainTeed offers to roofing contractors. It means our installers have been trained, tested, and certified to install CertainTeed roofing systems to the manufacturer's exact specifications — unlocking the strongest warranty coverage available.",
    whatItMeans: [
      "Access to CertainTeed's highest warranty tiers — SureStart PLUS™",
      "Factory-trained installation crews certified by the manufacturer",
      "Annual recertification required — credentials can't go stale",
      "Less than 1% of roofing contractors nationally hold this designation",
    ],
  },
  {
    icon: Shield,
    title: "GAF Master Elite® Contractor",
    badge: "Top 2% Nationally",
    image: badgeGafMasterElite,
    description: "Highlander is a GAF Master Elite® roofing contractor, a credential held by only 2% of all roofing contractors in the country. This status ensures you receive the highest level of craftsmanship and exclusive access to GAF's strongest warranties.",
    whatItMeans: [
      "Exclusive access to GAF's Golden Pledge® Limited Warranty",
      "GAF-verified insurance, licensing, and credit standing",
      "Continuous training on the latest roofing technologies",
      "Independent GAF inspectors verify our project quality",
    ],
  },
  {
    icon: Shield,
    title: "VELUX Certified Installer",
    badge: "Accredited Expert",
    image: badgeVelux,
    description: "A VELUX Certified Installer is an independent contractor or company trained and accredited by VELUX to install their skylights, ensuring high-quality, reliable service and adherence to VELUX standards.",
    whatItMeans: [
      "Trained and accredited by VELUX to install their full skylight line",
      "High-quality, reliable service following strict VELUX standards",
      "Ensures structural integrity and leak-proof performance",
      "Direct access to VELUX technical support and warranty systems",
    ],
  },
  {
    icon: BadgeCheck,
    title: "James Hardie Preferred Remodeler",
    badge: "Siding Experts",
    image: badgeJamesHardie,
    description: "As a James Hardie Preferred Remodeler, we are certified to install the nation's #1 brand of fiber cement siding according to their rigorous 'Best Practices' manual.",
    whatItMeans: [
      "Expert installation of James Hardie fiber cement products",
      "Adherence to James Hardie's strict installation standards",
      "Verified liability insurance and professional conduct",
      "Access to specialized James Hardie support and warranty backing",
    ],
  },
  {
    icon: BadgeCheck,
    title: "HAAG Certified Inspector",
    badge: "Storm Experts",
    image: badgeHaag,
    description: "HAAG certification is the gold standard in roofing inspection. It means we have the advanced training to accurately assess damage and represent your interests correctly during insurance claims.",
    whatItMeans: [
      "Scientifically-based damage assessment protocols",
      "Credibility with insurance adjusters and providers",
      "Expertise in identifying functional vs. cosmetic damage",
      "More accurate estimates and faster claim processing",
    ],
  },
];

const qualityStandards = [
  {
    icon: Eye,
    title: "Pre-Project Documentation",
    detail: "Every project begins with a detailed written scope, material specifications, and a photo-documented baseline of your property's current condition.",
  },
  {
    icon: Hammer,
    title: "Installation Protocols",
    detail: "Our crews follow manufacturer-exact installation methods — no shortcuts, no substitutions. Every fastener, flashing, and seam is installed to spec.",
  },
  {
    icon: Users,
    title: "In-House Crew Standards",
    detail: "Every project team is hired, trained, and supervised by Highlander. We don't use anonymous subcontractor rotations. Your project team is our team.",
  },
  {
    icon: Clock,
    title: "Daily Progress & Cleanup",
    detail: "Job sites are cleaned and secured every day. Progress is documented with photos and communicated to you — no surprises.",
  },
  {
    icon: Home,
    title: "Property Protection",
    detail: "We protect your landscaping, siding, windows, and driveways during every project. Careful material staging and tarping protocols are standard.",
  },
  {
    icon: CheckCircle,
    title: "Owner Walkthrough",
    detail: "The owner personally inspects every completed project before handover. Flashing, trim, cleanup, function — nothing is approved until it meets our standard.",
  },
];

const warrantyTiers = [
  { tier: "Standard", coverage: "Material warranty from manufacturer + Highlander labor warranty", availability: "All projects" },
  { tier: "Enhanced", coverage: "CertainTeed SureStart PLUS™ — covers both material and labor under manufacturer warranty", availability: "CertainTeed installations" },
  { tier: "Lifetime", coverage: "50-year non-prorated material coverage + workmanship guarantee", availability: "Select roofing systems" },
];

const Certifications = () => {
  return (
    <>
      <SEOHead
        title="Certifications & Credentials | Licensed & Insured"
        description="Highlander's certifications explained — CertainTeed Master Shingle Applicator, Licensed NC General Contractor, full insurance, and manufacturer-backed warranties."
        path="/certifications"
        jsonLd={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Certifications", url: "/certifications" }])}
      />
      <Header />
      <main>
        {/* ── HERO ── */}
        <section className="relative section-dark pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 tartan-dark" />
          <div className="container-tight relative z-10 px-5 md:px-8 lg:px-16">
            <motion.div {...fadeUp} className="max-w-3xl">
              <span className="eyebrow mb-4 block text-[hsl(var(--highland-gold))]">Credentials & Standards</span>
              <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-6 leading-[0.95] tracking-tightest">
                Credentials That Mean<br />
                <span className="text-[hsl(var(--highland-gold))]">Something to Your Project.</span>
              </h1>
              <div className="w-16 h-px bg-[hsl(var(--highland-gold)/0.4)] mb-6" />
              <p className="text-body-lg md:text-body-xl text-white/85 leading-relaxed max-w-2xl font-medium drop-shadow-sm">
                Every contractor says they're qualified. We'd rather show you what our certifications, 
                licenses, and manufacturer relationships actually mean — and how they translate into 
                better outcomes for your roofing or construction project.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── CREDENTIAL CARDS OVERVIEW ── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="eyebrow mb-3 block">Our Certifications</span>
              <h2 className="section-heading mb-4">Verified. Certified. Warranty-Backed.</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These aren't decorative badges. Each credential was earned through training, testing, 
                and ongoing compliance — and each one directly benefits the quality and protection of your project.
              </p>
            </motion.div>
            <CredentialCards variant="light" />
          </div>
        </section>

        {/* ── DETAILED CERTIFICATION BREAKDOWN ── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="eyebrow mb-3 block">What Each Credential Means</span>
              <h2 className="section-heading mb-4">Beyond the Badge</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Understanding what a certification actually does for your project is more important 
                than knowing that a contractor has one.
              </p>
            </motion.div>
            <div className="space-y-6">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="card-premium p-6 md:p-8"
                >
                  <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    <div className="md:col-span-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-16 h-12 flex items-center justify-center">
                          {cert.image ? (
                            <img src={cert.image} alt={cert.title} className="w-full h-full object-contain mix-blend-multiply" />
                          ) : (
                            <div className="w-11 h-11 rounded-sm bg-primary/8 flex items-center justify-center">
                              <cert.icon className="w-5 h-5 text-primary" />
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-sm">
                          {cert.badge}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-lg text-foreground mb-3">{cert.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{cert.description}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="font-heading font-semibold text-sm text-foreground mb-4">What This Means for Your Project</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {cert.whatItMeans.map((point) => (
                          <div key={point} className="flex items-start gap-2.5 bg-secondary/60 rounded-sm p-3">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/80 text-[13px] font-body leading-relaxed">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MID CTA ── */}
        <section className="bg-primary py-10 md:py-12">
          <div className="container-tight text-center px-5 md:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
              <p className="text-primary-foreground font-heading font-semibold text-lg">
                Want to see these credentials in action?
              </p>
              <Link
                to="/consultation"
                className="cta-gradient text-accent-foreground font-bold px-6 py-3 rounded-sm inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                Talk With Our Team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── QUALITY STANDARDS ON SITE ── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="eyebrow mb-3 block">On-Site Standards</span>
              <h2 className="section-heading mb-4">How We Maintain Quality on Every Job</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Certifications set the baseline. What happens on your property is where standards are 
                proven. Here's how we maintain quality control from day one to final walkthrough.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {qualityStandards.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="card-premium p-5 md:p-6"
                >
                  <div className="w-10 h-10 rounded-sm bg-primary/8 flex items-center justify-center mb-3">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WARRANTIES & WORKMANSHIP CONFIDENCE ── */}
        <section className="section-padding section-dark tartan-dark">
          <div className="container-tight">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Warranties & Protection</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-4 leading-tight">
                Your Project Is Protected.<br />Before, During, and After.
              </h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-[hsl(var(--dark-section-foreground)/0.6)] max-w-2xl mx-auto">
                Every Highlander project includes warranty coverage. Our CertainTeed certification 
                unlocks enhanced warranty tiers that most contractors can't offer.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5 mb-12">
              {warrantyTiers.map((w, i) => (
                <motion.div
                  key={w.tier}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="border border-[hsl(var(--highland-gold)/0.12)] rounded-sm p-6 bg-[hsl(var(--dark-section-foreground)/0.03)] text-center"
                >
                  <p className="text-[hsl(var(--highland-gold))] font-heading font-bold text-xl mb-2">{w.tier}</p>
                  <p className="text-[hsl(var(--dark-section-foreground)/0.7)] text-sm leading-relaxed mb-4">{w.coverage}</p>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--dark-section-foreground)/0.4)]">
                    {w.availability}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <StandardsCallout
                icon={Shield}
                title="Warranty Package Delivered at Walkthrough"
                description="Every completed project includes a physical warranty package — manufacturer documentation, labor warranty, maintenance guidelines, and emergency contact information."
                variant="dark"
              />
              <StandardsCallout
                icon={Wrench}
                title="Post-Project Support"
                description="We don't disappear after the last nail. Warranty claims, maintenance questions, and follow-up inspections are handled by the same team that built your project."
                variant="dark"
              />
            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ── */}
        <ReassuranceBlock
          headline={"Credentials That Translate\nInto Better Outcomes."}
          subheadline="See how our certifications, training, and quality standards translate into real results on your property."
          ctaText="Talk With Our Team"
        />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Certifications;
