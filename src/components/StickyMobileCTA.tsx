import { Phone, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const StickyMobileCTA = () => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.5, duration: 0.5, type: "spring", stiffness: 200 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card/95 backdrop-blur-md border-t border-border px-4 py-3 flex gap-3"
    >
      <a
        href="tel:8283979211"
        className="flex-1 bg-primary text-primary-foreground font-semibold text-sm py-3 rounded-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
      >
        <Phone className="w-4 h-4" />
        Call Us
      </a>
      <Link
        to="/request-inspection"
        className="flex-1 cta-gradient text-accent-foreground font-semibold text-sm py-3 rounded-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
      >
        <MessageSquare className="w-4 h-4" />
        Get a Quote
      </Link>
    </motion.div>
  );
};

export default StickyMobileCTA;