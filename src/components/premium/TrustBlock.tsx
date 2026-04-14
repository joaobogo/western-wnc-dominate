import { type LucideIcon, Shield, Award, Clock, Mountain } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

/* ─── Trust Badge ─── */

interface TrustBadgeProps {
  icon: LucideIcon;
  label: string;
  /** Visual weight */
  variant?: "default" | "subtle" | "dark";
  className?: string;
}

const badgeVariants = {
  default: {
    wrapper: "flex items-center gap-2 badge-trust",
    icon: "w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.5)]",
    text: "text-muted-foreground text-xs font-body font-medium",
  },
  subtle: {
    wrapper: "flex items-center gap-2",
    icon: "w-3 h-3 text-[hsl(var(--highland-gold)/0.35)]",
    text: "text-muted-foreground/50 text-[11px] font-body font-medium",
  },
  dark: {
    wrapper: "flex items-center gap-2",
    icon: "w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.4)]",
    text: "text-[hsl(var(--dark-section-foreground)/0.25)] text-xs font-body font-medium",
  },
};

export const TrustBadge = ({ icon: Icon, label, variant = "default", className }: TrustBadgeProps) => {
  const v = badgeVariants[variant];
  return (
    <div className={cn(v.wrapper, className)}>
      <Icon className={v.icon} />
      <span className={v.text}>{label}</span>
    </div>
  );
};

/* ─── Trust Block ─── */

interface TrustBlockProps {
  items?: Array<{ icon: LucideIcon; label: string }>;
  variant?: "default" | "dark" | "inline";
  className?: string;
}

const defaultTrustItems = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Award, label: "CertainTeed Certified" },
  { icon: Clock, label: "24-Hour Response" },
  { icon: Mountain, label: "All of Western NC" },
];

export const TrustBlock = ({
  items = defaultTrustItems,
  variant = "default",
  className,
}: TrustBlockProps) => {
  const isDark = variant === "dark";
  const isInline = variant === "inline";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.5, ease: HIGHLAND_EASE }}
      className={cn(
        "flex flex-wrap items-center gap-4 sm:gap-8",
        isInline ? "justify-start" : "justify-center",
        !isInline && "pt-8 border-t",
        isDark ? "border-[hsl(var(--dark-section-foreground)/0.06)]" : "border-border/60",
        className,
      )}
    >
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.08 }}
        >
          <TrustBadge
            icon={item.icon}
            label={item.label}
            variant={isDark ? "dark" : "default"}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
