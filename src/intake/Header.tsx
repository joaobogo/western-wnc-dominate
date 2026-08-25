import { Link, useLocation } from "react-router-dom";
import { COMPANY } from "./config";

export function Header() {
  const { pathname } = useLocation();
  const linkStyle = (active: boolean) => ({
    color: "var(--hl-cream)",
    opacity: active ? 1 : 0.72,
    borderBottom: active ? "2px solid var(--hl-brass)" : "2px solid transparent",
  });

  return (
    <header
      style={{
        background: "var(--hl-green)",
        borderBottom: "3px solid var(--hl-brass)",
      }}
    >
      <div className="mx-auto max-w-[1180px] px-4 py-3 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div
            className="hl-slab leading-none"
            style={{
              color: "var(--hl-cream)",
              fontSize: 22,
              letterSpacing: "0.18em",
              fontVariant: "small-caps",
            }}
          >
            Highlander
          </div>
          <div
            className="mt-1 truncate"
            style={{
              color: "var(--hl-brass)",
              fontSize: 10.5,
              letterSpacing: "0.16em",
            }}
          >
            {COMPANY.serviceLine}
          </div>
        </div>

        <nav className="flex items-center gap-4 text-[14px] font-semibold">
          <Link to="/" style={linkStyle(pathname === "/")}>
            Call sheet
          </Link>
          <Link to="/queue" style={linkStyle(pathname.startsWith("/queue"))}>
            Queue
          </Link>
        </nav>
      </div>
    </header>
  );
}
