import { Outlet } from 'react-router-dom';
import TopAppBar from './TopAppBar';
import BottomNavBar from './BottomNavBar';
import AudioPlayer from './AudioPlayer';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col">
      <TopAppBar />
      <AudioPlayer />
      <main className="flex-1 relative">
        <Outlet />
      </main>
      <BottomNavBar />
      
      {/* Footer */}
      <footer className="w-full px-margin-desktop bg-surface-container-highest dark:bg-surface-container-lowest py-10 md:py-16 border-t border-white/5 z-10 relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 pb-24 md:pb-16">
        <div className="flex items-center gap-4 font-headline-md text-headline-md text-secondary">
          <img src="/world cup/2026_FIFA_World_Cup_emblem.svg.webp" alt="WC 2026 Logo" className="h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
          WORLD CUP 26
        </div>
        <div className="flex flex-col items-center md:items-end text-sm text-on-surface-variant/60 font-body-sm">
          <span className="mb-1 text-on-surface-variant/80 font-medium">Developed by Salif</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              <a href="https://t.me/Astremester" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@Astremester</a>
            </span>
            <span className="w-1 h-1 rounded-full bg-on-surface-variant/40"></span>
            <span>ID: 599771586</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
