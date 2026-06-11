import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, type Group, type Team } from '../services/api';

export default function GroupStandings() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.all([api.getGroups(), api.getTeams()]).then(([gData, tData]) => {
      setGroups(gData);
      setTeams(tData);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="py-20 text-center min-h-screen flex items-center justify-center"><div className="w-8 h-8 mx-auto border-2 border-secondary border-t-transparent rounded-full animate-spin"></div></div>;

  const getTeam = (id: string) => teams.find(t => t.id === id);

  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-24">
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXkkAaQbWDbgKNrizcJ2mE49D1d2SP54LyZanSbUT66UBTiG92BQOIm1_5MfAeiZIrVVDXDQb4GaroQuG02Sg5ZMT5OrvtRReQIu_b-mhler-lQluYdRB5kLSWddbi1-X_zZw-llNXGKX2r_XUaQx409C8JuujniXBaQVtRZhzOPv3Mo1xb25a9JuNFNTEG-K4vT7e_7WTx-NDOODfR20LXqWoM6HMgEVun8UvxzDSFSJCRSUAjLa-eWqt-siyBsGcQS-DjHbdXdk"
          alt="Stadium"
          className="w-full h-full object-cover opacity-20 blur-md"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface to-surface"></div>
      </div>

      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10">
        <Link to="/#standings" className="inline-flex items-center gap-2 font-label-caps text-on-surface-variant hover:text-white transition-colors mb-8 text-xs">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>BACK TO HOME</span>
        </Link>

        <div className="mb-12">
          <h1 className="font-display-hero text-4xl md:text-6xl text-white uppercase tracking-tighter shadow-glow mb-4">Complete Group Stats</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl">
            Detailed standings for all 12 groups. The top 2 teams from each group, along with the 8 best third-placed teams, advance to the Round of 32.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {groups.map((group) => (
            <div key={group.name} className="bg-surface-container/30 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
              <div className="bg-white/5 border-b border-white/10 p-4 md:p-6 flex items-center justify-between">
                <h3 className="font-display-hero text-2xl md:text-3xl text-secondary">Group {group.name}</h3>
              </div>
              
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="font-label-caps text-xs text-on-surface-variant border-b border-white/5 bg-black/20">
                      <th className="p-4 w-12 text-center">#</th>
                      <th className="p-4">TEAM</th>
                      <th className="p-4 text-center">MP</th>
                      <th className="p-4 text-center">W</th>
                      <th className="p-4 text-center">D</th>
                      <th className="p-4 text-center">L</th>
                      <th className="p-4 text-center">GF</th>
                      <th className="p-4 text-center">GA</th>
                      <th className="p-4 text-center">GD</th>
                      <th className="p-4 text-center font-bold text-white">PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.teams.map((t, idx) => {
                      const teamData = getTeam(t.team_id);
                      if (!teamData) return null;
                      
                      const isTopTwo = idx < 2;
                      const isThird = idx === 2;
                      
                      return (
                        <tr key={t.team_id} className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${isTopTwo ? 'bg-secondary/5' : ''}`}>
                          <td className="p-4 text-center">
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${isTopTwo ? 'bg-secondary text-on-secondary' : isThird ? 'bg-white/20 text-white' : 'text-on-surface-variant'}`}>
                              {idx + 1}
                            </span>
                          </td>
                          <td className="p-4">
                            <Link to={`/teams/${teamData.id}`} className="flex items-center gap-3 hover:text-secondary transition-colors">
                              <img src={teamData.flag} alt={teamData.name_en} className="w-8 h-5 object-cover rounded shadow-sm" />
                              <span className="font-body-md font-semibold text-white uppercase">{teamData.name_en}</span>
                            </Link>
                          </td>
                          <td className="p-4 text-center text-sm text-on-surface-variant">{t.mp}</td>
                          <td className="p-4 text-center text-sm text-on-surface-variant">{t.w}</td>
                          <td className="p-4 text-center text-sm text-on-surface-variant">{t.d}</td>
                          <td className="p-4 text-center text-sm text-on-surface-variant">{t.l}</td>
                          <td className="p-4 text-center text-sm text-on-surface-variant">{t.gf}</td>
                          <td className="p-4 text-center text-sm text-on-surface-variant">{t.ga}</td>
                          <td className="p-4 text-center text-sm text-on-surface-variant">{t.gd}</td>
                          <td className="p-4 text-center text-sm font-bold text-secondary">{t.pts}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
