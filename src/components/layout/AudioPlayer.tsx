import { useEffect, useState } from 'react';

const AUDIO_TRACKS = [
  '/audio/AREA21__@MartinGarrix___@Maejor__-_Lovin__Every_Minute__Official_Video_(128k).mp3',
  '/audio/Aya_Nakamura_-_Copines__Clip_officiel_(128k).mp3',
  '/audio/Chawki_-_Time_Of_Our_Lives__Official_Music_Video_(128k).mp3',
  '/audio/Clean_Bandit_-_Symphony__feat._Zara_Larsson__[Official_Video](128k).mp3',
  '/audio/Cozy_Panic_-__FIFA_22__⚽️🎵_catchy_song__ft._Mick_C___Widzo_Li_(128k).mp3',
  '/audio/DJ_Snake_-_Middle_ft._Bipolar_Sunshine(128k).mp3',
  '/audio/David_Guetta_ft._Zara_Larsson_-_This_One_s_For_You__Music_Video___UEFA_EURO_2016™_Official_Song_(128k).mp3',
  '/audio/Hayya_Hayya__Better_Together____FIFA_World_Cup_2022™_Official_Soundtrack(128k).mp3',
  '/audio/IShowSpeed_-_World_Cup__Champions__[Official_Music_Video](128k).mp3',
  '/audio/Jennifer_Lopez,_Pitbull_-_On_The_Floor__Official_Music_Video_(128k).mp3',
  '/audio/K_NAAN_-_Wavin__Flag__Coca-Cola_Celebration_Mix_(128k).mp3',
  '/audio/Kehlani___G-Eazy_-_Good_Life__from_The_Fate_of_the_Furious__The_Album__[Official_Music_Video](128k).mp3',
  '/audio/M83__Midnight_City__Official_video(128k).mp3',
  '/audio/MAGIC_SYSTEM_-_Magic_In_The_Air_Feat._Chawki_[Clip_Officiel](128k).mp3',
  '/audio/MICAH_PALACE_-_RODEO__Official_English_Lyric_Video_(128k).mp3',
  '/audio/Maher_Zain___Humood_-_Tahayya___World_Cup_2022___ماهر_زين_و_حمود_الخضر_-_تهيّا(128k).mp3',
  '/audio/Ricky_Martin_-_The_Cup_of_Life__Official_Video_(128k).mp3',
  '/audio/Shakira,_Burna_Boy_-_Dai_Dai__Official_Video_(128k).mp3',
  '/audio/Shakira_-_La_La_La__Brazil_2014__ft._Carlinhos_Brown(128k).mp3',
  '/audio/Shakira_-_Waka_Waka__This_Time_for_Africa___The_Official_2010_FIFA_World_Cup™_Song_(128k).mp3',
  '/audio/Tate_McRae_-_Just_Keep_Watching__From_F1®_The_Movie___Official_Video_(128k).mp3',
  '/audio/The_Kid_LAROI,_Justin_Bieber_-_STAY__Official_Video_(256k).mp3',
  '/audio/The_Weeknd_-_Blinding_Lights__Official_Video_(128k).mp3',
  '/audio/The_Weeknd_-_Starboy_ft._Daft_Punk__Official_Video__ft._Daft_Punk(256k).mp3',
  '/audio/We_Are_One__Ole_Ola__[The_Official_2014_FIFA_World_Cup_Song]__Olodum_Mix_(128k).mp3',
  '/audio/정국_Jung_Kook__of_BTS__featuring_Fahad_Al_Kubaisi_-_Dreamers___FIFA_World_Cup_2022_Soundtrack(128k).mp3'
];

let globalAudio: HTMLAudioElement | null = null;
let interactListenersAttached = false;

export default function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('wc26_audio_muted') === 'true';
  });

  useEffect(() => {
    const playNextTrack = () => {
      if (globalAudio) {
        const currentSrc = globalAudio.src ? new URL(globalAudio.src, window.location.origin).pathname : '';
        let randomTrack;
        do {
          randomTrack = AUDIO_TRACKS[Math.floor(Math.random() * AUDIO_TRACKS.length)];
        } while (randomTrack === currentSrc && AUDIO_TRACKS.length > 1);
        
        globalAudio.src = randomTrack;
        if (!globalAudio.muted) {
          globalAudio.play().catch(e => console.error("Audio play failed on next track", e));
        }
      }
    };

    if (!globalAudio) {
      globalAudio = new Audio();
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      globalAudio.volume = isMobile ? 0.02 : 0.15; // Ambient volume
      globalAudio.muted = isMuted;
      
      globalAudio.addEventListener('ended', playNextTrack);
      
      // Update localStorage periodically so we can restore time on reload
      globalAudio.addEventListener('timeupdate', () => {
        if (globalAudio) {
          localStorage.setItem('wc26_audio_time', globalAudio.currentTime.toString());
          const currentSrc = globalAudio.src ? new URL(globalAudio.src, window.location.origin).pathname : '';
          localStorage.setItem('wc26_audio_src', currentSrc);
        }
      });

      const savedSrc = localStorage.getItem('wc26_audio_src');

      let initialTrack;
      do {
        initialTrack = AUDIO_TRACKS[Math.floor(Math.random() * AUDIO_TRACKS.length)];
      } while (initialTrack === savedSrc && AUDIO_TRACKS.length > 1);
        
      globalAudio.src = initialTrack;

      // Only attempt to autoplay if the user hasn't explicitly muted
      if (!isMuted) {
        globalAudio.play().catch(() => {
          // Browser blocked autoplay. Wait for user interaction.
          if (!interactListenersAttached) {
            interactListenersAttached = true;
            const startOnInteract = () => {
              if (globalAudio && globalAudio.paused && !globalAudio.muted) {
                globalAudio.play().catch(console.error);
              }
              document.removeEventListener('click', startOnInteract);
              window.removeEventListener('scroll', startOnInteract);
              window.removeEventListener('touchstart', startOnInteract);
            };
            
            document.addEventListener('click', startOnInteract);
            window.addEventListener('scroll', startOnInteract, { passive: true });
            window.addEventListener('touchstart', startOnInteract, { passive: true });
          }
        });
      }
    }

    return () => {
      // We don't destroy globalAudio on component unmount because it should persist across route changes,
      // and we want to avoid strict mode duplicating it.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync state changes
  useEffect(() => {
    if (globalAudio) {
      globalAudio.muted = isMuted;
      if (isMuted) {
        globalAudio.pause();
      } else {
        globalAudio.play().catch(e => {
          console.error("Audio play failed on unmute", e);
        });
      }
    }
    localStorage.setItem('wc26_audio_muted', isMuted.toString());
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <button 
      onClick={toggleMute}
      className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 p-3 bg-surface-container/60 backdrop-blur-md rounded-full border border-white/10 hover:border-secondary transition-colors group shadow-lg"
      aria-label={isMuted ? "Unmute soundtrack" : "Mute soundtrack"}
    >
      <span 
        className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors" 
        style={{ fontVariationSettings: "'FILL' 0" }}
      >
        {isMuted ? 'volume_off' : 'volume_up'}
      </span>
    </button>
  );
}
