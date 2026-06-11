import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const hostData = [
  {
    nation: "USA",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIz-0zFuscYqlBMkSxfCFmGBRiZEomoaSCjlvO66UpZkCe3fDhdpGO0Eh8NWp1NVr1k5KWGnET8peL-o3TdVxnKvDKBV6yb-edgLwX0hUEfO6ll-Hy95IqdZwYsbiMlqzUMkrY7acNAU8FVnZriCE7kXcrTs45W0ZYVyHzZ8qT5vwdA_DcvEVtS4oU83VMWahic0W1HpkoFVZ9GiX3__284UyNpWlEnz06q2WZ8Ja3BvKAWe-g1VlLwvbScRNDt9pZUk3O8ukgdbs",
    description: "11 Host Cities • The heart of the spectacle, featuring massive modern coliseums and a rich legacy of global events.",
    venues: [
      { city: "New York/New Jersey", stadium: "New York New Jersey Stadium (MetLife Stadium)", capacity: "82,500", mapUrl: "https://maps.google.com/?q=MetLife+Stadium+East+Rutherford+NJ" },
      { city: "Dallas", stadium: "Dallas Stadium (AT&T Stadium)", capacity: "94,000", mapUrl: "https://maps.google.com/?q=AT%26T+Stadium+Arlington+TX" },
      { city: "Kansas City", stadium: "Kansas City Stadium (Arrowhead Stadium)", capacity: "76,416", mapUrl: "https://maps.google.com/?q=Arrowhead+Stadium+Kansas+City+MO" },
      { city: "Houston", stadium: "Houston Stadium (NRG Stadium)", capacity: "72,220", mapUrl: "https://maps.google.com/?q=NRG+Stadium+Houston+TX" },
      { city: "Atlanta", stadium: "Atlanta Stadium (Mercedes-Benz Stadium)", capacity: "71,000", mapUrl: "https://maps.google.com/?q=Mercedes-Benz+Stadium+Atlanta+GA" },
      { city: "Los Angeles", stadium: "Los Angeles Stadium (SoFi Stadium)", capacity: "70,240", mapUrl: "https://maps.google.com/?q=SoFi+Stadium+Inglewood+CA" },
      { city: "Philadelphia", stadium: "Philadelphia Stadium (Lincoln Financial Field)", capacity: "69,796", mapUrl: "https://maps.google.com/?q=Lincoln+Financial+Field+Philadelphia+PA" },
      { city: "Seattle", stadium: "Seattle Stadium (Lumen Field)", capacity: "69,000", mapUrl: "https://maps.google.com/?q=Lumen+Field+Seattle+WA" },
      { city: "San Francisco Bay Area", stadium: "San Francisco Bay Area Stadium (Levi's Stadium)", capacity: "68,500", mapUrl: "https://maps.google.com/?q=Levi%27s+Stadium+Santa+Clara+CA" },
      { city: "Boston", stadium: "Boston Stadium (Gillette Stadium)", capacity: "65,878", mapUrl: "https://maps.google.com/?q=Gillette+Stadium+Foxborough+MA" },
      { city: "Miami", stadium: "Miami Stadium (Hard Rock Stadium)", capacity: "64,767", mapUrl: "https://maps.google.com/?q=Hard+Rock+Stadium+Miami+Gardens+FL" },
    ]
  },
  {
    nation: "Mexico",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4F8beJkDGP-6wWOamOm_fxWRibTlIcYFGKLWaihxpegUFJSy-QuRm2yNfltws4c59eagCx6DfNaUtVrlMuJem04dZM1itlCTckM8PPDdsk17nwI2QV9tX7EwTHZJcYyv-hqvJdVoavyckBbeyu5fXhPo94wTkrRU9Z26ZyW1oYiUOy1IQ-7IOMGlS0vSV4iorrLA8P5aVMzC0vodIOUV-nvzcSpyBZv5_K5xKoZ-Z8eiKFWEUV7r2jmwDPktaMM0cbCgdjMXNWzA",
    description: "3 Host Cities • The soul of the tournament. Historic grounds where legends are born and football is religion.",
    venues: [
      { city: "Mexico City", stadium: "Estadio Azteca Mexico City", capacity: "83,264", mapUrl: "https://maps.google.com/?q=Estadio+Azteca+Mexico+City" },
      { city: "Monterrey", stadium: "Estadio Monterrey (Estadio BBVA)", capacity: "53,500", mapUrl: "https://maps.google.com/?q=Estadio+BBVA+Guadalupe+Nuevo+Leon" },
      { city: "Guadalajara", stadium: "Estadio Guadalajara (Estadio Akron)", capacity: "49,850", mapUrl: "https://maps.google.com/?q=Estadio+Akron+Zapopan+Jalisco" },
    ]
  },
  {
    nation: "Canada",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRC36DRCxzcVlZwokGIGOstGREly2zvtX3fCS5dVoQuKGiNmHufbHCJTZhUB-Sc0U6R51Mbht6CtAOwdaTVRF2L2ATXMwsrDd923IY3T8t5uBnXteiDz7zeZo4-h3XIaJqBFn60GREjgs9ZWbMabAdi74fNMTiiD5QYJ_aqx_JhkVrpUbVfbt1cXMNcYlXwMGeQ8jR3-_7-cZp7dK_A2R3h2H9Z3zYTvovHWshWhqq8SB0YUZ7gCdQObrRiRj6o-nWTs4oeZ2lTqU",
    description: "2 Host Cities • The new frontier. Blending stunning natural backdrops with state-of-the-art urban arenas.",
    venues: [
      { city: "Vancouver", stadium: "BC Place Vancouver", capacity: "54,500", mapUrl: "https://maps.google.com/?q=BC+Place+Vancouver+BC" },
      { city: "Toronto", stadium: "Toronto Stadium (BMO Field)", capacity: "45,000", mapUrl: "https://maps.google.com/?q=BMO+Field+Toronto+ON" },
    ]
  }
];

export default function HostCities() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-20">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-20 flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-surface-lowest">
          <img 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmh0E_ucEZaCOlD-KDWDazFlmK2pvPs-zry7xkCpctD9--522diDrPFZGkjgljX2VFEXjhupTnVkW6n1xmL3_cSWC-nzoSaX631v2-GWtdvYsqAHAyemeb0pa8r4LpLNWyND_pUv54PegZT1bk4IWp6I_7n0BDmBaLzqnMBzU_qJfChnaSZlNSVXdshwa6gQBTvuytCxf-uRsSrrYEFr6RsLn6iP1_IEY_terPDj4BlcZ0-3mbD5GyJ_2000IADeq5wN1nYzhUzXI"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-surface/50 to-transparent"></div>
        </div>
        
        <div className="relative z-20 w-full max-w-container-max px-margin-mobile md:px-margin-desktop">
          <Link to="/#fanzone" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors mb-6 font-label-caps tracking-widest text-xs uppercase">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Home
          </Link>
          
          <span className="font-label-caps text-label-caps text-secondary tracking-[0.2em] uppercase mb-4 block">
            16 Host Cities
          </span>
          <h1 className="font-display-hero text-5xl md:text-display-hero text-on-surface drop-shadow-2xl mb-4 md:mb-6">
            The Venues.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-container">A Continental Stage.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Explore the 16 majestic stadiums across the United States, Mexico, and Canada that will host the 48-team tournament.
          </p>
        </div>
      </section>

      {/* Venues Grid */}
      <section className="px-margin-mobile md:px-margin-desktop py-12 max-w-container-max mx-auto space-y-16 md:space-y-24">
        {hostData.map((nation, idx) => (
          <div key={idx} className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-end border-b border-white/10 pb-6">
              <div className="flex-1">
                <h2 className="font-headline-lg text-4xl md:text-6xl text-white mb-2">{nation.nation}</h2>
                <p className="font-body-lg text-secondary/80">{nation.description}</p>
              </div>
              <div className="w-full md:w-1/3 h-32 md:h-48 rounded-xl overflow-hidden relative border border-white/10">
                <img src={nation.image} alt={nation.nation} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nation.venues.map((venue, vIdx) => (
                <div key={vIdx} className="group flex flex-col bg-surface-container-low border border-white/5 p-6 rounded-xl hover:border-secondary/30 hover:bg-surface-container transition-all hover:-translate-y-1 shadow-lg h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-secondary text-2xl font-light">stadium</span>
                    <h3 className="font-headline-md text-xl text-on-surface">{venue.city}</h3>
                  </div>
                  <div className="space-y-2 font-body-md flex-1">
                    <div className="flex justify-between items-end border-b border-white/5 pb-2">
                      <span className="text-on-surface-variant/60 text-sm">Stadium</span>
                      <span className="text-on-surface-variant text-right font-medium">{venue.stadium}</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/5 pb-2">
                      <span className="text-on-surface-variant/60 text-sm">Capacity</span>
                      <span className="text-secondary font-bold">{venue.capacity}</span>
                    </div>
                  </div>
                  <a href={venue.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-surface-container-highest hover:bg-secondary hover:text-on-secondary text-on-surface transition-colors font-body-md text-sm group-hover:shadow-[0_0_15px_rgba(233,195,73,0.2)]">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    Google Map Location
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
