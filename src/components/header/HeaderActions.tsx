import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart, Menu, Phone, X } from "lucide-react";
import { HIGHLAND_EASE } from "./nav-data";

interface Props {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export const HeaderActions = ({ mobileOpen, setMobileOpen }: Props) => (
  <div className="flex items-center gap-3">
    <a
      href="tel:+18285247773"
      className="hidden md:flex items-center gap-2 transition-all duration-300 text-sm font-body mr-1 text-heritage-charcoal/60 hover:text-heritage-charcoal"
    >
      <Phone className="w-3.5 h-3.5" />
      <span className="hidden xl:inline">(828) 524-7773</span>
    </a>
    <Link
      to="/community"
      aria-label="Giving Back to our community"
      className="hidden lg:inline-flex items-center gap-1.5 text-body-xs font-body font-bold uppercase tracking-[0.1em] text-heritage-charcoal/75 hover:text-[hsl(var(--gold-ink))] transition-colors duration-300 px-2 py-1.5 group"
    >
      <Heart className="w-3.5 h-3.5 text-[hsl(var(--gold-ink))] group-hover:fill-[hsl(var(--highland-gold))] transition-all duration-300" />
      <span>Giving Back</span>
    </Link>
    <a
      href="tel:+18285247773"
      className="md:hidden flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-sm bg-primary text-primary-foreground active:scale-95 transition-transform"
    >
      <Phone className="w-4 h-4" />
    </a>
    <Link
      to="/consultation"
      className="hidden sm:inline-flex cta-gradient text-accent-foreground font-bold text-body-xs px-7 py-4 rounded-none items-center gap-2.5 btn-primary-interactive uppercase tracking-[0.1em] shadow-lg border border-[hsl(var(--highland-gold)/0.4)]"
    >
      <span className="relative z-10">Get Estimate</span>
      <ArrowRight className="w-4 h-4 relative z-10 btn-arrow-icon" />
    </Link>
    <button
      onClick={() => setMobileOpen(!mobileOpen)}
      className="lg:hidden flex items-center justify-center w-10 h-10 rounded-sm text-heritage-charcoal hover:bg-black/5 active:scale-90 transition-all duration-300"
      aria-label={mobileOpen ? "Close menu" : "Open menu"}
      aria-expanded={mobileOpen}
    >
      <AnimatePresence mode="wait">
        {mobileOpen ? (
          <motion.div key="close" initial={{ rotate: -90, opacity: 0, scale: 0.8 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.8 }} transition={{ duration: 0.2, ease: HIGHLAND_EASE }}>
            <X className="w-6 h-6" />
          </motion.div>
        ) : (
          <motion.div key="menu" initial={{ rotate: 90, opacity: 0, scale: 0.8 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.8 }} transition={{ duration: 0.2, ease: HIGHLAND_EASE }}>
            <Menu className="w-6 h-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  </div>
);