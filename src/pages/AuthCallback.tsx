import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the auth response from the URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const providerToken = hashParams.get('provider_token');
        const providerRefreshToken = hashParams.get('provider_refresh_token');

        if (accessToken && refreshToken) {
          // Set the session in Supabase
          await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          // Update user metadata if we have provider tokens
          if (providerToken && providerRefreshToken) {
            await supabase.auth.updateUser({
              data: {
                provider_token: providerToken,
                provider_refresh_token: providerRefreshToken,
              }
            });
          }

          // Redirect to home page
          navigate('/', { replace: true });
        } else {
          throw new Error('Authentication failed: Missing tokens');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Authentication failed. Please try signing in again.",
        });
        navigate('/', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return null; // Don't render anything while handling auth
}
