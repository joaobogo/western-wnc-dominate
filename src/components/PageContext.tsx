/**
 * One-line page orientation note rendered directly under an H1.
 * Answers "where am I?" on deep service, town, and division pages.
 * Visually quiet by design: caption size, muted token, no decoration.
 */
interface PageContextProps {
  /** e.g. "Roofing Division" or "Construction Division" */
  division: string;
  /** e.g. "Highlands, NC" or "Macon County, NC" */
  area?: string;
  /** Use "dark" when the H1 sits on a photo or dark band. */
  tone?: "light" | "dark";
  className?: string;
}

const PageContext = ({ division, area, tone = "light", className = "" }: PageContextProps) => (
  <p
    className={`text-caption font-body uppercase tracking-[0.14em] mb-4 ${
      tone === "dark" ? "text-white/70" : "text-muted-foreground"
    } ${className}`}
  >
    {division}
    {area ? <span aria-hidden="true"> · </span> : null}
    {area ? <span>Serving {area}</span> : null}
  </p>
);

export default PageContext;