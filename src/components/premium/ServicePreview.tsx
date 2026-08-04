import { ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Division } from "@/lib/division-theme";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

interface ServicePreviewProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  division?: Division;
  /** Compact sidebar variant */
  compact?: boolean;
  className?: string;
}

const divisionStyles = {
  roofing: {
    iconBg: "bg-primary/8 group-hover:bg-primary/14",
    iconColor: "text-primary",
    ctaColor: "text-primary",
    label: "Roofing",
  },
  construction: {
    iconBg: "bg-[hsl(var(--highland-gold)/0.08)] group-hover:bg-[hsl(var(--highland-gold)/0.14)]",
    iconColor: "text-[hsl(var(--gold-ink))]",
    ctaColor: "text-[hsl(var(--gold-ink))]",
    label: "Construction",
  },
};

export const ServicePreview = ({
  icon: Icon,
  title,
  description,
  href,
  division = "roofing",
  compact = false,
  className,
}: ServicePreviewProps) => {
  const styles = divisionStyles[division];

  if (compact) {
    return (
      <Link to={href} className={cn("group flex items-center gap-3 py-2.5 px-3 rounded-sm hover:bg-secondary/50 transition-all", className)}>
        <div className={cn("w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors", styles.iconBg)}>
          <Icon className={cn("w-4 h-4", styles.iconColor)} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-heading font-semibold text-foreground truncate">{title}</p>
          <p className="text-[11px] text-muted-foreground/50 font-body truncate">{description}</p>
        </div>
        <ArrowRight className="w-3 h-3 text-muted-foreground/70 group-hover:text-muted-foreground btn-arrow-icon flex-shrink-0" />
      </Link>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: HIGHLAND_EASE }}
    >
      <Link to={href} className={cn("group block card-premium tartan-hover p-0 h-full", className)}>
        <div className={cn(
          "h-[2px] w-full bg-gradient-to-r from-transparent to-transparent",
          division === "roofing"
            ? "via-[hsl(var(--heritage-green)/0.3)]"
            : "via-[hsl(var(--highland-gold)/0.35)]",
        )} />
        <div className="p-6 flex flex-col h-full relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className={cn("w-10 h-10 rounded-sm flex items-center justify-center transition-colors", styles.iconBg)}>
              <Icon className={cn("w-5 h-5", styles.iconColor)} />
            </div>
            <span className={cn("text-[9px] font-body font-semibold uppercase tracking-[0.14em] opacity-40 group-hover:opacity-60 transition-opacity", styles.iconColor)}>
              {styles.label}
            </span>
          </div>
          <h4 className="text-base font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{title}</h4>
          <p className="text-muted-foreground text-[13px] leading-relaxed font-body mb-5 flex-grow">{description}</p>
          <span className={cn("inline-flex items-center gap-1.5 font-semibold text-sm font-body group-hover:gap-2.5 transition-all", styles.ctaColor)}>
            Learn More <ArrowRight className="w-3.5 h-3.5 btn-arrow-icon" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
};
