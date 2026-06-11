import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, type Match, type Team, type Stadium } from '../services/api';
import { formatMatchTime } from '../utils/time';
import { useTimezone } from '../contexts/TimezoneContext';

export default function MatchDetails() {
  const { timezone } = useTimezone();
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [homeTeam, setHomeTeam] = useState<Team | null>(null);
  const [awayTeam, setAwayTeam] = useState<Team | null>(null);
  const [stadium, setStadium] = useState<Stadium | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.all([
      api.getMatches(),
      api.getTeams(),
      api.getStadiums()
    ]).then(([matchesData, teamsData, stadiumsData]) => {
      const currentMatch = matchesData.find((m: Match) => m.id === id);
      if (currentMatch) {
        setMatch(currentMatch);
        setHomeTeam(teamsData.find((t: Team) => t.id === currentMatch.home_team_id) || null);
        setAwayTeam(teamsData.find((t: Team) => t.id === currentMatch.away_team_id) || null);
        setStadium(stadiumsData.find((s: Stadium) => s.id === currentMatch.stadium_id) || null);
      }
      setLoading(false);
    });

    // Background polling for live score updates
    const interval = setInterval(() => {
      api.getMatches().then(matchesData => {
        const currentMatch = matchesData.find((m: Match) => m.id === id);
        if (currentMatch) setMatch(currentMatch);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div></div>;
  if (!match || !homeTeam || !awayTeam) return <div className="min-h-screen flex items-center justify-center font-label-caps tracking-widest text-on-surface-variant">Match not found.</div>;

  const isUpcoming = match.time_elapsed === 'notstarted';
  const { mainTime, timeZoneAbbr, globalTime } = formatMatchTime(match.local_date, timezone, match.stadium_id);

  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXkkAaQbWDbgKNrizcJ2mE49D1d2SP54LyZanSbUT66UBTiG92BQOIm1_5MfAeiZIrVVDXDQb4GaroQuG02Sg5ZMT5OrvtRReQIu_b-mhler-lQluYdRB5kLSWddbi1-X_zZw-llNXGKX2r_XUaQx409C8JuujniXBaQVtRZhzOPv3Mo1xb25a9JuNFNTEG-K4vT7e_7WTx-NDOODfR20LXqWoM6HMgEVun8UvxzDSFSJCRSUAjLa-eWqt-siyBsGcQS-DjHbdXdk"
          alt="Stadium"
          className="w-full h-full object-cover opacity-20 blur-md"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface to-surface"></div>
      </div>

      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10">
        
        <Link to="/fixtures" className="inline-flex items-center gap-2 font-label-caps text-on-surface-variant hover:text-white transition-colors mb-8 profile-reveal text-[10px] md:text-xs">
          <span className="material-symbols-outlined text-[16px] md:text-[18px]">arrow_back</span>
          <span>BACK TO FIXTURES</span>
        </Link>

        {/* Match Header Hero */}
        <div className="bg-surface-container/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-16 mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] profile-reveal">
          <div className="flex flex-col items-center gap-4 mb-8 md:mb-12">
            {isUpcoming ? (
               <span className="px-4 py-1.5 border border-white/20 rounded-full font-label-caps text-xs text-on-surface flex items-center gap-2 bg-surface/40 backdrop-blur-md">
                 <span className="material-symbols-outlined text-[14px]">calendar_today</span> UPCOMING
               </span>
            ) : (
               <span className="px-4 py-1.5 border border-error/50 rounded-full font-label-caps text-xs text-error flex items-center gap-2 bg-error/10">
                 <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span> {match.time_elapsed === 'finished' ? 'FULL TIME' : `LIVE ${match.time_elapsed}`}
               </span>
            )}
            
            {stadium && (
              <div className="text-center mt-2">
                <p className="font-label-caps tracking-widest text-secondary text-[10px] md:text-xs">{stadium.name_en}</p>
                <p className="font-body-md text-on-surface-variant uppercase text-[10px] md:text-xs mt-1">{stadium.city_en}</p>
              </div>
            )}

            {isUpcoming && (
              <div className="flex flex-col items-center mt-2">
                <span className="font-display-hero text-2xl md:text-3xl text-white">
                  {mainTime} <span className="text-sm md:text-lg text-white/70 ml-1 font-label-caps">{timeZoneAbbr}</span>
                </span>
                <span className="font-label-caps text-[10px] text-white/50 tracking-[0.2em] mt-1">{globalTime}</span>
              </div>
            )}
          </div>

          <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 md:gap-16 w-full">
            {/* Home Team */}
            <div className="flex flex-col items-center gap-2 md:gap-6 flex-1 w-full md:w-auto min-w-0">
              <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-40 md:h-40 rounded-full overflow-hidden shadow-2xl border-2 md:border-4 border-white/10 bg-surface-container transition-transform hover:scale-105 duration-300 shrink-0">
                <img src={homeTeam.flag} alt={homeTeam.name_en} className="w-full h-full object-cover" />
              </div>
              <h2 className="font-display-hero text-sm sm:text-3xl md:text-5xl uppercase tracking-tighter text-center truncate w-full px-1">{homeTeam.name_en}</h2>
            </div>
            
            {/* Score or VS */}
            <div className="flex flex-col items-center justify-center shrink-0 mb-0">
              <div className="font-display-hero text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-secondary text-glow tracking-widest px-2">
                {isUpcoming ? 'VS' : `${match.home_score} - ${match.away_score}`}
              </div>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center gap-2 md:gap-6 flex-1 w-full md:w-auto min-w-0">
              <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-40 md:h-40 rounded-full overflow-hidden shadow-2xl border-2 md:border-4 border-white/10 bg-surface-container transition-transform hover:scale-105 duration-300 shrink-0">
                <img src={awayTeam.flag} alt={awayTeam.name_en} className="w-full h-full object-cover" />
              </div>
              <h2 className="font-display-hero text-sm sm:text-3xl md:text-5xl uppercase tracking-tighter text-center truncate w-full px-1">{awayTeam.name_en}</h2>
            </div>
          </div>

          {/* Goalscorers */}
          {!isUpcoming && (
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 mt-8 md:mt-12 w-full px-4 pt-6 border-t border-white/5">
              <div className="flex-1 text-center md:text-right font-body-md text-sm md:text-base text-on-surface-variant flex flex-col gap-1">
                {match.home_scorers && match.home_scorers !== "null" && match.home_scorers.trim() !== "" && match.home_scorers.split(',').map((scorer, i) => (
                  <span key={i}><span className="text-secondary mr-2">⚽</span>{scorer.trim()}</span>
                ))}
              </div>
              <div className="hidden md:block w-px h-8 bg-white/10"></div>
              <div className="flex-1 text-center md:text-left font-body-md text-sm md:text-base text-on-surface-variant flex flex-col gap-1">
                {match.away_scorers && match.away_scorers !== "null" && match.away_scorers.trim() !== "" && match.away_scorers.split(',').map((scorer, i) => (
                  <span key={i}><span className="text-secondary mr-2">⚽</span>{scorer.trim()}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Stats & Insights Grid */}
        <div className="w-full">
          {isUpcoming ? (
            <div className="w-full text-center p-8 md:py-24 bg-surface-container/20 backdrop-blur-md rounded-2xl border border-white/5 profile-reveal" style={{ animationDelay: '0.1s' }}>
              <span className="material-symbols-outlined text-4xl md:text-5xl text-secondary mb-6 opacity-80" style={{ fontVariationSettings: "'FILL' 0" }}>analytics</span>
              <h3 className="font-display-hero text-2xl md:text-3xl text-white mb-4 uppercase tracking-wider">Live Match Data</h3>
              <p className="font-body-md text-sm md:text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed">
                Advanced match statistics, AI-powered tactical insights, and the live event timeline will be populated here automatically via the tournament API once this match kicks off.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Advanced Stats */}
              <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8 profile-reveal" style={{ animationDelay: '0.1s' }}>
                <h3 className="font-display-hero text-2xl md:text-3xl uppercase tracking-tighter text-white border-b border-white/10 pb-4">Match Statistics</h3>
                
                <div className="bg-surface-container/40 border border-white/5 rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col gap-6 md:gap-8 overflow-hidden">
                  {/* These would normally map over real stats from the API */}
                  <StatBar label="Possession" leftValue="55%" rightValue="45%" leftPercent={55} isSecondary={true} />
                  <StatBar label="Expected Goals (xG)" leftValue="1.84" rightValue="0.92" leftPercent={66} />
                  <StatBar label="Shots on Target" leftValue="6" rightValue="3" leftPercent={66} />
                  <StatBar label="Pass Accuracy" leftValue="88%" rightValue="82%" leftPercent={51} />
                  <StatBar label="Distance (km)" leftValue="98.4" rightValue="102.1" leftPercent={49} />
                </div>
              </div>

              {/* AI Insights & Timeline */}
              <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8 profile-reveal" style={{ animationDelay: '0.2s' }}>
                <h3 className="font-display-hero text-2xl md:text-3xl uppercase tracking-tighter text-secondary border-b border-secondary/20 pb-4">Smart Insights</h3>
                
                <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_0_30px_rgba(233,195,73,0.05)]">
                  <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                    <span className="material-symbols-outlined text-secondary text-2xl md:text-3xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>neurology</span>
                    <div>
                      <h4 className="font-headline-md text-lg md:text-xl text-white mb-2">Tactical Shift</h4>
                      <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
                        {homeTeam.name_en} has drastically shifted to a high-pressing 4-3-3 formation in the second half, heavily overloading the left flank. This has resulted in a 30% increase in final third entries over the last 15 minutes, directly leading to their second goal.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <span className="material-symbols-outlined text-secondary text-2xl md:text-3xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>moving</span>
                    <div>
                      <h4 className="font-headline-md text-lg md:text-xl text-white mb-2">Momentum Tracker</h4>
                      <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
                        {awayTeam.name_en} is struggling to break out of their own half. Their pass completion rate under pressure has dropped from 85% to 62%. They urgently need midfield substitutions to regain control.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mock Timeline */}
                <h3 className="font-display-hero text-2xl md:text-3xl uppercase tracking-tighter text-white border-b border-white/10 pb-4 mt-2 md:mt-4">Key Events</h3>
                <div className="bg-surface-container/40 border border-white/5 rounded-2xl p-4 sm:p-6 flex flex-col gap-6 relative">
                  <div className="absolute left-[31px] sm:left-[39px] top-6 bottom-6 w-[2px] bg-white/10"></div>
                  
                  <TimelineEvent minute="14'" icon="sports_soccer" text={`Goal! ${awayTeam.name_en} takes the early lead.`} isGoal={true} />
                  <TimelineEvent minute="32'" icon="style" text="Yellow card issued for a late challenge." color="text-yellow-400" />
                  <TimelineEvent minute="45+2'" icon="sports_soccer" text={`Goal! ${homeTeam.name_en} equalizes.`} isGoal={true} />
                  <TimelineEvent minute="68'" icon="sports_soccer" text={`Goal! ${homeTeam.name_en} comeback!`} isGoal={true} />
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// Helper Components

interface StatBarProps {
  label: string;
  leftValue: string | number;
  rightValue: string | number;
  leftPercent: number;
  isSecondary?: boolean;
}
function StatBar({ label, leftValue, rightValue, leftPercent, isSecondary = false }: StatBarProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between font-label-caps text-[10px] md:text-xs">
        <span className={isSecondary ? "text-secondary font-bold" : "text-white"}>{leftValue}</span>
        <span className="text-on-surface-variant tracking-[0.1em] text-center px-2 truncate max-w-[50%]">{label}</span>
        <span className={!isSecondary ? "text-white" : "text-white"}>{rightValue}</span>
      </div>
      <div className="w-full h-1.5 md:h-2 rounded-full bg-white/10 flex overflow-hidden">
        <div className={`h-full ${isSecondary ? 'bg-secondary' : 'bg-white'}`} style={{ width: `${leftPercent}%` }}></div>
        <div className="h-full bg-transparent" style={{ width: '2px' }}></div>
        <div className="h-full bg-white/20 flex-grow"></div>
      </div>
    </div>
  );
}

interface TimelineEventProps {
  minute: string;
  icon: string;
  text: string;
  isGoal?: boolean;
  color?: string;
}
function TimelineEvent({ minute, icon, text, isGoal = false, color = "text-white" }: TimelineEventProps) {
  return (
    <div className="flex items-start sm:items-center gap-3 sm:gap-4 relative z-10">
      <div className="w-8 sm:w-12 font-label-caps text-[10px] sm:text-xs text-on-surface-variant text-right pt-1 sm:pt-0 shrink-0">{minute}</div>
      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${isGoal ? 'bg-secondary text-surface' : 'bg-surface border border-white/20 ' + color}`}>
        <span className="material-symbols-outlined text-[12px] sm:text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
      </div>
      <div className={`font-body-md text-xs sm:text-sm pt-0.5 sm:pt-0 ${isGoal ? 'text-secondary font-bold' : 'text-on-surface-variant'}`}>{text}</div>
    </div>
  );
}
