import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServicePage from "./pages/ServicePage";
import TownPage from "./pages/TownPage";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import Services from "./pages/Services";
import ServiceAreas from "./pages/ServiceAreas";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Financing from "./pages/Financing";
import Careers from "./pages/Careers";
import RequestInspection from "./pages/RequestInspection";
import FreeTools from "./pages/FreeTools";
import RoofDesigner from "./pages/RoofDesigner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
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
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/financing" element={<Financing />} />
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
