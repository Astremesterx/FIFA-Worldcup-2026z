import { useState, useEffect } from 'react';
import { usePwa } from '../../contexts/PwaContext';

export default function PwaPrompt() {
  const { isInstallable, installApp } = usePwa();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkAndShow = () => {
      const hasDismissed = localStorage.getItem('wc2026_pwa_dismissed');
      const hasSeenTutorial = localStorage.getItem('hasSeenTutorial') === 'true';
      
      if (isInstallable && hasSeenTutorial && !hasDismissed) {
        // Delay slightly so it doesn't immediately clash with the tutorial closing
        setTimeout(() => setIsVisible(true), 2000);
      }
    };

    // Check immediately on mount
    checkAndShow();

    // Also listen for the custom event when the tutorial closes
    window.addEventListener('tutorialCompleted', checkAndShow);
    
    return () => {
      window.removeEventListener('tutorialCompleted', checkAndShow);
    };
  }, [isInstallable]);

  const handleInstall = async () => {
    const installed = await installApp();
    if (installed) {
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Dismiss for a long time or forever
    localStorage.setItem('wc2026_pwa_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-auto md:right-8 md:w-96 z-[999] bg-surface-container border border-secondary/30 rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col gap-4 animate-fade-in-up">
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center p-2 border border-white/10 shrink-0">
            <img src="/world cup/2026_FIFA_World_Cup_emblem.svg.webp" alt="App Icon" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="font-headline-md text-on-surface text-lg">Add to Home Screen</h3>
            <p className="font-body-sm text-on-surface-variant text-xs mt-1">Install WC2026 for faster access, native alerts, and an app-like experience!</p>
          </div>
        </div>
        <button onClick={handleDismiss} className="text-on-surface-variant hover:text-white transition-colors shrink-0 p-1">
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
      
      <div className="flex gap-3 mt-2">
        <button onClick={handleDismiss} className="flex-1 py-2 font-label-caps text-xs text-on-surface-variant hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 transition-colors">
          NOT NOW
        </button>
        <button onClick={handleInstall} className="flex-1 py-2 font-label-caps text-xs bg-secondary text-on-secondary rounded-lg shadow-[0_0_15px_rgba(233,195,73,0.3)] hover:shadow-[0_0_25px_rgba(233,195,73,0.5)] transition-all">
          INSTALL APP
        </button>
      </div>
    </div>
  );
}
