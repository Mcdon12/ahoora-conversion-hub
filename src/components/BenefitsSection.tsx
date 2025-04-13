
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const benefits = [
  "Reduce operational costs by up to 30%",
  "Make faster decisions with 99.7% accuracy",
  "Identify opportunities others miss",
  "Automate repetitive analytical tasks",
  "Scale your AI capabilities with your business",
  "Stay ahead of market trends and competition"
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="relative section-padding overflow-hidden bg-gray-50">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10 z-0"
        style={{ backgroundImage: "url('https://www.ahoora.ai/static/media/cyber-bg.e1817f027d6ff6d09fc9.png')" }}
      ></div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Transform Your Business with AI-Powered Insights
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              In today's fast-paced market, making data-driven decisions quickly can be the difference between leading the industry or falling behind. Ahoora gives you the competitive edge.
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
            
            <Button className="bg-ahoora-purple hover:bg-ahoora-purple-dark text-white px-8">
              Ask Ahoora
            </Button>
          </div>
          
          <div className="flex-1 w-full max-w-xl">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://www.ahoora.ai/static/media/cyber-bg.e1817f027d6ff6d09fc9.png" 
                alt="Ahoora AI Platform" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ahoora-purple/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Powerful Visualization</h3>
                <p className="text-white/90">Ahoora transforms complex data into clear, actionable visualizations that drive better decisions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
