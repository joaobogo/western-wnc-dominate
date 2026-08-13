import { cn } from "@/lib/utils";

/** Fixed aspect ratios — one per content context. */
export const IMAGE_RATIOS = {
  /** 16:9 — hero and full-bleed banners */
  hero: "aspect-hero",
  /** 4:3 — project / gallery cards */
  project: "aspect-project",
  /** 1:1 — crew headshots, social tiles */
  crew: "aspect-crew",
  /** 4:5 — vertical portraits */
  portrait: "aspect-portrait",
  /** 21:9 — wide feature strips */
  panorama: "aspect-panorama",
} as const;

/** Intrinsic dimensions per ratio so the browser reserves space (no CLS). */
const RATIO_DIMENSIONS: Record<ImageRatio, { width: number; height: number }> = {
  hero: { width: 1600, height: 900 },
  project: { width: 1200, height: 900 },
  crew: { width: 1000, height: 1000 },
  portrait: { width: 1000, height: 1250 },
  panorama: { width: 1680, height: 720 },
};

export type ImageRatio = keyof typeof IMAGE_RATIOS;
export type ScrimVariant = "none" | "bottom" | "hero" | "side" | "flat";

const SCRIM_CLASS: Record<ScrimVariant, string> = {
  none: "",
  bottom: "bg-scrim-bottom",
  hero: "bg-scrim-hero",
  side: "bg-scrim-side",
  flat: "bg-[color:var(--scrim-flat)]",
};

interface AppImageProps {
  src: string;
  /** Descriptive alt text. Required — describe the roof, place, or person. */
  alt: string;
  ratio?: ImageRatio;
  /** Gradient scrim drawn over the image for text legibility. */
  scrim?: ScrimVariant;
  /** LCP images only: loads eagerly at high priority. Everything else lazy-loads. */
  priority?: boolean;
  sizes?: string;
  srcSet?: string;
  /** Wrapper classes (rounding, borders, elevation). */
  className?: string;
  /** Classes applied to the <img> itself. */
  imgClassName?: string;
  /** Content rendered above the scrim (captions, badges). */
  children?: React.ReactNode;
  objectPosition?: string;
}

/**
 * The single image primitive for photography across the site.
 *
 * - Fixed aspect ratio per context (16:9 hero, 4:3 project card, 1:1 crew)
 * - Tokenized gradient scrim for text-over-image
 * - Lazy + async decoding everywhere except the LCP image (`priority`)
 * - Descriptive alt text is a required prop
 */
const AppImage = ({
  src,
  alt,
  ratio = "project",
  scrim = "none",
  priority = false,
  sizes,
  srcSet,
  className,
  imgClassName,
  children,
  objectPosition,
}: AppImageProps) => {
  const { width, height } = RATIO_DIMENSIONS[ratio];

  return (
    <div className={cn("relative overflow-hidden bg-muted", IMAGE_RATIOS[ratio], className)}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className={cn("h-full w-full object-cover", imgClassName)}
        style={objectPosition ? { objectPosition } : undefined}
      />
      {scrim !== "none" ? (
        <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", SCRIM_CLASS[scrim])} />
      ) : null}
      {children}
    </div>
  );
};

export default AppImage;
