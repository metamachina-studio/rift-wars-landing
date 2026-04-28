const API_URL = import.meta.env.PUBLIC_API_URL || 'https://api.metamachina.io';

export async function fetchApi<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export interface LeaderboardEntry {
  rank: number;
  display_name: string;
  elo: number;
  level: number;
  wins: number;
  losses: number;
  matches_played: number;
  best_combo: number;
  school?: string;
  clan_name?: string;
}

export interface ClanRanking {
  rank: number;
  name: string;
  tag: string;
  level: number;
  xp: number;
  member_count: number;
  total_wins: number;
  total_losses: number;
}

export interface HealthData {
  status: string;
  activePlayers?: number;
  rooms?: number;
}

export interface PublicStats {
  totalPlayers: number;
  totalMatches: number;
  totalCards: number;
  activePlayers24h: number;
}

export interface FeaturedPlayer {
  display_name: string;
  elo: number;
  level: number;
  school: string;
  clan_name: string;
  wins: number;
  losses: number;
  best_combo: number;
}

export function getApiUrl(): string {
  return API_URL;
}
