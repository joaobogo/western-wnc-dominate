import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Award, FileCheck, BadgeCheck, CheckCircle,
  Hammer, Eye, Users, Wrench, Star, Clock, Home, Mountain, ShieldCheck,
} from "lucide-react";
import badgeVelux from "@/assets/logo-velux.png";
import certainteedPremier from "@/assets/certainteed-shinglemaster-premier.jpg.asset.json";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCloseCTA from "@/components/PageCloseCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import VendorPartners from "@/components/VendorPartners";
import VerifiableTrustStrip from "@/components/trust/VerifiableTrustStrip";
import { BUSINESS } from "@/data/business";
import {
  TrustPillarGrid,
  TrustBadgeStrip,
  ReassuranceBlock,
  StandardsCallout,
} from "@/components/trust";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

const certifications = [
  {
    icon: Award,
    title: "CertainTeed ShingleMaster PREMIER Credentialed Contractor",
    badge: "WNC's Only Premier Contractor",
    image: certainteedPremier.url,
    description: "Highlander is Western North Carolina's only CertainTeed ShingleMaster PREMIER credentialed contractor. The exact roof system, products, and warranty eligibility are confirmed for each project in writing.",
    whatItMeans: [
      "CertainTeed roofing-system training and installation guidance",
      "System requirements reviewed for the selected roof",
      "Warranty eligibility depends on the selected products and assembly",
      "Project-specific terms confirmed before installation",
    ],
  },
  {
    icon: Shield,
    title: "VELUX Certified Installer",
    badge: "Certified Installer",
    image: badgeVelux,
    description: "Highlander is a VELUX Certified Installer for skylight work. Product, flashing, roof type, and warranty details are confirmed for the specific project.",
    whatItMeans: [
      "Skylight and flashing planned as part of the roof system",
      "Product selection matched to the roof type and opening",
      "Installation details follow the selected VELUX system",
      "Project-specific product information documented before installation",
    ],
  },
  {
    icon: Shield,
    title: BUSINESS.licenseNumber,
    badge: "State License",
    image: null,
    description: "Highlander Building Services, Inc. holds a North Carolina General Contractor license and links directly to the public state lookup.",
    whatItMeans: [
      "Publicly verifiable North Carolina contractor license",
      "License number displayed consistently across the site",
      "State verification link provided on this page",
      "Permitting requirements confirmed per project",
    ],
  },
  {
    icon: CheckCircle,
    title: "BBB A+ Accredited",
    badge: `Accredited Since ${BUSINESS.bbbAccreditedSince}`,
    image: null,
    description: "Highlander links directly to its Better Business Bureau profile so homeowners can review the current accreditation information independently.",
    whatItMeans: [
      "Public BBB profile linked from the website",
      `Accreditation shown since ${BUSINESS.bbbAccreditedSince}`,
      "Current BBB information can be checked independently",
      "Unverified awards are not presented as established facts",
    ],
  },
];

const badgeRow: { image?: string | null; name: string; plain: string }[] = [
  {
    image: certainteedPremier.url,
    name: "CertainTeed ShingleMaster PREMIER",
    plain: "Western North Carolina's only Premier credentialed contractor, with project-specific warranty details confirmed in writing.",
  },
  {
    image: badgeVelux,
    name: "VELUX Certified Installer",
    plain: "Skylight system, flashing, and product details matched to the specific roof and opening.",
  },
  {
    name: BUSINESS.licenseNumber,
    plain: "North Carolina General Contractor license with public verification.",
  },
  {
    name: "BBB A+ Accredited",
    plain: `Public BBB profile; accreditation shown since ${BUSINESS.bbbAccreditedSince}.`,
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
    title: "Project Team Accountability",
    detail: "Before work begins, Highlander identifies the project lead and the team responsible for the written scope so the homeowner knows who is accountable on site.",
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
    title: "Final Project Walkthrough",
    detail: "The completed scope is reviewed with the homeowner, including visible workmanship, cleanup, documentation, and any remaining follow-up items.",
  },
];

const warrantyTiers = [
  {
    tier: "Manufacturer",
    coverage: "Product coverage depends on the manufacturer, selected products, and complete roof assembly.",
    availability: "Confirmed per project",
  },
  {
    tier: "Workmanship",
    coverage: "Highlander documents the workmanship coverage that applies to the specific written scope.",
    availability: "Confirmed in writing",
  },
  {
    tier: "Enhanced Options",
    coverage: "When a selected system qualifies for enhanced manufacturer coverage, eligibility and terms are reviewed before installation.",
    availability: "System-dependent",
  },
];

const Certifications = () => {
  return (
    <>
      <SEOHead
        title="Roofing Certifications in Franklin, NC | Highlander"
        description="Highlander credentials in Franklin, NC: contractor license, CertainTeed credential, VELUX installer status, and BBB accreditation."
        path="/certifications"
        jsonLd={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Certifications", url: "/certifications" }])}
      />
      <Header />
      <main id="main-content">
        {/* ── HERO ── */}
        <section className="relative section-dark pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 tartan-dark" />
          <div className="container-tight relative z-10 px-5 md:px-8 lg:px-16">
            <motion.div {...fadeUp} className="max-w-3xl">
              <span className="eyebrow mb-4 block text-[hsl(var(--gold-ink))]">Credentials & Standards</span>
              <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-6 leading-[0.95] tracking-tightest">
                <span className="sr-only">Credentials That Mean Something to Your Project.</span>
                <span aria-hidden="true" className="block">
                  Credentials That Mean<br />
                  <span className="text-[hsl(var(--gold-ink))]">Something to Your Project.</span>
                </span>
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
            {/* Aligned badge row — equal height, plain-language explanation */}
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-14">
              {badgeRow.map((b, i) => (
                <motion.li
                  key={b.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="flex flex-col items-center text-center border border-border bg-card rounded-sm p-5 md:p-6 h-full"
                >
                  <div className="h-16 md:h-20 w-full flex items-center justify-center mb-4">
                    {b.image ? (
                      <img
                        loading="lazy"
                        decoding="async"
                        src={b.image}
                        alt={`${b.name} certification badge`}
                        width={140}
                        height={80}
                        className="max-h-full max-w-[140px] object-contain"
                      />
                    ) : (
                      <span className="w-14 h-14 rounded-full border border-[hsl(var(--highland-gold)/0.45)] bg-[hsl(var(--highland-gold)/0.08)] flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-[hsl(var(--highland-gold))]" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-body-sm text-foreground leading-snug mb-2">{b.name}</h3>
                  <p className="text-muted-foreground text-body-xs leading-relaxed">{b.plain}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── LICENSE VERIFICATION ── */}
        <section className="section-padding bg-background" id="license">
          <div className="container-tight max-w-3xl text-center">
            <span className="eyebrow mb-3 block">License Verification</span>
            <h2 className="section-heading mb-4">{BUSINESS.licenseNumber}</h2>
            <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-5" />
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              {BUSINESS.legalName} holds an active North Carolina General Contractor license.
              You can confirm the license status yourself on the public NC Licensing Board lookup —
              search the company name or license number.
            </p>
            <a
              href={BUSINESS.licenseLookupUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 font-body font-bold text-primary hover:underline"
            >
              Verify {BUSINESS.licenseNumber} with the NC Licensing Board
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <p className="mt-6 text-body-xs font-body text-muted-foreground">
              <a href={BUSINESS.bbbUrl} target="_blank" rel="noopener noreferrer nofollow" className="hover:text-foreground underline underline-offset-2">
                BBB A+ Accredited since {BUSINESS.bbbAccreditedSince}
              </a>
            </p>
          </div>
        </section>

        <VerifiableTrustStrip />

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
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="card-premium p-6 md:p-8"
                >
                  <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    <div className="md:col-span-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-16 h-12 flex items-center justify-center">
                          {cert.image ? (
                            <img loading="lazy" decoding="async" src={cert.image} alt={cert.title} width={128} height={96} className="w-full h-full object-contain" />
                          ) : (
                            <div className="w-11 h-11 rounded-sm bg-primary/8 flex items-center justify-center">
                              <cert.icon className="w-5 h-5 text-primary" />
                            </div>
                          )}
                        </div>
                        <span className="text-caption font-semibold uppercase tracking-wider text-[hsl(var(--gold-ink))] bg-accent/10 px-2.5 py-1 rounded-sm">
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
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-foreground/80 text-body-xs font-body leading-relaxed">{point}</span>
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
                to="/request-inspection"
                className="btn btn-primary btn-sm"
              >
                Get My Questions Answered <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
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
              <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">Warranties & Protection</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-4 leading-tight">
                Your Project Is Protected.<br />Before, During, and After.
              </h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-dark-section-muted max-w-2xl mx-auto">
                Warranty coverage varies by manufacturer, product selection, and project scope. Highlander documents the coverage that applies before installation rather than publishing a one-size-fits-all promise.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5 mb-12">
              {warrantyTiers.map((w, i) => (
                <motion.div
                  key={w.tier}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="border border-[hsl(var(--highland-gold)/0.12)] rounded-sm p-6 bg-[hsl(var(--dark-section-foreground)/0.03)] text-center"
                >
                  <p className="text-[hsl(var(--gold-ink))] font-heading font-bold text-xl mb-2">{w.tier}</p>
                  <p className="text-dark-section-muted text-sm leading-relaxed mb-4">{w.coverage}</p>
                  <span className="text-caption font-semibold uppercase tracking-wider text-dark-section-muted">
                    {w.availability}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <StandardsCallout
                icon={Shield}
                title="Warranty Package Delivered at Walkthrough"
                description="At project closeout, Highlander provides the warranty and product documentation that applies to the completed scope, along with the appropriate contact information for follow-up."
                variant="dark"
              />
              <StandardsCallout
                icon={Wrench}
                title="Post-Project Support"
                description="Warranty questions and post-project follow-up are routed through Highlander so the homeowner has a clear point of contact after completion."
                variant="dark"
              />
            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ── */}
        <VendorPartners />

        <ReassuranceBlock
          headline={"Credentials That Translate\nInto Better Outcomes."}
          subheadline="See how our certifications, training, and quality standards translate into real results on your property."
          ctaText="Get My Questions Answered"
        />
      </main>
      <PageCloseCTA eyebrow="Next Step" heading="Put these credentials to work on your roof" body="Tell us about your property and we'll follow up with a clear, written next step." secondaryLabel="Explore our roofing services" secondaryTo="/roofing" context="certifications" />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Certifications;
