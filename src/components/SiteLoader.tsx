import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import logo from "@/assets/logo.svg";

const SiteLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(onComplete, 700);
  }, [onComplete]);

  useEffect(() => {
    const duration = 2000;
    const t = setTimeout(dismiss, duration);
    return () => clearTimeout(t);
  }, [dismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <img 
              src={logo} 
              alt="Highlander Roofing &amp; Construction logo" 
              className="h-[120px] md:h-[160px] w-auto"
            />
          </motion.div>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeInOut" }}
            className="h-px bg-[hsl(var(--highland-gold))] mt-8 opacity-40"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SiteLoader;
