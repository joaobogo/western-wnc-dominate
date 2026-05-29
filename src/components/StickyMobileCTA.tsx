import { Phone, MessageSquare, Layers, ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import veluxLogo from "@/assets/velux-certified-logo.jpg";

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
      {/* ─── MOBILE: Premium bottom action bar ─── */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          >
            {/* Gold top accent */}
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))' }} />
            
            <div className="bg-card/98 backdrop-blur-xl border-t border-border shadow-[0_-8px_32px_-12px_hsl(var(--heritage-charcoal)/0.12)]">
              {/* VELUX trust strip */}
              <Link
                to="/certifications"
                className="flex items-center justify-center gap-2 py-1.5 px-3 bg-[hsl(var(--heritage-green))] border-b border-[hsl(var(--highland-gold)/0.25)]"
              >
                <div className="w-6 h-6 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img src={veluxLogo} alt="VELUX" className="w-full h-full object-contain brightness-0 invert" />
                </div>
                <span className="text-[11px] font-body font-bold uppercase tracking-[0.14em] text-[hsl(var(--highland-gold))]">
                  VELUX Certified Skylight Installer
                </span>
              </Link>

              {/* Two-column layout: primary CTA + secondary actions */}
              <div className="flex items-stretch">
                {/* Primary CTA — full gold, generous touch target */}
                <Link
                  to="/consultation"
                  onClick={() => trackEvent("cta_click", { label: "Start a Project", elementId: "sticky-cta-mobile-start" })}
                  className="flex-[1.8] flex items-center justify-center gap-3 py-5 px-4 cta-gradient text-accent-foreground active:opacity-95 active:scale-[0.97] transition-all min-h-[72px]"
                >
                  <MessageSquare className="w-6 h-6" />
                  <span className="text-base font-body font-bold uppercase tracking-[0.1em]">Start Project</span>
                </Link>
                
                {/* Secondary actions — generous touch targets */}
                <div className="flex items-stretch divide-x divide-border flex-1">
                  <a
                    href="tel:8283979211"
                    onClick={() => trackEvent("phone_click", { label: "Call Now", elementId: "sticky-cta-mobile-call" })}
                    className="flex-1 flex flex-col items-center justify-center gap-2 px-5 py-4 text-primary active:bg-primary/10 active:scale-95 transition-all min-h-[72px]"
                  >
                    <Phone className="w-6 h-6" />
                    <span className="text-xs font-body font-bold uppercase tracking-[0.06em]">Call</span>
                  </a>
                  <Link
                    to="/services"
                    className="flex-1 flex flex-col items-center justify-center gap-2 px-5 py-4 text-muted-foreground active:bg-secondary active:scale-95 transition-all min-h-[72px]"
                  >
                    <Layers className="w-6 h-6" />
                    <span className="text-xs font-body font-bold uppercase tracking-[0.06em]">Menu</span>
                  </Link>
                </div>
              </div>

              {/* Safe area spacer for notch phones */}
              <div className="h-[env(safe-area-inset-bottom,0px)] bg-card" />
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
                    className="absolute bottom-full right-0 mb-3 w-72 bg-card border border-border rounded-none shadow-[0_16px_48px_-12px_hsl(var(--heritage-charcoal)/0.14)] overflow-hidden"
                  >
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.3)] to-transparent" />
                    <div className="p-4 border-b border-border">
                      <p className="text-sm font-heading font-bold text-foreground mb-0.5">Ready to start?</p>
                      <p className="text-[11px] text-muted-foreground font-body">Begin a project conversation with our team.</p>
                    </div>
                    <div className="p-2 space-y-0.5">
                      <Link
                        to="/consultation"
                        className="flex items-center gap-3 px-3 py-3 rounded-none hover:bg-secondary/60 transition-all group dropdown-item-premium"
                      >
                        <div className="w-9 h-9 rounded-none bg-[hsl(var(--highland-gold)/0.08)] flex items-center justify-center flex-shrink-0 group-hover:bg-[hsl(var(--highland-gold)/0.15)] transition-colors">
                          <FileText className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-heading font-semibold text-foreground">Start a Project</p>
                          <p className="text-[10px] text-muted-foreground font-body">No-obligation consultation</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-muted-foreground btn-arrow-icon" />
                      </Link>
                      <a
                        href="tel:8283979211"
                        className="flex items-center gap-3 px-3 py-3 rounded-none hover:bg-secondary/60 transition-all group dropdown-item-premium"
                      >
                        <div className="w-9 h-9 rounded-none bg-primary/6 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-colors">
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
                className="group flex items-center gap-2.5 bg-primary text-primary-foreground pl-4 pr-5 py-3 rounded-none shadow-[0_8px_24px_-6px_hsl(var(--heritage-charcoal)/0.2)] hover:shadow-[0_12px_32px_-6px_hsl(var(--heritage-charcoal)/0.25)] transition-shadow duration-300"
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
