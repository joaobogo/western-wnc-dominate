import { motion, AnimatePresence, type Variants } from "framer-motion";
import React, { useState, useCallback } from "react";
import { CheckCircle, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import WhatHappensNext from "@/components/forms/WhatHappensNext";
import FormSavedNote from "@/components/forms/FormSavedNote";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

/* ──────────────────────────────────────
   MULTI-STEP FORM WRAPPER
   Smooth step transitions with progress
   ────────────────────────────────────── */

interface FormStep {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface MultiStepFormProps {
  steps: FormStep[];
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  draftRestored?: boolean;
  className?: string;
}

const stepVariants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export const MultiStepForm = ({
  steps,
  currentStep,
  onNext,
  onPrev,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Submit Request",
  draftRestored = false,
  className = "",
}: MultiStepFormProps) => {
  const [direction, setDirection] = useState(1);
  const isLast = currentStep === steps.length - 1;

  const handleNext = useCallback(() => { setDirection(1); onNext(); }, [onNext]);
  const handlePrev = useCallback(() => { setDirection(-1); onPrev(); }, [onPrev]);

  return (
    <div className={`interaction-quote ${className}`}>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: i === currentStep ? 1 : 0.85,
                  backgroundColor: i <= currentStep
                    ? "hsl(var(--highland-gold))"
                    : "hsl(var(--border))",
                }}
                transition={{ duration: 0.3, ease: HIGHLAND_EASE }}
                className="w-7 h-7 rounded-full flex items-center justify-center text-caption font-body font-bold"
              >
                {i < currentStep ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <CheckCircle className="w-4 h-4 text-white" />
                  </motion.div>
                ) : (
                  <span className={i <= currentStep ? "text-white" : "text-muted-foreground"}>
                    {i + 1}
                  </span>
                )}
              </motion.div>
              {i < steps.length - 1 && (
                <div className="hidden sm:block w-8 md:w-16 h-px bg-border relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[hsl(var(--highland-gold))]"
                    animate={{ width: i < currentStep ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-caption font-body font-semibold uppercase tracking-[0.1em] text-[hsl(var(--gold-ink))]">
            Step {currentStep + 1} of {steps.length}
          </p>
          <p className="text-caption text-muted-foreground font-body">{steps[currentStep].label}</p>
        </div>
      </div>

      <FormSavedNote show={draftRestored} className="mb-4" />

      {/* Step content — slide transition */}
      <div className="relative overflow-hidden min-h-[200px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: HIGHLAND_EASE }}
          >
            {steps[currentStep].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {isLast && <WhatHappensNext className="mt-8" />}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`inline-flex items-center gap-2 text-base font-body font-bold btn-ghost-interactive px-6 py-3 rounded-none ${
            currentStep === 0 ? "opacity-30 cursor-not-allowed" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={isLast ? onSubmit : handleNext}
          disabled={isSubmitting}
          className="cta-gradient text-accent-foreground font-body font-bold text-base px-10 py-4 rounded-none inline-flex items-center gap-3 btn-primary-interactive uppercase tracking-widest shadow-raised"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin relative z-10" />
              <span className="relative z-10">Submitting...</span>
            </>
          ) : (
            <>
              <span className="relative z-10">{isLast ? submitLabel : "Continue"}</span>
              <ArrowRight className="w-5 h-5 relative z-10 btn-arrow-icon" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────
   CHATBOT MESSAGE ANIMATION
   Typing indicator + staggered messages
   ────────────────────────────────────── */

interface ChatMessageProps {
  content: React.ReactNode;
  sender: "bot" | "user";
  delay?: number;
  showTyping?: boolean;
}

export const ChatMessage = ({
  content,
  sender,
  delay = 0,
  showTyping = false,
}: ChatMessageProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.35, ease: HIGHLAND_EASE }}
    className={`flex ${sender === "user" ? "justify-end" : "justify-start"} mb-3`}
  >
    <div
      className={`max-w-[85%] px-4 py-3 rounded-sm text-sm font-body leading-relaxed ${
        sender === "user"
          ? "bg-primary text-primary-foreground rounded-br-none"
          : "bg-secondary text-foreground rounded-bl-none border border-border"
      }`}
    >
      {showTyping ? <TypingIndicator /> : content}
    </div>
  </motion.div>
);

const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 py-1 px-1">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40"
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

/* ──────────────────────────────────────
   RESULT REVEAL
   Animated reveal for calculator/quiz results
   ────────────────────────────────────── */

interface ResultRevealProps {
  children: React.ReactNode;
  show: boolean;
  className?: string;
}

export const ResultReveal = ({ children, show, className = "" }: ResultRevealProps) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, height: 0, scale: 0.97 }}
        animate={{ opacity: 1, height: "auto", scale: 1 }}
        exit={{ opacity: 0, height: 0, scale: 0.97 }}
        transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
        className={`overflow-hidden ${className}`}
      >
        <motion.div
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.15, duration: 0.4, ease: HIGHLAND_EASE }}
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ──────────────────────────────────────
   CONFIRMATION STATE
   Success animation after form submission
   ────────────────────────────────────── */

interface ConfirmationStateProps {
  show: boolean;
  icon?: React.ReactNode;
  headline: string;
  message: string;
  secondaryMessage?: string;
  action?: React.ReactNode;
  className?: string;
}

export const ConfirmationState = ({
  show,
  icon,
  headline,
  message,
  secondaryMessage,
  action,
  className = "",
}: ConfirmationStateProps) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
        className={`text-center py-10 px-6 ${className}`}
      >
        {/* Icon with spring pop */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 15 }}
          className="w-16 h-16 rounded-full bg-primary/12 flex items-center justify-center mx-auto mb-5"
        >
          {icon || <CheckCircle className="w-8 h-8 text-primary" />}
        </motion.div>

        {/* Text staggers */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="text-2xl font-heading font-bold text-foreground mb-3"
        >
          {headline}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="text-muted-foreground font-body text-sm leading-relaxed max-w-md mx-auto mb-2"
        >
          {message}
        </motion.p>
        {secondaryMessage && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-muted-foreground font-body text-xs mt-3"
          >
            {secondaryMessage}
          </motion.p>
        )}
        {action && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="mt-6"
          >
            {action}
          </motion.div>
        )}

        {/* Gold accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.4, ease: HIGHLAND_EASE }}
          className="w-12 h-px bg-[hsl(var(--highland-gold)/0.3)] mx-auto mt-6"
        />
      </motion.div>
    )}
  </AnimatePresence>
);

/* ──────────────────────────────────────
   WIDGET INPUT FEEDBACK
   Subtle pulse/glow when user interacts
   ────────────────────────────────────── */

interface InputFeedbackProps {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

export const InputFeedback = ({ children, active = false, className = "" }: InputFeedbackProps) => (
  <motion.div
    animate={active ? {
      boxShadow: "0 0 0 3px hsl(var(--highland-gold) / 0.1)",
      borderColor: "hsl(var(--highland-gold) / 0.3)",
    } : {
      boxShadow: "0 0 0 0px transparent",
      borderColor: "hsl(var(--border))",
    }}
    transition={{ duration: 0.3, ease: HIGHLAND_EASE }}
    className={`border rounded-sm ${className}`}
  >
    {children}
  </motion.div>
);

/* ──────────────────────────────────────
   SCHEDULING MODULE ANIMATION
   Calendar slot selection feedback
   ────────────────────────────────────── */

interface ScheduleSlotProps {
  time: string;
  available: boolean;
  selected: boolean;
  onClick: () => void;
}

export const ScheduleSlot = ({ time, available, selected, onClick }: ScheduleSlotProps) => (
  <motion.button
    whileHover={available ? { scale: 1.03 } : undefined}
    whileTap={available ? { scale: 0.97 } : undefined}
    onClick={available ? onClick : undefined}
    className={`px-4 py-3 rounded-sm text-sm font-body font-medium transition-all duration-200 ${
      selected
        ? "bg-[hsl(var(--highland-gold))] text-white shadow-flat"
        : available
          ? "bg-card border border-border text-foreground hover:border-[hsl(var(--highland-gold)/0.3)] hover:bg-secondary/40"
          : "bg-muted/30 text-muted-foreground cursor-not-allowed"
    }`}
    disabled={!available}
  >
    {time}
    {selected && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="inline-block ml-2"
      >
        <CheckCircle className="w-3.5 h-3.5 inline" />
      </motion.div>
    )}
  </motion.button>
);
