
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import BenefitsSection from "@/components/BenefitsSection";
import TractionSection from "@/components/TractionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AskAhooraSection from "@/components/AskAhooraSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { pushGTMEvent } from "@/types/gtm";

const Index = () => {
  // Smooth scroll to sections
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Handle initial hash in URL
    if (window.location.hash) {
      setTimeout(handleHashChange, 100);
    }

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange);
    
    // Track page view
    pushGTMEvent({
      event: 'page_view',
      page_title: 'Home Page',
      page_path: '/'
    });

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <TractionSection />
        <TestimonialsSection />
        <AskAhooraSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
