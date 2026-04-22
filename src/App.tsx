import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ChatbotWidget from "./components/chatbot/ChatbotWidget";
import ScrollToTop from "./components/ScrollToTop";

// Lazy-load all non-home routes for faster LCP on initial load
const NotFound = lazy(() => import("./pages/NotFound"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const TownPage = lazy(() => import("./pages/TownPage"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostPage = lazy(() => import("./pages/BlogPost"));
const Services = lazy(() => import("./pages/Services"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const About = lazy(() => import("./pages/About"));
const Team = lazy(() => import("./pages/Team"));
const Certifications = lazy(() => import("./pages/Certifications"));
const Gallery = lazy(() => import("./pages/Gallery"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Financing = lazy(() => import("./pages/Financing"));
const Careers = lazy(() => import("./pages/Careers"));
const RequestInspection = lazy(() => import("./pages/RequestInspection"));
const FreeTools = lazy(() => import("./pages/FreeTools"));
const SEOChecklist = lazy(() => import("./pages/SEOChecklist"));
const InternalLinkingQA = lazy(() => import("./pages/InternalLinkingQA"));
const KeywordMap = lazy(() => import("./pages/KeywordMap"));
const SEOLaunchQA = lazy(() => import("./pages/SEOLaunchQA"));
const RoofDesigner = lazy(() => import("./pages/RoofDesigner"));
const RoofingDivision = lazy(() => import("./pages/RoofingDivision"));
const StormCenter = lazy(() => import("./pages/StormCenter"));
const ResidentialRoofing = lazy(() => import("./pages/ResidentialRoofing"));
const RoofReplacement = lazy(() => import("./pages/RoofReplacement"));
const RoofRepair = lazy(() => import("./pages/RoofRepair"));
const StormDamage = lazy(() => import("./pages/StormDamage"));
const RoofReplacementAds = lazy(() => import("./pages/RoofReplacementAds"));
const RoofRepairAds = lazy(() => import("./pages/RoofRepairAds"));
const StormDamageAds = lazy(() => import("./pages/StormDamageAds"));
const CommercialRoofing = lazy(() => import("./pages/CommercialRoofing"));
const SpecialtyRoofing = lazy(() => import("./pages/SpecialtyRoofing"));
const ConstructionDivision = lazy(() => import("./pages/ConstructionDivision"));
const HomeAdditions = lazy(() => import("./pages/HomeAdditions"));
const Renovations = lazy(() => import("./pages/Renovations"));
const ExteriorImprovements = lazy(() => import("./pages/ExteriorImprovements"));
const OutdoorLiving = lazy(() => import("./pages/OutdoorLiving"));
const CustomConstruction = lazy(() => import("./pages/CustomConstruction"));
const ConstructionConsultation = lazy(() => import("./pages/ConstructionConsultation"));
const QuoteFlow = lazy(() => import("./pages/QuoteFlow"));
const Contact = lazy(() => import("./pages/Contact"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/roofing" element={<RoofingDivision />} />
          <Route path="/roofing/residential" element={<ResidentialRoofing />} />
          <Route path="/roofing/roof-replacement" element={<RoofReplacement />} />
          <Route path="/roofing/roof-repair" element={<RoofRepair />} />
          <Route path="/roofing/storm-damage" element={<StormDamage />} />
          <Route path="/lp/roof-replacement" element={<RoofReplacementAds />} />
          <Route path="/lp/roof-repair" element={<RoofRepairAds />} />
          <Route path="/lp/storm-damage" element={<StormDamageAds />} />
          <Route path="/roofing/commercial" element={<CommercialRoofing />} />
          <Route path="/roofing/specialty" element={<SpecialtyRoofing />} />
          <Route path="/construction" element={<ConstructionDivision />} />
          <Route path="/construction/additions" element={<HomeAdditions />} />
          <Route path="/construction/renovations" element={<Renovations />} />
          <Route path="/construction/exterior" element={<ExteriorImprovements />} />
          <Route path="/construction/outdoor-living" element={<OutdoorLiving />} />
          <Route path="/construction/custom" element={<CustomConstruction />} />
          <Route path="/construction/consultation" element={<ConstructionConsultation />} />
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
          <Route path="/seo-checklist" element={<SEOChecklist />} />
          <Route path="/internal-linking-qa" element={<InternalLinkingQA />} />
          <Route path="/keyword-map" element={<KeywordMap />} />
          <Route path="/seo-launch-qa" element={<SEOLaunchQA />} />
          <Route path="/roof-designer" element={<RoofDesigner />} />
          <Route path="/consultation" element={<QuoteFlow />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <ChatbotWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
