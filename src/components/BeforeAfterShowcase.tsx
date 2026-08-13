import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

/* ──────────────────────────────────────
   BEFORE/AFTER SLIDER
   Interactive comparison with drag/touch
   ────────────────────────────────────── */

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
}

export const BeforeAfterSlider = ({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  aspectRatio = "4/3",
}: BeforeAfterSliderProps) => {
  const [position, setPosition] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
    if (!hasInteracted) setHasInteracted(true);
  }, [hasInteracted]);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) updatePosition(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  useEffect(() => {
    const up = () => { isDragging.current = false; };
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-sm cursor-col-resize select-none"
      style={{ aspectRatio }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {/* After image (full width, behind) */}
      <img width={1600} height={1067} src={after} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover"  loading="lazy" decoding="async" />

      {/* Before image (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img width={1600} height={1067} src={before} alt={beforeLabel} className="absolute inset-0 w-full h-full object-cover" style={{ width: `${containerRef.current?.offsetWidth || 1000}px`, maxWidth: "none" }}  loading="lazy" decoding="async" />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 z-10"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-0.5 h-full bg-white/90 shadow-flat" />
        {/* Handle — with attention pulse on first view */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-raised flex items-center justify-center transition-shadow ${!hasInteracted ? "animate-ba-pulse" : ""}`}>
          <div className="flex items-center gap-0.5">
            <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-r-[5px] border-transparent border-r-[hsl(var(--heritage-charcoal))]" />
            <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-l-[5px] border-transparent border-l-[hsl(var(--heritage-charcoal))]" />
          </div>
        </div>
      </div>

      {/* Labels — staggered fade in */}
      <motion.div
        className="absolute top-4 left-4 z-20"
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <span className="text-caption font-body font-semibold uppercase tracking-wider text-white bg-[hsl(var(--heritage-charcoal)/0.7)] backdrop-blur-sm px-3 py-1.5 rounded-sm">
          {beforeLabel}
        </span>
      </motion.div>
      <motion.div
        className="absolute top-4 right-4 z-20"
        initial={{ opacity: 0, x: 8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <span className="text-caption font-body font-semibold uppercase tracking-wider text-white bg-primary/80 backdrop-blur-sm px-3 py-1.5 rounded-sm">
          {afterLabel}
        </span>
      </motion.div>
    </div>
  );
};

/* ──────────────────────────────────────
   BEFORE/AFTER SHOWCASE CARD
   Full card with slider + metadata + copy
   ────────────────────────────────────── */

interface BeforeAfterShowcaseProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  title: string;
  location: string;
  category: string;
  whatChanged: string;
  whyItMattered: string;
  highlanderDifference: string;
  projectSlug?: string;
}

export const BeforeAfterShowcase = ({
  before,
  after,
  beforeLabel,
  afterLabel,
  title,
  location,
  category,
  whatChanged,
  whyItMattered,
  highlanderDifference,
  projectSlug,
}: BeforeAfterShowcaseProps) => (
  <ScrollReveal variant="rise">
    <div className="card-premium overflow-hidden testimonial-hover">
      <BeforeAfterSlider
        before={before}
        after={after}
        beforeLabel={beforeLabel}
        afterLabel={afterLabel}
      />
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-caption font-body font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-sm bg-primary/10 text-primary">
            {category}
          </span>
          <span className="text-muted-foreground text-xs font-body flex items-center gap-1">
            <MapPin className="w-4 h-4" aria-hidden="true" /> {location}
          </span>
        </div>
        <h3 className="font-heading font-bold text-xl text-foreground mb-4">{title}</h3>

        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-caption font-body font-semibold uppercase tracking-wider text-[hsl(var(--gold-ink))] mb-1">What Changed</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{whatChanged}</p>
          </div>
          <div>
            <h4 className="text-caption font-body font-semibold uppercase tracking-wider text-[hsl(var(--gold-ink))] mb-1">Why It Mattered</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{whyItMattered}</p>
          </div>
          <div>
            <h4 className="text-caption font-body font-semibold uppercase tracking-wider text-[hsl(var(--gold-ink))] mb-1">The Highlander Difference</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{highlanderDifference}</p>
          </div>
        </div>

        {projectSlug && (
          <Link
            to={`/projects/${projectSlug}`}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors link-draw"
          >
            View Full Project Story
            <ArrowRight className="w-4 h-4 btn-arrow-icon" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  </ScrollReveal>
);

/* ──────────────────────────────────────
   BEFORE/AFTER GRID
   Multiple showcases in a grid layout
   ────────────────────────────────────── */

interface BeforeAfterGridProps {
  items: Array<{
    before: string;
    after: string;
    beforeLabel?: string;
    afterLabel?: string;
    title: string;
    location: string;
    category: string;
    whatChanged: string;
    whyItMattered: string;
    highlanderDifference: string;
    projectSlug?: string;
  }>;
  heading?: string;
  eyebrow?: string;
  subheading?: string;
}

export const BeforeAfterGrid = ({
  items,
  heading = "The Transformation",
  eyebrow = "Before & After",
  subheading,
}: BeforeAfterGridProps) => (
  <div>
    <div className="text-center mb-12 md:mb-14">
      <ScrollReveal variant="fade">
        <span className="eyebrow mb-3 block">{eyebrow}</span>
      </ScrollReveal>
      <HeadingReveal>
        <h2 className="section-heading mb-4">{heading}</h2>
      </HeadingReveal>
      <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
      {subheading && (
        <ScrollReveal variant="rise-subtle" delay={0.2}>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subheading}</p>
        </ScrollReveal>
      )}
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((item) => (
        <BeforeAfterShowcase key={item.title} {...item} />
      ))}
    </div>
  </div>
);

/* ──────────────────────────────────────
   COMPACT BEFORE/AFTER
   Smaller inline version for service pages
   ────────────────────────────────────── */

interface CompactBeforeAfterProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  title: string;
  result: string;
}

export const CompactBeforeAfter = ({
  before,
  after,
  beforeLabel,
  afterLabel,
  title,
  result,
}: CompactBeforeAfterProps) => (
  <ScrollReveal variant="scale">
    <div className="card-premium overflow-hidden">
      <BeforeAfterSlider
        before={before}
        after={after}
        beforeLabel={beforeLabel}
        afterLabel={afterLabel}
        aspectRatio="16/9"
      />
      <div className="p-4 md:p-5">
        <h4 className="font-heading font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-muted-foreground text-sm">{result}</p>
      </div>
    </div>
  </ScrollReveal>
);
