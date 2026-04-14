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
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: HIGHLAND_EASE } },
};

const InstagramGrid = () => {
  return (
    <section className="section-padding bg-secondary tartan-bg">
      <div className="container-tight">
        <div className="text-center mb-12">
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
          className="grid grid-cols-3 gap-2 md:gap-3 max-w-2xl mx-auto"
        >
          {gridItems.map((item) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className="group relative aspect-square rounded-none overflow-hidden cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover img-zoom-dramatic"
                loading="lazy"
              />
              {/* Cinematic hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0)] via-transparent to-transparent group-hover:from-[hsl(var(--heritage-charcoal)/0.7)] transition-all duration-500 flex items-end justify-center pb-4">
                <span className="text-white text-[11px] font-body font-semibold tracking-[0.12em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-3 group-hover:translate-y-0">
                  {item.label}
                </span>
              </div>
              {/* Gold bottom edge on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[hsl(var(--highland-gold))] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramGrid;
