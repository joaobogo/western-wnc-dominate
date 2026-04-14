import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

const towns = [
  { name: "Highlands", slug: "highlands-nc", county: "Macon County" },
  { name: "Cashiers", slug: "cashiers-nc", county: "Jackson County" },
  { name: "Franklin", slug: "franklin-nc", county: "Macon County" },
  { name: "Sylva", slug: "sylva-nc", county: "Jackson County" },
  { name: "Bryson City", slug: "bryson-city-nc", county: "Swain County" },
  { name: "Waynesville", slug: "waynesville-nc", county: "Haywood County" },
  { name: "Cullowhee", slug: "cullowhee-nc", county: "Jackson County" },
  { name: "Dillsboro", slug: "dillsboro-nc", county: "Jackson County" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

const TownGrid = () => {
  return (
    <section className="section-padding section-dark tartan-dark">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Service Areas</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Serving Western<br className="hidden md:block" /> North Carolina
          </h2>
          <p className="text-dark-section-foreground/55 max-w-xl mx-auto text-base font-body">
            Locally operated with crews across the region. We know these mountains — and the properties that need protecting.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {towns.map((town) => (
            <motion.div key={town.slug} variants={itemVariants}>
              <Link
                to={`/service-areas/${town.slug}`}
                className="group block bg-dark-section-foreground/4 border border-dark-section-foreground/8 rounded-sm p-4 md:p-5 hover:bg-dark-section-foreground/8 hover:border-[hsl(var(--highland-gold)/0.25)] hover:-translate-y-1 transition-all duration-300"
              >
                <MapPin className="w-4 h-4 text-[hsl(var(--highland-gold))] mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading font-semibold text-base text-dark-section-foreground">
                  {town.name}
                </h3>
                <p className="text-dark-section-foreground/40 text-xs mt-1 font-body">{town.county}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link
            to="/service-areas"
            className="group inline-flex items-center gap-2 text-[hsl(var(--highland-gold))] font-medium text-sm hover:gap-3 transition-all font-body"
          >
            View All Service Areas <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TownGrid;