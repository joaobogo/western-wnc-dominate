import { Link } from "react-router-dom";

/**
 * One line on the main roofing pages (construction plan §6): roofing
 * visitors planning an addition reach the roof + addition page and the
 * construction hub.
 */
const RoofAdditionLine = () => (
  <aside aria-label="Roof and addition" className="border-y border-border bg-secondary/40">
    <p className="container-tight py-5 font-body text-body-sm text-foreground/85">
      Planning an addition too? We build it and tie in the roof under one scope:{" "}
      <Link to="/construction/roof-and-addition" className="font-semibold text-primary underline underline-offset-4">roof + addition, one contractor</Link>
      {" "}·{" "}
      <Link to="/construction" className="font-semibold text-primary underline underline-offset-4">general contractor in Franklin, NC</Link>.
    </p>
  </aside>
);

export default RoofAdditionLine;
