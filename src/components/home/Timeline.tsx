export default function Timeline() {
  return (
    <section className="relative mb-10 md:mb-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-10 md:pt-16">
      <div className="text-center mb-10 relative">
        <h1 className="font-display-hero text-5xl md:text-display-hero text-on-surface relative z-10">THE LEGACY</h1>
        <p className="font-label-caps text-label-caps text-secondary mt-4 tracking-[0.2em]">1930 — 2026</p>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display-hero text-[80px] md:text-[200px] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] whitespace-nowrap z-0 opacity-50 pointer-events-none">HISTORY</div>
      </div>
      
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/20 -translate-x-1/2"></div>
        
        {/* Timeline Items */}
        <div className="space-y-8 md:space-y-12">
          {/* 1930 */}
          <div className="relative flex flex-col md:flex-row items-center md:justify-between group">
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-secondary rotate-45 -translate-x-1/2 mt-6 md:mt-0 shadow-[0_0_10px_rgba(233,195,73,0.8)] z-10"></div>
            <div className="w-full md:w-[45%] pl-12 md:pl-0 md:pr-12 text-left md:text-right">
              <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-secondary">1930</h2>
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2 md:mb-4">URUGUAY</h3>
              <p className="font-body-md text-body-md text-on-surface/80">The inaugural tournament set the stage. Thirteen teams gathered in Montevideo to begin a tradition that would unite the globe in a shared passion.</p>
            </div>
            <div className="w-full md:w-[45%] pl-12 md:pl-0 mt-4 md:mt-0">
              <div className="relative h-32 md:h-40 w-full bg-surface-container-high rounded-lg overflow-hidden border border-white/10 paper-cut-shadow group-hover:border-secondary/50 transition-colors duration-500">
                <img alt="1930 Uruguay" className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSGMANKawDdY0UyyTZkMKNdqyXcqOtmSdhNeK5uCK-ypIsO-cOnrxAbpC8amxIElvh9ycXo6R4_8xS-zsOc_czCG7oB75IT3MpD9KVq1ojo-K1z8rLCO-df4EfBGKHR5wEUj_vCiDZ2tVLIsFCLEBOQbeF_zqF2PfOQa4B6f7fm0UBRwafLWx7zs_iJL0lqjnxmwt1k5aS_1x9Dd2FF0b8uBJiHuPjVzi-wfx63hqRYTRAjR8jyMZI_BwKN2G-5Kx-ZgcQ1YWxLZM"/>
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
              </div>
            </div>
          </div>

          {/* 1970 */}
          <div className="relative flex flex-col md:flex-row-reverse items-center md:justify-between group">
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-surface-container-highest border border-secondary rotate-45 -translate-x-1/2 mt-6 md:mt-0 z-10 transition-colors group-hover:bg-secondary"></div>
            <div className="w-full md:w-[45%] pl-12 md:pl-0 md:pl-12 text-left">
              <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-secondary">1970</h2>
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2 md:mb-4">MEXICO</h3>
              <p className="font-body-md text-body-md text-on-surface/80">The beautiful game in vibrant color. A tournament defined by attacking flair, legendary squads, and the iconic Jules Rimet trophy finding a permanent home.</p>
            </div>
            <div className="w-full md:w-[45%] pl-12 md:pl-0 mt-4 md:mt-0">
              <div className="relative h-32 md:h-40 w-full bg-surface-container-high rounded-lg overflow-hidden border border-white/10 paper-cut-shadow group-hover:border-secondary/50 transition-colors duration-500">
                <img alt="1970 Mexico" className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjqfIBejCykf4AunOd7L7176DzvPx05JMiOQhHZ6G9Gq8ny09jH1Vj-8BBMDD2v0Z4oxN12U18Bl9SfOldkT3MrqOSvVR6-3ewlhsB103TS-s_Rig2HVIYFq0TBOh-l6_Uv44ZpMQYlFVbr7gCkkhnTr75RLGGsPTV5Jqc4WXs9tNoopSrzB0bdWjr99j_8wYGw9wdg9hz5lZyqBe6Hhj6rQtOMZAL_qUWaV-9v0ILrN7oLx7nkbyoV_X0eRSaQyGkzmlYfi-XlgE"/>
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
              </div>
            </div>
          </div>

          {/* 2026 */}
          <div className="relative flex flex-col md:flex-row items-center md:justify-between group">
            <div className="absolute left-4 md:left-1/2 w-6 h-6 bg-secondary rotate-45 -translate-x-1/2 mt-6 md:mt-0 shadow-[0_0_20px_rgba(233,195,73,1)] z-10 animate-pulse"></div>
            <div className="w-full md:w-[45%] pl-12 md:pl-0 md:pr-12 text-left md:text-right">
              <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-secondary">2026</h2>
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2 md:mb-4">USA • CANADA • MEXICO</h3>
              <p className="font-body-md text-body-md text-on-surface/80">The largest stage ever built. 48 teams spanning a continent, ready to write the next monumental chapter in the history of the sport.</p>
            </div>
            <div className="w-full md:w-[45%] pl-12 md:pl-0 mt-4 md:mt-0">
              <div className="relative h-32 md:h-40 w-full bg-surface-container-high rounded-lg overflow-hidden border border-secondary/50 paper-cut-shadow">
                <img alt="2026 World Cup" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB8R1Gt-MTZWstTm4kNiGNXxejqlbHTkQxiFbQAEj45wSnphrbivaJzJ43wrYZEAyajnPIxpS_3KU6ahnzDvNql0EFLu2vXHM0hCmwQzTWQGaoFkJ2f5t1vo01eZ_SeXpfJa9jSLi4Gb7l9f_vYdXsBPPtgW6kjGRa38PtpUw9q0OjklVyI7md2BOCFrsCBaJRnh_RdML_gpfJJvXG4Rj5pU_7cKFEtNWt4z1A8ZWP6OwyQ9yaJfJk5qYnWhptovXXFgLrBzGCJAg"/>
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-40"></div>
                <div className="absolute top-4 right-4 border border-white/20 px-3 py-1 rounded-full backdrop-blur-md bg-black/30 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-ping"></div>
                  <span className="font-label-caps text-[10px] text-white tracking-widest">NEXT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
