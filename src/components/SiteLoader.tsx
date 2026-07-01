import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import logo from "@/assets/logo.svg";

const SiteLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(onComplete, 800);
  }, [onComplete]);

  useEffect(() => {
    const duration = 2400;
    const t = setTimeout(dismiss, duration);
    return () => clearTimeout(t);
  }, [dismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, hsl(var(--heritage-green)) 0%, hsl(var(--heritage-charcoal)) 100%)",
          }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle grain */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            }}
          />

          {/* Golden aura sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0] }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 50%, hsl(var(--highland-gold) / 0.35), transparent 70%)",
            }}
          />

          {/* Top hairline */}
          <motion.div
            className="absolute top-0 left-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(var(--highland-gold)/0.7), transparent)",
            }}
            initial={{ width: 0, x: "50%" }}
            animate={{ width: "100%", x: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Logo mark — reveal + soft float */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 bg-white/95 backdrop-blur-sm rounded-sm px-8 py-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
          >
            <img
              src={logo}
              alt="Highlander Roofing &amp; Construction"
              className="h-[88px] sm:h-[104px] md:h-[128px] w-auto"
            />
          </motion.div>

          {/* Eyebrow tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mt-8 text-[10.5px] sm:text-[11px] font-body font-bold uppercase tracking-[0.4em] text-[hsl(var(--highland-gold))]"
          >
            Western North Carolina · Since 2017
          </motion.p>

          {/* Progress rail */}
          <div className="relative z-10 mt-6 h-px w-[180px] sm:w-[220px] bg-white/10 overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ delay: 0.3, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--highland-gold)), transparent)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SiteLoader;
