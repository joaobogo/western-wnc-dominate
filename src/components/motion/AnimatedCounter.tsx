import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

/** 
 * Animates a stat value (e.g. "500+", "4.7★", "40+") by counting up from 0.
 * Triggers on scroll into view. 
 */
const AnimatedCounter = ({ value, className = "", duration = 1500 }: AnimatedCounterProps) => {
  const { ref, isInView } = useScrollReveal({ threshold: 0.5 });
  const [displayValue, setDisplayValue] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    // Parse numeric portion
    const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1];
    const target = parseFloat(match[2]);
    const suffix = match[3];
    const isFloat = match[2].includes(".");
    const startTime = performance.now();

    const animate = (now: number) => {
      // rAF can hand back a frame timestamp from just before startTime. A
      // negative elapsed made the eased value negative: the home page showed
      // "-16.3★ Google Rating" (John's construction plan, 21 Nov). Clamp to 0–1.
      const elapsed = now - startTime;
      const progress = Math.min(Math.max(elapsed / duration, 0), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      if (isFloat) {
        setDisplayValue(`${prefix}${current.toFixed(1)}${suffix}`);
      } else {
        setDisplayValue(`${prefix}${Math.floor(current)}${suffix}`);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    // data-final: the prerender writes this value into the snapshot, so a page
    // is never delivered with a number caught mid-count (FAQ shipped "91"
    // Google reviews for 178) and the first client render matches it.
    <span ref={ref as React.RefObject<HTMLSpanElement>} data-final={value} className={`tabular-nums ${className}`}>
      {displayValue}
    </span>
  );
};

export default AnimatedCounter;
