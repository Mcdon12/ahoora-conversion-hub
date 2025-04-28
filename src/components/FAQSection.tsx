
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is Ahoora AI?",
    answer: "Ahoora AI is an advanced artificial intelligence platform designed to optimize Google Ads campaigns. Our AI-powered insights help search teams make data-driven decisions and improve their advertising performance."
  },
  {
    question: "How does Ahoora AI improve Google Ads performance?",
    answer: "Ahoora AI analyzes your Google Ads data in real-time, identifying patterns and opportunities for optimization. It provides actionable insights on keyword performance, bid adjustments, audience targeting, and campaign structure to maximize your ROI."
  },
  {
    question: "Is my Google Ads data secure with Ahoora AI?",
    answer: "Yes, we take data security seriously. Ahoora AI uses industry-standard encryption and security protocols to protect your data. We comply with Google's data protection requirements and never share your information with third parties."
  },
  {
    question: "How quickly can I see results?",
    answer: "Most users start seeing insights and optimization opportunities within the first week of connecting their Google Ads account. However, the impact on campaign performance can vary depending on your current setup and optimization goals."
  },
  {
    question: "Do I need technical expertise to use Ahoora AI?",
    answer: "No, Ahoora AI is designed to be user-friendly and accessible to all Google Ads users, regardless of technical expertise. Our platform provides clear, actionable insights in plain language."
  }
];

const FAQSection = () => {
  console.log("FAQ Section rendering");
  
  return (
    <section className="section-padding bg-gradient-to-br from-white to-gray-50" id="faq">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <HelpCircle className="h-12 w-12 text-ahoora-purple" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mb-8">
              Find answers to common questions about Ahoora AI and how it can help optimize your Google Ads campaigns
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
