import { PHONE_DISPLAY, PHONE_TEL } from "@/data/business";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { HIGHLAND_EASE } from "./nav-data";

interface Props {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  menuButtonRef?: React.RefObject<HTMLButtonElement>;
}

export const HeaderActions = ({ mobileOpen, setMobileOpen, menuButtonRef }: Props) => (
  <div className="flex items-center gap-3">
    <a
      href={PHONE_TEL}
      aria-label={`Call Highlander Building Services at ${PHONE_DISPLAY}`}
      className="hidden sm:flex items-center gap-2 transition-all duration-300 text-body-sm font-body font-bold mr-1 text-heritage-charcoal/75 hover:text-heritage-charcoal whitespace-nowrap"
    >
      <Phone className="w-4 h-4" aria-hidden="true" />
      <span>{PHONE_DISPLAY}</span>
    </a>
    <a
      href={PHONE_TEL}
      aria-label={`Call ${PHONE_DISPLAY}`}
      className="sm:hidden flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-sm bg-primary text-primary-foreground active:scale-95 transition-transform"
    >
      <Phone className="w-4 h-4" aria-hidden="true" />
    </a>
    <Link
      to="/request-inspection"
      className="btn btn-primary btn-sm sm:px-7 sm:py-4 sm:gap-2.5 whitespace-nowrap"
    >
      <span className="relative z-10">Get My <span className="hidden sm:inline">Written </span>Estimate</span>
      <ArrowRight className="w-4 h-4 relative z-10 btn-arrow-icon" aria-hidden="true" />
    </Link>
    <button
      ref={menuButtonRef}
      onClick={() => setMobileOpen(!mobileOpen)}
      className="lg:hidden flex items-center justify-center min-w-[44px] h-10 px-2 rounded-sm text-heritage-charcoal hover:bg-black/5 active:scale-90 transition-all duration-300"
      aria-label={mobileOpen ? "Close menu" : "Open menu"}
      aria-expanded={mobileOpen}
    >
      <AnimatePresence mode="wait">
        {mobileOpen ? (
          <motion.div key="close" initial={{ rotate: -90, opacity: 0, scale: 0.8 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.8 }} transition={{ duration: 0.2, ease: HIGHLAND_EASE }}>
            <X className="w-6 h-6" aria-hidden="true" />
          </motion.div>
        ) : (
          <motion.div key="menu" initial={{ rotate: 90, opacity: 0, scale: 0.8 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.8 }} transition={{ duration: 0.2, ease: HIGHLAND_EASE }}>
            <Menu className="w-6 h-6" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  </div>
);