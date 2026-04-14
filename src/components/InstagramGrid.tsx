import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: HIGHLAND_EASE } },
};

const InstagramGrid = () => {
  return (
    <section className="section-padding bg-secondary tartan-bg">
      <div className="container-tight">
        <div className="text-center mb-10">
          <ScrollReveal variant="fade">
            <span className="eyebrow mb-3 block">From the Field</span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
              Recent Roofing & Construction Work
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.2}>
            <p className="text-muted-foreground font-body text-sm">
              Crew photos, project details, and mountain craftsmanship — straight from the jobsite.
            </p>
          </ScrollReveal>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="grid grid-cols-3 gap-1.5 md:gap-2.5 max-w-2xl mx-auto"
        >
          {gridItems.map((item) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className="group relative aspect-square rounded-sm overflow-hidden cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover img-zoom"
                loading="lazy"
              />
              {/* Hover overlay with label — controlled opacity transition */}
              <div className="absolute inset-0 bg-[hsl(var(--heritage-charcoal)/0)] group-hover:bg-[hsl(var(--heritage-charcoal)/0.5)] transition-colors duration-400 flex items-center justify-center">
                <span className="text-white text-xs font-body font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 tracking-wide translate-y-2 group-hover:translate-y-0">
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
