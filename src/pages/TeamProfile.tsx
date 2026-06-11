import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, type Team } from '../services/api';
import type { Player } from '../services/teamData';
import { gsap } from 'gsap';

export default function TeamProfile() {
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [themeColor, setThemeColor] = useState<string>('#D4AF37');

  useEffect(() => {
    if (id) {
      setTimeout(() => setLoading(true), 0);
      api.getTeam(id).then(data => {
        setTeam(data || null);
        setLoading(false);
      });
    }
  }, [id]);

  useEffect(() => {
    if (!loading && team) {
      window.scrollTo(0, 0);
      
      // Extract average color from flag
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = team.flag;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, 1, 1);
          const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
          // Lighten the color slightly for better visibility on dark backgrounds
          setThemeColor(`rgb(${Math.min(r + 30, 255)}, ${Math.min(g + 30, 255)}, ${Math.min(b + 30, 255)})`);
        }
      };

      gsap.fromTo('.profile-reveal', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [loading, team]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!team || !team.profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h1 className="font-headline-lg text-headline-lg text-white mb-4">Team Not Found</h1>
        <Link to="/teams" className="text-secondary hover:underline">Back to Teams</Link>
      </div>
    );
  }

  const { profile } = team;
  
  const goalkeepers = profile.players.filter(p => p.position === 'GK');
  const defenders = profile.players.filter(p => p.position === 'DF' || p.position === 'DEF');
  const midfielders = profile.players.filter(p => p.position === 'MF' || p.position === 'MID');
  const forwards = profile.players.filter(p => p.position === 'FW' || p.position === 'FWD');

  const PlayerCard = ({ player }: { player: Player }) => (
    <div className={`relative overflow-hidden rounded border ${player.isStar ? 'border-[var(--team-primary)]/50 bg-[var(--team-primary)]/10' : 'border-white/5 bg-surface-container/10'} p-2 transition-all hover:bg-white/5 flex items-center justify-between group cursor-pointer`}>
      <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
        <div className="font-display-hero text-xl md:text-2xl text-white/20 font-bold w-6 md:w-8 text-center shrink-0">{player.number || '-'}</div>
        <div className="min-w-0">
          <h3 className="font-headline-md text-xs md:text-sm text-white leading-tight truncate">{player.name}</h3>
          <p className="font-body-md text-on-surface-variant text-[8px] md:text-[10px] uppercase tracking-wider mt-0.5 truncate">{player.club}</p>
        </div>
      </div>
      {player.isStar && (
        <span className="material-symbols-outlined text-[var(--team-primary)] text-sm shrink-0" title="Star Player" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      )}
    </div>
  );

  return (
    <main 
      className="flex-grow flex flex-col relative w-full pt-20 pb-24"
      style={{
        '--team-primary': profile.colors?.primary || themeColor,
        '--team-secondary': profile.colors?.secondary || '#FFFFFF'
      } as React.CSSProperties}
    >
      {/* Back Button */}
      <div className="fixed top-24 left-4 md:left-8 z-50">
        <Link 
          to="/#teams" 
          className="flex items-center gap-2 bg-background/50 hover:bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-on-surface-variant hover:text-white transition-all font-label-caps text-sm"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>BACK TO TEAMS</span>
        </Link>
      </div>

      {/* Page-wide Fading Colorful Theme based on Flag */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img src={team.flag} alt={`${team.name_en} ambient background`} className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] h-[150vh] object-cover opacity-15 blur-[120px] saturate-200 transform-gpu" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background"></div>
      </div>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-4 profile-reveal">
          <div className="w-24 h-16 md:w-32 md:h-20 mb-8 border-2 border-white/20 shadow-2xl overflow-hidden rounded-md">
            <img src={team.flag} alt={`${team.name_en} flag`} className="w-full h-full object-cover" />
          </div>
          <h1 className="font-display-hero text-6xl md:text-9xl text-white uppercase tracking-tighter mb-4 shadow-glow drop-shadow-2xl">
            {team.name_en}
          </h1>
          <div className="flex gap-6 mt-4 font-label-caps text-label-caps text-[var(--team-primary)]">
            <span className="bg-surface/50 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              {profile.federation}
            </span>
            <span className="bg-surface/50 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              CODE: {team.fifa_code}
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full -mt-10 relative z-20 space-y-24">
        
        {/* Story Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center profile-reveal">
          <div className="md:col-span-8">
            <h2 className="font-headline-lg text-4xl mb-6 text-on-surface">The Legacy Continues</h2>
            <p className="font-body-lg text-xl text-on-surface-variant leading-relaxed">
              {profile.historySummary}
            </p>
          </div>
          <div className="md:col-span-4 bg-surface-container/50 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
            <p className="font-label-caps text-[var(--team-primary)] mb-2">HEAD COACH</p>
            <p className="font-headline-md text-3xl text-white mb-6">{profile.coach}</p>
            <div className="h-px w-full bg-white/10 mb-6"></div>
            <p className="font-label-caps text-[var(--team-primary)] mb-2">GROUP</p>
            <p className="font-headline-md text-3xl text-white">Group {team.group || 'TBD'}</p>
          </div>
        </section>

        {/* Squad Section */}
        <section className="profile-reveal">
          <div className="mb-8 flex justify-between items-end border-b border-white/10 pb-4">
            <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface">Squad List</h2>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="font-label-caps text-[var(--team-primary)] text-sm mb-3 border-b border-[var(--team-primary)]/20 pb-1 inline-block">FORWARDS</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {forwards.map(p => <PlayerCard key={p.id} player={p} />)}
              </div>
            </div>
            
            <div>
              <h3 className="font-label-caps text-[var(--team-primary)] text-sm mb-3 border-b border-[var(--team-primary)]/20 pb-1 inline-block">MIDFIELDERS</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {midfielders.map(p => <PlayerCard key={p.id} player={p} />)}
              </div>
            </div>
            
            <div>
              <h3 className="font-label-caps text-[var(--team-primary)] text-sm mb-3 border-b border-[var(--team-primary)]/20 pb-1 inline-block">DEFENDERS</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {defenders.map(p => <PlayerCard key={p.id} player={p} />)}
              </div>
            </div>
            
            <div>
              <h3 className="font-label-caps text-[var(--team-primary)] text-sm mb-3 border-b border-[var(--team-primary)]/20 pb-1 inline-block">GOALKEEPERS</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {goalkeepers.map(p => <PlayerCard key={p.id} player={p} />)}
              </div>
            </div>
          </div>
        </section>

        {/* Milestones Section */}
        <section className="profile-reveal pb-20">
          <div className="mb-10 flex justify-between items-end border-b border-white/10 pb-4">
            <h2 className="font-headline-lg text-4xl text-on-surface">World Cup Milestones</h2>
          </div>
          
          <div className="space-y-6">
            {profile.milestones.map((milestone, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-6 items-start bg-surface-container/20 p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                <div className="font-display-hero text-4xl text-[var(--team-primary)] min-w-[120px]">{milestone.year}</div>
                <p className="font-body-lg text-on-surface-variant pt-2">{milestone.description}</p>
              </div>
            ))}
          </div>
        </section>
        
      </div>
    </main>
  );
}
