
import { Check, BrainCircuit, CloudLightning, Shield, Layers, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: <BrainCircuit className="h-10 w-10 text-ahoora-purple" />,
    title: "Advanced AI Models",
    description: "Leverage cutting-edge AI technology that adapts to your specific business requirements with minimal training.",
  },
  {
    icon: <CloudLightning className="h-10 w-10 text-ahoora-purple" />,
    title: "Real-time Processing",
    description: "Process and analyze massive datasets in real-time to make informed decisions when they matter most.",
  },
  {
    icon: <Shield className="h-10 w-10 text-ahoora-purple" />,
    title: "Enterprise-grade Security",
    description: "Rest easy with SOC 2 compliant infrastructure and end-to-end encryption for all your sensitive data.",
  },
  {
    icon: <Layers className="h-10 w-10 text-ahoora-purple" />,
    title: "Seamless Integration",
    description: "Connect with your existing tools and workflows through our comprehensive API and pre-built connectors.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Businesses
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Ahoora's platform combines cutting-edge AI capabilities with user-friendly interfaces, enabling organizations of all sizes to harness the power of artificial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-ahoora-purple/10 to-ahoora-purple-light/10 p-8 rounded-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to transform your decision-making process?</h3>
              <p className="text-gray-700 mb-0">Join thousands of forward-thinking businesses already using Ahoora's AI technology.</p>
            </div>
            <Button className="bg-ahoora-purple hover:bg-ahoora-purple-dark text-white px-8 whitespace-nowrap">
              Start Free Trial <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
