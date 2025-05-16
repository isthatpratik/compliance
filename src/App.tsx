import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import Assessment from "./pages/Assessment";
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="text-white bg-[#09090B] min-h-screen">
            <div className="max-w-[1440px] mx-auto">
              <Toaster />
              <Sonner />
              <Router>
                <Navbar />
                <main className="pt-16">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/features" element={<Navigate to="/#features" replace />} />
                    <Route path="/benefits" element={<Navigate to="/#benefits" replace />} />
                    <Route path="/testimonials" element={<Navigate to="/#testimonials" replace />} />
                    <Route path="/pricing" element={<Navigate to="/#pricing" replace />} />
                    <Route 
                      path="/auth/callback" 
                      element={
                        <div className="min-h-screen flex items-center justify-center">
                          <div className="text-center space-y-4">
                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            <p className="text-lg text-gray-600 dark:text-gray-300">Redirecting to home page...</p>
                          </div>
                        </div>
                      } 
                    />
                    <Route
                      path="/assessment"
                      element={
                        <ProtectedRoute>
                          <Assessment />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </Router>
            </div>
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
