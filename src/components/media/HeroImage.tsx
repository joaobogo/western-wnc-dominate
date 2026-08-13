interface HeroImageProps {
  /** AVIF srcset generated at build time (?format=avif&as=srcset) */
  avifSrcSet?: string;
  /** WebP srcset generated at build time (?format=webp&as=srcset) */
  webpSrcSet?: string;
  /** Fallback single-file source */
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
}

/**
 * Above-the-fold page hero (CRO Prompt 40 — speed as a conversion lever).
 *
 * Serves a width-appropriate AVIF/WebP so a 390px phone downloads a ~640px
 * image instead of the 1600px desktop master. Always eager + high priority
 * because it is the LCP element on every page that uses it.
 */
const HeroImage = ({
  avifSrcSet,
  webpSrcSet,
  src,
  alt,
  className,
  sizes = "100vw",
  width = 1600,
  height = 1067,
}: HeroImageProps) => (
  <picture>
    {avifSrcSet ? <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} /> : null}
    {webpSrcSet ? <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} /> : null}
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading="eager"
      fetchPriority="high"
      decoding="async"
      className={className}
    />
  </picture>
);

export default HeroImage;
