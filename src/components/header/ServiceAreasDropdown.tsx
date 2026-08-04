import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import { trackEvent, setSourceTown } from "@/lib/analytics";
import { HIGHLAND_EASE, townLinks } from "./nav-data";

interface Props {
  isOpen: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onOpen: () => void;
  onClose: () => void;
  isActive: (href: string) => boolean;
  onViewAllClick: (e: React.MouseEvent, href: string) => void;
  panelRef: React.RefObject<HTMLDivElement>;
}

export const ServiceAreasDropdown = forwardRef<HTMLAnchorElement, Props>(
  ({ isOpen, onEnter, onLeave, onOpen, onClose, isActive, onViewAllClick, panelRef }, triggerRef) => (
    <div
      className="relative"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onClose();
      }}
    >
      <Link
        to="/service-areas"
        ref={triggerRef}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="service-areas-menu"
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            onOpen();
            requestAnimationFrame(() => {
              const first = panelRef.current?.querySelector<HTMLAnchorElement>('[role="menuitem"]');
              first?.focus();
            });
          } else if (e.key === "Escape" && isOpen) {
            e.preventDefault();
            onClose();
          }
        }}
        className={`relative text-[15px] font-bold transition-all duration-300 inline-flex items-center gap-1.5 px-2.5 xl:px-4 py-4 rounded-sm font-body whitespace-nowrap ${
          isActive("/service-areas")
            ? "text-heritage-charcoal bg-black/5"
            : "text-heritage-charcoal/75 hover:text-heritage-charcoal hover:bg-black/5"
        }`}
      >
        Service Areas
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25, ease: HIGHLAND_EASE }} aria-hidden="true">
          <ChevronDown className="w-3 h-3 opacity-50" />
        </motion.div>
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.25, ease: HIGHLAND_EASE }}
            className="absolute top-full right-0 pt-2.5"
          >
            <div
              ref={panelRef}
              id="service-areas-menu"
              role="menu"
              aria-label="Service areas by town"
              className="bg-card border border-border rounded-sm shadow-[0_20px_60px_-15px_hsl(var(--heritage-charcoal)/0.15)] w-[440px] relative overflow-hidden focus:outline-none"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden">
                <div
                  className="absolute inset-0 opacity-40 bg-[hsl(var(--highland-gold)/0.1)]"
                  style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "80px auto" }}
                />
              </div>
              <div className="px-5 pt-5 pb-3">
                <span className="text-base font-heading font-bold text-foreground block">Service Areas</span>
                <p className="text-[11px] font-body font-semibold uppercase tracking-[0.1em] text-muted-foreground mt-1">
                  Western North Carolina Mountains
                </p>
              </div>
              <div className="mx-5 h-px bg-border/60" />
              <div className="py-2 px-2 grid grid-cols-2 max-h-[60vh] overflow-y-auto">
                {townLinks.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    role="menuitem"
                    title={`Roofing & Construction in ${item.label}, NC`}
                    aria-label={`Roofing & Construction in ${item.label}, NC`}
                    onClick={() => {
                      setSourceTown({ town: item.label, href: item.href, source: "header_dropdown_desktop" });
                      trackEvent("cta_click", {
                        label: `service_area_dropdown:${item.label}`,
                        elementId: "header-service-areas-desktop",
                        metadata: { town: item.label, href: item.href, source: "header_dropdown_desktop" },
                      });
                    }}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`group/item relative flex items-center justify-between px-3 py-2 rounded-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--highland-gold)/0.5)] ${
                      isActive(item.href)
                        ? "bg-[hsl(var(--highland-gold)/0.12)] text-foreground font-semibold ring-1 ring-[hsl(var(--highland-gold)/0.35)]"
                        : "text-foreground/70 hover:text-foreground hover:bg-secondary/40"
                    }`}
                  >
                    {isActive(item.href) && (
                      <span aria-hidden="true" className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[3px] rounded-r bg-[hsl(var(--highland-gold))]" />
                    )}
                    <span className="text-[15px] font-body font-semibold leading-tight">{item.label}</span>
                    <ChevronRight aria-hidden="true" className="w-3 h-3 opacity-0 group-hover/item:opacity-40 -translate-x-1 group-hover/item:translate-x-0 transition-all duration-200" />
                  </Link>
                ))}
              </div>
              <div className="border-t border-border/60 mx-2 mt-1">
                <Link
                  to="/service-areas"
                  onClick={(e) => onViewAllClick(e, "/service-areas")}
                  className="flex items-center gap-1.5 px-3 py-3 text-[14px] font-body font-bold rounded-sm transition-colors text-primary hover:bg-primary/5"
                >
                  View All Service Areas
                  <ArrowRight className="w-3 h-3 btn-arrow-icon" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
);
ServiceAreasDropdown.displayName = "ServiceAreasDropdown";