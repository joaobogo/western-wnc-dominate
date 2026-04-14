import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Shield, Clock, Phone, Award, MapPin } from "lucide-react";

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
      <section className="section-padding section-dark tartan-dark" id="request-inspection">
        <div className="container-tight max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 md:p-14"
          >
            <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark-section-foreground mb-3">Your Consultation Request Is In.</h2>
            <p className="text-dark-section-foreground/60 font-body mb-4 leading-relaxed">
              One of our project advisors — not a call center — will personally review your details and reach out within 24 hours to discuss your property, your goals, and the best path forward.
            </p>
            <p className="text-dark-section-foreground/40 text-sm font-body mb-1">
              You'll hear from someone who knows Western NC roofing and construction firsthand.
            </p>
            <p className="text-dark-section-foreground/30 text-xs font-body mt-4">
              Can't wait?{" "}
              <a href="tel:8283979211" className="text-[hsl(var(--highland-gold))] font-semibold hover:underline">(828) 397-9211</a>
              {" "}— we answer our own phone.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  const inputClasses = (field: string) =>
    `w-full px-4 py-3.5 rounded-sm bg-[hsl(var(--dark-section))] border text-dark-section-foreground text-sm font-body placeholder:text-dark-section-foreground/25 focus:outline-none transition-all duration-300 ${
      focusedField === field
        ? "border-[hsl(var(--highland-gold)/0.5)] ring-1 ring-[hsl(var(--highland-gold)/0.15)]"
        : "border-dark-section-foreground/10"
    }`;

  const labelClasses = "block text-[10px] font-semibold text-dark-section-foreground/50 mb-2 font-body uppercase tracking-[0.12em]";

  return (
    <section className="section-dark tartan-dark relative overflow-hidden" id="request-inspection">
      {/* Subtle gold accent line at top */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.2)] to-transparent" />

      <div className="section-padding">
        <div className="container-tight">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">

            {/* Left — editorial trust content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <span className="text-[10px] font-body font-semibold uppercase tracking-[0.15em] text-[hsl(var(--highland-gold))] mb-4 block">
                Start Your Project
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark-section-foreground mb-5 leading-[1.15]">
                Request a<br /> Project<br className="hidden lg:block" /> Consultation.
              </h2>
              <p className="text-dark-section-foreground/50 font-body text-sm leading-relaxed mb-8">
                Tell us about your property and goals. We'll review the details, then reach out to discuss scope,
                materials, timing, and next steps — no obligation, no pressure.
              </p>

              {/* Trust signals */}
              <div className="space-y-5">
                {[
                  { icon: Clock, text: "We respond within 24 hours" },
                  { icon: MapPin, text: "Serving all of Western North Carolina" },
                  { icon: Award, text: "CertainTeed Master Shingle Applicator" },
                  { icon: Shield, text: "Licensed, insured & warranty-backed" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-dark-section-foreground/5 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.6)]" />
                    </div>
                    <span className="text-dark-section-foreground/45 text-sm font-body">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Phone callout */}
              <div className="mt-8 pt-8 border-t border-dark-section-foreground/8">
                <p className="text-dark-section-foreground/30 text-xs font-body mb-2">Prefer to talk?</p>
                <a href="tel:8283979211" className="inline-flex items-center gap-2 text-dark-section-foreground font-heading font-bold text-lg hover:text-[hsl(var(--highland-gold))] transition-colors">
                  <Phone className="w-4 h-4" />
                  (828) 397-9211
                </a>
              </div>
            </motion.div>

            {/* Right — the form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="bg-dark-section-foreground/[0.03] border border-dark-section-foreground/8 rounded-sm p-6 md:p-8 lg:p-10">

                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="name" className={labelClasses}>Your Name</label>
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
                    <label htmlFor="phone" className={labelClasses}>Phone Number</label>
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
                <div className="mb-5">
                  <label htmlFor="email" className={labelClasses}>
                    Email Address <span className="text-dark-section-foreground/20 normal-case tracking-normal font-normal">— optional</span>
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

                {/* Town + Project Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="town" className={labelClasses}>Property Location</label>
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
                    <label htmlFor="projectType" className={labelClasses}>Project Type</label>
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
                <div className="mb-5">
                  <label htmlFor="timeline" className={labelClasses}>
                    Desired Timeline <span className="text-dark-section-foreground/20 normal-case tracking-normal font-normal">— optional</span>
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
                <div className="mb-8">
                  <label htmlFor="details" className={labelClasses}>
                    Additional Details <span className="text-dark-section-foreground/20 normal-case tracking-normal font-normal">— optional</span>
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
                  className="w-full cta-gradient text-accent-foreground font-heading font-bold text-base py-4 rounded-sm flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity relative overflow-hidden group tracking-wide"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Request a Project Consultation</span>
                  <ArrowRight className="w-4 h-4 relative" />
                </button>

                {/* Bottom microcopy */}
                <p className="text-center text-dark-section-foreground/25 text-[11px] font-body mt-4">
                  No obligation · No spam · Your information stays private
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InspectionForm;
