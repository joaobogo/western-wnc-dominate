import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Header";
import IntakeSheet from "./IntakeSheet";
import Queue from "./Queue";
import LeadView from "./LeadView";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<IntakeSheet />} />
          <Route path="/queue" element={<Queue />} />
          <Route path="/queue/:id" element={<LeadView />} />
          <Route path="*" element={<IntakeSheet />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
