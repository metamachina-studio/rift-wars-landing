// Starter Deck — 30 soulbound cards every player gets
// Extracted from game's card definitions (src/cards/*.ts)

export interface CardAbility {
  type: 'boost' | 'damage' | 'destroy' | 'rankUp' | 'heal';
  amount?: number;
  positions: number[][];
  targeting?: 'allies' | 'enemies' | 'all';
  persistent?: boolean;
  onDestroyed?: boolean;
  onFirstEnhanced?: boolean;
  onFirstHit?: boolean;
}

export interface SelfScale {
  condition: string;
  amount: number;
}

export interface StarterCard {
  name: string;
  clan: string;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'godTier';
  crystalPositions: number[][];
  dualPositions?: number[][];
  shinpodo: number;
  crystalCost: number;
  artIndex: number;
  ability?: CardAbility;
  selfScale?: SelfScale;
  laneBonus?: number;
  spawnsCards?: string[];
  quote?: string;
}

// Card art URL construction (matches game's cardArt.ts logic)
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

export function getCardArtUrl(card: StarterCard): string {
  const folder = CLAN_FOLDER_MAP[card.clan] || 'rifters';
  return `/art/clans/${folder}/card-${String(card.artIndex).padStart(3, '0')}.webp`;
}

export function getClanInitials(clan: string): string {
  return clan.split(' ').map(w => w[0]).join('');
}

// Build 5x5 grid positions array (matches engine.ts getCardGridPositions)
export function getCardGridPositions(card: StarterCard): number[] {
  const positions = new Array(25).fill(0);

  // Crystal positions (green = 1)
  for (const pos of card.crystalPositions) {
    const gridCol = 2 + pos[0];
    const gridRow = 2 - pos[1];
    if (gridCol >= 0 && gridCol < 5 && gridRow >= 0 && gridRow < 5) {
      positions[gridRow * 5 + gridCol] = 1;
    }
  }

  // Dual positions are also crystal
  if (card.dualPositions) {
    for (const pos of card.dualPositions) {
      const gridCol = 2 + pos[0];
      const gridRow = 2 - pos[1];
      if (gridCol >= 0 && gridCol < 5 && gridRow >= 0 && gridRow < 5) {
        if (positions[gridRow * 5 + gridCol] === 0) positions[gridRow * 5 + gridCol] = 1;
      }
    }
  }

  // Ability positions: red (2) if new, dual (3) if overlapping crystal
  const markAbility = (abilityPositions: number[][]) => {
    for (const pos of abilityPositions) {
      const gridCol = 2 + pos[0];
      const gridRow = 2 - pos[1];
      if (gridCol >= 0 && gridCol < 5 && gridRow >= 0 && gridRow < 5) {
        const idx = gridRow * 5 + gridCol;
        positions[idx] = positions[idx] === 1 ? 3 : 2;
      }
    }
  };

  if (card.ability) markAbility(card.ability.positions);

  return positions;
}

// Ability description text (matches cardUtils.ts)
export function getAbilityText(card: StarterCard): string | null {
  const parts: string[] = [];

  if (card.ability) {
    const a = card.ability;
    let trigger = 'On play: ';
    if (a.onDestroyed) trigger = 'On death: ';
    else if (a.onFirstEnhanced) trigger = 'Enhanced: ';
    else if (a.onFirstHit) trigger = 'Hit: ';
    else if (a.persistent) trigger = 'Zone: ';

    const defaultTargets: Record<string, string> = {
      boost: 'allied', damage: 'enemy', destroy: 'enemy', rankUp: 'all', heal: 'allied',
    };
    const targetLabel = a.targeting === 'all' ? 'all' : a.targeting === 'allies' ? 'allied' : a.targeting === 'enemies' ? 'enemy' : defaultTargets[a.type] ?? 'all';

    switch (a.type) {
      case 'boost': parts.push(`${trigger}+${a.amount} ${targetLabel}`); break;
      case 'damage': parts.push(`${trigger}-${a.amount} ${targetLabel}`); break;
      case 'destroy': parts.push(`${trigger}Destroy ${targetLabel}`); break;
      case 'rankUp': parts.push(`${trigger}+${a.amount} crystals`); break;
      case 'heal': parts.push(`${trigger}Heal ${a.amount} ${targetLabel}`); break;
    }
  }

  if (card.selfScale) {
    const condLabels: Record<string, string> = {
      alliedPlayed: 'ally played', enemyPlayed: 'enemy played',
      alliedDestroyed: 'ally destroyed', enemyDestroyed: 'enemy destroyed',
      anyDestroyed: 'card destroyed', damagedEnemy: 'damaged enemy',
      clanCount: 'same clan card',
    };
    const label = condLabels[card.selfScale.condition] ?? card.selfScale.condition;
    parts.push(`+${card.selfScale.amount} per ${label}`);
  }

  if (card.laneBonus) parts.push(`Row win: +${card.laneBonus} bonus`);
  if (card.spawnsCards?.length) parts.push(`Spawn: ${card.spawnsCards.join(', ')}`);

  return parts.length > 0 ? parts.join(' | ') : null;
}

// Rarity display config (matches rarity.ts)
export const RARITY_CONFIG: Record<string, { label: string; color: string; cssClass: string }> = {
  common:    { label: 'Common',    color: '#8b8b8b', cssClass: 'rarity-common' },
  rare:      { label: 'Rare',      color: '#4fc3f7', cssClass: 'rarity-rare' },
  epic:      { label: 'Epic',      color: '#ce93d8', cssClass: 'rarity-epic' },
  legendary: { label: 'Legendary', color: '#ffd54f', cssClass: 'rarity-legendary' },
  godTier:   { label: 'GOD TIER',  color: '#ff1744', cssClass: 'rarity-godtier' },
};

// Clan color themes (matches cardUtils.ts)
export const CLAN_THEME: Record<string, { bg: string; border: string; text: string }> = {
  'Rifters':                       { bg: '#0d2818', border: '#4ade80', text: '#4ade80' },
  'Arcane Syndicate':              { bg: '#1a0d2e', border: '#a78bfa', text: '#a78bfa' },
  'Bad Time Barbiezz':             { bg: '#2e0d1a', border: '#f472b6', text: '#f472b6' },
  'Black Sun':                     { bg: '#1a1a1a', border: '#a3a3a3', text: '#e5e5e5' },
  'Digital Dagger':                { bg: '#0d1a2e', border: '#38bdf8', text: '#38bdf8' },
  'Digital Geisha':                { bg: '#2e0d22', border: '#e879f9', text: '#e879f9' },
  'Echo Nexus':                    { bg: '#0d2e2e', border: '#2dd4bf', text: '#2dd4bf' },
  'Ether Mages':                   { bg: '#1a0d28', border: '#818cf8', text: '#818cf8' },
  'Hotep Nation':                  { bg: '#2e1a0d', border: '#fbbf24', text: '#fbbf24' },
  'Quantum Guild':                 { bg: '#0d1a22', border: '#67e8f9', text: '#67e8f9' },
  'Red Eclipse':                   { bg: '#2e0d0d', border: '#f87171', text: '#f87171' },
  'Skyward Fleet':                 { bg: '#0d1d2e', border: '#60a5fa', text: '#60a5fa' },
  'Starlight Collective':          { bg: '#1a1a0d', border: '#facc15', text: '#facc15' },
  'Triad of the Rising Serpent':   { bg: '#0d2e18', border: '#34d399', text: '#34d399' },
  'Vortex Syndicate':              { bg: '#1a0d1a', border: '#c084fc', text: '#c084fc' },
};

export const STARTER_DECK: StarterCard[] = [
  // === COST 1 (16 cards) ===
  { name: "Venom Hardline", clan: "Arcane Syndicate", category: "specialist", rarity: "rare",
    crystalPositions: [[0,1],[1,1]], dualPositions: [[1,1]], shinpodo: 2, crystalCost: 1, artIndex: 23,
    ability: { type: 'boost', amount: 1, positions: [[0,-1],[1,1]], targeting: 'allies', persistent: true },
    quote: "Persistent field: boost 1 to allies each turn." },

  { name: "Bile Fiend", clan: "Bad Time Barbiezz", category: "longRange", rarity: "rare",
    crystalPositions: [[1,-2],[1,2],[2,2]], dualPositions: [[1,2],[2,2]], shinpodo: 1, crystalCost: 1, artIndex: 8,
    laneBonus: 1, quote: "Pure lane power." },

  { name: "Void Scythe", clan: "Black Sun", category: "unit", rarity: "common",
    crystalPositions: [[-1,-1],[0,1],[0,2]], dualPositions: [[-1,-1]], shinpodo: 2, crystalCost: 1, artIndex: 1,
    selfScale: { condition: 'anyDestroyed', amount: 1 }, quote: "Power scales: +1 whenever a card is destroyed." },

  { name: "Black Firmware", clan: "Digital Dagger", category: "longRange", rarity: "rare",
    crystalPositions: [[1,-1],[2,1]], dualPositions: [[2,1]], shinpodo: 3, crystalCost: 1, artIndex: 7,
    ability: { type: 'damage', amount: 2, positions: [[1,0],[2,0],[2,1]], targeting: 'enemies' },
    quote: "2 damage to all hostiles in the zone." },

  { name: "Shadow Flanker", clan: "Digital Geisha", category: "support", rarity: "rare",
    crystalPositions: [[-2,-1],[-2,0],[-1,0],[0,-1]], dualPositions: [[-2,-1],[-1,0]], shinpodo: 4, crystalCost: 1, artIndex: 12,
    ability: { type: 'rankUp', amount: 1, positions: [[-2,-1],[-1,0],[0,1],[1,0]], targeting: 'allies' },
    quote: "Crystal expansion — claim more ground." },

  { name: "Savage Jaw", clan: "Doonks", category: "unit", rarity: "common",
    crystalPositions: [[1,-1],[2,0],[2,1]], dualPositions: [[2,0]], shinpodo: 2, crystalCost: 1, artIndex: 2,
    ability: { type: 'destroy', positions: [[1,1],[2,0]], targeting: 'enemies' },
    quote: "Eliminates the target outright." },

  { name: "Nexus Shard", clan: "Echo Nexus", category: "specialist", rarity: "common",
    crystalPositions: [[-1,0],[0,1]], dualPositions: [[0,1]], shinpodo: 1, crystalCost: 1, artIndex: 1,
    ability: { type: 'heal', amount: 1, positions: [[0,-1],[0,1],[1,0]], targeting: 'allies' },
    quote: "Restores 1 shinpodo to allies in range." },

  { name: "Bright Pyretic", clan: "Ether Mages", category: "longRange", rarity: "common",
    crystalPositions: [[0,2],[2,0]], dualPositions: [[2,0]], shinpodo: 1, crystalCost: 1, artIndex: 31,
    ability: { type: 'damage', amount: 2, positions: [[2,0]], targeting: 'all' },
    quote: "Weakens everything in range by 2." },

  { name: "Scarab Protocol", clan: "Hotep Nation", category: "unit", rarity: "common",
    crystalPositions: [[1,-1],[1,2],[2,1]], dualPositions: [[1,2]], shinpodo: 1, crystalCost: 1, artIndex: 9,
    spawnsCards: ["Drone"], quote: "Deploys a Drone to your hand." },

  { name: "Crystal Corsair", clan: "Quantum Guild", category: "specialist", rarity: "common",
    crystalPositions: [[-2,1],[0,1]], dualPositions: [[-2,1]], shinpodo: 1, crystalCost: 1, artIndex: 21,
    ability: { type: 'heal', amount: 2, positions: [[-2,1]], targeting: 'allies' },
    quote: "Purges persistent effects from affected tiles." },

  { name: "Thorn Protocol", clan: "Red Eclipse", category: "unit", rarity: "rare",
    crystalPositions: [[0,-2],[0,2],[1,-2]], dualPositions: [[0,-2],[1,-2]], shinpodo: 1, crystalCost: 1, artIndex: 144,
    ability: { type: 'damage', amount: 3, positions: [[0,-2],[1,-2],[1,1],[2,-2]], targeting: 'all' },
    quote: "3 damage to all in range." },

  { name: "Junk Wolf", clan: "Rifters", category: "unit", rarity: "rare",
    crystalPositions: [[1,-2],[1,1],[2,0]], dualPositions: [[2,0]], shinpodo: 3, crystalCost: 1, artIndex: 3,
    ability: { type: 'boost', amount: 1, positions: [[1,-1],[1,2],[2,0]], targeting: 'allies' },
    spawnsCards: ["Medkit"], quote: "Rally the line — +1 to friendlies. Adds Medkit to hand." },

  { name: "Skyborne Apex", clan: "Skyward Fleet", category: "support", rarity: "common",
    crystalPositions: [[1,-1],[1,0],[2,-1]], shinpodo: 2, crystalCost: 1, artIndex: 3,
    selfScale: { condition: 'alliedPlayed', amount: 1 }, quote: "+1 whenever an ally is played." },

  { name: "Luminescence Breach", clan: "Starlight Collective", category: "specialist", rarity: "rare",
    crystalPositions: [[-1,0],[0,1],[1,1],[2,1]], dualPositions: [[-1,0]], shinpodo: 3, crystalCost: 1, artIndex: 7,
    selfScale: { condition: 'alliedPlayed', amount: 1 }, quote: "Grows +1 per ally played." },

  { name: "Silk Fuse", clan: "Triad of the Rising Serpent", category: "specialist", rarity: "common",
    crystalPositions: [[-1,0],[0,-1]], dualPositions: [[-1,0]], shinpodo: 3, crystalCost: 1, artIndex: 27,
    laneBonus: 1, quote: "A solid presence on the field." },

  { name: "Tempest Gunline", clan: "Vortex Syndicate", category: "unit", rarity: "common",
    crystalPositions: [[0,2],[1,-2],[2,2]], dualPositions: [[1,-2]], shinpodo: 2, crystalCost: 1, artIndex: 6,
    spawnsCards: ["Drone"], quote: "Every card counts." },

  // === COST 2 (14 cards) ===
  { name: "Blight Beast", clan: "Arcane Syndicate", category: "longRange", rarity: "rare",
    crystalPositions: [[-1,-1],[-1,0],[-1,1],[0,1]], dualPositions: [[-1,-1],[0,1]], shinpodo: 4, crystalCost: 2, artIndex: 19,
    ability: { type: 'rankUp', amount: 1, positions: [[-1,-1],[0,-1],[0,1],[1,0]], targeting: 'allies' },
    quote: "Crystal expansion — claim more ground." },

  { name: "Primal Surge", clan: "Bad Time Barbiezz", category: "specialist", rarity: "rare",
    crystalPositions: [[-1,-2],[2,-1],[2,1]], dualPositions: [[-1,-2],[2,-1]], shinpodo: 3, crystalCost: 2, artIndex: 4,
    ability: { type: 'damage', amount: 1, positions: [[-1,-2],[-1,2],[2,-1],[2,2]], targeting: 'all' },
    quote: "1 damage to all in range." },

  { name: "Night Worm", clan: "Black Sun", category: "specialist", rarity: "common",
    crystalPositions: [[-1,-1],[-1,0]], dualPositions: [[-1,0]], shinpodo: 2, crystalCost: 2, artIndex: 42,
    ability: { type: 'damage', amount: 2, positions: [[-1,0]], targeting: 'enemies', onFirstHit: true },
    quote: "Hit trigger: 2 damage to enemies." },

  { name: "Harpoon", clan: "Digital Dagger", category: "unit", rarity: "common",
    crystalPositions: [[-2,0],[-1,0],[1,0]], dualPositions: [[-2,0],[1,0]], shinpodo: 2, crystalCost: 2, artIndex: 19,
    ability: { type: 'destroy', positions: [[-2,0],[-2,1],[1,0],[1,1]], targeting: 'enemies', onDestroyed: true },
    quote: "Death trigger: destroy enemies." },

  { name: "Blackwire Haunt", clan: "Digital Geisha", category: "unit", rarity: "rare",
    crystalPositions: [[0,-1],[0,1],[1,0]], dualPositions: [[0,-1],[1,0]], shinpodo: 3, crystalCost: 2, artIndex: 4,
    ability: { type: 'damage', amount: 1, positions: [[-1,0],[0,-1],[1,0]], targeting: 'all', persistent: true },
    quote: "Aura — damage 1 to all while this card stands." },

  { name: "Feral Wolf", clan: "Doonks", category: "longRange", rarity: "common",
    crystalPositions: [[1,0],[1,1],[2,0]], dualPositions: [[1,1]], shinpodo: 2, crystalCost: 2, artIndex: 7,
    laneBonus: 1, quote: "Holds the line." },

  { name: "Loop Sentinel", clan: "Echo Nexus", category: "support", rarity: "common",
    crystalPositions: [[-1,1],[0,-1],[0,1]], dualPositions: [[0,1]], shinpodo: 1, crystalCost: 2, artIndex: 10,
    spawnsCards: ["Battery"], quote: "Deploys a Battery to your hand." },

  { name: "Crystal Rogue", clan: "Ether Mages", category: "longRange", rarity: "rare",
    crystalPositions: [[0,-2],[0,2]], dualPositions: [[0,2]], shinpodo: 1, crystalCost: 2, artIndex: 14,
    ability: { type: 'boost', amount: 3, positions: [[0,2],[1,1],[2,0]], targeting: 'allies', onFirstHit: true },
    quote: "Hit trigger: +3 to allies in range." },

  { name: "Scarab Fang", clan: "Hotep Nation", category: "unit", rarity: "common",
    crystalPositions: [[1,-1],[1,1]], dualPositions: [[1,-1]], shinpodo: 3, crystalCost: 2, artIndex: 6,
    ability: { type: 'rankUp', amount: 1, positions: [[1,-1]], targeting: 'allies' },
    quote: "Crystal expansion — claim more ground." },

  { name: "Star Catalyst", clan: "Quantum Guild", category: "specialist", rarity: "common",
    crystalPositions: [[0,-1],[0,1],[1,0]], dualPositions: [[0,-1]], shinpodo: 1, crystalCost: 2, artIndex: 18,
    ability: { type: 'boost', amount: 1, positions: [[-1,0],[0,-1]], targeting: 'allies', persistent: true },
    quote: "Persistent field: boost 1 to allies each turn." },

  { name: "Hell Render", clan: "Red Eclipse", category: "longRange", rarity: "common",
    crystalPositions: [[0,1],[0,2]], dualPositions: [[0,2]], shinpodo: 1, crystalCost: 2, artIndex: 10,
    ability: { type: 'heal', amount: 1, positions: [[0,2]], targeting: 'allies' },
    quote: "Mends the wounded — +1 restored." },

  { name: "Salt Burnside", clan: "Rifters", category: "unit", rarity: "common",
    crystalPositions: [[0,-2],[1,1]], dualPositions: [[0,-2]], shinpodo: 2, crystalCost: 2, artIndex: 24,
    ability: { type: 'damage', amount: 1, positions: [[-1,0],[0,-2]], targeting: 'all' },
    quote: "1 damage delivered." },

  { name: "Thunder Roadkill", clan: "Skyward Fleet", category: "support", rarity: "common",
    crystalPositions: [[1,0],[2,0]], dualPositions: [[1,0]], shinpodo: 1, crystalCost: 2, artIndex: 58,
    ability: { type: 'damage', amount: 2, positions: [[1,0],[2,-1]], targeting: 'enemies' },
    quote: "All units in the zone lose 2 power." },

  { name: "Starlight Fuse", clan: "Starlight Collective", category: "specialist", rarity: "common",
    crystalPositions: [[0,-1],[0,1],[1,0]], dualPositions: [[0,1]], shinpodo: 3, crystalCost: 2, artIndex: 1,
    selfScale: { condition: 'clanCount', amount: 1 }, quote: "Grows +1 per same clan card." },
];
