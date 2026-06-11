import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Team, Stadium, Match } from '../services/api';
import { formatMatchTime } from '../utils/time';
import { useTimezone } from '../contexts/TimezoneContext';
import { useNotifications } from '../contexts/NotificationContext';
import { generateGoogleCalendarLink, downloadICS } from '../utils/calendar';



export default function MatchHub() {
  const { timezone } = useTimezone();
  const { hasReminder, toggleReminder } = useNotifications();
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Record<string, Team>>({});
  const [stadiums, setStadiums] = useState<Record<string, Stadium>>({});

  useEffect(() => {
    const fetchData = () => {
      Promise.all([
        api.getMatches(),
        api.getTeams(),
        api.getStadiums()
      ]).then(([matchesData, teamsData, stadiumsData]) => {
        setMatches(matchesData);
        
        const teamsMap: Record<string, Team> = {};
        teamsData.forEach((t: Team) => teamsMap[t.id] = t);
        setTeams(teamsMap);

        const stadiumsMap: Record<string, Stadium> = {};
        stadiumsData.forEach((s: Stadium) => stadiumsMap[s.id] = s);
        setStadiums(stadiumsMap);
      });
    };

    fetchData();

    // Background polling for live score updates
    const interval = setInterval(() => {
      api.getMatches().then(matchesData => setMatches(matchesData));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // For visual purposes in this prototype, let's artificially set Match 1 as live
  // and pull the next 3 matches as upcoming.
  const liveMatch = matches.find(m => m.id === "1");
  const upcomingMatches = matches.filter(m => ["2", "3", "4"].includes(m.id)).sort((a, b) => parseInt(a.id) - parseInt(b.id));

  if (!liveMatch || upcomingMatches.length === 0 || Object.keys(teams).length === 0 || Object.keys(stadiums).length === 0) {
    return <div className="flex-1 flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const liveHomeTeam = teams[liveMatch.home_team_id];
  const liveAwayTeam = teams[liveMatch.away_team_id];
  const liveStadium = stadiums[liveMatch.stadium_id];

  return (
    <section id="live" className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-20 flex flex-col gap-10 md:gap-16 pb-16 md:pb-24 min-h-[80vh]">
      {/* Hero Match Center Title */}
      <section className="flex flex-col gap-4">
        <h1 className="font-display-hero text-5xl md:text-display-hero text-on-surface">SMART MATCH HUB</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Real-time intelligence, immersive stadium views, and comprehensive match data for the ultimate FIFA World Cup 2026 experience.
        </p>
      </section>

      {/* Bento Grid Layout for Matches */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        
        {/* Live Featured Match */}
        <article className="md:col-span-8 rounded-xl overflow-hidden relative group h-full flex flex-col">
          <img 
            alt="Stadium Background" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXkkAaQbWDbgKNrizcJ2mE49D1d2SP54LyZanSbUT66UBTiG92BQOIm1_5MfAeiZIrVVDXDQb4GaroQuG02Sg5ZMT5OrvtRReQIu_b-mhler-lQluYdRB5kLSWddbi1-X_zZw-llNXGKX2r_XUaQx409C8JuujniXBaQVtRZhzOPv3Mo1xb25a9JuNFNTEG-K4vT7e_7WTx-NDOODfR20LXqWoM6HMgEVun8UvxzDSFSJCRSUAjLa-eWqt-siyBsGcQS-DjHbdXdk"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent z-10"></div>
          
          <div className="relative z-20 flex flex-col justify-between p-4 sm:p-8 gap-8 flex-grow">
            <div className="flex justify-between items-start">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 border border-white/20 rounded-full font-label-caps text-label-caps text-on-surface flex items-center gap-2 bg-surface/40 backdrop-blur-md text-secondary">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span> UPCOMING
                </span>
                <span className="px-3 py-1 border border-white/20 rounded-full font-label-caps text-label-caps text-on-surface bg-surface/40 backdrop-blur-md uppercase">
                  {liveMatch.type}
                </span>
              </div>
              <div className="text-right hidden sm:block">
                <p className="font-label-caps text-label-caps text-secondary uppercase">{liveStadium.name_en}</p>
                <p className="font-body-md text-body-md text-on-surface-variant">{liveStadium.city_en}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-12 w-full mt-4 sm:mt-0 shrink-0">
              {/* Team A */}
              <div className="flex flex-col items-center gap-2 sm:gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border-2 border-secondary overflow-hidden shadow-[0_0_20px_rgba(233,195,73,0.3)] bg-surface-container shrink-0">
                  <img alt={liveHomeTeam.name_en} className="w-full h-full object-cover" src={liveHomeTeam.flag} />
                </div>
                <h2 className="font-headline-md text-[10px] sm:text-base lg:text-headline-md text-on-surface text-center uppercase w-full px-0 sm:px-1 leading-tight">{liveHomeTeam.name_en}</h2>
              </div>
              
              {/* Score / Time */}
              <div className="flex flex-col items-center shrink-0 px-1 lg:px-4">
                <div className="font-display-hero text-2xl sm:text-4xl lg:text-5xl text-secondary text-glow tracking-widest flex flex-col items-center leading-none text-center">
                  {liveMatch.time_elapsed === 'notstarted' ? (
                    <>
                      <span>{formatMatchTime(liveMatch.local_date, timezone, liveMatch.stadium_id).mainTime}</span>
                      <span className="text-sm sm:text-xl lg:text-2xl opacity-70 font-label-caps mt-1 md:mt-2">{formatMatchTime(liveMatch.local_date, timezone, liveMatch.stadium_id).timeZoneAbbr}</span>
                    </>
                  ) : (
                    `${liveMatch.home_score} - ${liveMatch.away_score}`
                  )}
                </div>
                {liveMatch.time_elapsed === 'notstarted' ? (
                  <div className="font-label-caps text-[8px] sm:text-xs text-white/50 tracking-[0.2em] mt-1 sm:mt-2 text-center">
                    {formatMatchTime(liveMatch.local_date, timezone, liveMatch.stadium_id).globalTime}
                  </div>
                ) : (
                  <div className="font-label-caps text-[8px] sm:text-xs text-white/80 tracking-[0.2em] mt-1 sm:mt-2 text-center uppercase">
                    {liveMatch.time_elapsed === 'finished' ? 'FULL TIME' : `LIVE ${liveMatch.time_elapsed}`}
                  </div>
                )}
              </div>

              {/* Team B */}
              <div className="flex flex-col items-center gap-2 sm:gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border-2 border-white/20 overflow-hidden bg-surface-container shrink-0">
                  <img alt={liveAwayTeam.name_en} className="w-full h-full object-cover" src={liveAwayTeam.flag} />
                </div>
                <h2 className="font-headline-md text-[10px] sm:text-base lg:text-headline-md text-on-surface text-center uppercase w-full px-0 sm:px-1 leading-tight">{liveAwayTeam.name_en}</h2>
              </div>
            </div>

            {/* Live Stats Area */}
            <div className="flex-grow flex flex-col items-center justify-center p-6 border border-white/5 rounded-xl bg-surface/20 backdrop-blur-sm mx-0 sm:mx-12 my-2 min-h-[120px]">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-secondary text-xl sm:text-2xl" style={{ fontVariationSettings: "'FILL' 0" }}>sports_soccer</span>
                <p className="font-label-caps text-xs sm:text-sm text-secondary uppercase tracking-widest">Match Statistics</p>
              </div>

              {liveMatch.time_elapsed === 'notstarted' ? (
                <p className="font-body-sm text-[10px] sm:text-xs text-on-surface-variant text-center max-w-md px-4 leading-relaxed">
                  Real-time match events, goal scorers, and statistics will dynamically populate here once the match kicks off.
                </p>
              ) : (
                <div className="w-full flex justify-between gap-2 sm:gap-8 max-w-2xl">
                  {/* Home Scorers */}
                  <div className="flex-1 flex flex-col items-end gap-2">
                    {(!liveMatch.home_scorers || liveMatch.home_scorers === 'null' || liveMatch.home_scorers.trim() === '') ? (
                      <span className="text-[10px] sm:text-xs text-white/30 font-label-caps tracking-widest uppercase">No Goals</span>
                    ) : (
                      liveMatch.home_scorers.split(',').map((scorer, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px] sm:text-xs text-white/90 bg-white/5 px-2 sm:px-3 py-1.5 rounded border border-white/5">
                          <span className="font-body-sm whitespace-nowrap">{scorer.trim()}</span>
                          <span className="material-symbols-outlined text-[12px] sm:text-[14px] text-secondary">sports_soccer</span>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="w-px bg-white/10 shrink-0"></div>
                  
                  {/* Away Scorers */}
                  <div className="flex-1 flex flex-col items-start gap-2">
                    {(!liveMatch.away_scorers || liveMatch.away_scorers === 'null' || liveMatch.away_scorers.trim() === '') ? (
                      <span className="text-[10px] sm:text-xs text-white/30 font-label-caps tracking-widest uppercase">No Goals</span>
                    ) : (
                      liveMatch.away_scorers.split(',').map((scorer, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px] sm:text-xs text-white/90 bg-white/5 px-2 sm:px-3 py-1.5 rounded border border-white/5">
                          <span className="material-symbols-outlined text-[12px] sm:text-[14px] text-secondary">sports_soccer</span>
                          <span className="font-body-sm whitespace-nowrap">{scorer.trim()}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-auto shrink-0">
              <Link to={`/matches/${liveMatch.id}`} className="flex items-center gap-2 bg-surface/40 backdrop-blur-md px-6 py-3 rounded-full hover:bg-white/10 border border-white/10 transition-colors">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 0" }}>visibility</span>
                <span className="font-label-caps text-label-caps text-on-surface">Match Preview</span>
              </Link>
            </div>
          </div>
        </article>

        {/* Upcoming Matches List */}
        <article className="md:col-span-4 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-headline-md text-xl text-white uppercase">Upcoming Fixtures</h3>
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 0" }}>calendar_month</span>
          </div>

          <div className="flex flex-col gap-4 flex-grow">
            {upcomingMatches.map((match) => {
              const homeTeam = teams[match.home_team_id];
              const awayTeam = teams[match.away_team_id];
              const stadium = stadiums[match.stadium_id];
              const { mainTime, timeZoneAbbr, globalTime } = formatMatchTime(match.local_date, timezone, match.stadium_id);
              const date = match.local_date.split(' ')[0];

              return (
                <div key={match.id} className="bg-surface/40 backdrop-blur-2xl rounded-xl p-4 flex flex-col border border-white/5 hover:border-secondary/30 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-4">
                    <span className="font-label-caps text-xs text-secondary uppercase">Match {match.id} • {date}</span>
                    <span className="font-label-caps text-xs text-on-surface-variant uppercase">{stadium.name_en}</span>
                  </div>
                  
                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-2">
                        <img alt={homeTeam.name_en} className="w-8 h-6 rounded object-cover shadow-sm group-hover:scale-110 transition-transform shrink-0" src={homeTeam.flag} />
                        <span className="font-headline-md text-base text-white">{homeTeam.fifa_code}</span>
                      </div>
                      
                      <span className="font-label-caps text-xs text-white/30 px-2">VS</span>

                      <div className="flex items-center gap-2 flex-row-reverse">
                        <img alt={awayTeam.name_en} className="w-8 h-6 rounded object-cover shadow-sm group-hover:scale-110 transition-transform shrink-0" src={awayTeam.flag} />
                        <span className="font-headline-md text-base text-white">{awayTeam.fifa_code}</span>
                      </div>
                    </div>
                    
                    <div className="text-center bg-black/30 px-3 py-2 rounded-lg flex flex-col items-center">
                      <span className="font-display-hero text-lg lg:text-xl text-secondary">
                        {mainTime} <span className="text-[10px] opacity-70 ml-1 font-label-caps">{timeZoneAbbr}</span>
                      </span>
                      <span className="font-label-caps text-[9px] text-white/50 tracking-widest mt-1">{globalTime}</span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-white/5">
                    <button 
                      onClick={() => toggleReminder(match.id, {
                        homeTeam: homeTeam.name_en,
                        awayTeam: awayTeam.name_en,
                        time: mainTime
                      })}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${hasReminder(match.id) ? 'bg-secondary text-on-secondary shadow-[0_0_10px_rgba(233,195,73,0.5)]' : 'bg-surface-container border border-white/10 text-on-surface-variant hover:text-white'}`}
                      title={hasReminder(match.id) ? "Remove Alert" : "Set Reminder"}
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
                    <Link to={`/matches/${match.id}`} className="w-8 h-8 rounded-full bg-surface-container border border-white/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-on-secondary transition-colors" title="Match Detail">
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <Link to="/fixtures" className="w-full mt-auto bg-surface-container/50 border border-secondary text-secondary font-label-caps text-sm py-4 rounded-xl hover:bg-secondary hover:text-on-secondary hover:shadow-[0_0_20px_rgba(233,195,73,0.3)] transition-all flex justify-center items-center gap-2">
            VIEW ALL FIXTURES
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </article>

      </section>
    </section>
  );
}
