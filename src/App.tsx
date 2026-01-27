import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UploadTranscript from "./pages/UploadTranscript";
import TranscriptReview from "./pages/TranscriptReview";
import CourseEquivalency from "./pages/CourseEquivalency";
import StudentRecords from "./pages/StudentRecords";
import AIAdvisor from "./pages/AIAdvisor";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import { UploadProvider } from "@/context/UploadContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <UploadProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<UploadTranscript />} />
            <Route path="/review" element={<TranscriptReview />} />
            <Route path="/equivalency" element={<CourseEquivalency />} />
            <Route path="/students" element={<StudentRecords />} />
            <Route path="/advisor" element={<AIAdvisor />} />
            <Route path="/reports" element={<Reports />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UploadProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
