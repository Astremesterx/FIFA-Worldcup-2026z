export const stadiumOffsets: Record<string, string> = {
  "1": "-06:00", // Mexico City (CST, no DST)
  "2": "-06:00", // Guadalajara (CST, no DST)
  "3": "-06:00", // Monterrey (CST, no DST)
  "4": "-05:00", // Dallas (CDT)
  "5": "-05:00", // Houston (CDT)
  "6": "-05:00", // Kansas City (CDT)
  "7": "-04:00", // Atlanta (EDT)
  "8": "-04:00", // Miami (EDT)
  "9": "-04:00", // Boston (EDT)
  "10": "-04:00", // Philadelphia (EDT)
  "11": "-04:00", // New York/New Jersey (EDT)
  "12": "-04:00", // Toronto (EDT)
  "13": "-07:00", // Vancouver (PDT)
  "14": "-07:00", // Seattle (PDT)
  "15": "-07:00", // San Francisco (PDT)
  "16": "-07:00"  // Los Angeles (PDT)
};

export function getMatchDate(localDateStr: string, stadiumId: string): Date | null {
  if (!localDateStr) return null;
  const [datePart, timePart] = localDateStr.split(' ');
  if (!datePart || !timePart) return null;
  
  const [month, day, year] = datePart.split('/');
  const [hourStr, minuteStr] = timePart.split(':');
  const offset = stadiumOffsets[stadiumId] || "-04:00";
  
  const isoString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hourStr.padStart(2, '0')}:${minuteStr.padStart(2, '0')}:00${offset}`;
  const dateObj = new Date(isoString);
  
  if (isNaN(dateObj.getTime())) return null;
  return dateObj;
}

export function formatMatchTime(localDateStr: string, userTimeZone: string = 'local', stadiumId: string = '11') {
  if (!localDateStr) return { mainTime: '', globalTime: '' };
  
  try {
    const dateObj = getMatchDate(localDateStr, stadiumId);

    if (!dateObj) {
      const timePart = localDateStr.split(' ')[1] || '';
      return { mainTime: timePart, globalTime: '' };
    }

    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    };

    if (userTimeZone !== 'local') {
      options.timeZone = userTimeZone;
      dateOptions.timeZone = userTimeZone;
    }

    const mainTime = dateObj.toLocaleTimeString('en-US', options);
    const mainTimeFull = dateObj.toLocaleTimeString('en-US', { ...options, timeZoneName: 'short' });
    const timeZoneAbbr = mainTimeFull.replace(mainTime, '').trim();

    const globalTime = dateObj.toLocaleTimeString('en-US', {
      timeZone: 'UTC',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }) + ' UTC';

    const dateStr = dateObj.toLocaleDateString('en-US', dateOptions);

    return { mainTime, timeZoneAbbr, globalTime, dateStr };
  } catch {
    const timePart = localDateStr.split(' ')[1] || '';
    const datePart = localDateStr.split(' ')[0] || '';
    return { mainTime: timePart, timeZoneAbbr: '', globalTime: '', dateStr: datePart };
  }
}
