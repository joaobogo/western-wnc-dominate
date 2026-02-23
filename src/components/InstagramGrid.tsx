import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const gridItems = [
  { label: "Before & After", type: "before-after" },
  { label: "Crew Photo", type: "crew" },
  { label: "Roof Tip", type: "tip" },
  { label: "Reel Cover", type: "reel" },
  { label: "Material Detail", type: "material" },
  { label: "Inspection Process", type: "inspection" },
  { label: "Community Spotlight", type: "community" },
  { label: "Storm Checklist", type: "storm" },
  { label: "Project in Highlands", type: "project" },
];

const InstagramGrid = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Follow Along</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            @HighlanderRoofing
          </h2>
          <p className="text-muted-foreground">See our latest projects and mountain roofing tips.</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-2 md:gap-3 max-w-2xl mx-auto">
          {gridItems.map((item, i) => (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="group relative aspect-square bg-primary/10 rounded-md overflow-hidden cursor-pointer hover:bg-primary/20 transition-colors"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-2">
                <Camera className="w-5 h-5 md:w-6 md:h-6 text-primary/50 group-hover:text-primary transition-colors" />
                <span className="text-[10px] md:text-xs text-center text-muted-foreground font-medium leading-tight">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramGrid;
