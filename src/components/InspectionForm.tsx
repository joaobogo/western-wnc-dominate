import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

const InspectionForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    town: "",
    issue: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="section-padding bg-background">
        <div className="container-tight max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-lg p-8 md:p-12"
          >
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Request Received!</h2>
            <p className="text-muted-foreground">
              We'll reach out within 24 hours to schedule your free inspection.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-background" id="request-inspection">
      <div className="container-tight max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            Request Your Free Inspection
          </h2>
          <p className="text-muted-foreground">
            Takes 30 seconds. We respond within 24 hours.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
            <input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="(828) 555-1234"
            />
          </div>
          <div>
            <label htmlFor="town" className="block text-sm font-medium text-foreground mb-1.5">Your Town</label>
            <select
              id="town"
              required
              value={formData.town}
              onChange={(e) => setFormData({ ...formData, town: e.target.value })}
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
            <label htmlFor="issue" className="block text-sm font-medium text-foreground mb-1.5">Roof Issue</label>
            <select
              id="issue"
              required
              value={formData.issue}
              onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
          </div>
          <button
            type="submit"
            className="w-full cta-gradient text-accent-foreground font-bold text-base py-4 rounded-md flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-2"
          >
            Request Free Inspection
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-center text-xs text-muted-foreground mt-2">
            No obligation. We respond within 24 hours.
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default InspectionForm;
