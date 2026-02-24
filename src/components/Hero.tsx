import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ArrowRight, Shield, Award, Banknote, Clock, Play } from "lucide-react";
import heroImage from "@/assets/hero-roofing.jpg";
import heroVideo from "@/assets/hero-video.mp4";
import { useRef, useState, useEffect } from "react";

const trustItems = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Award, label: "5x Best of Macon County" },
  { icon: Banknote, label: "Financing Available" },
  { icon: Clock, label: "Fast Response" },
];

// Floating particle component
const FloatingParticle = ({ delay, duration, x, y, size }: { delay: number; duration: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-accent/20"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, -10, 0],
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.2, 1],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.85, 0.95]);

  // Lazy-load video after initial paint
  useEffect(() => {
    const timer = requestAnimationFrame(() => setLoadVideo(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <section ref={ref} className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Parallax Background with Video */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Fallback image (shows instantly) */}
        <img
          src={heroImage}
          alt="Mountain home with premium roof in Western North Carolina"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-0" : "opacity-100"}`}
          loading="eager"
        />
        {/* Video background - lazy loaded */}
        {loadVideo && !videoFailed && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            // @ts-ignore
            webkit-playsinline="true"
            onCanPlay={() => {
              const el = videoRef.current;
              if (el) {
                el.play()
                  .then(() => setVideoLoaded(true))
                  .catch(() => setVideoFailed(true));
              }
            }}
            onError={() => setVideoFailed(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
        {/* Play button fallback when autoplay blocked */}
        {videoFailed && (
          <button
            onClick={() => {
              setVideoFailed(false);
              setLoadVideo(false);
              // Re-mount video with user gesture
              requestAnimationFrame(() => {
                setLoadVideo(true);
                requestAnimationFrame(() => {
                  videoRef.current?.play()
                    .then(() => setVideoLoaded(true))
                    .catch(() => setVideoFailed(true));
                });
              });
            }}
            className="absolute inset-0 z-10 flex items-center justify-center group"
            aria-label="Play background video"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-16 h-16 rounded-full bg-primary-foreground/20 backdrop-blur-sm border border-primary-foreground/30 flex items-center justify-center group-hover:bg-primary-foreground/30 transition-colors"
            >
              <Play className="w-6 h-6 text-primary-foreground ml-1" />
            </motion.div>
          </button>
        )}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay))] via-[hsl(var(--hero-overlay)/0.6)] to-[hsl(var(--hero-overlay)/0.3)]"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingParticle delay={0} duration={6} x="10%" y="20%" size={6} />
        <FloatingParticle delay={1} duration={8} x="25%" y="60%" size={4} />
        <FloatingParticle delay={2} duration={7} x="70%" y="30%" size={8} />
        <FloatingParticle delay={0.5} duration={9} x="85%" y="50%" size={5} />
        <FloatingParticle delay={3} duration={6} x="50%" y="75%" size={6} />
        <FloatingParticle delay={1.5} duration={10} x="15%" y="80%" size={3} />
        <FloatingParticle delay={2.5} duration={7} x="60%" y="15%" size={7} />
        <FloatingParticle delay={4} duration={8} x="40%" y="40%" size={4} />
      </div>

      {/* Animated line accent */}
      <motion.div
        className="absolute left-0 top-0 w-1 bg-accent"
        initial={{ height: "0%" }}
        animate={{ height: "100%" }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* Content with parallax */}
      <motion.div
        className="relative z-10 w-full px-4 md:px-8 lg:px-16 pt-32 pb-16 md:pt-40 md:pb-24"
        style={{ y: textY }}
      >
        <div className="max-w-3xl">
          {/* Animated tag with line */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-3 mb-4 overflow-hidden"
          >
            <motion.div
              className="h-px bg-accent"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-accent font-semibold text-sm md:text-base uppercase tracking-wider"
            >
              Western North Carolina's Trusted Roofer
            </motion.p>
          </motion.div>

          {/* Clip-path text reveal */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-primary-foreground leading-[1.1]"
            >
              Protecting Mountain
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-primary-foreground leading-[1.1]"
            >
              Homes Since 2017
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mb-8 leading-relaxed"
          >
            Roof inspections, repairs & replacements across Highlands, Cashiers,
            Franklin & surrounding Western NC communities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link
              to="/request-inspection"
              className="group cta-gradient text-accent-foreground font-bold text-lg px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 relative overflow-hidden"
            >
              {/* Shine effect on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Request Free Inspection</span>
              <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:8283979211"
              className="group bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/30 text-primary-foreground font-semibold text-lg px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:bg-primary-foreground/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              <Phone className="w-5 h-5 group-hover:animate-[wiggle_0.5s_ease-in-out]" />
              (828) 397-9211
            </a>
          </motion.div>

          {/* Trust strip with stagger */}
          <div className="flex flex-wrap gap-4 md:gap-6">
            {trustItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + i * 0.15 }}
                className="flex items-center gap-2 text-primary-foreground/70 text-sm"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, delay: 2 + i * 0.3, repeat: Infinity, repeatDelay: 5 }}
                >
                  <item.icon className="w-4 h-4 text-accent" />
                </motion.div>
                <span>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-primary-foreground/50 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex justify-center pt-2"
          animate={{}}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-accent"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
