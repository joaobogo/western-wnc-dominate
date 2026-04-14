import { motion } from "framer-motion";
import {
  Gem, ShieldCheck, MessageSquare, Clock, Mountain, Sparkles, Heart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ──────────────────────────────────────
   DATA: The Seven Values
   ────────────────────────────────────── */

export interface BrandValue {
  icon: LucideIcon;
  name: string;
  tagline: string;
  statement: string;
  teamQuote: string;
  ctaSupport: string;
  overcomes: string;
}

export const brandValues: BrandValue[] = [
  {
    icon: Gem,
    name: "Craftsmanship",
    tagline: "No Shortcuts at 4,000 Feet",
    statement: "Every cut, seam, and fastener is executed to a standard that outlasts the weather it was built for.",
    teamQuote: "We don't build to pass inspection. We build to last decades.",
    ctaSupport: "Work with a team that treats your roof like they'll drive past it every day.",
    overcomes: "How do I know the quality will be there?",
  },
  {
    icon: ShieldCheck,
    name: "Integrity",
    tagline: "What We Say Is What We Do",
    statement: "Honest assessments. No upselling. Written scope before work begins. No surprise change orders.",
    teamQuote: "We'd rather lose a job than sell you something you don't need.",
    ctaSupport: "Get a straight answer about your roof — not a sales pitch.",
    overcomes: "Will I get a bait-and-switch estimate?",
  },
  {
    icon: MessageSquare,
    name: "Communication",
    tagline: "You'll Always Know What's Happening",
    statement: "Named point of contact. Daily updates. You'll never wonder what's happening on your project.",
    teamQuote: "We answer our phones. We return calls the same day. We explain things in plain language.",
    ctaSupport: "From your first call to your final walkthrough, you'll always know exactly where things stand.",
    overcomes: "Will they disappear after I sign?",
  },
  {
    icon: Clock,
    name: "Long-Term Value",
    tagline: "Built to Last, Not Just to Look Good",
    statement: "We build for the next 30 years, not just the next inspection. Every material and method is chosen for longevity.",
    teamQuote: "The cheapest option almost never lasts. We help you invest wisely.",
    ctaSupport: "Choose a roof that performs for decades — not one that just passes code.",
    overcomes: "Am I getting a quality installation or a cheap fix?",
  },
  {
    icon: Mountain,
    name: "Regional Pride",
    tagline: "Built for These Mountains",
    statement: "Born in Western North Carolina. Built for mountain weather, mountain architecture, and mountain communities.",
    teamQuote: "We live here. We build here. We're not passing through.",
    ctaSupport: "Work with a team that knows what 4,000 feet of elevation does to a roof.",
    overcomes: "Do they understand mountain building?",
  },
  {
    icon: Sparkles,
    name: "Professionalism",
    tagline: "Your Home Deserves Better Than a Messy Job Site",
    statement: "Clean job sites. On-time arrivals. Branded crews. Respectful of your property and your neighbors.",
    teamQuote: "We treat your property the way we'd treat our own — maybe better.",
    ctaSupport: "Experience what it's like to work with a contractor who actually respects your home.",
    overcomes: "Will my home be torn apart?",
  },
  {
    icon: Heart,
    name: "Project Care",
    tagline: "Every Project. Same Standard.",
    statement: "Every project gets the same attention whether it's a $5,000 repair or a $50,000 installation.",
    teamQuote: "We don't have a B-team. Every crew operates to the same standard.",
    ctaSupport: "Your project gets the same crew quality and attention as our largest installations.",
    overcomes: "Will my small project get ignored?",
  },
];

/* ──────────────────────────────────────
   COMPONENT: ValuesPillarGrid
   Flexible grid (4 or 7 values)
   ────────────────────────────────────── */

interface ValuesPillarGridProps {
  count?: 4 | 7;
  variant?: "light" | "dark";
  showObjections?: boolean;
  heading?: string;
  eyebrow?: string;
  subheading?: string;
}

export const ValuesPillarGrid = ({
  count = 7,
  variant = "light",
  showObjections = false,
  heading = "What We Stand For",
  eyebrow = "Our Values",
  subheading,
}: ValuesPillarGridProps) => {
  const values = brandValues.slice(0, count);
  const cols = count <= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
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
          <p className={`max-w-2xl mx-auto text-base ${isDark ? "text-[hsl(var(--dark-section-foreground)/0.6)]" : "text-muted-foreground"}`}>
            {subheading}
          </p>
        )}
      </motion.div>
      <div className={`grid ${cols} gap-5`}>
        {values.map((v, i) => (
          <motion.div
            key={v.name}
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
              <v.icon className={`w-5 h-5 ${isDark ? "text-[hsl(var(--highland-gold))]" : "text-primary"}`} />
            </div>
            <h3 className={`font-heading font-semibold text-sm mb-1 ${isDark ? "text-[hsl(var(--dark-section-foreground))]" : "text-foreground"}`}>
              {v.name}
            </h3>
            <p className={`text-[10px] font-body font-semibold uppercase tracking-wider mb-3 ${
              isDark ? "text-[hsl(var(--highland-gold)/0.6)]" : "text-accent"
            }`}>{v.tagline}</p>
            <p className={`text-[13px] leading-relaxed font-body ${isDark ? "text-[hsl(var(--dark-section-foreground)/0.6)]" : "text-muted-foreground"}`}>
              {v.statement}
            </p>
            {showObjections && (
              <div className={`text-[11px] font-body italic pt-3 mt-3 border-t ${
                isDark ? "border-[hsl(var(--highland-gold)/0.08)] text-[hsl(var(--dark-section-foreground)/0.4)]" : "border-border text-muted-foreground/50"
              }`}>
                Overcomes: "{v.overcomes}"
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ──────────────────────────────────────
   COMPONENT: ValuesEditorial
   Alternating full-width sections for About page
   ────────────────────────────────────── */

interface ValuesEditorialProps {
  values?: BrandValue[];
  variant?: "light" | "dark";
}

export const ValuesEditorial = ({ values: customValues, variant = "light" }: ValuesEditorialProps) => {
  const items = customValues || brandValues;
  const isDark = variant === "dark";

  return (
    <div className="space-y-16 md:space-y-20">
      {items.map((v, i) => (
        <motion.div
          key={v.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}
        >
          <div className={i % 2 === 1 ? "md:order-2" : ""}>
            <div className={`w-12 h-12 rounded-sm flex items-center justify-center mb-4 ${
              isDark ? "bg-[hsl(var(--highland-gold)/0.1)]" : "bg-primary/8"
            }`}>
              <v.icon className={`w-6 h-6 ${isDark ? "text-[hsl(var(--highland-gold))]" : "text-primary"}`} />
            </div>
            <span className={`text-[10px] font-body font-semibold uppercase tracking-wider block mb-2 ${
              isDark ? "text-[hsl(var(--highland-gold)/0.6)]" : "text-accent"
            }`}>{v.tagline}</span>
            <h3 className={`text-2xl md:text-3xl font-heading font-bold mb-4 ${
              isDark ? "text-[hsl(var(--dark-section-foreground))]" : "text-foreground"
            }`}>{v.name}</h3>
            <div className="w-10 h-px bg-[hsl(var(--highland-gold)/0.4)] mb-4" />
            <p className={`leading-relaxed mb-4 ${isDark ? "text-[hsl(var(--dark-section-foreground)/0.7)]" : "text-muted-foreground"}`}>
              {v.statement}
            </p>
            <blockquote className={`text-sm italic border-l-2 border-[hsl(var(--highland-gold)/0.3)] pl-4 ${
              isDark ? "text-[hsl(var(--dark-section-foreground)/0.5)]" : "text-muted-foreground/70"
            }`}>
              "{v.teamQuote}"
            </blockquote>
          </div>
          <div className={`aspect-[4/3] rounded-sm overflow-hidden bg-secondary ${i % 2 === 1 ? "md:order-1" : ""}`}>
            <div className={`w-full h-full flex items-center justify-center ${
              isDark ? "bg-[hsl(var(--dark-section-foreground)/0.05)]" : "bg-secondary"
            }`}>
              <v.icon className={`w-16 h-16 ${isDark ? "text-[hsl(var(--highland-gold)/0.08)]" : "text-primary/8"}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ──────────────────────────────────────
   COMPONENT: ValuesTrustBar
   Single-line horizontal strip
   ────────────────────────────────────── */

export const ValuesTrustBar = ({ className = "", count = 7 }: { className?: string; count?: number }) => (
  <div className={`flex flex-wrap justify-center gap-x-6 gap-y-2 ${className}`}>
    {brandValues.slice(0, count).map((v, i) => (
      <span key={v.name} className="flex items-center gap-1.5 text-xs font-body font-medium uppercase tracking-wider">
        {i > 0 && <span className="text-current opacity-20 mr-1">•</span>}
        <v.icon className="w-3.5 h-3.5 opacity-60" />
        {v.name}
      </span>
    ))}
  </div>
);

/* ──────────────────────────────────────
   COMPONENT: ValuesCTASupport
   Small text below CTA reinforcing a value
   ────────────────────────────────────── */

export const ValuesCTASupport = ({
  valueName,
  className = "",
}: {
  valueName: "Craftsmanship" | "Integrity" | "Communication" | "Long-Term Value" | "Regional Pride" | "Professionalism" | "Project Care";
  className?: string;
}) => {
  const value = brandValues.find((v) => v.name === valueName);
  if (!value) return null;
  return (
    <p className={`text-sm italic opacity-60 mt-3 ${className}`}>
      {value.ctaSupport}
    </p>
  );
};

/* ──────────────────────────────────────
   COMPONENT: ValuesTeamOverlay
   Team member card with personal value statement
   ────────────────────────────────────── */

interface ValuesTeamOverlayProps {
  name: string;
  role: string;
  valueName: string;
  image?: string;
}

export const ValuesTeamOverlay = ({ name, role, valueName, image }: ValuesTeamOverlayProps) => {
  const value = brandValues.find((v) => v.name === valueName);
  if (!value) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-premium overflow-hidden group"
    >
      <div className="aspect-[3/4] bg-secondary relative overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/5">
            <span className="text-4xl font-heading font-bold text-primary/15">{name.charAt(0)}</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0.8)] to-transparent">
          <p className="font-heading font-semibold text-white text-sm">{name}</p>
          <p className="text-white/60 text-xs font-body">{role}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <value.icon className="w-3.5 h-3.5 text-accent" />
          <span className="text-[10px] font-body font-semibold uppercase tracking-wider text-accent">{value.name}</span>
        </div>
        <p className="text-muted-foreground text-[13px] font-body italic leading-relaxed">
          "{value.teamQuote}"
        </p>
      </div>
    </motion.div>
  );
};
