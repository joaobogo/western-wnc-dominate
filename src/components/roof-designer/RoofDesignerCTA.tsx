import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const RoofDesignerCTA = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-tight relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Try It Free — No Sign-Up Required
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 text-balance">
            See Your New Roof <span className="text-primary">Before</span> You Install It
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Upload a photo of your home, choose your roof style and color, and get an instant AI-powered preview.
          </p>

          <Link to="/roof-designer">
            <Button size="lg" className="gap-2 cta-gradient text-accent-foreground border-0 font-semibold text-base px-8 py-6 hover:scale-[1.03] active:scale-[0.97] transition-transform">
              Try the Virtual Roof Designer
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RoofDesignerCTA;
