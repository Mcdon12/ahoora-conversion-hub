
import { Link } from "react-router-dom";
import { Shield, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="inline-block mb-4">
              <img src="/lovable-uploads/06407a7a-8832-46d4-84ce-a9eb08e6c43e.png" alt="Ahoora Logo" className="h-12" />
            </Link>
            <p className="text-gray-600 text-center md:text-left mb-4">
              Ahoora helps marketers make better decisions with AI-powered insights from their search marketing data while prioritizing data privacy and security.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-ahoora-purple" />
              <span className="text-sm font-medium text-gray-700">Enterprise-grade data security</span>
            </div>
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://www.linkedin.com/company/104933301/admin/dashboard/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-ahoora-purple transition-colors"
                onClick={() => {
                  window.dataLayer?.push({
                    event: 'social_click',
                    social_platform: 'linkedin'
                  });
                }}
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="/lovable-uploads/08575996-12e2-4b28-853e-23fec3a61175.png" 
                alt="Google Logo" 
                className="h-8 w-8"
              />
              <span className="text-sm font-medium text-gray-700">Verified by Google</span>
            </div>
            <div className="flex flex-col md:flex-row gap-6 mt-4">
              <Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-ahoora-purple transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} Ahoora AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
