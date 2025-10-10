import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { useState } from "react";
import { SignupModal } from "@/components/SignupModal";
import { pushGTMEvent } from "@/types/gtm";
const HeroSection = () => {
  const [showSignup, setShowSignup] = useState(false);
  const handleAskAhoora = () => {
    setShowSignup(true);
    // Track event in Google Tag Manager
    pushGTMEvent({
      event: 'cta_click',
      cta_text: 'Ask Ahoora',
      cta_location: 'hero_section'
    });
  };
  return <section className="pt-32 pb-16 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-ahoora-purple">AI-Powered</span> Search Marketing Intelligence
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">Ahoora is your intelligent PPC agent, helping search marketers make data-driven decisions and optimize campaign performance with actionable insights.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" size="lg" className="border-ahoora-purple text-ahoora-purple hover:bg-ahoora-purple/10 px-8 py-6 text-lg" onClick={handleAskAhoora}>
                <span>Ask Ahoora</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <Shield className="h-5 w-5 text-ahoora-purple" />
              <p className="text-sm text-gray-600">Enterprise-grade security with end-to-end data protection</p>
            </div>
          </div>
          <div className="flex-1 w-full max-w-none lg:max-w-none">
            <div className="relative h-full flex items-center justify-center">
              <div className="w-full bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-100 transform hover:scale-105 transition-transform duration-300">
                <img src="/lovable-uploads/ahoora_ai_google_ads1.png" alt="AI-Powered Google Ads Integration" className="w-full h-auto object-contain hover:opacity-95 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SignupModal open={showSignup} onOpenChange={setShowSignup} />
    </section>;
};
export default HeroSection;