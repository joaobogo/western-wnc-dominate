import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import asphalt001 from "@/assets/gallery/asphalt-001.jpg";
import asphalt003 from "@/assets/gallery/asphalt-003.jpg";
import metal009 from "@/assets/gallery/metal-009.jpg";
import asphalt005 from "@/assets/gallery/asphalt-005.jpg";
import metal010 from "@/assets/gallery/metal-010.jpg";
import cedar001 from "@/assets/gallery/cedar-001.jpg";

const projects = [
  {
    title: "Storm Damage Repair — Franklin, NC",
    description: "Complete shingle replacement after severe hail damage. Insurance-documented and warrantied.",
    before: asphalt001,
    after: asphalt003,
  },
  {
    title: "Metal Roof Installation — Highlands, NC",
    description: "Standing seam metal roof on a mountain lodge. Built for heavy snow loads and 50+ year lifespan.",
    before: asphalt005,
    after: metal009,
  },
  {
    title: "Full Replacement — Cashiers, NC",
    description: "Architectural shingle upgrade on a lakefront home. New underlayment, flashing, and ridge vents.",
    before: metal010,
    after: cedar001,
  },
];

const BeforeAfterGallery = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => { setDirection(1); setCurrent((c) => (c + 1) % projects.length); };
  const prev = () => { setDirection(-1); setCurrent((c) => (c - 1 + projects.length) % projects.length); };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
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
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Our Work</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Real Results. Real Homes.
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Before / After images */}
            <div className="grid grid-cols-2 aspect-[2/1] relative">
              <div className="relative overflow-hidden border-r border-border">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.img
                    key={`before-${current}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                    src={projects[current].before}
                    alt={`Before - ${projects[current].title}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute top-3 left-3 bg-destructive/80 text-destructive-foreground text-[10px] md:text-xs font-bold uppercase tracking-wider px-2 py-1 rounded z-10">
                  Before
                </div>
              </div>
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.img
                    key={`after-${current}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                    src={projects[current].after}
                    alt={`After - ${projects[current].title}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute top-3 left-3 bg-primary/80 text-primary-foreground text-[10px] md:text-xs font-bold uppercase tracking-wider px-2 py-1 rounded z-10">
                  After
                </div>
              </div>
            </div>

            {/* Project info with slide animation */}
            <div className="p-6 min-h-[88px] relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                    {projects[current].title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{projects[current].description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between px-6 pb-6">
              <div className="flex gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current ? "bg-primary w-6" : "bg-border hover:bg-primary/30"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted hover:scale-110 active:scale-95 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted hover:scale-110 active:scale-95 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
