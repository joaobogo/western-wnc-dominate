import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, FileText, Shield, CloudLightning, Wrench, CheckCircle } from "lucide-react";
import FormConsent from "@/components/FormConsent";
import { submitLead } from "@/lib/leads";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

interface GuideLeadMagnetProps {
  variant?: "inline" | "banner" | "popup";
  guide?: "storm" | "maintenance" | "checklist";
}

const guides = {
  storm: {
    icon: CloudLightning,
    title: "Storm Damage Guide",
    subtitle: "What Every WNC Homeowner Should Know",
    description: "Step-by-step guide to documenting storm damage, filing insurance claims, and protecting your home after severe weather in the mountains.",
    bulletPoints: ["Insurance claim documentation checklist", "What to photograph after a storm", "When to call a professional vs. DIY", "How to prevent further damage"],
    cta: "Download Free Guide",
    fileName: "WNC-Storm-Damage-Guide.pdf",
  },
  maintenance: {
    icon: Wrench,
    title: "Roof Maintenance Checklist",
    subtitle: "Seasonal Maintenance for Mountain Homes",
    description: "A printable seasonal checklist to keep your WNC roof in top shape — and avoid costly emergency repairs before they happen.",
    bulletPoints: ["Spring & fall inspection items", "Gutter maintenance schedule", "Ice dam prevention steps", "When to call a pro"],
    cta: "Get Free Checklist",
    fileName: "WNC-Roof-Maintenance-Checklist.pdf",
  },
  checklist: {
    icon: Shield,
    title: "Roof Inspection Checklist",
    subtitle: "Know What to Look For",
    description: "The same checklist our inspectors use — so you know exactly what a professional is evaluating on your roof.",
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
      submitLead({
        source: "guide_lead_magnet",
        lead_type: `guide_download:${guide}`,
        name,
        email,
        project_description: `Downloaded: ${g.title}`,
        metadata: { guide, file_name: g.fileName },
      }).catch((err) => console.error("GuideLeadMagnet submitLead failed:", err));
      setSubmitted(true);
    }
  };

  const inputClass = "w-full px-4 py-3.5 rounded-none bg-background border border-border text-foreground placeholder:text-muted-foreground/75 text-sm font-body field-premium";
  const labelClass = "block text-[10px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground/60 mb-2";

  const formContent = (
    <div>
      {submitted ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
          <motion.div
            className="w-14 h-14 rounded-full bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <CheckCircle className="w-7 h-7 text-[hsl(var(--highland-gold))]" />
          </motion.div>
          <h4 className="font-heading font-bold text-foreground text-lg mb-2">Check Your Email</h4>
          <p className="text-muted-foreground text-sm mb-5 font-body">Your {g.title} is on its way — along with a few bonus tips for WNC homeowners.</p>
          <button
            type="button"
            className="cta-gradient text-accent-foreground font-body font-bold text-base px-8 py-4 rounded-none inline-flex items-center gap-3 btn-primary-interactive uppercase tracking-widest shadow-lg"
          >
            <Download className="w-4 h-4 relative z-10" /> <span className="relative z-10">Check Your Inbox</span>
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className={labelClass}>Your Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} placeholder="First & last name" />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} placeholder="you@email.com" />
          </div>
          <button type="submit" className="w-full cta-gradient text-accent-foreground font-body font-bold text-base py-4 rounded-none flex items-center justify-center gap-3 btn-primary-interactive shadow-lg tracking-widest uppercase">
            <Download className="w-5 h-5 relative z-10" /> <span className="relative z-10">{g.cta}</span>
          </button>
          <FormConsent className="mt-2" />
        </form>
      )}
    </div>
  );

  if (variant === "banner") {
    return (
      <section className="bg-primary tartan-dark">
        <div className="container-tight px-5 py-10 md:px-8 md:py-14">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-[hsl(var(--highland-gold))] mb-3">
                <FileText className="w-4 h-4" />
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.15em]">Free Download</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-2">{g.title}</h3>
              <p className="text-primary-foreground/85 text-sm font-body mb-4">{g.description}</p>
              <ul className="space-y-1.5">
                {g.bulletPoints.map((point) => (
                  <li key={point} className="text-primary-foreground/85 text-sm flex items-center gap-2.5 font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highland-gold))] flex-shrink-0" /> {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-80 bg-card rounded-none p-6 border border-border">{formContent}</div>
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
          className="cta-gradient text-accent-foreground font-body font-bold text-base px-10 py-4.5 rounded-none inline-flex items-center gap-3 btn-primary-interactive uppercase tracking-widest shadow-xl"
        >
          <Download className="w-5 h-5 relative z-10" /> <span className="relative z-10">{g.cta}</span>
        </button>
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-[hsl(var(--heritage-charcoal)/0.5)] backdrop-blur-sm flex items-center justify-center p-5"
              onClick={() => setShowPopup(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3, ease: HIGHLAND_EASE }}
                className="bg-card rounded-none p-8 max-w-md w-full border border-border relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <div className="w-11 h-11 rounded-none bg-primary/8 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-1">{g.title}</h3>
                <p className="text-[11px] text-muted-foreground/50 font-body mb-3 uppercase tracking-wide">{g.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-4 font-body leading-relaxed">{g.description}</p>
                <ul className="space-y-1.5 mb-6">
                  {g.bulletPoints.map((point) => (
                    <li key={point} className="text-muted-foreground text-sm flex items-center gap-2.5 font-body">
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highland-gold))] flex-shrink-0" /> {point}
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
    <div className="bg-secondary border border-border rounded-none p-6 md:p-8">
      <div className="flex items-center gap-2 text-[hsl(var(--highland-gold))] mb-3">
        <Icon className="w-5 h-5" />
        <span className="text-[10px] font-body font-semibold uppercase tracking-[0.15em]">Free Download</span>
      </div>
      <h3 className="text-xl font-heading font-bold text-foreground mb-1">{g.title}</h3>
      <p className="text-sm text-muted-foreground mb-4 font-body leading-relaxed">{g.description}</p>
      <ul className="space-y-1.5 mb-6">
        {g.bulletPoints.map((point) => (
          <li key={point} className="text-muted-foreground text-sm flex items-center gap-2.5 font-body">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highland-gold))] flex-shrink-0" /> {point}
          </li>
        ))}
      </ul>
      {formContent}
    </div>
  );
};

export default GuideLeadMagnet;
