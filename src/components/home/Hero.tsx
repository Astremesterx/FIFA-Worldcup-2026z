import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trophyScrollRef = useRef<HTMLDivElement>(null);
  const trophyRef = useRef<HTMLImageElement>(null);
  const trophyGlowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-06-11T19:00:00Z').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft({ days, hours, mins });
      } else {
        setTimeLeft({ days: 0, hours: 0, mins: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      // Small parallax effect on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        if (isMobile) return;
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to('.player-parallax', {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: 'power2.out',
        });
        
        gsap.to(trophyRef.current, {
          x: -xPos * 0.5,
          y: -yPos * 0.5,
          duration: 1,
          ease: 'power2.out',
        });
      };

      if (!isMobile) {
        window.addEventListener('mousemove', handleMouseMove);
      }
      
      // Intro animations
      gsap.from(trophyRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 2,
        ease: 'power3.out',
        delay: 0.5
      });
      
      gsap.from('.player-parallax', {
        y: isMobile ? 50 : 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 1
      });

      // Scroll Animation Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top', // Start immediately at the absolute top of the page
          end: '+=100%', // Give enough scroll distance for a smooth transition
          scrub: 1, // Use 1 second interpolation to smooth out mobile scroll stutter
        }
      });

      tl.to(trophyScrollRef.current, {
        scale: isMobile ? 3 : 4,
        opacity: 0,
        duration: isMobile ? 0.3 : 1,
        ease: 'power2.inOut'
      }, 0)
      .to(trophyGlowRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power1.out'
      }, 0)
      if (!isMobile) {
        tl.to('.player-parallax', {
          scale: 1.15,
          duration: 1,
          ease: 'power1.inOut'
        }, 0);
      } else {
        tl.to('.player-parallax', {
          opacity: 0,
          duration: 0.5,
          ease: 'power1.out'
        }, 0);
      }

      return () => {
        if (!isMobile) window.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen canvas-bg overflow-hidden flex flex-col items-center justify-center pt-20 pb-10 md:py-0">
      {/* Background Branding */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center md:mix-blend-screen">
        <img alt="FIFA 2026 USA Branding" className="w-full h-full object-cover object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJoCux3miUv0WrULbiWGTyWFA6dTol8BkfmsldX5XGLV_Ruo_N4XrOri4hteUEKI1vkluq71tX0RD7wdUR0NrPBSfxj3DYqtSEYPw6IsNjGZee3qjUVvfyadfwGQptEfsmwdbWTOiOX5KoaXsa5QPD_2sObcmoM83aKTIRp_TxXc63BHQSZLyTug8ivnKXOp-S2MMBOYQvidwKMsWxCxvQeWn4OjNDYMK5j-qZoZRoZwMSHBEYbwaA3k5eI106yaZ6Gqv1QDBPnT0"/>
      </div>
      
      {/* Spotlight Effect */}
      <div className="absolute inset-0 spotlight z-0 pointer-events-none"></div>
      
      {/* Deep Cinematic Background Grid */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      {/* Cinematic Typography Background (Behind everything) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full text-center pointer-events-none opacity-[0.03]">
        <h1 className="font-display-hero text-white whitespace-nowrap" style={{ fontSize: 'min(20vw, 200px)', lineHeight: '1', letterSpacing: '-0.05em' }}>GLORY</h1>
      </div>

      {/* Layered Composition */}
      <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col items-center justify-center min-h-[80vh]">
        
        {/* Player Cutouts (Background Layer) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1400px] pointer-events-none z-10 flex justify-center items-center">
          <img alt="Ronaldo" className="player-parallax absolute left-[2%] md:left-[15%] top-[10%] md:top-[15%] w-48 sm:w-56 md:w-80 opacity-60 md:opacity-90 md:mix-blend-screen -rotate-12 will-change-transform" src="/world cup/ronaldo_new.jpg" />
          <img alt="Neymar" className="player-parallax absolute right-[2%] md:right-[15%] top-[20%] md:top-[25%] w-48 sm:w-56 md:w-80 opacity-60 md:opacity-90 md:mix-blend-screen rotate-12 will-change-transform" src="/world cup/neymar_new.jpg" />
          <img alt="Messi" className="player-parallax absolute left-[15%] md:left-[30%] bottom-[25%] md:bottom-[10%] w-64 sm:w-80 md:w-[350px] opacity-60 md:opacity-90 md:mix-blend-screen -rotate-6 z-20 will-change-transform" src="/world cup/messi_new.jpg" />
        </div>

        {/* Central Trophy */}
        <div className="relative z-30 mt-10 md:mt-16 lg:mt-20 flex flex-col items-center">
          {/* Glow behind trophy - Kept outside the scaling wrapper to prevent GPU blur lag */}
          <div ref={trophyGlowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[radial-gradient(circle_at_center,rgba(233,195,73,0.3)_0%,transparent_70%)] rounded-full z-[20] pointer-events-none will-change-opacity"></div>
          
          <div ref={trophyScrollRef} className="relative z-30 will-change-transform">
            <img ref={trophyRef} alt="World Cup Trophy" className="w-[450px] md:w-[550px] lg:w-[650px] h-[600px] md:h-[750px] lg:h-[900px] object-contain relative will-change-transform" src="/world cup/trophy_transparent.png" />
          </div>
        </div>

        {/* Content Panel */}
        <div ref={textRef} className="relative z-50 flex flex-col items-center text-center mt-[-60px] md:mt-[-120px] bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/80 to-transparent pt-16 md:pt-24 pb-10 px-4 md:px-8 rounded-3xl w-full max-w-4xl">
          
          {/* Huge Title (Moved Below Trophy) */}
          <div ref={titleRef} className="w-full flex flex-col items-center text-center pointer-events-none px-4 mb-8">
            <h3 className="font-label-caps text-[10px] md:text-sm text-secondary mb-4 tracking-[0.2em] md:tracking-[0.3em] uppercase md:drop-shadow-lg">FIFA WORLD CUP 2026 | USA • CANADA • MEXICO</h3>
            <h2 className="font-headline-lg-mobile md:font-display-hero text-white/90 md:text-glow uppercase tracking-tighter md:drop-shadow-2xl" style={{ fontSize: 'clamp(40px, 12vw, 140px)', lineHeight: '0.9' }}>
              The Pinnacle <br/><span className="text-secondary">Awaits</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 md:gap-8 font-label-caps text-white backdrop-blur-xl bg-white/5 px-6 md:px-8 py-4 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] mt-4">
            <div className="flex flex-col items-center">
              <span className="text-secondary text-xl md:text-2xl font-bold font-headline-md tracking-normal">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase text-white/70 mt-1">Days</span>
            </div>
            <span className="text-white/30 text-lg md:text-xl font-light">:</span>
            <div className="flex flex-col items-center">
              <span className="text-secondary text-xl md:text-2xl font-bold font-headline-md tracking-normal">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase text-white/70 mt-1">Hours</span>
            </div>
            <span className="text-white/30 text-lg md:text-xl font-light">:</span>
            <div className="flex flex-col items-center">
              <span className="text-secondary text-xl md:text-2xl font-bold font-headline-md tracking-normal">{String(timeLeft.mins).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase text-white/70 mt-1">Mins</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
