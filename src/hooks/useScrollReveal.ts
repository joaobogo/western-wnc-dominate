import { useRef, useEffect, useState, useCallback } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal({
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
  triggerOnce = true,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) observer.unobserve(el);
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
}

/** Extracts numeric value from a stat string like "500+", "4.7★", "Top 1%" */
export function parseStatValue(stat: string): { numericValue: number; prefix: string; suffix: string } {
  const match = stat.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!match) return { numericValue: 0, prefix: "", suffix: stat };
  return {
    prefix: match[1],
    numericValue: parseFloat(match[2]),
    suffix: match[3],
  };
}
