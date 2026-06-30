import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

interface QuoteModuleProps {
  /** The quote text */
  quote: string;
  /** Attribution name */
  author?: string;
  /** Role or location */
  subtitle?: string;
  /** Visual variant */
  variant?: "editorial" | "inline" | "dark";
  className?: string;
}

export const QuoteModule = ({
  quote,
  author,
  subtitle,
  variant = "editorial",
  className,
}: QuoteModuleProps) => {
  const isDark = variant === "dark";
  const isInline = variant === "inline";

  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: HIGHLAND_EASE }}
      className={cn(
        "relative",
        isInline ? "pl-5 border-l-2 border-[hsl(var(--highland-gold)/0.3)]" : "text-center",
        isDark && "text-[hsl(var(--dark-section-foreground))]",
        className,
      )}
    >
      {/* Decorative quote glyph — editorial only */}
      {!isInline && (
        <span
          className={cn(
            "block font-heading text-[4rem] md:text-[5rem] leading-[0.8] select-none mb-2",
            isDark ? "text-[hsl(var(--highland-gold)/0.1)]" : "text-[hsl(var(--highland-gold)/0.08)]",
          )}
          aria-hidden
        >
          "
        </span>
      )}

      <p
        className={cn(
          "font-heading italic leading-[1.5]",
          isInline
            ? "text-lg text-foreground/80"
            : "text-xl md:text-2xl lg:text-[1.75rem]",
          isDark && !isInline && "text-[hsl(var(--dark-section-foreground)/0.85)]",
          !isDark && !isInline && "text-foreground",
        )}
      >
        {quote}
      </p>

      {(author || subtitle) && (
        <footer className={cn("mt-5", isInline ? "mt-3" : "mt-6")}>
          {!isInline && (
            <div
              className={cn(
                "w-8 h-px mx-auto mb-4",
                isDark
                  ? "bg-[hsl(var(--highland-gold)/0.2)]"
                  : "bg-[hsl(var(--highland-gold)/0.3)]",
              )}
            />
          )}
          {author && (
            <cite
              className={cn(
                "not-italic font-heading font-bold block",
                isInline ? "text-sm" : "text-base",
                isDark ? "text-[hsl(var(--dark-section-foreground)/0.8)]" : "text-foreground",
              )}
            >
              {author}
            </cite>
          )}
          {subtitle && (
            <span
              className={cn(
                "font-body text-[11px] uppercase tracking-[0.12em]",
                isDark ? "text-[hsl(var(--dark-section-foreground)/0.3)]" : "text-muted-foreground/50",
              )}
            >
              {subtitle}
            </span>
          )}
        </footer>
      )}
    </motion.blockquote>
  );
};
