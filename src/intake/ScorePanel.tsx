import { GRADE_COLORS, MAX, type Grade } from "./config";
import { formatCallBy } from "./business-time";
import type { ScoreResult } from "./scoring";

const BARS: { key: keyof typeof MAX; label: string }[] = [
  { key: "jobType", label: "Job type" },
  { key: "urgency", label: "Urgency" },
  { key: "authority", label: "Decision authority" },
  { key: "location", label: "Location" },
  { key: "reachability", label: "Reachability" },
];

export function GradeTile({
  grade,
  size = "lg",
}: {
  grade: Grade | null;
  size?: "lg" | "sm";
}) {
  const colors = grade ? GRADE_COLORS[grade] : { bg: "#E6E0CC", fg: "#12233A" };
  return (
    <div
      className={size === "lg" ? "hl-grade" : "hl-grade-sm"}
      style={{ background: colors.bg, color: colors.fg }}
    >
      {grade ?? "–"}
    </div>
  );
}

export function ScorePanel({ result }: { result: ScoreResult }) {
  const callBy = result.callBy ? formatCallBy(result.callBy) : null;

  return (
    <div className="hl-card p-4">
      <div className="flex items-center gap-4">
        <GradeTile grade={result.grade} />
        <div className="min-w-0">
          <div className="hl-slab text-2xl leading-none">
            {result.gated ? "—" : result.ready ? `${result.score} / 100` : "–"}
            {!result.gated && result.ready && (
              <span className="text-sm font-normal"> </span>
            )}
          </div>
          <div className="text-[14px] font-semibold mt-1">{result.headline}</div>
          {callBy && (
            <div className="text-[13px] mt-1" style={{ color: "var(--hl-green)" }}>
              Call by {callBy}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {BARS.map((b) => {
          const value = result.breakdown[b.key];
          const max = MAX[b.key];
          return (
            <div key={b.key}>
              <div className="flex justify-between text-[12.5px]">
                <span>{b.label}</span>
                <span className="tabular-nums">
                  {value}/{max}
                </span>
              </div>
              <div className="hl-bar mt-1">
                <span style={{ width: `${(value / max) * 100}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {(result.action || result.cadence) && (
        <div
          className="mt-4 rounded-[6px] p-3"
          style={{ background: "#F5F1E2", border: "1px solid var(--hl-border)" }}
        >
          <div className="hl-label mb-1">
            {result.gated ? "What to say" : "What to do"}
          </div>
          <p className="text-[14px]">{result.action}</p>
          {result.cadence && (
            <p className="text-[13px] mt-2" style={{ color: "#5b6470" }}>
              {result.cadence}
            </p>
          )}
        </div>
      )}

      {result.flags.length > 0 && (
        <div className="mt-3 space-y-2">
          {result.flags.map((f) => (
            <div key={f.id} className="hl-chip">
              {f.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function StickyScoreBar({ result }: { result: ScoreResult }) {
  const callBy = result.callBy ? formatCallBy(result.callBy) : null;
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-20 lg:hidden flex items-center gap-3 px-3 py-2"
      style={{
        background: "#FFFDF6",
        borderTop: "1px solid var(--hl-border)",
      }}
    >
      <GradeTile grade={result.grade} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="text-[14px] font-semibold leading-tight">
          {result.gated ? "—" : result.ready ? `${result.score} / 100` : "–"}
          <span className="font-normal"> · {result.headline}</span>
        </div>
        {callBy && (
          <div className="text-[12.5px] truncate" style={{ color: "var(--hl-green)" }}>
            Call by {callBy}
          </div>
        )}
      </div>
    </div>
  );
}
