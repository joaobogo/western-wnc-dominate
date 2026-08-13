import { useEffect, useState, type ReactNode } from "react";

interface DeferMountProps {
  children: ReactNode;
  /** Fallback delay (ms) if the visitor never interacts. */
  idleDelay?: number;
}

/**
 * Defers mounting non-critical UI (chat, marketing widgets) until the visitor
 * interacts or the browser goes idle. Keeps their JS off the critical path so
 * LCP is decided by the hero, not by a support widget (Prompt 41).
 */
const DeferMount = ({ children, idleDelay = 3500 }: DeferMountProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;
    let timer: number | undefined;
    const go = () => setReady(true);
    const events: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));

    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
      .requestIdleCallback;
    if (ric) ric(go, { timeout: idleDelay });
    else timer = window.setTimeout(go, idleDelay);

    return () => {
      events.forEach((e) => window.removeEventListener(e, go));
      if (timer) window.clearTimeout(timer);
    };
  }, [ready, idleDelay]);

  return ready ? <>{children}</> : null;
};

export default DeferMount;
