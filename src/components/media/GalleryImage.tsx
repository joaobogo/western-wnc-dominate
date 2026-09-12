import type { ImgHTMLAttributes } from "react";
import { gallerySrcSets } from "@/lib/gallery-srcset";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  /** How wide the image renders. Defaults to full width on phones, half above. */
  sizes?: string;
};

/**
 * Drop-in for <img> on any gallery master. Emits AVIF + WebP srcsets at
 * 480/800/1200 and points the <img> fallback at the 480px WebP, so even a
 * browser that re-requests the fallback (as the audited hydration re-render
 * did) pulls ~30KB, not a 550KB original. Falls back to a plain <img> for any
 * source that is not a gallery master.
 *
 * <picture> is `display: contents` so the caller's layout classes on the <img>
 * (absolute / h-full / object-cover) behave exactly as before.
 */
const GalleryImage = ({
  src,
  alt,
  sizes = "(max-width: 640px) 100vw, 50vw",
  loading = "lazy",
  decoding = "async",
  ...rest
}: Props) => {
  const set = gallerySrcSets(src);
  if (!set) return <img src={src} alt={alt} loading={loading} decoding={decoding} {...rest} />;
  return (
    <picture className="contents">
      <source type="image/avif" srcSet={set.avif} sizes={sizes} />
      <source type="image/webp" srcSet={set.webp} sizes={sizes} />
      <img
        src={set.small}
        srcSet={set.webp}
        sizes={sizes}
        alt={alt}
        loading={loading}
        decoding={decoding}
        {...rest}
      />
    </picture>
  );
};

export default GalleryImage;
