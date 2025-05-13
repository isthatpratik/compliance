import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Check, Sparkles, Zap, Rocket } from "lucide-react";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";

const Index = () => {
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Handle hash-based navigation
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="space-y-32 py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 relative">
      <div className="inset-0 absolute flex h-[500px] w-full items-center justify-center overflow-visible rounded-lg p-20">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
    </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div style={{ display: "inline-flex", alignItems: "center", padding: "0.5rem 1rem", borderRadius: "9999px", backgroundColor: "#1c1c1c", color: "#868686", marginBottom: "1.5rem" }}>
            <Sparkles className="w-4 h-4 mr-2" />
            <span>AI-Powered Compliance Analysis</span>
          </div>
          <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#FFFFFF", marginBottom: "1.5rem", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            Streamline Your Compliance Process
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#868686", marginBottom: "2rem", textShadow: "0 1px 5px rgba(0,0,0,0.3)" }}>
            Get instant analysis and recommendations for your documents with our advanced AI technology.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            {user ? (
              <Button size="lg" style={{ background: "linear-gradient(to right, #6c6c6c, #6C6C6C)", color: "#FFFFFF" }}>
                <Zap className="w-4 h-4 mr-2" />
                Start Analysis
              </Button>
            ) : (
              <Button size="lg" style={{ background: "linear-gradient(to right, #6c6c6c, #6C6C6C)", color: "#FFFFFF" }}>
                <Rocket className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", marginBottom: "1rem", color: "#FFFFFF" }}>Powerful Features</h2>
          <p style={{ color: "#868686" }}>Everything you need to ensure compliance</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          <div style={{ padding: "2rem", borderRadius: "0.75rem", backgroundColor: "#1c1c1c", border: "1px solid #6c6c6c", boxShadow: "0 1px 2px rgba(0,0,0,0.1)", transition: "box-shadow 0.3s ease" }}>
            <div style={{ width: "3rem", height: "3rem", borderRadius: "0.5rem", backgroundColor: "rgba(108, 108, 108, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
              <Sparkles className="w-6 h-6" style={{ color: "#6c6c6c" }} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", color: "#FFFFFF" }}>AI-Powered Analysis</h3>
            <p style={{ color: "#868686" }}>
              Our advanced AI technology analyzes your documents for compliance with various regulations.
            </p>
          </div>
          <div style={{ padding: "2rem", borderRadius: "0.75rem", backgroundColor: "#1c1c1c", border: "1px solid #6c6c6c", boxShadow: "0 1px 2px rgba(0,0,0,0.1)", transition: "box-shadow 0.3s ease" }}>
            <div style={{ width: "3rem", height: "3rem", borderRadius: "0.5rem", backgroundColor: "rgba(108, 108, 108, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
              <Zap className="w-6 h-6" style={{ color: "#6c6c6c" }} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", color: "#FFFFFF" }}>Real-time Results</h3>
            <p style={{ color: "#868686" }}>
              Get instant feedback and recommendations for your compliance documents.
            </p>
          </div>
          <div style={{ padding: "2rem", borderRadius: "0.75rem", backgroundColor: "#1c1c1c", border: "1px solid #6c6c6c", boxShadow: "0 1px 2px rgba(0,0,0,0.1)", transition: "box-shadow 0.3s ease" }}>
            <div style={{ width: "3rem", height: "3rem", borderRadius: "0.5rem", backgroundColor: "rgba(108, 108, 108, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
              <Rocket className="w-6 h-6" style={{ color: "#6c6c6c" }} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", color: "#FFFFFF" }}>Multiple Regulations</h3>
            <p style={{ color: "#868686" }}>
              Support for various compliance frameworks and regulations.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", marginBottom: "1rem", color: "#FFFFFF" }}>Key Benefits</h2>
          <p style={{ color: "#868686" }}>Why choose CompliShield</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          <div style={{ padding: "2rem", borderRadius: "0.75rem", backgroundColor: "#1c1c1c", border: "1px solid #6c6c6c", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "3rem", height: "3rem", borderRadius: "0.5rem", backgroundColor: "rgba(108, 108, 108, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Zap className="w-6 h-6" style={{ color: "#6c6c6c" }} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#FFFFFF" }}>Save Time</h3>
                <p style={{ color: "#868686" }}>
                  Reduce manual compliance checking time by up to 90%.
                </p>
              </div>
            </div>
          </div>
          <div style={{ padding: "2rem", borderRadius: "0.75rem", backgroundColor: "#1c1c1c", border: "1px solid #6c6c6c", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "3rem", height: "3rem", borderRadius: "0.5rem", backgroundColor: "rgba(108, 108, 108, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles className="w-6 h-6" style={{ color: "#6c6c6c" }} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#FFFFFF" }}>Reduce Risk</h3>
                <p style={{ color: "#868686" }}>
                  Minimize compliance risks with thorough AI analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", marginBottom: "1rem", color: "#FFFFFF" }}>What Our Users Say</h2>
          <p style={{ color: "#868686" }}>Trusted by compliance professionals worldwide</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          <div style={{ padding: "2rem", borderRadius: "0.75rem", backgroundColor: "#1c1c1c", border: "1px solid #6c6c6c", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
              <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", backgroundColor: "#6c6c6c", marginRight: "1rem" }}></div>
              <div>
                <p style={{ fontWeight: "600", color: "#FFFFFF" }}>John Doe</p>
                <p style={{ fontSize: "0.875rem", color: "#6c6c6c" }}>Compliance Officer</p>
              </div>
            </div>
            <p style={{ color: "#868686" }}>
              "CompliShield has revolutionized our compliance process. The AI analysis is incredibly accurate."
            </p>
          </div>
          <div style={{ padding: "2rem", borderRadius: "0.75rem", backgroundColor: "#1c1c1c", border: "1px solid #6c6c6c", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
              <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", backgroundColor: "#6c6c6c", marginRight: "1rem" }}></div>
              <div>
                <p style={{ fontWeight: "600", color: "#FFFFFF" }}>Jane Smith</p>
                <p style={{ fontSize: "0.875rem", color: "#6c6c6c" }}>Legal Director</p>
              </div>
            </div>
            <p style={{ color: "#868686" }}>
              "The time saved on compliance checks is remarkable. Highly recommended!"
            </p>
          </div>
          <div style={{ padding: "2rem", borderRadius: "0.75rem", backgroundColor: "#1c1c1c", border: "1px solid #6c6c6c", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
              <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", backgroundColor: "#6c6c6c", marginRight: "1rem" }}></div>
              <div>
                <p style={{ fontWeight: "600", color: "#FFFFFF" }}>Mike Johnson</p>
                <p style={{ fontSize: "0.875rem", color: "#6c6c6c" }}>Risk Manager</p>
              </div>
            </div>
            <p style={{ color: "#868686" }}>
              "An essential tool for any organization dealing with compliance."
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", marginBottom: "1rem", color: "#FFFFFF" }}>Simple, Transparent Pricing</h2>
          <p style={{ color: "#868686" }}>Choose the plan that's right for you</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          <div style={{ padding: "2rem", borderRadius: "0.75rem", backgroundColor: "#1c1c1c", border: "1px solid #6c6c6c", boxShadow: "0 1px 2px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", height: "100%" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", color: "#FFFFFF" }}>Free</h3>
            <div style={{ marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#FFFFFF" }}>$0</span>
              <span style={{ color: "#6c6c6c" }}>/month</span>
            </div>
            <ul style={{ marginBottom: "2rem", flexGrow: 1, listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
              <li style={{ display: "flex", alignItems: "center" }}>
                <Check className="w-5 h-5" style={{ color: "#6c6c6c", marginRight: "0.5rem" }} />
                <span style={{ color: "#868686" }}>Feature 1</span>
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <Check className="w-5 h-5" style={{ color: "#6c6c6c", marginRight: "0.5rem" }} />
                <span style={{ color: "#868686" }}>Feature 2</span>
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <Check className="w-5 h-5" style={{ color: "#6c6c6c", marginRight: "0.5rem" }} />
                <span style={{ color: "#868686" }}>Feature 3</span>
              </li>
            </ul>
            <Button size="lg" style={{ background: "linear-gradient(to right, #6c6c6c, #6C6C6C)", color: "#FFFFFF" }}>Get Started</Button>
          </div>
          <div style={{ padding: "2rem", borderRadius: "0.75rem", backgroundColor: "#1c1c1c", border: "1px solid #6c6c6c", boxShadow: "0 1px 2px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", height: "100%" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", color: "#FFFFFF" }}>Pro</h3>
            <div style={{ marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#FFFFFF" }}>$49</span>
              <span style={{ color: "#6c6c6c" }}>/month</span>
            </div>
            <ul style={{ marginBottom: "2rem", flexGrow: 1, listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
              <li style={{ display: "flex", alignItems: "center" }}>
                <Check className="w-5 h-5" style={{ color: "#6c6c6c", marginRight: "0.5rem" }} />
                <span style={{ color: "#868686" }}>Feature 1</span>
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <Check className="w-5 h-5" style={{ color: "#6c6c6c", marginRight: "0.5rem" }} />
                <span style={{ color: "#868686" }}>Feature 2</span>
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <Check className="w-5 h-5" style={{ color: "#6c6c6c", marginRight: "0.5rem" }} />
                <span style={{ color: "#868686" }}>Feature 3</span>
              </li>
            </ul>
            <Button size="lg" style={{ background: "linear-gradient(to right, #6c6c6c, #6C6C6C)", color: "#FFFFFF" }}>Get Started</Button>
          </div>
          <div style={{ padding: "2rem", borderRadius: "0.75rem", backgroundColor: "#1c1c1c", border: "1px solid #6c6c6c", boxShadow: "0 1px 2px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", height: "100%" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", color: "#FFFFFF" }}>Enterprise</h3>
            <div style={{ marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#FFFFFF" }}>$99</span>
              <span style={{ color: "#6c6c6c" }}>/month</span>
            </div>
            <ul style={{ marginBottom: "2rem", flexGrow: 1, listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
              <li style={{ display: "flex", alignItems: "center" }}>
                <Check className="w-5 h-5" style={{ color: "#6c6c6c", marginRight: "0.5rem" }} />
                <span style={{ color: "#868686" }}>Feature 1</span>
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <Check className="w-5 h-5" style={{ color: "#6c6c6c", marginRight: "0.5rem" }} />
                <span style={{ color: "#868686" }}>Feature 2</span>
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <Check className="w-5 h-5" style={{ color: "#6c6c6c", marginRight: "0.5rem" }} />
                <span style={{ color: "#868686" }}>Feature 3</span>
              </li>
            </ul>
            <Button size="lg" style={{ background: "linear-gradient(to right, #6c6c6c, #6C6C6C)", color: "#FFFFFF" }}>Get Started</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
