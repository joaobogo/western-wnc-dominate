import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import FormConsent from "@/components/FormConsent";
import {
  Phone, Mail, MapPin, Clock, Shield, Award, ArrowRight, ArrowLeft,
  MessageSquare, CalendarCheck, CheckCircle, Home, HardHat,
  Wrench, CloudLightning, Building2, Layers, PlusCircle, Paintbrush,
  TreePine, Hammer, Users, Star, Handshake,
} from "lucide-react";
import { MountainContours } from "@/components/motion/BackgroundTexture";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

/* ─── Service options ─── */
const roofingServices = [
  { icon: Home, label: "Residential Roofing", value: "residential-roofing" },
  { icon: Wrench, label: "Roof Repair", value: "roof-repair" },
  { icon: CloudLightning, label: "Storm Damage", value: "storm-damage" },
  { icon: Building2, label: "Commercial Roofing", value: "commercial-roofing" },
  { icon: Layers, label: "Metal Roofing", value: "metal-roofing" },
  { icon: TreePine, label: "Specialty Roofing", value: "specialty-roofing" },
];

const constructionServices = [
  { icon: PlusCircle, label: "Home Addition", value: "home-addition" },
  { icon: Paintbrush, label: "Renovation", value: "renovation" },
  { icon: TreePine, label: "Outdoor Living", value: "outdoor-living" },
  { icon: Shield, label: "Exterior Improvements", value: "exterior-improvements" },
  { icon: Hammer, label: "Custom Project", value: "custom-project" },
];

const timelines = [
  "As soon as possible",
  "Within 1–3 months",
  "3–6 months",
  "6+ months — still planning",
  "Emergency / Storm damage",
];

const contactMethods = [
  { label: "Phone call", value: "phone" },
  { label: "Email", value: "email" },
  { label: "Text message", value: "text" },
];

const TRUST_POINTS = [
  { icon: Clock, text: "Personalized rapid response — guaranteed" },
  { icon: Shield, text: "Licensed GC · Fully insured · Warranty-backed" },
  { icon: Award, text: "CertainTeed ShingleMaster Credentialed Contractor" },
  { icon: Users, text: "In-house Highlander crews on every project" },
  { icon: Star, text: "4.9★ average across Google & Facebook" },
  { icon: MapPin, text: "Locally owned — Franklin & Sylva, NC" },
];

const OFFICES = [
  // NOTE: Franklin street address pending client confirmation — synced with Footer.
  { name: "Franklin Office", address: "1511 Highlands Road, Franklin, NC 28734", phone: "(828) 524-7773" },
  { name: "Sylva / Waynesville", address: "Service area office — by appointment, Sylva, NC 28779", phone: "(828) 524-7773" },
];

type Step = "division" | "service" | "details" | "success";

export default function Contact() {
  const [step, setStep] = useState<Step>("division");
  const [division, setDivision] = useState<"roofing" | "construction" | null>(null);
  const [service, setService] = useState("");
  const [timeline, setTimeline] = useState("");
  const [preferredContact, setPreferredContact] = useState("phone");
  const [form, setForm] = useState({ name: "", email: "", phone: "", town: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDivision = (d: "roofing" | "construction") => {
    setDivision(d);
    setService("");
    setStep("service");
  };

  const handleService = (s: string) => {
    setService(s);
    setStep("details");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setIsSubmitting(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      await supabase.from("consultation_requests").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        project_description: [
          form.town.trim() && `Project location: ${form.town.trim()}`,
          form.message.trim(),
        ].filter(Boolean).join("\n\n") || null,
        service_category: division || null,
        project_type: service || null,
        timeline: timeline || null,
        source: "contact-concierge",
        lead_score: service ? 30 : 20,
        metadata: { preferred_contact: preferredContact },
      });
      const { submitLead } = await import("@/lib/leads");
      await submitLead({
        source: "contact_form",
        lead_type: division || "general_inquiry",
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        property_town: form.town.trim() || null,
        service_category: division || null,
        project_type: service || null,
        urgency: timeline || null,
        project_description: form.message.trim() || null,
        preferred_contact_method: preferredContact || null,
      });
      setStep("success");
    } catch {
      setStep("success");
    }
    setIsSubmitting(false);
  };

  const inputClasses = "w-full px-4 py-3.5 rounded-sm border border-input bg-background text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all";
  const labelClasses = "block text-[10px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-1.5";

  return (
    <>
      <SEOHead
        title="Contact Highlander | Free Roofing & Construction Quote"
        description="Talk to Highlander Roofing & Construction in Western NC. Rapid response, free assessments, no pressure. Franklin & Sylva offices. Call (828) 524-7773."
        path="/contact"
        jsonLd={buildPageSchema({
          type: "contact",
          path: "/contact",
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Contact", url: "/contact" },
          ],
        })}
      />
      <Header />
      <main>
        {/* ── HERO — Compact utility header (unique to Contact) ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--heritage-green))] via-[hsl(var(--heritage-green)/0.88)] to-[hsl(var(--heritage-charcoal)/0.92)] pt-32 md:pt-40">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--highland-gold)/0.18),transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--highland-gold)/0.08),transparent_55%)] pointer-events-none" />
          <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-30 pointer-events-none hidden lg:block [mask-image:linear-gradient(to_left,black,transparent)]">
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600" alt="Blue Ridge Mountains" className="w-full h-full object-cover" />
          </div>

          {/* No MountainContours — clean, functional */}
          <div className="relative z-10 pt-32 md:pt-36 pb-10 md:pb-14 px-5 md:px-8 lg:px-16">
            <div className="container-tight">
              {/* Single row: headline left, contact actions right */}
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: HIGHLAND_EASE }}
                  className="max-w-2xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Handshake className="w-4 h-4 text-[hsl(var(--highland-gold)/0.9)]" />
                    <span className="text-[10px] font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--highland-gold))]">Project Concierge</span>
                  </div>
                  <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-4 leading-[0.95] tracking-tightest">
                    Start the Conversation.
                  </h1>
                  <p className="text-body-lg md:text-body-xl text-white/95 leading-relaxed max-w-lg font-medium drop-shadow-sm">
                    No call centers. No automated systems. A Highlander project advisor — not a salesperson — will personally reach out rapidly.
                  </p>
                </motion.div>

                {/* Right: direct contact cluster */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: HIGHLAND_EASE }}
                  className="flex flex-col gap-3 lg:items-end flex-shrink-0"
                >
                  <a href="tel:+18285247773" className="group flex items-center gap-3 px-6 py-3.5 bg-[hsl(var(--highland-gold)/0.1)] border border-[hsl(var(--highland-gold)/0.2)] hover:bg-[hsl(var(--highland-gold)/0.15)] transition-all">
                    <Phone className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                    <div>
                      <span className="text-base font-heading font-bold text-[hsl(var(--dark-section-foreground))] block">(828) 524-7773</span>
                      <span className="text-[10px] text-[hsl(var(--dark-section-foreground)/0.4)] font-body uppercase tracking-wider">Call Direct</span>
                    </div>
                  </a>
                  <a href="mailto:info@highlandernc.com" className="flex items-center gap-3 px-6 py-3.5 bg-[hsl(var(--dark-section-foreground)/0.04)] border border-[hsl(var(--dark-section-foreground)/0.08)] hover:border-[hsl(var(--highland-gold)/0.15)] transition-all">
                    <Mail className="w-4 h-4 text-[hsl(var(--highland-gold)/0.9)]" />
                    <span className="text-sm font-body text-[hsl(var(--dark-section-foreground)/0.6)]">info@highlandernc.com</span>
                  </a>
                </motion.div>
              </div>

              {/* "What Happens Next" as inline horizontal strip (not sidebar card) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: HIGHLAND_EASE }}
                className="mt-8 pt-6 border-t border-[hsl(var(--dark-section-foreground)/0.06)]"
              >
                <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
                  {[
                    { step: "1", title: "Tell us about your project", detail: "Service type, timeline, and details." },
                    { step: "2", title: "We assign the right advisor", detail: "Matched to your project type." },
                    { step: "3", title: "Rapid personal follow-up", detail: "A real conversation about next steps." },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <span className="text-2xl md:text-3xl font-heading font-bold text-[hsl(var(--highland-gold))] flex-shrink-0 leading-none">{item.step}</span>
                      <div>
                        <p className="text-base md:text-lg font-heading font-bold text-[hsl(var(--dark-section-foreground))] leading-snug">{item.title}</p>
                        <p className="text-sm md:text-base text-[hsl(var(--dark-section-foreground)/0.75)] font-body mt-1 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── GUIDED CONCIERGE FLOW ── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
              {/* Left: form area */}
              <div className="lg:col-span-7">
                {/* Progress indicator */}
                <div className="flex items-center flex-wrap gap-x-2 gap-y-2 mb-8">
                  {["Division", "Service", "Your Details"].map((label, i) => {
                    const stepIdx = i;
                    const currentIdx = step === "division" ? 0 : step === "service" ? 1 : step === "details" ? 2 : 3;
                    return (
                      <div key={label} className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-heading font-bold transition-colors ${
                          stepIdx <= currentIdx ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                        }`}>
                          {stepIdx < currentIdx ? <CheckCircle className="w-3.5 h-3.5" /> : stepIdx + 1}
                        </div>
                        <span className={`text-[10px] font-body font-semibold uppercase tracking-wider ${
                          stepIdx <= currentIdx ? "text-foreground" : "text-muted-foreground/50"
                        }`}>{label}</span>
                        {i < 2 && <div className="hidden sm:block w-8 h-px bg-border mx-1" />}
                      </div>
                    );
                  })}
                </div>

                {/* Step 1: Division selection */}
                {step === "division" && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
                  >
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                      What type of project are you considering?
                    </h2>
                    <p className="text-muted-foreground text-sm font-body mb-8">
                      Select the division that best matches your project so we can connect you with the right advisor.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => handleDivision("roofing")}
                        className="group text-left p-6 md:p-8 border border-border bg-card hover:border-primary/30 hover:shadow-[0_8px_30px_-8px_hsl(var(--heritage-green)/0.1)] transition-all duration-300"
                      >
                        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                          <Home className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-heading font-bold text-lg text-foreground mb-2">Roofing</h3>
                        <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4">
                          Roof replacement, repair, storm damage, metal roofing, commercial systems, and specialty installations.
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2.5 transition-all">
                          Select Roofing <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </button>
                      <button
                        onClick={() => handleDivision("construction")}
                        className="group text-left p-6 md:p-8 border border-border bg-card hover:border-[hsl(var(--highland-gold)/0.3)] hover:shadow-[0_8px_30px_-8px_hsl(var(--highland-gold)/0.1)] transition-all duration-300"
                      >
                        <div className="w-12 h-12 bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--highland-gold)/0.15)] transition-colors">
                          <HardHat className="w-6 h-6 text-[hsl(var(--highland-gold))]" />
                        </div>
                        <h3 className="font-heading font-bold text-lg text-foreground mb-2">Construction</h3>
                        <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4">
                          Home additions, renovations, outdoor living, exterior improvements, and custom construction projects.
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-[hsl(var(--highland-gold))] font-semibold text-sm group-hover:gap-2.5 transition-all">
                          Select Construction <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    </div>
                    <p className="text-muted-foreground/50 text-xs font-body mt-4 text-center">
                      Not sure? Select either option — we'll route you to the right team.
                    </p>
                  </motion.div>
                )}

                {/* Step 2: Service selection */}
                {step === "service" && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
                  >
                    <button onClick={() => setStep("division")} className="flex items-center gap-1.5 text-sm text-muted-foreground font-body mb-6 hover:text-foreground transition-colors">
                      <ArrowLeft className="w-3.5 h-3.5" /> Back to divisions
                    </button>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                      What best describes your {division === "roofing" ? "roofing" : "construction"} project?
                    </h2>
                    <p className="text-muted-foreground text-sm font-body mb-8">
                      This helps us prepare for a more productive conversation.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {(division === "roofing" ? roofingServices : constructionServices).map((s) => (
                        <button
                          key={s.value}
                          onClick={() => handleService(s.value)}
                          className={`group text-left p-4 border rounded-sm transition-all duration-200 ${
                            service === s.value
                              ? "border-primary bg-primary/5"
                              : "border-border bg-card hover:border-primary/20"
                          }`}
                        >
                          <s.icon className={`w-5 h-5 mb-2 ${
                            service === s.value ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                          } transition-colors`} />
                          <p className="font-heading font-semibold text-sm text-foreground">{s.label}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Details form */}
                {step === "details" && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
                  >
                    <button onClick={() => setStep("service")} className="flex items-center gap-1.5 text-sm text-muted-foreground font-body mb-6 hover:text-foreground transition-colors">
                      <ArrowLeft className="w-3.5 h-3.5" /> Back to services
                    </button>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                      Tell us a bit about yourself & your project.
                    </h2>
                    <p className="text-muted-foreground text-sm font-body mb-8">
                      The more detail you share, the more prepared we'll be when we reach out.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name & Email */}
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="cc-name" className={labelClasses}>Your Name *</label>
                          <input
                            id="cc-name"
                            value={form.name}
                            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                            placeholder="First & last name"
                            className={inputClasses}
                            required
                            maxLength={100}
                          />
                        </div>
                        <div>
                          <label htmlFor="cc-email" className={labelClasses}>Email *</label>
                          <input
                            id="cc-email"
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                            placeholder="you@email.com"
                            className={inputClasses}
                            required
                            maxLength={255}
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="cc-phone" className={labelClasses}>
                          Phone <span className="normal-case tracking-normal font-normal text-muted-foreground/75">— recommended</span>
                        </label>
                        <input
                          id="cc-phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                          placeholder="(828) 555-0123"
                          className={inputClasses}
                          maxLength={20}
                        />
                      </div>

                      {/* Project address or town */}
                      <div>
                        <label htmlFor="cc-town" className={labelClasses}>
                          Project Address or Town <span className="normal-case tracking-normal font-normal text-muted-foreground/75">— recommended</span>
                        </label>
                        <input
                          id="cc-town"
                          type="text"
                          value={form.town}
                          onChange={(e) => setForm((p) => ({ ...p, town: e.target.value }))}
                          placeholder="e.g. Highlands, Cashiers, Franklin, or full street address"
                          className={inputClasses}
                          maxLength={150}
                        />
                        <p className="mt-1.5 text-[11px] text-muted-foreground/60 font-body">
                          Helps us route your inquiry to the closest Highlander office and crew.
                        </p>
                      </div>

                      {/* Timeline */}
                      <div>
                        <label className={labelClasses}>Project Timeline</label>
                        <div className="flex flex-wrap gap-2">
                          {timelines.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setTimeline(t)}
                              className={`px-3.5 py-2 rounded-sm text-xs font-body font-semibold transition-all ${
                                timeline === t
                                  ? "bg-primary text-primary-foreground"
                                  : "border border-border text-muted-foreground hover:border-primary/20 hover:text-foreground"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Preferred contact */}
                      <div>
                        <label className={labelClasses}>Preferred Contact Method</label>
                        <div className="flex gap-3">
                          {contactMethods.map((m) => (
                            <button
                              key={m.value}
                              type="button"
                              onClick={() => setPreferredContact(m.value)}
                              className={`px-4 py-2.5 rounded-sm text-xs font-body font-semibold transition-all ${
                                preferredContact === m.value
                                  ? "bg-primary text-primary-foreground"
                                  : "border border-border text-muted-foreground hover:border-primary/20"
                              }`}
                            >
                              {m.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="cc-msg" className={labelClasses}>
                          Project Details <span className="normal-case tracking-normal font-normal text-muted-foreground/75">— optional</span>
                        </label>
                        <textarea
                          id="cc-msg"
                          value={form.message}
                          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                          placeholder="Tell us about your property, project goals, budget range, or anything else that would help us prepare for our conversation."
                          rows={4}
                          className={`${inputClasses} resize-none`}
                          maxLength={2000}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <p className="text-[10px] text-muted-foreground/75 font-body">
                          Personal response rapidly — guaranteed.
                        </p>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="cta-gradient text-accent-foreground font-heading font-bold text-sm px-8 py-3.5 inline-flex items-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                        >
                          {isSubmitting ? "Sending..." : "Start the Conversation"}
                          {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                        </button>
                      </div>
                      <FormConsent />
                    </form>
                  </motion.div>
                )}

                {/* Success */}
                {step === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: HIGHLAND_EASE }}
                    className="text-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 15 }}
                      className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-8 h-8 text-accent" />
                    </motion.div>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                      Your Request Has Been Received.
                    </h2>
                    <p className="text-muted-foreground font-body max-w-md mx-auto mb-6">
                      A Highlander project advisor will personally review your project details and
                      reach out rapidly. Thank you, {form.name.split(" ")[0] || "friend"}.
                    </p>
                    <div className="border border-border bg-card p-5 rounded-sm max-w-sm mx-auto text-left">
                      <p className="text-[10px] font-body font-bold uppercase tracking-wider text-muted-foreground mb-3">Your Submission</p>
                      <div className="space-y-2 text-sm font-body text-foreground">
                        <p><span className="text-muted-foreground">Division:</span> {division === "roofing" ? "Roofing" : "Construction"}</p>
                        <p><span className="text-muted-foreground">Service:</span> {service.replace(/-/g, " ")}</p>
                        {timeline && <p><span className="text-muted-foreground">Timeline:</span> {timeline}</p>}
                        <p><span className="text-muted-foreground">Preferred contact:</span> {preferredContact}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Right: trust sidebar */}
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6, ease: HIGHLAND_EASE }}
                  className="lg:sticky lg:top-28"
                >
                  {/* Trust signals */}
                  <div className="border border-border bg-card p-6 md:p-7 mb-6">
                    <h3 className="text-xs font-body font-bold uppercase tracking-[0.2em] text-muted-foreground mb-5">Why Homeowners Trust Highlander</h3>
                    <div className="space-y-4">
                      {TRUST_POINTS.map((t, i) => (
                        <motion.div
                          key={t.text}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-8 h-8 bg-accent/8 flex items-center justify-center flex-shrink-0">
                            <t.icon className="w-3.5 h-3.5 text-accent/60" />
                          </div>
                          <span className="text-sm text-foreground/70 font-body">{t.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Offices */}
                  <div className="border border-border bg-card p-6 md:p-7 mb-6">
                    <h3 className="text-xs font-body font-bold uppercase tracking-[0.2em] text-muted-foreground mb-5">Our Offices</h3>
                    <div className="space-y-5">
                      {OFFICES.map((office) => (
                        <div key={office.name} className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-accent/50 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-heading font-semibold text-foreground">{office.name}</p>
                            <p className="text-xs text-muted-foreground font-body">{office.address}</p>
                            <a href={`tel:${office.phone.replace(/[^0-9]/g, "")}`} className="text-xs text-primary font-body hover:underline">{office.phone}</a>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 pt-5 border-t border-border">
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-accent/50 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-heading font-semibold text-foreground">Office Hours</p>
                          <p className="text-xs text-muted-foreground font-body">Mon–Fri 8:00 AM – 5:00 PM</p>
                          <p className="text-xs text-accent font-body font-semibold">Same-day emergency contact</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Direct options */}
                  <div className="border border-border bg-secondary/30 p-6 md:p-7">
                    <h3 className="text-xs font-body font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Prefer to Connect Directly?</h3>
                    <div className="space-y-3">
                  <a href="tel:+18285247773" className="group flex items-center gap-3 p-3 bg-card border border-border rounded-sm hover:border-primary/20 transition-all">
                        <Phone className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-sm font-heading font-semibold text-foreground">(828) 524-7773</p>
                          <p className="text-[10px] text-muted-foreground font-body">Call — a real person answers</p>
                        </div>
                      </a>
                      <a href="mailto:info@highlandernc.com" className="group flex items-center gap-3 p-3 bg-card border border-border rounded-sm hover:border-primary/20 transition-all">
                        <Mail className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-sm font-heading font-semibold text-foreground">info@highlandernc.com</p>
                          <p className="text-[10px] text-muted-foreground font-body">Email — reply rapidly</p>
                        </div>
                      </a>
                      <Link to="/consultation" className="group flex items-center gap-3 p-3 bg-card border border-border rounded-sm hover:border-accent/20 transition-all">
                        <CalendarCheck className="w-4 h-4 text-accent" />
                        <div>
                          <p className="text-sm font-heading font-semibold text-foreground">Guided Consultation</p>
                          <p className="text-[10px] text-muted-foreground font-body">More detailed project discovery flow</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--heritage-green))] via-[hsl(var(--heritage-green)/0.92)] to-[hsl(var(--heritage-charcoal))]">
          <div className="absolute inset-0 tartan-dark opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--highland-gold)/0.08),transparent_70%)]" />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.5), hsl(var(--highland-gold) / 0))' }} />
          <div className="section-padding relative z-10">
            <div className="container-tight max-w-2xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: HIGHLAND_EASE }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-5 leading-tight tracking-tight">
                  Your Project Deserves a Real Partner.
                </h2>
                <p className="text-[hsl(var(--dark-section-foreground)/0.9)] font-body text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed font-medium">
                  Whether you're planning a new roof, a home addition, or a custom build —
                  let's talk through what's possible, what's practical, and what's right for your property.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="tel:+18285247773"
                    className="cta-gradient text-accent-foreground font-heading font-bold text-base md:text-lg px-10 py-4 inline-flex items-center gap-3 hover:opacity-95 hover:scale-[1.02] transition-all shadow-xl"
                  >
                    <Phone className="w-5 h-5" /> Call Now — (828) 524-7773
                  </a>
                </div>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-10 text-[hsl(var(--dark-section-foreground)/0.75)] text-xs md:text-sm font-body font-bold uppercase tracking-[0.12em]">
                  <span>Licensed &amp; Insured</span>
                  <span className="text-[hsl(var(--highland-gold)/0.6)]">•</span>
                  <span>CertainTeed ShingleMaster Credentialed Contractor</span>
                  <span className="text-[hsl(var(--highland-gold)/0.6)]">•</span>
                  <span>In-House Highlander Crews</span>
                </div>
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center gap-4">
                  <span className="text-[11px] font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--highland-gold))]">
                    Connect With Highlander
                  </span>
                  <p className="text-[hsl(var(--dark-section-foreground)/0.7)] text-sm md:text-base font-body max-w-md leading-relaxed">
                    Follow along for recent work, community involvement, and roofing &amp; construction insights from across Western North Carolina.
                  </p>
                  <SocialLinks variant="dark" size="md" className="justify-center" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
