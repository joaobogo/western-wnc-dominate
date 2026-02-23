import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "Storm Damage Repair — Franklin, NC",
    description: "Complete shingle replacement after severe hail damage. Insurance-documented and warrantied.",
  },
  {
    title: "Metal Roof Installation — Highlands, NC",
    description: "Standing seam metal roof on a mountain lodge. Built for heavy snow loads and 50+ year lifespan.",
  },
  {
    title: "Full Replacement — Cashiers, NC",
    description: "Architectural shingle upgrade on a lakefront home. New underlayment, flashing, and ridge vents.",
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
            {/* Mock before/after area */}
            <div className="grid grid-cols-2 aspect-[2/1]">
              <div className="bg-muted flex items-center justify-center border-r border-border">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Before</p>
                  <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                    <span className="text-2xl">🏚️</span>
                  </div>
                </div>
              </div>
              <div className="bg-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">After</p>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <span className="text-2xl">🏠</span>
                  </div>
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
