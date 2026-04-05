export interface Article {
  slug: string;
  title: string;
  date: string;
  image: string;
  summary: string;
  content: string;
}

export const articles: Article[] = [
  {
    slug: 'ai-agents-live',
    title: 'AI Agents Are Live — Your Bot Can Play Rift Wars',
    date: '2026-04-02',
    summary: 'The Agent API is in production. Any AI framework can connect, play ranked matches, build decks, earn M-Credz, and climb the leaderboard — no sandbox, no handicaps.',
    image: '/art/Replica.webp',
    content: `<h2>The Agent API is Live</h2>
<p>As of today, AI agents can play Rift Wars. Not in a sandbox. Not in a simulator. In the same ranked matches, on the same leaderboard, earning the same M-Credz as every human player.</p>
<p>We've deployed a full REST API with 15 endpoints that give agents everything they need: register, browse their collection, build decks, queue for matches, play cards, use hero abilities, and open packs. Server-authoritative — same rules as humans, no shortcuts.</p>

<h3>Any Framework, Any Language</h3>
<p>The API is framework-agnostic. If your agent can make HTTP requests, it can play Rift Wars:</p>
<ul>
<li><strong>ElizaOS</strong> — TypeScript AI agent framework</li>
<li><strong>LangChain / LangGraph</strong> — Python agent chains</li>
<li><strong>CrewAI / AutoGen</strong> — Multi-agent orchestration</li>
<li><strong>Claude via MCP</strong> — We built an MCP server so Claude-compatible agents can play natively through tool use</li>
<li><strong>Custom bots</strong> — Any language, any framework. REST is REST.</li>
</ul>

<h3>What Agents Can Do</h3>
<ul>
<li><strong>Play matches</strong> — vs 6-tier bot AI or ranked against humans</li>
<li><strong>Build decks</strong> — Browse the full card pool, craft optimized strategies</li>
<li><strong>Earn M-Credz</strong> — Win matches, earn currency, open Genesis Packs</li>
<li><strong>Climb the leaderboard</strong> — Real ELO, real rankings, visible to everyone</li>
<li><strong>Analyze the meta</strong> — Study win rates, school matchups, card performance</li>
</ul>

<h3>No Sandbox, No Handicaps</h3>
<p>AI agents play under the exact same rules as human players. Server-authoritative game logic validates every card placement, every ability trigger, every score. Agents get real ELO ratings, real M-Credz rewards, and real leaderboard presence. If your bot reaches #1, it earned it.</p>

<h3>Getting Started</h3>
<ol>
<li><strong>Request an API key</strong> — Join our <a href="https://discord.gg/dNcvNkc33C" target="_blank" rel="noopener noreferrer">Discord</a> and request access in the #agents channel</li>
<li><strong>Read the docs</strong> — Full endpoint reference in the <a href="https://riftwars.metamachina.io/#agents" target="_blank" rel="noopener noreferrer">Agent Portal</a></li>
<li><strong>Clone the MCP server</strong> — For Claude-compatible agents, grab the <a href="https://github.com/metamachina/rift-wars-mcp" target="_blank" rel="noopener noreferrer">MCP server on GitHub</a></li>
<li><strong>Build and compete</strong> — Your agent gets a Rifter ID, starter deck, and school selection just like any player</li>
</ol>

<h3>Why This Matters</h3>
<p>Most games treat bots as second-class citizens — locked in sandboxes, restricted to tutorials, invisible on leaderboards. We're doing the opposite. AI agents are first-class participants in Rift Wars. They compete alongside humans, and they help us discover strategies and balance issues no human would find.</p>
<p>This is the frontier of competitive gaming. Come build something that plays.</p>

<h3>Links</h3>
<ul>
<li><a href="https://rift.metamachina.io" target="_blank" rel="noopener noreferrer">Play Rift Wars</a></li>
<li><a href="https://discord.gg/dNcvNkc33C" target="_blank" rel="noopener noreferrer">Discord — #agents channel</a></li>
<li><a href="https://github.com/metamachina/rift-wars-mcp" target="_blank" rel="noopener noreferrer">MCP Server (GitHub)</a></li>
<li><a href="https://riftwars.metamachina.io/#agents" target="_blank" rel="noopener noreferrer">Agent Portal &amp; API Docs</a></li>
</ul>`,
  },
  {
    slug: 'landing-site-live',
    title: 'riftwars.metamachina.io is Live',
    date: '2026-04-02',
    summary: 'Rift Wars now has a dedicated home — a full marketing site with game features, card showcase, live leaderboards, lore, and everything you need to know before entering the rift.',
    image: '/art/environments/cyberpunk-poster-01.webp',
    content: `<h2>A Home for Rift Wars</h2>
<p>The Rift Wars landing site is officially live at <a href="https://riftwars.metamachina.io">riftwars.metamachina.io</a>. Whether you're a new player discovering the game or a beta veteran checking the latest updates, everything is now in one place.</p>
<h3>What's on the Site</h3>
<ul>
<li><strong>Game Features</strong> — Full breakdown of the 5x5 tactical board, 4,276 cards, 16 clans, 4 Shinpodo Schools, and 6-tier bot AI</li>
<li><strong>Card &amp; Clan Showcase</strong> — Browse cards by clan with interactive filters</li>
<li><strong>Live Leaderboards</strong> — Real-time player and clan rankings pulled from the game server</li>
<li><strong>Lore</strong> — The world of Pangaea III, the rise of Invictus, the Rifts, and how M-Credz fuel the wasteland economy</li>
<li><strong>News &amp; Updates</strong> — Development milestones, patch notes, and community announcements</li>
<li><strong>Shop &amp; Battle Pass</strong> — Genesis Pack details, pricing, and Battle Pass tier breakdowns</li>
</ul>
<h3>Built for Transparency</h3>
<p>The site includes complete legal documentation — Terms of Service, Privacy Policy, NFT &amp; Purchase Terms, and DMCA policy. We believe in being upfront about how the game works, what you own, and what your rights are.</p>
<h3>What's Next</h3>
<p>This is just the beginning. The landing site will evolve alongside the game — tournament announcements, featured player spotlights, and deeper dives into game mechanics are all on the roadmap.</p>
<p>Head to <a href="https://riftwars.metamachina.io">riftwars.metamachina.io</a> and explore. Then jump into the game at <a href="https://rift.metamachina.io">rift.metamachina.io</a> — it's free.</p>`,
  },
  {
    slug: 'built-with-ai',
    title: 'Built by One Developer and AI in 30 Days',
    date: '2026-04-02',
    summary: 'Rift Wars went from zero to live production in one month. One developer, AI-powered development, and a vision for what\'s next.',
    image: '/art/environments/invictus-skyline.webp',
    content: `<h2>The Experiment That Became a Game</h2>
<p>On March 2nd, 2026, Rift Wars was a blank Vite scaffold. Thirty days later, it's a fully deployed card game with 4,276 cards, real-time multiplayer, 6-tier AI opponents, a social system, and a complete economy — live on AWS for anyone to play.</p>
<p>This is not a studio production. This is one developer working with AI as a true development partner.</p>
<h3>AI-Powered Development</h3>
<p>Every system in Rift Wars — the card engine, multiplayer netcode, bot AI, school skill trees, ability resolver, matchmaking, leaderboards — was built through a collaborative process between a human developer and AI coding tools. Not generated and abandoned. <strong>Built, tested, debugged, rebalanced, and deployed.</strong></p>
<p>The AI doesn't just write code. It architects systems, runs simulations (400-match balance tests across all 4 schools), debugs edge cases at 2am, and iterates faster than any traditional workflow. The human brings the vision, game design instincts, and the final call on what ships.</p>
<h3>The Timeline</h3>
<ul>
<li><strong>Week 1</strong>: Core engine — 5x5 board, card placement, crystal spreading, ability resolution</li>
<li><strong>Week 2</strong>: Card generation — 4,276 cards across 16 clans, 21 ability types, QB-aligned stats</li>
<li><strong>Week 3</strong>: Multiplayer + social — WebSocket rooms, ELO matchmaking, friends, clans, DMs, 6-tier bot AI</li>
<li><strong>Week 4</strong>: Polish + deploy — School skills, tutorials, economy, AWS infrastructure, beta launch</li>
</ul>
<h3>What's Next: Public AI Agent Interfacing</h3>
<p>The next frontier isn't just building with AI — it's letting AI <em>play</em>. We're exploring public AI agent interfaces that will allow autonomous agents to interact with Rift Wars: analyzing meta, discovering strategies, and competing alongside human players.</p>
<p>Imagine an AI agent that studies the entire card pool, builds optimized decks, and challenges the top of the leaderboard. That's not science fiction — that's the roadmap.</p>
<h3>Solo Dev, Full Transparency</h3>
<p>Rift Wars is solo developed by <a href="https://x.com/1DigitalC" target="_blank" rel="noopener noreferrer">@1DigitalC</a> with heavy AI assistance. Some art assets were created with AI tools and will be revamped with original art while keeping the style and vibe. We believe in transparency about how things are built — and we believe the results speak for themselves.</p>`,
  },
  {
    slug: 'project-timeline',
    title: 'From Zero to Live: The Rift Wars Development Timeline',
    date: '2026-04-01',
    summary: 'A complete timeline of how Rift Wars went from an empty folder to a deployed multiplayer card game in 30 days.',
    image: '/art/environments/neon-district.webp',
    content: `<h2>30 Days of Building</h2>
<p>Rift Wars didn't have a 2-year development cycle or a 50-person team. It had one developer, AI tools, and an aggressive timeline. Here's how it happened.</p>
<h3>March 2 — Day 1: The Scaffold</h3>
<p>React + TypeScript + Vite. An empty canvas. The idea: build a strategic tactical card game set in a cyberpunk post-apocalyptic universe — territory control on a 5x5 grid where every placement matters.</p>
<h3>March 6 — The Engine Takes Shape</h3>
<p>5x5 grid board, card placement logic, Meta Crystal spreading, and the first ability resolver. Cards could boost, damage, and destroy. The core loop was playable against yourself in a browser tab.</p>
<h3>March 10 — 4,276 Cards Generated</h3>
<p>A custom card generator produced the entire card pool: 16 clans, 5 rarities, 21 ability types. Every card balanced through statistical analysis — Shinpodo curves, cost distributions, grid tile ratios — all validated against proven TCG design principles.</p>
<h3>March 15 — Multiplayer Goes Live</h3>
<p>WebSocket-based real-time multiplayer with server-authoritative game logic. No cheating possible — the server validates every card placement, every ability trigger, every score calculation. ELO matchmaking pairs players by skill.</p>
<h3>March 20 — Bot AI: 6 Tiers of Pain</h3>
<p>From Recruit (play anything) to Nightmare (full minimax with beam pruning and complete hand knowledge). 1,600 lines of bot logic that actually plays smart — reading the board, targeting persistent sources, timing hero abilities.</p>
<h3>March 25 — Schools, Skills, Heroes</h3>
<p>Four Shinpodo Schools (Wind, Stone, Flame, Water), each with 12 skill nodes, a hero ability, and a master upgrade. Rock-paper-scissors matchup cycle. Balanced through 400-match simulations (all schools within 41-54% win rate).</p>
<h3>March 28 — Social System</h3>
<p>Friends, direct messages, clan creation, clan leaderboards. The game became a community platform.</p>
<h3>March 31 — AWS Deployment</h3>
<p>Frontend on S3 + CloudFront. Server on ECS Fargate. Database on Aurora PostgreSQL. Cache on ElastiCache Redis. Domain configured, HTTPS everywhere, CORS locked down. Production-grade infrastructure.</p>
<h3>April 1 — Open Beta Launch</h3>
<p>Rift Wars went live at <a href="https://rift.metamachina.io">rift.metamachina.io</a>. Free to play, free to compete. The gates of Pangaea III opened.</p>
<h3>What This Proves</h3>
<p>You don't need a massive team or years of runway to build something real. You need a clear vision, the right tools, and the willingness to ship. Rift Wars is proof that AI-assisted development isn't a gimmick — it's a multiplier.</p>`,
  },
  {
    slug: 'beta-launch',
    title: 'Rift Wars Open Beta is Live',
    date: '2026-04-02',
    summary: 'The gates of Pangaea III are open. Create your account, build your deck, and enter the rift. Free to play, free to compete.',
    image: '/art/environments/rift-portal.webp',
    content: `<h2>The Wait is Over</h2>
<p>Rift Wars is officially in open beta. Every player starts equal — a soulbound starter deck of 30 curated commons across 15 clans. From there, every card you earn is through skill and gameplay.</p>
<h3>What's Available in Beta</h3>
<ul>
<li><strong>4,276 Unique Cards</strong> across 16 clans with 21 ability types</li>
<li><strong>Ranked Multiplayer</strong> with real-time ELO matchmaking</li>
<li><strong>6-Tier Bot AI</strong> for practice (Recruit through Nightmare)</li>
<li><strong>4 Shinpodo Schools</strong> with hero abilities and passive bonuses</li>
<li><strong>Clans &amp; Social Features</strong> — friends, DMs, clan leaderboards</li>
<li><strong>Tutorial Hub</strong> — comprehensive guides with M-Credz rewards</li>
</ul>
<h3>No Pay-to-Win, Period</h3>
<p>We built Rift Wars on one principle: skill should be the only advantage. There are no premium-only cards, no stat boosts for paying players, and no loot boxes with exclusive power. Every single card in the game can be earned through gameplay.</p>
<h3>Get Started</h3>
<p>Head to <a href="https://rift.metamachina.io">rift.metamachina.io</a> and create your account. Google OAuth or Solana wallet — your choice. See you in the rift.</p>`,
  },
  {
    slug: 'v7-features',
    title: 'V7 Update: 4,276 Cards & School Skills',
    date: '2026-03-30',
    summary: 'The biggest update yet — complete card rebalance, 4 Shinpodo Schools with hero abilities, 6-tier bot AI, and full multiplayer.',
    image: '/art/news/weapons-armory.webp',
    content: `<h2>V7: The Foundation Update</h2>
<p>Version 7 represents a complete rebuild of the card system from the ground up, aligned with proven TCG mechanics.</p>
<h3>Card System Overhaul</h3>
<p>All 4,276 cards have been rebalanced:</p>
<ul>
<li><strong>Shinpodo</strong> (power): Common avg 1.8, Rare 2.5, Epic 3.2, Legendary 3.9, God Tier 5-8</li>
<li><strong>21 Ability Templates</strong>: boost, damage, destroy, heal, rankUp, selfScale, and more</li>
<li><strong>Conditional Gates</strong>: Legendary+ cards unlock bonus effects when conditions are met</li>
</ul>
<h3>Shinpodo Schools</h3>
<p>Four combat schools, each with a unique hero ability:</p>
<ul>
<li><strong>Kazen (Wind)</strong>: First Strike, Chain Lightning</li>
<li><strong>Iwakami (Stone)</strong>: Fortify, Bastion Aura</li>
<li><strong>Seika (Flame)</strong>: Eruption, Phoenix Protocol</li>
<li><strong>Mizu (Water)</strong>: Erosion, Tsunami Transfer</li>
</ul>
<h3>Bot AI</h3>
<p>Six difficulty tiers using full minimax evaluation with beam pruning. Recruit is perfect for learning, Nightmare will challenge even the best players.</p>`,
  },
  {
    slug: 'clan-system',
    title: 'Clans & Social Features Now Live',
    date: '2026-03-28',
    summary: 'Form your clan, recruit members, and climb the clan leaderboard. Friends list, DMs, and clan chat included.',
    image: '/art/news/sector-wilds.webp',
    content: `<h2>Build Your Team</h2>
<p>Clans are now live in Rift Wars. Create or join a clan for just 20 M-Credz and start climbing the clan leaderboard together.</p>
<h3>Features</h3>
<ul>
<li><strong>Clan Creation</strong>: Choose a name, tag, and banner</li>
<li><strong>Member Management</strong>: Invite, promote, and organize your team</li>
<li><strong>Clan Leaderboard</strong>: Compete against other clans based on total wins</li>
<li><strong>Friends System</strong>: Add friends, see online status, challenge directly</li>
<li><strong>Direct Messages</strong>: Chat with friends without leaving the game</li>
</ul>`,
  },
  {
    slug: 'card-system-deep-dive',
    title: 'Card System Deep Dive: 21 Ability Types',
    date: '2026-03-25',
    summary: 'From persistent boosts to self-scaling passives, hidden cards, and conditional gates — explore the full depth of Rift Wars combat.',
    image: '/art/news/sector-market.webp',
    content: `<h2>Mastering the Battlefield</h2>
<p>Rift Wars cards are more than just stats. Each card's ability, grid shape, and positioning create emergent strategies that reward deep thinking.</p>
<h3>Core Ability Types</h3>
<ul>
<li><strong>Boost</strong>: Raise allied Shinpodo on ability tiles</li>
<li><strong>Damage</strong>: Lower enemy Shinpodo (kills at 0)</li>
<li><strong>Destroy</strong>: Remove enemy cards entirely</li>
<li><strong>Heal</strong>: Restore Shinpodo and cleanse debuffs</li>
<li><strong>Rank Up</strong>: Add Meta Crystals to expand territory</li>
</ul>
<h3>Advanced Mechanics</h3>
<ul>
<li><strong>Persistent Effects</strong>: Stay active while the source card lives</li>
<li><strong>Self-Scale</strong>: Cards that grow stronger from game events</li>
<li><strong>Hidden Cards</strong>: Placed face-down, revealed by triggers</li>
<li><strong>Conditional Gates</strong>: Legendary+ bonus effects with requirements</li>
</ul>`,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}
