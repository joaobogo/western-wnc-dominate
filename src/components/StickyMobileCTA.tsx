import { Phone, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const StickyMobileCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card/95 backdrop-blur-md border-t border-border px-4 py-3 flex gap-3">
      <a
        href="tel:8283979211"
        className="flex-1 bg-primary text-primary-foreground font-semibold text-sm py-3 rounded-md flex items-center justify-center gap-2"
      >
        <Phone className="w-4 h-4" />
        Call Now
      </a>
      <Link
        to="/request-inspection"
        className="flex-1 cta-gradient text-accent-foreground font-semibold text-sm py-3 rounded-md flex items-center justify-center gap-2"
      >
        <FileText className="w-4 h-4" />
        Free Inspection
      </Link>
    </div>
  );
};

export default StickyMobileCTA;
