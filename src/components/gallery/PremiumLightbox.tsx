import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useCallback, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Maximize2, Minimize2, ZoomIn } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

export interface LightboxProject {
  title: string;
  image: string;
  location?: string;
  type?: string;
  description?: string;
  scope?: string;
  duration?: string;
  highlight?: string;
}

interface PremiumLightboxProps {
  projects: LightboxProject[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const PremiumLightbox = ({ projects, currentIndex, onClose, onNavigate }: PremiumLightboxProps) => {
  const isMobile = useIsMobile();
  const [zoomed, setZoomed] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const dragX = useMotionValue(0);
  const dragOpacity = useTransform(dragX, [-200, 0, 200], [0.5, 1, 0.5]);

  const isOpen = currentIndex !== null;
  const project = isOpen ? projects[currentIndex] : null;

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape": onClose(); break;
        case "ArrowLeft": if (currentIndex! > 0) onNavigate(currentIndex! - 1); break;
        case "ArrowRight": if (currentIndex! < projects.length - 1) onNavigate(currentIndex! + 1); break;
        case "i": setShowInfo(p => !p); break;
        case "z": setZoomed(p => !p); break;
        case "Tab": {
          // Focus trap: cycle within the dialog so keyboard users cannot
          // tab into the page behind the overlay.
          const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
          if (!focusables || focusables.length === 0) break;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          const active = document.activeElement as HTMLElement | null;
          if (e.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && active === last) {
            e.preventDefault();
            first.focus();
          }
          break;
        }
      }
    };
    lastFocused.current = document.activeElement as HTMLElement | null;
    // Move focus into the dialog so the screen reader announces it.
    requestAnimationFrame(() => dialogRef.current?.focus());
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
      lastFocused.current?.focus();
    };
  }, [isOpen, currentIndex, onClose, onNavigate, projects.length]);

  // Reset zoom on slide change
  useEffect(() => { setZoomed(false); }, [currentIndex]);

  // Touch/swipe handling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || zoomed) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = Math.abs((touchStartY.current ?? 0) - e.changedTouches[0].clientY);
    // Only horizontal swipe (not vertical scroll)
    if (Math.abs(dx) > 50 && dy < 80) {
      if (dx > 0 && currentIndex! < projects.length - 1) onNavigate(currentIndex! + 1);
      if (dx < 0 && currentIndex! > 0) onNavigate(currentIndex! - 1);
    }
    // Vertical swipe down to close
    if (dy > 120 && Math.abs(dx) < 40) onClose();
    touchStartX.current = null;
    touchStartY.current = null;
    dragX.set(0);
  }, [currentIndex, onClose, onNavigate, projects.length, zoomed, dragX]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || zoomed) return;
    const dx = touchStartX.current - e.touches[0].clientX;
    dragX.set(-dx * 0.3);
  }, [zoomed, dragX]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={project ? `Project gallery: ${project.title}` : "Project gallery"}
          tabIndex={-1}
          className="fixed inset-0 z-[70] bg-[hsl(var(--heritage-charcoal)/0.97)] backdrop-blur-sm flex items-center justify-center focus:outline-none"
          onClick={onClose}
        >
          {/* Controls bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 md:px-8 py-4"
            onClick={e => e.stopPropagation()}
          >
            {/* Counter */}
            <span className="text-white/40 text-sm font-body font-medium tabular-nums">
              {(currentIndex! + 1).toString().padStart(2, "0")} / {projects.length.toString().padStart(2, "0")}
            </span>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              {!isMobile && (
                <>
                  <button
                    onClick={() => setShowInfo(p => !p)}
                    aria-label={showInfo ? "Hide project details" : "Show project details"}
                    aria-pressed={showInfo}
                    className="w-9 h-9 rounded-sm bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                    title="Toggle info (I)"
                  >
                    <span className="text-white/85 text-xs font-body font-semibold">i</span>
                  </button>
                  <button
                    onClick={() => setZoomed(p => !p)}
                    aria-label={zoomed ? "Zoom out" : "Zoom in"}
                    aria-pressed={zoomed}
                    className="w-9 h-9 rounded-sm bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                    title="Toggle zoom (Z)"
                  >
                    {zoomed ? <Minimize2 className="w-4 h-4 text-white/85" aria-hidden="true" /> : <ZoomIn className="w-4 h-4 text-white/85" aria-hidden="true" />}
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                aria-label="Close project gallery"
                className="w-9 h-9 rounded-sm bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white/85" aria-hidden="true" />
              </button>
            </div>
          </motion.div>

          {/* Navigation arrows — desktop */}
          {!isMobile && currentIndex! > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex! - 1); }}
              aria-label="Previous project"
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-sm bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all z-20 group"
            >
              <ChevronLeft className="w-6 h-6 text-white/40 group-hover:text-white/95 transition-colors" aria-hidden="true" />
            </button>
          )}
          {!isMobile && currentIndex! < projects.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex! + 1); }}
              aria-label="Next project"
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-sm bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all z-20 group"
            >
              <ChevronRight className="w-6 h-6 text-white/40 group-hover:text-white/95 transition-colors" aria-hidden="true" />
            </button>
          )}

          {/* Image + Info layout */}
          <div
            className="max-w-6xl w-full flex flex-col md:flex-row gap-0 md:gap-6 items-center px-4 md:px-16"
            onClick={e => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: HIGHLAND_EASE }}
                className={`relative ${showInfo && !isMobile ? "md:w-2/3" : "w-full"} transition-all duration-300`}
                style={{ x: dragX, opacity: isMobile ? dragOpacity : 1 }}
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className={`w-full rounded-sm object-contain transition-all duration-500 ${
                    zoomed
                      ? "max-h-[90vh] cursor-zoom-out"
                      : "max-h-[75vh] cursor-zoom-in"
                  }`}
                  onClick={() => !isMobile && setZoomed(p => !p)}
                  layoutId={`gallery-image-${currentIndex}`}
                />
                {/* Gold bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.25)] to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Info panel — desktop or tap on mobile */}
            <AnimatePresence>
              {showInfo && !zoomed && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, ease: HIGHLAND_EASE }}
                  className={`${
                    isMobile
                      ? "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal))] to-transparent p-5 pb-8 z-10"
                      : "md:w-1/3"
                  }`}
                >
                  {project.type && (
                    <span className="text-caption font-body font-semibold uppercase tracking-[0.14em] text-[hsl(var(--gold-ink))] mb-2 block">
                      {project.type}
                    </span>
                  )}
                  <h3 className="font-heading font-bold text-xl text-white mb-3">{project.title}</h3>
                  {project.description && (
                    <p className="text-white/85 text-sm leading-relaxed font-body mb-5">{project.description}</p>
                  )}
                  <div className="space-y-2.5 text-sm text-white/45 font-body">
                    {project.location && (
                      <p className="flex items-center gap-2"><MapPin className="w-4 h-4" aria-hidden="true" /> {project.location}</p>
                    )}
                    {project.scope && (
                      <p className="flex items-center gap-2"><Maximize2 className="w-4 h-4" aria-hidden="true" /> {project.scope}</p>
                    )}
                  </div>
                  {project.highlight && (
                    <div className="mt-5 pt-5 border-t border-white/8">
                      <p className="text-caption font-body font-semibold uppercase tracking-wider text-[hsl(var(--highland-gold)/0.9)] mb-1">Project Highlight</p>
                      <p className="text-white/85 text-sm font-body">{project.highlight}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile swipe hint */}
          {isMobile && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-caption font-body tracking-wider uppercase"
            >
              Swipe to navigate · Pull down to close
            </motion.p>
          )}

          {/* Thumbnail strip — desktop only */}
          {!isMobile && projects.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20"
            >
              {projects.map((p, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); onNavigate(i); }}
                  aria-label={`View project ${i + 1} of ${projects.length}${p.title ? `: ${p.title}` : ""}`}
                  aria-current={i === currentIndex ? "true" : undefined}
                  className={`w-12 h-8 rounded-sm overflow-hidden border-2 transition-all duration-300 ${
                    i === currentIndex
                      ? "border-[hsl(var(--highland-gold))] opacity-100"
                      : "border-transparent opacity-40 hover:opacity-70"
                  }`}
                >
                  <img width={1600} height={1067} src={p.image} alt="" aria-hidden="true" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PremiumLightbox;
