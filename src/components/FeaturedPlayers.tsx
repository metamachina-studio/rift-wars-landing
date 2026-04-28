import { useState, useEffect } from 'react';
import { resolvePortraitUrl, type HeroPortrait } from '../lib/portraits';

const API_URL = import.meta.env.PUBLIC_API_URL || 'https://api.metamachina.io';

interface Player {
  display_name: string;
  elo: number;
  level: number;
  games_won: number;
  games_lost: number;
  games_played: number;
  hero_portrait?: HeroPortrait | null;
}

const RANK_STYLES = {
  1: {
    color: '#F2AD23',
    glow: '0 0 20px rgba(242, 173, 35, 0.4), 0 0 40px rgba(242, 173, 35, 0.2)',
    height: 280,
    heightMd: 360,
    zIndex: 20,
    pulseClass: 'podium-pulse-gold',
  },
  2: {
    color: '#C0C0C0',
    glow: '0 0 15px rgba(192, 192, 192, 0.3), 0 0 30px rgba(192, 192, 192, 0.15)',
    height: 230,
    heightMd: 300,
    zIndex: 10,
    pulseClass: 'podium-pulse-silver',
  },
  3: {
    color: '#CD7F32',
    glow: '0 0 15px rgba(205, 127, 50, 0.3), 0 0 30px rgba(205, 127, 50, 0.15)',
    height: 220,
    heightMd: 280,
    zIndex: 10,
    pulseClass: 'podium-pulse-bronze',
  },
} as const;

function PlayerColumn({ player, rank, position }: { player: Player; rank: 1 | 2 | 3; position: 'left' | 'center' | 'right' }) {
  const style = RANK_STYLES[rank];
  const isCenter = position === 'center';

  // Overlap: left shifts right, right shifts left
  const marginStyle = position === 'left'
    ? { marginRight: '-30px' }
    : position === 'right'
      ? { marginLeft: '-30px' }
      : {};

  return (
    <div
      className="flex flex-col items-center relative"
      style={{
        zIndex: style.zIndex,
        ...marginStyle,
        flex: isCenter ? '1.2' : '1',
        maxWidth: isCenter ? 300 : 260,
      }}
    >
      {/* Rank Number */}
      <div
        className={`font-orbitron font-black mb-2 ${isCenter ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}
        style={{
          color: style.color,
          textShadow: `0 0 15px ${style.color}80, 0 0 30px ${style.color}40`,
        }}
      >
        #{rank}
      </div>

      {/* Full Portrait */}
      <div
        className="relative w-full"
        style={{ filter: `drop-shadow(${style.glow.split(',')[0]})` }}
      >
        {player.hero_portrait ? (
          <img
            src={resolvePortraitUrl(player.hero_portrait)}
            alt={player.display_name}
            className="w-full object-contain"
            style={{
              height: style.height,
              filter: `drop-shadow(0 0 12px ${style.color}50)`,
            }}
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        ) : null}
        {/* Fallback */}
        <div
          className="w-full items-center justify-center rounded-lg"
          style={{
            height: style.height,
            display: player.hero_portrait ? 'none' : 'flex',
            background: `linear-gradient(180deg, ${style.color}15 0%, transparent 100%)`,
            border: `1px solid ${style.color}30`,
          }}
        >
          <span
            className="font-orbitron font-black"
            style={{ color: style.color, fontSize: isCenter ? 72 : 56 }}
          >
            {player.display_name.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Player Name */}
      <h4
        className={`font-orbitron font-bold uppercase tracking-wide text-center truncate max-w-full mt-3 ${isCenter ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}
        style={{
          color: '#e0e0e0',
          textShadow: `0 0 10px ${style.color}40`,
        }}
      >
        {player.display_name}
      </h4>

      {/* Stats */}
      <div className="flex items-center gap-3 mt-2">
        <div className="text-center">
          <p
            className={`font-orbitron font-black ${isCenter ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}
            style={{ color: style.color, textShadow: `0 0 12px ${style.color}60` }}
          >
            {player.elo}
          </p>
          <p className="font-rajdhani text-[10px] text-mm-muted uppercase tracking-widest">ELO</p>
        </div>
        <div className="text-center">
          <p className="font-orbitron text-sm text-mm-text">{player.level}</p>
          <p className="font-rajdhani text-[10px] text-mm-muted uppercase">LVL</p>
        </div>
        <div className="text-center">
          <span className="font-orbitron text-sm text-mm-neon">{player.games_won}</span>
          <span className="text-mm-muted text-xs">/</span>
          <span className="font-orbitron text-sm text-mm-red">{player.games_lost}</span>
          <p className="font-rajdhani text-[10px] text-mm-muted uppercase">W/L</p>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedPlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/leaderboard?limit=3`)
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : data.leaderboard || [];
        setPlayers(list.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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

  if (players.length === 1) {
    return (
      <div className="flex justify-center">
        <PlayerColumn player={players[0]} rank={1} position="center" />
      </div>
    );
  }

  if (players.length === 2) {
    return (
      <div className="flex items-end justify-center max-w-3xl mx-auto">
        <PlayerColumn player={players[1]} rank={2} position="left" />
        <PlayerColumn player={players[0]} rank={1} position="center" />
      </div>
    );
  }

  return (
    <div className="flex items-end justify-center max-w-4xl mx-auto px-2">
      <PlayerColumn player={players[1]} rank={2} position="left" />
      <PlayerColumn player={players[0]} rank={1} position="center" />
      <PlayerColumn player={players[2]} rank={3} position="right" />
    </div>
  );
}
