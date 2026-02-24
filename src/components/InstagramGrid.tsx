import { motion } from "framer-motion";

import asphalt001 from "@/assets/gallery/asphalt-001.jpg";
import asphalt002 from "@/assets/gallery/asphalt-002.jpg";
import asphalt003 from "@/assets/gallery/asphalt-003.jpg";
import cedar001 from "@/assets/gallery/cedar-001.jpg";
import cedar002 from "@/assets/gallery/cedar-002.jpg";
import metal009 from "@/assets/gallery/metal-009.jpg";
import metal010 from "@/assets/gallery/metal-010.jpg";
import asphalt004 from "@/assets/gallery/asphalt-004.jpg";
import asphalt005 from "@/assets/gallery/asphalt-005.jpg";

const gridItems = [
  { label: "Shingle Repair", image: asphalt001 },
  { label: "Crew at Work", image: asphalt002 },
  { label: "New Install", image: asphalt003 },
  { label: "Cedar Shake", image: cedar001 },
  { label: "Metal Roof", image: metal009 },
  { label: "Inspection", image: asphalt004 },
  { label: "Cedar Detail", image: cedar002 },
  { label: "Storm Repair", image: metal010 },
  { label: "Mountain Home", image: asphalt005 },
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
              key={item.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative aspect-square rounded-md overflow-hidden cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              {/* Hover overlay with label */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-primary-foreground text-xs md:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-2">
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
