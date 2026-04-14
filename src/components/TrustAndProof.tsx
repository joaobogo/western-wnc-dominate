import { motion } from "framer-motion";
import { Shield, Award, FileCheck, BadgeCheck, Handshake } from "lucide-react";

const certifications = [
  { icon: Award, label: "CertainTeed", detail: "Master Shingle Applicator" },
  { icon: Shield, label: "Licensed GC", detail: "State of North Carolina" },
  { icon: BadgeCheck, label: "Fully Insured", detail: "Liability & Workers' Comp" },
  { icon: FileCheck, label: "Warranty-Backed", detail: "Labor & Material Coverage" },
];

const processPoints = [
  "Written scope of work before any project begins",
  "Photo documentation at every phase",
  "Daily progress communication",
  "Final walkthrough with warranty package delivery",
];

const TrustAndProof = () => {
  return (
    <section className="section-padding bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-[hsl(var(--highland-gold)/0.25)]" />

      <div className="container-tight">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-16"
        >
          <span className="eyebrow mb-3 block">Credentials & Accountability</span>
          <h2 className="section-heading mb-4">
            Verified. Certified.<br className="hidden md:block" /> Warranty-Backed.
          </h2>
          <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
            Every claim we make is documented, certified, or backed by a warranty you can hold in your hands.
          </p>
        </motion.div>

        {/* Certifications row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14 md:mb-16"
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group text-center p-5 md:p-6 bg-card border border-border rounded-sm hover:border-[hsl(var(--highland-gold)/0.2)] card-lift"
            >
              <div className="w-11 h-11 rounded-sm bg-primary/8 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/12 transition-colors">
                <cert.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-sm text-foreground mb-0.5">{cert.label}</h3>
              <p className="text-[11px] text-muted-foreground font-body tracking-wide">{cert.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Process promise — single card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-card border border-border rounded-sm p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.08)] flex items-center justify-center">
              <Handshake className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-base text-foreground mb-0.5">Our Promise</h3>
              <p className="text-[11px] text-muted-foreground font-body tracking-wide">Documented on every project</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {processPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-sm bg-primary/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] font-heading font-bold text-primary">{i + 1}</span>
                </div>
                <span className="text-foreground/70 text-sm font-body leading-relaxed">{point}</span>
              </motion.div>
            ))}
          </div>

          {/* Warranty highlight */}
          <div className="bg-secondary rounded-sm p-4 md:p-5 border border-border/60">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[hsl(var(--highland-gold))] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-semibold text-sm text-foreground mb-1">
                  Warranty Package Included
                </h4>
                <p className="text-[13px] text-muted-foreground font-body leading-relaxed">
                  Every completed project includes manufacturer material warranty plus
                  Highlander's labor warranty, delivered at your final walkthrough.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustAndProof;
