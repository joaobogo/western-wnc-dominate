import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Action =
  | { label: string; to: string; onClick?: never }
  | { label: string; onClick: () => void; to?: never };

/**
 * Friendly empty state: says what happened in plain language and always offers
 * a next action so the screen is never a dead end.
 */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  primaryAction?: Action;
  secondaryAction?: Action;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border border-dashed border-border rounded-sm bg-card/50 px-6 py-14 text-center",
        className,
      )}
    >
      {Icon && (
        <div className="w-12 h-12 rounded-sm bg-muted flex items-center justify-center mx-auto mb-4">
          <Icon className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
        </div>
      )}
      <h3 className="font-heading font-bold text-lg text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground font-body text-sm max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          {primaryAction && <ActionButton action={primaryAction} variant="primary" />}
          {secondaryAction && <ActionButton action={secondaryAction} variant="secondary" />}
        </div>
      )}
    </div>
  );
}

function ActionButton({ action, variant }: { action: Action; variant: "primary" | "secondary" }) {
  const className = `btn btn-${variant} btn-sm`;
  if (action.to) {
    return (
      <Link to={action.to} className={className}>
        {action.label}
      </Link>
    );
  }
  return (
    <button type="button" onClick={action.onClick} className={className}>
      {action.label}
    </button>
  );
}