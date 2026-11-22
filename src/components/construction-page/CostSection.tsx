import { Link } from "react-router-dom";
import type { CostRange } from "@/content/construction/types";

/**
 * Cost table (plan §3.2.6). Renders nothing until Luke-approved ranges are
 * filled in: no range, no section. The financing line links to /financing.
 */
const CostSection = ({ heading, ranges, factors }: { heading: string; ranges: CostRange[]; factors: string[] }) => {
  const approved = ranges.filter((r) => r.range.trim() && !/TODO/i.test(r.range));
  if (!approved.length) return null;
  return (
    <section className="section-padding bg-secondary/40" aria-labelledby="cost-heading">
      <div className="container-tight grid gap-8 md:grid-cols-2">
        <div>
          <h2 id="cost-heading" className="section-heading">{heading}</h2>
          <table className="mt-6 w-full border-collapse font-body text-body-sm">
            <tbody>
              {approved.map((r) => (
                <tr key={r.label} className="border-b border-border">
                  <th scope="row" className="py-3 pr-4 text-left font-semibold text-foreground">{r.label}</th>
                  <td className="py-3 text-right text-foreground">{r.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 font-body text-body-sm text-muted-foreground">
            Financing may be available, subject to credit approval.{" "}
            <Link to="/financing" className="font-semibold text-primary underline-offset-4 hover:underline">See financing</Link>
          </p>
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground">What moves the price</h3>
          <ul className="mt-4 space-y-2 font-body text-body-sm text-foreground/85">
            {factors.slice(0, 4).map((f) => (
              <li key={f} className="flex gap-2">
                <span aria-hidden="true" className="text-[hsl(var(--gold-ink))]">—</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CostSection;
