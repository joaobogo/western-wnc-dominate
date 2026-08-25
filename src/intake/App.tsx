import { Route, Routes } from "react-router-dom";
import { Header } from "./Header";
import IntakeSheet from "./IntakeSheet";
import Queue from "./Queue";
import LeadView from "./LeadView";
import { useInternalPageHead } from "@/components/SEOHead";
import "../intake.css";

/**
 * Internal receptionist call sheet. Mounted at /front-desk/* by the main router,
 * so it uses relative route paths and no BrowserRouter of its own.
 */
export default function IntakeApp() {
  useInternalPageHead(
    "Lead Intake | Highlander Building Services",
    "Internal lead intake call sheet for Highlander Building Services, Inc.",
    "/front-desk",
  );
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
