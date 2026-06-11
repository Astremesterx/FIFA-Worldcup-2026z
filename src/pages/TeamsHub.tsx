import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { api } from '../services/api';
import type { Team } from '../services/api';

export default function TeamsHub() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: "messi",
      title: "The Maestro's\nLast Dance",
      description: "The heartbeat of the squad remains its legendary number 10. Guiding a new generation of dynamic midfielders and relentless attackers, the tactical setup revolves around controlling the tempo and exploiting spaces with surgical precision.",
      ranking: "#3",
      manager: "Scaloni",
      image: "/player cutouts/messi_new.jpg",
      link: "/teams/37" // Argentina
    },
    {
      id: "ronaldo",
      title: "The Ultimate\nLegacy",
      description: "A phenomenal goalscorer taking the stage for one last historic campaign. The captain's unmatched aerial ability and lethal finishing remain the centerpiece of the squad.",
      ranking: "#5",
      manager: "Martinez",
      image: "/player cutouts/ronaldo_new.jpg",
      link: "/teams/41" // Portugal
    },
    {
      id: "neymar",
      title: "The Jogo Bonito\nRevival",
      description: "Bringing flair, creativity, and sheer magic back to the world stage. The brilliant playmaker orchestrates the attack with mesmerizing dribbles and visionary passes.",
      ranking: "#6",
      manager: "Carlo Ancelotti",
      image: "/player cutouts/neymar_new.jpg",
      link: "/teams/9" // Brazil
    },
    {
      id: "mbappe",
      title: "The Lightning\nPrince",
      description: "The most explosive forward in modern football. Combining blistering pace with clinical finishing, he leads a new era of dominance aiming to secure ultimate glory once again.",
      ranking: "#1",
      manager: "Deschamps",
      image: "/player cutouts/mbappe.png",
      link: "/teams/33" // France
    },
    {
      id: "kane",
      title: "The Complete\nStriker",
      description: "A lethal finisher and elite playmaker rolled into one. The captain drops deep to orchestrate play before arriving in the box to finish with ruthless efficiency.",
      ranking: "#4",
      manager: "Southgate",
      image: "/player cutouts/harry%20kane.png",
      link: "/teams/45" // England
    },
    {
      id: "yamal",
      title: "The Golden\nBoy",
      description: "A generational prodigy lighting up the world stage. With dazzling footwork and maturity beyond his years, the teenage sensation is the new creative force driving the squad forward.",
      ranking: "#2",
      manager: "de la Fuente",
      image: "/player cutouts/lamine%20yamal.png",
      link: "/teams/29" // Spain
    }
  ];

  useEffect(() => {
    api.getTeams().then(data => setTeams(data));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="teams" className="flex-grow flex flex-col relative z-10 w-full max-w-container-max mx-auto py-10 md:py-20 min-h-[80vh]">
      {/* Hero Section: Featured Team Detail */}
      <section className="relative w-full min-h-[800px] md:min-h-[80vh] flex items-center px-4 md:px-margin-desktop py-12 md:py-20 overflow-hidden">
        {/* Background Atmospheric Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/10 via-background to-background -z-10 pointer-events-none transition-colors duration-1000"></div>
        
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center px-4 md:px-margin-desktop transition-opacity duration-1000 pt-24 md:pt-0 pb-20 md:pb-0 ${index === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-0 pointer-events-none'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-gutter w-full items-center my-auto">
              {/* Left Content: Typography & Stats */}
              <div className={`md:col-span-5 flex flex-col justify-center space-y-6 md:space-y-12 transition-all duration-1000 transform ${index === currentSlide ? 'translate-x-0' : '-translate-x-10'}`}>
                {/* Team Flag / Accent */}
                <div className="h-1 bg-secondary w-16 md:w-24"></div>
                
                <div className="space-y-4 md:space-y-6">
                  <h1 className="font-display-hero text-5xl md:text-display-hero text-secondary shadow-glow paper-cut-shadow whitespace-pre-line leading-[0.9]">
                    {slide.title}
                  </h1>
                  <p className="font-body-md md:font-body-lg text-on-surface-variant max-w-lg">
                    {slide.description}
                  </p>
                </div>
                
                {/* Glassmorphic Stat Cards */}
                <div className="flex gap-4 md:gap-6 pt-2 md:pt-4">
                  <div className="bg-surface/40 backdrop-blur-xl p-4 md:p-6 rounded-xl flex-1 border border-white/10 hover:border-secondary/50 transition-colors">
                    <p className="font-label-caps text-[10px] md:text-label-caps text-secondary tracking-widest mb-1 md:mb-2">FIFA RANKING</p>
                    <p className="font-headline-md md:text-headline-lg text-on-surface">{slide.ranking}</p>
                  </div>
                  <div className="bg-surface/40 backdrop-blur-xl p-4 md:p-6 rounded-xl flex-1 border border-white/10 hover:border-secondary/50 transition-colors">
                    <p className="font-label-caps text-[10px] md:text-label-caps text-secondary tracking-widest mb-1 md:mb-2">MANAGER</p>
                    <p className="font-headline-md text-sm md:text-headline-md text-on-surface">{slide.manager}</p>
                  </div>
                </div>
              </div>
              
              {/* Right Content: Premium Cutout */}
              <div className={`md:col-span-7 relative flex justify-center items-center mt-8 md:mt-0 h-[350px] sm:h-[500px] md:h-[600px] w-full transition-all duration-1000 transform ${index === currentSlide ? 'translate-x-0 scale-100' : 'translate-x-10 scale-95'}`}>
                {/* Mist/Cloud Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20 pointer-events-none"></div>
                <Link to={slide.link} className="w-full h-full cursor-pointer group block relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-surface-container-lowest/30">
                  <img 
                    alt={slide.id} 
                    className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.05]" 
                    src={slide.image}
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 ${index === currentSlide ? 'w-10 bg-secondary shadow-glow' : 'w-2 bg-white/30 hover:bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Spacer */}
      <div className="h-32 w-full"></div>

      {/* National Teams Grid Section */}
      <section className="relative pt-12 md:pt-24 pb-8 md:pb-16 px-margin-mobile md:px-margin-desktop z-10 bg-surface-container-low/50">
        <div className="flex flex-col gap-2 mb-8 md:mb-12">
          <span className="font-label-caps text-label-caps text-secondary tracking-[0.3em] uppercase">The Road to 2026</span>
          <h2 className="font-display-hero text-5xl md:text-display-hero text-white leading-tight">The Global <span className="text-secondary italic shadow-glow">48</span></h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">A new era of the world's game. Forty-eight nations, one trophy, and a legacy that will span three nations. Explore the contenders for global glory.</p>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-gutter">
          {teams.map((team) => (
            <Link to={`/teams/${team.id}`} key={team.id} className="glass-card relative min-h-[120px] md:min-h-[220px] overflow-hidden rounded-lg md:rounded-xl cursor-pointer group block">
              <img className="absolute inset-0 w-full h-full object-cover opacity-10 md:opacity-20 md:blur-xl scale-110 group-hover:opacity-30 md:group-hover:opacity-40 transition-opacity duration-500" alt={`${team.name_en} ambient`} src={team.flag}/>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent p-2 md:p-6 flex flex-col justify-between">
                
                <div className="flex justify-between items-start">
                  <div className="w-8 h-5 md:w-16 md:h-10 border border-white/20 shadow-2xl rounded-[2px] overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <img className="w-full h-full object-cover" alt={team.name_en} src={team.flag}/>
                  </div>
                  <span className="font-label-caps text-[10px] bg-secondary/20 text-secondary border border-secondary/30 px-2 py-1 rounded hidden md:block">
                    {team.profile?.federation || 'FIFA'}
                  </span>
                </div>

                <div>
                  <h3 className="font-headline-md text-[10px] leading-tight md:text-headline-md text-secondary uppercase mb-1 md:mb-2 group-hover:text-white transition-colors truncate md:whitespace-normal md:overflow-visible" title={team.name_en}>{team.name_en}</h3>
                  <div className="flex items-center gap-1 md:gap-3">
                    <div className="hidden md:flex gap-1">
                      <div className="w-3 h-3 border border-white/20 shadow-md" style={{ backgroundColor: team.profile?.colors?.primary || '#333' }}></div>
                      <div className="w-3 h-3 border border-white/20 shadow-md" style={{ backgroundColor: team.profile?.colors?.secondary || '#ccc' }}></div>
                    </div>
                    <span className="font-label-caps text-[8px] md:text-label-caps text-on-surface-variant tracking-widest">{team.fifa_code}</span>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
