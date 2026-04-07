// Portrait resolution for leaderboard players
// Mirrors the game's cardArt.ts logic to construct art URLs from hero_portrait data

const GAME_URL = 'https://rift.metamachina.io';

export interface HeroPortrait {
  cardName: string;
  clan?: string;
  artIndex?: number;
}

const CLAN_FOLDER_MAP: Record<string, string> = {
  'Arcane Syndicate': 'arcane-syndicate',
  'Bad Time Barbiezz': 'bad-time-barbiezz',
  'Black Sun': 'black-sun',
  'Digital Dagger': 'digital-dagger',
  'Digital Geisha': 'digital-geisha',
  'Doonks': 'doonks',
  'Echo Nexus': 'echo-nexus',
  'Ether Mages': 'ether-mages',
  'Hotep Nation': 'hotep-nation',
  'Quantum Guild': 'quantum-guild',
  'Red Eclipse': 'red-eclipse',
  'Rifters': 'rifters',
  'Skyward Fleet': 'skyward-fleet',
  'Starlight Collective': 'starlight-collective',
  'Triad of the Rising Serpent': 'triad-of-the-rising-serpent',
  'Vortex Syndicate': 'vortex-syndicate',
};

const CLAN_IMAGE_COUNT: Record<string, number> = {
  'arcane-syndicate': 311, 'bad-time-barbiezz': 249, 'black-sun': 328,
  'digital-dagger': 137, 'digital-geisha': 211, 'doonks': 71,
  'echo-nexus': 103, 'ether-mages': 445, 'hotep-nation': 337,
  'quantum-guild': 414, 'red-eclipse': 277, 'rifters': 520,
  'skyward-fleet': 270, 'starlight-collective': 27,
  'triad-of-the-rising-serpent': 257, 'vortex-syndicate': 281,
};

const TOKEN_ART: Record<string, string> = {
  'Nexus Spore': '/art/tokens/nexus-spore.webp',
  'Rift Hatchling': '/art/tokens/rift-hatchling.webp',
  'Umbral Spawn': '/art/tokens/umbral-spawn.webp',
  'Khepri Beetle': '/art/tokens/khepri-beetle.webp',
  'Skyward Sentinel': '/art/tokens/skyward-sentinel.webp',
  'C4': '/art/tokens/c4.webp', 'Landmine': '/art/tokens/landmine.webp',
  'Turret': '/art/tokens/turret.webp', 'Drone': '/art/tokens/drone.webp',
  'Medkit': '/art/tokens/medkit.webp', 'Shield Generator': '/art/tokens/shield-generator.webp',
  'Beacon': '/art/tokens/beacon.webp', 'Battery': '/art/tokens/battery.webp',
  'Scrapper': '/art/tokens/scrapper.webp', 'Husk Unit': '/art/tokens/husk-unit.webp',
  'Phantom': '/art/tokens/phantom.webp', 'Nano Swarm': '/art/tokens/nano-swarm.webp',
  'Replica': '/art/tokens/replica.webp', 'Mech Drone': '/art/tokens/mech-drone.webp',
  'Virus': '/art/tokens/virus.webp', 'Parasite': '/art/tokens/parasite.webp',
  'Jammer': '/art/tokens/jammer.webp', 'Ghost': '/art/tokens/ghost.webp',
  'Rift Shard': '/art/tokens/rift-shard.webp', 'Echo': '/art/tokens/echo.webp',
};

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function resolvePortraitUrl(portrait: HeroPortrait): string {
  const { cardName, clan, artIndex } = portrait;

  // Vault portraits (no clan) — stored at /portraits/{key}.webp
  if (!clan) return `${GAME_URL}/portraits/${cardName}.webp`;

  // Token cards
  if (TOKEN_ART[cardName]) return `${GAME_URL}${TOKEN_ART[cardName]}`;

  // Clan cards
  const folder = CLAN_FOLDER_MAP[clan] || 'rifters';
  const count = CLAN_IMAGE_COUNT[folder] || 20;
  const imgNum = artIndex ?? ((hashString(cardName + ':' + folder) % count) + 1);
  return `${GAME_URL}/art/clans/${folder}/card-${String(imgNum).padStart(3, '0')}.webp`;
}
