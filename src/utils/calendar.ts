import type { Match, Team, Stadium } from '../services/api';
import { supabase } from '../lib/supabase';
import { getMatchDate } from './time';

export function generateGoogleCalendarLink(match: Match, homeTeam: Team, awayTeam: Team, stadium: Stadium, timezone: string = 'local'): string {
  if (!match || !homeTeam || !awayTeam || !stadium) return '#';

  try {
    const startDate = getMatchDate(match.local_date, match.stadium_id);
    if (!startDate) throw new Error("Invalid start date");
    
    // Assume match is 2 hours long
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    const formatTime = (d: Date) => {
      return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    };

    const text = encodeURIComponent(`FIFA WC 2026: ${homeTeam.name_en} vs ${awayTeam.name_en}`);
    const dates = `${formatTime(startDate)}/${formatTime(endDate)}`;
    const details = encodeURIComponent(`Group ${match.group} - Matchday ${match.matchday}. Follow live on the Smart Match Hub.`);
    const location = encodeURIComponent(`${stadium.name_en}, ${stadium.city_en}`);

    let url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
    if (timezone !== 'local') {
      url += `&ctz=${timezone}`;
    }
    return url;
  } catch (e) {
    console.error("Failed to generate calendar link", e);
    return '#';
  }
}

export async function downloadICS(match: Match, homeTeam: Team, awayTeam: Team, stadium: Stadium, timezone: string = 'local') {
  if (!match || !homeTeam || !awayTeam || !stadium) return;

  try {
    const startDate = getMatchDate(match.local_date, match.stadium_id);
    if (!startDate) throw new Error("Invalid start date");
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    const formatTime = (d: Date) => {
      return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    };

    const text = `FIFA WC 2026: ${homeTeam.name_en} vs ${awayTeam.name_en}`;
    const description = `Group ${match.group} - Matchday ${match.matchday}. Follow live on the Smart Match Hub.`;
    const location = `${stadium.name_en}, ${stadium.city_en}`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${formatTime(startDate)}`,
      `DTEND:${formatTime(endDate)}`,
      `SUMMARY:${text}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent);

    if (isAndroid) {
      // For Android, the Google Calendar web URL naturally deep-links into the native Google Calendar app
      window.open(generateGoogleCalendarLink(match, homeTeam, awayTeam, stadium, timezone), '_blank');
    } else if (isIOS) {
      try {
        const fileName = `WC2026_Match_${match.id}.ics`;
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        
        const { error } = await supabase.storage
          .from('calendars')
          .upload(fileName, blob, {
            upsert: true,
            contentType: 'text/calendar'
          });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('calendars')
          .getPublicUrl(fileName);

        // Redirect to the physical file URL, which forces iOS to natively handle it
        window.location.href = publicUrl;
      } catch (err) {
        console.error("Failed to upload calendar to Supabase", err);
        // Fallback to data URI if upload fails
        const base64 = btoa(unescape(encodeURIComponent(icsContent)));
        window.location.href = `data:text/calendar;charset=utf8;base64,${base64}`;
      }
    } else {
      // Fallback for Desktop: Standard ICS download
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `WC2026_Match_${match.id}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    }
  } catch (e) {
    console.error("Failed to generate ICS file", e);
  }
}
