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
}

const presets: Record<string, { items: ProofItem[]; accent?: string }> = {
  credentials: {
    items: [
      { icon: Award, text: "CertainTeed Master Applicator" },
      { icon: Shield, text: "Licensed General Contractor" },
      { icon: CheckCircle2, text: "Full Liability & Workers' Comp" },
    ],
  },
  social: {
    items: [
      { icon: Star, text: "4.9★ Google Rating", stat: "4.9" },
      { icon: CheckCircle2, text: "150+ Verified Reviews" },
      { icon: Phone, text: "24hr Response Guarantee" },
    ],
  },
  stats: {
    items: [
      { icon: Hammer, text: "500+ Projects Completed", stat: "500+" },
      { icon: Clock, text: "40+ Years Combined Exp.", stat: "40+" },
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

const ProofMoment = ({ variant, className = "" }: ProofMomentProps) => {
  const { items } = presets[variant];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: HIGHLAND_EASE }}
      className={`w-full py-4 md:py-5 bg-secondary/40 border-y border-border/40 ${className}`}
    >
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
              <item.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.5)]" />
              <span className="text-[11px] md:text-[12px] font-body font-medium text-muted-foreground whitespace-nowrap">
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
