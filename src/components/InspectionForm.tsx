import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Shield, Clock, Phone } from "lucide-react";

const InspectionForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    town: "",
    projectType: "",
    timeline: "",
    details: "",
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-sm p-8 md:p-12"
          >
            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">We've Received Your Request</h2>
            <p className="text-muted-foreground font-body mb-1">
              A project advisor will reach out within 24 hours to discuss your goals and schedule a site visit.
            </p>
            <p className="text-muted-foreground/60 text-sm font-body">
              Need to talk sooner? Call us directly at{" "}
              <a href="tel:8283979211" className="text-primary font-semibold hover:underline">(828) 397-9211</a>.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  const inputClasses = (field: string) =>
    `w-full px-4 py-3.5 rounded-sm border bg-background text-foreground text-sm font-body placeholder:text-muted-foreground/40 focus:outline-none transition-all duration-300 ${
      focusedField === field ? "border-primary ring-2 ring-primary/15" : "border-input"
    }`;

  return (
    <section className="section-padding bg-secondary/40 tartan-bg" id="request-inspection">
      <div className="container-tight max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="eyebrow mb-3 block">Start Here</span>
          <h2 className="section-heading text-3xl md:text-4xl mb-3">Request a Project Consultation</h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Tell us what you're working with. We'll review the details, then reach out to discuss scope, timing, and next steps.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-sm p-6 md:p-8"
        >
          {/* Name + Phone row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-foreground mb-1.5 font-body uppercase tracking-wide">
                Your Name
              </label>
              <input
                id="name" type="text" required maxLength={100}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className={inputClasses("name")}
                placeholder="First & last name"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-foreground mb-1.5 font-body uppercase tracking-wide">
                Phone Number
              </label>
              <input
                id="phone" type="tel" required maxLength={20}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField(null)}
                className={inputClasses("phone")}
                placeholder="(828) 555-1234"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-xs font-semibold text-foreground mb-1.5 font-body uppercase tracking-wide">
              Email Address <span className="text-muted-foreground/50 normal-case tracking-normal font-normal">(optional)</span>
            </label>
            <input
              id="email" type="email" maxLength={255}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className={inputClasses("email")}
              placeholder="you@email.com"
            />
          </div>

          {/* Town + Project Type row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="town" className="block text-xs font-semibold text-foreground mb-1.5 font-body uppercase tracking-wide">
                Property Location
              </label>
              <select
                id="town" required value={formData.town}
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
                <option value="cherokee">Cherokee</option>
                <option value="other">Other WNC Area</option>
              </select>
            </div>
            <div>
              <label htmlFor="projectType" className="block text-xs font-semibold text-foreground mb-1.5 font-body uppercase tracking-wide">
                Project Type
              </label>
              <select
                id="projectType" required value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                onFocus={() => setFocusedField("projectType")}
                onBlur={() => setFocusedField(null)}
                className={inputClasses("projectType")}
              >
                <option value="">What are you planning?</option>
                <optgroup label="Roofing">
                  <option value="roof-assessment">Roof Assessment</option>
                  <option value="roof-repair">Roof Repair</option>
                  <option value="roof-replacement">Full Roof Replacement</option>
                  <option value="metal-roofing">Metal Roofing</option>
                  <option value="storm-damage">Storm Damage / Insurance</option>
                </optgroup>
                <optgroup label="Construction">
                  <option value="renovation">Renovation / Remodel</option>
                  <option value="addition">Addition or Expansion</option>
                  <option value="exterior">Siding & Exterior Work</option>
                  <option value="outdoor-living">Deck, Porch, or Outdoor Living</option>
                </optgroup>
                <optgroup label="Other">
                  <option value="commercial">Commercial Project</option>
                  <option value="maintenance">Maintenance Program</option>
                  <option value="not-sure">Not Sure Yet — Need Guidance</option>
                </optgroup>
              </select>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-4">
            <label htmlFor="timeline" className="block text-xs font-semibold text-foreground mb-1.5 font-body uppercase tracking-wide">
              Desired Timeline <span className="text-muted-foreground/50 normal-case tracking-normal font-normal">(optional)</span>
            </label>
            <select
              id="timeline" value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              onFocus={() => setFocusedField("timeline")}
              onBlur={() => setFocusedField(null)}
              className={inputClasses("timeline")}
            >
              <option value="">When are you looking to start?</option>
              <option value="urgent">As soon as possible</option>
              <option value="1-month">Within the next month</option>
              <option value="1-3-months">1–3 months</option>
              <option value="3-6-months">3–6 months</option>
              <option value="planning">Just planning ahead</option>
            </select>
          </div>

          {/* Details */}
          <div className="mb-6">
            <label htmlFor="details" className="block text-xs font-semibold text-foreground mb-1.5 font-body uppercase tracking-wide">
              Anything Else We Should Know? <span className="text-muted-foreground/50 normal-case tracking-normal font-normal">(optional)</span>
            </label>
            <textarea
              id="details" rows={3} maxLength={1000}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              onFocus={() => setFocusedField("details")}
              onBlur={() => setFocusedField(null)}
              className={`${inputClasses("details")} resize-none`}
              placeholder="Property details, concerns, access notes, or questions for our team…"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cta-gradient text-accent-foreground font-semibold text-base py-4 rounded-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Request a Project Consultation</span>
            <ArrowRight className="w-4 h-4 relative" />
          </button>

          {/* Trust microcopy */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-5 pt-5 border-t border-border">
            <div className="flex items-center gap-1.5 text-muted-foreground/50 text-[11px] font-body">
              <Clock className="w-3 h-3" />
              We respond within 24 hours
            </div>
            <div className="hidden sm:block w-px h-3 bg-border" />
            <div className="flex items-center gap-1.5 text-muted-foreground/50 text-[11px] font-body">
              <Shield className="w-3 h-3" />
              No obligation, no pressure
            </div>
            <div className="hidden sm:block w-px h-3 bg-border" />
            <div className="flex items-center gap-1.5 text-muted-foreground/50 text-[11px] font-body">
              <Phone className="w-3 h-3" />
              Prefer to call? <a href="tel:8283979211" className="text-primary font-semibold hover:underline">(828) 397-9211</a>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default InspectionForm;
