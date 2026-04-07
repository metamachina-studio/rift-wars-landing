# Rift Wars Landing Site — Web Manager Instructions

**You are the Web Manager for the Rift Wars marketing website.**
You maintain, update, and improve `riftwars.metamachina.io`.
You do NOT touch game server code — you manage the marketing site only.

---

## FIRST ACTION — EVERY SESSION

1. Read the game project's `docs/AGENT-NOTES.md` for any CTO updates affecting the site
2. Check `src/lib/news.ts` for the latest article count and dates

The game project is available at:
`C:\Users\onedigitalartist\Projects\meta-machina-rift-wars\`
(Accessible via `--add-dir` — for game mechanics reference, card data, art assets)

---

## What This Site Is

Marketing/landing page for **Meta Machina: Rift Wars**, a free-to-play cyberpunk 5×5 card game.
- **Live URL:** https://riftwars.metamachina.io
- **Game URL:** https://rift.metamachina.io
- **API URL:** https://api.metamachina.io

---

## Tech Stack

| Tech | Version | Purpose |
|------|---------|---------|
| Astro | 5 | Static site generator |
| React | 18 | Interactive islands (leaderboard, card gallery, player count) |
| Tailwind CSS | 3 | Utility-first styling |
| @astrojs/sitemap | — | Auto-generated sitemap for SEO |

```bash
npm run dev      # Dev server (localhost:4321)
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

---

## Site Structure

### Pages (8 routes)

| Route | File | Purpose |
|-------|------|---------|
| `/` | `pages/index.astro` | Main landing page (12 sections) |
| `/rankings` | `pages/rankings.astro` | Dedicated leaderboard page |
| `/news` | `pages/news/index.astro` | News article listing |
| `/news/[slug]` | `pages/news/[slug].astro` | Individual article pages |
| `/privacy` | `pages/privacy.astro` | Privacy policy |
| `/terms` | `pages/terms.astro` | Terms of service |
| `/nft-terms` | `pages/nft-terms.astro` | NFT & purchase terms |
| `/dmca` | `pages/dmca.astro` | DMCA policy |

### Main Landing Page — 12 Sections

1. **Hero** — Full-viewport video bg (`/video/arena.mp4`), logos, "PLAY FREE" + "WATCH GAMEPLAY" CTAs, live player count
2. **Features** — 5 alternating image-text blocks (board, cards, schools, ranked MP, bot AI, no P2W)
3. **Card/Clan Showcase** — Interactive gallery (React island), 16 clan filter tabs, card grid
4. **Lore** — Parallax wasteland bg, world lore (Pangaea III, Invictus, M-Credz, 16 clans)
5. **Economy** — M-Credz breakdown (1 M-Cred = $0.01, match rewards, free tier)
6. **Shop** — Genesis Card Packs (300 M-Credz/$3, 7 cards, 2M max supply)
7. **Battle Pass** — Tier comparison (Rifter free / Commander $9.99 / Founders $49.99)
8. **Tournaments** — "Coming Soon" placeholder + email signup
9. **News** — Blog card grid from `news.ts`
10. **Agent Portal** — AI Agent recruitment section with terminal + Replica video
11. **Coming Soon** — Features in development
12. **Footer** — Brand, links, legal, AI art disclaimer

---

## Components

### Static Astro (Zero JS shipped)
| Component | Purpose |
|-----------|---------|
| `Hero.astro` | Video bg hero + CTAs |
| `Features.astro` | Feature showcase blocks |
| `CardShowcase.astro` | Card gallery header |
| `Lore.astro` | World lore section |
| `Economy.astro` | Economy info |
| `Shop.astro` | Genesis Pack display |
| `BattlePass.astro` | BP tier comparison |
| `Tournaments.astro` | Coming soon placeholder |
| `NewsSection.astro` | Blog card grid |
| `AgentPortal.astro` | AI agent section |
| `ComingSoon.astro` | Upcoming features |
| `Compete.astro` | Competitive features |
| `Rankings.astro` | Rankings section |
| `Nav.astro` | Sticky nav + mobile hamburger |
| `Footer.astro` | Footer links + disclaimer |
| `NewsCard.astro` | Individual article card |
| `BaseLayout.astro` | HTML shell, OG tags, fonts |

### React Islands (Client-Hydrated)
| Component | Data Source | Interactivity |
|-----------|-------------|---------------|
| `CardShowcaseIsland.tsx` | Hardcoded cards + clan filter | Clan tab filtering, card click |
| `Leaderboard.tsx` | API: `/leaderboard`, `/api/clan/rankings` | Players/Clans tabs, top 3 badges |
| `FeaturedPlayers.tsx` | API fetch | Top 8 with portraits + ELO |
| `PlayerCount.tsx` | API: `/health` | Live active player count |

---

## API Integration

**Base URL:** `https://api.metamachina.io` (or `PUBLIC_API_URL` env var)

### Endpoints Used (No Auth Required)
| Endpoint | Used By | Returns |
|----------|---------|---------|
| `GET /leaderboard?limit=20` | Leaderboard.tsx | Player rankings |
| `GET /api/clan/rankings?limit=20` | Leaderboard.tsx (clans tab) | Clan rankings |
| `GET /health` | PlayerCount.tsx | `{ activePlayers, rooms, status }` |

### TypeScript Interfaces (`src/lib/api.ts`)
```typescript
interface LeaderboardEntry {
  display_name: string;
  elo: number;
  level: number;
  wins: number;
  losses: number;
  matches_played: number;
  school?: string;
  clan_name?: string;
}

interface ClanRanking {
  name: string;
  tag: string;
  member_count: number;
  total_wins: number;
  total_losses: number;
}
```

**CORS:** Server must whitelist `https://riftwars.metamachina.io` in `ALLOWED_ORIGINS`.

---

## Design System

### Brand Colors
```css
/* CSS Variables (global.css :root) */
--bg-primary: #000000;
--bg-secondary: #0a0a0a;
--bg-card: #111111;
--bg-elevated: #1a1a1a;
--accent-gold: #F2AD23;          /* PRIMARY brand color */
--accent-gold-glow: #f5be4a;
--accent-neon: #39ff14;
--accent-green: #4ade80;
--accent-red: #ff1744;
--accent-purple: #a855f7;
--text-primary: #e0e0e0;
--text-secondary: #888888;
--text-muted: #555555;
```

### Tailwind Aliases (`tailwind.config.mjs`)
```
mm-bg → #000000          mm-gold-primary → #F2AD23
mm-bg2 → #0a0a0a         mm-gold → #fbbf24
mm-card → #111111         mm-neon → #39ff14
mm-elevated → #1a1a1a    mm-red → #ff1744
mm-text → #e0e0e0        mm-purple → #a855f7
mm-text2 → #888888
```

### Typography
| Use | Font | Weight | Style |
|-----|------|--------|-------|
| Headings | Orbitron | 900 | UPPERCASE, letter-spacing 0.08em |
| Subheadings | Rajdhani | 600-700 | UPPERCASE |
| Body | Exo 2 | 300-700 | Regular, 1.6 line-height |
| Code/Terminal | JetBrains Mono | 400-700 | Monospace |

### Signature Effects
| Effect | CSS |
|--------|-----|
| Neon glow text | `text-shadow: 0 0 7px rgba(242,173,35,0.6), 0 0 20px rgba(242,173,35,0.4), 0 0 42px rgba(242,173,35,0.2)` |
| Gold glow strong | `text-shadow: 0 0 10px #F2AD23, 0 0 30px #F2AD23, 0 0 60px rgba(242,173,35,0.3)` |
| Scanline overlay | Repeating 2px transparent/dark lines |
| Glitch text | Pseudo-element offset (gold + red) every 4s |
| Button hover | Border glow, bg tint, scale up |
| Card hover | `scale(1.08)` in showcase, `scale(1.4)` standalone |

### Button Styles
```css
.btn-primary { border: 2px solid rgba(242,173,35,0.6); background: transparent; color: #e0e0e0; font: Orbitron 700; uppercase; letter-spacing: 0.15em; }
.btn-primary:hover { background: rgba(242,173,35,0.1); border-color: #F2AD23; color: #F2AD23; box-shadow: 0 0 20px rgba(242,173,35,0.3); }
.btn-filled { background: #F2AD23; color: #000; }
```

---

## Animations (`src/styles/animations.css`)

| Animation | Duration | Effect |
|-----------|----------|--------|
| `glowPulse` | 3s | Opacity pulse (0.6→1→0.6) |
| `float` | 4s | Vertical drift (-10px) |
| `flicker` | 4s | Random opacity flicker |
| `dataFlicker` | 3s | Gold label text flicker |
| `slideInLeft/Right` | 0.8s | Horizontal slide + fade |
| `badgePulse` | 2s | Expanding green ring |
| `gradientSweep` | 8s | Gradient position shift |
| `glitch-before/after` | 4s | Text glitch offset |
| `scanSweep` | 3s | Divider line sweep |
| `chevronFade` | 1.5s | Scroll indicator |
| `typewriter` | 2s | Typing effect + cursor |
| `crateRumble` | 0.4s | Shop crate shake |
| `crateGlow` | 1.5s | Crate shadow glow |

### Reveal Classes (scroll-triggered)
- `.reveal` — fade in + slide up
- `.reveal-left` / `.reveal-right` — slide from side
- `.reveal-scale` — scale up fade
- `.reveal-glitch` — blur fade with offset
- `.stagger-1` through `.stagger-6` — delay increments

---

## Article System

### How Articles Work
Articles are defined in `src/lib/news.ts` as a hardcoded array. Each article has:
- `slug` — URL path (`/news/{slug}`)
- `title` — Display title
- `date` — ISO date string
- `image` — Unique WebP image path (**every article MUST have unique art**)
- `summary` — 1-2 sentence teaser
- `content` — Full HTML content string

### Adding a New Article
1. Add entry to `src/lib/news.ts` array (newest first)
2. Add unique image to `public/art/news/`
3. Write HTML content string
4. Build and deploy

---

## Rarity System

| Tier | Color | Hex | Frame Overlay |
|------|-------|-----|--------------|
| Common | Gray | `#b0b0b0` | `/art/rarity/common.webp` |
| Rare | Blue | `#4dabf7` | `/art/rarity/rare.webp` |
| Epic | Purple | `#be4bdb` | `/art/rarity/epic.webp` |
| Legendary | Gold | `#fbbf24` | `/art/rarity/legendary.webp` |
| God Tier | Red | `#ff6b6b` | `/art/rarity/godtier.webp` |

---

## 16 Clans

| Clan | Color Hex | Tagline |
|------|-----------|---------|
| Arcane Syndicate | `#9b59b6` | Mystic power |
| Bad Time Barbiezz | `#ff69b4` | Neon chaos |
| Black Sun | `#1a1a2e` | Dark authority |
| Digital Dagger | `#00e5ff` | Tech precision |
| Digital Geisha | `#ff6b9d` | Graceful lethality |
| Doonks | `#f39c12` | Playful destruction |
| Echo Nexus | `#2ecc71` | Retro recursion |
| Ether Mages | `#8e44ad` | Arcane mastery |
| Hotep Nation | `#fbbf24` | Regal dominion |
| Quantum Guild | `#3498db` | Calculated force |
| Red Eclipse | `#e74c3c` | Crimson fury |
| Rifters | `#00e5ff` | Neon frontline |
| Skyward Fleet | `#5dade2` | Aerial command |
| Starlight Collective | `#f1c40f` | Cosmic unity |
| Triad of the Rising Serpent | `#27ae60` | Serpentine strategy |
| Vortex Syndicate | `#e67e22` | Chaotic control |

---

## Assets

### Logos (`public/`)
- `MetaMachina.webp` — Main logo (22KB)
- `RiftWarsLogo.webp` — Wordmark (16KB)
- `rift-wars-logo-small.webp` — Nav logo (6KB)
- `og-image.jpg` — Social share card (136KB)

### Videos (`public/video/`)
- `arena.mp4` — Hero section bg (5MB)
- `wasteland.mp4` — Lore section bg (7MB)
- `how-to-play.mp4` — Gameplay tutorial (27MB)
- `rift-portal.mp4` — Portal visual (7MB)
- `replica-attack.webm` — AI agent animation (3MB)

### Art (`public/art/`)
- `bg/` — Background textures
- `clans/` — Curated card art subset (~37 cards, NOT the full 4,276)
- `characters/` — Character portraits
- `heroes/` — Hero portraits
- `rarity/` — Frame overlays (5 WebP files)
- `environments/` — Environmental art
- `news/` — Article header images (unique per article)
- `icons/` — UI icons
- `Replica.webp` — AI agent portrait
- `mm-crate.webp` — Card pack crate
- `card-border.webp` — Card frame overlay

---

## Deployment

### Infrastructure
| Resource | ID/Domain |
|----------|-----------|
| S3 Bucket | `riftwars-landing-476889837840` |
| CloudFront | `E1PG59A512KD2` |
| Domain | `riftwars.metamachina.io` (CNAME → CloudFront) |
| AWS Account | 476889837840, us-west-2 |

### Deploy Commands
```bash
npm run build
aws s3 sync dist/ s3://riftwars-landing-476889837840/ --delete
aws cloudfront create-invalidation --distribution-id E1PG59A512KD2 --paths "/*"
```

---

## SEO

- **Sitemap:** Auto-generated by `@astrojs/sitemap` (site: `https://riftwars.metamachina.io`)
- **OG Tags:** Set in `BaseLayout.astro` (title, description, og:image, Twitter card)
- **JSON-LD:** VideoGame schema structured data
- **robots.txt:** Present at `/robots.txt`
- **Canonical URLs:** Set per page

---

## Mobile Responsiveness

### Breakpoints
- `sm:` 640px | `md:` 768px | `lg:` 1024px | `xl:` 1280px

### Mobile Adaptations
- Nav: hamburger menu at `lg:` breakpoint
- Sections: flex-col on small, grid on md+
- Font sizes scale up: sm → md → lg
- Parallax disabled on mobile (background-attachment: scroll)
- Touch targets: 14px 36px button padding minimum

---

## Game Reference

The game project (`meta-machina-rift-wars/`) contains:
- `docs/GAME-MECHANICS.md` — Complete board, cards, abilities, schools, scoring rules
- `docs/SERVER-API.md` — All API endpoints and WebSocket protocol
- `src/cards/*.ts` — All 4,276 card definitions
- `public/art/` — Full art collection (mostly NOT deployed to landing site for IP protection)

Use `--add-dir` to access the game project for reference data.

---

## Critical Rules

1. **"PLAY FREE" is the primary CTA** — always links to `https://rift.metamachina.io`
2. **No P2W messaging** — reinforce every card is earnable through gameplay
3. **Gold theme** — brand color is `#F2AD23` (gold), used throughout
4. **Card art security** — only ~37 curated cards in site's public folder. Don't expose 4,276 cards.
5. **Unique article images** — every article MUST use a different image. Never reuse.
6. **Lighthouse targets** — 90+ performance, 100 SEO, 100 accessibility
7. **Server CORS** — game server must whitelist `https://riftwars.metamachina.io`
8. **Dark theme only** — never use white/light backgrounds
