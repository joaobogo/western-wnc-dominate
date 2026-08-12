interface HeroPictureProps {
  /** AVIF source (generated at build time via ?format=avif) */
  avif?: string;
  /** WebP / JPEG fallback source */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Above-the-fold images load eagerly with high priority */
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  ariaHidden?: boolean;
}

/**
 * Renders an above-the-fold hero image as a <picture> with an AVIF source and a
 * WebP/JPEG fallback. Intrinsic width/height are always set so the browser can
 * reserve space and avoid layout shift.
 */
const HeroPicture = ({
  avif,
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  style,
  sizes = "100vw",
  ariaHidden,
}: HeroPictureProps) => (
  <picture>
    {avif ? <source srcSet={avif} type="image/avif" sizes={sizes} /> : null}
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "low"}
      decoding={priority ? "sync" : "async"}
      className={className}
      style={style}
      aria-hidden={ariaHidden}
    />
  </picture>
);

export default HeroPicture;
