import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Shield, Award, Banknote, Clock } from "lucide-react";
import heroImage from "@/assets/hero-roofing.jpg";
import heroVideo from "@/assets/hero-video.mp4";
import { useRef, useState } from "react";

const trustItems = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Award, label: "CertainTeed Master Applicator" },
  { icon: Banknote, label: "Financing Available" },
  { icon: Clock, label: "24-Hour Response" },
];

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section ref={ref} className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background with Video */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Mountain home with premium roof in Western North Carolina"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-0" : "opacity-100"}`}
          loading="eager"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          // @ts-ignore
          webkit-playsinline="true"
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          ref={(el) => {
            if (el) el.play().catch(() => {});
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.9)] via-[hsl(var(--hero-overlay)/0.7)] to-[hsl(var(--hero-overlay)/0.3)]" />
      </div>

      {/* Vertical gold accent line */}
      <motion.div
        className="absolute left-0 top-0 w-0.5"
        style={{ background: 'hsl(var(--gold))' }}
        initial={{ height: "0%" }}
        animate={{ height: "100%" }}
        transition={{ duration: 2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-4 md:px-8 lg:px-16 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-3 mb-6 overflow-hidden"
          >
            <motion.div
              className="h-px"
              style={{ background: 'hsl(var(--gold))' }}
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-accent font-semibold text-sm md:text-base uppercase tracking-[0.2em]"
            >
              Roofing & Construction · Western North Carolina
            </motion.p>
          </motion.div>

          {/* Headline — clip reveal */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-primary-foreground leading-[1.1]"
            >
              Built for the Mountains.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-primary-foreground leading-[1.1]"
            >
              Crafted for Generations.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg md:text-xl text-primary-foreground/75 max-w-xl mb-10 leading-relaxed"
          >
            Expert roofing and construction across Highlands, Cashiers,
            Franklin, Sylva & surrounding mountain communities. Precision workmanship backed by certifications and warranty.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-14"
          >
            <Link
              to="/request-inspection"
              className="group cta-gradient text-accent-foreground font-bold text-lg px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Discuss Your Project</span>
              <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:8283979211"
              className="group bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground font-semibold text-lg px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-primary-foreground/15 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Phone className="w-5 h-5 group-hover:animate-[wiggle_0.5s_ease-in-out]" />
              (828) 397-9211
            </a>
          </motion.div>

          {/* Trust strip */}
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {trustItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + i * 0.12 }}
                className="flex items-center gap-2 text-primary-foreground/60 text-sm"
              >
                <item.icon className="w-4 h-4 text-accent" />
                <span>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;