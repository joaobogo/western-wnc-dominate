import { Link, useLocation } from "react-router-dom";
import { COMPANY } from "./config";
import { supabase } from "@/integrations/supabase/client";
import type { FrontDeskSession } from "./session";
import logoCream from "@/assets/logo-cream.svg";

export function Header({ session }: { session?: Extract<FrontDeskSession, { state: "ready" }> }) {
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




        {session && (
          <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-[14px] font-semibold">
            <Link to="/front-desk" style={linkStyle(pathname === "/front-desk" || pathname === "/front-desk/")}>
              Call sheet
            </Link>
            {session.isAdmin && (
              <>
                <Link to="/front-desk/team" style={linkStyle(pathname.startsWith("/front-desk/team"))}>
                  Team
                </Link>
                <Link to="/front-desk/queue" style={linkStyle(pathname.startsWith("/front-desk/queue"))}>
                  Queue
                </Link>
              </>
            )}
            <span style={{ color: "var(--hl-cream)", opacity: 0.85 }} className="font-normal">
              {session.member.display_name}
            </span>
            <button
              type="button"
              onClick={() => void supabase.auth.signOut()}
              style={{ color: "var(--hl-cream)", opacity: 0.72 }}
              className="underline underline-offset-2"
            >
              Sign out
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
