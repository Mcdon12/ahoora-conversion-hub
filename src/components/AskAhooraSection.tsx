import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle } from "lucide-react";

const sampleQuestions = [
  "How can I improve my Google Ads conversion rate?",
  "What keywords are underperforming in my campaigns?",
  "Why is my cost per click increasing this month?",
  "How can I optimize my ad spend across campaigns?"
];

const AskAhooraSection = () => {
  const [question, setQuestion] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setShowDemo(true);
      }, 1000);
    }
  };

  const handleSampleClick = (q: string) => {
    setQuestion(q);
  };

  return (
    <section className="section-padding bg-gradient-to-r from-ahoora-purple/5 to-ahoora-blue-light/20">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ask Ahoora Anything
          </h2>
          <p className="text-lg text-gray-700">
            Experience the power of Ahoora's AI by asking questions about your Google Ads campaigns. Our system analyzes data and provides insightful answers.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-2">
                <Input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a Google Ads question..."
                  className="flex-1 border-ahoora-purple/50 focus-visible:ring-ahoora-purple"
                  disabled={isSubmitted}
                />
                <Button 
                  type="submit" 
                  className="bg-ahoora-purple hover:bg-ahoora-purple-dark"
                  disabled={isSubmitted || !question.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </form>

            {!isSubmitted && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Try these sample questions:</p>
                <div className="flex flex-wrap gap-2">
                  {sampleQuestions.map((q, index) => (
                    <button
                      key={index}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                      onClick={() => handleSampleClick(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isSubmitted && (
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-ahoora-purple/10 p-2 rounded-full">
                    <MessageCircle className="h-5 w-5 text-ahoora-purple" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">You</p>
                    <p className="text-gray-700">{question}</p>
                  </div>
                </div>

                {!showDemo && (
                  <div className="flex items-center justify-center py-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-ahoora-purple rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-ahoora-purple rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-2 bg-ahoora-purple rounded-full animate-pulse delay-200"></div>
                    </div>
                  </div>
                )}

                {showDemo && (
                  <div className="flex items-start gap-3">
                    <div className="bg-ahoora-purple p-2 rounded-full">
                      <img 
                        src="https://www.ahoora.ai/static/media/ahoora_metflow.07c613ecb98eaea112a6.png" 
                        alt="Ahoora" 
                        className="h-5 w-5 object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Ahoora AI</p>
                      <div className="prose text-gray-700">
                        <p>Based on my analysis of your Google Ads data, here are some actionable insights:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Your campaigns in the northeast region are outperforming others by 27%</li>
                          <li>Three of your keywords have declining click-through rates this month</li>
                          <li>There's an opportunity to reduce CPC by adjusting your bidding strategy</li>
                        </ul>
                        <p className="mt-2">Would you like me to generate a detailed optimization report?</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {showDemo && (
            <div className="bg-gray-50 border-t border-gray-100 p-4 text-center">
              <p className="text-gray-700 mb-2">Ready to experience the full power of Ahoora?</p>
              <Button className="bg-ahoora-purple hover:bg-ahoora-purple-dark">
                Watch Demo
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AskAhooraSection;
