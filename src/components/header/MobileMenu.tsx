import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Phone } from "lucide-react";
import { HIGHLAND_EASE, divisions, resourceLinks, secondaryLinks } from "./nav-data";
import { MobileServiceAreasList } from "./MobileServiceAreasList";
import { preloadHandlers } from "@/lib/route-preload";

interface Props {
  open: boolean;
  onClose: () => void;
  expanded: string | null;
  setExpanded: (v: string | null) => void;
  isActive: (href: string) => boolean;
  onViewAllClick: (e: React.MouseEvent, href: string) => void;
  serviceAreasBtnRef: React.RefObject<HTMLButtonElement>;
}

export const MobileMenu = ({ open, onClose, expanded, setExpanded, isActive, onViewAllClick, serviceAreasBtnRef }: Props) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trap + Escape close while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 top-[inherit] bg-[hsl(var(--heritage-charcoal)/0.3)] backdrop-blur-sm lg:hidden z-[-1]"
          onClick={onClose}
        />

        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: HIGHLAND_EASE }}
          className="lg:hidden bg-white border-t border-black/5 overflow-hidden"
        >
          {/* Persistent call button pinned to the top of the panel */}
          <a
            href="tel:+18285247773"
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold font-body text-body-xs uppercase tracking-[0.08em] min-h-[52px] px-4 active:scale-[0.99] transition-transform"
          >
            <Phone className="w-4 h-4" />
            Call (828) 524-7773
          </a>

          <nav
            aria-label="Mobile"
            className="flex flex-col px-4 py-3 gap-0.5 max-h-[calc(100dvh-3.5rem-52px-76px)] overflow-y-auto overscroll-contain"
          >
            {divisions.map((div, di) => (
              <motion.div
                key={div.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + di * 0.06, duration: 0.3, ease: HIGHLAND_EASE }}
              >
                <button
                  onClick={() => setExpanded(expanded === div.label ? null : div.label)}
                  aria-expanded={expanded === div.label}
                  aria-controls={`mobile-${div.label.toLowerCase()}-panel`}
                  className={`w-full py-2.5 px-2.5 rounded-sm transition-all duration-200 flex items-center justify-between min-h-[48px] ${
                    isActive(div.href) ? "text-heritage-charcoal bg-black/5" : "text-heritage-charcoal/90 hover:bg-black/5"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-sm flex items-center justify-center ${
                      div.accent === "green" ? "bg-primary/10" : "bg-[hsl(var(--highland-gold)/0.1)]"
                    }`}>
                      <div.icon className={`w-3.5 h-3.5 ${
                        div.accent === "green" ? "text-primary" : "text-[hsl(var(--gold-ink))]"
                      }`} />
                    </div>
                    <div className="text-left">
                      <span className="text-body-sm md:text-body font-heading font-bold block leading-tight text-heritage-charcoal">{div.label}</span>
                      <span className="text-caption md:text-body-xs font-body text-heritage-charcoal/55 uppercase tracking-[0.1em] leading-tight">{div.tagline}</span>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: expanded === div.label ? 180 : 0 }} transition={{ duration: 0.25, ease: HIGHLAND_EASE }}>
                    <ChevronDown className="w-4 h-4 text-heritage-charcoal/40" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expanded === div.label && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: HIGHLAND_EASE }}
                      className="overflow-hidden"
                      id={`mobile-${div.label.toLowerCase()}-panel`}
                      role="region"
                      aria-label={`${div.label} services`}
                    >
                      <div className={`ml-3.5 pl-3 pb-1.5 space-y-0 border-l-2 ${
                        div.accent === "green" ? "border-primary/15" : "border-[hsl(var(--highland-gold)/0.15)]"
                      }`}>
                        {div.items.map((item, j) => (
                          <motion.div key={item.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.03, duration: 0.2 }}>
                            <Link
                              to={item.href}
                              {...preloadHandlers(item.href)}
                              onClick={onClose}
                              className={`py-2 px-2.5 rounded-sm transition-all block min-h-[44px] flex flex-col justify-center ${
                                isActive(item.href) ? "bg-black/5" : "hover:bg-black/5"
                              }`}
                            >
                              <span className={`text-body-sm font-body block leading-tight ${
                                isActive(item.href) ? "font-medium text-heritage-charcoal" : "text-heritage-charcoal/70"
                              }`}>{item.label}</span>
                              <span className="text-caption font-body text-heritage-charcoal/45 leading-tight mt-0.5">{item.desc}</span>
                            </Link>
                          </motion.div>
                        ))}
                        <Link
                          to={div.href}
                          onClick={(e) => onViewAllClick(e, div.href)}
                          className={`py-2 px-2.5 text-body-xs font-bold uppercase tracking-[0.08em] rounded-sm transition-colors flex items-center gap-1.5 font-body ${
                            div.accent === "green" ? "text-primary" : "text-[hsl(var(--gold-ink))]"
                          }`}
                        >
                          View All {div.label} <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            <MobileServiceAreasList
              expanded={expanded === "ServiceAreas"}
              onToggle={() => setExpanded(expanded === "ServiceAreas" ? null : "ServiceAreas")}
              onClose={() => setExpanded(null)}
              isActive={isActive}
              onNavigate={onClose}
              btnRef={serviceAreasBtnRef}
            />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.3 }} className="flex items-center gap-3 py-1.5 px-2.5 mt-1">
              <div className="flex-1 h-px bg-black/10" />
              <span className="text-caption font-body font-semibold uppercase tracking-[0.2em] text-heritage-charcoal/40">More</span>
              <div className="flex-1 h-px bg-black/10" />
            </motion.div>

            {secondaryLinks.map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.03, duration: 0.3, ease: HIGHLAND_EASE }}>
                <Link
                  to={link.href}
                  {...preloadHandlers(link.href)}
                  onClick={onClose}
                  className={`py-2.5 px-2.5 text-body-sm font-bold rounded-sm transition-all flex items-center gap-2 font-body min-h-[44px] ${
                    isActive(link.href) ? "text-heritage-charcoal bg-black/5" : "text-heritage-charcoal/80 hover:text-heritage-charcoal hover:bg-black/5"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highland-gold))]" />}
                </Link>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.24, duration: 0.3 }} className="flex items-center gap-3 py-1.5 px-2.5 mt-1">
              <div className="flex-1 h-px bg-black/10" />
              <span className="text-caption font-body font-semibold uppercase tracking-[0.2em] text-heritage-charcoal/40">Resources</span>
              <div className="flex-1 h-px bg-black/10" />
            </motion.div>

            <div className="grid grid-cols-2 gap-0.5">
              {resourceLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  {...preloadHandlers(link.href)}
                  onClick={onClose}
                  className={`py-2.5 px-2.5 text-body-sm font-body rounded-sm transition-all flex items-center min-h-[44px] ${
                    isActive(link.href) ? "text-heritage-charcoal bg-black/5 font-bold" : "text-heritage-charcoal/70 hover:bg-black/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

          </nav>

          {/* Primary CTA pinned to the bottom of the panel */}
          <div className="border-t border-black/10 bg-white px-4 py-3 pb-[max(env(safe-area-inset-bottom),0.75rem)]">
            <Link
              to="/consultation"
              onClick={onClose}
              className="btn btn-primary btn-md"
            >
              <span className="relative z-10">Request an Estimate</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </Link>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
  );
};