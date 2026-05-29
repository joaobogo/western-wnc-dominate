import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Shield, Clock, Phone, Award, MapPin, Loader2, User, Mail, MessageSquare } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";
import SectionDivider from "@/components/SectionDivider";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

type FormStep = "info" | "project" | "details";

const stepLabels: Record<FormStep, string> = {
  info: "About You",
  project: "Your Project",
  details: "Additional Details",
};

const stepOrder: FormStep[] = ["info", "project", "details"];

const InspectionForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<FormStep>("info");
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    town: "",
    projectType: "",
    timeline: "",
    details: "",
  });

  const currentIndex = stepOrder.indexOf(currentStep);
  const progress = ((currentIndex + 1) / stepOrder.length) * 100;

  const goNext = () => {
    setDirection(1);
    setCurrentStep(stepOrder[currentIndex + 1]);
  };
  const goPrev = () => {
    setDirection(-1);
    setCurrentStep(stepOrder[currentIndex - 1]);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Track form submission
    trackEvent("form_submit", {
      label: "Inspection Request",
      elementId: "inspection-form-main",
      metadata: {
        address: formData.town,
        projectType: formData.projectType,
        timeline: formData.timeline,
      }
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const stepVariants = {
    enter: (d: number) => ({ x: d > 0 ? 48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -48 : 48, opacity: 0 }),
  };

  /* ─── Confirmation State ─── */
  if (submitted) {
    return (
      <section className="section-padding section-dark tartan-dark" id="request-inspection">
        <div className="container-tight max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: HIGHLAND_EASE }}
            className="p-10 md:p-14"
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-[hsl(var(--highland-gold)/0.12)] flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 15 }}
            >
              <CheckCircle className="w-8 h-8 text-[hsl(var(--highland-gold))]" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="text-2xl md:text-3xl font-heading font-bold text-dark-section-foreground mb-4"
            >
              Your Project Conversation Has Begun.
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.35, duration: 0.6, ease: HIGHLAND_EASE }}
              className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-6"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-dark-section-foreground/75 font-body text-base leading-relaxed mb-5 max-w-md mx-auto"
            >
              A Highlander project advisor — not a call center, not an automated system — will
              personally review your details and reach out rapidly to discuss your property,
              scope, materials, and next steps.
            </motion.p>

            {/* Trust reinforcement at confirmation */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-dark-section-foreground/[0.03] border border-dark-section-foreground/8 rounded-none p-5 mb-6 max-w-sm mx-auto"
            >
              <div className="flex flex-col gap-3">
                {[
                  { icon: User, text: "You'll speak with a local project advisor" },
                  { icon: Clock, text: "Response rapidly — guaranteed" },
                  { icon: Shield, text: "No obligation · No sales pressure" },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    className="flex items-center gap-2.5"
                  >
                    <item.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.5)] flex-shrink-0" />
                    <span className="text-dark-section-foreground/60 text-[13px] font-body font-bold">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-dark-section-foreground/40 text-[13px] font-body font-bold"
            >
              Can't wait?{" "}
              <a href="tel:8283979211" className="text-[hsl(var(--highland-gold))] font-semibold hover:underline">
                (828) 397-9211
              </a>
              {" "}— we answer our own phone.
            </motion.p>
          </motion.div>
        </div>
      </section>
    );
  }

  const inputClasses = "w-full px-5 py-5 md:py-6 rounded-none text-white text-[18px] font-body placeholder:text-white/30 field-premium-dark transition-all duration-300 focus:border-[hsl(var(--highland-gold)/0.6)] focus:ring-0 bg-white/[0.03]";
  const labelClasses = "block text-[14px] md:text-[15px] font-bold text-white/80 mb-3 font-body uppercase tracking-[0.16em]";
  const hintClasses = "text-dark-section-foreground/45 text-[12px] md:text-[13px] font-body mt-2.5 leading-relaxed";

  const canProceedStep1 = formData.name && formData.phone;
  const canProceedStep2 = formData.town && formData.projectType;

  return (
    <section className="section-dark relative overflow-hidden interaction-quote" id="request-inspection">
      <SectionDivider variant="tartan-trim" className="absolute top-0 left-0 right-0 z-20 opacity-30" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto", backgroundRepeat: "repeat" }} />
      <GoldLine width="100%" centered delay={0} duration={1.2} className="absolute top-0 left-0 right-0 z-10" />

      <div className="section-padding">
        <div className="container-tight">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">

            {/* Left — editorial trust content */}
            <div className="lg:col-span-2">
              <ScrollReveal variant="fade">
                <span className="text-[12px] font-body font-bold uppercase tracking-[0.18em] text-[hsl(var(--highland-gold))] mb-4 block">
                  Begin Your Project
                </span>
              </ScrollReveal>
              <HeadingReveal delay={0.1}>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark-section-foreground mb-5 leading-[1.15]">
                  Every Great Project<br /> Starts with a<br className="hidden lg:block" /> Conversation.
                </h2>
              </HeadingReveal>
              <ScrollReveal variant="rise-subtle" delay={0.25}>
                <p className="text-white/85 font-body text-body-lg md:text-body-xl leading-relaxed mb-10 font-bold drop-shadow-sm">
                  Share a few details about your property and what you're looking to accomplish. 
                  A Highlander advisor — someone who knows these mountains, these materials, and these 
                  building conditions — will review everything and follow up personally to discuss 
                  scope, timing, and next steps.
                </p>
              </ScrollReveal>
              <div className="space-y-5">
                {[
                  { icon: Clock, text: "Personal response rapidly — not an auto-reply" },
                  { icon: MapPin, text: "We serve every community in Western North Carolina" },
                  { icon: Award, text: "CertainTeed Master Shingle Applicator certified" },
                  { icon: Shield, text: "Licensed GC · Fully insured · Warranty-backed" },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: HIGHLAND_EASE }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-none bg-dark-section-foreground/[0.04] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.5)]" />
                    </div>
                    <span className="text-white/90 text-body font-bold text-lg">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <ScrollReveal variant="fade" delay={0.5}>
                <div className="mt-8 pt-8 border-t border-dark-section-foreground/6">
                  <p className="text-dark-section-foreground/50 text-sm font-body font-bold mb-2">Prefer to talk directly?</p>
                  <a href="tel:8283979211" className="inline-flex items-center gap-2 text-dark-section-foreground font-heading font-bold text-lg hover:text-[hsl(var(--highland-gold))] transition-colors">
                    <Phone className="w-4 h-4" />
                    (828) 397-9211
                  </a>
                  <p className="text-dark-section-foreground/40 text-[12px] font-body font-bold mt-1">We answer our own phone — always a real person.</p>
                </div>
              </ScrollReveal>
            </div>

            {/* Right — multi-step form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12, duration: 0.6, ease: HIGHLAND_EASE }}
              className="lg:col-span-3"
            >
              <div className="bg-dark-section-foreground/[0.03] border border-dark-section-foreground/8 rounded-none p-6 md:p-8 lg:p-10">
                {/* Step progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    {stepOrder.map((step, i) => (
                      <div key={step} className="flex items-center gap-2">
                        <motion.div
                          animate={{
                            scale: i === currentIndex ? 1 : 0.85,
                            backgroundColor: i <= currentIndex
                              ? "hsl(var(--highland-gold))"
                              : "hsl(var(--dark-section-foreground) / 0.1)",
                          }}
                          transition={{ duration: 0.3, ease: HIGHLAND_EASE }}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-body font-bold"
                        >
                          {i < currentIndex ? (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                              <CheckCircle className="w-4 h-4 text-white" />
                            </motion.div>
                          ) : (
                            <span className={i <= currentIndex ? "text-white" : "text-dark-section-foreground/30"}>{i + 1}</span>
                          )}
                        </motion.div>
                        {i < stepOrder.length - 1 && (
                          <div className="w-8 sm:w-12 md:w-20 h-px bg-dark-section-foreground/8 relative overflow-hidden">
                            <motion.div
                              className="absolute inset-y-0 left-0 bg-[hsl(var(--highland-gold)/0.5)]"
                              animate={{ width: i < currentIndex ? "100%" : "0%" }}
                              transition={{ duration: 0.5, ease: HIGHLAND_EASE }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-body font-bold uppercase tracking-[0.12em] text-[hsl(var(--highland-gold)/0.8)]">
                      Step {currentIndex + 1} of {stepOrder.length}
                    </p>
                    <p className="text-[12px] text-dark-section-foreground/50 font-body font-bold">{stepLabels[currentStep]}</p>
                  </div>
                </div>

                {/* Step content with slide */}
                <div className="relative overflow-hidden min-h-[240px] md:min-h-[200px]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: HIGHLAND_EASE }}
                    >
                      {currentStep === "info" && (
                        <div className="space-y-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label htmlFor="name" className={labelClasses}>Your Name</label>
                              <input
                                id="name" type="text" required maxLength={100}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={inputClasses}
                                placeholder="First & last name"
                              />
                              <p className={hintClasses}>So we know who we're speaking with.</p>
                            </div>
                            <div>
                              <label htmlFor="phone" className={labelClasses}>Best Phone Number</label>
                              <input
                                id="phone" type="tel" required maxLength={20}
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className={inputClasses}
                                placeholder="(828) 555-1234"
                              />
                              <p className={hintClasses}>We'll call — never text spam.</p>
                            </div>
                          </div>
                          <div>
                            <label htmlFor="email" className={labelClasses}>
                              Email Address <span className="text-dark-section-foreground/15 normal-case tracking-normal font-normal">— for your written proposal</span>
                            </label>
                            <input
                              id="email" type="email" maxLength={255}
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className={inputClasses}
                              placeholder="you@email.com"
                            />
                          </div>
                        </div>
                      )}

                      {currentStep === "project" && (
                        <div className="space-y-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="sm:col-span-2">
                              <label htmlFor="address" className={labelClasses}>Property Address</label>
                              <input
                                id="address" type="text" required maxLength={200}
                                value={formData.town}
                                onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                                className={inputClasses}
                                placeholder="Street, city, and state"
                              />
                              <p className={hintClasses}>So we can review the property on satellite before we call.</p>
                            </div>
                            <div>
                              <label htmlFor="projectType" className={labelClasses}>What Are You Looking to Do?</label>
                              <select
                                id="projectType" required value={formData.projectType}
                                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                className={inputClasses}
                              >
                                <option value="">Select project type</option>
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
                                  <option value="outdoor-living">Deck, Porch, or Outdoor Living</option>
                                  <option value="planning">Design & Planning Support</option>
                                  <option value="exterior">Siding & Exterior Work</option>
                                </optgroup>
                                <optgroup label="Other">
                                  <option value="commercial">Commercial Project</option>
                                  <option value="maintenance">Maintenance Program</option>
                                  <option value="not-sure">Not Sure Yet — Need Guidance</option>
                                </optgroup>
                              </select>

                            </div>
                            <div>
                              <label htmlFor="timeline" className={labelClasses}>
                                When Would You Like to Begin?
                              </label>
                              <select
                                id="timeline" value={formData.timeline}
                                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                className={inputClasses}
                              >
                                <option value="">Select timeline</option>
                                <option value="urgent">As soon as possible</option>
                                <option value="1-month">Within the next month</option>
                                <option value="1-3-months">1–3 months</option>
                                <option value="3-6-months">3–6 months</option>
                                <option value="planning">Just planning ahead</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentStep === "details" && (
                        <div className="space-y-5">
                          <div>
                            <label htmlFor="details" className={labelClasses}>
                              Tell Us About Your Project
                            </label>
                            <textarea
                              id="details" rows={4} maxLength={1000}
                              value={formData.details}
                              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                              className={`${inputClasses} resize-none`}
                              placeholder="Age of roof, property access details, specific concerns, budget expectations, or anything you'd want us to know before calling…"
                            />
                            <p className={hintClasses}>The more context you share, the more prepared we'll be for your first conversation.</p>
                          </div>

                          {/* Pre-submit trust reinforcement */}
                          <div className="bg-dark-section-foreground/[0.03] border border-dark-section-foreground/6 rounded-none p-4">
                            <p className="text-[10px] font-body font-semibold uppercase tracking-[0.1em] text-[hsl(var(--highland-gold)/0.4)] mb-3">
                              What Happens Next
                            </p>
                            <div className="space-y-2.5">
                              {[
                                "A local Highlander advisor reviews your details personally",
                                "You'll receive a call (not a text, not a robo-dial) rapidly",
                                "We'll discuss scope, materials, timeline & provide clear next steps",
                              ].map((point, i) => (
                                <div key={i} className="flex items-start gap-2.5">
                                  <div className="w-5 h-5 rounded-full bg-[hsl(var(--highland-gold)/0.08)] flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-[9px] font-heading font-bold text-[hsl(var(--highland-gold)/0.6)]">{i + 1}</span>
                                  </div>
                                  <span className="text-dark-section-foreground/35 text-xs font-body leading-relaxed">{point}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-dark-section-foreground/6">
                  <button
                    onClick={goPrev}
                    disabled={currentIndex === 0}
                    className={`inline-flex items-center gap-2 text-sm font-body font-medium px-4 py-2.5 rounded-none transition-all ${
                      currentIndex === 0
                        ? "opacity-0 cursor-default"
                        : "text-dark-section-foreground/40 hover:text-dark-section-foreground/60"
                    }`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>

                  {currentIndex < stepOrder.length - 1 ? (
                    <button
                      onClick={goNext}
                      disabled={currentIndex === 0 ? !canProceedStep1 : !canProceedStep2}
                      className="cta-gradient text-accent-foreground font-body font-bold text-base px-10 py-4 rounded-none inline-flex items-center gap-3 btn-primary-interactive tracking-[0.1em] uppercase shadow-lg disabled:opacity-50"
                    >
                      <span className="relative z-10">Continue</span>
                      <ArrowRight className="w-3.5 h-3.5 relative z-10 btn-arrow-icon" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="cta-gradient text-accent-foreground font-heading font-bold text-sm px-8 py-3.5 md:px-10 md:py-4 rounded-none inline-flex items-center gap-2.5 btn-primary-interactive tracking-wide disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin relative z-10" />
                          <span className="relative z-10">Sending...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">Start a Project Conversation</span>
                          <ArrowRight className="w-4 h-4 relative z-10 btn-arrow-icon" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Bottom microcopy */}
                <p className="text-center text-dark-section-foreground/20 text-[10px] font-body mt-5 tracking-wide">
                  No obligation · No sales pressure · Your information stays private
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InspectionForm;
