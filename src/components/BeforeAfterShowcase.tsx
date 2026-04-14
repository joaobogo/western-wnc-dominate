import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, Ruler } from "lucide-react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

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
      <img src={after} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover" />

      {/* Before image (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img src={before} alt={beforeLabel} className="absolute inset-0 w-full h-full object-cover" style={{ width: `${containerRef.current?.offsetWidth || 1000}px`, maxWidth: "none" }} />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 z-10"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-0.5 h-full bg-white/90 shadow-[0_0_8px_rgba(0,0,0,0.3)]" />
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <div className="flex items-center gap-0.5">
            <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-r-[5px] border-transparent border-r-[hsl(var(--heritage-charcoal))]" />
            <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-l-[5px] border-transparent border-l-[hsl(var(--heritage-charcoal))]" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-20">
        <span className="text-[10px] font-body font-semibold uppercase tracking-wider text-white bg-[hsl(var(--heritage-charcoal)/0.7)] backdrop-blur-sm px-3 py-1.5 rounded-sm">
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-4 right-4 z-20">
        <span className="text-[10px] font-body font-semibold uppercase tracking-wider text-white bg-primary/80 backdrop-blur-sm px-3 py-1.5 rounded-sm">
          {afterLabel}
        </span>
      </div>
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
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="card-premium overflow-hidden"
  >
    <BeforeAfterSlider
      before={before}
      after={after}
      beforeLabel={beforeLabel}
      afterLabel={afterLabel}
    />
    <div className="p-6 md:p-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[9px] font-body font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-sm bg-primary/10 text-primary">
          {category}
        </span>
        <span className="text-muted-foreground text-xs font-body flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {location}
        </span>
      </div>
      <h3 className="font-heading font-bold text-xl text-foreground mb-4">{title}</h3>

      <div className="space-y-4 mb-6">
        <div>
          <h4 className="text-[11px] font-body font-semibold uppercase tracking-wider text-accent mb-1">What Changed</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">{whatChanged}</p>
        </div>
        <div>
          <h4 className="text-[11px] font-body font-semibold uppercase tracking-wider text-accent mb-1">Why It Mattered</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">{whyItMattered}</p>
        </div>
        <div>
          <h4 className="text-[11px] font-body font-semibold uppercase tracking-wider text-accent mb-1">The Highlander Difference</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">{highlanderDifference}</p>
        </div>
      </div>

      {projectSlug && (
        <Link
          to={`/projects/${projectSlug}`}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          View Full Project Story
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  </motion.div>
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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12 md:mb-14"
    >
      <span className="eyebrow mb-3 block">{eyebrow}</span>
      <h2 className="section-heading mb-4">{heading}</h2>
      <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
      {subheading && <p className="text-muted-foreground max-w-2xl mx-auto">{subheading}</p>}
    </motion.div>
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
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="card-premium overflow-hidden"
  >
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
  </motion.div>
);
