
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-ahoora-purple">AI-Powered</span> Decision Making for Your Business
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Transform your data into actionable insights. Ahoora helps you make smarter decisions faster with advanced AI that adapts to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-ahoora-purple hover:bg-ahoora-purple-dark text-white px-8 py-6 text-lg">
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-ahoora-purple text-ahoora-purple hover:bg-ahoora-purple/10 px-8 py-6 text-lg"
              >
                <span>Ask Ahoora</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">No credit card required. Free 14-day trial.</p>
          </div>
          <div className="flex-1 w-full max-w-xl">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-ahoora-purple to-ahoora-purple-light blur-lg opacity-30 rounded-lg"></div>
              <div className="relative bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100">
                <img
                  src="https://www.ahoora.ai/static/media/cyber-bg.e1817f027d6ff6d09fc9.png"
                  alt="Ahoora AI Dashboard"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
