
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LoginModal } from "@/components/LoginModal";
import { SignupModal } from "@/components/SignupModal";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/ahoora_logo.png" 
              alt="Ahoora Logo" 
              className="h-10"
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-700 hover:text-ahoora-purple transition-colors">Features</a>
          <a href="#benefits" className="text-gray-700 hover:text-ahoora-purple transition-colors">Benefits</a>
          <a href="#testimonials" className="text-gray-700 hover:text-ahoora-purple transition-colors">Testimonials</a>
          <a href="#faq" className="text-gray-700 hover:text-ahoora-purple transition-colors">FAQ</a>
        </div>

        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            className="border-ahoora-purple text-ahoora-purple hover:bg-ahoora-purple/10"
            onClick={() => setShowLogin(true)}
          >
            Login
          </Button>
          <Button 
            className="bg-ahoora-purple hover:bg-ahoora-purple/90 text-white"
            onClick={() => setShowSignup(true)}
          >
            Sign Up
          </Button>
        </div>
      </div>
      
      <LoginModal open={showLogin} onOpenChange={setShowLogin} setShowSignup={setShowSignup} />
      <SignupModal open={showSignup} onOpenChange={setShowSignup} setShowLogin={setShowLogin} />
    </nav>
  );
};

export default Navbar;
