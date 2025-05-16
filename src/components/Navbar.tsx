import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileDropdown } from "@/components/auth/ProfileDropdown";
import { User } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [initialTab, setInitialTab] = useState<"signin" | "signup">("signin");
  const location = useLocation();
  const isAssessmentPage = location.pathname === "/assessment";

  const handleSignInClick = () => {
    setInitialTab("signin");
    setIsAuthDialogOpen(true);
  };

  const handleSignUpClick = () => {
    setInitialTab("signup");
    setIsAuthDialogOpen(true);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#1C1C1C]/30 border-b border-gray-800/10">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 cursor-pointer">
          
          <span className="font-semibold text-lg text-white">
            Becan
          </span>
        </Link>

        {/* Navigation Links - Only show on non-assessment pages */}
        {!isAssessmentPage && (
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-gray-400 hover:text-white transition-colors">
              Features
            </Link>
            <Link to="/benefits" className="text-gray-400 hover:text-white transition-colors">
              Benefits
            </Link>
            <Link to="/testimonials" className="text-gray-400 hover:text-white transition-colors">
              Testimonials
            </Link>
            <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">
              Pricing
            </Link>
          </div>
        )}

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {isAssessmentPage && (
            <Link to="/pricing" className="text-whitetransition-colors">
              Pricing
            </Link>
          )}
          {user ? (
            <ProfileDropdown />
          ) : (
            <>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
                onClick={handleSignInClick}
              >
                Sign In
              </Button>
              <Button
                className="text-gray-400 hover:text-white"
                onClick={handleSignUpClick}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>

      <AuthDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
        initialTab={initialTab}
      />
    </nav>
  );
};

export default Navbar; 