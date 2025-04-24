import { BrainCircuit, CloudLightning, Shield, Layers, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SignupModal } from "@/components/SignupModal";
const features = [{
  icon: <BrainCircuit className="h-10 w-10 text-ahoora-purple" />,
  title: "Google Ads Expert",
  description: "Get instant answers to complex questions about your Google Ads campaigns without any training on your data."
}, {
  icon: <CloudLightning className="h-10 w-10 text-ahoora-purple" />,
  title: "Real-time Analysis",
  description: "Process and analyze your Google Ads data in real-time to make informed decisions when they matter most."
}, {
  icon: <Shield className="h-10 w-10 text-ahoora-purple" />,
  title: "Data Privacy",
  description: "Rest easy knowing your Google Ads data is secure with enterprise-grade security and end-to-end encryption."
}, {
  icon: <Layers className="h-10 w-10 text-ahoora-purple" />,
  title: "Easy Integration",
  description: "Connect seamlessly with your Google Ads account in minutes with no complex setup or configuration."
}];
const FeaturesSection = () => {
  const [showSignup, setShowSignup] = useState(false);
  return <section id="features" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your AI-Powered Google Ads Assistant
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Ahoora sits between your Google Ads data and your marketing team, providing instant insights and answering complex questions to help you optimize campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-gray-900 mb-3 font-semibold text-xl">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>)}
        </div>

        <div className="mt-16 bg-gradient-to-r from-ahoora-purple/10 to-ahoora-purple-light/10 p-8 rounded-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to optimize your Google Ads campaigns?</h3>
              <p className="text-gray-700 mb-0">Join paid search marketers already using Ahoora's AI to get more from their ad spend.</p>
            </div>
            <Button className="bg-ahoora-purple hover:bg-ahoora-purple-dark text-white px-8 whitespace-nowrap">
              Watch Demo <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <SignupModal open={showSignup} onOpenChange={setShowSignup} />
    </section>;
};
export default FeaturesSection;