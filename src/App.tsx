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
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

const AuthCallback = () => {
  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session from the URL hash
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const providerToken = hashParams.get('provider_token');
        const providerRefreshToken = hashParams.get('provider_refresh_token');

        if (accessToken && refreshToken) {
          // Set the session using the tokens from the URL
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.error('Error setting session:', error);
            window.location.href = '/';
            return;
          }

          // If we have provider tokens, update the user's metadata
          if (providerToken && providerRefreshToken) {
            const { error: updateError } = await supabase.auth.updateUser({
              data: {
                provider_token: providerToken,
                provider_refresh_token: providerRefreshToken,
              }
            });

            if (updateError) {
              console.error('Error updating user metadata:', updateError);
            }
          }

          // Redirect to home page immediately after successful authentication
          window.location.href = '/';
        } else {
          // If no tokens in URL, redirect to home
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        window.location.href = '/';
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">Redirecting to home page...</p>
      </div>
    </div>
  );
};

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
          <div className="bg-white text-gray-900 dark:bg-gray-950 dark:text-white min-h-screen">
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
