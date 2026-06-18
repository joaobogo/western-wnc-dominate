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
      <main>
        <section className="relative min-h-[60vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
              alt="Mountain home with premium siding and exterior finishes"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.7)] via-[hsl(var(--hero-overlay)/0.4)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.4)] via-transparent to-transparent" />
          </div>
          <div className="container-tight relative z-10 pt-32 md:pt-40">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Construction Division</span>
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-white tracking-tight">Siding & Exterior.</h1>
              <p className="text-white/60 text-lg md:text-xl max-w-2xl mb-8 font-body leading-relaxed">
                Mountain-grade exterior protection. Fiber cement, natural cedar, and premium trim systems engineered for Western NC&apos;s moisture and elevation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/consultation" className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-none inline-flex items-center justify-center gap-2 group hover:scale-[1.02] transition-transform">
                  Request a Siding Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:8285247773" className="bg-white/5 border border-white/10 text-white font-bold px-8 py-4 rounded-none inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                  <Phone className="w-5 h-5 text-[hsl(var(--highland-gold)/0.6)]" /> (828) 524-7773
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
              <div className="relative group overflow-hidden">
                <div className="bg-secondary/40 p-8 border border-border relative z-10">
                  <h3 className="text-xl font-heading font-bold mb-4">Why Highlander Siding?</h3>
                  <p className="text-sm text-foreground/60 mb-6 leading-relaxed font-body">
                    We approach siding as a complete envelope system — not just a cosmetic layer. Every corner, transition, and flashing detail is executed to prevent moisture intrusion, which is the #1 cause of structural decay in WNC homes.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-background border border-border group-hover:border-[hsl(var(--highland-gold)/0.2)] transition-colors">
                      <Droplets className="w-5 h-5 text-[hsl(var(--highland-gold))] mb-2" />
                      <div className="text-[10px] font-bold uppercase tracking-wider">Moisture Proof</div>
                    </div>
                    <div className="p-4 bg-background border border-border group-hover:border-[hsl(var(--highland-gold)/0.2)] transition-colors">
                      <Wind className="w-5 h-5 text-[hsl(var(--highland-gold))] mb-2" />
                      <div className="text-[10px] font-bold uppercase tracking-wider">Wind Rated</div>
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 bottom-0 w-1/2 h-1/2 opacity-[0.05] pointer-events-none grayscale translate-x-4 translate-y-4">
                   <img src="https://images.unsplash.com/photo-1518005020251-58296d87ba60?auto=format&fit=crop&q=80&w=800" alt="Texture detail" className="w-full h-full object-cover" />
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
