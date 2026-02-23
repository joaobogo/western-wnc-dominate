import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const CTABlock = () => {
  return (
    <section className="section-padding section-dark relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-full h-1 cta-gradient" />

      <div className="container-tight text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Ready to Protect Your Home?
          </h2>
          <p className="text-dark-section-foreground/70 text-lg max-w-xl mx-auto mb-8">
            Schedule your free roof inspection today. We respond within 24 hours and serve all of Western North Carolina.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/request-inspection"
              className="cta-gradient text-accent-foreground font-bold text-lg px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              Request Free Inspection
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:8283979211"
              className="border border-dark-section-foreground/30 text-dark-section-foreground font-semibold text-lg px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:bg-dark-section-foreground/10 transition-colors"
            >
              <Phone className="w-5 h-5" />
              (828) 397-9211
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABlock;
