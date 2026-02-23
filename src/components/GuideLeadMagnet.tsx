import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, FileText, Shield, CloudLightning, Wrench } from "lucide-react";

interface GuideLeadMagnetProps {
  variant?: "inline" | "banner" | "popup";
  guide?: "storm" | "maintenance" | "checklist";
}

const guides = {
  storm: {
    icon: CloudLightning,
    title: "Free Storm Damage Guide",
    subtitle: "What Every WNC Homeowner Should Know",
    description: "Step-by-step guide to documenting storm damage, filing insurance claims, and protecting your home after severe weather.",
    bulletPoints: ["Insurance claim documentation checklist", "What to photograph after a storm", "When to call a professional vs. DIY", "How to prevent further damage"],
    cta: "Download Free Guide",
    fileName: "WNC-Storm-Damage-Guide.pdf",
  },
  maintenance: {
    icon: Wrench,
    title: "Free Roof Maintenance Checklist",
    subtitle: "Seasonal Maintenance for Mountain Homes",
    description: "A printable seasonal checklist to keep your WNC roof in top shape — and avoid costly emergency repairs.",
    bulletPoints: ["Spring & fall inspection items", "Gutter maintenance schedule", "Ice dam prevention steps", "When to call a pro"],
    cta: "Get Free Checklist",
    fileName: "WNC-Roof-Maintenance-Checklist.pdf",
  },
  checklist: {
    icon: Shield,
    title: "Free Roof Inspection Checklist",
    subtitle: "Know What to Look For",
    description: "The same checklist our inspectors use — so you know exactly what a professional is looking for on your roof.",
    bulletPoints: ["Exterior inspection points", "Interior/attic warning signs", "Flashing and sealant checks", "Ventilation assessment"],
    cta: "Download Checklist",
    fileName: "Professional-Roof-Inspection-Checklist.pdf",
  },
};

const GuideLeadMagnet = ({ variant = "inline", guide = "storm" }: GuideLeadMagnetProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const g = guides[guide];
  const Icon = g.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setSubmitted(true);
      // In production, this would send to your CRM/email service
      console.log("Lead captured:", { name, email, guide: g.fileName });
    }
  };

  const formContent = (
    <div>
      {submitted ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Download className="w-8 h-8 text-primary" />
          </div>
          <h4 className="font-heading font-bold text-foreground text-lg mb-2">Check Your Email!</h4>
          <p className="text-muted-foreground text-sm mb-4">Your {g.fileName} is on its way. We also sent you a few bonus tips.</p>
          <a
            href="#"
            className="cta-gradient text-accent-foreground font-semibold px-6 py-3 rounded-md inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
            onClick={(e) => e.preventDefault()}
          >
            <Download className="w-4 h-4" /> Download Now
          </a>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
          <button
            type="submit"
            className="w-full cta-gradient text-accent-foreground font-bold py-3 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> {g.cta}
          </button>
          <p className="text-xs text-muted-foreground text-center">No spam. Unsubscribe anytime.</p>
        </form>
      )}
    </div>
  );

  if (variant === "banner") {
    return (
      <section className="bg-primary">
        <div className="container-tight px-4 py-8 md:py-12 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-accent mb-2">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-semibold uppercase tracking-wider">Free Download</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-2">{g.title}</h3>
              <p className="text-primary-foreground/70 text-sm mb-4">{g.description}</p>
              <ul className="space-y-1">
                {g.bulletPoints.map((point) => (
                  <li key={point} className="text-primary-foreground/80 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" /> {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-80 bg-card rounded-lg p-6 shadow-lg">{formContent}</div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "popup") {
    return (
      <>
        <button
          onClick={() => setShowPopup(true)}
          className="cta-gradient text-accent-foreground font-semibold px-6 py-3 rounded-md inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Download className="w-4 h-4" /> {g.cta}
        </button>
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-foreground/50 flex items-center justify-center p-4"
              onClick={() => setShowPopup(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-lg p-8 max-w-md w-full shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-1">{g.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{g.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-4">{g.description}</p>
                <ul className="space-y-1 mb-6">
                  {g.bulletPoints.map((point) => (
                    <li key={point} className="text-muted-foreground text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" /> {point}
                    </li>
                  ))}
                </ul>
                {formContent}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Inline (default)
  return (
    <div className="bg-secondary border border-border rounded-lg p-6 md:p-8">
      <div className="flex items-center gap-2 text-accent mb-3">
        <Icon className="w-5 h-5" />
        <span className="text-sm font-semibold uppercase tracking-wider">Free Download</span>
      </div>
      <h3 className="text-xl font-heading font-bold text-foreground mb-1">{g.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{g.description}</p>
      <ul className="space-y-1 mb-6">
        {g.bulletPoints.map((point) => (
          <li key={point} className="text-muted-foreground text-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" /> {point}
          </li>
        ))}
      </ul>
      {formContent}
    </div>
  );
};

export default GuideLeadMagnet;
