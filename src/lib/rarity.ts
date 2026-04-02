export type CardRarity = 'common' | 'rare' | 'epic' | 'legendary' | 'godTier';

export const RARITY_LABELS: Record<CardRarity, string> = {
  common: 'Common',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
  godTier: 'God Tier',
};

export const RARITY_COLORS: Record<CardRarity, string> = {
  common: '#b0b0b0',
  rare: '#4dabf7',
  epic: '#be4bdb',
  legendary: '#fbbf24',
  godTier: '#ff6b6b',
};

export const RARITY_ORDER: CardRarity[] = ['common', 'rare', 'epic', 'legendary', 'godTier'];
