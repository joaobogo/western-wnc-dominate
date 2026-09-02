import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import IntakeSheet from "./IntakeSheet";
import Queue from "./Queue";
import LeadView from "./LeadView";
import { supabase } from "@/integrations/supabase/client";
import { useInternalPageHead } from "@/components/SEOHead";
import "../intake.css";

/**
 * Internal receptionist call sheet. Mounted at /front-desk/* by the main router,
 * so it uses relative route paths and no BrowserRouter of its own.
 *
 * Lead records are admin-only at the database level, so the app requires a
 * signed-in admin session before it renders anything.
 */
export default function IntakeApp() {
  useInternalPageHead(
    "Lead Intake | Highlander Building Services",
    "Internal lead intake call sheet for Highlander Building Services, Inc.",
    "/front-desk",
  );

  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState<"checking" | "allowed" | "denied">("checking");

  useEffect(() => {
    let mounted = true;

    const evaluate = async (session: Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"]) => {
      if (!mounted) return;
      if (!session) {
        setState("denied");
        navigate(`/admin/login?next=${encodeURIComponent(location.pathname)}`, { replace: true });
        return;
      }
      const { data: allowed } = await supabase.rpc("has_role", {
        _user_id: session.user.id,
        _role: "admin",
      });
      if (!mounted) return;
      setState(allowed ? "allowed" : "denied");
    };

    supabase.auth.getSession().then(({ data }) => evaluate(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      void evaluate(session);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  if (state !== "allowed") {
    return (
      <main className="min-h-dvh flex items-center justify-center p-6">
        <p className="text-sm text-muted-foreground">
          {state === "checking" ? "Checking access…" : "Highlander team sign-in required."}
        </p>
      </main>
    );
  }

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<IntakeSheet />} />
          <Route path="queue" element={<Queue />} />
          <Route path="queue/:id" element={<LeadView />} />
          <Route path="*" element={<IntakeSheet />} />
        </Routes>
      </main>
    </>
  );
}

