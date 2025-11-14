
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import { SignupModal } from "@/components/SignupModal";
import { pushGTMEvent } from "@/types/gtm";

const benefits = [
  "Get actionable insights from your Google Ads data",
  "Optimize campaign performance through AI-powered recommendations",
  "Save hours of analysis time with instant answers",
  "Your data remains private - we never store your sensitive information",
  "Identify underperforming keywords and ads",
  "Make data-driven decisions without being a data scientist"
];

const BenefitsSection = () => {
  const [showSignup, setShowSignup] = useState(false);
  
  const handleSignupClick = () => {
    setShowSignup(true);
    pushGTMEvent({
      event: 'cta_click',
      cta_text: 'Ask Ahoora',
      cta_location: 'benefits_section'
    });
  };

  return (
    <section id="benefits" className="relative section-padding overflow-hidden bg-gray-50">
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Transform Your Google Ads Strategy with AI-Powered Insights
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              In the competitive world of paid search, understanding your data quickly can mean the difference between wasted ad spend and profitable campaigns. Ahoora gives you the edge you need.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-ahoora-purple" />
                  </div>
                  <p className="ml-3 text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
            
            <Button 
              className="bg-ahoora-purple hover:bg-ahoora-purple-dark text-white px-8"
              onClick={handleSignupClick}
            >
              Ask Ahoora
            </Button>
          </div>
          
          <div className="flex-1 w-full max-w-xl">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="/lovable-uploads/ahoora1.png" 
                alt="Ahoora AI Google Ads Integration" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <SignupModal open={showSignup} onOpenChange={setShowSignup} />
    </section>
  );
};

export default BenefitsSection;
