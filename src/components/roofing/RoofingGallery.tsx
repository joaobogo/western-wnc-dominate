import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

/* ═══════════════════════════════════════════
   ROOFING PROJECT GALLERY — Editorial style
   ═══════════════════════════════════════════ */

export interface GalleryProject {
  src: string;
  alt: string;
  title: string;
  category: string;
  summary?: string;
}

interface RoofingGalleryProps {
  projects: GalleryProject[];
  heading?: string;
  eyebrow?: string;
  variant?: "light" | "tartan";
  columns?: 2 | 3;
  className?: string;
}

const RoofingGallery = ({
  projects,
  heading = "Recent Work.",
  eyebrow = "Project Gallery",
  variant = "tartan",
  columns = 2,
  className = "",
}: RoofingGalleryProps) => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const bgClass = variant === "tartan" ? "bg-secondary tartan-bg" : "bg-background";
  const colClass = columns === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";

  return (
    <>
      <section className={`section-padding ${bgClass} ${className}`}>
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center mb-10 md:mb-14"
          >
            <span className="eyebrow mb-3 block">{eyebrow}</span>
            <h2 className="section-heading">{heading}</h2>
          </motion.div>

          <div className={`grid grid-cols-1 ${colClass} gap-4 md:gap-5`}>
            {projects.map((project, i) => (
              <motion.button
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setLightboxIdx(i)}
                className="group relative aspect-[4/3] rounded-sm overflow-hidden text-left cursor-pointer"
              >
                <img decoding="async"
                  src={project.src}
                  alt={project.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-[9px] font-body font-bold uppercase tracking-[0.15em] bg-white/15 backdrop-blur-sm text-white/90 px-2.5 py-1 rounded-sm">
                    {project.category}
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <h3 className="text-white font-heading font-bold text-sm md:text-base mb-1 group-hover:text-[hsl(var(--highland-gold-light))] transition-colors">
                    {project.title}
                  </h3>
                  {project.summary && (
                    <p className="text-white/85 text-xs font-body line-clamp-2 max-w-xs translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      {project.summary}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-[hsl(var(--highland-gold-light))] text-[10px] font-body font-semibold uppercase tracking-wider mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    View Details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}
          >
            <button
              onClick={() => setLightboxIdx(null)}
              className="absolute top-6 right-6 text-white/85 hover:text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img decoding="async" loading="lazy"
                src={projects[lightboxIdx].src}
                alt={projects[lightboxIdx].alt}
                className="w-full h-auto max-h-[75vh] object-contain rounded-sm"
              />
              <div className="mt-4 text-center">
                <span className="text-[9px] font-body font-bold uppercase tracking-[0.15em] text-[hsl(var(--highland-gold))]">
                  {projects[lightboxIdx].category}
                </span>
                <h3 className="text-white font-heading font-bold text-lg mt-1">
                  {projects[lightboxIdx].title}
                </h3>
                {projects[lightboxIdx].summary && (
                  <p className="text-white/40 text-sm font-body mt-1 max-w-xl mx-auto">
                    {projects[lightboxIdx].summary}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RoofingGallery;
