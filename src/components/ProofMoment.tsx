import { REVIEW_COUNT_LABEL, REVIEW_STARS, REVIEW_AS_OF, REVIEW_RATING } from "@/data/business";
import { motion } from "framer-motion";
import { Shield, Award, Star, MapPin, Clock, Phone, CheckCircle2, Mountain, Hammer, type LucideIcon } from "lucide-react";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

/* ─── Preset Configurations ─── */

interface ProofItem {
  icon: LucideIcon;
  text: string;
  stat?: string;
}

interface ProofMomentProps {
  variant: "credentials" | "social" | "stats" | "local" | "warranty";
  className?: string;
  id?: string;
}

const presets: Record<string, { items: ProofItem[]; accent?: string }> = {
  credentials: {
    items: [
      { icon: Award, text: "CertainTeed ShingleMaster Credentialed Contractor" },
      { icon: Shield, text: "Licensed General Contractor" },
      { icon: CheckCircle2, text: "Full Liability & Workers' Comp" },
    ],
  },
  social: {
    items: [
      { icon: Star, text: `${REVIEW_STARS} Google rating (${REVIEW_AS_OF})`, stat: REVIEW_RATING },
      { icon: CheckCircle2, text: REVIEW_COUNT_LABEL },
      { icon: Phone, text: "Local advisor, business-hours response" },
    ],
  },
  stats: {
    items: [
      { icon: Hammer, text: "Team-Led Quality", stat: "100%" },
      { icon: Clock, text: "Family-owned in Franklin since 2017", stat: "2017" },
      { icon: Mountain, text: "8 WNC Counties Served", stat: "8" },
    ],
  },
  local: {
    items: [
      { icon: MapPin, text: "Locally Owned Since 2017" },
      { icon: Mountain, text: "Built for Mountain Conditions" },
      { icon: Shield, text: "Warranty-Backed Every Project" },
    ],
  },
  warranty: {
    items: [
      { icon: Shield, text: "Labor & Material Warranty" },
      { icon: CheckCircle2, text: "Written Scope Before Work" },
      { icon: Award, text: "Top 1% Nationally Certified" },
    ],
  },
};

const ProofMoment = ({ variant, className = "", id }: ProofMomentProps) => {
  const { items } = presets[variant];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
      className={`w-full py-5 md:py-6 bg-secondary/50 border-y border-border/50 relative ${className}`}
      id={id}
    >
      {/* Subtle gold accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.3)] to-transparent" />
      <div className="container-tight">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-10">
          {items.map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.35, ease: HIGHLAND_EASE }}
              className="flex items-center gap-2"
            >
              <item.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
              <span className="text-body-xs md:text-body-sm font-body font-semibold text-foreground whitespace-nowrap">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProofMoment;
