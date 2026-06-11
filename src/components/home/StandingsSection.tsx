import { useEffect, useState } from 'react';
import { api, type Group, type Team } from '../../services/api';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function StandingsSection() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      Promise.all([api.getGroups(), api.getTeams()]).then(([gData, tData]) => {
        setGroups(gData);
        setTeams(tData);
        setLoading(false);
      });
    };
    fetchData();

    // Poll for live standings updates
    const interval = setInterval(() => {
      api.getGroups().then(gData => setGroups(gData));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading && groups.length > 0) {
      gsap.fromTo('.group-card', 
        { y: 30, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.05, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#standings',
            start: 'top 70%',
          }
        }
      );
    }
  }, [loading, groups]);

  if (loading) return <div className="py-20 text-center"><div className="w-8 h-8 mx-auto border-2 border-white border-t-transparent rounded-full animate-spin"></div></div>;

  const getTeam = (id: string) => teams.find(t => t.id === id);

  return (
    <section id="standings" className="w-full pt-10 pb-24 px-margin-mobile md:px-margin-desktop relative z-20 min-h-[80vh]">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16 profile-reveal">
          <h2 className="font-display-hero text-5xl md:text-7xl text-white uppercase tracking-tighter shadow-glow mb-4">Groups & Standings</h2>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            The road to glory begins here. The top 2 teams from each group, along with the 8 best third-placed teams, will advance to the monumental Round of 32.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-8">
          {groups.map((group) => (
            <div key={group.name} className="group-card bg-surface-container/30 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md hover:border-white/20 transition-all hover:-translate-y-1 hover:shadow-2xl">
              <div className="bg-white/5 border-b border-white/10 p-2 md:p-4">
                <h3 className="font-headline-md text-sm md:text-xl text-white flex items-center justify-between">
                  <span>Group {group.name}</span>
                  <span className="text-[8px] md:text-xs font-label-caps text-on-surface-variant bg-surface px-1 md:px-2 py-0.5 md:py-1 rounded hidden md:block">MATCHDAY 1</span>
                </h3>
              </div>
              
              <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="font-label-caps text-[8px] md:text-[10px] text-on-surface-variant border-b border-white/5 bg-black/20">
                      <th className="p-1 md:p-3 w-4 md:w-8 text-center">#</th>
                      <th className="p-1 md:p-3 min-w-[60px] md:min-w-[140px]">TEAM</th>
                      <th className="p-1 md:p-3 w-4 md:w-8 text-center hidden md:table-cell">MP</th>
                      <th className="p-1 md:p-3 w-4 md:w-8 text-center hidden sm:table-cell">W</th>
                      <th className="p-1 md:p-3 w-4 md:w-8 text-center hidden sm:table-cell">D</th>
                      <th className="p-1 md:p-3 w-4 md:w-8 text-center hidden sm:table-cell">L</th>
                      <th className="p-1 md:p-3 w-6 md:w-8 text-center">GD</th>
                      <th className="p-1 md:p-3 w-6 md:w-10 text-center font-bold text-white">PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.teams.map((t, idx) => {
                      const teamData = getTeam(t.team_id);
                      if (!teamData) return null;
                      
                      // Highlight top 2
                      const isTopTwo = idx < 2;
                      const isThird = idx === 2;
                      
                      return (
                        <tr key={t.team_id} className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${isTopTwo ? 'bg-secondary/5' : ''}`}>
                          <td className="p-1 md:p-3 text-center">
                            <span className={`inline-flex items-center justify-center w-3 h-3 md:w-5 md:h-5 rounded-full text-[8px] md:text-[10px] font-bold ${isTopTwo ? 'bg-secondary text-on-secondary' : isThird ? 'bg-white/20 text-white' : 'text-on-surface-variant'}`}>
                              {idx + 1}
                            </span>
                          </td>
                          <td className="p-1 md:p-3">
                            <div className="flex items-center gap-1 md:gap-2">
                              <img src={teamData.flag} alt={teamData.name_en} className="w-3 h-2 md:w-5 md:h-3.5 object-cover rounded shadow-sm" />
                              <span className="font-body-md text-[10px] md:text-sm font-semibold text-white whitespace-nowrap truncate max-w-[50px] md:max-w-none" title={teamData.name_en}>
                                <span className="md:hidden">{teamData.fifa_code}</span>
                                <span className="hidden md:inline">{teamData.name_en}</span>
                              </span>
                            </div>
                          </td>
                          <td className="p-1 md:p-3 text-center text-[10px] md:text-sm text-on-surface-variant hidden md:table-cell">{t.mp}</td>
                          <td className="p-1 md:p-3 text-center text-[10px] md:text-sm text-on-surface-variant hidden sm:table-cell">{t.w}</td>
                          <td className="p-1 md:p-3 text-center text-[10px] md:text-sm text-on-surface-variant hidden sm:table-cell">{t.d}</td>
                          <td className="p-1 md:p-3 text-center text-[10px] md:text-sm text-on-surface-variant hidden sm:table-cell">{t.l}</td>
                          <td className="p-1 md:p-3 text-center text-[10px] md:text-sm text-on-surface-variant">{t.gd}</td>
                          <td className="p-1 md:p-3 text-center text-[10px] md:text-sm font-bold text-secondary">{t.pts}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
        
        {/* Legend and Actions */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center gap-6 font-label-caps text-xs text-on-surface-variant">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <span>Advance to Round of 32</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
              <span>Possible Wildcard Advance</span>
            </div>
          </div>
          
          <Link to="/group-stats" className="font-label-caps text-xs text-secondary border border-secondary/50 px-6 py-3 rounded-full hover:bg-secondary hover:text-on-secondary transition-all flex items-center gap-2 whitespace-nowrap group">
            VIEW COMPLETE STATS <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
