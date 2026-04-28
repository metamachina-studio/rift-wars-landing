import { useState, useEffect } from 'react';

const API_URL = import.meta.env.PUBLIC_API_URL || 'https://api.metamachina.io';

export default function PlayerCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchCount() {
      try {
        const res = await fetch(`${API_URL}/health`);
        if (!res.ok) return;
        const data = await res.json();
        if (mounted) {
          setCount(data.activePlayers ?? data.rooms ?? 0);
        }
      } catch {
        // Silent fail — badge just won't show
      }
    }

    fetchCount();
    const interval = setInterval(fetchCount, 30000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  if (count === null) return null;

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mm-bg/60 border border-mm-green/30 badge-pulse">
      <span className="w-2 h-2 rounded-full bg-mm-green animate-pulse" />
      <span className="font-rajdhani text-sm text-mm-green font-semibold tracking-wide">
        {count} {count === 1 ? 'Player' : 'Players'} Online
      </span>
    </div>
  );
}
