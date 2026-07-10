import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import asphaltHero from "@/assets/gallery/asphalt-hero.webp";
import metal005 from "@/assets/gallery/metal-005.webp";
import cedar004 from "@/assets/gallery/cedar-005.jpg";
import asphalt006 from "@/assets/gallery/asphalt-006.webp";
import metal006 from "@/assets/gallery/metal-006.webp";

const projects = [
  {
    title: "Dimensional Shingles — Weathered Wood",
    location: "Highlands, NC",
    type: "Asphalt Shingles",
    description: "CertainTeed Landmark shingles on a multi-level mountain home with screen porch. Premium materials, expert installation.",
    image: asphaltHero,
  },
  {
    title: "Standing Seam Metal — Dark Bronze",
    location: "Cashiers, NC",
    type: "Metal Roofing",
    description: "Precision panel work on a complex multi-gable standing seam roof. Built for decades of mountain weather.",
    image: metal005,
  },
  {
    title: "Cedar Shake — Estate Home",
    location: "Highlands, NC",
    type: "Cedar Shake",
    description: "Stunning cedar shake roof on a luxury estate. Intricate multi-gable design with copper ridge accents.",
    image: cedar004,
  },
  {
    title: "Dimensional Shingles — Slate Gray",
    location: "Franklin, NC",
    type: "Asphalt Shingles",
    description: "Large residential shingle replacement in slate gray with complex roof intersections and ridge detail.",
    image: asphalt006,
  },
  {
    title: "Standing Seam Metal — Mountain Cabin",
    location: "Sylva, NC",
    type: "Metal Roofing",
    description: "Green standing seam metal on a log cabin nestled in the WNC mountains. Built for heavy snow loads.",
    image: metal006,
  },
];

const BeforeAfterGallery = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const next = useCallback(() => { setDirection(1); setCurrent((c) => (c + 1) % projects.length); }, []);
  const prev = useCallback(() => { setDirection(-1); setCurrent((c) => (c - 1 + projects.length) % projects.length); }, []);

  const progress = useMotionValue(0);
  const progressWidth = useTransform(progress, [0, 100], ["0%", "100%"]);

  useEffect(() => {
    if (paused) return;
    progress.set(0);
    const controls = animate(progress, 100, { duration: 5, ease: "linear" });
    timerRef.current = setInterval(() => { progress.set(0); next(); }, 5000);
    return () => { clearInterval(timerRef.current); controls.stop(); };
  }, [paused, next, current, progress]);

  const pauseTemporarily = useCallback(() => {
    setPaused(true);
    setTimeout(() => setPaused(false), 10000);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => { setTouchStart(e.touches[0].clientX); pauseTemporarily(); };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    setTouchStart(null);
  };

  const handleManualNav = (action: () => void) => { pauseTemporarily(); action(); };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="eyebrow mb-3 block">Project Showcase</span>
          <h2 className="section-heading">
            Craftsmanship You Can See
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-sm overflow-hidden bg-card border border-border">
            {/* Image */}
            <div className="relative aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/9] overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  src={projects[current].image}
                  alt={projects[current].title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0.7)] via-[hsl(var(--heritage-charcoal)/0.15)] to-transparent" />

              <div className="absolute top-4 left-4 md:top-5 md:left-5 bg-primary/95 backdrop-blur-sm text-primary-foreground text-[12px] font-body font-bold uppercase tracking-[0.15em] px-3.5 py-2 rounded-sm z-10">
                {projects[current].type}
              </div>

              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 md:px-5 z-10">
                <button
                  onClick={() => handleManualNav(prev)}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-sm bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => handleManualNav(next)}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-sm bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 z-10">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current}
                    custom={direction}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="font-heading font-bold text-xl md:text-2xl text-white mb-1.5">
                      {projects[current].title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-white/95 text-[15px] mb-3 font-body font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      {projects[current].location}
                    </div>
                    <p className="text-white/90 text-[15px] md:text-base max-w-xl leading-relaxed font-body font-medium">
                      {projects[current].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-[2px] w-full bg-border/30">
              <motion.div className="h-full bg-[hsl(var(--highland-gold))]" style={{ width: progressWidth }} />
            </div>

            {/* Bottom bar */}
            <div className="flex items-center justify-between px-5 md:px-8 py-3.5 bg-card">
              <div className="flex gap-1.5">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { pauseTemporarily(); setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    className={`h-1.5 rounded-sm transition-all duration-300 ${
                      i === current ? "bg-accent w-6" : "bg-border w-1.5 hover:bg-accent/30"
                    }`}
                  />
                ))}
              </div>
              <Link
                to="/gallery"
                className="text-sm font-medium text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-1.5 group font-body"
              >
                View Full Gallery
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;