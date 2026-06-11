import { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useActiveSection } from '../../hooks/useActiveSection';
import TimezoneSelector from '../common/TimezoneSelector';
import NotificationCenter from '../common/NotificationCenter';
import InstallButton from './InstallButton';

export default function TopAppBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const activeSection = useActiveSection(useMemo(() => ['live', 'standings', 'bracket', 'teams', 'fanzone', 'legacy'], []));

  const isActive = (targetId: string) => {
    if (location.pathname !== '/') return false;
    return activeSection === targetId;
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLinkClick = () => {
    closeMenu();
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    closeMenu();
    if (window.location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/#${targetId}`);
      }
    }
  };

  return (
    <>
      <header className="flex justify-between items-center px-4 lg:px-margin-desktop py-3 w-full bg-surface/40 dark:bg-surface-container-lowest/40 backdrop-blur-xl docked full-width fixed top-0 left-0 z-[100] border-b border-white/10 dark:border-secondary/20 shadow-2xl">
        <div className="flex items-center gap-2 md:gap-3 shadow-glow z-50 relative shrink-0">
          <img src="/world cup/2026_FIFA_World_Cup_emblem.svg.webp" alt="WC 2026 Logo" className="h-8 md:h-12 w-auto object-contain" />
          <div className="flex flex-col justify-center">
            <span className="font-headline-lg tracking-tighter text-white text-lg md:text-2xl lg:text-3xl font-bold leading-none drop-shadow-[0_0_12px_rgba(255,255,255,0.25)] whitespace-nowrap">WORLD CUP 26</span>
            <div className="flex flex-col md:flex-row items-start md:items-center text-[9px] md:text-[11px] text-on-surface-variant/40 font-body-sm mt-0.5 leading-tight gap-0.5 md:gap-2">
              <span>Developed by Salif</span>
              <span className="hidden md:inline w-1 h-1 rounded-full bg-on-surface-variant/30"></span>
              <a href="https://t.me/Astremester" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                <svg className="w-2.5 h-2.5 md:w-3 md:h-3 opacity-60" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                @Astremester
              </a>
            </div>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden xl:flex flex-1 justify-start ml-8 2xl:ml-16 gap-4 2xl:gap-8 relative z-50">
          <Link to="/" onClick={handleLinkClick} className={`transition-colors hover:backdrop-blur-3xl duration-300 scale-95 active:scale-90 font-label-caps ${isActive('home') ? 'text-secondary font-bold shadow-glow border-b border-secondary pb-1' : 'text-on-surface-variant hover:text-on-surface'}`}>Home</Link>
          <Link to="/#live" onClick={(e) => handleAnchorClick(e, 'live')} className={`transition-colors hover:backdrop-blur-3xl duration-300 scale-95 active:scale-90 font-label-caps ${isActive('live') ? 'text-secondary font-bold shadow-glow border-b border-secondary pb-1' : 'text-on-surface-variant hover:text-on-surface'}`}>Match Center</Link>
          <Link to="/#standings" onClick={(e) => handleAnchorClick(e, 'standings')} className={`transition-colors hover:backdrop-blur-3xl duration-300 scale-95 active:scale-90 font-label-caps ${isActive('standings') ? 'text-secondary font-bold shadow-glow border-b border-secondary pb-1' : 'text-on-surface-variant hover:text-on-surface'}`}>Standings</Link>
          <Link to="/#bracket" onClick={(e) => handleAnchorClick(e, 'bracket')} className={`transition-colors hover:backdrop-blur-3xl duration-300 scale-95 active:scale-90 font-label-caps ${isActive('bracket') ? 'text-secondary font-bold shadow-glow border-b border-secondary pb-1' : 'text-on-surface-variant hover:text-on-surface'}`}>Bracket</Link>
          <Link to="/#teams" onClick={(e) => handleAnchorClick(e, 'teams')} className={`transition-colors hover:backdrop-blur-3xl duration-300 scale-95 active:scale-90 font-label-caps ${isActive('teams') ? 'text-secondary font-bold shadow-glow border-b border-secondary pb-1' : 'text-on-surface-variant hover:text-on-surface'}`}>Teams</Link>
          <Link to="/#fanzone" onClick={(e) => handleAnchorClick(e, 'fanzone')} className={`transition-colors hover:backdrop-blur-3xl duration-300 scale-95 active:scale-90 font-label-caps ${isActive('fanzone') ? 'text-secondary font-bold shadow-glow border-b border-secondary pb-1' : 'text-on-surface-variant hover:text-on-surface'}`}>Fan Zone</Link>
          <Link to="/#legacy" onClick={(e) => handleAnchorClick(e, 'legacy')} className={`transition-colors hover:backdrop-blur-3xl duration-300 scale-95 active:scale-90 font-label-caps ${isActive('legacy') ? 'text-secondary font-bold shadow-glow border-b border-secondary pb-1' : 'text-on-surface-variant hover:text-on-surface'}`}>Legacy</Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4 z-50 relative shrink-0">
          <div className="flex gap-1 md:gap-2 items-center">
            <TimezoneSelector />
            <Link to="/broadcast" className="sm:hidden relative text-secondary hover:backdrop-blur-3xl transition-all duration-300 scale-95 active:scale-90 p-1 bg-white/5 border border-white/10 rounded-full flex items-center justify-center" aria-label="Broadcast Center">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>tv</span>
            </Link>
            <NotificationCenter />
            <InstallButton />
          </div>
          <Link to="/broadcast" className="bg-secondary text-on-secondary font-label-caps text-[9px] md:text-[10px] px-3 py-1.5 md:px-4 md:py-1.5 rounded-full hover:shadow-[0_0_20px_rgba(233,195,73,0.4)] transition-all duration-300 scale-95 active:scale-90 hidden sm:block whitespace-nowrap">
            BROADCAST
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button onClick={toggleMenu} className="xl:hidden text-secondary ml-1" aria-label="Toggle Menu">
            <span className="material-symbols-outlined text-[28px]">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-surface/95 backdrop-blur-2xl z-40 flex flex-col pt-24 px-6 transition-all duration-300 xl:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col gap-8 items-center text-center mt-12">
          <Link to="/" onClick={handleLinkClick} className={`text-2xl font-display-hero ${isActive('home') ? 'text-secondary' : 'text-on-surface'}`}>HOME</Link>
          <Link to="/#live" onClick={(e) => handleAnchorClick(e, 'live')} className={`text-2xl font-display-hero ${isActive('live') ? 'text-secondary' : 'text-on-surface'}`}>MATCH CENTER</Link>
          <Link to="/#standings" onClick={(e) => handleAnchorClick(e, 'standings')} className={`text-2xl font-display-hero ${isActive('standings') ? 'text-secondary' : 'text-on-surface'}`}>STANDINGS</Link>
          <Link to="/#bracket" onClick={(e) => handleAnchorClick(e, 'bracket')} className={`text-2xl font-display-hero ${isActive('bracket') ? 'text-secondary' : 'text-on-surface'}`}>BRACKET</Link>
          <Link to="/#teams" onClick={(e) => handleAnchorClick(e, 'teams')} className={`text-2xl font-display-hero ${isActive('teams') ? 'text-secondary' : 'text-on-surface'}`}>TEAMS</Link>
          <Link to="/#fanzone" onClick={(e) => handleAnchorClick(e, 'fanzone')} className={`text-2xl font-display-hero ${isActive('fanzone') ? 'text-secondary' : 'text-on-surface'}`}>FAN ZONE</Link>
          <Link to="/#legacy" onClick={(e) => handleAnchorClick(e, 'legacy')} className={`text-2xl font-display-hero ${isActive('legacy') ? 'text-secondary' : 'text-on-surface'}`}>LEGACY</Link>
          <Link to="/broadcast" onClick={closeMenu} className="mt-8 bg-secondary text-on-secondary font-label-caps px-8 py-3 rounded-full">BROADCAST</Link>
        </nav>
      </div>
    </>
  );
}
