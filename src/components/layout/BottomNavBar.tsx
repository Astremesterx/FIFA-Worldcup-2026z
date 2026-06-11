import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useActiveSection } from '../../hooks/useActiveSection';

export default function BottomNavBar() {
  const location = useLocation();
  const activeSection = useActiveSection(useMemo(() => ['live', 'standings', 'bracket', 'teams', 'fanzone'], []));

  const isActive = (targetId: string) => {
    if (location.pathname !== '/') return false;
    return activeSection === targetId;
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
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
    <nav className="md:hidden fixed bottom-6 w-full z-50 flex justify-center items-center px-4">
      <div className="flex items-center justify-between bg-surface-container-low/80 backdrop-blur-3xl w-full max-w-[400px] rounded-full border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] px-2 py-1.5 overflow-x-auto scrollbar-hide">
        <Link to="/" onClick={(e) => { if(window.location.pathname === '/') { e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'}); window.history.pushState(null, '', '/'); } }} className={`flex flex-col items-center justify-center rounded-full flex-1 py-2 font-label-caps transition-all duration-300 ${isActive('home') ? 'bg-secondary text-on-secondary shadow-[0_0_15px_rgba(233,195,73,0.4)] scale-105 ease-out' : 'text-on-surface-variant hover:text-white'}`}>
          <span className="material-symbols-outlined mb-0.5 text-[20px]" style={{ fontVariationSettings: isActive('home') ? "'FILL' 1" : "'FILL' 0" }}>home</span>
          <span className="text-[9px]">Home</span>
        </Link>
        <Link to="/#live" onClick={(e) => handleAnchorClick(e, 'live')} className={`flex flex-col items-center justify-center flex-1 py-2 font-label-caps transition-all duration-200 ${isActive('live') ? 'text-secondary' : 'text-on-surface-variant hover:text-white'}`}>
          <span className="material-symbols-outlined mb-0.5 text-[20px]" style={{ fontVariationSettings: isActive('live') ? "'FILL' 1" : "'FILL' 0" }}>sensors</span>
          <span className="text-[9px] whitespace-nowrap">Match Center</span>
        </Link>
        <Link to="/#standings" onClick={(e) => handleAnchorClick(e, 'standings')} className={`flex flex-col items-center justify-center flex-1 py-2 font-label-caps transition-all duration-200 ${isActive('standings') ? 'text-secondary' : 'text-on-surface-variant hover:text-white'}`}>
          <span className="material-symbols-outlined mb-0.5 text-[20px]" style={{ fontVariationSettings: isActive('standings') ? "'FILL' 1" : "'FILL' 0" }}>format_list_numbered</span>
          <span className="text-[9px]">Standings</span>
        </Link>
        <Link to="/#bracket" onClick={(e) => handleAnchorClick(e, 'bracket')} className={`flex flex-col items-center justify-center flex-1 py-2 font-label-caps transition-all duration-200 ${isActive('bracket') ? 'text-secondary' : 'text-on-surface-variant hover:text-white'}`}>
          <span className="material-symbols-outlined mb-0.5 text-[20px]" style={{ fontVariationSettings: isActive('bracket') ? "'FILL' 1" : "'FILL' 0" }}>account_tree</span>
          <span className="text-[9px]">Bracket</span>
        </Link>
        <Link to="/#teams" onClick={(e) => handleAnchorClick(e, 'teams')} className={`flex flex-col items-center justify-center flex-1 py-2 font-label-caps transition-all duration-200 ${isActive('teams') ? 'text-secondary' : 'text-on-surface-variant hover:text-white'}`}>
          <span className="material-symbols-outlined mb-0.5 text-[20px]" style={{ fontVariationSettings: isActive('teams') ? "'FILL' 1" : "'FILL' 0" }}>groups</span>
          <span className="text-[9px]">Teams</span>
        </Link>
        <Link to="/#fanzone" onClick={(e) => handleAnchorClick(e, 'fanzone')} className={`flex flex-col items-center justify-center flex-1 py-2 font-label-caps transition-all duration-200 ${isActive('fanzone') ? 'text-secondary' : 'text-on-surface-variant hover:text-white'}`}>
          <span className="material-symbols-outlined mb-0.5 text-[20px]" style={{ fontVariationSettings: isActive('fanzone') ? "'FILL' 1" : "'FILL' 0" }}>stars</span>
          <span className="text-[9px]">Fan Zone</span>
        </Link>
      </div>
    </nav>
  );
}
