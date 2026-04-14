import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServicePage from "./pages/ServicePage";
import TownPage from "./pages/TownPage";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import Services from "./pages/Services";
import ServiceAreas from "./pages/ServiceAreas";
import About from "./pages/About";
import Team from "./pages/Team";
import Certifications from "./pages/Certifications";
import Gallery from "./pages/Gallery";
import ReviewsPage from "./pages/ReviewsPage";
import ProjectDetail from "./pages/ProjectDetail";
import Financing from "./pages/Financing";
import Careers from "./pages/Careers";
import RequestInspection from "./pages/RequestInspection";
import FreeTools from "./pages/FreeTools";
import RoofDesigner from "./pages/RoofDesigner";
import RoofingDivision from "./pages/RoofingDivision";
import StormCenter from "./pages/StormCenter";
import ResidentialRoofing from "./pages/ResidentialRoofing";
import RoofReplacement from "./pages/RoofReplacement";
import RoofRepair from "./pages/RoofRepair";
import StormDamage from "./pages/StormDamage";
import CommercialRoofing from "./pages/CommercialRoofing";
import SpecialtyRoofing from "./pages/SpecialtyRoofing";
import ConstructionDivision from "./pages/ConstructionDivision";
import HomeAdditions from "./pages/HomeAdditions";
import Renovations from "./pages/Renovations";
import OutdoorLiving from "./pages/OutdoorLiving";
import CustomConstruction from "./pages/CustomConstruction";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/roofing" element={<RoofingDivision />} />
          <Route path="/roofing/residential" element={<ResidentialRoofing />} />
          <Route path="/roofing/roof-replacement" element={<RoofReplacement />} />
          <Route path="/roofing/roof-repair" element={<RoofRepair />} />
          <Route path="/roofing/storm-damage" element={<StormDamage />} />
          <Route path="/roofing/commercial" element={<CommercialRoofing />} />
          <Route path="/roofing/specialty" element={<SpecialtyRoofing />} />
          <Route path="/construction" element={<ConstructionDivision />} />
          <Route path="/construction/additions" element={<HomeAdditions />} />
          <Route path="/construction/renovations" element={<Renovations />} />
          <Route path="/construction/outdoor-living" element={<OutdoorLiving />} />
          <Route path="/construction/custom" element={<CustomConstruction />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/commercial-roofing" element={<ServicePage />} />
          <Route path="/commercial-maintenance" element={<ServicePage />} />
          <Route path="/gutters" element={<ServicePage />} />
          <Route path="/outdoor-living" element={<ServicePage />} />
          <Route path="/construction-services" element={<ServicePage />} />
          <Route path="/service-areas" element={<ServiceAreas />} />
          <Route path="/service-areas/:slug" element={<TownPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/storm-center" element={<StormCenter />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/request-inspection" element={<RequestInspection />} />
          <Route path="/free-tools" element={<FreeTools />} />
          <Route path="/roof-designer" element={<RoofDesigner />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
