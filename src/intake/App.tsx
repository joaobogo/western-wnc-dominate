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
 * The call sheet is available to anyone with its unlisted URL. Lead records
 * and queue controls remain admin-only at the database level.
 */
export default function IntakeApp() {
  useInternalPageHead(
    "Lead Intake | Highlander Building Services",
    "Internal lead intake call sheet for Highlander Building Services, Inc.",
    "/front-desk",
  );

  const navigate = useNavigate();
  const location = useLocation();
  const [adminState, setAdminState] = useState<"checking" | "allowed" | "denied">("checking");
  const isQueueRoute = location.pathname.startsWith("/front-desk/queue");

  useEffect(() => {
    let mounted = true;

    const evaluate = async (session: Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"]) => {
      if (!mounted) return;
      if (!session) {
        setAdminState("denied");
        return;
      }
      const { data: allowed } = await supabase.rpc("has_role", {
        _user_id: session.user.id,
        _role: "admin",
      });
      if (!mounted) return;
      setAdminState(allowed ? "allowed" : "denied");
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

  useEffect(() => {
    if (isQueueRoute && adminState === "denied") {
      navigate("/front-desk", { replace: true });
    }
  }, [adminState, isQueueRoute, location.pathname, navigate]);

  if (isQueueRoute && adminState !== "allowed") {
    return (
      <main className="min-h-dvh flex items-center justify-center p-6">
        <p className="text-sm text-muted-foreground">
          {adminState === "checking" ? "Checking access…" : "Highlander team sign-in required."}
        </p>
      </main>
    );
  }

  return (
    <>
      <Header showQueue={adminState === "allowed"} />
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

