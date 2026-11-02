import { useEffect, useState, type RefObject } from "react";
import { onStrictIntent } from "@/lib/third-party-intent";

/**
 * True once the element is near the viewport AND the visitor has interacted
 * with the page. Heavy third-party embeds (Google Maps, the RealWork feed)
 * wait for this, so they never cost a visitor who only glances at the page.
 */
export function useDeferredEmbed(ref: RefObject<Element>, rootMargin = "400px"): boolean {
  const [near, setNear] = useState(false);
  const [engaged, setEngaged] = useState(false);

  useEffect(() => {
    let alive = true;
    onStrictIntent(() => {
      if (alive) setEngaged(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return near && engaged;
}
