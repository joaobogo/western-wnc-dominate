import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Droplets, Home, CloudLightning, Building2, ArrowRight } from "lucide-react";
import Section from "@/components/layout/Section";

const intents = [
  { icon: Droplets, label: "I have a leak", detail: "Water stains, drips, or missing shingles.", to: "/roofing/roof-repair" },
  { icon: Home, label: "My roof is worn out", detail: "Aging roof, planning a full replacement.", to: "/roofing/residential" },
  { icon: CloudLightning, label: "A storm hit", detail: "Need documentation for an insurance claim.", to: "/roofing/storm-damage" },
  { icon: Building2, label: "I manage a building", detail: "Commercial, HOA, or low-slope systems.", to: "/roofing/commercial" },
];

const RoofingIntentRouter = () => (
  <Section density="compact" width="wide" className="bg-background">
    <div className="max-w-2xl mb-8">
      <span className="eyebrow mb-3 block">Start Here</span>
      <h2 className="section-heading mb-3">What Brings You to the Roof Today?</h2>
      <p className="text-muted-foreground text-body-sm font-body">
        Pick the closest match and we'll take you straight to the right page.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {intents.map((intent, i) => (
        <motion.div
          key={intent.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
        >
          <Link
            to={intent.to}
            className="group flex h-full min-h-[44px] flex-col bg-card border border-border rounded-none p-5 md:p-6 hover:border-primary/25 card-lift"
          >
            <intent.icon className="w-5 h-5 text-primary mb-4" />
            <h3 className="font-heading font-bold text-foreground text-body-sm mb-1.5 group-hover:text-primary transition-colors">
              {intent.label}
            </h3>
            <p className="text-muted-foreground text-body-xs font-body leading-relaxed mb-4">{intent.detail}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 text-caption font-body font-semibold uppercase tracking-[0.12em] text-primary group-hover:gap-2.5 transition-all">
              Go <ArrowRight className="w-4 h-4" aria-hidden="true">
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  </Section>
);

export default RoofingIntentRouter;
