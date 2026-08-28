/**
 * User-intent gate for third-party JavaScript.
 *
 * Performance budget: ≤150 KB of third-party JS may be transferred before the
 * visitor's first interaction (enforced in CI by scripts/lhci-gate.mjs). GTM
 * stays on initial load — everything heavier (RealWork Labs + the Google Maps
 * JS API it depends on, the VELUX embed, the chatbot) waits for one of:
 *
 *   • a scroll past the hero (or 400 px on pages without one)
 *   • any click / keypress / touch
 *   • 5 s of idle time after load
 *
 * The same gate is mirrored in index.html for the loaders that live there, so
 * both entry points share one definition of "intent".
 */

type Cb = () => void;

const queue: Cb[] = [];
let fired = false;
let armed = false;

function flush() {
  if (fired) return;
  fired = true;
  const w = window as Window & { __hlUserIntent?: boolean };
  w.__hlUserIntent = true;
  while (queue.length) {
    const cb = queue.shift();
    try {
      cb?.();
    } catch {
      /* a vendor loader must never break the page */
    }
  }
}

function heroBottom(): number {
  const hero = document.querySelector<HTMLElement>("[data-hero], [data-hero-anchored], #hero");
  if (hero) return hero.getBoundingClientRect().height;
  return Math.min(400, window.innerHeight * 0.6);
}

function arm() {
  if (armed) return;
  armed = true;

  const events: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "touchstart"];
  const onIntent = () => {
    cleanup();
    flush();
  };
  const onScroll = () => {
    if (window.scrollY > heroBottom() * 0.6) onIntent();
  };

  const cleanup = () => {
    events.forEach((e) => window.removeEventListener(e, onIntent));
    window.removeEventListener("scroll", onScroll);
    if (timer) window.clearTimeout(timer);
  };

  events.forEach((e) => window.addEventListener(e, onIntent, { once: true, passive: true }));
  window.addEventListener("scroll", onScroll, { passive: true });

  // Idle fallback: 5 s after load, and only when the browser is actually idle.
  let timer: number | undefined;
  const startTimer = () => {
    timer = window.setTimeout(() => {
      const ric = (window as unknown as {
        requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void;
      }).requestIdleCallback;
      if (ric) ric(() => onIntent(), { timeout: 2000 });
      else onIntent();
    }, 5000);
  };
  if (document.readyState === "complete") startTimer();
  else window.addEventListener("load", startTimer, { once: true });
}

/** Run `cb` on the first sign of user intent (or after the idle fallback). */
export function onUserIntent(cb: Cb) {
  if (typeof window === "undefined") return;
  const w = window as Window & {
    __hlUserIntent?: boolean;
    __hlOnUserIntent?: (fn: Cb) => void;
  };
  // Prefer the gate installed in index.html so both entry points agree on
  // what counts as intent (and only one set of listeners is ever attached).
  if (typeof w.__hlOnUserIntent === "function") {
    w.__hlOnUserIntent(cb);
    return;
  }
  if (fired || w.__hlUserIntent) {
    cb();
    return;
  }
  queue.push(cb);
  arm();
}

/** True once the visitor has shown intent. */
export function hasUserIntent(): boolean {
  if (typeof window === "undefined") return false;
  return fired || !!(window as Window & { __hlUserIntent?: boolean }).__hlUserIntent;
}
