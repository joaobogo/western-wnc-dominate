import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import { DivisionDropdown as DivisionDropdownData, HIGHLAND_EASE, dropdownItemVariants } from "./nav-data";

interface Props {
  division: DivisionDropdownData;
  isOpen: boolean;
  onEnter: () => void;
  onLeave: () => void;
  isActive: (href: string) => boolean;
  onViewAllClick: (e: React.MouseEvent, href: string) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const DivisionDropdown = ({ division: div, isOpen, onEnter, onLeave, isActive, onViewAllClick, onOpen, onClose }: Props) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const menuId = `nav-${div.label.toLowerCase()}-menu`;

  return (
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
      to={div.href}
      ref={triggerRef}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={menuId}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          onOpen();
          requestAnimationFrame(() => {
            panelRef.current?.querySelector<HTMLAnchorElement>('[role="menuitem"]')?.focus();
          });
        } else if (e.key === "Escape" && isOpen) {
          e.preventDefault();
          onClose();
          triggerRef.current?.focus();
        }
      }}
      className={`relative text-body-sm font-bold transition-all duration-300 inline-flex items-center gap-1.5 px-2.5 xl:px-4 py-4 rounded-sm font-body whitespace-nowrap ${
        isActive(div.href)
          ? "text-heritage-charcoal bg-black/5"
          : "text-heritage-charcoal/90 hover:text-heritage-charcoal hover:bg-black/5"
      }`}
    >
      {div.label}
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25, ease: HIGHLAND_EASE }}>
        <ChevronDown className="w-3 h-3 opacity-50" />
      </motion.div>
      {isActive(div.href) && (
        <motion.div
          layoutId="nav-active"
          className="absolute -bottom-px left-3 right-3 h-[2px] bg-[hsl(var(--highland-gold))]"
          transition={{ duration: 0.3, ease: HIGHLAND_EASE }}
        />
      )}
    </Link>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.98 }}
          transition={{ duration: 0.25, ease: HIGHLAND_EASE }}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5"
          ref={panelRef}
          id={menuId}
          role="menu"
          aria-label={`${div.label} services`}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              onClose();
              triggerRef.current?.focus();
            }
          }}
        >
          <div className="bg-card border border-border rounded-sm shadow-raised w-[min(92vw,860px)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden">
              <div
                className="absolute inset-0 opacity-40 bg-[hsl(var(--highland-gold)/0.1)]"
                style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "80px auto" }}
              />
            </div>

            <div className="px-5 pt-5 pb-3">
              <div className="flex items-center gap-2.5 mb-1">
                <div className={`w-7 h-7 rounded-sm flex items-center justify-center ${
                  div.accent === "green" ? "bg-primary/10" : "bg-[hsl(var(--highland-gold)/0.1)]"
                }`}>
                  <div.icon className={`w-3.5 h-3.5 ${
                    div.accent === "green" ? "text-primary" : "text-[hsl(var(--gold-ink))]"
                  }`} />
                </div>
                <span className="text-base font-heading font-bold text-foreground">{div.label} Division</span>
              </div>
              <p className="text-caption font-body font-semibold uppercase tracking-[0.1em] text-muted-foreground ml-[38px]">
                {div.tagline}
              </p>
            </div>

            <div className="mx-5 h-px bg-border/60" />

            <div className="grid grid-cols-[repeat(3,minmax(0,1fr))_260px] gap-x-4 py-3 px-4">
              {div.columns.map((col, ci) => (
                <div key={col.title}>
                  <p className="px-3 pb-1.5 text-caption font-body font-bold uppercase tracking-[0.12em] text-muted-foreground/80">
                    {col.title}
                  </p>
                  {col.items.map((item, i) => (
                    <motion.div
                      key={item.href}
                      custom={ci * 3 + i}
                      variants={dropdownItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        to={item.href}
                        role="menuitem"
                        onClick={onClose}
                        className={`group/item flex items-start justify-between gap-2 px-3 py-2 rounded-sm transition-all duration-200 ${
                          isActive(item.href)
                            ? "bg-secondary/60 text-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                        }`}
                      >
                        <span className="block">
                          <span className="text-body-sm font-body font-bold block leading-tight">{item.label}</span>
                          <span className="text-body-xs font-body text-muted-foreground leading-snug font-medium block">{item.desc}</span>
                        </span>
                        <ChevronRight className="w-3 h-3 mt-1 shrink-0 opacity-0 group-hover/item:opacity-40 -translate-x-1 group-hover/item:translate-x-0 transition-all duration-200" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ))}

              <Link
                to={div.featured.href}
                role="menuitem"
                onClick={onClose}
                className={`group/feat flex flex-col justify-between rounded-sm border p-4 transition-colors ${
                  div.accent === "green"
                    ? "border-primary/20 bg-primary/5 hover:bg-primary/10"
                    : "border-[hsl(var(--highland-gold)/0.3)] bg-[hsl(var(--highland-gold)/0.08)] hover:bg-[hsl(var(--highland-gold)/0.14)]"
                }`}
              >
                <span>
                  <span className="text-caption font-body font-bold uppercase tracking-[0.12em] text-muted-foreground block">
                    {div.featured.eyebrow}
                  </span>
                  <span className="text-base font-heading font-bold text-foreground block mt-1.5 leading-tight">
                    {div.featured.label}
                  </span>
                  <span className="text-body-xs font-body text-muted-foreground block mt-1.5 leading-snug">
                    {div.featured.desc}
                  </span>
                </span>
                <span className={`inline-flex items-center gap-1.5 text-body-xs font-body font-bold mt-4 ${
                  div.accent === "green" ? "text-primary" : "text-[hsl(var(--gold-ink))]"
                }`}>
                  Get started
                  <ArrowRight className="w-3 h-3 btn-arrow-icon" />
                </span>
              </Link>
            </div>

            <div className="border-t border-border/60 mx-2 mt-1">
              <Link
                to={div.href}
                role="menuitem"
                onClick={(e) => onViewAllClick(e, div.href)}
                className={`flex items-center gap-1.5 px-3 py-3 text-body-xs font-body font-bold rounded-sm transition-colors ${
                  div.accent === "green" ? "text-primary hover:bg-primary/5" : "text-[hsl(var(--gold-ink))] hover:bg-accent/5"
                }`}
              >
                View All {div.label}
                <ArrowRight className="w-3 h-3 btn-arrow-icon" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  );
};