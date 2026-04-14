import { Phone, FileText, Layers, ArrowRight, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

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
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.35, type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card/95 backdrop-blur-md border-t border-border safe-bottom"
          >
            <div className="grid grid-cols-3 divide-x divide-border">
              <a
                href="tel:8283979211"
                className="flex flex-col items-center gap-1 py-3 text-primary active:bg-primary/5 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.08em]">Call</span>
              </a>
              <Link
                to="/request-inspection"
                className="flex flex-col items-center gap-1 py-3 text-[hsl(var(--highland-gold))] active:bg-[hsl(var(--highland-gold)/0.05)] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.08em]">Quote</span>
              </Link>
              <Link
                to="/services"
                className="flex flex-col items-center gap-1 py-3 text-muted-foreground active:bg-secondary transition-colors"
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50 hidden md:block"
            onMouseEnter={() => setDesktopHovered(true)}
            onMouseLeave={() => setDesktopHovered(false)}
          >
            <div className="relative">
              {/* Expanded panel */}
              <AnimatePresence>
                {desktopHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full right-0 mb-3 w-64 bg-card border border-border rounded-sm shadow-lg overflow-hidden"
                  >
                    <div className="p-4 border-b border-border">
                      <p className="text-xs font-heading font-bold text-foreground mb-0.5">Ready to start?</p>
                      <p className="text-[11px] text-muted-foreground font-body">Get expert guidance for your project.</p>
                    </div>
                    <div className="p-2 space-y-0.5">
                      <Link
                        to="/request-inspection"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-secondary transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-sm bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center flex-shrink-0">
                          <FileText className="w-3.5 h-3.5 text-[hsl(var(--highland-gold))]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-heading font-semibold text-foreground">Request Consultation</p>
                          <p className="text-[10px] text-muted-foreground font-body">Free project assessment</p>
                        </div>
                        <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                      <a
                        href="tel:8283979211"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-secondary transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-sm bg-primary/8 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-heading font-semibold text-foreground">Call Direct</p>
                          <p className="text-[10px] text-muted-foreground font-body">(828) 397-9211</p>
                        </div>
                        <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Trigger button */}
              <button
                className="group flex items-center gap-2.5 bg-primary text-primary-foreground pl-4 pr-5 py-3 rounded-sm shadow-md hover:shadow-lg transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-body font-semibold">Start a Conversation</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyMobileCTA;
