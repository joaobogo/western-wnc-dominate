import { Camera, FileText, Users, ClipboardCheck } from "lucide-react";

interface InsuranceDocHelpProps {
  /** Roof repair page wording; storm damage keeps the default. */
  variant?: "repair";
}

const items = [
  {
    icon: Camera,
    title: "Photo documentation",
    body: "Dated close-ups and wide shots of every damaged area, plus interior evidence, organized into one file you can forward to your adjuster.",
  },
  {
    icon: FileText,
    title: "Written scope of loss",
    body: "A line-item scope describing what failed, what it will take to repair it correctly, and the materials specified for your roof.",
  },
  {
    icon: Users,
    title: "Adjuster meetings",
    body: "We can be on the roof with your adjuster so the damage is reviewed the same way by both sides — fewer surprises in the settlement.",
  },
  {
    icon: ClipboardCheck,
    title: "Honest claim guidance",
    body: "If the damage is below your deductible, we say so. We never advise filing a claim that isn't in your interest.",
  },
];

const repairItems = items.map((it) => it.title === "Photo documentation"
  ? { ...it, body: "Dated close-ups and wide shots of all roof damage, plus interior evidence, organized into one file you can forward to your adjuster." }
  : it.title === "Written scope of loss"
  ? { ...it, body: "A line-item scope describing what failed, what it will take to fix it correctly, and the roofing material it calls for." }
  : it);

const InsuranceDocHelp = ({ variant }: InsuranceDocHelpProps) => {
  const isRepair = variant === "repair";
  const list = isRepair ? repairItems : items;
  return (
  <section className="section-padding bg-background">
    <div className="container-tight max-w-4xl">
      <div className="mb-8 md:mb-10 max-w-2xl">
        <span className="eyebrow mb-3 block">Insurance Documentation</span>
        <h2 className="section-heading mb-3">{isRepair ? "We Document Storm Damage So Your Claim Isn't Guesswork." : "We Document It So Your Claim Isn't Guesswork."}</h2>
        <p className="text-muted-foreground text-body-sm md:text-base font-body leading-relaxed">
          Most denied or underpaid claims come down to thin documentation. We handle the paperwork
          side of {isRepair ? "insurance claims" : "a damage claim"} as carefully as the roof work itself. We are not adjusters and we
          don't decide your claim — we give you and your insurer the same clear evidence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {list.map((it) => (
          <div key={it.title} className="bg-card border border-border p-5 md:p-6">
            <it.icon className="w-5 h-5 text-primary mb-3" />
            <h3 className="font-heading font-bold text-foreground text-body-sm mb-1.5">{it.title}</h3>
            <p className="text-muted-foreground text-body-xs md:text-sm leading-relaxed font-body">
              {it.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default InsuranceDocHelp;