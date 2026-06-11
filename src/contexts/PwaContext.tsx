import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the BeforeInstallPromptEvent interface since it's not standard in TypeScript's dom lib yet
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

type PwaContextType = {
  isInstallable: boolean;
  installApp: () => Promise<boolean>;
};

const PwaContext = createContext<PwaContextType | undefined>(undefined);

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // If the app was successfully installed, clear the prompt
    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const installApp = async (): Promise<boolean> => {
    if (!deferredPrompt) return false;
    
    // Show the install prompt
    await deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      return true;
    }
    return false;
  };

  return (
    <PwaContext.Provider value={{ isInstallable: !!deferredPrompt, installApp }}>
      {children}
    </PwaContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePwa() {
  const context = useContext(PwaContext);
  if (context === undefined) {
    throw new Error('usePwa must be used within a PwaProvider');
  }
  return context;
}
