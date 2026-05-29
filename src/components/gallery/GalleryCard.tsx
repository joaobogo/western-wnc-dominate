import { motion } from "framer-motion";
import { MapPin, Calendar, Eye, Ruler } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

interface GalleryCardProps {
  title: string;
  image: string;
  type: string;
  description: string;
  location: string;
  scope?: string;
  duration?: string;
  highlight?: string;
  index: number;
  onClick: () => void;
}

const GalleryCard = ({
  title,
  image,
  type,
  description,
  location,
  scope,
  duration,
  highlight,
  index,
  onClick,
}: GalleryCardProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.97 }}
    transition={{ delay: index * 0.04, duration: 0.4, ease: HIGHLAND_EASE }}
    className="group card-premium tartan-hover cursor-pointer"
    onClick={onClick}
  >
    {/* Image container */}
    <div className="relative aspect-[4/3] overflow-hidden">
      <motion.img
        src={image}
        alt={title}
        className="w-full h-full object-cover img-zoom"
        loading="lazy"
        initial={{ scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: HIGHLAND_EASE }}
      />

      {/* Gradient overlay — intensifies on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0.6)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Hover detail strip */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <div className="flex items-center gap-4 text-white/80 text-xs font-body">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {location}</span>
          {duration && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {duration}</span>}
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> View</span>
        </div>
      </div>

      {/* Category badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[9px] font-body font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-sm bg-primary/90 text-primary-foreground backdrop-blur-sm">
          {type}
        </span>
      </div>

      {/* Zoom indicator — appears on hover */}
      <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-sm bg-white/0 group-hover:bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <Eye className="w-3.5 h-3.5 text-white/70" />
      </div>
    </div>

    {/* Content */}
    <div className="p-5 md:p-6 relative z-10">
      <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed font-body mb-4 line-clamp-2">
        {description}
      </p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {location}</span>
        {scope && <span className="flex items-center gap-1"><Ruler className="w-3 h-3" /> {scope}</span>}
      </div>
      {highlight && (
        <div className="mt-4 pt-4 border-t border-border proof-card-outcome group-hover:!max-h-[60px] group-hover:!opacity-100">
          <p className="text-[11px] font-body font-medium text-accent flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            {highlight}
          </p>
        </div>
      )}
    </div>
  </motion.div>
);

export default GalleryCard;
