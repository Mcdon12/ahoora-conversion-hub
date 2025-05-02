
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { SignupModal } from "@/components/SignupModal";

const CTASection = () => {
  const [showSignup, setShowSignup] = useState(false);
  
  const handleAskAhoora = () => {
    setShowSignup(true);
    // Track event in Google Tag Manager
    window.dataLayer?.push({
      event: 'cta_click',
      cta_text: 'Ask Ahoora',
      cta_location: 'cta_section'
    });
  };

  return (
    <section id="contact" className="section-padding bg-ahoora-purple text-white">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Search Marketing Performance?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join search marketing professionals already using Ahoora's AI technology to optimize their PPC campaigns, with industry-leading data privacy and protection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleAskAhoora} 
              className="border-white text-white px-8 bg-[#6e59a5] hover:bg-[#5d4a8e]"
            >
              <span>Ask Ahoora</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-white/70 mt-4">
            Your data is always protected. We prioritize your privacy.
          </p>
        </div>
      </div>
      <SignupModal open={showSignup} onOpenChange={setShowSignup} />
    </section>
  );
};

export default CTASection;
