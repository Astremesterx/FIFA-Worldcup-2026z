import { useState } from 'react';
import { usePwa } from '../../contexts/PwaContext';

export default function InstallButton() {
  const { isInstallable, installApp } = usePwa();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = async () => {
    if (isInstallable) {
      await installApp();
    } else {
      // Show manual install instructions if native prompt isn't available
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 5000);
    }
  };

  return (
    <div className="relative flex items-center shrink-0">
      <button 
        onClick={handleClick}
        className="relative text-secondary hover:backdrop-blur-3xl transition-all duration-300 scale-95 active:scale-90 p-1 md:p-1.5 bg-white/5 border border-white/10 rounded-full flex items-center justify-center"
        aria-label="Install App"
        title="Install App"
      >
        <span className="material-symbols-outlined text-[16px] md:text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>download</span>
      </button>

      {/* Tooltip for manual install instructions */}
      <div 
        className={`absolute top-full right-0 mt-2 p-3 bg-surface-container border border-secondary/30 rounded-xl shadow-lg w-64 transition-all duration-300 z-[200] ${
          showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <p className="font-body-sm text-xs text-on-surface-variant">
          To install this app natively:
          <br/><br/>
          • <b>iOS:</b> Tap Share <span className="material-symbols-outlined text-[12px] align-middle">ios_share</span> and select "Add to Home Screen"
          <br/>
          • <b>Android/PC:</b> Use the browser menu and select "Install App" or "Add to Home Screen"
        </p>
      </div>
    </div>
  );
}
