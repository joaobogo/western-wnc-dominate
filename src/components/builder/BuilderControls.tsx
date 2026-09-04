import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

type Props = {
  step: number;
  total: number;
  canNext: boolean;
  submitting?: boolean;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  finalLabel?: string;
  /** When the controls sit inside a <form>, let the form's onSubmit advance the step. */
  submitButton?: boolean;
};

const BuilderControls = ({ step, total, canNext, submitting, onBack, onNext, nextLabel = "Continue", finalLabel = "Send scope brief", submitButton = false }: Props) => {
  const isLast = step === total - 1;
  return (
    <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-border/60">
      <button
        type="button"
        onClick={onBack}
        disabled={step === 0}
        className="inline-flex items-center gap-1.5 text-body-xs font-body text-muted-foreground hover:text-foreground disabled:opacity-0 disabled:pointer-events-none transition-all"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back
      </button>
      <button
        type={submitButton ? "submit" : "button"}
        onClick={submitButton ? undefined : onNext}
        disabled={!canNext || submitting}
        className="inline-flex items-center justify-center gap-2 cta-gradient text-accent-foreground font-heading font-semibold text-body-xs px-6 py-3 rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 active:scale-[0.98] transition-all min-w-[170px] sm:min-w-0"
      >

        {submitting ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : null}
        {submitting ? "Sending..." : isLast ? finalLabel : nextLabel}
        {!submitting && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
      </button>
    </div>
  );
};

export default BuilderControls;