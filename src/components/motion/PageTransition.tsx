import { motion } from "framer-motion";
import { ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

/**
 * Page transition wrapper — wraps page content for route transitions.
 * Uses a subtle rise + fade, not a heavy wipe, to stay fast and usable.
 */
interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const PageTransition = ({ children, className = "" }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.4,
        ease: HIGHLAND_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
