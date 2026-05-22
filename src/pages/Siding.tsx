import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Shield, CheckCircle, ArrowRight, Phone, 
  Mountain, Droplets, Wind, Sun, Home, Layers,
  HardHat, Award, Clock
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const Siding = () => {
  return (
    <>
      <SEOHead
        title="Siding Installation in Western NC | Fiber Cement & Cedar"
        description="Mountain-grade siding installation across Highlands, Franklin, and Sylva. James Hardie fiber cement, natural cedar, and premium moisture-proof trim."
        path="/construction/siding"
      />
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="section-padding section-dark">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Construction Division</span>
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Siding & Exterior.</h1>
              <p className="text-dark-section-foreground/70 text-lg md:text-xl max-w-2xl mb-8">
                Mountain-grade exterior protection. Fiber cement, natural cedar, and premium trim systems engineered for Western NC's moisture and elevation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/consultation" className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-none inline-flex items-center justify-center gap-2">
                  Request a Siding Quote <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:8283979211" className="border border-white/20 text-white font-bold px-8 py-4 rounded-none inline-flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                  <Phone className="w-5 h-5" /> (828) 397-9211
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-6">Built for Mountain Exposure.</h2>
                <p className="text-foreground/70 mb-8">
                  The mountains of Western North Carolina present a unique set of challenges for your home's exterior. High humidity, heavy rainfall, and constant temperature swings require more than just a "standard" siding job.
                </p>
                <ul className="space-y-4">
                  {[
                    "James Hardie fiber cement systems (Rot-proof, Fire-rated)",
                    "Natural cedar shake and lap siding",
                    "Premium PVC and composite trim (Never-rot guarantees)",
                    "Advanced house-wrap and moisture management",
                    "Soffit, fascia, and decorative millwork",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground/80 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-secondary/40 p-8 border border-border">
                <h3 className="text-xl font-heading font-bold mb-4">Why Highlander Siding?</h3>
                <p className="text-sm text-foreground/60 mb-6 leading-relaxed">
                  We approach siding as a complete envelope system — not just a cosmetic layer. Every corner, transition, and flashing detail is executed to prevent moisture intrusion, which is the #1 cause of structural decay in WNC homes.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background border border-border">
                    <Droplets className="w-5 h-5 text-accent mb-2" />
                    <div className="text-xs font-bold uppercase tracking-wider">Moisture Proof</div>
                  </div>
                  <div className="p-4 bg-background border border-border">
                    <Wind className="w-5 h-5 text-accent mb-2" />
                    <div className="text-xs font-bold uppercase tracking-wider">Wind Rated</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Siding;
