import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border border-b-0 rounded-t-2xl border-white/10 bg-[#09090B]">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/terms" className="text-xs text-gray-400 hover:text-white">
              Terms of use
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/privacy" className="text-xs text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/disclaimer" className="text-xs text-gray-400 hover:text-white">
              Disclaimer
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/responsible-ai" className="text-xs text-gray-400 hover:text-white">
              Responsible AI
            </Link>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <span>Copyright 2025. All rights reserved.</span>
            <span>•</span>
            <div className="flex items-center">
              <span>Becan, a thing by</span>
              <img 
                src="/neural-arc.png" 
                alt="NeuralArc Logo" 
                className="h-4 ml-2"
              />
              <span className="ml-2 text-white">NeuralArc</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
