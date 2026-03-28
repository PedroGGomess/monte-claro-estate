import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/context/LanguageContext";
import AIChatbot from "@/components/AIChatbot";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Propriedade from "./pages/Propriedade.tsx";
import Galeria from "./pages/Galeria.tsx";
import Localizacao from "./pages/Localizacao.tsx";
import Agendar from "./pages/Agendar.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/propriedade" element={<Propriedade />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/localizacao" element={<Localizacao />} />
            <Route path="/agendar" element={<Agendar />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AIChatbot />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
