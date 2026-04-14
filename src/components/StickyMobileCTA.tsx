import { Phone, FileText, Layers, ArrowRight, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const StickyMobileCTA = () => {
  const [scrolled, setScrolled] = useState(false);
  const [desktopHovered, setDesktopHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ─── MOBILE: Bottom action bar ─── */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card/97 backdrop-blur-xl border-t border-border safe-bottom shadow-[0_-4px_24px_-8px_hsl(var(--heritage-charcoal)/0.08)]"
          >
            <div className="grid grid-cols-3 divide-x divide-border">
              <a
                href="tel:8283979211"
                className="flex flex-col items-center gap-1 py-3 text-primary active:bg-primary/5 active:scale-95 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.08em]">Call</span>
              </a>
              <Link
                to="/request-inspection"
                className="flex flex-col items-center gap-1 py-3 text-[hsl(var(--highland-gold))] active:bg-[hsl(var(--highland-gold)/0.05)] active:scale-95 transition-all relative"
              >
                {/* Attention pulse dot */}
                <span className="absolute top-2 right-1/4 w-1.5 h-1.5 rounded-full bg-[hsl(var(--highland-gold))] animate-[pulse_2s_ease-in-out_infinite]" />
                <MessageSquare className="w-4 h-4" />
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.08em]">Quote</span>
              </Link>
              <Link
                to="/services"
                className="flex flex-col items-center gap-1 py-3 text-muted-foreground active:bg-secondary active:scale-95 transition-all"
              >
                <Layers className="w-4 h-4" />
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.08em]">Services</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── DESKTOP: Floating consultation trigger ─── */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: HIGHLAND_EASE }}
            className="fixed bottom-8 right-8 z-50 hidden md:block"
            onMouseEnter={() => setDesktopHovered(true)}
            onMouseLeave={() => setDesktopHovered(false)}
          >
            <div className="relative">
              {/* Expanded panel */}
              <AnimatePresence>
                {desktopHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: HIGHLAND_EASE }}
                    className="absolute bottom-full right-0 mb-3 w-72 bg-card border border-border rounded-sm shadow-[0_16px_48px_-12px_hsl(var(--heritage-charcoal)/0.14)] overflow-hidden"
                  >
                    {/* Gold top line */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.3)] to-transparent" />
                    <div className="p-4 border-b border-border">
                      <p className="text-sm font-heading font-bold text-foreground mb-0.5">Ready to start?</p>
                      <p className="text-[11px] text-muted-foreground font-body">Get expert guidance for your project.</p>
                    </div>
                    <div className="p-2 space-y-0.5">
                      <Link
                        to="/request-inspection"
                        className="flex items-center gap-3 px-3 py-3 rounded-sm hover:bg-secondary/60 transition-all group dropdown-item-premium"
                      >
                        <div className="w-9 h-9 rounded-sm bg-[hsl(var(--highland-gold)/0.08)] flex items-center justify-center flex-shrink-0 group-hover:bg-[hsl(var(--highland-gold)/0.15)] transition-colors">
                          <FileText className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-heading font-semibold text-foreground">Request Consultation</p>
                          <p className="text-[10px] text-muted-foreground font-body">Free project assessment</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-muted-foreground btn-arrow-icon" />
                      </Link>
                      <a
                        href="tel:8283979211"
                        className="flex items-center gap-3 px-3 py-3 rounded-sm hover:bg-secondary/60 transition-all group dropdown-item-premium"
                      >
                        <div className="w-9 h-9 rounded-sm bg-primary/6 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-colors">
                          <Phone className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-heading font-semibold text-foreground">Call Direct</p>
                          <p className="text-[10px] text-muted-foreground font-body">(828) 397-9211</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-muted-foreground btn-arrow-icon" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Trigger button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2.5 bg-primary text-primary-foreground pl-4 pr-5 py-3 rounded-sm shadow-[0_8px_24px_-6px_hsl(var(--heritage-charcoal)/0.2)] hover:shadow-[0_12px_32px_-6px_hsl(var(--heritage-charcoal)/0.25)] transition-shadow duration-300"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-body font-semibold">Start a Conversation</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyMobileCTA;
