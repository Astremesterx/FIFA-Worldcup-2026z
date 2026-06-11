import { useState, useEffect } from 'react';
import { Globe, Tv, CalendarDays, BellRing, Trophy, X, ChevronRight, ChevronLeft, Download } from 'lucide-react';

interface OnboardingTourProps {
  isVisible: boolean;
  onClose: () => void;
}

const slides = [
  {
    title: "Welcome to the Experience",
    subtitle: "Your Ultimate 2026 FIFA World Cup Companion",
    description: "Personalize your journey. Use the Timezone Selector at the top of the page to ensure all match times automatically sync to your local region.",
    icon: <Globe className="w-10 h-10 md:w-16 md:h-16 text-secondary mb-2 md:mb-4 drop-shadow-[0_0_15px_rgba(233,195,73,0.5)]" />,
    features: ["Auto-sync Timezones", "Local Match Scheduling", "Region-specific alerts"]
  },
  {
    title: "Global Broadcast Center",
    subtitle: "Never Miss a Moment",
    description: "Navigate to the Broadcast Center to discover exact local channels broadcasting the matches. Filter by region and click any broadcast option to navigate directly to their streaming service.",
    icon: <Tv className="w-10 h-10 md:w-16 md:h-16 text-secondary mb-2 md:mb-4 drop-shadow-[0_0_15px_rgba(233,195,73,0.5)]" />,
    features: ["Find official rights holders", "Direct streaming navigation", "Global coverage maps"]
  },
  {
    title: "Smart Match Hub",
    subtitle: "Interactive Fixtures & Calendar Sync",
    description: "Explore upcoming matches, dive into Match Previews, and click any fixture to automatically import it straight into your personal Google or Apple Calendar.",
    icon: <CalendarDays className="w-10 h-10 md:w-16 md:h-16 text-secondary mb-2 md:mb-4 drop-shadow-[0_0_15px_rgba(233,195,73,0.5)]" />,
    features: ["One-click Calendar Import", "In-depth Match Previews", "Real-time Fixture Updates"]
  },
  {
    title: "Notification System",
    subtitle: "Stay Ahead of the Whistle",
    description: "Click the bell icon on any match card to set a reminder. Our intelligent Notification System will alert you directly on the website right before kickoff.",
    icon: <BellRing className="w-10 h-10 md:w-16 md:h-16 text-secondary mb-2 md:mb-4 drop-shadow-[0_0_15px_rgba(233,195,73,0.5)]" />,
    features: ["Custom Match Reminders", "Pre-game Alerts", "Centralized Notification Hub"]
  },
  {
    title: "Teams & Standings",
    subtitle: "Follow Your Nation's Journey",
    description: "Track Group Standings dynamically and visit Dedicated Team Profiles to view rosters, historical stats, and upcoming games for every qualified nation.",
    icon: <Trophy className="w-10 h-10 md:w-16 md:h-16 text-secondary mb-2 md:mb-4 drop-shadow-[0_0_15px_rgba(233,195,73,0.5)]" />,
    features: ["Live Group Standings", "Detailed Team Profiles", "Road to the Final Bracket"]
  },
  {
    title: "Install the Web App",
    subtitle: "Native Fullscreen Experience",
    description: "Look for the download icon in the top right navigation bar to install this site as an app. Enjoy a seamless fullscreen view and quick access directly from your home screen.",
    icon: <Download className="w-10 h-10 md:w-16 md:h-16 text-secondary mb-2 md:mb-4 drop-shadow-[0_0_15px_rgba(233,195,73,0.5)]" />,
    features: ["Quick home screen access", "Immersive fullscreen view", "Faster load times"]
  }
];

export default function OnboardingTour({ isVisible, onClose }: OnboardingTourProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setMounted(true), 100);
    } else {
      setTimeout(() => setMounted(false), 0);
      setTimeout(() => setCurrentSlide(0), 500); // Reset after unmount
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${mounted ? 'opacity-100 backdrop-blur-md bg-background/80' : 'opacity-0 backdrop-blur-none bg-background/0'}`}>
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[100px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <div className={`relative w-full max-w-3xl mx-4 bg-surface-container-low/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-700 transform flex flex-col max-h-[90vh] ${mounted ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'}`}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-20 text-on-surface-variant hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Carousel Container */}
        <div className="relative flex-grow h-[500px] sm:h-[450px] md:h-[450px]">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 p-6 pt-10 md:p-12 flex flex-col md:flex-row items-center gap-4 md:gap-8 transition-all duration-500 overflow-y-auto no-scrollbar ${
                index === currentSlide 
                  ? 'opacity-100 translate-x-0 pointer-events-auto' 
                  : index < currentSlide 
                    ? 'opacity-0 -translate-x-12 pointer-events-none'
                    : 'opacity-0 translate-x-12 pointer-events-none'
              }`}
            >
              {/* Left Side: Icon & Decorative */}
              <div className="w-full md:w-1/3 flex flex-col items-center justify-center shrink-0 mb-2 md:mb-0">
                <div className="relative w-20 h-20 md:w-32 md:h-32 flex items-center justify-center">
                  <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="relative z-10 w-16 h-16 md:w-24 md:h-24 bg-surface rounded-full flex items-center justify-center border border-secondary/30 shadow-inner">
                    {slide.icon}
                  </div>
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-2/3 flex flex-col text-center md:text-left h-full">
                <div className="my-auto">
                  <span className="font-label-caps text-xs text-secondary tracking-widest uppercase mb-1 md:mb-2 block">Feature {index + 1} of {slides.length}</span>
                  <h2 className="font-headline-lg text-2xl md:text-4xl text-on-surface mb-2">{slide.title}</h2>
                  <h3 className="font-body-lg text-sm md:text-lg text-secondary/80 mb-3 md:mb-4">{slide.subtitle}</h3>
                  <p className="font-body-sm md:font-body-md text-on-surface-variant mb-4 md:mb-6 leading-relaxed">
                    {slide.description}
                  </p>
                  
                  <ul className="space-y-2 mt-auto text-left inline-block md:block mx-auto md:mx-0">
                    {slide.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs md:text-sm text-on-surface/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between p-4 md:p-6 bg-surface-container border-t border-white/5 shrink-0 relative z-20">
          {/* Dots Indicator */}
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <div 
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'w-8 bg-secondary' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {currentSlide > 0 && (
              <button 
                onClick={prevSlide}
                className="p-3 rounded-full border border-white/10 text-on-surface-variant hover:bg-white/5 hover:text-white transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            
            <button 
              onClick={nextSlide}
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-on-secondary rounded-full font-label-caps tracking-widest uppercase text-sm hover:shadow-glow transition-all"
            >
              {currentSlide === slides.length - 1 ? 'Explore Hub' : 'Next'}
              {currentSlide < slides.length - 1 && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
