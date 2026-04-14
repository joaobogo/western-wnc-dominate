import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

const RoofDesignerCTA = () => {
  return (
    <section className="section-padding bg-secondary tartan-bg relative overflow-hidden">
      <div className="container-tight relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-primary/8 text-primary text-xs font-body font-semibold uppercase tracking-[0.15em] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Tool — No Sign-Up Required
          </div>

          <h2 className="section-heading mb-4 text-balance">
            Visualize Your New Roof <span className="text-accent">Before</span> Installation
          </h2>

          <p className="text-base text-muted-foreground mb-8 max-w-lg mx-auto font-body">
            Upload a photo of your property, select a roofing material and color, and preview the result instantly.
          </p>

          <Link
            to="/roof-designer"
            className="group cta-gradient text-accent-foreground font-semibold text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Try the Virtual Roof Designer</span>
            <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RoofDesignerCTA;