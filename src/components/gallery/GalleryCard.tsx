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
    className="group relative bg-card border border-border rounded-none overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
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
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0.7)] via-[hsl(var(--heritage-charcoal)/0.2)] to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Category badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[10px] font-body font-bold uppercase tracking-[0.18em] px-3 py-1.5 bg-primary/95 text-primary-foreground backdrop-blur-md border border-white/10">
          {type}
        </span>
      </div>

      {/* Hover visual cue */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary/10">
        <div className="px-6 py-3 border border-white/30 bg-black/20 backdrop-blur-md flex items-center gap-2">
           <Eye className="w-4 h-4 text-white" />
           <span className="text-[11px] font-body font-bold uppercase tracking-[0.2em] text-white">View Project</span>
        </div>
      </div>

      {/* Gold accent line draws on hover */}
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-[hsl(var(--highland-gold))] via-[hsl(var(--highland-gold)/0.6)] to-[hsl(var(--highland-gold)/0)] transition-all duration-700 z-20" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />
    </div>

    {/* Content */}
    <div className="p-6 md:p-8 relative z-10">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-3.5 h-3.5 text-primary" />
        <span className="text-[12px] font-body font-bold uppercase tracking-[0.15em] text-muted-foreground">{location}</span>
      </div>
      
      <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-base leading-relaxed font-body mb-6 line-clamp-2 font-medium">
        {description}
      </p>

      <div className="flex items-center justify-between border-t border-border pt-5">
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground font-body font-bold uppercase tracking-wider">
           {scope && <span className="flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5" /> {scope}</span>}
           {duration && <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {duration}</span>}
        </div>
        <ArrowUpRight className="w-5 h-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
      </div>

      {highlight && (
        <div className="mt-5 p-3 bg-secondary/50 border-l-2 border-accent">
          <p className="text-[12px] font-body font-bold text-foreground flex items-center gap-2 italic">
            "{highlight}"
          </p>
        </div>
      )}
    </div>
  </motion.div>
);

const ArrowUpRight = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

export default GalleryCard;
