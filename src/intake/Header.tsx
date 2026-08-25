import { Link, useLocation } from "react-router-dom";
import { COMPANY } from "./config";
import logoCream from "@/assets/logo-cream.svg";

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
        <a
          href="https://highlandernc.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 flex items-center"
          aria-label={`${COMPANY.name} — open website in a new tab`}
          title="Open highlandernc.com"
        >
          <img
            src={logoCream}
            alt={`${COMPANY.name} logo`}
            width={1193}
            height={338}
            decoding="async"
            className="h-9 w-auto sm:h-11 max-w-[220px] sm:max-w-none object-contain"
          />
        </a>




        <nav className="flex items-center gap-4 text-[14px] font-semibold">
          <Link to="/front-desk" style={linkStyle(pathname === "/front-desk")}>
            Call sheet
          </Link>
          <Link to="/front-desk/queue" style={linkStyle(pathname.startsWith("/front-desk/queue"))}>
            Queue
          </Link>
        </nav>
      </div>
    </header>
  );
}
