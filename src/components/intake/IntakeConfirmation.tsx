import { motion } from "framer-motion";
import { CheckCircle, Phone, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  body: string;
  nextStepsTitle?: string;
  nextSteps?: string[];
};

const IntakeConfirmation = ({ title, body, nextStepsTitle = "What happens next", nextSteps }: Props) => {
  const steps = nextSteps ?? [
    "A project advisor reviews your details — usually as soon as possible.",
    "We confirm scope and schedule an on-site assessment at your property.",
    "You receive a written, itemized proposal with materials, scope, and warranty terms.",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-center py-6 relative overflow-hidden"
    >
      {/* Subtle Heritage Watermark */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.03] pointer-events-none rotate-12" 
        style={{ 
          backgroundImage: "url('/tartan.png')",
          backgroundSize: "160px auto",
          backgroundRepeat: "repeat"
        }} 
      />
      <div className="w-14 h-14 rounded-full bg-[hsl(var(--highland-gold)/0.12)] flex items-center justify-center mx-auto mb-5">
        <CheckCircle className="w-7 h-7 text-[hsl(var(--highland-gold))]" />
      </div>
      <h2 className="text-2xl md:text-[28px] font-heading font-bold text-foreground mb-3 tracking-tight">
        {title}
      </h2>
      <p className="text-foreground/65 text-[14.5px] font-body leading-relaxed max-w-md mx-auto mb-8">
        {body}
      </p>

      <div className="text-left bg-background border border-border rounded-md p-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
          <h3 className="text-[12px] font-body font-bold uppercase tracking-[0.2em] text-foreground/70">
            {nextStepsTitle}
          </h3>
        </div>
        <ol className="space-y-3">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-3 text-[13.5px] font-body text-foreground/75 leading-relaxed">
              <span className="text-[hsl(var(--highland-gold))] font-heading font-bold flex-shrink-0">{i + 1}.</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="tel:8285247773"
          className="inline-flex items-center gap-2 bg-background border border-border text-foreground font-heading font-semibold text-[13.5px] px-6 py-3 rounded-md hover:border-[hsl(var(--highland-gold))] transition-colors"
        >
          <Phone className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
          (828) 524-7773
        </a>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground font-body text-[13.5px] transition-colors"
        >
          Return home <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
};

export default IntakeConfirmation;