import { Link } from 'react-router-dom';

export default function Contenders() {
  return (
    <section className="relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-20">
      <div className="flex justify-between items-end mb-6 md:mb-12">
        <div>
          <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface">CONTENDERS</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">The nations vying for ultimate glory.</p>
        </div>
        <Link to="#teams" onClick={(e) => {
          e.preventDefault();
          document.getElementById('teams')?.scrollIntoView({ behavior: 'smooth' });
        }} className="hidden md:flex items-center gap-2 text-secondary font-label-caps text-label-caps hover:text-white transition-colors relative z-10 cursor-pointer">
          VIEW ALL <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Card 1: France */}
        <div className="md:col-span-8 relative h-[400px] md:h-[500px] rounded-xl overflow-hidden group bg-surface-container border border-white/10 hover:border-secondary/30 transition-colors paper-cut-shadow">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-container to-surface-container-lowest z-0"></div>
          <img alt="Kylian Mbappe" className="absolute bottom-0 right-0 h-[110%] object-contain z-10 transition-transform duration-700 group-hover:scale-105 origin-bottom md:drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]" src="/player cutouts/mbappe.png" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent z-10"></div>
          
          <div className="absolute inset-0 p-8 z-20 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-start">
              <div className="bg-surface-container-high/80 backdrop-blur-md border border-white/10 rounded-lg p-2 inline-flex items-center gap-3">
                <span className="text-2xl">🇫🇷</span>
                <span className="font-label-caps text-label-caps text-on-surface font-bold">FRANCE</span>
              </div>
              <div className="font-headline-lg text-headline-lg text-secondary opacity-20 group-hover:opacity-40 transition-opacity">#2</div>
            </div>
            <div className="max-w-sm pointer-events-auto">
              <h3 className="font-headline-lg text-headline-lg text-on-surface leading-tight mb-2">LES BLEUS</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">A powerhouse looking to cement their legacy on the world stage once more, led by a generation of unmatched talent.</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="font-label-caps text-[10px] text-on-surface-variant mb-1">COACH</p>
                  <p className="font-body-md text-sm text-on-surface font-bold">Didier Deschamps</p>
                </div>
                <div>
                  <p className="font-label-caps text-[10px] text-on-surface-variant mb-1">KEY PLAYER</p>
                  <p className="font-body-md text-sm text-secondary font-bold">K. Mbappe</p>
                </div>
              </div>
              <Link to="/teams/33" className="block w-full text-center bg-white/5 hover:bg-secondary hover:text-on-secondary text-secondary border border-secondary/50 font-label-caps text-label-caps py-3 rounded-lg transition-all duration-300">
                TEAM PROFILE
              </Link>
            </div>
          </div>
        </div>

        {/* Card 2: Spain */}
        <div className="md:col-span-4 relative h-[400px] md:h-[500px] rounded-xl overflow-hidden group bg-surface-container border border-white/10 hover:border-secondary/30 transition-colors paper-cut-shadow">
          <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high to-surface-container-lowest z-0"></div>
          <img alt="Lamine Yamal" className="absolute bottom-0 right-[-10%] h-[90%] object-contain z-10 transition-transform duration-700 group-hover:scale-105 origin-bottom md:drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]" src="/player cutouts/lamine yamal.png" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent z-10"></div>
          <div className="absolute inset-0 p-6 z-20 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="bg-surface-container-high/80 backdrop-blur-md border border-white/10 rounded-lg p-2 inline-flex items-center gap-2">
                <span className="text-xl">🇪🇸</span>
                <span className="font-label-caps text-[10px] text-on-surface font-bold">SPAIN</span>
              </div>
              <div className="font-headline-md text-headline-md text-secondary opacity-20">#8</div>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-1">LA ROJA</h3>
              <p className="font-label-caps text-[10px] text-secondary mb-4">THE NEW GENERATION</p>
              <Link to="/teams/29" className="flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors font-label-caps text-[10px]">
                EXPLORE <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_outward</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Card 3: England */}
        <div className="md:col-span-12 relative min-h-[350px] md:min-h-[300px] rounded-xl overflow-hidden group bg-surface-container border border-white/10 hover:border-secondary/30 transition-colors paper-cut-shadow mt-4">
          <div className="absolute inset-0 bg-surface-container-lowest z-0"></div>
          <img alt="Harry Kane" className="absolute bottom-0 right-[-10%] md:right-12 h-[100%] md:h-[120%] object-contain z-10 transition-transform duration-700 group-hover:-translate-x-4 md:drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]" src="/player cutouts/harry kane.png" />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface via-surface/90 to-transparent z-10"></div>
          <div className="absolute inset-0 p-6 md:p-8 z-20 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="max-w-md pointer-events-none md:pointer-events-auto z-30 relative">
              <div className="bg-surface-container-high/80 backdrop-blur-md border border-white/10 rounded-lg p-2 inline-flex items-center gap-3 mb-4">
                <span className="text-xl md:text-2xl">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
                <span className="font-label-caps text-[10px] md:text-label-caps text-on-surface font-bold">ENGLAND</span>
              </div>
              <h3 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface mb-2">THREE LIONS</h3>
              <p className="font-body-md text-sm md:text-body-md text-on-surface-variant max-w-[70%] md:max-w-full">Searching for history across the Atlantic. A squad blending immense experience with explosive youth.</p>
            </div>
            <div className="flex gap-4 md:gap-8 mt-auto md:mt-0 mr-0 md:mr-64 bg-surface-container-high/50 p-4 rounded-lg border border-white/5 backdrop-blur-sm relative z-30">
              <div>
                <p className="font-label-caps text-[10px] text-on-surface-variant mb-1">COACH</p>
                <p className="font-body-md text-xs md:text-sm text-on-surface font-bold">Gareth Southgate</p>
              </div>
              <div>
                <p className="font-label-caps text-[10px] text-on-surface-variant mb-1">RANKING</p>
                <p className="font-headline-md text-xl md:text-2xl text-secondary font-bold">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
