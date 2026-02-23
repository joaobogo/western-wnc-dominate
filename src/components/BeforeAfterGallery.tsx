import { motion } from "framer-motion";
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

  const next = () => setCurrent((c) => (c + 1) % projects.length);
  const prev = () => setCurrent((c) => (c - 1 + projects.length) % projects.length);

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Our Work</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Real Results. Real Homes.
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative bg-card border border-border rounded-lg overflow-hidden">
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

            {/* Project info */}
            <div className="p-6">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                {projects[current].title}
              </h3>
              <p className="text-muted-foreground text-sm">{projects[current].description}</p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between px-6 pb-6">
              <div className="flex gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === current ? "bg-primary" : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
