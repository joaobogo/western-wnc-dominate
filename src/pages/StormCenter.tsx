import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, CloudLightning, Shield, ShieldAlert, FileCheck,
  AlertTriangle, Clock, Mountain, CheckCircle, Calendar, Wrench,
  CloudRain, Snowflake, Wind, Zap, ExternalLink,
} from "lucide-react";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import PageCloseCTA from "@/components/PageCloseCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { TrustBadgeStrip, ReassuranceBlock } from "@/components/trust";
import { blogPosts } from "@/data/blogs";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";

const stormArticles = blogPosts.filter(
  (p) => p.category === "Storm" || p.category === "Insurance" || p.category === "Maintenance"
);

const phases = [
  {
    id: "before",
    icon: Shield,
    label: "Before the Storm",
    description: "Preparation guides and seasonal readiness",
    color: "text-primary",
    bg: "bg-primary/8",
  },
  {
    id: "during",
    icon: AlertTriangle,
    label: "During & After",
    description: "Damage assessment, emergency steps, documentation",
    color: "text-[hsl(var(--gold-ink))]",
    bg: "bg-accent/10",
  },
  {
    id: "recovery",
    icon: FileCheck,
    label: "Recovery & Claims",
    description: "Insurance process, repair planning, next steps",
    color: "text-[hsl(var(--gold-ink))]",
    bg: "bg-[hsl(var(--highland-gold)/0.1)]",
  },
];

const beforeArticles = stormArticles.filter((a) =>
  ["spring-roof-maintenance-checklist-wnc", "winter-roof-preparation-highlands", "ice-dam-prevention-mountain-homes"].includes(a.slug)
);
const duringArticles = stormArticles.filter((a) =>
  ["storm-damage-checklist-western-nc", "emergency-roof-repair-wnc"].includes(a.slug)
);
const recoveryArticles = stormArticles.filter((a) =>
  ["insurance-claim-roof-damage-nc", "roof-inspection-what-to-expect"].includes(a.slug)
);

const damageSignsData = [
  { icon: CloudRain, sign: "Missing, cracked, or curling shingles", severity: "Moderate" },
  { icon: Wind, sign: "Lifted flashing around chimneys and vents", severity: "Moderate" },
  { icon: Zap, sign: "Dents or punctures in metal panels", severity: "Moderate" },
  { icon: Snowflake, sign: "Ice dam formation at eaves", severity: "High" },
  { icon: AlertTriangle, sign: "Water stains on interior ceilings or walls", severity: "High" },
  { icon: CloudLightning, sign: "Visible sagging or structural soft spots", severity: "Critical" },
];

const seasonalCalendar = [
  { season: "Spring", icon: CloudRain, focus: "Post-winter damage assessment", action: "Schedule spring inspection" },
  { season: "Summer", icon: Zap, focus: "Thunderstorm monitoring & UV protection", action: "Check ventilation and flashing" },
  { season: "Fall", icon: Wind, focus: "Hurricane remnants & pre-winter prep", action: "Clean gutters, install heat cables" },
  { season: "Winter", icon: Snowflake, focus: "Ice dams, snow loads, emergency response", action: "Monitor and respond quickly" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.5 },
};

const StormCenter = () => {
  const [activePhase, setActivePhase] = useState<string | null>(null);

  const getPhaseArticles = (phase: string) => {
    if (phase === "before") return beforeArticles;
    if (phase === "during") return duringArticles;
    return recoveryArticles;
  };

  return (
    <>
      <SEOHead
        title="Storm Center | Roof Damage Response & Recovery in Western NC"
        description="Storm preparedness, damage assessment, and insurance claim guidance for Western North Carolina homeowners. prompt storm response from Highlander Building Services."
        path="/roofing/storm-damage"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Storm Center", url: "/roofing/storm-damage" },
        ])}
      />
      <Header />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Storm Center", url: "/storm-center" }]} />
      <main id="main-content">
        {/* ═══ HERO ═══ */}
        <section className="section-padding section-dark tartan-dark pt-32 md:pt-40 pb-16 md:pb-20">
          <div className="container-tight text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="w-14 h-14 rounded-sm bg-accent/10 flex items-center justify-center mx-auto mb-5">
                <CloudLightning className="w-7 h-7 text-[hsl(var(--gold-ink))]" />
              </div>
              <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">
                Storm Center
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-5 leading-tight">
                Storm Preparedness & Recovery<br className="hidden md:block" /> for WNC Homeowners
              </h1>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-5" />
              <p className="text-[hsl(var(--dark-section-foreground)/0.6)] text-base md:text-lg max-w-2xl mx-auto mb-8">
                Expert guidance before, during, and after severe weather — from the team
                that responds across Western North Carolina.
              </p>

              {/* Primary action on storm pages is the phone call (see page-cta-hierarchy.ts) */}
              <div className="flex flex-col items-center gap-3" data-gtm-location="hero">
                <span className="text-[hsl(var(--dark-section-foreground)/0.5)] text-xs font-body uppercase tracking-[0.16em]">
                  Storm Assessment Line
                </span>
                <a
                  href="tel:+18285247773"
                  className="cta-gradient text-accent-foreground font-heading font-bold text-base px-10 py-4.5 rounded-sm inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Phone className="w-5 h-5" /> (828) 524-7773
                </a>
              </div>
              <p className="text-[hsl(var(--dark-section-foreground)/0.3)] text-xs mt-3 font-body">
                Storm damage moves fast — calling reaches a real person who can prioritize your assessment and start the insurance documentation today.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══ THREE-PHASE NAVIGATION ═══ */}
        <section className="py-10 md:py-14 bg-background">
          <div className="container-tight">
            <div className="grid md:grid-cols-3 gap-4">
              {phases.map((phase, i) => (
                <motion.button
                  key={phase.id}
                  {...fadeUp}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
                  className={`text-left p-5 md:p-6 rounded-sm border transition-all ${
                    activePhase === phase.id
                      ? "border-[hsl(var(--highland-gold)/0.3)] bg-secondary shadow-sm"
                      : "border-border bg-card hover:border-[hsl(var(--highland-gold)/0.15)] card-lift"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-sm ${phase.bg} flex items-center justify-center mb-3`}>
                    <phase.icon className={`w-5 h-5 ${phase.color}`} />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">{phase.label}</h3>
                  <p className="text-muted-foreground text-sm font-body">{phase.description}</p>
                  <span className="text-primary text-xs font-semibold mt-3 inline-flex items-center gap-1">
                    {activePhase === phase.id ? "Hide articles" : "View articles"} <ArrowRight className="w-3 h-3" />
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Phase articles */}
            {activePhase && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {getPhaseArticles(activePhase).map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group card-premium p-5 flex flex-col"
                  >
                    <span className="text-caption font-body font-semibold uppercase tracking-[0.14em] text-[hsl(var(--gold-ink))] mb-2">
                      {post.category}
                    </span>
                    <h4 className="font-heading font-semibold text-foreground text-sm mb-2 group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h4>
                    <p className="text-muted-foreground text-xs line-clamp-2 flex-grow">{post.excerpt}</p>
                    <span className="text-primary text-xs font-semibold mt-3 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
                {getPhaseArticles(activePhase).length === 0 && (
                  <p className="text-muted-foreground text-sm col-span-full text-center py-8">
                    More articles coming soon for this category.
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </section>

        {/* ═══ DAMAGE SIGNS ═══ */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div {...fadeUp} className="text-center mb-12">
              <span className="eyebrow mb-3 block">Damage Assessment</span>
              <h2 className="section-heading mb-4">Signs of Storm Damage to Watch For</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-muted-foreground max-w-xl mx-auto text-sm">
                After any severe weather event, check for these indicators. If you see any, schedule
                a professional assessment — most damage isn't visible from the ground.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {damageSignsData.map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ delay: i * 0.06 }}
                  className="card-premium p-5 flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-sm bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-body leading-snug mb-1">{item.sign}</p>
                    <span className={`text-caption font-body font-semibold uppercase tracking-wider ${
                      item.severity === "Critical" ? "text-alert" : item.severity === "High" ? "text-[hsl(var(--gold-ink))]" : "text-muted-foreground"
                    }`}>
                      {item.severity} Priority
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ INSURANCE DOCUMENTATION ═══ */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <motion.div {...fadeUp}>
                <span className="eyebrow mb-3 block">Insurance Claims</span>
                <h2 className="section-heading mb-4">Documenting Damage for Your Claim</h2>
                <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mb-5" />
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Proper documentation is the difference between a successful claim and a denied one.
                  We help WNC homeowners document damage thoroughly so nothing gets missed.
                </p>
                <div className="space-y-3">
                  {[
                    "Photograph all damage from multiple angles — exterior and interior",
                    "Note the date, time, and type of weather event",
                    "Document temporary repairs (tarping) with photos and receipts",
                    "Get a professional inspection before the adjuster visits",
                    "Keep all communication with your insurance company in writing",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-sm bg-primary/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-caption font-heading font-bold text-primary">{i + 1}</span>
                      </div>
                      <span className="text-foreground/80 text-sm font-body leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/blog/insurance-claim-roof-damage-nc"
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm mt-6 hover:gap-3 transition-all"
                >
                  Read Full Insurance Claims Guide <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
                <div className="bg-card border border-border rounded-sm p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center">
                      <ShieldAlert className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">How We Help</h3>
                      <p className="text-muted-foreground text-xs font-body">Our role in your claim</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Professional inspection with detailed photo documentation",
                      "Written damage assessment supporting your claim",
                      "Present during adjuster visit when requested",
                      "Supplement documentation if initial estimate is low",
                      "Complete repairs with warranty after claim approval",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ SEASONAL PREP CALENDAR ═══ */}
        <section className="section-padding section-dark tartan-dark">
          <div className="container-tight">
            <motion.div {...fadeUp} className="text-center mb-12">
              <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">Seasonal Readiness</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-4">
                Year-Round Storm Preparedness
              </h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-[hsl(var(--dark-section-foreground)/0.6)] max-w-xl mx-auto text-sm">
                WNC weather demands year-round attention. Here's when to focus on what.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {seasonalCalendar.map((item, i) => (
                <motion.div
                  key={item.season}
                  {...fadeUp}
                  transition={{ delay: i * 0.08 }}
                  className="border border-[hsl(var(--highland-gold)/0.1)] bg-[hsl(var(--dark-section-foreground)/0.03)] rounded-sm p-5 md:p-6"
                >
                  <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                  </div>
                  <h3 className="font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-1">{item.season}</h3>
                  <p className="text-[hsl(var(--dark-section-foreground)/0.5)] text-sm font-body mb-3">{item.focus}</p>
                  <p className="text-[hsl(var(--highland-gold)/0.7)] text-xs font-body font-medium">{item.action}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ ALL STORM ARTICLES ═══ */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div {...fadeUp} className="mb-10">
              <span className="eyebrow mb-2 block">All Storm Resources</span>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                Complete Storm & Weather Library
              </h2>
              <div className="w-10 h-px bg-[hsl(var(--highland-gold)/0.4)] mt-3" />
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {stormArticles.map((post, i) => (
                <motion.div
                  key={post.slug}
                  {...fadeUp}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block card-premium overflow-hidden h-full"
                  >
                    <div className="p-5 md:p-6 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-caption font-body font-semibold uppercase tracking-[0.14em] px-2 py-0.5 rounded-sm bg-accent/10 text-[hsl(var(--gold-ink))]">
                          {post.category}
                        </span>
                        <span className="text-muted-foreground text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-heading font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2.5 transition-all">
                        Read Article <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ LOCAL RESOURCES ═══ */}
        <section className="py-10 md:py-14 bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center">
              <h3 className="text-lg font-heading font-bold text-foreground mb-4">Local Weather Resources</h3>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a
                  href="https://www.weather.gov/gsp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
                >
                  NWS Greenville-Spartanburg <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://www.readync.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
                >
                  ReadyNC Emergency Info <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ CLOSING CTA ═══ */}
        <ReassuranceBlock
          headline={"Need a Storm Assessment?\nWe're Here to Help."}
          subheadline="Schedule a professional inspection — no pressure, no obligation. We'll document everything and give you a straight answer."
          ctaText="Request Storm Assessment"
        />
      </main>
      <PageCloseCTA eyebrow="Storm Response" heading="Storm damage on your property?" body="Send us the details and photos. We'll prioritize the inspection and help you document everything your insurer needs." secondaryLabel="Read the storm damage guide" secondaryTo="/storm-damage" context="storm-center" />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default StormCenter;
