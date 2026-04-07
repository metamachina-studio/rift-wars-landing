import { useState, useEffect } from 'react';
import { resolvePortraitUrl, type HeroPortrait } from '../lib/portraits';

const API_URL = import.meta.env.PUBLIC_API_URL || 'https://rift.metamachina.io';
const GAME_URL = import.meta.env.PUBLIC_GAME_URL || 'https://rift.metamachina.io';

interface LeaderboardEntry {
  rank?: number;
  display_name: string;
  elo: number;
  level: number;
  wins: number;
  losses: number;
  matches_played: number;
  best_combo?: number;
  hero_portrait?: HeroPortrait | null;
}

interface ClanRanking {
  rank?: number;
  name: string;
  tag: string;
  level: number;
  member_count: number;
  total_wins: number;
  total_losses: number;
}

type Tab = 'players' | 'clans';

function getRankBadge(rank: number) {
  if (rank === 1) return { emoji: '\u{1F947}', cls: 'text-yellow-400' };
  if (rank === 2) return { emoji: '\u{1F948}', cls: 'text-gray-300' };
  if (rank === 3) return { emoji: '\u{1F949}', cls: 'text-amber-600' };
  return null;
}

export default function Leaderboard() {
  const [tab, setTab] = useState<Tab>('players');
  const [players, setPlayers] = useState<LeaderboardEntry[]>([]);
  const [clans, setClans] = useState<ClanRanking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = tab === 'players'
      ? `${API_URL}/leaderboard?limit=20`
      : `${API_URL}/api/clan/rankings?limit=20`;

    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (tab === 'players') {
          setPlayers(Array.isArray(data) ? data : data.leaderboard || []);
        } else {
          setClans(Array.isArray(data) ? data : data.rankings || []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [tab]);

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8">
        {(['players', 'clans'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2 font-orbitron text-sm uppercase tracking-wider border cursor-pointer transition-all
              ${t === tab
                ? 'border-mm-gold-primary bg-mm-gold-primary/10 text-mm-gold-primary'
                : 'border-mm-elevated text-mm-text2 hover:border-mm-gold-primary/30 bg-transparent'
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block w-8 h-8 border-2 border-mm-gold-primary/30 border-t-mm-gold-primary rounded-full animate-spin" />
        </div>
      ) : tab === 'players' ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-mm-elevated/50">
                <th className="font-rajdhani text-mm-text2 text-left py-3 px-2 uppercase tracking-wider text-xs">#</th>
                <th className="font-rajdhani text-mm-text2 text-left py-3 px-2 uppercase tracking-wider text-xs">Player</th>
                <th className="font-rajdhani text-mm-text2 text-right py-3 px-2 uppercase tracking-wider text-xs">ELO</th>
                <th className="font-rajdhani text-mm-text2 text-right py-3 px-2 uppercase tracking-wider text-xs hidden sm:table-cell">Level</th>
                <th className="font-rajdhani text-mm-text2 text-right py-3 px-2 uppercase tracking-wider text-xs hidden md:table-cell">W/L</th>
                <th className="font-rajdhani text-mm-text2 text-right py-3 px-2 uppercase tracking-wider text-xs hidden lg:table-cell">Matches</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p, i) => {
                const rank = p.rank ?? i + 1;
                const badge = getRankBadge(rank);
                return (
                  <tr key={i} className="border-b border-mm-elevated/20 hover:bg-mm-elevated/20 transition-colors">
                    <td className="py-3 px-2 font-orbitron text-mm-text2">
                      {badge ? <span className={badge.cls}>{badge.emoji}</span> : rank}
                    </td>
                    <td className="py-3 px-2 font-exo text-mm-text font-semibold">
                      <div className="flex items-center gap-2">
                        {p.hero_portrait ? (
                          <img
                            src={resolvePortraitUrl(p.hero_portrait)}
                            alt=""
                            className="w-7 h-7 rounded-full object-cover border border-mm-gold-primary/20 flex-shrink-0"
                            loading="lazy"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-mm-elevated/50 border border-mm-gold-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="font-orbitron text-[10px] text-mm-gold-primary">{p.display_name.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                        {p.display_name}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right font-orbitron text-mm-gold-primary">{p.elo}</td>
                    <td className="py-3 px-2 text-right font-rajdhani text-mm-text2 hidden sm:table-cell">{p.level}</td>
                    <td className="py-3 px-2 text-right font-exo text-mm-text2 hidden md:table-cell">
                      <span className="text-mm-neon">{p.wins}</span>
                      <span className="text-mm-muted">/</span>
                      <span className="text-mm-red">{p.losses}</span>
                    </td>
                    <td className="py-3 px-2 text-right font-rajdhani text-mm-text2 hidden lg:table-cell">{p.matches_played}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {players.length === 0 && (
            <p className="text-center py-8 text-mm-text2 font-exo">No ranked players yet. Be the first!</p>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-mm-elevated/50">
                <th className="font-rajdhani text-mm-text2 text-left py-3 px-2 uppercase tracking-wider text-xs">#</th>
                <th className="font-rajdhani text-mm-text2 text-left py-3 px-2 uppercase tracking-wider text-xs">Clan</th>
                <th className="font-rajdhani text-mm-text2 text-right py-3 px-2 uppercase tracking-wider text-xs">Level</th>
                <th className="font-rajdhani text-mm-text2 text-right py-3 px-2 uppercase tracking-wider text-xs hidden sm:table-cell">Members</th>
                <th className="font-rajdhani text-mm-text2 text-right py-3 px-2 uppercase tracking-wider text-xs hidden md:table-cell">W/L</th>
              </tr>
            </thead>
            <tbody>
              {clans.map((c, i) => {
                const rank = c.rank ?? i + 1;
                const badge = getRankBadge(rank);
                return (
                  <tr key={i} className="border-b border-mm-elevated/20 hover:bg-mm-elevated/20 transition-colors">
                    <td className="py-3 px-2 font-orbitron text-mm-text2">
                      {badge ? <span className={badge.cls}>{badge.emoji}</span> : rank}
                    </td>
                    <td className="py-3 px-2">
                      <span className="font-exo text-mm-text font-semibold">{c.name}</span>
                      <span className="font-rajdhani text-mm-muted text-xs ml-2">[{c.tag}]</span>
                    </td>
                    <td className="py-3 px-2 text-right font-orbitron text-mm-gold-primary">{c.level}</td>
                    <td className="py-3 px-2 text-right font-rajdhani text-mm-text2 hidden sm:table-cell">{c.member_count}</td>
                    <td className="py-3 px-2 text-right font-exo text-mm-text2 hidden md:table-cell">
                      <span className="text-mm-neon">{c.total_wins}</span>
                      <span className="text-mm-muted">/</span>
                      <span className="text-mm-red">{c.total_losses}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {clans.length === 0 && (
            <p className="text-center py-8 text-mm-text2 font-exo">No clans created yet. Start one!</p>
          )}
        </div>
      )}

      {/* CTA */}
      <div className="text-center mt-8">
        <a
          href={GAME_URL}
          target="_blank"
          rel="noopener"
          className="btn-primary text-sm"
        >
          Challenge the Top Players
        </a>
      </div>
    </div>
  );
}
