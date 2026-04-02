import { useState } from 'react';
import type { StarterCard } from '../lib/starterDeck';
import {
  STARTER_DECK, getCardArtUrl, getCardGridPositions,
  getAbilityText, getClanInitials, RARITY_CONFIG, CLAN_THEME,
} from '../lib/starterDeck';

const ALL_CLANS = [...new Set(STARTER_DECK.map(c => c.clan))];
const GAME_URL = import.meta.env.PUBLIC_GAME_URL || 'https://rift.metamachina.io';

// ---- Mini card grid (5x5) ----
function CardGrid({ positions, size = 12 }: { positions: number[]; size?: number }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1,
      background: 'rgba(6,2,18,0.75)', border: '1px solid rgba(160,120,255,0.3)',
      borderRadius: 4, padding: 3,
    }}>
      {positions.map((val, idx) => (
        <div key={idx} style={{
          width: size, height: size,
          border: idx === 12 ? '2px solid #333'
            : val === 2 ? '2px solid #ff1744'
            : '1px solid rgba(160,120,255,0.4)',
          background: idx === 12 ? '#fff'
            : val === 1 ? '#4ade80'
            : val === 3 ? '#ff1744'
            : val === 2 ? 'transparent'
            : 'rgba(80,60,160,0.15)',
          borderColor: idx === 12 ? '#333'
            : val === 1 ? '#166534'
            : val === 3 ? '#991b1b'
            : val === 2 ? '#ff1744'
            : 'rgba(160,120,255,0.25)',
          position: 'relative',
        }}>
          {val === 3 && (
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)', width: '70%', height: '70%',
              background: '#4ade80', boxShadow: '0 0 3px rgba(74,222,128,0.8)',
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ---- Card Cost Diamonds ----
function CostDiamonds({ cost }: { cost: number }) {
  if (cost === 1) return <span style={{ fontSize: '0.8rem' }}>◆</span>;
  if (cost === 2) return <span style={{ display: 'flex', gap: 1 }}>◆◆</span>;
  return (
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, lineHeight: 0.6, fontSize: '0.55rem' }}>
      <span>◆</span>
      <span>◆◆</span>
    </span>
  );
}

// ---- MM Card Face (matches game rendering) ----
function MMCardFace({ card, onClick }: { card: StarterCard; onClick: () => void }) {
  const gridPositions = getCardGridPositions(card);
  const artPath = getCardArtUrl(card);
  const abilityText = getAbilityText(card);
  const rarityConf = RARITY_CONFIG[card.rarity];
  const categoryBadge = card.category === 'support' ? 'SUP' : card.category === 'longRange' ? 'LR' : card.category === 'specialist' ? 'SPE' : '';

  return (
    <div className="mm-card" onClick={onClick} title={`${card.name} — Click to inspect`}>
      <div className={`mm-card-face ${rarityConf.cssClass}`}>
        {/* Card art */}
        <div className="mm-card-art" style={{ backgroundImage: `url(${artPath})` }} />
        {/* Card border */}
        <div className="mm-card-border" />

        {/* Cost badge — top-left */}
        <div className={`mm-cost mm-cost-${card.crystalCost}`}>
          <CostDiamonds cost={card.crystalCost} />
        </div>

        {/* Shinpodo — top-right */}
        <div className="mm-shinpodo">{card.shinpodo}</div>

        {/* Category badge */}
        {categoryBadge && <div className="mm-category">{categoryBadge}</div>}

        {/* Grid overlay */}
        <div className="mm-grid">
          {gridPositions.map((val, idx) => (
            <div key={idx} className={`grid-cell ${
              idx === 12 ? 'grid-center'
              : val === 1 ? 'grid-crystal'
              : val === 2 ? 'grid-ability'
              : val === 3 ? 'grid-dual'
              : 'grid-empty'
            }`} />
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mm-bottom">
          <span className="mm-name">{card.name}</span>
          <span className="mm-faction">{getClanInitials(card.clan)}</span>
        </div>

        {/* Hover info */}
        <div className="mm-hover-info">
          <div className="mm-hover-name">{card.name}</div>
          <div className="mm-hover-clan">{card.clan}</div>
          <div className="mm-hover-grid">
            {gridPositions.map((val, idx) => (
              <div key={idx} className={`grid-cell ${
                idx === 12 ? 'grid-center'
                : val === 1 ? 'grid-crystal'
                : val === 2 ? 'grid-ability'
                : val === 3 ? 'grid-dual'
                : 'grid-empty'
              }`} />
            ))}
          </div>
          {abilityText && <div className="mm-hover-ability">{abilityText}</div>}
        </div>
      </div>
    </div>
  );
}

// ---- Full Card Detail Modal ----
function CardDetailModal({ card, onClose }: { card: StarterCard; onClose: () => void }) {
  const gridPositions = getCardGridPositions(card);
  const artPath = getCardArtUrl(card);
  const abilityText = getAbilityText(card);
  const rarityConf = RARITY_CONFIG[card.rarity];
  const clanTheme = CLAN_THEME[card.clan] || { bg: '#1a1a2e', border: '#555', text: '#aaa' };

  return (
    <div className="card-inspect-overlay" onClick={onClose}>
      <div className="card-detail-modal" onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <button className="card-detail-close" onClick={onClose}>✕</button>

        {/* Large card art */}
        <div className="card-detail-art" style={{ backgroundImage: `url(${artPath})` }}>
          {/* Cost */}
          <div className={`mm-cost mm-cost-${card.crystalCost}`} style={{ width: 56, height: 56 }}>
            <CostDiamonds cost={card.crystalCost} />
          </div>
          {/* Shinpodo */}
          <div className="mm-shinpodo" style={{ width: 56, height: 56, fontSize: '1.4rem' }}>{card.shinpodo}</div>
        </div>

        {/* Card Info */}
        <div className="card-detail-info">
          <h3 className="card-detail-name">{card.name}</h3>

          <div className="card-detail-tags">
            <span className="card-detail-rarity" style={{ color: rarityConf.color, borderColor: `${rarityConf.color}66` }}>
              {rarityConf.label}
            </span>
            <span className="card-detail-clan" style={{ color: clanTheme.text, borderColor: `${clanTheme.border}66` }}>
              {card.clan}
            </span>
            {card.category !== 'unit' && (
              <span className="card-detail-category">
                {card.category === 'support' ? 'Support' : card.category === 'longRange' ? 'Long Range' : 'Specialist'}
              </span>
            )}
          </div>

          {/* Stats row */}
          <div className="card-detail-stats">
            <div className="card-detail-stat">
              <span className="card-detail-stat-val">{card.shinpodo}</span>
              <span className="card-detail-stat-label">Shinpodo</span>
            </div>
            <div className="card-detail-stat">
              <span className="card-detail-stat-val">{card.crystalCost}</span>
              <span className="card-detail-stat-label">Crystal Cost</span>
            </div>
            <div className="card-detail-stat">
              <span className="card-detail-stat-val">{card.crystalPositions.length + (card.dualPositions?.length || 0)}</span>
              <span className="card-detail-stat-label">Grid Tiles</span>
            </div>
          </div>

          {/* Grid */}
          <div className="card-detail-grid-section">
            <span className="card-detail-grid-label">Grid Pattern</span>
            <CardGrid positions={gridPositions} size={18} />
            <div className="card-detail-grid-legend">
              <span><span className="legend-dot" style={{ background: '#4ade80' }} /> Crystal</span>
              <span><span className="legend-dot" style={{ background: '#ff1744' }} /> Ability</span>
              <span><span className="legend-dot legend-dual" /> Dual</span>
              <span><span className="legend-dot" style={{ background: '#fff', width: 8, height: 8 }} /> Center</span>
            </div>
          </div>

          {/* Ability */}
          {abilityText && (
            <div className="card-detail-ability">
              <span className="card-detail-ability-label">Ability</span>
              <p className="card-detail-ability-text">{abilityText}</p>
            </div>
          )}

          {/* Quote */}
          {card.quote && (
            <p className="card-detail-quote">"{card.quote}"</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- Main Showcase Island ----
export default function CardShowcaseIsland() {
  const [activeClan, setActiveClan] = useState<string | null>(null);
  const [inspectedCard, setInspectedCard] = useState<StarterCard | null>(null);

  const filteredCards = activeClan
    ? STARTER_DECK.filter(c => c.clan === activeClan)
    : STARTER_DECK;

  return (
    <div>
      {/* Clan filter tabs */}
      <div className="showcase-tabs">
        <button
          onClick={() => setActiveClan(null)}
          className={`showcase-tab ${activeClan === null ? 'active' : ''}`}
        >
          All ({STARTER_DECK.length})
        </button>
        {ALL_CLANS.map(clan => {
          const count = STARTER_DECK.filter(c => c.clan === clan).length;
          return (
            <button
              key={clan}
              onClick={() => setActiveClan(clan)}
              className={`showcase-tab ${activeClan === clan ? 'active' : ''}`}
            >
              {clan} ({count})
            </button>
          );
        })}
      </div>

      {/* Card grid */}
      <div className="showcase-grid">
        {filteredCards.map(card => (
          <MMCardFace key={card.name} card={card} onClick={() => setInspectedCard(card)} />
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <a href={GAME_URL} target="_blank" rel="noopener" className="btn-primary" style={{ fontSize: '0.85rem' }}>
          Play Free — Explore All 4,276 Cards
        </a>
      </div>

      {/* Detail modal */}
      {inspectedCard && (
        <CardDetailModal card={inspectedCard} onClose={() => setInspectedCard(null)} />
      )}
    </div>
  );
}
