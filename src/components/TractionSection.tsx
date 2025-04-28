
import { Users, Zap, Check } from "lucide-react";

const stats = [
  {
    icon: <Users className="h-8 w-8 text-ahoora-purple" />,
    value: "100+",
    label: "Search Teams",
    description: "Trust Ahoora for their campaigns"
  },
  {
    icon: <Zap className="h-8 w-8 text-ahoora-purple" />,
    value: "10k+",
    label: "Conversations",
    description: "AI-powered insights delivered"
  },
  {
    icon: <Check className="h-8 w-8 text-ahoora-purple" />,
    value: "100s",
    label: "Google Ads Accounts",
    description: "Connected and optimized"
  }
];

const TractionSection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</p>
              <p className="text-gray-600 text-center">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TractionSection;
