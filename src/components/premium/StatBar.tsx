import { motion } from "framer-motion";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

/* ─── Stat Item ─── */

interface StatItemProps {
  value: string;
  label: string;
  detail?: string;
  /** Animate the number */
  animate?: boolean;
  className?: string;
}

export const StatItem = ({
  value,
  label,
  detail,
  animate = true,
  className,
}: StatItemProps) => (
  <div className={cn("flex flex-col items-center text-center", className)}>
    {animate ? (
      <AnimatedCounter
        value={value}
        className="stat-number-sm text-[hsl(var(--gold-ink))] leading-none mb-1.5"
        duration={1800}
      />
    ) : (
      <span className="stat-number-sm text-[hsl(var(--gold-ink))] leading-none mb-1.5">{value}</span>
    )}
    <span className="text-sm font-heading font-bold text-inherit mb-1 tracking-tight opacity-80">{label}</span>
    {detail && (
      <span className="text-[10px] font-body tracking-[0.15em] uppercase opacity-30">{detail}</span>
    )}
  </div>
);

/* ─── Stat Bar ─── */

interface StatBarProps {
  stats: Array<{ value: string; label: string; detail?: string }>;
  /** Visual mode */
  variant?: "primary" | "dark" | "light";
  /** Show animated counters */
  animate?: boolean;
  className?: string;
}

const barVariants = {
  primary: {
    wrapper: "bg-primary text-primary-foreground tartan-dark",
    divider: "md:divide-primary-foreground/[0.06]",
  },
  dark: {
    wrapper: "section-dark tartan-dark",
    divider: "md:divide-[hsl(var(--dark-section-foreground)/0.06)]",
  },
  light: {
    wrapper: "bg-secondary/50",
    divider: "md:divide-border",
  },
};

export const StatBar = ({
  stats,
  variant = "primary",
  animate = true,
  className,
}: StatBarProps) => {
  const v = barVariants[variant];

  return (
    <section className={cn("relative overflow-hidden", v.wrapper, className)}>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.3)] to-transparent" />
      <div className="container-tight px-6 md:px-10 py-8 md:py-12">
        <div className={cn(
          "grid gap-6 md:gap-0",
          stats.length <= 3 ? "grid-cols-3" : "grid-cols-2 lg:grid-cols-4",
          "md:divide-x",
          v.divider,
        )}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: HIGHLAND_EASE }}
              className="md:px-8 lg:px-10"
            >
              <StatItem {...stat} animate={animate} />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.3)] to-transparent" />
    </section>
  );
};
