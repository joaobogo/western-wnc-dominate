import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const CTABlock = () => {
  return (
    <section className="section-padding section-dark relative overflow-hidden tartan-accent">
      {/* Gold accent line */}
      <motion.div
        className="absolute top-0 left-0 w-full h-0.5"
        style={{ background: 'hsl(var(--gold))' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        
      />

      <div className="container-tight text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-accent font-semibold text-sm uppercase tracking-[0.15em] mb-4"
          >
            Start Your Project
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4"
            >
              Ready to Discuss Your Project?
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-dark-section-foreground/60 text-lg max-w-xl mx-auto mb-10"
          >
            Schedule a consultation with our team. We'll walk your property, assess the scope, and deliver a detailed proposal — no pressure, no obligation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/request-inspection"
              className="group cta-gradient text-accent-foreground font-bold text-lg px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Request a Consultation</span>
              <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:8283979211"
              className="group border border-dark-section-foreground/20 text-dark-section-foreground font-semibold text-lg px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-dark-section-foreground/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Phone className="w-5 h-5 group-hover:animate-[wiggle_0.5s_ease-in-out]" />
              (828) 397-9211
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABlock;