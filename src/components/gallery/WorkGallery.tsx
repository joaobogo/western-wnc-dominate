import { useMemo, useState } from "react";
import { MapPin, Expand } from "lucide-react";
import PremiumLightbox, { type LightboxProject } from "@/components/gallery/PremiumLightbox";
import { workPhotos, type WorkDivision, type WorkPhoto } from "@/data/work-photos";

type Filter = "all" | WorkDivision;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All Work" },
  { value: "roofing", label: "Roofing" },
  { value: "construction", label: "Construction" },
];

/** Interleave the two divisions so "All Work" never shows a run of one kind. */
const interleave = (photos: WorkPhoto[]) => {
  const roof = photos.filter((ph) => ph.division === "roofing");
  const build = photos.filter((ph) => ph.division === "construction");
  const out: WorkPhoto[] = [];
  for (let i = 0; i < Math.max(roof.length, build.length); i++) {
    if (roof[i]) out.push(roof[i]);
    if (build[i]) out.push(build[i]);
  }
  return out;
};

interface WorkGalleryProps {
  /** Start on one division (e.g. a construction page). */
  initialFilter?: Filter;
  /** Show the filter tabs. */
  showFilters?: boolean;
  /** Cap the number of photos (e.g. for a teaser). */
  limit?: number;
  /** Photos already shown elsewhere on the page — skipped so nothing repeats. */
  excludeImages?: string[];
}

const WorkGallery = ({ initialFilter = "all", showFilters = true, limit, excludeImages = [] }: WorkGalleryProps) => {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [open, setOpen] = useState<number | null>(null);

  const photos = useMemo(() => {
    const pool = workPhotos.filter((ph) => !excludeImages.includes(ph.src));
    const list = filter === "all" ? interleave(pool) : pool.filter((ph) => ph.division === filter);
    return limit ? list.slice(0, limit) : list;
  }, [filter, limit, excludeImages]);

  const lightboxItems: LightboxProject[] = photos.map((ph) => ({
    title: ph.title,
    image: ph.src,
    location: ph.town ? `${ph.town}, NC` : undefined,
    type: ph.division === "roofing" ? "Roofing" : "Construction",
  }));

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter work photos">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              className={`min-h-[44px] px-5 text-caption font-body font-bold uppercase tracking-[0.15em] transition-colors ${
                filter === f.value
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* Masonry: every photo keeps its own shape, so nothing is awkwardly cropped. */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {photos.map((ph, i) => (
          <figure key={ph.id} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block w-full overflow-hidden bg-muted text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label={`View larger: ${ph.title}`}
            >
              <img
                src={ph.src}
                srcSet={ph.srcSet}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                width={ph.width}
                height={ph.height}
                alt={ph.alt}
                loading="lazy"
                decoding="async"
                className="block w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-90" />
              <span className="absolute top-3 left-3 bg-[hsl(var(--heritage-charcoal)/0.6)] backdrop-blur-sm px-2.5 py-1 text-caption font-body font-bold uppercase tracking-[0.15em] text-white">
                {ph.division === "roofing" ? "Roofing" : "Construction"}
              </span>
              <span aria-hidden="true" className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <Expand className="h-4 w-4" />
              </span>
              <figcaption className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-heading font-semibold text-white text-body-sm leading-snug drop-shadow">{ph.title}</p>
                {ph.town && (
                  <p className="mt-1 flex items-center gap-1 text-caption font-body uppercase tracking-[0.12em] text-white/85">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {ph.town}, NC
                  </p>
                )}
              </figcaption>
            </button>
          </figure>
        ))}
      </div>

      <PremiumLightbox projects={lightboxItems} currentIndex={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </div>
  );
};

export default WorkGallery;
