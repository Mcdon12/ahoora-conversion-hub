import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sam Lueng",
    position: "VP, SEARCH & AD TECHNOLOGIES",
    organization: "THE ABER GROUP",
    image: "/lovable-uploads/SAM.png",
    quote: "From a data privacy lens, Ahoora AI is doing something different from the typical approach to AI. Instead of absorbing all of the Google Ads data into their own platform, they're acting as a true midware that sits on top of Google Ads with a 0-data privacy model.",
    stars: 5
  },
  {
    name: "Emma Brito",
    position: "DIGITAL ACTIVATION DIRECTOR",
    organization: "JUNGLE MEDIA",
    image: "/lovable-uploads/EMMA.png",
    quote: "The amount of time spent pulling and formatting data to evaluate and report on campaign performance is the biggest pain point we have. While straightforward enough to pull, it can be time-consuming. With Ahoora AI, the WoW reporting is streamlined.",
    stars: 5
  },
  {
    name: "Isaac Uloko",
    position: "Director of Measurement & Attribution",
    organization: "ADM",
    image: "/lovable-uploads/Isaac.png",
    quote: "The ability to use Ahoora AI to get insights quickly to guide strategies provides a high level of efficiency and productivity for search marketers. The user experience derived from its dynamic dashboard that provides insights and reports quickly in a conversational way is a game changer.",
    stars: 5
  },
  {
    name: "Travaughn Akogu",
    position: "GROWTH MARKETING LEADER",
    organization: "UNIT 1",
    image: "/lovable-uploads/TRAVAUGHN.png",
    quote: "Instead of manually stitching together insights, we now ask Ahoora simple questions like 'How are branded CPCs trending week-over-week?' Then the magic happens… we get clear, concise and contextual answers in seconds. It's like having a real-time strategist embedded within our team. What sets Ahoora apart is that it doesn't just surface data, it synthesizes it. The platform gives my team the confidence to move quickly, respond to client asks with precision, and focus more on optimization and strategy.",
    stars: 5
  },
  {
    name: "Shuchi Sarkar",
    position: "CMO, LTIMINDTREE",
    organization: "EX-GLOBAL HEAD OF MARKETING AMAZON WEB SERVICES, HP",
    image: "/lovable-uploads/SHUCHI.png",
    quote: "The problem Ahoora is solving is the ease of getting the information. It's valuable to get information with less amount of effort and time. The time and ease to value from data need to be efficient. The team currently relies on and needs someone to get information faster in a consumable manner and the whole process is not efficient",
    stars: 5
  },
  {
    name: "Scott Cairns",
    position: "DIGITAL STRATEGIST & PAID MEDIA EXPERT",
    organization: "WIDER CIRCLE",
    image: "/lovable-uploads/scot.png",
    quote: "I am able to make compelling arguments and optimize my strategies more precisely. I use Ahoora as a digital visualization tool to observe and investigate the tendency that something is true. It helps me to investigate things I have a feeling about, its direction, and something worth taking a deeper look at in order to guide my strategy. I am able to visualize and validate my assumptions with Ahoora",
    stars: 5
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const timerRef = useRef<number | null>(null);

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

  const pauseAutoRotation = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

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
                          <p className="text-gray-600">{testimonial.organization}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
