import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

type Direction = 'Left Side' | 'Right Side' | 'Center';
type GameState = 'SELECT_TARGET' | 'TIMING' | 'SHOOTING' | 'RESULT' | 'GAME_OVER';

export default function PenaltyShootout() {
  const [score, setScore] = useState(0);
  const [chances, setChances] = useState(3);
  const [leaderboard, setLeaderboard] = useState<number[]>([]);
  const [message, setMessage] = useState('Select a target to shoot!');
  const [gameState, setGameState] = useState<GameState>('SELECT_TARGET');
  const [selectedTarget, setSelectedTarget] = useState<Direction | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const goalieRef = useRef<HTMLImageElement>(null);
  const msgRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const stadiumRef = useRef<HTMLDivElement>(null);
  const ballShadowRef = useRef<HTMLDivElement>(null);

  const directions: Direction[] = ['Left Side', 'Right Side', 'Center'];

  const resetPositions = () => {
    gsap.set(ballRef.current, { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 });
    gsap.set(ballShadowRef.current, { x: 0, y: 0, scale: 1, opacity: 0.8 });
    gsap.set(goalieRef.current, { x: 0, y: 0, rotation: 0 });
    gsap.set(stadiumRef.current, { scale: 1, y: 0 });
  };

  useEffect(() => {
    resetPositions();
  }, []);

  useEffect(() => {
    let cursorTween: gsap.core.Tween | null = null;
    if (gameState === 'TIMING' && cursorRef.current) {
      cursorTween = gsap.fromTo(cursorRef.current, 
        { left: '0%' },
        { left: '100%', duration: 0.5, ease: "none", yoyo: true, repeat: -1 }
      );
    }
    return () => {
      if (cursorTween) cursorTween.kill();
    };
  }, [gameState]);

  const handleSelectTarget = (target: Direction) => {
    if (gameState !== 'SELECT_TARGET') return;
    setSelectedTarget(target);
    setGameState('TIMING');
    setMessage('Click anywhere or press Space to shoot!');
  };

  function executeShot(target: Direction, quality: 'PERFECT' | 'GOOD' | 'MISS') {
    const goalieDive = directions[Math.floor(Math.random() * directions.length)];
    
    const rect = stadiumRef.current?.getBoundingClientRect();
    const goalWidth = rect ? rect.width : 600;
    const goalHeight = rect ? rect.height : 300;
    
    let baseX = 0, baseY = 0;
    if (target === 'Left Side') { baseX = -goalWidth * 0.20; baseY = -goalHeight * 0.35; }
    if (target === 'Right Side') { baseX = goalWidth * 0.20; baseY = -goalHeight * 0.35; }
    if (target === 'Center') { baseX = 0; baseY = -goalHeight * 0.35; }

    let ballX = baseX;
    let ballY = baseY;

    if (quality === 'MISS') {
       ballX = baseX * 1.5;
       ballY = baseY * 1.5;
       if (ballY > 0) ballY = -goalHeight * 1.1;
    } else if (quality === 'GOOD') {
       ballX = baseX * 0.8;
       ballY = baseY * 0.8;
    }

    let goalieX = 0, goalieY = 0, goalieRot = 0;
    if (goalieDive === 'Left Side') { goalieX = -goalWidth * 0.10; goalieY = -goalHeight * 0.15; goalieRot = -30; }
    if (goalieDive === 'Right Side') { goalieX = goalWidth * 0.10; goalieY = -goalHeight * 0.15; goalieRot = 30; }
    if (goalieDive === 'Center') { goalieX = 0; goalieY = -goalHeight * 0.10; goalieRot = 0; }

    const tl = gsap.timeline();
    
    tl.to(stadiumRef.current, {
      scale: 1.05,
      y: 10,
      duration: 1,
      ease: "power2.out"
    }, 0);

    tl.to(goalieRef.current, {
      x: goalieX,
      y: goalieY,
      rotation: goalieRot,
      duration: 0.5,
      ease: "power2.out"
    }, 0.1);

    tl.to(ballRef.current, {
      x: ballX,
      y: ballY,
      scale: 0.3,
      rotation: 1080,
      duration: 0.5,
      ease: "power1.inOut"
    }, 0.2);

    tl.to(ballShadowRef.current, {
      x: ballX * 0.5,
      y: ballY * 0.1,
      scale: 0.2,
      opacity: 0,
      duration: 0.5,
      ease: "power1.inOut"
    }, 0.2);

    tl.call(() => {
      setGameState('RESULT');
      
      let isGoal = false;
      if (quality === 'MISS') {
        setMessage('MISSED! Wide of the post!');
      } else if (quality === 'PERFECT' && target !== goalieDive) {
        isGoal = true;
        setMessage('PERFECT GOAL! The Mascot had no chance!');
      } else if (quality === 'PERFECT' && target === goalieDive) {
        if (Math.random() > 0.5) {
          isGoal = true;
          setMessage('GOAL! Too much power!');
        } else {
          setMessage('WHAT A SAVE! Incredible from the Mascot!');
        }
      } else if (quality === 'GOOD' && target !== goalieDive) {
        isGoal = true;
        setMessage('GOAL! Sneaks into the back of the net.');
      } else if (quality === 'GOOD' && target === goalieDive) {
        setMessage('SAVED! Comfortable stop.');
      }

      let newChances = chances;
      if (isGoal) {
        setScore(s => s + 1);
        gsap.to(containerRef.current, { scale: 1.02, duration: 0.1, yoyo: true, repeat: 1 });
        gsap.fromTo(msgRef.current, { scale: 0, opacity: 0, textShadow: '0 0 0px rgba(233,195,73,0)' }, { scale: 1.5, opacity: 1, textShadow: '0 0 40px rgba(233,195,73,1)', duration: 0.5, yoyo: true, repeat: 1 });
      } else {
        newChances -= 1;
        setChances(newChances);
        gsap.to(containerRef.current, { x: -15, duration: 0.05, yoyo: true, repeat: 5 }); 
      }

      setTimeout(() => {
        resetPositions();
        if (!isGoal && newChances <= 0) {
          setGameState('GAME_OVER');
          setMessage(`Game Over! Final Score: ${score}`);
          setLeaderboard(prev => [...prev, score].sort((a,b) => b - a).slice(0, 5));
        } else {
          setGameState('SELECT_TARGET');
          setSelectedTarget(null);
          setMessage('Select a target to shoot!');
        }
      }, 2500);
    });
  }



  const handleShootAction = useCallback(() => {
    if (gameState !== 'TIMING' || !selectedTarget) return;
    setGameState('SHOOTING');
    
    const cursor = cursorRef.current;
    let accuracy = 0;
    if (cursor) {
      const parentWidth = cursor.parentElement?.offsetWidth || 1;
      const cursorLeft = cursor.offsetLeft;
      const positionPct = cursorLeft / parentWidth;
      accuracy = 1 - Math.abs(0.5 - positionPct) * 2; 
    }

    let shotResult: 'PERFECT' | 'GOOD' | 'MISS' = 'MISS';
    if (accuracy > 0.8) shotResult = 'PERFECT';
    else if (accuracy > 0.4) shotResult = 'GOOD';
    
    executeShot(selectedTarget, shotResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, selectedTarget]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleShootAction();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, selectedTarget, handleShootAction]);

  const handlePlayAgain = () => {
    setScore(0);
    setChances(3);
    setGameState('SELECT_TARGET');
    setSelectedTarget(null);
    setMessage('Select a target to shoot!');
  };

  return (
    <div className="w-full flex flex-col items-center bg-surface/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-8 mb-12 fade-in overflow-hidden relative" onClick={() => { if(gameState === 'TIMING') handleShootAction(); }}>
      <h2 className="font-headline-lg text-3xl text-secondary mb-2 relative z-40">Penalty Shootout</h2>
      <p className="font-body-md text-on-surface-variant mb-6 text-center h-6 relative z-40 font-bold">{message}</p>

      <div className="flex gap-12 mb-4 relative z-40">
        <div className="flex flex-col items-center">
          <span className="font-label-caps text-on-surface-variant">Score</span>
          <span className="font-headline-lg text-4xl text-primary">{score}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-label-caps text-on-surface-variant">Chances Left</span>
          <span className="font-headline-lg text-4xl text-white">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={`material-symbols-outlined text-2xl ${i < chances ? 'text-secondary' : 'text-on-surface-variant/30'}`} style={{ fontVariationSettings: "'FILL' 1" }}>sports_soccer</span>
            ))}
          </span>
        </div>
      </div>

      <div className={`w-full max-w-md h-8 bg-surface-container-lowest rounded-full border border-white/20 relative overflow-hidden mb-8 transition-opacity duration-300 z-50 ${gameState === 'TIMING' || gameState === 'SHOOTING' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute top-0 bottom-0 left-[20%] right-[20%] bg-yellow-500/30"></div>
        <div className="absolute top-0 bottom-0 left-[40%] right-[40%] bg-green-500/60 border-x border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
        <div className="absolute top-0 bottom-0 left-[49%] right-[49%] bg-white z-10"></div>
        <div ref={cursorRef} className="absolute top-[-4px] bottom-[-4px] w-1.5 bg-secondary shadow-[0_0_10px_#e9c349] z-20 rounded-full" style={{ left: '0%' }}></div>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full max-w-4xl aspect-[1.5/1] md:aspect-[2.2/1] rounded-xl overflow-hidden border border-white/10"
        style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}
      >
        <div 
          ref={stadiumRef} 
          className="absolute inset-0 w-full h-full origin-bottom bg-cover bg-center"
          style={{ backgroundImage: 'url("/world cup/stadium_bg.png")' }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          
          <h1 ref={msgRef} className="absolute inset-0 flex items-center justify-center font-display-hero text-4xl md:text-8xl text-secondary opacity-0 z-50 pointer-events-none drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            GOAL!
          </h1>

          <div className="absolute bottom-[20%] left-0 right-0 flex justify-center z-20 pointer-events-none">
            <img 
              ref={goalieRef}
              src="/world cup/user_goalie.png" 
              alt="Goalkeeper"
              className="w-20 md:w-40 object-contain origin-bottom filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
            />
          </div>

          {gameState === 'GAME_OVER' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50 rounded-xl p-4">
              <h2 className="font-display-hero text-4xl md:text-6xl text-secondary mb-2 md:mb-4 drop-shadow-[0_0_20px_rgba(233,195,73,0.5)] text-center">GAME OVER</h2>
              <p className="font-headline-md text-xl md:text-2xl text-white mb-4 md:mb-8">Final Score: {score}</p>
              
              <div className="bg-surface/50 border border-white/10 rounded-xl p-6 mb-8 w-64">
                <h3 className="font-label-caps text-secondary text-center border-b border-white/10 pb-2 mb-4">LEADERBOARD</h3>
                {leaderboard.length === 0 ? (
                  <p className="text-center text-on-surface-variant text-sm">No scores yet</p>
                ) : (
                  <ul className="space-y-2">
                    {leaderboard.map((s, i) => (
                      <li key={i} className="flex justify-between items-center text-white font-body-md">
                        <span className="text-on-surface-variant">#{i + 1}</span>
                        <span className="font-bold">{s} Goals</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button 
                onClick={(e) => { e.stopPropagation(); handlePlayAgain(); }}
                className="bg-secondary text-on-secondary px-8 py-3 rounded-full font-label-caps text-label-caps hover:bg-secondary-container transition-colors shadow-[0_0_20px_rgba(233,195,73,0.3)]"
              >
                PLAY AGAIN
              </button>
            </div>
          )}

          {gameState === 'SELECT_TARGET' && directions.map(dir => {
            let posClass = "absolute w-[15%] h-[15%] md:w-[15%] md:h-[20%] flex items-center justify-center cursor-crosshair transition-all duration-300 z-30 opacity-100 md:opacity-0 hover:opacity-100 ";
            if (dir === 'Left Side') posClass += "top-[45%] left-[30%] md:top-[40%] md:left-[30%]";
            if (dir === 'Right Side') posClass += "top-[45%] right-[30%] md:top-[40%] md:right-[30%]";
            if (dir === 'Center') posClass += "top-[52.5%] left-[42.5%] md:top-[50%] md:left-[42.5%]";

            return (
              <div key={dir} className={posClass} onClick={(e) => { e.stopPropagation(); handleSelectTarget(dir); }}>
                <div className="w-8 h-8 md:w-16 md:h-16 rounded-full border-[2px] md:border-4 border-dashed border-white/50 md:border-white flex items-center justify-center bg-secondary/10 md:bg-secondary/20 backdrop-blur-sm" style={{ animation: 'spin 4s linear infinite' }}>
                  <div className="w-1.5 h-1.5 md:w-3 md:h-3 bg-secondary rounded-full shadow-[0_0_10px_#e9c349]"></div>
                </div>
              </div>
            );
          })}

          {(gameState === 'TIMING' || gameState === 'SHOOTING') && selectedTarget && (
            <div className={`absolute w-6 h-6 md:w-12 md:h-12 border-[2px] md:border-4 border-secondary rounded-full z-10 opacity-70 transition-all ${
                selectedTarget === 'Left Side' ? 'top-[50%] left-[35%] md:top-[50%] md:left-[37.5%]' :
                selectedTarget === 'Right Side' ? 'top-[50%] right-[35%] md:top-[50%] md:right-[37.5%]' :
                'top-[58%] left-[50%] md:top-[60%] md:left-[50%]'
              }`} 
              style={{ transform: 'translate(-50%, -50%)', boxShadow: '0 0 10px #e9c349, inset 0 0 10px #e9c349' }}
            ></div>
          )}

          <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-full h-full pointer-events-none flex flex-col justify-end items-center pb-2 z-40">
              <div 
                ref={ballRef}
                className="w-10 h-10 md:w-16 md:h-16 relative flex items-center justify-center z-20"
              >
                <img src="/world cup/user_ball.png" alt="Football" className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]" />
              </div>
              
              {/* Ball Shadow */}
              <div 
                ref={ballShadowRef}
                className="w-8 md:w-14 h-2 md:h-4 bg-black/60 blur-md rounded-full mt-1 z-10"
              ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
