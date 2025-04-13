
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { SignupModal } from "@/components/SignupModal";

const CTASection = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <section id="contact" className="section-padding bg-ahoora-purple text-white">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Google Ads Performance?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join paid search marketers already using Ahoora's AI technology to get actionable insights from their Google Ads data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-ahoora-purple hover:bg-white/90 px-8"
              onClick={() => setShowSignup(true)}
            >
              Watch Demo
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10 px-8"
              onClick={() => setShowSignup(true)}
            >
              <span>Ask Ahoora</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-white/70 mt-4">
            No credit card required. Get started instantly.
          </p>
        </div>
      </div>
      <SignupModal open={showSignup} onOpenChange={setShowSignup} />
    </section>
  );
};

export default CTASection;
