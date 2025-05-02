
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle } from "lucide-react";
import { SignupModal } from "@/components/SignupModal";
import { LoginModal } from "@/components/LoginModal";

const sampleQuestions = [
  "How can I improve my Google Ads conversion rate?",
  "What keywords are underperforming in my campaigns?",
  "Why is my cost per click increasing this month?",
  "How can I optimize my ad spend across campaigns?"
];

const AskAhooraSection = () => {
  const [question, setQuestion] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      setShowSignup(true);
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
                  placeholder="Ask Ahoora..."
                  className="flex-1 border-ahoora-purple/50 focus-visible:ring-ahoora-purple"
                />
                <Button 
                  type="submit" 
                  className="bg-ahoora-purple hover:bg-ahoora-purple-dark"
                  disabled={!question.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </form>

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
          </div>
        </div>

        <SignupModal open={showSignup} onOpenChange={setShowSignup} />
        <LoginModal open={showLogin} onOpenChange={setShowLogin} />
      </div>
    </section>
  );
};

export default AskAhooraSection;
