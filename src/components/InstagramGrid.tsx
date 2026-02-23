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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as const } },
};

const InstagramGrid = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Follow Along</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            @HighlanderRoofing
          </h2>
          <p className="text-muted-foreground">See our latest projects and mountain roofing tips.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="grid grid-cols-3 gap-2 md:gap-3 max-w-2xl mx-auto"
        >
          {gridItems.map((item) => (
            <motion.div
              key={item.type}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative aspect-square bg-primary/10 rounded-md overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-2 group-hover:bg-primary/20 transition-colors duration-300">
                <Camera className="w-5 h-5 md:w-6 md:h-6 text-primary/50 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                <span className="text-[10px] md:text-xs text-center text-muted-foreground font-medium leading-tight group-hover:text-foreground transition-colors">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramGrid;
