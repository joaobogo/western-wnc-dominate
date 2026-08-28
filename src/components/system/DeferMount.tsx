import { useEffect, useState, type ReactNode } from "react";
import { onUserIntent } from "@/lib/third-party-intent";

interface DeferMountProps {
  children: ReactNode;
  /** Fallback delay (ms) if the visitor never interacts. */
  idleDelay?: number;
  /**
   * Reserved height (px) held before the children mount. Use for in-flow
   * widgets so late mounting cannot shift the layout (CLS). Overlays that are
   * position:fixed need no reservation.
   */
  reserveHeight?: number;
  /** Classes applied to the reservation placeholder. */
  reserveClassName?: string;
}

/**
 * Defers mounting non-critical UI (chat, marketing widgets) until the visitor
 * interacts or the browser goes idle. Keeps their JS off the critical path so
 * LCP is decided by the hero, not by a support widget (Prompt 41).
 */
const DeferMount = ({ children, idleDelay = 3500, reserveHeight, reserveClassName }: DeferMountProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;
    let cancelled = false;
    // Single shared definition of "intent": scroll past the hero, a click /
    // keypress / touch, or 5 s idle after load (src/lib/third-party-intent.ts).
    onUserIntent(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [ready, idleDelay]);

  if (ready) return <>{children}</>;
  if (reserveHeight) {
    return <div aria-hidden="true" className={reserveClassName} style={{ minHeight: reserveHeight }} />;
  }
  return null;
};

export default DeferMount;
