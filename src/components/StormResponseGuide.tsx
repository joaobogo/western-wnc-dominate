import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CloudLightning, AlertTriangle, CheckCircle, ArrowRight, Phone,
  Camera, FileText, Shield, Droplets, Wind, TreePine, Eye,
} from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EASE = [0.22, 1, 0.36, 1] as any;

interface CheckItem {
  id: string;
  icon: typeof Eye;
  label: string;
  description: string;
  severity: "critical" | "warning" | "check";
}

const exteriorChecks: CheckItem[] = [
  { id: "missing", icon: Wind, label: "Missing or lifted shingles", description: "Look for bare patches, curled edges, or shingles in the yard", severity: "critical" },
  { id: "debris", icon: TreePine, label: "Tree limbs or debris on roof", description: "Don't remove large debris yourself — it may be holding a damaged area together", severity: "critical" },
  { id: "flashing", icon: Shield, label: "Damaged flashing", description: "Check around chimneys, vents, skylights for bent or separated metal", severity: "warning" },
  { id: "gutters", icon: Droplets, label: "Granules in gutters", description: "Heavy granule accumulation indicates shingle impact damage", severity: "warning" },
  { id: "dents", icon: Eye, label: "Dents on metal surfaces", description: "Check AC units, mailboxes, or car hoods — if they're dented, your roof may be too", severity: "check" },
  { id: "siding", icon: Eye, label: "Siding or soffit damage", description: "Cracked, broken, or missing siding pieces suggest wind damage", severity: "warning" },
];

const interiorChecks: CheckItem[] = [
  { id: "leak", icon: Droplets, label: "Active water leaks", description: "Place containers under drips and move valuables away from wet areas", severity: "critical" },
  { id: "stains", icon: Eye, label: "New ceiling or wall stains", description: "Discoloration that wasn't there before the storm indicates moisture entry", severity: "warning" },
  { id: "attic", icon: Eye, label: "Daylight in attic", description: "Check attic for visible light through the roof deck", severity: "critical" },
  { id: "odor", icon: Wind, label: "Musty smell", description: "New musty odors suggest hidden moisture intrusion", severity: "check" },
];

const StormResponseGuide = () => {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allItems = [...exteriorChecks, ...interiorChecks];
  const checkedItems = allItems.filter((i) => checked.has(i.id));
  const criticalCount = checkedItems.filter((i) => i.severity === "critical").length;
  const warningCount = checkedItems.filter((i) => i.severity === "warning").length;

  const urgency = criticalCount >= 2 ? "emergency" : criticalCount >= 1 ? "urgent" : warningCount >= 2 ? "soon" : "monitor";

  const urgencyConfig = {
    emergency: { color: "text-red-500", bg: "bg-red-500/10", label: "Emergency — Call Now", message: "You have multiple critical damage indicators. Contact us immediately for emergency response.", responseTime: "Same-day response" },
    urgent: { color: "text-amber-500", bg: "bg-amber-500/10", label: "Urgent — Schedule Within Rapids", message: "You have at least one critical indicator. Schedule a professional inspection rapidly.", responseTime: "Rapid response" },
    soon: { color: "text-[hsl(var(--highland-gold))]", bg: "bg-[hsl(var(--highland-gold)/0.1)]", label: "Schedule This Week", message: "You have warning signs that should be professionally assessed soon to prevent further damage.", responseTime: "48-hour response" },
    monitor: { color: "text-primary", bg: "bg-primary/10", label: "Monitor & Document", message: "No critical signs detected, but continue monitoring. Document anything that changes and consider a preventive inspection.", responseTime: "Scheduled at your convenience" },
  };

  const config = urgencyConfig[urgency];

  const severityStyles = {
    critical: "border-red-500/20 bg-red-500/3",
    warning: "border-amber-500/15 bg-amber-500/2",
    check: "border-border bg-card",
  };
  const severityDot = {
    critical: "bg-red-500",
    warning: "bg-amber-500",
    check: "bg-muted-foreground/30",
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-tight max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="eyebrow mb-3 block">Storm Response</span>
          <h2 className="section-heading mb-4">
            Post-Storm Damage<br className="hidden md:block" /> Assessment Guide
          </h2>
          <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
            Check each item you observe after a storm. We'll help you understand the urgency and recommended next steps — specific to WNC conditions.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div key="checklist" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}>
              {/* Exterior */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Camera className="w-4 h-4 text-primary" />
                  <h3 className="font-heading font-bold text-foreground text-sm uppercase tracking-wider">Exterior Signs</h3>
                  <span className="text-[10px] text-muted-foreground font-body">(check from ground level)</span>
                </div>
                <div className="space-y-2.5">
                  {exteriorChecks.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      className={`w-full text-left p-4 border rounded-sm transition-all ${
                        checked.has(item.id) ? severityStyles[item.severity] + " ring-1 ring-primary/10" : "border-border bg-card hover:border-primary/10"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-5 h-5 rounded-sm border flex items-center justify-center flex-shrink-0 transition-all ${
                          checked.has(item.id) ? "bg-primary border-primary" : "border-border"
                        }`}>
                          {checked.has(item.id) && <CheckCircle className="w-3.5 h-3.5 text-primary-foreground" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${severityDot[item.severity]}`} />
                            <span className="font-heading font-semibold text-foreground text-sm">{item.label}</span>
                          </div>
                          <p className="text-muted-foreground text-xs font-body mt-1 ml-3.5">{item.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interior */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4 text-primary" />
                  <h3 className="font-heading font-bold text-foreground text-sm uppercase tracking-wider">Interior Signs</h3>
                </div>
                <div className="space-y-2.5">
                  {interiorChecks.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      className={`w-full text-left p-4 border rounded-sm transition-all ${
                        checked.has(item.id) ? severityStyles[item.severity] + " ring-1 ring-primary/10" : "border-border bg-card hover:border-primary/10"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-5 h-5 rounded-sm border flex items-center justify-center flex-shrink-0 transition-all ${
                          checked.has(item.id) ? "bg-primary border-primary" : "border-border"
                        }`}>
                          {checked.has(item.id) && <CheckCircle className="w-3.5 h-3.5 text-primary-foreground" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${severityDot[item.severity]}`} />
                            <span className="font-heading font-semibold text-foreground text-sm">{item.label}</span>
                          </div>
                          <p className="text-muted-foreground text-xs font-body mt-1 ml-3.5">{item.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress + CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
                <p className="text-muted-foreground text-sm font-body">
                  {checked.size} of {allItems.length} items checked
                </p>
                <button
                  onClick={() => setShowResult(true)}
                  className="group cta-gradient text-accent-foreground font-semibold text-sm px-6 py-3.5 rounded-sm inline-flex items-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">See My Assessment</span>
                  <ArrowRight className="w-4 h-4 relative" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.97, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
              <div className="bg-card border border-border rounded-sm overflow-hidden">
                {/* Urgency Header */}
                <div className={`px-6 md:px-8 py-5 ${config.bg} border-b border-border`}>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-5 h-5 ${config.color}`} />
                    <div>
                      <span className={`font-heading font-bold text-sm ${config.color}`}>{config.label}</span>
                      <span className="block text-muted-foreground text-xs font-body">{config.responseTime}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <p className="text-foreground text-sm font-body leading-relaxed mb-6">{config.message}</p>

                  {checkedItems.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-[10px] font-body font-bold uppercase tracking-[0.15em] text-primary/60 mb-3">Issues You Identified</h4>
                      <div className="flex flex-wrap gap-2">
                        {checkedItems.map((item) => (
                          <span key={item.id} className={`inline-flex items-center gap-1.5 text-xs font-body font-medium px-3 py-1.5 rounded-sm border ${severityStyles[item.severity]}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${severityDot[item.severity]}`} />
                            {item.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Next Steps */}
                  <div className="bg-secondary/40 rounded-sm p-5 mb-6">
                    <h4 className="text-[10px] font-body font-bold uppercase tracking-[0.15em] text-primary/60 mb-3">Recommended Next Steps</h4>
                    <ol className="space-y-2.5 text-sm font-body text-muted-foreground">
                      <li className="flex items-start gap-2"><span className="w-5 h-5 bg-primary/10 text-primary text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">1</span> Document all damage with photos — exterior and interior</li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 bg-primary/10 text-primary text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">2</span> Do not make permanent repairs before insurance adjuster visits</li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 bg-primary/10 text-primary text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">3</span> Request a professional inspection — we document damage for your claim</li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 bg-primary/10 text-primary text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">4</span> File your insurance claim promptly — most policies require timely reporting</li>
                    </ol>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/roofing/storm-damage" className="group cta-gradient text-accent-foreground font-semibold text-sm px-6 py-3.5 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative">Request Storm Assessment</span>
                      <ArrowRight className="w-4 h-4 relative" />
                    </Link>
                    <a href="tel:8283979211" className="border border-border text-foreground font-medium text-sm px-6 py-3.5 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-secondary transition-all">
                      <Phone className="w-4 h-4" /> Call (828) 397-9211
                    </a>
                  </div>
                </div>
              </div>

              <button onClick={() => { setShowResult(false); }} className="mx-auto mt-6 flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
                ← Back to Checklist
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default StormResponseGuide;
