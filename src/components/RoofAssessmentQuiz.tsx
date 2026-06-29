import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck, ArrowRight, ArrowLeft, AlertTriangle, CheckCircle, XCircle, Shield } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";
import { submitLead } from "@/lib/leads";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

type QuizStep = "intro" | "q1" | "q2" | "q3" | "q4" | "q5" | "contact" | "result";

const questions: { step: QuizStep; question: string; options: { label: string; score: number }[] }[] = [
  {
    step: "q1",
    question: "How old is your current roof?",
    options: [
      { label: "Less than 10 years", score: 0 },
      { label: "10–20 years", score: 1 },
      { label: "20–30 years", score: 2 },
      { label: "Over 30 years", score: 3 },
      { label: "Not sure", score: 2 },
    ],
  },
  {
    step: "q2",
    question: "Have you noticed any leaks or water stains?",
    options: [
      { label: "No, none", score: 0 },
      { label: "Minor stain in one area", score: 1 },
      { label: "Multiple stains or recurring leak", score: 3 },
      { label: "Active leak right now", score: 4 },
    ],
  },
  {
    step: "q3",
    question: "What do your shingles look like?",
    options: [
      { label: "Good condition, laying flat", score: 0 },
      { label: "Some curling or lifting", score: 2 },
      { label: "Missing shingles in places", score: 3 },
      { label: "Widespread damage or bare spots", score: 4 },
      { label: "I have a metal roof", score: 0 },
    ],
  },
  {
    step: "q4",
    question: "Have you had storm damage in the last 2 years?",
    options: [
      { label: "No significant storms", score: 0 },
      { label: "Some wind/hail but no visible damage", score: 1 },
      { label: "Visible damage from a storm", score: 3 },
      { label: "Major storm damage (tree, large hail)", score: 4 },
    ],
  },
  {
    step: "q5",
    question: "How are your energy bills trending?",
    options: [
      { label: "Normal / stable", score: 0 },
      { label: "Slightly higher than expected", score: 1 },
      { label: "Noticeably increasing", score: 2 },
      { label: "Not sure / haven't checked", score: 1 },
    ],
  },
];

const getResult = (score: number) => {
  if (score <= 4) return { level: "good", icon: CheckCircle, color: "text-primary", bg: "bg-primary/10", title: "Your Roof Looks Good.", description: "Based on your answers, your roof appears to be in reasonable condition. We recommend an annual professional inspection to keep it that way — especially given WNC's challenging mountain climate.", cta: "Schedule Preventative Inspection" };
  if (score <= 9) return { level: "caution", icon: AlertTriangle, color: "text-accent", bg: "bg-accent/10", title: "Your Roof May Need Attention.", description: "Your answers suggest potential issues that should be evaluated by a professional. Early intervention often prevents costly full replacements — catching problems now could save thousands.", cta: "Schedule a Professional Inspection" };
  return { level: "urgent", icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", title: "Your Roof Likely Needs Replacement.", description: "Based on your answers, your roof shows signs of significant wear or damage. We strongly recommend a professional assessment to evaluate your options before conditions worsen.", cta: "Request Priority Inspection" };
};

const RoofAssessmentQuiz = () => {
  const [currentStep, setCurrentStep] = useState<QuizStep>("intro");
  const [answers, setAnswers] = useState<number[]>([]);
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [direction, setDirection] = useState(1);

  const totalScore = answers.reduce((sum, s) => sum + s, 0);
  const result = getResult(totalScore);
  const ResultIcon = result.icon;

  const stepOrder: QuizStep[] = ["intro", "q1", "q2", "q3", "q4", "q5", "contact", "result"];
  const currentIndex = stepOrder.indexOf(currentStep);
  const progress = Math.round((currentIndex / (stepOrder.length - 1)) * 100);

  const goTo = (step: QuizStep) => {
    const nextIdx = stepOrder.indexOf(step);
    setDirection(nextIdx > currentIndex ? 1 : -1);
    setCurrentStep(step);
  };

  const selectAnswer = (score: number, questionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = score;
    setAnswers(newAnswers);
    goTo(stepOrder[currentIndex + 1]);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact.name && contact.email) {
      submitLead({
        source: "roof_assessment_quiz",
        lead_type: "roof_assessment",
        name: contact.name,
        email: contact.email,
        phone: contact.phone || null,
        service_category: "roofing",
        project_description: `Quiz score ${totalScore}/19 — ${getResult(totalScore).level}`,
        urgency: getResult(totalScore).level === "urgent" ? "high" : getResult(totalScore).level === "caution" ? "medium" : "low",
        metadata: { quiz_answers: answers, quiz_score: totalScore },
      }).catch((err) => console.error("RoofAssessmentQuiz submitLead failed:", err));
      goTo("result");
    }
  };

  const currentQuestion = questions.find(q => q.step === currentStep);

  const stepVariants = {
    enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
  };

  const optionClass = "w-full text-left px-5 py-4 rounded-none border border-border hover:border-[hsl(var(--highland-gold)/0.3)] hover:bg-[hsl(var(--highland-gold)/0.03)] transition-all duration-200";
  const inputClass = "w-full px-4 py-3.5 rounded-none bg-background border border-border text-foreground placeholder:text-muted-foreground/75 text-sm font-body field-premium";
  const labelClass = "block text-[10px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground/60 mb-2";

  return (
    <section className="section-padding section-dark tartan-dark" id="roof-quiz">
      <div className="container-tight max-w-2xl">
        <div className="text-center mb-8">
          <ScrollReveal variant="fade">
            <span className="text-[10px] font-body font-semibold uppercase tracking-[0.15em] text-[hsl(var(--highland-gold))] mb-3 block">Roof Assessment Tool</span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark-section-foreground mb-3">
              Does Your Roof Need Replacement?
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.2}>
            <p className="text-dark-section-foreground/85 text-sm font-body max-w-md mx-auto">
              Five quick questions. Instant results with actionable next steps. Takes under 60 seconds.
            </p>
          </ScrollReveal>
        </div>

        {/* Progress */}
        {currentStep !== "intro" && (
          <div className="w-full h-1 bg-dark-section-foreground/8 rounded-full mb-8 overflow-hidden">
            <motion.div
              className="h-full bg-[hsl(var(--highland-gold))] rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
            />
          </div>
        )}

        <div className="bg-card border border-border rounded-none p-6 md:p-8">
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
              {currentStep === "intro" && (
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-none bg-accent/12 flex items-center justify-center mx-auto mb-5">
                    <ClipboardCheck className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">Quick Roof Health Assessment</h3>
                  <p className="text-muted-foreground mb-6 text-sm font-body max-w-md mx-auto">
                    5 questions · Under 60 seconds · Personalized results with clear recommendations.
                  </p>
                  <button
                    onClick={() => goTo("q1")}
                    className="cta-gradient text-accent-foreground font-body font-bold text-base px-10 py-4.5 rounded-none inline-flex items-center gap-3 btn-primary-interactive uppercase tracking-widest shadow-xl"
                  >
                    <span className="relative z-10">Start Assessment</span>
                    <ArrowRight className="w-5 h-5 relative z-10 btn-arrow-icon" />
                  </button>
                </div>
              )}

              {currentQuestion && (
                <div>
                  <p className="text-[10px] font-body font-semibold uppercase tracking-[0.12em] text-[hsl(var(--highland-gold)/0.6)] mb-1">
                    Question {currentIndex} of 5
                  </p>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-6">{currentQuestion.question}</h3>
                  <div className="space-y-2.5">
                    {currentQuestion.options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => selectAnswer(opt.score, currentIndex - 1)}
                        className={optionClass}
                      >
                        <span className="font-heading font-medium text-foreground text-sm">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  {currentIndex > 1 && (
                    <button onClick={() => goTo(stepOrder[currentIndex - 1])} className="mt-5 text-sm text-muted-foreground font-medium inline-flex items-center gap-1.5 hover:text-foreground transition-colors font-body">
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  )}
                </div>
              )}

              {currentStep === "contact" && (
                <div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-1">Your Results Are Ready</h3>
                  <p className="text-sm text-muted-foreground mb-6 font-body">Enter your info to see your personalized assessment and next steps.</p>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className={labelClass}>Your Name</label>
                      <input type="text" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} required className={inputClass} placeholder="First & last name" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Email</label>
                        <input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} required className={inputClass} placeholder="you@email.com" />
                      </div>
                      <div>
                        <label className={labelClass}>Phone <span className="normal-case tracking-normal font-normal text-muted-foreground/70">(optional)</span></label>
                        <input type="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className={inputClass} placeholder="(828) 555-0123" />
                      </div>
                    </div>
                    <button type="submit" className="w-full cta-gradient text-accent-foreground font-body font-bold text-base py-4 rounded-none flex items-center justify-center gap-3 btn-primary-interactive shadow-lg tracking-widest uppercase">
                      <span className="relative z-10">See My Results</span>
                      <ArrowRight className="w-5 h-5 relative z-10 btn-arrow-icon" />
                    </button>
                    <p className="text-[10px] text-muted-foreground/50 text-center font-body">No spam · Your information stays private.</p>
                  </form>
                  <button onClick={() => goTo("q5")} className="mt-5 text-sm text-muted-foreground font-medium inline-flex items-center gap-1.5 hover:text-foreground transition-colors font-body">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>
              )}

              {currentStep === "result" && (
                <div className="text-center">
                  <motion.div
                    className={`w-16 h-16 rounded-full ${result.bg} flex items-center justify-center mx-auto mb-5`}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <ResultIcon className={`w-8 h-8 ${result.color}`} />
                  </motion.div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">{result.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 font-body max-w-md mx-auto leading-relaxed">{result.description}</p>

                  <div className="bg-secondary rounded-none p-5 mb-6 border border-border">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-sm font-heading font-semibold text-foreground">Roof Health Score</span>
                      <span className={`text-sm font-heading font-bold ${result.color}`}>{totalScore}/19</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((totalScore / 19) * 100, 100)}%` }}
                        transition={{ delay: 0.3, duration: 0.8, ease: HIGHLAND_EASE }}
                        className={`h-full rounded-full ${result.level === "good" ? "bg-primary" : result.level === "caution" ? "bg-accent" : "bg-destructive"}`}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5 text-[10px] text-muted-foreground/50 font-body">
                      <span>Good</span><span>Needs Attention</span><span>Urgent</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="/consultation" className="cta-gradient text-accent-foreground font-body font-bold text-base px-10 py-4.5 rounded-none inline-flex items-center justify-center gap-3 btn-primary-interactive uppercase tracking-widest shadow-xl">
                      <span className="relative z-10">{result.cta}</span>
                      <ArrowRight className="w-5 h-5 relative z-10 btn-arrow-icon" />
                    </a>
                    <a href="tel:+18285247773" className="border border-border text-foreground font-medium px-8 py-3.5 rounded-none inline-flex items-center justify-center gap-2 hover:bg-secondary transition-colors font-body">
                      Call (828) 524-7773
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default RoofAssessmentQuiz;
