
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Testimonial data
const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CTO at TechForward",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    quote: "Ahoora has completely transformed how we analyze our market data. The AI models are incredibly accurate and have helped us identify opportunities we would have otherwise missed.",
    stars: 5
  },
  {
    name: "Michael Chen",
    position: "Data Science Director at GlobalCorp",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    quote: "The integration was seamless, and the results were immediate. Our decision-making process is now 70% faster, and our accuracy has improved by 35%. Ahoora is truly game-changing.",
    stars: 5
  },
  {
    name: "Elena Rodriguez",
    position: "Head of Innovation at NextWave",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    quote: "We've tried multiple AI solutions, but Ahoora stands out with its intuitive interface and powerful capabilities. It's not just a tool—it's like having an expert data scientist on your team 24/7.",
    stars: 5
  },
  {
    name: "David Washington",
    position: "CEO at Stratosphere",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    quote: "Implementing Ahoora was one of the best business decisions we made last year. The ROI has been exceptional, and the customer support is world-class.",
    stars: 5
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      goToNext();
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeIndex]);

  const goToPrev = () => {
    if (sliding) return;
    setSliding(true);
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    setTimeout(() => setSliding(false), 500);
  };

  const goToNext = () => {
    if (sliding) return;
    setSliding(true);
    setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    setTimeout(() => setSliding(false), 500);
  };

  const goToSlide = (index: number) => {
    if (sliding || index === activeIndex) return;
    setSliding(true);
    setActiveIndex(index);
    setTimeout(() => setSliding(false), 500);
  };

  // Pause auto-rotation on mouse hover
  const pauseAutoRotation = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Resume auto-rotation on mouse leave
  const resumeAutoRotation = () => {
    if (!timerRef.current) {
      timerRef.current = window.setInterval(() => {
        goToNext();
      }, 5000);
    }
  };

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            See what our customers are saying about their experience with Ahoora's AI-powered solutions.
          </p>
        </div>

        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={pauseAutoRotation}
          onMouseLeave={resumeAutoRotation}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex mb-2">
                          {[...Array(testimonial.stars)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-ahoora-purple text-ahoora-purple" />
                          ))}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-lg text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-gray-600">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button 
            onClick={goToPrev}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 focus:outline-none transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-ahoora-purple" />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 focus:outline-none transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-ahoora-purple" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? "bg-ahoora-purple" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
