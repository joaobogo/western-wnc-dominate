import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const CTABlock = () => {
  return (
    <section className="section-padding section-dark tartan-dark relative overflow-hidden">
      {/* Gold accent line */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[1px]"
        style={{ background: 'linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="container-tight text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow mb-4 block text-[hsl(var(--highland-gold))]">Start Your Project</span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-5"
            >
              Ready to Discuss Your Project?
            </motion.h2>
          </div>
          <p className="text-dark-section-foreground/55 text-base md:text-lg max-w-lg mx-auto mb-10 font-body">
            Schedule a consultation with our team. We'll walk your property, assess the scope, and deliver a detailed proposal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/request-inspection"
              className="group cta-gradient text-accent-foreground font-semibold text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Request a Consultation</span>
              <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:8283979211"
              className="group border border-dark-section-foreground/15 text-dark-section-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-dark-section-foreground/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Phone className="w-4 h-4 group-hover:animate-[wiggle_0.5s_ease-in-out]" />
              (828) 397-9211
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABlock;