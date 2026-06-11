import { Link } from 'react-router-dom';

export default function HostNations() {
  return (
    <>
      {/* Hero Section: Premium Cinematic */}
      <section className="relative w-full py-8 md:py-12 flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-surface-lowest">
          <img 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmh0E_ucEZaCOlD-KDWDazFlmK2pvPs-zry7xkCpctD9--522diDrPFZGkjgljX2VFEXjhupTnVkW6n1xmL3_cSWC-nzoSaX631v2-GWtdvYsqAHAyemeb0pa8r4LpLNWyND_pUv54PegZT1bk4IWp6I_7n0BDmBaLzqnMBzU_qJfChnaSZlNSVXdshwa6gQBTvuytCxf-uRsSrrYEFr6RsLn6iP1_IEY_terPDj4BlcZ0-3mbD5GyJ_2000IADeq5wN1nYzhUzXI"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent"></div>
        </div>
        
        <div className="relative z-20 text-center px-margin-mobile md:px-margin-desktop max-w-[1000px]">
          <span className="font-label-caps text-label-caps text-secondary tracking-[0.2em] uppercase mb-4 block">
            The Host Nations
          </span>
          <h1 className="font-display-hero text-5xl md:text-display-hero text-on-surface drop-shadow-2xl mb-2 md:mb-6">
            Three Nations.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-container">One Dream.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Experience the unprecedented scale and unparalleled passion as the United States, Canada, and Mexico unite to host the largest sporting spectacle on earth. A continent divided by borders, united by the beautiful game.
          </p>
        </div>
      </section>

      {/* Bento Grid: The Nations */}
      <section className="py-6 md:py-10 max-w-container-max mx-auto">
        <div className="grid grid-cols-3 gap-2 md:gap-gutter px-2 md:px-margin-desktop">
          {/* USA Card */}
          <Link to="/host-cities" className="group relative min-h-[160px] md:min-h-[220px] rounded-xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] md:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-1 md:hover:-translate-y-2 block">
            <img 
              alt="USA Stadium" 
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIz-0zFuscYqlBMkSxfCFmGBRiZEomoaSCjlvO66UpZkCe3fDhdpGO0Eh8NWp1NVr1k5KWGnET8peL-o3TdVxnKvDKBV6yb-edgLwX0hUEfO6ll-Hy95IqdZwYsbiMlqzUMkrY7acNAU8FVnZriCE7kXcrTs45W0ZYVyHzZ8qT5vwdA_DcvEVtS4oU83VMWahic0W1HpkoFVZ9GiX3__284UyNpWlEnz06q2WZ8Ja3BvKAWe-g1VlLwvbScRNDt9pZUk3O8ukgdbs"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-2.5 md:p-6 w-full backdrop-blur-md bg-surface-container-lowest/30 border-t border-white/10 flex flex-col gap-1 md:gap-2">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end">
                <h2 className="font-headline-lg text-lg md:text-headline-lg text-white leading-none">USA</h2>
                <span className="text-secondary/80 group-hover:text-secondary font-label-caps text-[8px] md:text-xs tracking-wider uppercase flex items-center gap-0.5 md:gap-1 transition-colors mt-0.5 md:mt-0">
                  <span className="hidden md:inline">View </span>Cities <span className="material-symbols-outlined text-[10px] md:text-[14px]">arrow_forward</span>
                </span>
              </div>
              <p className="font-body-md text-[9px] leading-tight md:text-body-md text-on-surface-variant line-clamp-3 md:line-clamp-none">11 Host Cities • The heart of the spectacle, featuring massive modern coliseums and a rich legacy of global events.</p>
            </div>
          </Link>

          {/* Mexico Card */}
          <Link to="/host-cities" className="group relative min-h-[160px] md:min-h-[220px] rounded-xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] md:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-1 md:hover:-translate-y-2 block">
            <img 
              alt="Mexico Stadium" 
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4F8beJkDGP-6wWOamOm_fxWRibTlIcYFGKLWaihxpegUFJSy-QuRm2yNfltws4c59eagCx6DfNaUtVrlMuJem04dZM1itlCTckM8PPDdsk17nwI2QV9tX7EwTHZJcYyv-hqvJdVoavyckBbeyu5fXhPo94wTkrRU9Z26ZyW1oYiUOy1IQ-7IOMGlS0vSV4iorrLA8P5aVMzC0vodIOUV-nvzcSpyBZv5_K5xKoZ-Z8eiKFWEUV7r2jmwDPktaMM0cbCgdjMXNWzA"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-2.5 md:p-6 w-full backdrop-blur-md bg-surface-container-lowest/30 border-t border-white/10 flex flex-col gap-1 md:gap-2">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end">
                <h2 className="font-headline-lg text-lg md:text-headline-lg text-white leading-none">Mexico</h2>
                <span className="text-secondary/80 group-hover:text-secondary font-label-caps text-[8px] md:text-xs tracking-wider uppercase flex items-center gap-0.5 md:gap-1 transition-colors mt-0.5 md:mt-0">
                  <span className="hidden md:inline">View </span>Cities <span className="material-symbols-outlined text-[10px] md:text-[14px]">arrow_forward</span>
                </span>
              </div>
              <p className="font-body-md text-[9px] leading-tight md:text-body-md text-on-surface-variant line-clamp-3 md:line-clamp-none">3 Host Cities • The soul of the tournament. Historic grounds where legends are born and football is religion.</p>
            </div>
          </Link>

          {/* Canada Card */}
          <Link to="/host-cities" className="group relative min-h-[160px] md:min-h-[220px] rounded-xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] md:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-1 md:hover:-translate-y-2 block">
            <img 
              alt="Canada Stadium" 
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRC36DRCxzcVlZwokGIGOstGREly2zvtX3fCS5dVoQuKGiNmHufbHCJTZhUB-Sc0U6R51Mbht6CtAOwdaTVRF2L2ATXMwsrDd923IY3T8t5uBnXteiDz7zeZo4-h3XIaJqBFn60GREjgs9ZWbMabAdi74fNMTiiD5QYJ_aqx_JhkVrpUbVfbt1cXMNcYlXwMGeQ8jR3-_7-cZp7dK_A2R3h2H9Z3zYTvovHWshWhqq8SB0YUZ7gCdQObrRiRj6o-nWTs4oeZ2lTqU"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-2.5 md:p-6 w-full backdrop-blur-md bg-surface-container-lowest/30 border-t border-white/10 flex flex-col gap-1 md:gap-2">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end">
                <h2 className="font-headline-lg text-lg md:text-headline-lg text-white leading-none">Canada</h2>
                <span className="text-secondary/80 group-hover:text-secondary font-label-caps text-[8px] md:text-xs tracking-wider uppercase flex items-center gap-0.5 md:gap-1 transition-colors mt-0.5 md:mt-0">
                  <span className="hidden md:inline">View </span>Cities <span className="material-symbols-outlined text-[10px] md:text-[14px]">arrow_forward</span>
                </span>
              </div>
              <p className="font-body-md text-[9px] leading-tight md:text-body-md text-on-surface-variant line-clamp-3 md:line-clamp-none">2 Host Cities • The new frontier. Blending stunning natural backdrops with state-of-the-art urban arenas.</p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
