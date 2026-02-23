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
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as const } },
};

const TownGrid = () => {
  return (
    <section className="section-padding section-dark">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Service Areas</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Serving Western
            <br className="hidden md:block" /> North Carolina
          </h2>
          <p className="text-dark-section-foreground/70 max-w-2xl mx-auto text-base md:text-lg">
            Locally operated with crews across the region. We know these mountains — and the roofs that protect the homes in them.
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
                className="group block bg-dark-section-foreground/5 border border-dark-section-foreground/10 rounded-lg p-4 md:p-5 hover:bg-dark-section-foreground/10 hover:border-accent/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <MapPin className="w-5 h-5 text-accent mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading font-semibold text-base md:text-lg text-dark-section-foreground">
                  {town.name}
                </h3>
                <p className="text-dark-section-foreground/50 text-xs mt-1">{town.county}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-center mt-8"
        >
          <Link
            to="/service-areas"
            className="group inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
          >
            View All Service Areas <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TownGrid;
