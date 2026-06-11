import { useState, useRef, useEffect } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import { api, type Match, type Team } from '../../services/api';
import { useTimezone } from '../../contexts/TimezoneContext';
import { formatMatchTime } from '../../utils/time';
import { Link } from 'react-router-dom';

export default function NotificationCenter() {
  const { reminders, toggleReminder } = useNotifications();
  const { timezone } = useTimezone();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Record<string, Team>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    let active = true;
    if (isOpen && matches.length === 0) {
      setTimeout(() => setLoading(true), 0);
      Promise.all([api.getMatches(), api.getTeams()]).then(([matchesData, teamsData]) => {
        if (active) {
          setMatches(matchesData);
          const teamsMap: Record<string, Team> = {};
          teamsData.forEach((t: Team) => teamsMap[t.id] = t);
          setTeams(teamsMap);
          setLoading(false);
        }
      });
    }
    return () => { active = false; };
  }, [isOpen, matches.length]);

  const remindedMatches = matches.filter(m => reminders.includes(m.id)).sort((a, b) => parseInt(a.id) - parseInt(b.id));

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-secondary dark:text-secondary-fixed-dim hover:backdrop-blur-3xl transition-all duration-300 scale-95 active:scale-90 p-1 md:p-1.5 bg-white/5 border border-white/10 rounded-full flex items-center justify-center shrink-0"
        aria-label="Notifications"
      >
        <span className="material-symbols-outlined text-[16px] md:text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
          {reminders.length > 0 ? 'notifications_active' : 'notifications'}
        </span>
        {reminders.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(220,38,38,0.8)]">
            {reminders.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-[280px] md:w-[320px] bg-surface-container-high/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-white/10 bg-white/5 flex justify-between items-center">
            <h4 className="font-label-caps tracking-widest text-secondary text-xs">MATCH ALERTS</h4>
            <span className="text-[9px] text-on-surface-variant bg-surface border border-white/5 px-2 py-0.5 rounded-full">{reminders.length} Saved</span>
          </div>

          <div className="overflow-y-auto max-h-[60vh] custom-scrollbar p-2 flex flex-col gap-2">
            {loading ? (
              <div className="py-8 text-center text-on-surface-variant font-label-caps text-[10px]">Loading reminders...</div>
            ) : remindedMatches.length === 0 ? (
              <div className="py-10 flex flex-col items-center gap-3 opacity-60">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant">notifications_off</span>
                <span className="font-label-caps text-[9px] text-center tracking-widest leading-relaxed">No match reminders set.<br/>Click the bell icon on any match<br/>to save it here.</span>
              </div>
            ) : (
              remindedMatches.map(match => {
                const homeTeam = teams[match.home_team_id];
                const awayTeam = teams[match.away_team_id];
                
                if (!homeTeam || !awayTeam) return null;
                const { mainTime, timeZoneAbbr } = formatMatchTime(match.local_date, timezone, match.stadium_id);

                return (
                <div key={match.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-label-caps text-[9px] md:text-xs text-secondary bg-secondary/10 px-2 py-1 rounded">UPCOMING MATCH</span>
                    <div className="flex flex-col items-end">
                      <span className="font-label-caps text-[10px] md:text-xs text-on-surface-variant">
                        {mainTime} {timeZoneAbbr}
                      </span>
                      <span className="font-label-caps text-[8px] text-secondary tracking-widest">GRP {match.group}</span>
                    </div>
                  </div>
                    
                  <div className="flex items-center justify-between bg-black/20 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <img src={homeTeam.flag} alt={homeTeam.name_en} className="w-5 h-4 object-cover rounded-sm opacity-80" />
                      <span className="font-headline-md text-[10px] md:text-xs text-white uppercase truncate max-w-[80px] md:max-w-full">{homeTeam.name_en}</span>
                    </div>
                    <span className="font-label-caps text-[10px] text-white/30 px-2">VS</span>
                    <div className="flex items-center gap-2 flex-row-reverse">
                      <img src={awayTeam.flag} alt={awayTeam.name_en} className="w-5 h-4 object-cover rounded-sm opacity-80" />
                      <span className="font-headline-md text-[10px] md:text-xs text-white uppercase truncate max-w-[80px] md:max-w-full">{awayTeam.name_en}</span>
                    </div>
                  </div>
                    
                    <div className="flex items-center justify-between mt-1 pt-2 border-t border-white/5">
                      <span className="font-label-caps text-[8px] text-on-surface-variant truncate w-[60%]">
                        {match.local_date.split(' ')[0]}
                      </span>
                      <div className="flex items-center gap-1">
                        <Link to={`/matches/${match.id}`} onClick={() => setIsOpen(false)} className="w-6 h-6 rounded bg-surface flex items-center justify-center text-secondary hover:bg-secondary hover:text-on-secondary transition-colors" title="View Details">
                          <span className="material-symbols-outlined text-[12px]">info</span>
                        </Link>
                        <button onClick={() => toggleReminder(match.id, {
                          homeTeam: homeTeam.name_en,
                          awayTeam: awayTeam.name_en,
                          time: mainTime
                        })} className="w-6 h-6 rounded bg-surface flex items-center justify-center text-on-surface-variant hover:bg-red-500/20 hover:text-red-400 transition-colors" title="Remove Alert">
                          <span className="material-symbols-outlined text-[12px]">close</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
