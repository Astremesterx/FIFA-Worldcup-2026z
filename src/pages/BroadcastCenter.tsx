import { useState } from 'react';

type Region = 'Americas' | 'Europe' | 'Africa' | 'Asia-Pacific' | 'MENA';

interface Channel {
  name: string;
  url: string;
}

interface Broadcaster {
  name: string;
  shortName: string;
  country: string;
  language: string;
  region: Region;
  channels: Channel[];
}

const broadcasters: Broadcaster[] = [
  // Americas
  { name: 'FOX Sports & Telemundo', shortName: 'USA', country: 'United States', language: 'English/Spanish', region: 'Americas', channels: [{name: 'FOX', url: 'https://www.foxsports.com'}, {name: 'FS1', url: 'https://www.foxsports.com'}, {name: 'Telemundo', url: 'https://www.telemundo.com/deportes'}, {name: 'Universo', url: 'https://www.nbc.com/universo'}] },
  { name: 'TSN & RDS', shortName: 'CAN', country: 'Canada', language: 'English/French', region: 'Americas', channels: [{name: 'TSN', url: 'https://www.tsn.ca'}, {name: 'RDS', url: 'https://www.rds.ca'}, {name: 'CTV', url: 'https://www.ctv.ca'}] },
  { name: 'TelevisaUnivision', shortName: 'MEX', country: 'Mexico', language: 'Spanish', region: 'Americas', channels: [{name: 'Televisa', url: 'https://www.televisa.com'}, {name: 'TV Azteca', url: 'https://www.tvazteca.com'}, {name: 'TUDN', url: 'https://www.tudn.com'}] },
  { name: 'Grupo Globo & CazéTV', shortName: 'BRA', country: 'Brazil', language: 'Portuguese', region: 'Americas', channels: [{name: 'Globo', url: 'https://ge.globo.com'}, {name: 'CazéTV', url: 'https://www.youtube.com/@CazeTV'}, {name: 'SBT', url: 'https://www.sbt.com.br'}] },
  { name: 'Telefe & TyC', shortName: 'ARG', country: 'Argentina', language: 'Spanish', region: 'Americas', channels: [{name: 'Telefe', url: 'https://mitelefe.com'}, {name: 'TV Pública', url: 'https://www.tvpublica.com.ar'}, {name: 'TyC Sports', url: 'https://www.tycsports.com'}] },
  { name: 'Caracol & RCN', shortName: 'COL', country: 'Colombia', language: 'Spanish', region: 'Americas', channels: [{name: 'Caracol TV', url: 'https://www.caracoltv.com'}, {name: 'RCN TV', url: 'https://www.canalrcn.com'}] },

  // Europe
  { name: 'BBC & ITV', shortName: 'GBR', country: 'United Kingdom', language: 'English', region: 'Europe', channels: [{name: 'BBC One', url: 'https://www.bbc.co.uk/iplayer'}, {name: 'BBC iPlayer', url: 'https://www.bbc.co.uk/iplayer'}, {name: 'ITV1', url: 'https://www.itv.com'}, {name: 'ITVX', url: 'https://www.itv.com'}] },
  { name: 'ARD & ZDF', shortName: 'GER', country: 'Germany', language: 'German', region: 'Europe', channels: [{name: 'ARD', url: 'https://www.ardmediathek.de'}, {name: 'ZDF', url: 'https://www.zdf.de'}, {name: 'Magenta Sport', url: 'https://www.magentasport.de'}] },
  { name: 'TF1 & M6', shortName: 'FRA', country: 'France', language: 'French', region: 'Europe', channels: [{name: 'TF1', url: 'https://www.tf1.fr'}, {name: 'M6', url: 'https://www.6play.fr'}] },
  { name: 'RTVE', shortName: 'ESP', country: 'Spain', language: 'Spanish', region: 'Europe', channels: [{name: 'La 1', url: 'https://www.rtve.es/play'}, {name: 'RTVE Play', url: 'https://www.rtve.es/play'}] },
  { name: 'RAI & Sky Sport', shortName: 'ITA', country: 'Italy', language: 'Italian', region: 'Europe', channels: [{name: 'RAI', url: 'https://www.raiplay.it'}, {name: 'Sky Sport Italia', url: 'https://sport.sky.it'}] },
  { name: 'VRT & RTBF', shortName: 'BEL', country: 'Belgium', language: 'Dutch/French', region: 'Europe', channels: [{name: 'VRT', url: 'https://www.vrt.be/vrtmax'}, {name: 'RTBF', url: 'https://auvio.rtbf.be'}] },

  // Africa
  { name: 'SuperSport', shortName: 'SSA', country: 'Sub-Saharan Africa', language: 'Multiple', region: 'Africa', channels: [{name: 'SuperSport', url: 'https://supersport.com'}] },
  { name: 'SABC', shortName: 'RSA', country: 'South Africa', language: 'English', region: 'Africa', channels: [{name: 'SABC', url: 'https://www.sabcplus.com'}, {name: 'SuperSport', url: 'https://supersport.com'}] },
  { name: 'KBC', shortName: 'KEN', country: 'Kenya', language: 'English', region: 'Africa', channels: [{name: 'KBC', url: 'https://www.kbc.co.ke'}] },
  { name: 'New World TV', shortName: 'NWTV', country: 'Francophone Africa', language: 'French', region: 'Africa', channels: [{name: 'New World TV', url: 'https://newworldtv.tg'}] },
  { name: 'Z Sports', shortName: 'ANG', country: 'Angola', language: 'Portuguese', region: 'Africa', channels: [{name: 'Z Sports', url: 'https://www.dstv.com/en-ao'}] },

  // Asia-Pacific
  { name: 'SBS', shortName: 'AUS', country: 'Australia', language: 'English', region: 'Asia-Pacific', channels: [{name: 'SBS', url: 'https://www.sbs.com.au/ondemand'}, {name: 'SBS On Demand', url: 'https://www.sbs.com.au/ondemand'}] },
  { name: 'Zee Entertainment', shortName: 'IND', country: 'India', language: 'Multiple', region: 'Asia-Pacific', channels: [{name: 'Zee TV', url: 'https://www.zee5.com'}, {name: 'UNITE8 Sports', url: 'https://www.viacom18.com/sports'}] },
  { name: 'CCTV & Migu', shortName: 'CHN', country: 'China', language: 'Mandarin', region: 'Asia-Pacific', channels: [{name: 'CCTV', url: 'https://tv.cctv.com'}, {name: 'Migu', url: 'https://www.miguvideo.com'}, {name: 'Douyin', url: 'https://www.douyin.com'}] },
  { name: 'Mediacorp', shortName: 'SGP', country: 'Singapore', language: 'English', region: 'Asia-Pacific', channels: [{name: 'Channel 5', url: 'https://www.mewatch.sg'}, {name: 'StarHub', url: 'https://www.starhubtvplus.com'}] },
  { name: 'Sky Sport', shortName: 'NZL', country: 'New Zealand', language: 'English', region: 'Asia-Pacific', channels: [{name: 'Sky Sport', url: 'https://www.sky.co.nz'}] },

  // MENA
  { name: 'beIN Sports', shortName: 'MENA', country: 'MENA Region', language: 'Arabic', region: 'MENA', channels: [{name: 'beIN Sports MAX', url: 'https://www.beinsports.com'}, {name: 'beIN Connect', url: 'https://connect.beinsports.com'}] }
];

const regions: Region[] = ['Americas', 'Europe', 'Africa', 'Asia-Pacific', 'MENA'];

export default function BroadcastCenter() {
  const [activeRegion, setActiveRegion] = useState<Region>('Americas');
  const filteredBroadcasters = broadcasters.filter(b => b.region === activeRegion);

  return (
    <main className="relative w-full z-10 pb-24 flex-grow min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-20 px-margin-mobile md:px-margin-desktop overflow-hidden">
        {/* Background Atmospheric Lighting */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-container/80 via-surface to-surface pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="relative z-10 max-w-container-max mx-auto text-center pt-16">
          <h1 className="font-display-hero text-4xl md:text-display-hero text-on-surface mb-4 md:mb-6 drop-shadow-2xl">GLOBAL BROADCAST CENTER</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
            Experience the prestige of the 2026 FIFA World Cup. Find your official local broadcast partner and never miss a moment of the beautiful game. Click any broadcast option below to navigate directly to the streaming service.
          </p>
          
          {/* Region Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {regions.map(region => (
              <button 
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-8 py-3 rounded-full backdrop-blur-md font-headline-md text-xl transition-all ${
                  activeRegion === region 
                    ? 'bg-secondary/20 text-secondary border border-secondary shadow-[0_0_15px_rgba(233,195,73,0.3)]' 
                    : 'bg-surface-container-low/60 text-on-surface-variant border border-white/10 hover:text-white hover:border-white/30'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Broadcast Cards Grid */}
      <section className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {filteredBroadcasters.map((broadcaster, index) => (
            <div key={`${broadcaster.name}-${index}`} className="group relative rounded-xl overflow-hidden bg-surface-container-low border border-white/10 transition-all hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(233,195,73,0.15)] flex flex-col h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-highest via-transparent to-transparent z-10"></div>
              <div className="h-48 relative bg-surface-container flex items-center justify-center border-b border-white/5 shrink-0">
                <div className="w-32 h-32 rounded-full bg-surface-bright flex items-center justify-center shadow-inner">
                  <span className="font-headline-md text-4xl text-on-surface-variant text-center leading-tight">
                    {broadcaster.shortName}
                  </span>
                </div>
              </div>
              <div className="p-6 relative z-20 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_var(--tw-colors-secondary)]"></div>
                    <span className="font-label-caps text-[10px] sm:text-label-caps text-secondary uppercase tracking-wider">Official Rights Holder</span>
                  </div>
                  <h3 className="font-headline-md text-2xl text-on-surface mb-2">{broadcaster.name}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6">{broadcaster.country} ({broadcaster.language})</p>
                </div>
                
                <div className="mt-auto border-t border-white/10 pt-4">
                  <span className="block font-label-caps text-xs text-on-surface-variant uppercase mb-3 tracking-wider">Where to Watch:</span>
                  <div className="flex flex-wrap gap-2">
                    {broadcaster.channels.map(channel => (
                      <a 
                        key={channel.name} 
                        href={channel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-secondary/10 border border-secondary/30 rounded-md font-body-sm text-secondary hover:bg-secondary hover:text-on-secondary transition-colors cursor-pointer"
                      >
                        {channel.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </section>
    </main>
  );
}
