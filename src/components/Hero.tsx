import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Shield, Award, Banknote, Clock } from "lucide-react";
import heroImage from "@/assets/hero-roofing.jpg";

const trustItems = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Award, label: "5x Best of Macon County" },
  { icon: Banknote, label: "Financing Available" },
  { icon: Clock, label: "Fast Response" },
];

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background with zoom animation */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <img
          src={heroImage}
          alt="Mountain home with premium roof in Western North Carolina"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.85)] via-[hsl(var(--hero-overlay)/0.6)] to-[hsl(var(--hero-overlay)/0.3)]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 md:px-8 lg:px-16 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-accent font-semibold text-sm md:text-base uppercase tracking-wider mb-4"
          >
            Western North Carolina's Trusted Roofer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-primary-foreground leading-[1.1] mb-6"
          >
            Protecting Mountain
            <br />
            Homes Since 2017
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mb-8 leading-relaxed"
          >
            Roof inspections, repairs & replacements across Highlands, Cashiers,
            Franklin & surrounding Western NC communities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
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
              className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/30 text-primary-foreground font-semibold text-lg px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:bg-primary-foreground/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              (828) 397-9211
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap gap-4 md:gap-6"
          >
            {trustItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.3 + i * 0.1 }}
                className="flex items-center gap-2 text-primary-foreground/70 text-sm"
              >
                <item.icon className="w-4 h-4 text-accent" />
                <span>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
