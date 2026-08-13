import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

type FrameVariant = "default" | "featured" | "editorial";

interface ImageFrameProps {
  src: string;
  alt: string;
  /** Aspect ratio */
  aspect?: "4/3" | "16/9" | "1/1" | "3/4" | "16/7";
  /** Frame style */
  variant?: FrameVariant;
  /** Gold accent line position */
  accentPosition?: "bottom" | "left" | "none";
  /** Category badge text */
  badge?: string;
  /** Enable cinematic zoom on hover */
  zoom?: boolean;
  /** Lazy loading */
  lazy?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const ImageFrame = ({
  src,
  alt,
  aspect = "4/3",
  variant = "default",
  accentPosition = "bottom",
  badge,
  zoom = true,
  lazy = true,
  className,
  children,
}: ImageFrameProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
      className={cn(
        "group relative rounded-none overflow-hidden",
        variant === "featured" && "shadow-raised",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden", `aspect-[${aspect}]`)} style={{ aspectRatio: aspect }}>
        <motion.img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover",
            zoom && "img-zoom-dramatic",
          )}
          loading={lazy ? "lazy" : "eager"}
          initial={variant === "editorial" ? { scale: 1.08 } : { scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
        />

        {/* Cinematic gradient overlay */}
        {variant !== "default" && (
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0.7)] via-[hsl(var(--heritage-charcoal)/0.1)] to-transparent group-hover:from-[hsl(var(--heritage-charcoal)/0.8)] transition-all duration-700" />
        )}

        {/* Category badge */}
        {badge && (
          <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground text-caption font-body font-semibold uppercase tracking-[0.15em] px-3 py-1.5 z-10">
            {badge}
          </div>
        )}

        {/* Gold accent line */}
        {accentPosition === "bottom" && (
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[hsl(var(--highland-gold))] to-[hsl(var(--highland-gold)/0)]"
            initial={{ width: 0 }}
            whileInView={{ width: "40%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3, ease: HIGHLAND_EASE }}
          />
        )}
        {accentPosition === "left" && (
          <motion.div
            className="absolute top-0 left-0 w-[2px] bg-gradient-to-b from-[hsl(var(--highland-gold))] to-[hsl(var(--highland-gold)/0)]"
            initial={{ height: 0 }}
            whileInView={{ height: "40%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3, ease: HIGHLAND_EASE }}
          />
        )}

        {/* Children overlay (captions, titles, etc.) */}
        {children && (
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
};
