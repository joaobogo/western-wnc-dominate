import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, Phone, Shield } from "lucide-react";

interface FastLeadFormProps {
  ctaLabel: string;
  serviceLabel: string;
  urgencyOptions: string[];
}

const FastLeadForm = ({ ctaLabel, serviceLabel, urgencyOptions }: FastLeadFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    town: "",
    urgency: urgencyOptions[0] ?? "As soon as possible",
  });

  if (submitted) {
    return (
      <div className="border border-border bg-card px-6 py-7 shadow-sm rounded-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">Request received.</h3>
            <p className="text-sm text-muted-foreground font-body">A local advisor will reach out shortly.</p>
          </div>
        </div>
        <div className="space-y-3 border-t border-border pt-4 text-sm text-muted-foreground font-body">
          <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Typical response rapidly</div>
          <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> No obligation and no pressure</div>
          <a href="tel:8285247773" className="inline-flex items-center gap-2 font-semibold text-primary hover:opacity-80 transition-opacity">
            <Phone className="h-4 w-4" /> (828) 524-7773
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border bg-card px-6 py-7 shadow-sm rounded-sm">
      <div className="mb-5">
        <div className="text-[10px] font-body font-semibold uppercase tracking-[0.18em] text-primary mb-2">
          Faster Request Form
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground">Get help with {serviceLabel.toLowerCase()}.</h3>
        <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
          Four quick fields. A real local advisor follows up fast.
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <div>
          <label htmlFor={`${serviceLabel}-name`} className="mb-2 block text-[10px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Name
          </label>
          <input
            id={`${serviceLabel}-name`}
            required
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            className="w-full border border-input bg-background px-4 py-3 text-sm font-body text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
            placeholder="Your name"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${serviceLabel}-phone`} className="mb-2 block text-[10px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Phone
            </label>
            <input
              id={`${serviceLabel}-phone`}
              type="tel"
              required
              value={formData.phone}
              onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
              className="w-full border border-input bg-background px-4 py-3 text-sm font-body text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
              placeholder="(828) 555-1234"
            />
          </div>
          <div>
            <label htmlFor={`${serviceLabel}-town`} className="mb-2 block text-[10px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Town
            </label>
            <input
              id={`${serviceLabel}-town`}
              required
              value={formData.town}
              onChange={(event) => setFormData({ ...formData, town: event.target.value })}
              className="w-full border border-input bg-background px-4 py-3 text-sm font-body text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
              placeholder="Franklin, Highlands, Sylva…"
            />
          </div>
        </div>

        <div>
          <span className="mb-2 block text-[10px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Timing
          </span>
          <div className="grid gap-2 sm:grid-cols-2">
            {urgencyOptions.map((option) => {
              const selected = formData.urgency === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFormData({ ...formData, urgency: option })}
                  className={`border px-4 py-3 text-left text-sm font-body transition-colors ${selected ? "border-primary bg-primary/10 text-foreground" : "border-border bg-background text-muted-foreground hover:border-primary/40"}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 bg-primary px-5 py-3.5 font-body text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </form>

      <div className="mt-5 grid gap-3 border-t border-border pt-4 text-xs text-muted-foreground font-body sm:grid-cols-3">
        <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-primary" /> Fast follow-up</div>
        <div className="flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-primary" /> Warranty-backed work</div>
        <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-primary" /> Real local team</div>
      </div>
    </div>
  );
};

export default FastLeadForm;