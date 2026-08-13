import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";

import asphalt001 from "@/assets/gallery/asphalt-001.webp";
import asphalt002 from "@/assets/gallery/asphalt-002.webp";
import asphalt003 from "@/assets/gallery/asphalt-003.webp";
import cedar001 from "@/assets/gallery/cedar-001.webp";
import cedar002 from "@/assets/gallery/cedar-002.webp";
import metal009 from "@/assets/gallery/metal-010.webp";
import metal010 from "@/assets/gallery/metal-010.webp";
import asphalt004 from "@/assets/gallery/asphalt-004.webp";
import asphalt005 from "@/assets/gallery/asphalt-005.webp";

const gridItems = [
  { label: "Precision Repair", image: asphalt001 },
  { label: "Crew On-Site", image: asphalt002 },
  { label: "New Installation", image: asphalt003 },
  { label: "Cedar Shake Detail", image: cedar001 },
  { label: "Standing Seam Metal", image: metal009 },
  { label: "Professional Inspection", image: asphalt004 },
  { label: "Cedar Craftsmanship", image: cedar002 },
  { label: "Storm Restoration", image: metal010 },
  { label: "Mountain Home Complete", image: asphalt005 },
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
            <span className="eyebrow mb-3 block">Documented Craftsmanship</span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
              Real Work. Real Mountains. Real Results.
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.2}>
            <p className="text-muted-foreground font-body text-sm max-w-md mx-auto">
              Every image is from a Highlander jobsite across Western NC — 
              no stock photos, no staged setups, just our crews and our craft.
            </p>
          </ScrollReveal>
          <GoldLine width="3rem" centered delay={0.3} className="mt-4" />
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
              <img width={1600} height={1067} decoding="async"
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover img-zoom-dramatic"
                loading="lazy"
              />
              {/* Cinematic hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0)] via-transparent to-transparent group-hover:from-[hsl(var(--heritage-charcoal)/0.5)] transition-all duration-500 flex items-end justify-center pb-4">
                <span className="text-white text-caption font-body font-semibold tracking-[0.12em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-3 group-hover:translate-y-0">
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
