import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const CTABlock = () => {
  return (
    <section className="section-padding section-dark relative overflow-hidden">
      {/* Decorative accent */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 cta-gradient"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />

      <div className="container-tight text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Ready to Protect Your Home?
          </h2>
          <p className="text-dark-section-foreground/70 text-lg max-w-xl mx-auto mb-8">
            Schedule your free roof inspection today. We respond within 24 hours and serve all of Western North Carolina.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/request-inspection"
              className="group cta-gradient text-accent-foreground font-bold text-lg px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              Request Free Inspection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:8283979211"
              className="border border-dark-section-foreground/30 text-dark-section-foreground font-semibold text-lg px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:bg-dark-section-foreground/10 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              (828) 397-9211
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABlock;
