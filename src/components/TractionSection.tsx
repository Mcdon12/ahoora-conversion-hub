
import { Users, Zap, Check } from "lucide-react";

const stats = [
  {
    icon: <Users className="h-10 w-10 text-ahoora-purple" />,
    value: "100+",
    label: "Search Teams",
    description: "Trust Ahoora for their campaigns"
  },
  {
    icon: <Zap className="h-10 w-10 text-ahoora-purple" />,
    value: "10k+",
    label: "Conversations",
    description: "AI-powered insights delivered"
  },
  {
    icon: <Check className="h-10 w-10 text-ahoora-purple" />,
    value: "10,000",
    label: "Google Ads Accounts",
    description: "Connected and optimized"
  }
];

const TractionSection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Our <span className="text-ahoora-purple">Impact</span> So Far
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
            >
              <div className="mb-6 p-4 rounded-full bg-ahoora-purple bg-opacity-10 flex items-center justify-center">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-3">{stat.value}</h3>
              <p className="text-xl font-semibold text-ahoora-purple mb-3">{stat.label}</p>
              <p className="text-gray-600 text-center">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TractionSection;
