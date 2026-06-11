import React, { createContext, useContext, useState } from 'react';

export type ReminderDetails = {
  homeTeam: string;
  awayTeam: string;
  time: string;
};

type NotificationContextType = {
  reminders: string[]; // Match IDs
  toggleReminder: (matchId: string, details?: ReminderDetails) => void;
  hasReminder: (matchId: string) => boolean;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [reminders, setReminders] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('wc2026_reminders');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Register Service Worker on mount for mobile notifications
  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.error('Service Worker registration failed:', err);
      });
    }
  }, []);

  const toggleReminder = async (matchId: string, details?: ReminderDetails) => {
    const isAdding = !reminders.includes(matchId);

    if (isAdding && details && 'Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          let shownViaSW = false;
          
          if ('serviceWorker' in navigator) {
            try {
              const registration = await navigator.serviceWorker.getRegistration();
              if (registration) {
                await registration.showNotification('FIFA WC 2026 Match Reminder', {
                  body: `${details.homeTeam} vs ${details.awayTeam}\nKickoff: ${details.time}`,
                  icon: '/world cup/icon.png',
                  badge: '/world cup/icon.png',
                  vibrate: [200, 100, 200],
                  tag: `match-${matchId}`
                } as any);
                shownViaSW = true;
              }
            } catch (err) {
              console.warn("ServiceWorker notification failed, falling back", err);
            }
          }

          if (!shownViaSW) {
            // Fallback for desktop browsers where Service Worker isn't strictly required
            new Notification('FIFA WC 2026 Match Reminder', {
              body: `${details.homeTeam} vs ${details.awayTeam}\nKickoff: ${details.time}`,
              icon: '/world cup/icon.png'
            });
          }
        } else if (permission === 'denied') {
          alert('Notification permission was denied. Please allow notifications in your browser settings.');
        }
      } catch (e) {
        console.error("Failed to request notification permission", e);
      }
    }

    setReminders(prev => {
      const isReminded = prev.includes(matchId);
      const next = isReminded ? prev.filter(id => id !== matchId) : [...prev, matchId];
      localStorage.setItem('wc2026_reminders', JSON.stringify(next));
      return next;
    });
  };

  const hasReminder = (matchId: string) => reminders.includes(matchId);

  return (
    <NotificationContext.Provider value={{ reminders, toggleReminder, hasReminder }}>
      {children}
    </NotificationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
