import React, { useEffect, useState } from 'react';
import { api, type Match, type Team } from '../services/api';

interface MatchNodeProps {
  team1: string;
  team2: string;
  score1?: string | number | null;
  score2?: string | number | null;
  label?: string;
}

const MatchNode = ({ team1, team2, score1 = null, score2 = null, label = '' }: MatchNodeProps) => {
  const isTBD1 = team1 === 'TBD' || !team1 || team1.includes('Winner') || team1.includes('Runner-up') || team1.includes('3rd') || team1.includes('Loser');
  const isTBD2 = team2 === 'TBD' || !team2 || team2.includes('Winner') || team2.includes('Runner-up') || team2.includes('3rd') || team2.includes('Loser');

  return (
    <div className={`bg-surface-container/60 backdrop-blur-xl border border-white/10 rounded-lg p-1 md:p-1.5 lg:p-2 relative shadow-[0_4px_20px_rgba(0,0,0,0.3)] w-[90px] md:w-full md:max-w-[100px] lg:max-w-[120px] xl:max-w-[140px] transition-transform hover:scale-105 z-10 mx-auto ${label ? 'mt-4' : ''}`}>
      {label && <div className="absolute -top-4 left-0 w-full text-center font-label-caps text-[8px] md:text-[9px] text-secondary tracking-widest">{label}</div>}
      
      <div className="flex justify-between items-center mb-1">
        <span className={`font-label-caps text-[8px] md:text-[9px] xl:text-xs ${score1 !== null && score2 !== null && score1 > score2 ? 'text-secondary font-bold' : (isTBD1 ? 'text-on-surface-variant/70' : 'text-on-surface')} truncate max-w-[70%]`} title={team1}>{team1}</span>
        <span className={`font-headline-md text-[9px] md:text-[10px] xl:text-xs ${score1 !== null && score2 !== null && score1 > score2 ? 'text-secondary' : 'text-on-surface'}`}>{score1 !== null ? score1 : '-'}</span>
      </div>
      <div className={`flex justify-between items-center ${score2 !== null && score1 !== null && score2 < score1 ? 'opacity-50' : ''}`}>
        <span className={`font-label-caps text-[8px] md:text-[9px] xl:text-xs ${score1 !== null && score2 !== null && score2 > score1 ? 'text-secondary font-bold' : (isTBD2 ? 'text-on-surface-variant/70' : 'text-on-surface')} truncate max-w-[70%]`} title={team2}>{team2}</span>
        <span className={`font-headline-md text-[9px] md:text-[10px] xl:text-xs ${score1 !== null && score2 !== null && score2 > score1 ? 'text-secondary' : 'text-on-surface'}`}>{score2 !== null ? score2 : '-'}</span>
      </div>
    </div>
  );
};

const NodeGroup = ({ children, isRight = false }: { children: React.ReactNode, isRight?: boolean }) => {
  return (
    <div className="relative flex flex-col justify-around h-full w-full flex-1 min-h-[80px]">
      {children}
      {/* SVG-like CSS connecting bracket */}
      <div className={`absolute top-[25%] bottom-[25%] w-2 md:w-4 lg:w-6 xl:w-8 border-secondary/40 z-0 pointer-events-none 
        ${isRight 
          ? 'left-[-2px] md:left-[-4px] lg:left-[-6px] xl:left-[-8px] border-l border-t border-b rounded-l-sm' 
          : 'right-[-2px] md:right-[-4px] lg:right-[-6px] xl:right-[-8px] border-r border-t border-b rounded-r-sm'}`}
      >
        <div className={`absolute top-1/2 w-2 md:w-4 lg:w-6 xl:w-8 border-t border-secondary/40 
          ${isRight ? 'left-[-100%]' : 'right-[-100%]'}`}>
        </div>
      </div>
    </div>
  );
};

export default function Bracket() {
  const [matches, setMatches] = useState<Record<string, Match>>({});
  const [teams, setTeams] = useState<Record<string, Team>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [matchesData, teamsData] = await Promise.all([
          api.getMatches(),
          api.getTeams()
        ]);
        const matchMap: Record<string, Match> = {};
        matchesData.forEach((m: Match) => {
          matchMap[m.id] = m;
        });
        const teamMap: Record<string, Team> = {};
        teamsData.forEach((t: Team) => {
          teamMap[t.id] = t;
        });
        setMatches(matchMap);
        setTeams(teamMap);
      } catch (e) {
        console.error("Failed to load bracket data", e);
      }
    };
    fetchData();

    // Poll matches every 15 seconds for dynamic progression updates
    const interval = setInterval(() => {
      api.getMatches().then((matchesData) => {
        const matchMap: Record<string, Match> = {};
        matchesData.forEach((m: Match) => {
          matchMap[m.id] = m;
        });
        setMatches(matchMap);
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getTeamLabel = (teamId: string | undefined, placeholder: string) => {
    if (!teamId || teamId === '0' || !teams[teamId]) {
      // Don't show Match markings in the bracket before teams are decided, just TBD
      if (placeholder.includes('Match')) return 'TBD';
      
      // Abbreviate the API placeholders for UI fit for group stages
      return placeholder
        .replace('Runner-up', '2nd')
        .replace('Winner', '1st')
        .replace('Group ', 'Gp ');
    }
    return teams[teamId].fifa_code || teams[teamId].name_en;
  };

  const getMatchProps = (id: string, ph1: string, ph2: string, label: string = '') => {
    const match = matches[id];
    if (!match) return { team1: ph1, team2: ph2, score1: null, score2: null, label };
    
    // Some matches might have empty scores '' if not played
    const score1 = match.home_score !== '' && match.home_score !== null ? parseInt(match.home_score) : null;
    const score2 = match.away_score !== '' && match.away_score !== null ? parseInt(match.away_score) : null;
    
    // API provides home_team_label and away_team_label for TBD teams
    const team1Label = getTeamLabel(match.home_team_id, match.home_team_label || ph1);
    const team2Label = getTeamLabel(match.away_team_id, match.away_team_label || ph2);

    return {
      team1: team1Label,
      team2: team2Label,
      score1,
      score2,
      label
    };
  };

  const getFinalProps = () => {
    const match = matches['104'];
    if (!match) return { team1: 'TBD', team2: 'TBD', date: 'JULY 19, 2026' };

    const team1Label = getTeamLabel(match.home_team_id, match.home_team_label || 'TBD');
    const team2Label = getTeamLabel(match.away_team_id, match.away_team_label || 'TBD');

    return {
      team1: team1Label,
      team2: team2Label,
      date: match.local_date ? match.local_date.split(' ')[0] : 'JULY 19, 2026'
    };
  };

  const finalProps = getFinalProps();

  return (
    <section id="bracket" className="flex-grow flex flex-col items-center justify-center pt-20 pb-10 px-4 md:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-5">
        <img 
          alt="Background Emblem" 
          className="h-[150%] object-cover blur-sm" 
          src="/world cup/2026_FIFA_World_Cup_emblem.svg.webp"
        />
      </div>
      
      <div className="text-center mb-16 relative z-10 profile-reveal">
        <h1 className="font-display-hero text-5xl md:text-7xl text-secondary shadow-glow mb-4 uppercase">The Pinnacle</h1>
        <p className="font-label-caps text-sm md:text-base text-on-surface-variant tracking-[0.2em] uppercase">Expanded 48-Team Knockout Stage</p>
      </div>
      
      {/* Draggable/Scrollable Container */}
      <div className="w-full max-w-[100vw] overflow-x-auto pb-4 custom-scrollbar relative z-10 profile-reveal flex justify-start md:justify-center md:overflow-x-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="min-w-[1000px] md:min-w-0 w-full flex justify-between items-stretch py-8 px-2 md:px-4 max-w-[1600px] mx-auto gap-0.5 md:gap-1 lg:gap-2 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
          
          {/* LEFT WING */}
          <div className="flex w-[40%] justify-between relative">
            {/* R32 - 8 Matches */}
            <div className="flex flex-col justify-around items-end w-[25%] pr-2 md:pr-4 lg:pr-6 xl:pr-8 relative z-10">
              <NodeGroup>
                <MatchNode {...getMatchProps('74', '1st Gp E', '3rd A/B/C/D/F', 'R32')} />
                <MatchNode {...getMatchProps('77', '1st Gp I', '3rd C/D/F/G/H')} />
              </NodeGroup>
              <NodeGroup>
                <MatchNode {...getMatchProps('73', '2nd Gp A', '2nd Gp B')} />
                <MatchNode {...getMatchProps('75', '1st Gp F', '2nd Gp C')} />
              </NodeGroup>
              <NodeGroup>
                <MatchNode {...getMatchProps('83', '2nd Gp K', '2nd Gp L')} />
                <MatchNode {...getMatchProps('84', '1st Gp H', '2nd Gp J')} />
              </NodeGroup>
              <NodeGroup>
                <MatchNode {...getMatchProps('81', '1st Gp D', '3rd B/E/F/I/J')} />
                <MatchNode {...getMatchProps('82', '1st Gp G', '3rd A/E/H/I/J')} />
              </NodeGroup>
            </div>

            {/* R16 - 4 Matches */}
            <div className="flex flex-col justify-around items-end w-[25%] pr-2 md:pr-4 lg:pr-6 xl:pr-8 relative z-10">
              <NodeGroup>
                <MatchNode {...getMatchProps('89', 'TBD', 'TBD', 'R16')} />
                <MatchNode {...getMatchProps('90', 'TBD', 'TBD')} />
              </NodeGroup>
              <NodeGroup>
                <MatchNode {...getMatchProps('93', 'TBD', 'TBD')} />
                <MatchNode {...getMatchProps('94', 'TBD', 'TBD')} />
              </NodeGroup>
            </div>

            {/* QF - 2 Matches */}
            <div className="flex flex-col justify-around items-end w-[25%] pr-2 md:pr-4 lg:pr-6 xl:pr-8 relative z-10">
              <NodeGroup>
                <MatchNode {...getMatchProps('97', 'TBD', 'TBD', 'QF')} />
                <MatchNode {...getMatchProps('98', 'TBD', 'TBD')} />
              </NodeGroup>
            </div>

            {/* SF - 1 Match */}
            <div className="flex flex-col justify-center items-end w-[25%] pr-2 md:pr-4 lg:pr-6 xl:pr-8 relative z-10">
              <div className="relative w-full flex flex-col items-end">
                <MatchNode {...getMatchProps('101', 'TBD', 'TBD', 'SF')} />
                {/* Final line to center */}
                <div className="absolute top-1/2 w-2 md:w-4 lg:w-6 xl:w-8 border-t border-secondary/40 right-[-2px] md:right-[-4px] lg:right-[-6px] xl:right-[-8px] z-0 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* CENTER WING - FINAL */}
          <div className="flex flex-col items-center justify-center w-[20%] relative z-20 px-1 lg:px-4 shrink-0">
            <div className="relative flex flex-col items-center justify-center p-2 md:p-4 lg:p-6 bg-surface-container-lowest/90 backdrop-blur-2xl rounded-2xl border-2 border-secondary shadow-[0_0_80px_rgba(233,195,73,0.3)] w-[120px] md:w-full md:max-w-[180px] lg:max-w-[220px]">
              <img 
                alt="World Cup Emblem" 
                className="h-16 md:h-24 lg:h-32 object-contain mb-2 md:mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-110 transition-transform duration-700" 
                src="/world cup/2026_FIFA_World_Cup_emblem.svg.webp"
              />
              <h2 className="font-headline-lg text-lg md:text-2xl lg:text-3xl text-secondary mb-2 md:mb-4 text-center tracking-tighter">FINAL</h2>
              <div className="flex items-center gap-2 w-full justify-between">
                <div className="text-center flex-1">
                  <span className={`font-headline-md text-sm md:text-lg lg:text-xl block mb-1 truncate ${finalProps.team1 === 'TBD' || finalProps.team1.includes('M') ? 'text-on-surface-variant/70' : 'text-on-surface'}`} title={finalProps.team1}>{finalProps.team1}</span>
                </div>
                <span className="font-label-caps text-[8px] md:text-[10px] text-secondary/70 bg-secondary/10 px-1 md:px-2 py-0.5 md:py-1 rounded-full">VS</span>
                <div className="text-center flex-1">
                  <span className={`font-headline-md text-sm md:text-lg lg:text-xl block mb-1 truncate ${finalProps.team2 === 'TBD' || finalProps.team2.includes('M') ? 'text-on-surface-variant/70' : 'text-on-surface'}`} title={finalProps.team2}>{finalProps.team2}</span>
                </div>
              </div>
              <div className="mt-4 md:mt-6 font-label-caps text-[8px] md:text-[10px] text-secondary text-center tracking-widest border border-secondary/30 px-2 md:px-4 py-1 md:py-2 rounded-full bg-secondary/5 whitespace-nowrap">
                {finalProps.date}
              </div>
            </div>
          </div>

          {/* RIGHT WING */}
          <div className="flex w-[40%] justify-between relative flex-row-reverse">
            {/* R32 - 8 Matches */}
            <div className="flex flex-col justify-around items-start w-[25%] pl-2 md:pl-4 lg:pl-6 xl:pl-8 relative z-10">
              <NodeGroup isRight={true}>
                <MatchNode {...getMatchProps('76', '1st Gp C', '2nd Gp F', 'R32')} />
                <MatchNode {...getMatchProps('78', '2nd Gp E', '2nd Gp I')} />
              </NodeGroup>
              <NodeGroup isRight={true}>
                <MatchNode {...getMatchProps('79', '1st Gp A', '3rd C/E/F/H/I')} />
                <MatchNode {...getMatchProps('80', '1st Gp L', '3rd E/H/I/J/K')} />
              </NodeGroup>
              <NodeGroup isRight={true}>
                <MatchNode {...getMatchProps('86', '1st Gp J', '2nd Gp H')} />
                <MatchNode {...getMatchProps('88', '2nd Gp D', '2nd Gp G')} />
              </NodeGroup>
              <NodeGroup isRight={true}>
                <MatchNode {...getMatchProps('85', '1st Gp B', '3rd E/F/G/I/J')} />
                <MatchNode {...getMatchProps('87', '1st Gp K', '3rd D/E/I/J/L')} />
              </NodeGroup>
            </div>

            {/* R16 - 4 Matches */}
            <div className="flex flex-col justify-around items-start w-[25%] pl-2 md:pl-4 lg:pl-6 xl:pl-8 relative z-10">
              <NodeGroup isRight={true}>
                <MatchNode {...getMatchProps('91', 'TBD', 'TBD', 'R16')} />
                <MatchNode {...getMatchProps('92', 'TBD', 'TBD')} />
              </NodeGroup>
              <NodeGroup isRight={true}>
                <MatchNode {...getMatchProps('95', 'TBD', 'TBD')} />
                <MatchNode {...getMatchProps('96', 'TBD', 'TBD')} />
              </NodeGroup>
            </div>

            {/* QF - 2 Matches */}
            <div className="flex flex-col justify-around items-start w-[25%] pl-2 md:pl-4 lg:pl-6 xl:pl-8 relative z-10">
              <NodeGroup isRight={true}>
                <MatchNode {...getMatchProps('99', 'TBD', 'TBD', 'QF')} />
                <MatchNode {...getMatchProps('100', 'TBD', 'TBD')} />
              </NodeGroup>
            </div>

            {/* SF - 1 Match */}
            <div className="flex flex-col justify-center items-start w-[25%] pl-2 md:pl-4 lg:pl-6 xl:pl-8 relative z-10">
              <div className="relative w-full flex flex-col items-start">
                <MatchNode {...getMatchProps('102', 'TBD', 'TBD', 'SF')} />
                {/* Final line to center */}
                <div className="absolute top-1/2 w-2 md:w-4 lg:w-6 xl:w-8 border-t border-secondary/40 left-[-2px] md:left-[-4px] lg:left-[-6px] xl:left-[-8px] z-0 pointer-events-none"></div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Scroll indicator for mobile users only */}
      <div className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-on-surface-variant/50 animate-bounce">
        <span className="material-symbols-outlined text-[18px]">swipe_left</span>
        <span className="font-label-caps text-xs tracking-widest">DRAG OR SCROLL TO EXPLORE</span>
        <span className="material-symbols-outlined text-[18px]">swipe_right</span>
      </div>
    </section>
  );
}
