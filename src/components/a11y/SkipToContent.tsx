import type { MouseEvent } from "react";

/**
 * Skip-to-content link for keyboard and screen-reader users.
 *
 * Rendered as the first focusable element inside <Header /> so
 * pressing Tab on any page surfaces it before the nav. Visually
 * hidden until focused (WCAG 2.4.1 Bypass Blocks).
 *
 * Targets the first <main id="main-content"> in the DOM — pages own their own
 * <main id="main-content"> in this app, so we resolve it at click time rather than
 * requiring every page to set a specific id.
 */
const SkipToContent = () => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target =
      (document.getElementById("main-content") as HTMLElement | null) ||
      (document.querySelector("main") as HTMLElement | null);
    if (!target) return;
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: "start" });
  };

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-raised focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;