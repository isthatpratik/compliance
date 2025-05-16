import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {  
  Check, 
  Sparkles, 
  Zap, 
  Rocket, 
  Star 
} from 'lucide-react';

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { AuthDialog } from "@/components/auth/AuthDialog";

const Index = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

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
    <div className="space-y-32 2xl:pt-32 lg:pt-12 pt-6 bg-[#09090B] text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 relative">
        <div className="inset-0 absolute flex 2xl:h-[700px] lg:h-[500px] h-[300px] w-full pointer-events-none items-center justify-center overflow-visible rounded-lg p-20">
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.1}
            duration={3}
            repeatDelay={1}
            className={cn(
              "2xl:[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
              "lg:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
              "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
            )}
          />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#111010] text-gray-300 mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            <span>AI-Powered Compliance Analysis</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 [text-shadow:_0_2px_10px_rgba(255,255,255,0.5)]">
            Streamline Your Compliance Process
          </h1>
          <p className="text-xl text-gray-300 mb-8 [text-shadow:_0_1px_5px_rgba(255,255,255,0.3)]">
            Get instant analysis and recommendations for your documents with our advanced AI technology.
          </p>
          <div className="flex justify-center space-x-4">
            {user ? (
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                onClick={() => navigate('/assessment')}
              >
                <Zap className="w-4 h-4 mr-2" />
                Start Assessment
              </Button>
            ) : (
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                onClick={() => setShowAuthDialog(true)}
              >
                <Rocket className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 bg-[#09090B] text-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-300">Everything you need to ensure compliance</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-xl bg-[#111010]/5 backdrop-blur-sm border border-white/10 shadow-sm hover:shadow-white/10 duration-300 hover:shadow-lg transition-all ease-in">
            <div className="w-12 h-12 rounded-lg bg-blue-100/20 dark:bg-blue-900/20 backdrop-blur-sm flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-4">AI-Powered Analysis</h3>
            <p className="text-gray-300">
              Our advanced AI technology analyzes your documents for compliance with various regulations.
            </p>
          </div>
          <div className="p-8 rounded-xl bg-[#111010]/5 backdrop-blur-sm border border-white/10 shadow-sm hover:shadow-white/10 duration-300 hover:shadow-lg transition-all ease-in">
            <div className="w-12 h-12 rounded-lg bg-green-100/20 dark:bg-green-900/20 backdrop-blur-sm flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Real-time Results</h3>
            <p className="text-gray-300">
              Get instant feedback and recommendations for your compliance documents.
            </p>
          </div>
          <div className="p-8 rounded-xl bg-[#111010]/5 backdrop-blur-sm border border-white/10 shadow-sm hover:shadow-white/10 duration-300 hover:shadow-lg transition-all ease-in">
            <div className="w-12 h-12 rounded-lg bg-purple-100/20 dark:bg-purple-900/20 backdrop-blur-sm flex items-center justify-center mb-6">
              <Rocket className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Multiple Regulations</h3>
            <p className="text-gray-300">
              Support for various compliance frameworks and regulations.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="container mx-auto px-4 bg-[#09090B] text-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Key Benefits</h2>
          <p className="text-gray-300">Why choose CompliShield</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-xl bg-[#111010]/5 backdrop-blur-sm border border-white/10 shadow-sm hover:shadow-white/10 duration-300 hover:shadow-lg transition-all ease-in">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                <p className="text-gray-300">
                  Reduce manual compliance checking time by up to 90%.
                </p>
              </div>
            </div>
          </div>
          <div className="p-8 rounded-xl bg-[#111010]/5 backdrop-blur-sm border border-white/10 shadow-sm hover:shadow-white/10 duration-300 hover:shadow-lg transition-all ease-in">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Reduce Risk</h3>
                <p className="text-gray-300">
                  Minimize compliance risks with thorough AI analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-4 py-16 bg-[#09090B] text-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-300">Trusted by compliance professionals worldwide</p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <Slider 
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={3}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={5000}
            pauseOnHover={true}
            arrows={false}
            adaptiveHeight={false}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                }
              }
            ]}
            className="px-4"
          >
            {[
              {
                name: "Sarah Chen",
                role: "Chief Compliance Officer",
                company: "FinTech Global",
                quote: "CompliShield has transformed our compliance workflow. The AI's accuracy in identifying regulatory requirements has saved us countless hours of manual review.",
                rating: 5
              },
              {
                name: "Marcus Rodriguez",
                role: "Data Protection Officer",
                company: "HealthFirst Inc.",
                quote: "The platform's ability to stay updated with changing regulations is impressive. It's like having an entire compliance team at your fingertips.",
                rating: 5
              },
              {
                name: "Aisha Patel",
                role: "Legal Counsel",
                company: "Global Legal Partners",
                quote: "We've reduced our compliance review time by 70% since implementing CompliShield. The detailed reports make audit preparation a breeze.",
                rating: 4
              },
              {
                name: "James Wilson",
                role: "Risk Management Director",
                company: "SecureBank",
                quote: "The real-time compliance monitoring has been a game-changer for our organization. We can now identify and address issues before they become problems.",
                rating: 5
              },
              {
                name: "Elena Petrova",
                role: "GDPR Compliance Lead",
                company: "EuroTech Solutions",
                quote: "As a company operating in multiple jurisdictions, CompliShield's multi-regulatory support is invaluable. It's simplified our compliance across borders.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="px-2 h-full">
                <div className="h-full flex flex-col p-6 rounded-xl bg-[#111010]/5 backdrop-blur-sm border border-white/10 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 ease-in-out" style={{ minHeight: '320px' }}>
                  <p className="text-gray-300 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 bg-[#09090B] text-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-300">Choose the plan that's right for you</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-xl bg-[#111010] border border-white/10 shadow-sm flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-4 text-white">Free</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-gray-500">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>5 documents per month</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Basic compliance checks</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Email support</span>
              </li>
            </ul>
            <Button className="w-full bg-white text-black hover:bg-gray-100 transition-colors">Get Started</Button>
          </div>
          <div className="p-8 rounded-xl bg-[#111010] border-2 border-blue-500 shadow-lg relative flex flex-col h-full">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm shadow-lg">
              Popular
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Plus</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$14</span>
              <span className="text-gray-500">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>50 documents per month</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Advanced compliance checks</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Custom compliance frameworks</span>
              </li>
            </ul>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/20">
              Get Started
            </Button>
          </div>
          <div className="p-8 rounded-xl bg-[#111010] border border-white/10 shadow-sm flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-4 text-white">Ultra</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$49</span>
              <span className="text-gray-500">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Unlimited documents</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Advanced compliance checks</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>24/7 Priority support</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Custom compliance frameworks</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>API access</span>
              </li>
            </ul>
            <Button className="w-full bg-white text-black hover:bg-gray-100 transition-colors">Get Started</Button>
          </div>
        </div>
      </section>

      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
      />
      <Footer />
    </div>
  );
};

export default Index;
