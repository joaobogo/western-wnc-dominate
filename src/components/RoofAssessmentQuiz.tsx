import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, ArrowRight, ArrowLeft, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

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
  if (score <= 4) return { level: "good", icon: CheckCircle, color: "text-primary", title: "Your Roof Looks Good!", description: "Based on your answers, your roof appears to be in reasonable condition. We recommend an annual inspection to keep it that way — especially in WNC's challenging climate.", cta: "Schedule Preventative Inspection" };
  if (score <= 9) return { level: "caution", icon: AlertTriangle, color: "text-accent", title: "Your Roof May Need Attention", description: "Your answers suggest some potential issues that should be evaluated by a professional. Early intervention often prevents costly full replacements.", cta: "Schedule Free Inspection" };
  return { level: "urgent", icon: XCircle, color: "text-destructive", title: "Your Roof Likely Needs Replacement", description: "Based on your answers, your roof shows signs of significant wear or damage. We strongly recommend a professional inspection to assess your options before problems worsen.", cta: "Request Urgent Inspection" };
};

const RoofAssessmentQuiz = () => {
  const [currentStep, setCurrentStep] = useState<QuizStep>("intro");
  const [answers, setAnswers] = useState<number[]>([]);
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });

  const totalScore = answers.reduce((sum, s) => sum + s, 0);
  const result = getResult(totalScore);
  const ResultIcon = result.icon;

  const stepOrder: QuizStep[] = ["intro", "q1", "q2", "q3", "q4", "q5", "contact", "result"];
  const currentIndex = stepOrder.indexOf(currentStep);
  const progress = Math.round((currentIndex / (stepOrder.length - 1)) * 100);

  const selectAnswer = (score: number, questionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = score;
    setAnswers(newAnswers);
    const nextStep = stepOrder[currentIndex + 1];
    setCurrentStep(nextStep);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact.name && contact.email) {
      console.log("Quiz lead:", { ...contact, score: totalScore, result: result.level });
      setCurrentStep("result");
    }
  };

  const currentQuestion = questions.find(q => q.step === currentStep);

  return (
    <section className="section-padding section-dark" id="roof-quiz">
      <div className="container-tight max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <ClipboardCheck className="w-7 h-7 text-accent" />
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2">Does Your Roof Need Replacement?</h2>
          <p className="text-dark-section-foreground/70">Take this 60-second quiz to find out. Get personalized recommendations based on your roof's condition.</p>
        </motion.div>

        {/* Progress */}
        {currentStep !== "intro" && (
          <div className="w-full h-2 bg-dark-section-foreground/10 rounded-full mb-8 overflow-hidden">
            <motion.div className="h-full bg-accent rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
          </div>
        )}

        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          {currentStep === "intro" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <h3 className="text-xl font-heading font-bold text-foreground mb-4">Quick Roof Health Assessment</h3>
              <p className="text-muted-foreground mb-6">5 simple questions · Takes under 60 seconds · Get instant results with actionable next steps.</p>
              <button
                onClick={() => setCurrentStep("q1")}
                className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-md inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                Start Assessment <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {currentQuestion && (
            <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Question {currentIndex} of 5</p>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-6">{currentQuestion.question}</h3>
              <div className="space-y-3">
                {currentQuestion.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => selectAnswer(opt.score, currentIndex - 1)}
                    className="w-full text-left px-5 py-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/50 transition-all"
                  >
                    <span className="font-medium text-foreground">{opt.label}</span>
                  </button>
                ))}
              </div>
              {currentIndex > 1 && (
                <button onClick={() => setCurrentStep(stepOrder[currentIndex - 1])} className="mt-4 text-sm text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              )}
            </motion.div>
          )}

          {currentStep === "contact" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-1">Your Results Are Ready!</h3>
              <p className="text-sm text-muted-foreground mb-6">Enter your info to see your personalized assessment and receive a detailed report by email.</p>
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <input type="text" placeholder="Your Name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} required className="w-full px-4 py-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                <input type="email" placeholder="Your Email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} required className="w-full px-4 py-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                <input type="tel" placeholder="Your Phone (optional)" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className="w-full px-4 py-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                <button type="submit" className="w-full cta-gradient text-accent-foreground font-bold py-3 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  See My Results <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-muted-foreground text-center">No spam. Your info stays private.</p>
              </form>
              <button onClick={() => setCurrentStep("q5")} className="mt-4 text-sm text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            </motion.div>
          )}

          {currentStep === "result" && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${result.level === "good" ? "bg-primary/10" : result.level === "caution" ? "bg-accent/10" : "bg-destructive/10"}`}>
                <ResultIcon className={`w-8 h-8 ${result.color}`} />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">{result.title}</h3>
              <p className="text-muted-foreground mb-6">{result.description}</p>

              <div className="bg-secondary rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Your Roof Health Score</span>
                  <span className={`text-sm font-bold ${result.color}`}>{totalScore}/19</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${result.level === "good" ? "bg-primary" : result.level === "caution" ? "bg-accent" : "bg-destructive"}`}
                    style={{ width: `${Math.min((totalScore / 19) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Good</span><span>Needs Attention</span><span>Urgent</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/request-inspection" className="cta-gradient text-accent-foreground font-bold px-8 py-3 rounded-md inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  {result.cta} <ArrowRight className="w-4 h-4" />
                </a>
                <a href="tel:8283979211" className="border border-border text-foreground font-semibold px-8 py-3 rounded-md inline-flex items-center justify-center gap-2 hover:bg-muted transition-colors">
                  Call (828) 397-9211
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RoofAssessmentQuiz;
