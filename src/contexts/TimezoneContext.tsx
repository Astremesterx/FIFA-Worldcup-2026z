import React, { createContext, useContext, useState } from 'react';

type TimezoneContextType = {
  timezone: string;
  setTimezone: (timezone: string) => void;
};

const TimezoneContext = createContext<TimezoneContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const TIMEZONES = [
  { value: 'local', label: 'Local Time' },
  { value: 'UTC', label: 'UTC' },
  { value: 'Asia/Kolkata', label: 'IST (India)' },
  { value: 'America/New_York', label: 'EST (New York)' },
  { value: 'America/Chicago', label: 'CST (Chicago)' },
  { value: 'America/Denver', label: 'MST (Denver)' },
  { value: 'America/Los_Angeles', label: 'PST (Los Angeles)' },
  { value: 'America/Sao_Paulo', label: 'BRT (Brasilia)' },
  { value: 'Europe/London', label: 'GMT (London)' },
  { value: 'Europe/Paris', label: 'CET (Paris)' },
  { value: 'Africa/Johannesburg', label: 'SAST (South Africa)' },
  { value: 'Asia/Dubai', label: 'GST (Dubai)' },
  { value: 'Asia/Shanghai', label: 'CST (China)' },
  { value: 'Asia/Tokyo', label: 'JST (Tokyo)' },
  { value: 'Asia/Seoul', label: 'KST (Seoul)' },
  { value: 'Australia/Sydney', label: 'AEST (Sydney)' }
];

export function TimezoneProvider({ children }: { children: React.ReactNode }) {
  const [timezone, setTimezoneState] = useState<string>(() => {
    const saved = localStorage.getItem('wc2026_user_timezone');
    return saved || 'local';
  });

  const setTimezone = (tz: string) => {
    setTimezoneState(tz);
    localStorage.setItem('wc2026_user_timezone', tz);
  };

  return (
    <TimezoneContext.Provider value={{ timezone, setTimezone }}>
      {children}
    </TimezoneContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTimezone() {
  const context = useContext(TimezoneContext);
  if (context === undefined) {
    throw new Error('useTimezone must be used within a TimezoneProvider');
  }
  return context;
}
