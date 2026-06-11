// API Service for fetching World Cup data
// Handles switching between static JSON fallbacks and live API endpoints

const USE_LIVE_API = true; // Set to true when World Cup starts
const API_BASE_URL = 'https://worldcup26.ir/get'; // Live API endpoint

import { getProfileForTeam, type TeamProfileData, type Player } from './teamData';

export interface Team {
  id: string;
  name_en: string;
  flag: string;
  fifa_code: string;
  group?: string;
  profile?: TeamProfileData;
}

export interface Stadium {
  id: string;
  name_en: string;
  city_en: string;
  capacity?: string;
}

export interface Match {
  id: string;
  home_team_id: string;
  away_team_id: string;
  home_team_label?: string;
  away_team_label?: string;
  home_score: string;
  away_score: string;
  home_scorers?: string;
  away_scorers?: string;
  local_date: string;
  stadium_id: string;
  time_elapsed: string;
  type: string;
  finished: string;
  group?: string;
  matchday?: string;
}

export interface GroupTeam {
  team_id: string;
  mp: string;
  w: string;
  d: string;
  l: string;
  pts: string;
  gf: string;
  ga: string;
  gd: string;
}

export interface Group {
  name: string;
  teams: GroupTeam[];
}

export const api = {
  async getMatches(): Promise<Match[]> {
    if (USE_LIVE_API) {
      try {
        const response = await fetch(`${API_BASE_URL}/games`);
        if (response.ok) {
          const data = await response.json();
          return data.games || data;
        }
      } catch (e) {
        console.warn('Failed to fetch live matches, falling back to static data', e);
      }
    }
    const res = await fetch('/data/football.matches.json');
    return await res.json();
  },

  async getTeams(): Promise<Team[]> {
    if (USE_LIVE_API) {
      try {
        const response = await fetch(`${API_BASE_URL}/teams`);
        if (response.ok) {
          const data = await response.json();
          return data.teams || data;
        }
      } catch (e) {
        console.warn('Failed to fetch live teams, falling back to static data', e);
      }
    }
    const res = await fetch('/data/football.teams.json');
    const teams: Team[] = await res.json();
    let squads: Record<string, { coach?: string; players?: Player[] }> = {};
    let groups: Group[] = [];
    try {
      const [squadsRes, groupsData] = await Promise.all([
        fetch('/data/squads.json'),
        this.getGroups()
      ]);
      if (squadsRes.ok) {
        squads = await squadsRes.json();
      }
      groups = groupsData;
    } catch (e) {
      console.warn("Failed to load auxiliary data", e);
    }
    
    const teamGroupMap: Record<string, string> = {};
    groups.forEach(g => {
      g.teams.forEach(t => {
        teamGroupMap[t.team_id] = g.name;
      });
    });

    return teams.map(team => ({
      ...team,
      group: teamGroupMap[team.id],
      profile: getProfileForTeam(team, squads[team.id])
    }));
  },

  async getTeam(id: string): Promise<Team | undefined> {
    const teams = await this.getTeams();
    return teams.find(t => t.id === id);
  },

  async getStadiums(): Promise<Stadium[]> {
    if (USE_LIVE_API) {
      try {
        const response = await fetch(`${API_BASE_URL}/stadiums`);
        if (response.ok) {
          const data = await response.json();
          return data.stadiums || data;
        }
      } catch (e) {
        console.warn('Failed to fetch live stadiums, falling back to static data', e);
      }
    }
    const res = await fetch('/data/football.stadiums.json');
    return await res.json();
  },

  async getGroups(): Promise<Group[]> {
    if (USE_LIVE_API) {
      try {
        const response = await fetch(`${API_BASE_URL}/groups`);
        if (response.ok) {
          const data = await response.json();
          return data.groups || data;
        }
      } catch (e) {
        console.warn('Failed to fetch live groups, falling back to static data', e);
      }
    }
    const res = await fetch('/data/groups.json');
    return await res.json();
  }
};
