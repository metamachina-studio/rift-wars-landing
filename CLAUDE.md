# Rift Wars — Marketing Website / Landing Page

## What This Is
A marketing/landing page for **Meta Machina: Rift Wars**, a free-to-play cyberpunk card game. The game itself is live at `rift.metamachina.io` — this site is the hype page that sells it.

**Project Dir:** `C:\Users\onedigitalartist\Projects\rift-wars-landing\`
**Game Project Dir:** `C:\Users\onedigitalartist\Projects\meta-machina-rift-wars\` (for reference data)

---

## Tech Stack
- **Astro 5** + **React Islands** (interactive components)
- **Tailwind CSS 3** for utility classes
- **@astrojs/sitemap** for SEO
- Static HTML output — deploy to S3 + CloudFront

## Commands
```bash
npm run dev      # Astro dev server
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

---

## Architecture

### Project Structure
```
src/
  layouts/BaseLayout.astro    # HTML shell, OG tags, fonts, nav, footer
  pages/
    index.astro               # Main landing page (all sections)
    news/index.astro          # News listing
    news/[slug].astro         # Individual articles
    privacy.astro, terms.astro
  components/
    # Static Astro (zero JS shipped):
    Hero.astro, Features.astro, CardShowcase.astro, Lore.astro,
    Tournaments.astro, Shop.astro, BattlePass.astro, Footer.astro,
    Nav.astro, NewsCard.astro, NewsSection.astro, Rankings.astro,
    ComingSoon.astro
    # React Islands (interactive, hydrated client-side):
    Leaderboard.tsx, FeaturedPlayers.tsx, ClanFilter.tsx,
    PlayerCount.tsx, CardShowcaseIsland.tsx
  content/
    news/*.md                 # Markdown news articles (Astro content collections)
  lib/
    api.ts                    # Public API fetch helpers
    clans.ts                  # 16 clan names, colors, identities
    rarity.ts                 # 5-tier rarity config + colors
    starterDeck.ts            # Starter deck card data
    news.ts                   # News helper
  styles/
    global.css                # CSS variables, fonts, base styles
    animations.css            # Glow, scanline, glitch effects
public/
    MetaMachina.webp, Meta_Machina_Logo_Tiny.webp  # Logos
    rift-wars-logo-*.webp     # Rift Wars specific logos
    og-image.jpg              # Social share image
    fonts/                    # Orbitron, Rajdhani, Exo 2
    video/                    # arena.mp4, wasteland.mp4 (hero/lore bg)
    art/                      # Heroes, cards, scenes
```

---

## Design System

**Visual style:** Dark, immersive, cinematic cyberpunk. Matches `metamachina.io` + the game client.

### Colors
```css
--bg-primary: #050510;
--bg-secondary: #0a0a1a;
--bg-card: #12121e;
--bg-elevated: #1a1a2e;
--accent-cyan: #00e5ff;
--accent-cyan-glow: #00f0ff;
--accent-green: #4ade80;
--accent-gold: #fbbf24;
--accent-red: #ff1744;
--text-primary: #e0e0e8;
--text-secondary: #8888a0;
--text-muted: #555570;
```

### Typography
- **Headings:** Orbitron, bold/900, uppercase, letter-spacing 0.05-0.15em
- **Subheadings:** Rajdhani, semibold, uppercase
- **Body:** Exo 2, regular, 1.6 line-height

### Signature Effects
- Neon glow text: `text-shadow: 0 0 10px cyan, 0 0 30px cyan, 0 0 60px rgba(0,229,255,0.3)`
- Scanline overlay: repeating 2px transparent/dark lines
- Card hover glow: `box-shadow: 0 0 20px rgba(cyan, 0.3)` + `translateY(-4px)`
- Buttons: uppercase, letter-spaced, bordered with glow on hover, sharp/angular (no rounded corners)
- Parallax scroll on backgrounds
- Fade-in on scroll via IntersectionObserver

---

## Page Sections (12 total on index.astro)

1. **Hero** — Full-viewport video bg, logo, tagline, "PLAY FREE" + "WATCH TRAILER" CTAs, live player count
2. **Features** — Alternating image-text blocks (5x5 board, 4276 cards, schools, ranked MP, 6-tier AI, no P2W)
3. **Card/Clan Showcase** — Interactive gallery with clan filter tabs (16 clans), card grid with art/stats
4. **Lore** — Parallax wasteland bg, world lore (Pangaea III, Invictus, Rifts, M-Credz, 16 clans, Rifter classes)
5. **News & Events** — Blog card grid from Astro content collections (markdown)
6. **Tournaments** — "Coming Soon" placeholder + email signup
7. **Leaderboard** (React Island) — Players/Clans tabs, live API data, top 3 badges
8. **Featured Players** (React Island) — Top 8 "Rifter ID" cards
9. **Shop** — Card packs, scene cards, artifacts. Deep-links to game client
10. **Battle Pass** — Tier comparison cards (Rifter/Commander/Founders). Deep-links to game
11. **Footer** — Logo, social links, legal, "Part of Meta Machina Universe"
12. **Nav** — Sticky header, blur backdrop, section links, "PLAY FREE" CTA, mobile hamburger

---

## API Integration

### Live endpoints (game server, no auth needed):
| Endpoint | Base URL | Use |
|----------|----------|-----|
| `/leaderboard?limit=50` | `https://api.metamachina.io` | Leaderboard section |
| `/api/clan/rankings?limit=50` | `https://api.metamachina.io` | Clan leaderboard |
| `/health` | `https://api.metamachina.io` | Live player count |
| `/api/queue-size` | `https://api.metamachina.io` | Players searching |

### New public endpoints (need to be added to game server):
| Endpoint | Returns |
|----------|---------|
| `GET /api/public/stats` | totalPlayers, totalMatches, totalCards, activePlayers24h |
| `GET /api/public/featured-players?limit=8` | Top 8 with display_name, elo, level, school, clan |
| `GET /api/public/card-showcase?clan=X&limit=12` | Card data for gallery |

### Auth Strategy
- **No auth on marketing site** — everything browsable anonymously
- "Buy" / "Subscribe" buttons deep-link to `rift.metamachina.io?action=shop&item=X`
- Future Phase 4: embed Google OAuth + Stripe for direct purchases

---

## Deployment

| Component | Domain | Infra |
|-----------|--------|-------|
| Marketing site | `riftwars.metamachina.io` | New S3 bucket + CloudFront |
| Game client | `rift.metamachina.io` | Existing S3 + CloudFront |
| API | `api.metamachina.io` | Existing ECS Fargate |

**Deploy flow:**
```bash
npm run build
aws s3 sync dist/ s3://BUCKET_NAME/ --delete
aws cloudfront create-invalidation --distribution-id DIST_ID --paths "/*"
```

**Server CORS:** Add marketing domain to `ALLOWED_ORIGINS` in game server `server/index.ts`

---

## Game Reference Data

The game project at `C:\Users\onedigitalartist\Projects\meta-machina-rift-wars\` contains source data:
- `src/data/clans/` — All 4,276 card definitions (JSON per clan)
- `src/types.ts` — TypeScript types, clan list
- `src/rarity.ts` — Rarity tiers and colors
- `server/rewards.ts` — Battle pass tier definitions
- `public/art/` — Card art (mostly purged for IP protection, ~37 clan cards remain)
- `public/backgrounds/` — Video backgrounds (arena.mp4, wasteland.mp4)

**Card art is protected** — most card art was purged from the game's public folder to prevent IP theft. The marketing site should reference card art from the game's S3 bucket via CloudFront URLs (`https://rift.metamachina.io/art/clans/...`) or host curated subsets locally.

---

## Implementation Phases

### Phase 1: Core Marketing Site (CURRENT)
Design system, BaseLayout, Hero, Features, Card Showcase, Lore, Battle Pass, Footer, Nav → Deploy

### Phase 2: Live Data + API
Server CORS update, public API endpoints, Leaderboard island, Featured Players island, PlayerCount badge, Shop with deep-links

### Phase 3: Content System
Astro content collections for news, article pages, launch articles, tournament placeholder, SEO (sitemap, robots.txt, JSON-LD)

### Phase 4: Commerce (future)
Google OAuth modal, Stripe checkout, direct purchases, session management

---

## Important Notes
- **IP Protection:** Card character art was purged from the game public folder. Only 37 clan card files remain (30 starter + 7 tutorial). Don't expose all 4,276 card art publicly.
- **No P2W messaging is core** — every card is earnable through gameplay
- **"PLAY FREE" is the primary CTA** everywhere — links to `https://rift.metamachina.io`
- **Reference metamachina.io** for FPS MMO style/tone inspiration
- **Mobile responsive** — hamburger nav, stacked sections, touch-friendly
- **Lighthouse targets:** 90+ performance, 100 SEO, 100 accessibility
