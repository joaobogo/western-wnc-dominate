import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";

const InspectionForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    town: "",
    issue: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="section-padding bg-background">
        <div className="container-tight max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-card border border-border rounded-lg p-8 md:p-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            >
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-heading font-bold text-foreground mb-2"
            >
              Request Received!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground"
            >
              We'll reach out within 24 hours to schedule your free inspection.
            </motion.p>
          </motion.div>
        </div>
      </section>
    );
  }

  const inputClasses = (field: string) =>
    `w-full px-4 py-3 rounded-md border bg-background text-foreground text-sm focus:outline-none transition-all duration-300 ${
      focusedField === field
        ? "border-primary ring-2 ring-primary/20 shadow-sm"
        : "border-input"
    }`;

  return (
    <section className="section-padding bg-background" id="request-inspection">
      <div className="container-tight max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4"
          >
            <Sparkles className="w-6 h-6 text-accent" />
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3"
            >
              Request Your Free Inspection
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground"
          >
            Takes 30 seconds. We respond within 24 hours.
          </motion.p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4 relative overflow-hidden"
        >
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/5 to-transparent" />

          {[
            { id: "name", label: "Full Name", type: "text", placeholder: "Your name", required: true },
            { id: "phone", label: "Phone Number", type: "tel", placeholder: "(828) 555-1234", required: true },
          ].map((field, i) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <label htmlFor={field.id} className="block text-sm font-medium text-foreground mb-1.5">{field.label}</label>
              <input
                id={field.id}
                type={field.type}
                required={field.required}
                value={(formData as any)[field.id]}
                onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                onFocus={() => setFocusedField(field.id)}
                onBlur={() => setFocusedField(null)}
                className={inputClasses(field.id)}
                placeholder={field.placeholder}
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <label htmlFor="town" className="block text-sm font-medium text-foreground mb-1.5">Your Town</label>
            <select
              id="town"
              required
              value={formData.town}
              onChange={(e) => setFormData({ ...formData, town: e.target.value })}
              onFocus={() => setFocusedField("town")}
              onBlur={() => setFocusedField(null)}
              className={inputClasses("town")}
            >
              <option value="">Select your town</option>
              <option value="highlands">Highlands</option>
              <option value="cashiers">Cashiers</option>
              <option value="franklin">Franklin</option>
              <option value="sylva">Sylva</option>
              <option value="bryson-city">Bryson City</option>
              <option value="waynesville">Waynesville</option>
              <option value="other">Other</option>
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <label htmlFor="issue" className="block text-sm font-medium text-foreground mb-1.5">Roof Issue</label>
            <select
              id="issue"
              required
              value={formData.issue}
              onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
              onFocus={() => setFocusedField("issue")}
              onBlur={() => setFocusedField(null)}
              className={inputClasses("issue")}
            >
              <option value="">What do you need?</option>
              <option value="inspection">Roof Inspection</option>
              <option value="repair">Roof Repair</option>
              <option value="replacement">Roof Replacement</option>
              <option value="storm">Storm Damage</option>
              <option value="metal">Metal Roofing</option>
              <option value="commercial">Commercial Service</option>
              <option value="other">Other</option>
            </select>
          </motion.div>

          <motion.button
            type="submit"
            className="w-full cta-gradient text-accent-foreground font-bold text-base py-4 rounded-md flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-2 relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Request Free Inspection</span>
            <ArrowRight className="w-5 h-5 relative" />
          </motion.button>
          <p className="text-center text-xs text-muted-foreground mt-2">
            No obligation. We respond within 24 hours.
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default InspectionForm;
