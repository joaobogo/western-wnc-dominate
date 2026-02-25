import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import asphaltHero from "@/assets/gallery/asphalt-hero.webp";
import metal005 from "@/assets/gallery/metal-005.webp";
import cedar004 from "@/assets/gallery/cedar-004.webp";
import asphalt006 from "@/assets/gallery/asphalt-006.webp";
import metal006 from "@/assets/gallery/metal-006.webp";

const projects = [
  {
    title: "Architectural Shingles — Weathered Wood",
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
    title: "Architectural Shingles — Slate Gray",
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

  // Auto-play: 5s interval, pauses on interaction
  useEffect(() => {
    if (paused) return;
    progress.set(0);
    const controls = animate(progress, 100, { duration: 5, ease: "linear" });
    timerRef.current = setInterval(() => { progress.set(0); next(); }, 5000);
    return () => { clearInterval(timerRef.current); controls.stop(); };
  }, [paused, next, current]);

  const pauseTemporarily = useCallback(() => {
    setPaused(true);
    setTimeout(() => setPaused(false), 10000); // resume after 10s of no interaction
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => { setTouchStart(e.touches[0].clientX); pauseTemporarily(); };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Project Showcase</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Real Results. Real Homes.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* Main showcase */}
          <div className="relative rounded-xl overflow-hidden bg-card border border-border shadow-lg">
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
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

              <div className="absolute top-4 left-4 md:top-5 md:left-5 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md z-10">
                {projects[current].type}
              </div>

              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 md:px-5 z-10">
                <button
                  onClick={() => handleManualNav(prev)}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/20 backdrop-blur-sm border border-background/20 flex items-center justify-center hover:bg-background/40 active:scale-95 transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-background" />
                </button>
                <button
                  onClick={() => handleManualNav(next)}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/20 backdrop-blur-sm border border-background/20 flex items-center justify-center hover:bg-background/40 active:scale-95 transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-background" />
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current}
                    custom={direction}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="font-heading font-bold text-xl md:text-2xl text-background mb-2">
                      {projects[current].title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-background/70 text-sm mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      {projects[current].location}
                    </div>
                    <p className="text-background/80 text-sm md:text-base max-w-xl leading-relaxed">
                      {projects[current].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1 w-full bg-border/30">
              <motion.div className="h-full bg-primary" style={{ width: progressWidth }} />
            </div>

            {/* Bottom bar: dots + CTA */}
            <div className="flex items-center justify-between px-5 md:px-8 py-4 bg-card">
              <div className="flex gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { pauseTemporarily(); setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current ? "bg-primary w-7" : "bg-border w-2 hover:bg-primary/30"
                    }`}
                  />
                ))}
              </div>
              <Link
                to="/gallery"
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1.5 group"
              >
                View Full Gallery
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
