import { useState, useEffect } from 'react';

const API_URL = import.meta.env.PUBLIC_API_URL || 'https://rift.metamachina.io';

interface Player {
  display_name: string;
  elo: number;
  level: number;
  wins: number;
  losses: number;
  best_combo?: number;
}

const SCHOOL_COLORS: Record<string, string> = {
  kazen: '#F2AD23',
  iwakami: '#a0a0a0',
  seika: '#ff6b35',
  mizu: '#4dabf7',
};

export default function FeaturedPlayers({ limit = 8 }: { limit?: number }) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/leaderboard?limit=${limit}`)
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : data.leaderboard || [];
        setPlayers(list.slice(0, limit));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [limit]);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block w-8 h-8 border-2 border-mm-gold-primary/30 border-t-mm-gold-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (players.length === 0) {
    return <p className="text-center py-8 text-mm-text2 font-exo">Be among the first featured Rifters!</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {players.map((p, i) => (
        <div
          key={i}
          className="bg-mm-card/50 border border-mm-elevated/50 p-4 text-center card-hover"
        >
          {/* Rank Badge */}
          <div className="font-orbitron text-xs text-mm-gold-primary mb-2">#{i + 1}</div>

          {/* Avatar placeholder */}
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-mm-elevated/50 border border-mm-gold-primary/20 flex items-center justify-center">
            <span className="font-orbitron text-xl text-mm-gold-primary">
              {p.display_name.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Name */}
          <h4 className="font-orbitron text-sm font-bold text-mm-text mb-1 truncate">
            {p.display_name}
          </h4>

          {/* Stats */}
          <div className="flex justify-center gap-3 mt-2">
            <div className="text-center">
              <p className="font-orbitron text-sm text-mm-gold-primary">{p.elo}</p>
              <p className="font-rajdhani text-[10px] text-mm-muted uppercase">ELO</p>
            </div>
            <div className="text-center">
              <p className="font-orbitron text-sm text-mm-text">{p.level}</p>
              <p className="font-rajdhani text-[10px] text-mm-muted uppercase">LVL</p>
            </div>
          </div>

          <div className="mt-2">
            <span className="font-exo text-xs text-mm-neon">{p.wins}W</span>
            <span className="text-mm-muted text-xs mx-1">/</span>
            <span className="font-exo text-xs text-mm-red">{p.losses}L</span>
          </div>
        </div>
      ))}
    </div>
  );
}
