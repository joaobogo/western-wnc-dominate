import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield, Award, FileCheck, BadgeCheck, Handshake, Phone, ArrowRight,
  Star, CheckCircle, Clock, Users, MessageSquare, Mountain, Hammer,
  Eye, Heart, Home, Wrench,
} from "lucide-react";
import logoCertainteed from "@/assets/logo-certainteed.png";
import logoVelux from "@/assets/logo-velux.png";
import badgeCertainteedMaster from "@/assets/badge-certainteed-master.png";
import badgeJamesHardie from "@/assets/badge-james-hardie.png";
import badgeHaag from "@/assets/badge-haag.png";
import { ReactNode } from "react";

/* ──────────────────────────────────────
   DATA: Credentials, Stats, Certifications
   ────────────────────────────────────── */

export const credentials = [
  { icon: Award, label: "CertainTeed ShingleMaster", detail: "Credentialed Contractor", image: badgeCertainteedMaster },
  { icon: Shield, label: "Licensed & Insured", detail: "NC General Contractor", image: badgeCertainteedMaster },
  { icon: BadgeCheck, label: "James Hardie", detail: "Preferred Remodeler", image: badgeJamesHardie },
  { icon: FileCheck, label: "HAAG Certified", detail: "Residential Inspector", image: badgeHaag },
];

export const trustStats = [
  { value: "4.9★", label: "Google Rating", detail: "Across Western NC" },
  { value: "40+", label: "Years Combined Exp.", detail: "Roofing & Construction" },
  { value: "8", label: "Counties Served", detail: "Macon · Jackson · Swain" },
  { value: "4.9★", label: "Average Rating", detail: "Google & Facebook" },
];

export const trustPillars = [
  {
    icon: Shield,
    title: "Certified & Licensed",
    short: "CertainTeed Master Applicator. Licensed NC General Contractor. Fully insured.",
    overcomes: "Is this company actually qualified?",
  },
  {
    icon: MessageSquare,
    title: "Clear Communication",
    short: "Named point of contact. Daily updates. Written scope before work starts.",
    overcomes: "Will they disappear after I sign?",
  },
  {
    icon: Clock,
    title: "Timeline Discipline",
    short: "Realistic scheduling. Milestone tracking. We finish when we say we will.",
    overcomes: "Will this drag on for months?",
  },
  {
    icon: Hammer,
    title: "Craftsmanship Standard",
    short: "Manufacturer-exact installation. Owner-inspected. No shortcuts tolerated.",
    overcomes: "How do I know the quality will be there?",
  },
  {
    icon: Mountain,
    title: "Local Expertise",
    short: "Built for WNC elevation, weather, and local design themes since 2017.",
    overcomes: "Do they understand mountain building?",
  },
  {
    icon: Home,
    title: "Respect for Your Home",
    short: "Clean job sites daily. Property protection protocols. Careful material staging.",
    overcomes: "Will my home be torn apart?",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    short: "Photo documentation at every phase. No hidden costs. No surprise change orders.",
    overcomes: "Will the final cost exceed the estimate?",
  },
  {
    icon: Heart,
    title: "Long-Term Accountability",
    short: "We're here after the project ends. Warranty support. A team you can actually reach.",
    overcomes: "What happens if something goes wrong later?",
  },
];

/* ──────────────────────────────────────
   COMPONENT: TrustBadgeStrip
   Compact inline strip for forms, sidebars, CTAs
   ────────────────────────────────────── */

export const TrustBadgeStrip = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-wrap justify-center gap-4 text-xs font-medium uppercase tracking-wider ${className}`}>
    {["Licensed & Insured", "CertainTeed Master Applicator", "In-House Crews", "WNC Specialists"].map((badge, i) => (
      <span key={badge} className="flex items-center gap-1.5">
        {i > 0 && <span className="text-current opacity-20 mr-2">•</span>}
        {badge}
      </span>
    ))}
  </div>
);

/* ──────────────────────────────────────
   COMPONENT: CredentialCards
   4-card grid for certifications
   ────────────────────────────────────── */

export const CredentialCards = ({ variant = "light" }: { variant?: "light" | "dark" }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {credentials.map((cert, i) => (
      <motion.div
        key={cert.label}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.08 }}
        className={`group text-center p-5 md:p-6 rounded-sm card-lift flex flex-col items-center justify-center ${
          variant === "dark"
            ? "border border-[hsl(var(--highland-gold)/0.1)] bg-[hsl(var(--dark-section-foreground)/0.03)]"
            : "bg-card border border-border hover:border-[hsl(var(--highland-gold)/0.2)]"
        }`}
      >
        <div className={`mb-3 flex items-center justify-center transition-transform group-hover:scale-105 duration-300 ${
          cert.image ? "w-20 h-16" : "w-11 h-11 rounded-sm " + (variant === "dark" ? "bg-[hsl(var(--highland-gold)/0.1)]" : "bg-primary/8 group-hover:bg-primary/12")
        }`}>
          {cert.image ? (
            <img 
              src={cert.image} 
              alt={cert.label} 
              className={`w-full h-full object-contain mix-blend-multiply ${variant === "dark" ? "brightness-200 contrast-125" : ""}`} 
            />
          ) : (
            <cert.icon className={`w-5 h-5 ${variant === "dark" ? "text-[hsl(var(--highland-gold))]" : "text-primary"}`} />
          )}
        </div>
        <h3 className={`font-heading font-bold text-sm mb-0.5 ${
          variant === "dark" ? "text-[hsl(var(--dark-section-foreground))]" : "text-foreground"
        }`}>{cert.label}</h3>
        <p className={`text-[11px] font-body tracking-wide ${
          variant === "dark" ? "text-[hsl(var(--dark-section-foreground)/0.5)]" : "text-muted-foreground"
        }`}>{cert.detail}</p>
      </motion.div>
    ))}
  </div>
);

/* ──────────────────────────────────────
   COMPONENT: TrustPillarGrid
   Flexible trust pillar display (4, 6, or 8 pillars)
   ────────────────────────────────────── */

interface TrustPillarGridProps {
  count?: 4 | 6 | 8;
  variant?: "light" | "dark";
  showObjections?: boolean;
  heading?: string;
  eyebrow?: string;
  subheading?: string;
}

export const TrustPillarGrid = ({
  count = 8,
  variant = "light",
  showObjections = false,
  heading = "Why Homeowners Trust Highlander",
  eyebrow = "Trust & Standards",
  subheading,
}: TrustPillarGridProps) => {
  const pillars = trustPillars.slice(0, count);
  const cols = count <= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : count <= 6 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";
  const isDark = variant === "dark";

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-14"
      >
        <span className={`eyebrow mb-3 block ${isDark ? "text-[hsl(var(--highland-gold))]" : ""}`}>{eyebrow}</span>
        <h2 className={`section-heading mb-4 ${isDark ? "text-[hsl(var(--dark-section-foreground))]" : ""}`}>{heading}</h2>
        <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
        {subheading && (
          <p className={`max-w-2xl mx-auto ${isDark ? "text-[hsl(var(--dark-section-foreground)/0.6)]" : "text-muted-foreground"}`}>
            {subheading}
          </p>
        )}
      </motion.div>
      <div className={`grid ${cols} gap-5`}>
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className={`p-5 md:p-6 rounded-sm ${
              isDark
                ? "border border-[hsl(var(--highland-gold)/0.1)] bg-[hsl(var(--dark-section-foreground)/0.03)]"
                : "card-premium"
            }`}
          >
            <div className={`w-10 h-10 rounded-sm flex items-center justify-center mb-3 ${
              isDark ? "bg-[hsl(var(--highland-gold)/0.1)]" : "bg-primary/8"
            }`}>
              <p.icon className={`w-5 h-5 ${isDark ? "text-[hsl(var(--highland-gold))]" : "text-primary"}`} />
            </div>
            <h3 className={`font-heading font-semibold text-sm mb-2 ${isDark ? "text-[hsl(var(--dark-section-foreground))]" : "text-foreground"}`}>
              {p.title}
            </h3>
            <p className={`text-[13px] leading-relaxed font-body mb-3 ${isDark ? "text-[hsl(var(--dark-section-foreground)/0.6)]" : "text-muted-foreground"}`}>
              {p.short}
            </p>
            {showObjections && (
              <div className={`text-[11px] font-body italic pt-3 border-t ${
                isDark ? "border-[hsl(var(--highland-gold)/0.08)] text-[hsl(var(--dark-section-foreground)/0.4)]" : "border-border text-muted-foreground/50"
              }`}>
                Overcomes: "{p.overcomes}"
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ──────────────────────────────────────
   COMPONENT: ReviewHighlight
   Single featured review for embedding
   ────────────────────────────────────── */

interface ReviewHighlightProps {
  quote: string;
  name: string;
  location: string;
  project: string;
  outcome?: string;
}

export const ReviewHighlight = ({ quote, name, location, project, outcome }: ReviewHighlightProps) => (
  <div className="bg-card border border-border rounded-sm p-6 md:p-8 relative overflow-hidden">
    <div className="h-px w-full absolute top-0 left-0 right-0 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.25)] to-transparent" />
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
      ))}
    </div>
    <p className="text-foreground text-sm md:text-[15px] leading-relaxed mb-5 font-body">"{quote}"</p>
    {outcome && (
      <div className="bg-secondary/60 rounded-sm px-4 py-3 mb-5">
        <p className="text-[11px] font-body font-semibold uppercase tracking-[0.1em] text-muted-foreground/50 mb-1">Project Outcome</p>
        <p className="text-sm font-body font-medium text-foreground/80">{outcome}</p>
      </div>
    )}
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-sm bg-primary/8 flex items-center justify-center text-primary font-heading font-bold text-sm">
        {name.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-foreground text-sm">{name}</p>
        <p className="text-muted-foreground text-xs font-body">{location} · {project}</p>
      </div>
    </div>
  </div>
);

/* ──────────────────────────────────────
   COMPONENT: StandardsCallout
   Inline card highlighting a specific standard
   ────────────────────────────────────── */

export const StandardsCallout = ({
  icon: Icon,
  title,
  description,
  variant = "light",
}: {
  icon: typeof Shield;
  title: string;
  description: string;
  variant?: "light" | "dark";
}) => {
  const isDark = variant === "dark";
  return (
    <div className={`flex items-start gap-4 p-5 md:p-6 rounded-sm ${
      isDark
        ? "border border-[hsl(var(--highland-gold)/0.12)] bg-[hsl(var(--dark-section-foreground)/0.03)]"
        : "bg-secondary/60 border border-border/60"
    }`}>
      <div className={`w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 ${
        isDark ? "bg-[hsl(var(--highland-gold)/0.08)]" : "bg-primary/8"
      }`}>
        <Icon className={`w-5 h-5 ${isDark ? "text-[hsl(var(--highland-gold))]" : "text-primary"}`} />
      </div>
      <div>
        <h4 className={`font-heading font-semibold text-sm mb-1 ${isDark ? "text-[hsl(var(--dark-section-foreground))]" : "text-foreground"}`}>
          {title}
        </h4>
        <p className={`text-[13px] font-body leading-relaxed ${isDark ? "text-[hsl(var(--dark-section-foreground)/0.6)]" : "text-muted-foreground"}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────
   COMPONENT: CraftsmanshipStatement
   Premium editorial block
   ────────────────────────────────────── */

export const CraftsmanshipStatement = ({
  heading = "Craftsmanship Isn't a Marketing Word Here.",
  body,
  variant = "dark",
}: {
  heading?: string;
  body?: string;
  variant?: "light" | "dark";
}) => {
  const isDark = variant === "dark";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-2xl"
    >
      <h3 className={`text-2xl md:text-3xl font-heading font-bold mb-5 leading-tight ${
        isDark ? "text-[hsl(var(--dark-section-foreground))]" : "text-foreground"
      }`}>{heading}</h3>
      <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mb-5" />
      <p className={`leading-relaxed ${isDark ? "text-[hsl(var(--dark-section-foreground)/0.7)]" : "text-muted-foreground"}`}>
        {body || "Every Highlander project follows the same discipline: careful material selection, manufacturer-exact installation, detailed inspection, and personal accountability from start to finish. The result isn't a promise — it's a pattern you can see in every project we've ever completed."}
      </p>
    </motion.div>
  );
};

/* ──────────────────────────────────────
   COMPONENT: ReassuranceBlock
   Closing CTA with trust badges
   ────────────────────────────────────── */

interface ReassuranceBlockProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  variant?: "primary" | "dark";
}

export const ReassuranceBlock = ({
  headline = "Ready to Work With a Team\nThat Builds Like It Matters?",
  subheadline = "Start a conversation with our team. No pressure, no upselling — just honest advice from people who build in these mountains every day.",
  ctaText = "Talk With Our Team",
  ctaLink = "/consultation",
  variant = "primary",
}: ReassuranceBlockProps) => {
  const isPrimary = variant === "primary";
  return (
    <section className={`section-padding ${isPrimary ? "bg-primary" : "section-dark tartan-dark"}`}>
      <div className="container-tight text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl md:text-4xl font-heading font-bold mb-4 whitespace-pre-line ${
            isPrimary ? "text-primary-foreground" : "text-[hsl(var(--dark-section-foreground))]"
          }`}>{headline}</h2>
          <p className={`mb-8 max-w-xl mx-auto ${
            isPrimary ? "text-primary-foreground/70" : "text-[hsl(var(--dark-section-foreground)/0.6)]"
          }`}>{subheadline}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={ctaLink}
              className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              {ctaText} <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+18285247773"
              className={`border font-semibold px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 transition-colors ${
                isPrimary
                  ? "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  : "border-[hsl(var(--dark-section-foreground)/0.2)] text-[hsl(var(--dark-section-foreground))] hover:bg-[hsl(var(--dark-section-foreground)/0.05)]"
              }`}
            >
              <Phone className="w-5 h-5" /> (828) 524-7773
            </a>
          </div>
          <TrustBadgeStrip className={`mt-8 ${
            isPrimary ? "text-primary-foreground/50" : "text-[hsl(var(--dark-section-foreground)/0.4)]"
          }`} />
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────
   COMPONENT: TrustSidebar
   Compact sidebar card for embedding
   ────────────────────────────────────── */

export const TrustSidebar = () => (
  <div className="bg-card border border-border rounded-sm p-5 md:p-6 space-y-4">
    <h4 className="font-heading font-semibold text-sm text-foreground">Why Highlander</h4>
    <div className="w-8 h-px bg-[hsl(var(--highland-gold)/0.3)]" />
    {[
      "Licensed NC General Contractor",
      "CertainTeed Master Applicator",
      "Fully Insured — Liability & WC",
      "In-House Crews Only",
      "Rapid Response Time",
      "Written Scope on Every Project",
    ].map((item) => (
      <div key={item} className="flex items-center gap-2">
        <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
        <span className="text-muted-foreground text-xs font-body">{item}</span>
      </div>
    ))}
  </div>
);

/* ──────────────────────────────────────
   COMPONENT: EditorialProofSection
   Two-column proof block with stat + narrative
   ────────────────────────────────────── */

interface EditorialProofProps {
  eyebrow: string;
  heading: string;
  body: string;
  stats: Array<{ value: string; label: string }>;
  variant?: "light" | "dark";
}

export const EditorialProofSection = ({ eyebrow, heading, body, stats, variant = "light" }: EditorialProofProps) => {
  const isDark = variant === "dark";
  return (
    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className={`eyebrow mb-3 block ${isDark ? "text-[hsl(var(--highland-gold))]" : ""}`}>{eyebrow}</span>
        <h2 className={`section-heading mb-5 ${isDark ? "text-[hsl(var(--dark-section-foreground))]" : ""}`}>{heading}</h2>
        <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mb-5" />
        <p className={`leading-relaxed ${isDark ? "text-[hsl(var(--dark-section-foreground)/0.7)]" : "text-muted-foreground"}`}>{body}</p>
      </motion.div>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`text-center p-5 rounded-sm ${
              isDark ? "border border-[hsl(var(--highland-gold)/0.1)]" : "bg-card border border-border"
            }`}
          >
            <p className={`text-2xl md:text-3xl font-heading font-bold mb-1 ${
              isDark ? "text-[hsl(var(--highland-gold))]" : "text-accent"
            }`}>{s.value}</p>
            <p className={`text-xs font-body ${isDark ? "text-[hsl(var(--dark-section-foreground)/0.5)]" : "text-muted-foreground"}`}>
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
