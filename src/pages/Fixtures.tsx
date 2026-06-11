import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, type Match, type Team, type Stadium } from '../services/api';
import { formatMatchTime } from '../utils/time';
import { useTimezone } from '../contexts/TimezoneContext';
import { useNotifications } from '../contexts/NotificationContext';
import { generateGoogleCalendarLink, downloadICS } from '../utils/calendar';

const MATCHDAYS = [
  'Matchday 1', 'Matchday 2', 'Matchday 3', 
  'Round of 32', 'Round of 16', 'Quarter Finals', 'Semi Finals', 'Finals'
];

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

// Helper to format date like "FRI 12 JUNE"
const formatDateHeader = (dateStr: string) => {
  const [month, day, year] = dateStr.split('/');
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'long' };
  const parts = date.toLocaleDateString('en-GB', options).toUpperCase().split(' ');
  
  if (parts.length >= 3) {
    return (
      <span className="font-headline-md italic tracking-widest text-xl md:text-2xl mt-8 mb-6 block border-white/10 pb-4 text-center md:text-left">
        <span className="text-secondary">{parts[0]}</span> <span className="text-white">{parts[1]} {parts[2]}</span>
      </span>
    );
  }
  return <span className="font-headline-md italic tracking-widest text-xl text-white block mt-8 mb-6">{dateStr}</span>;
};

export default function Fixtures() {
  const { timezone } = useTimezone();
  const { hasReminder, toggleReminder } = useNotifications();
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Record<string, Team>>({});
  const [stadiums, setStadiums] = useState<Record<string, Stadium>>({});
  const [loading, setLoading] = useState(true);
  const [activeMatchday, setActiveMatchday] = useState('Matchday 1');
  const [activeGroup, setActiveGroup] = useState('');
  const [searchTeam, setSearchTeam] = useState('');
  
  const targetDate = new Date('2026-06-11T19:00:00Z').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      });
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = () => {
      Promise.all([
        api.getMatches(),
        api.getTeams(),
        api.getStadiums()
      ]).then(([matchesData, teamsData, stadiumsData]) => {
        const sortedMatches = matchesData.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        setMatches(sortedMatches);
        
        const teamsMap: Record<string, Team> = {};
        teamsData.forEach((t: Team) => teamsMap[t.id] = t);
        setTeams(teamsMap);

        const stadiumsMap: Record<string, Stadium> = {};
        stadiumsData.forEach((s: Stadium) => stadiumsMap[s.id] = s);
        setStadiums(stadiumsMap);
        
        setLoading(false);
      });
    };
    fetchData();

    // Poll matches every 15 seconds to ensure live stats
    const interval = setInterval(() => {
      api.getMatches().then((matchesData) => {
        const sortedMatches = matchesData.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        setMatches(sortedMatches);
      });
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div></div>;

  // Group matches by date
  type MatchWithTime = Match & { _timeData?: ReturnType<typeof formatMatchTime> };
  const matchesByDate: Record<string, MatchWithTime[]> = {};
  matches.forEach(m => {
    if (activeGroup && m.group !== activeGroup) return;

    const isSearching = searchTeam.trim() !== '';
    if (isSearching) {
      const homeTeam = teams[m.home_team_id]?.name_en?.toLowerCase() || '';
      const awayTeam = teams[m.away_team_id]?.name_en?.toLowerCase() || '';
      const query = searchTeam.toLowerCase().trim();
      if (!homeTeam.includes(query) && !awayTeam.includes(query)) return;
    }

    if (!isSearching) {
      let matchMatchesTab = false;
      if (activeMatchday === 'Matchday 1' && m.matchday === '1') matchMatchesTab = true;
      else if (activeMatchday === 'Matchday 2' && m.matchday === '2') matchMatchesTab = true;
      else if (activeMatchday === 'Matchday 3' && m.matchday === '3') matchMatchesTab = true;
      else if (activeMatchday === 'Round of 32' && m.matchday === '4') matchMatchesTab = true;
      else if (activeMatchday === 'Round of 16' && m.matchday === '5') matchMatchesTab = true;
      else if (activeMatchday === 'Quarter Finals' && m.matchday === '6') matchMatchesTab = true;
      else if (activeMatchday === 'Semi Finals' && m.matchday === '7') matchMatchesTab = true;
      else if (activeMatchday === 'Finals' && (m.matchday === '8' || m.matchday === '9')) matchMatchesTab = true;

      if (!matchMatchesTab) return;
    }

    const timeData = formatMatchTime(m.local_date, timezone, m.stadium_id);
    const date = timeData.dateStr || m.local_date.split(' ')[0];
    if (!matchesByDate[date]) matchesByDate[date] = [];
    matchesByDate[date].push({ ...m, _timeData: timeData }); // Stashing to avoid double compute
  });

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      
      {/* Back Button */}
      <div className="absolute top-[90px] md:top-[100px] left-4 md:left-margin-desktop z-50">
        <Link to="/" className="inline-flex items-center gap-2 font-label-caps text-white/70 hover:text-white transition-colors text-[10px] md:text-xs bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <span className="material-symbols-outlined text-[16px] md:text-[18px]">arrow_back</span>
          <span>BACK TO HOME</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[450px] flex items-center justify-center pt-20 overflow-hidden border-b border-white/5">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmbleQnggSMJ9jLOVS_Fy_fvfvmj4ys-tyRZUfkg3zbCd7eY6KN98JQeDTkRfWVNx06qtNZlmmIq0mzuj9QS0sUr3yLFNa96YBt1-9xeF3nrht1d7KUhGgKTDjgEs2yygqKkpGXT0iZPzJ-dXSjq0HBWV3sae1RP_IFmRaC_Mi52lNaiYud5FmJMSG_DjOa25-rPwDG3Dt1ia3-xuGi0SHkHGgNMkbOowlqax5t1Xztz_r6GJQN42t--kdNdSRyJQ49VwelYZ4KxE" 
            alt="Stadium" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/60 to-background"></div>
        </div>

        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col lg:flex-row justify-between items-center lg:items-end pb-8 gap-12 lg:gap-8">
          {/* Title and Countdown */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left fade-in">
            <span className="font-label-caps text-secondary tracking-widest text-xs md:text-sm mb-4">UPCOMING MATCH</span>
            <h1 className="font-display-hero italic text-4xl md:text-7xl lg:text-[100px] text-white leading-[0.9] mb-8 lg:mb-12 drop-shadow-2xl uppercase">
              THE GRAND<br/>SCHEDULE
            </h1>
            
            <div className="flex items-center gap-4 lg:gap-6 text-white">
              <span className="font-label-caps text-xs text-on-surface-variant uppercase pt-1 mr-2 lg:mr-4">Kickoff In</span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-lg text-4xl md:text-5xl">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="font-label-caps text-[10px] text-secondary">DAYS</span>
              </div>
              <span className="font-headline-lg text-secondary text-2xl md:text-3xl">:</span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-lg text-4xl md:text-5xl">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="font-label-caps text-[10px] text-secondary">HOURS</span>
              </div>
              <span className="font-headline-lg text-secondary text-2xl md:text-3xl">:</span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-lg text-4xl md:text-5xl">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="font-label-caps text-[10px] text-secondary">MINS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Matchday Navigation */}
      <div className="w-full border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-[80px] z-40">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6 flex overflow-x-auto scrollbar-hide gap-4 items-center">
          {MATCHDAYS.map(day => (
            <button 
              key={day}
              onClick={() => setActiveMatchday(day)}
              className={`whitespace-nowrap px-8 py-3 rounded-full font-label-caps text-xs tracking-widest transition-all ${
                activeMatchday === day 
                ? 'bg-secondary text-on-secondary font-bold shadow-[0_0_15px_rgba(233,195,73,0.4)]' 
                : 'border border-white/10 text-on-surface hover:text-white hover:border-secondary/50 bg-surface/40'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Filters Sidebar */}
        <div className="w-full lg:w-[280px] flex-shrink-0 flex flex-col gap-10 sticky top-[200px] h-fit fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="font-headline-md text-3xl text-secondary uppercase tracking-widest border-b border-white/10 pb-4 m-0">FILTERS</h3>
          
          {/* Team Search Filter */}
          <div className="flex flex-col gap-3">
            <label className="font-label-caps text-[10px] text-on-surface-variant tracking-widest">SEARCH TEAM</label>
            <div className="relative">
              <input 
                type="text"
                placeholder="e.g. Argentina"
                value={searchTeam}
                onChange={(e) => setSearchTeam(e.target.value)}
                className="w-full bg-surface-container/30 border border-white/10 text-white p-4 rounded font-label-caps tracking-widest text-xs focus:border-secondary focus:outline-none transition-colors"
              />
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">search</span>
            </div>
          </div>
          
          {/* Stadium Filter */}
          <div className="flex flex-col gap-3">
            <label className="font-label-caps text-[10px] text-on-surface-variant tracking-widest">STADIUM</label>
            <div className="relative">
              <select className="w-full bg-surface-container/30 border border-white/10 text-white p-4 rounded appearance-none font-label-caps tracking-widest text-xs focus:border-secondary focus:outline-none transition-colors">
                <option>All Stadiums</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
            </div>
          </div>

          {/* Group Filter */}
          <div className="flex flex-col gap-3">
            <label className="font-label-caps text-[10px] text-on-surface-variant tracking-widest">GROUP</label>
            <button 
              onClick={() => setActiveGroup('')}
              className={`w-full py-3 text-center rounded font-label-caps transition-all mb-1 ${
                activeGroup === '' 
                ? 'bg-secondary/20 text-secondary border border-secondary shadow-[0_0_10px_rgba(233,195,73,0.2)]' 
                : 'bg-surface-container/30 text-on-surface border border-white/5 hover:border-white/20 hover:bg-surface-container/50'
              }`}
            >
              ALL GROUPS
            </button>
            <div className="grid grid-cols-4 gap-2">
              {GROUPS.map(g => (
                <button 
                  key={g}
                  onClick={() => setActiveGroup(activeGroup === g ? '' : g)}
                  className={`py-3 text-center rounded font-label-caps transition-all ${
                    activeGroup === g 
                    ? 'bg-secondary/20 text-secondary border border-secondary shadow-[0_0_10px_rgba(233,195,73,0.2)]' 
                    : 'bg-surface-container/30 text-on-surface border border-white/5 hover:border-white/20 hover:bg-surface-container/50'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* City Filter */}
          <div className="flex flex-col gap-3">
            <label className="font-label-caps text-[10px] text-on-surface-variant tracking-widest">CITY</label>
            <div className="relative">
              <select className="w-full bg-surface-container/30 border border-white/10 text-white p-4 rounded appearance-none font-label-caps tracking-widest text-xs focus:border-secondary focus:outline-none transition-colors">
                <option>All Cities</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
            </div>
          </div>

          {/* Info Box */}
          <div className="border border-white/10 p-5 rounded-lg flex items-start gap-4 bg-surface-container-lowest/50">
            <span className="material-symbols-outlined text-secondary text-[20px]">info</span>
            <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
              All match times are shown in your local timezone.
            </p>
          </div>
        </div>

        {/* Matches Feed */}
        <div className="flex-grow flex flex-col gap-8 slide-up" style={{ animationDelay: '0.3s' }}>
          {Object.entries(matchesByDate).length === 0 ? (
            <div className="text-center py-20 text-on-surface-variant font-label-caps">No matches found for selected filters.</div>
          ) : (
            Object.entries(matchesByDate).map(([date, dayMatches]) => (
              <div key={date} className="flex flex-col">
                {formatDateHeader(date)}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {dayMatches.map(match => {
                    const homeTeam = teams[match.home_team_id];
                    const awayTeam = teams[match.away_team_id];
                    const stadium = stadiums[match.stadium_id];
                    const { mainTime, timeZoneAbbr, globalTime } = match._timeData || formatMatchTime(match.local_date, timezone, match.stadium_id);
                    
                    if (!homeTeam || !awayTeam || !stadium) return null;

                    return (
                      <div key={match.id} className="bg-surface-container/20 backdrop-blur-sm border border-white/5 rounded-2xl p-8 flex flex-col justify-between gap-8 hover:border-white/20 transition-all group relative overflow-hidden shadow-lg">
                        
                        {/* Top Row */}
                        <div className="flex justify-between items-start w-full z-10 gap-4 flex-wrap">
                          <div className="flex flex-col">
                            <span className="font-label-caps text-[10px] text-secondary tracking-widest mb-1">KICK-OFF</span>
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="font-headline-md text-3xl md:text-4xl text-white">
                                {mainTime} <span className="text-sm md:text-lg text-white/60 ml-1 font-label-caps">{timeZoneAbbr}</span>
                              </span>
                              <span className="font-label-caps text-[10px] text-on-surface-variant tracking-widest whitespace-nowrap">{globalTime}</span>
                            </div>
                          </div>
                          <span className="px-4 py-1.5 border border-white/10 rounded font-label-caps text-[10px] text-on-surface tracking-widest group-hover:border-secondary/50 group-hover:text-secondary transition-colors bg-surface-container-low/50 whitespace-nowrap">
                            GROUP {match.group}
                          </span>
                        </div>

                        {/* Middle Row (Teams) */}
                        <div className="flex items-center justify-between w-full z-10 my-4">
                          <div className="flex flex-col items-center gap-2 md:gap-4 flex-1 min-w-0">
                            <div className="w-12 h-8 md:w-20 md:h-14 rounded overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.4)] border border-white/5 shrink-0">
                              <img src={homeTeam.flag} alt={homeTeam.name_en} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <span className="font-headline-md text-sm md:text-xl text-white uppercase tracking-wider text-center break-words w-full px-1">{homeTeam.name_en}</span>
                          </div>
                          
                          {match.time_elapsed === 'notstarted' ? (
                            <span className="font-headline-md italic text-2xl md:text-3xl text-secondary/60 px-1 md:px-2 group-hover:text-secondary transition-colors shrink-0">VS</span>
                          ) : (
                            <div className="flex flex-col items-center shrink-0">
                              <span className="font-headline-md italic text-3xl md:text-4xl text-white px-1 md:px-2 group-hover:text-secondary transition-colors">
                                {match.home_score} - {match.away_score}
                              </span>
                              {match.time_elapsed === 'finished' ? (
                                <span className="font-label-caps text-[10px] text-white/50 tracking-widest mt-1">FT</span>
                              ) : (
                                <span className="font-label-caps text-[10px] text-secondary tracking-widest mt-1 uppercase animate-pulse">LIVE {match.time_elapsed}</span>
                              )}
                            </div>
                          )}
                          
                          <div className="flex flex-col items-center gap-2 md:gap-4 flex-1 min-w-0">
                            <div className="w-12 h-8 md:w-20 md:h-14 rounded overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.4)] border border-white/5 shrink-0">
                              <img src={awayTeam.flag} alt={awayTeam.name_en} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <span className="font-headline-md text-sm md:text-xl text-white uppercase tracking-wider text-center break-words w-full px-1">{awayTeam.name_en}</span>
                          </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full z-10 mt-2 gap-4">
                          <div className="flex items-start gap-2 w-full md:max-w-[50%] min-w-0">
                            <span className="material-symbols-outlined text-[16px] text-on-surface-variant pt-0.5 shrink-0">location_on</span>
                            <div className="flex flex-col min-w-0">
                              <span className="font-label-caps text-[10px] text-white/80 tracking-widest truncate">{stadium.name_en}</span>
                              <span className="font-label-caps text-[9px] text-on-surface-variant tracking-widest uppercase mt-0.5 truncate">{stadium.city_en}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-end">
                            <button 
                              onClick={() => toggleReminder(match.id, {
                                homeTeam: homeTeam.name_en,
                                awayTeam: awayTeam.name_en,
                                time: formatMatchTime(match.local_date, timezone, match.stadium_id).mainTime
                              })}
                              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                                hasReminder(match.id)
                                  ? 'bg-secondary text-on-secondary border-secondary'
                                  : 'bg-surface-container border-white/10 text-on-surface-variant hover:text-white hover:bg-white/5'
                              }`}
                              title={hasReminder(match.id) ? "Remove Alert" : "Set Alert"}
                            >
                              <span className="material-symbols-outlined text-[16px]">{hasReminder(match.id) ? 'notifications_active' : 'notifications'}</span>
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                                if (isMobile) {
                                  downloadICS(match, homeTeam, awayTeam, stadium, timezone);
                                } else {
                                  window.open(generateGoogleCalendarLink(match, homeTeam, awayTeam, stadium, timezone), '_blank');
                                }
                              }}
                              className="w-8 h-8 rounded-full bg-surface-container border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors"
                              title="Add to Calendar"
                            >
                              <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                            </button>
                            <Link to={`/matches/${match.id}`} className="font-label-caps text-[10px] text-secondary tracking-widest hover:text-white transition-all flex items-center gap-1 group-hover:gap-2 ml-2">
                              DETAIL <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>);
}
