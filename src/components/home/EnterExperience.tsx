import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface Props {
  onEnter: () => void;
}

export default function EnterExperience({ onEnter }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
      });
      gsap.from(btnRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    setIsEntering(true);
    
    // Initialize audio system here (we'll create a global audio manager)
    window.dispatchEvent(new CustomEvent('initAudio'));

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1.0,
      ease: "power2.inOut",
      onComplete: onEnter
    });
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background canvas-bg" style={{ willChange: 'opacity' }}>
      <div className="absolute inset-0 spotlight opacity-50 z-0"></div>
      
      {/* Background Player Cutouts */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center overflow-hidden">
        <img alt="Ronaldo" className="hidden md:block absolute left-[-10%] md:left-[10%] top-[10%] md:top-[15%] w-48 md:w-80 opacity-10 md:opacity-20 mix-blend-screen -rotate-12" src="/world cup/ronaldo_new.jpg" />
        <img alt="Neymar" className="hidden md:block absolute right-[-10%] md:right-[10%] top-[20%] md:top-[25%] w-48 md:w-80 opacity-10 md:opacity-20 mix-blend-screen rotate-12" src="/world cup/neymar_new.jpg" />
        <img alt="Messi" className="hidden md:block absolute left-[10%] md:left-[35%] bottom-[5%] md:bottom-[10%] w-64 md:w-[400px] opacity-10 md:opacity-20 mix-blend-screen -rotate-6" src="/world cup/messi_new.jpg" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div ref={textRef} className="text-center mb-12">
          <h1 className="font-display-hero text-5xl md:text-7xl text-white text-glow mb-4 tracking-tighter">
            LIVING TOURNAMENT
          </h1>
          <p className="font-label-caps text-secondary tracking-[0.3em] text-sm md:text-base">
            FIFA WORLD CUP 2026™
          </p>
        </div>

        <button 
          ref={btnRef}
          onClick={handleEnter}
          disabled={isEntering}
          className="group relative px-8 py-4 bg-transparent border border-secondary/50 rounded-full overflow-hidden hover:border-secondary transition-colors duration-500"
        >
          <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          <span className="relative z-10 font-label-caps text-sm text-secondary group-hover:text-on-secondary transition-colors duration-500">
            {isEntering ? 'ENTERING...' : 'ENTER EXPERIENCE'}
          </span>
        </button>

      </div>
    </div>
  );
}
