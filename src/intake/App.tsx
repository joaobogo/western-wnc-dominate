import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./Header";
import IntakeSheet from "./IntakeSheet";
import Queue from "./Queue";
import LeadView from "./LeadView";
import Team from "./Team";
import { NoAccess, SignIn } from "./SignIn";
import { FrontDeskSessionProvider, useFrontDesk } from "./session";
import { useInternalPageHead } from "@/components/SEOHead";
import "../intake.css";

/**
 * Internal receptionist call sheet. Mounted at /front-desk/* by the main router,
 * so it uses relative route paths and no BrowserRouter of its own.
 *
 * Everyone signs in with their own login. Front-desk staff get the call sheet
 * and their own "My day" tracker; admins also get the queue and the team page.
 */
export default function IntakeApp() {
  useInternalPageHead(
    "Lead Intake | Highlander Building Services",
    "Internal lead intake call sheet for Highlander Building Services, Inc.",
    "/front-desk",
  );

  return (
    <FrontDeskSessionProvider>
      <FrontDeskRoutes />
    </FrontDeskSessionProvider>
  );
}

function FrontDeskRoutes() {
  const session = useFrontDesk();

  if (session.state === "checking") {
    return (
      <>
        <Header />
        <main className="min-h-dvh flex items-center justify-center p-6">
          <p className="text-sm text-muted-foreground">Checking access…</p>
        </main>
      </>
    );
  }

  if (session.state === "signed_out") {
    return (
      <>
        <Header />
        <SignIn />
      </>
    );
  }

  if (session.state === "no_access") {
    return (
      <>
        <Header />
        <NoAccess email={session.user.email} />
      </>
    );
  }

  const adminOnly = (element: JSX.Element) => (session.isAdmin ? element : <Navigate to="/front-desk" replace />);

  return (
    <>
      <Header session={session} />
      <main>
        <Routes>
          <Route path="/" element={<IntakeSheet />} />
          <Route path="queue" element={adminOnly(<Queue />)} />
          <Route path="queue/:id" element={adminOnly(<LeadView />)} />
          <Route path="team" element={adminOnly(<Team />)} />
          <Route path="*" element={<IntakeSheet />} />
        </Routes>
      </main>
    </>
  );
}
