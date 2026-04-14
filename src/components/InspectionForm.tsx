import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, MessageSquare } from "lucide-react";

const InspectionForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", town: "", issue: "" });
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-sm p-8 md:p-12"
          >
            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Request Received</h2>
            <p className="text-muted-foreground font-body">
              Our team will reach out within 24 hours to schedule your consultation.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  const inputClasses = (field: string) =>
    `w-full px-4 py-3 rounded-sm border bg-background text-foreground text-sm font-body focus:outline-none transition-all duration-300 ${
      focusedField === field ? "border-primary ring-2 ring-primary/15" : "border-input"
    }`;

  return (
    <section className="section-padding bg-background tartan-bg" id="request-inspection">
      <div className="container-tight max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-5 h-5 text-accent" />
          </div>
          <h2 className="section-heading text-3xl md:text-4xl mb-3">Request a Project Consultation</h2>
          <p className="text-muted-foreground font-body">Tell us about your project. We respond within 24 hours.</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="card-premium p-6 md:p-8 space-y-4"
        >
          {[
            { id: "name", label: "Full Name", type: "text", placeholder: "Your name" },
            { id: "phone", label: "Phone Number", type: "tel", placeholder: "(828) 555-1234" },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-medium text-foreground mb-1.5 font-body">{field.label}</label>
              <input
                id={field.id} type={field.type} required
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
            <label htmlFor="town" className="block text-sm font-medium text-foreground mb-1.5 font-body">Your Town</label>
            <select id="town" required value={formData.town}
              onChange={(e) => setFormData({ ...formData, town: e.target.value })}
              onFocus={() => setFocusedField("town")} onBlur={() => setFocusedField(null)}
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
            <label htmlFor="issue" className="block text-sm font-medium text-foreground mb-1.5 font-body">Project Type</label>
            <select id="issue" required value={formData.issue}
              onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
              onFocus={() => setFocusedField("issue")} onBlur={() => setFocusedField(null)}
              className={inputClasses("issue")}
            >
              <option value="">What do you need?</option>
              <option value="assessment">Roof Assessment</option>
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

          <button
            type="submit"
            className="w-full cta-gradient text-accent-foreground font-semibold text-base py-4 rounded-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-2 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Schedule a Quote Call</span>
            <ArrowRight className="w-4 h-4 relative" />
          </button>
          <p className="text-center text-xs text-muted-foreground mt-2 font-body">No obligation. We respond within 24 hours.</p>
        </motion.form>
      </div>
    </section>
  );
};

export default InspectionForm;