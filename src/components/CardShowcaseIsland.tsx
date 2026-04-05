import { useState, useRef, useEffect } from 'react';
import type { StarterCard } from '../lib/starterDeck';
import {
  STARTER_DECK, getCardArtUrl, getCardGridPositions,
  getAbilityText, getClanInitials, RARITY_CONFIG, CLAN_THEME,
} from '../lib/starterDeck';

const GAME_URL = import.meta.env.PUBLIC_GAME_URL || 'https://rift.metamachina.io';

// Split cards into 2 rows
const half = Math.ceil(STARTER_DECK.length / 2);
const ROW_1 = STARTER_DECK.slice(0, half);
const ROW_2 = STARTER_DECK.slice(half);

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
    <div className="mm-card showcase-card" onClick={onClick} title={`${card.name} — Click to inspect`}>
      <div className={`mm-card-face ${rarityConf.cssClass}`}>
        <div className="mm-card-art" style={{ backgroundImage: `url(${artPath})` }} />
        <div className="mm-card-border" />
        <div className={`mm-cost mm-cost-${card.crystalCost}`}>
          <CostDiamonds cost={card.crystalCost} />
        </div>
        <div className="mm-shinpodo">{card.shinpodo}</div>
        {categoryBadge && <div className="mm-category">{categoryBadge}</div>}
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
        <div className="mm-bottom">
          <span className="mm-name">{card.name}</span>
          <span className="mm-faction">{getClanInitials(card.clan)}</span>
        </div>
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
        <button className="card-detail-close" onClick={onClose}>✕</button>
        <div className="card-detail-art" style={{ backgroundImage: `url(${artPath})` }}>
          <div className={`mm-cost mm-cost-${card.crystalCost}`} style={{ width: 56, height: 56 }}>
            <CostDiamonds cost={card.crystalCost} />
          </div>
          <div className="mm-shinpodo" style={{ width: 56, height: 56, fontSize: '1.4rem' }}>{card.shinpodo}</div>
        </div>
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
          {abilityText && (
            <div className="card-detail-ability">
              <span className="card-detail-ability-label">Ability</span>
              <p className="card-detail-ability-text">{abilityText}</p>
            </div>
          )}
          {card.quote && (
            <p className="card-detail-quote">"{card.quote}"</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- Scrollable Row ----
function ScrollRow({ cards, onInspect, reverse }: { cards: StarterCard[]; onInspect: (c: StarterCard) => void; reverse?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const didDrag = useRef(false);

  // Mouse drag scrolling
  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    didDrag.current = false;
    startX.current = e.clientX;
    scrollLeft.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    el.style.cursor = 'grabbing';
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 4) didDrag.current = true;
    scrollRef.current.scrollLeft = scrollLeft.current - dx;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.releasePointerCapture(e.pointerId);
      scrollRef.current.style.cursor = 'grab';
    }
  };

  const handleCardClick = (card: StarterCard) => {
    if (!didDrag.current) onInspect(card);
  };

  // Auto-scroll animation
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf: number;
    const speed = reverse ? -0.3 : 0.3;

    const step = () => {
      if (!isDragging.current) {
        el.scrollLeft += speed;
        // loop back
        if (!reverse && el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollLeft = 0;
        }
        if (reverse && el.scrollLeft <= 0) {
          el.scrollLeft = el.scrollWidth - el.clientWidth;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reverse]);

  return (
    <div
      ref={scrollRef}
      className="showcase-scroll-row"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{ cursor: 'grab' }}
    >
      {/* Render cards twice for seamless looping */}
      {[...cards, ...cards].map((card, i) => (
        <div key={`${card.name}-${i}`} className="showcase-scroll-card">
          <MMCardFace card={card} onClick={() => handleCardClick(card)} />
        </div>
      ))}
    </div>
  );
}

// ---- Main Showcase Island ----
export default function CardShowcaseIsland() {
  const [inspectedCard, setInspectedCard] = useState<StarterCard | null>(null);

  return (
    <div className="showcase-scroller-wrap">
      {/* Row 1 — scrolls right */}
      <ScrollRow cards={ROW_1} onInspect={setInspectedCard} />
      {/* Row 2 — scrolls left */}
      <ScrollRow cards={ROW_2} onInspect={setInspectedCard} reverse />

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
