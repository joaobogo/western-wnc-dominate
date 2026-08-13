import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

type TestimonialVariant = "featured" | "compact" | "dark";
type TestimonialCategory = "Roofing" | "Construction" | "Storm" | "Commercial";

const categoryColors: Record<TestimonialCategory, string> = {
  Roofing: "bg-primary/10 text-primary",
  Construction: "bg-[hsl(var(--highland-gold)/0.12)] text-[hsl(var(--gold-ink))]",
  Storm: "bg-destructive/10 text-destructive",
  Commercial: "bg-secondary text-muted-foreground",
};

interface TestimonialCardProps {
  name: string;
  location: string;
  text: string;
  project?: string;
  category?: TestimonialCategory;
  outcome?: string;
  variant?: TestimonialVariant;
  className?: string;
}

export const TestimonialCard = ({
  name,
  location,
  text,
  project,
  category = "Roofing",
  outcome,
  variant = "featured",
  className,
}: TestimonialCardProps) => {
  const isDark = variant === "dark";
  const isCompact = variant === "compact";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
      className={cn(
        "relative overflow-hidden h-full",
        isDark
          ? "bg-[hsl(var(--dark-section))] border border-[hsl(var(--dark-section-foreground)/0.06)]"
          : "bg-card border border-border",
        "rounded-none hover:border-[hsl(var(--highland-gold)/0.2)] transition-all duration-500",
        isCompact ? "p-5 md:p-6" : "p-6 md:p-10",
        !isCompact && "quote-glyph",
        className,
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {/* Top gold accent */}
      {!isCompact && (
        <div className="h-px w-full absolute top-0 left-0 right-0 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.3)] to-transparent" />
      )}

      {/* Header: category + stars */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <span
          className={cn(
            "font-body font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-none",
            isCompact ? "text-caption px-2 py-0.5" : "text-caption",
            categoryColors[category],
          )}
        >
          {category}
        </span>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={cn("fill-accent text-[hsl(var(--gold-ink))]", isCompact ? "w-2.5 h-2.5" : "w-3.5 h-3.5")} />
          ))}
        </div>
      </div>

      {/* Quote text */}
      <p
        className={cn(
          "leading-[1.8] font-body relative z-10",
          isCompact ? "text-body-xs line-clamp-4 mb-4" : "text-body-sm md:text-base mb-7",
          isDark ? "text-[hsl(var(--dark-section-foreground)/0.8)]" : "text-foreground",
        )}
      >
        "{text}"
      </p>

      {/* Outcome block — featured only */}
      {outcome && !isCompact && (
        <div
          className={cn(
            "rounded-none px-5 py-3.5 mb-7 relative z-10",
            isDark ? "bg-[hsl(var(--dark-section-foreground)/0.04)]" : "bg-secondary/50",
          )}
        >
          <p className={cn("text-caption font-body font-semibold uppercase tracking-[0.1em] mb-1", isDark ? "text-[hsl(var(--dark-section-foreground)/0.3)]" : "text-muted-foreground")}>
            Project Outcome
          </p>
          <p className={cn("text-sm font-body font-medium", isDark ? "text-[hsl(var(--dark-section-foreground)/0.7)]" : "text-foreground/80")}>
            {outcome}
          </p>
        </div>
      )}

      {/* Compact outcome */}
      {outcome && isCompact && (
        <p className={cn("text-caption font-body font-medium mb-4 leading-snug", isDark ? "text-[hsl(var(--highland-gold)/0.9)]" : "text-primary/80")}>
          {outcome}
        </p>
      )}

      {/* Author */}
      <div className={cn("flex items-center justify-between relative z-10", !isCompact && "mt-auto", isCompact && "pt-3 border-t border-border")}>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "rounded-none flex items-center justify-center font-heading font-bold",
              isCompact ? "w-8 h-8 text-caption" : "w-11 h-11 text-sm",
              isDark ? "bg-[hsl(var(--highland-gold)/0.08)] text-[hsl(var(--gold-ink))]" : "bg-primary/8 text-primary",
            )}
          >
            {name.charAt(0)}
          </div>
          <div>
            <p className={cn("font-heading font-bold", isCompact ? "text-xs" : "text-sm", isDark ? "text-[hsl(var(--dark-section-foreground))]" : "text-foreground")}>
              {name}
            </p>
            <p className={cn("font-body", isCompact ? "text-caption" : "text-xs", isDark ? "text-[hsl(var(--dark-section-foreground)/0.4)]" : "text-muted-foreground")}>
              {location}
            </p>
          </div>
        </div>
        {project && !isCompact && (
          <span className={cn("text-caption font-body font-medium max-w-[140px] text-right leading-tight", isDark ? "text-[hsl(var(--dark-section-foreground)/0.3)]" : "text-muted-foreground")}>
            {project}
          </span>
        )}
      </div>
    </motion.div>
  );
};
