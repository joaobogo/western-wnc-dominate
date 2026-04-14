import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, MessageSquare } from "lucide-react";

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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-card border border-border rounded-sm p-8 md:p-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            >
              <CheckCircle className="w-14 h-14 text-primary mx-auto mb-4" />
            </motion.div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
              Request Received
            </h2>
            <p className="text-muted-foreground">
              Our team will reach out within 24 hours to schedule your consultation and discuss next steps.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  const inputClasses = (field: string) =>
    `w-full px-4 py-3 rounded-sm border bg-background text-foreground text-sm focus:outline-none transition-all duration-300 ${
      focusedField === field
        ? "border-primary ring-2 ring-primary/20"
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
            className="w-11 h-11 rounded-sm bg-accent/10 flex items-center justify-center mx-auto mb-4"
          >
            <MessageSquare className="w-5 h-5 text-accent" />
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3"
            >
              Request a Project Consultation
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground"
          >
            Tell us about your project. We respond within 24 hours.
          </motion.p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-sm p-6 md:p-8 space-y-4"
        >
          {[
            { id: "name", label: "Full Name", type: "text", placeholder: "Your name", required: true },
            { id: "phone", label: "Phone Number", type: "tel", placeholder: "(828) 555-1234", required: true },
          ].map((field) => (
            <div key={field.id}>
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
            </div>
          ))}

          <div>
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
          </div>

          <div>
            <label htmlFor="issue" className="block text-sm font-medium text-foreground mb-1.5">Project Type</label>
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
              <option value="inspection">Roof Assessment</option>
              <option value="repair">Roof Repair</option>
              <option value="replacement">Roof Replacement</option>
              <option value="storm">Storm Damage</option>
              <option value="metal">Metal Roofing</option>
              <option value="construction">Construction / Renovation</option>
              <option value="outdoor">Outdoor Living</option>
              <option value="commercial">Commercial Service</option>
              <option value="other">Other</option>
            </select>
          </div>

          <motion.button
            type="submit"
            className="w-full cta-gradient text-accent-foreground font-bold text-base py-4 rounded-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-2 relative overflow-hidden group"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Schedule a Quote Call</span>
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