// RULE: Every article MUST use a unique image. Never reuse an image that another article already uses.
// Check all existing `image:` values before assigning one to a new article.

export interface Article {
  slug: string;
  title: string;
  date: string;
  image: string;
  summary: string;
  content: string;
  /** Optional ≤155-char description for <meta name="description"> / SERP. Falls back to truncated summary. */
  seoSummary?: string;
  /** Optional author override (default: "1DigitalC"). */
  author?: string;
}

export const articles: Article[] = [
  {
    slug: 'the-solo-dev-reality',
    title: 'The Long Way Around',
    date: '2026-04-28',
    summary: 'The Rift Wars Papers Part IV. The funding pipeline collapsed, hiring froze, and the path to building a game the normal way disappeared. This is the story of what got built while looking for a better one, and what the search revealed about why the industry is harder than it should be.',
    seoSummary: 'The Rift Wars Papers Part IV. Funding froze, hiring stalled, the normal path to building a game disappeared. Here is what got built anyway.',
    image: '/art/news/the-solo-dev-reality.png',
    content: `<p class="text-mm-text2 italic mb-8">By <a href="https://x.com/1DigitalC" target="_blank" rel="noopener noreferrer">1DigitalC</a>. The Rift Wars Papers, Part IV: The Execution</p>

<p>I didn't set out to build a game alone. I set out to build something good and went looking for the people, the funding, and the structures that are supposed to make that possible. What I found instead was a pipeline that doesn't work for new projects in 2026, and a long list of reasons why the games most of us grew up loving are getting harder to make every year.</p>

<p>Rift Wars exists because I kept building while I was looking. This is the story of how that happened, what the search taught me about the state of the industry, and what I think it would take to actually fix it.</p>

<p>I'm not writing this to celebrate working alone. I'd happily work with a team tomorrow if the right one walked through the door. I'm writing it because the conditions that pushed me to do every layer of this myself are the same conditions strangling a generation of small studios, and that's worth talking about honestly.</p>

<h2>The Pipeline Is Broken</h2>
<p>Start with the funding side. Five years ago, an indie team with a working prototype could find a publisher willing to put up six or seven figures for finishing funds. That market has retrenched hard. Mid-size publishers have either folded, been acquired, or pulled inward to first-party slates. Venture capital, which briefly flooded into "web3 gaming," largely left when the token model collapsed and didn't come back for traditional games. Platform grants exist but are oversubscribed by orders of magnitude.</p>
<p>The hiring side is worse. Studios laid off tens of thousands of developers across 2023, 2024, and into 2025. The people I'd want to work with, engineers, designers, artists who shipped real things, are mostly looking for stable salaries at companies that aren't hiring, not equity stakes in a prototype. I don't blame them. I'd want the same in their position.</p>
<p>So the path that's supposed to exist (find a publisher, get an advance, hire a small team, ship a game) is, for most new projects, simply not available. You can spend six months chasing it, or you can build.</p>
<p>I chose to build while I kept looking. That's the actual origin story.</p>

<h2>The Bureaucracy Tax</h2>
<p>Here's the part that surprised me most. When I did get into rooms with established teams, what I saw wasn't velocity I lacked. It was velocity I'd lose by joining.</p>
<p>This isn't a knock on the people. Most game developers I've talked to are sharp and care about the work. The problem is structural. Process compounds with team size. A decision that takes one focused person five minutes can take a ten-person team three days: schedule the meeting, prep the docs, present the options, defer to the next sync, write the follow-up, get sign-off from the lead, get sign-off from the lead's lead, then implement.</p>
<p><a href="https://en.wikipedia.org/wiki/Brooks%27s_law" target="_blank" rel="noopener noreferrer">Brooks's Law</a> named this in 1975. It still applies. Adding people to a project doesn't add proportional output, and past a certain inflection point it actively slows things down. Not because anyone is bad at their job. It is because coordination is expensive, and bureaucracy is what coordination calcifies into when nobody is empowered to cut through it.</p>
<p>I'm not anti-process. The right process is the difference between a team that ships and a team that doesn't. But I've watched smart people lose months to approval chains that produced nothing a single empowered designer couldn't have decided in an afternoon. That's the bureaucracy tax, and it's part of why mid-size game projects keep dying.</p>

<h2>What Necessity Teaches</h2>
<p>When the pipeline doesn't open, you have two options: wait, or learn.</p>
<p>I learned. Not because I wanted to be a one-person studio, but because every gap in the project was a gap nobody else was going to fill. So I filled them, one at a time, in the order they became blockers.</p>
<p>I needed a server, so I learned server architecture. I needed cards, so I built a card generation system. I needed opponents at any hour, so I built a six-tier AI curriculum. I needed deployment, so I learned the deployment stack. I needed marketing, so I learned that too. Badly at first, then less badly. None of these were skills I picked up because solo dev is romantic. They were skills I picked up because the work was sitting there waiting.</p>
<p>That's the part the "I built this alone" posts on social media never capture. It's not a flex. It's a sequence of necessities. Every time I look at the codebase I see a record of what the industry didn't have available for a project at this scale, and a record of how far you can actually go by just refusing to stop.</p>

<h2>The Coherence Side Effect</h2>
<p>I want to flag one thing I noticed along the way, not as advocacy but as observation: the systems in Rift Wars are unusually coherent, and I think it's because they were forced through one head before they hit production.</p>
<p>The card generation system feeds the AI evaluation system, which feeds the matchmaking system, which feeds the economy. They weren't designed by separate teams negotiating their boundaries. They were designed in the same week, often in the same afternoon. When I add a new ability, I'm thinking about how the AI evaluates it, how it interacts with persistent effects, how it renders, and how it changes scoring all at once. Not because that's the right way to build games. It happens because there isn't anyone else to think about those layers.</p>
<p>That single-mind effect is real. ConcernedApe talked about it with Stardew Valley. The trade-off is obvious: scope. You pay for coherence with everything you can't build, and that bill comes due fast.</p>

<h2>Scope Is the Real Enemy</h2>
<p>The biggest killer of small projects isn't burnout. It's scope.</p>
<p>You start with a card game. Then it needs ranked matchmaking. Then it needs an economy. Then six tiers of AI. Then schools with skill trees. Then maps with modifiers. Then prediction markets. Each addition is reasonable on its own. Stacked, they bury you.</p>
<p>The discipline of building under constraints, whether solo, small team, or anything without a deep bench, is knowing what to cut. I've cut features from Rift Wars that I loved. Mechanics that were interesting but not essential. Effects that looked great but tanked performance. Subsystems that worked beautifully in isolation but made everything else harder to maintain.</p>
<p>Every feature you ship is a feature you maintain. That math hits differently when you're the one maintaining it.</p>

<h2>The Part Nobody Sees</h2>
<p>Here's a typical Tuesday.</p>
<p>7am: Check server logs from overnight. Two matches threw errors because of a card interaction edge case I didn't account for. Fix it.</p>
<p>9am: Card generation. Run the probability audit on the new batch. Three cards have ability grids that extend off the board from certain positions. Fix those.</p>
<p>11am: AI tuning. The Apex tier is over-weighting destroy cards. It's winning too consistently by killing everything. Adjust the heuristic to value board presence more.</p>
<p>1pm: Client work. The death animation isn't triggering VFX correctly when a persistent card is killed. The persistent removal and the death animation are racing. Fix the timing.</p>
<p>3pm: Marketing. Write a tutorial post. Generate the graphic. Schedule it. Check yesterday's engagement. Respond to the one comment.</p>
<p>5pm: Economy balancing. Run the M-Cred distribution simulation for 10,000 matches. Make sure the reward curve doesn't break the market in six months.</p>
<p>7pm: Still coding. Still fixing. Still building.</p>
<p>Nobody posts about the Tuesday. The version of indie dev the internet sees is launch screenshots and milestone tweets. The version that's real is 300 Tuesdays in a row, alone or otherwise.</p>

<h2>What I'd Bring to a Team</h2>
<p>This is where I'd want to land the article honestly: I'm not arguing that solo development is the answer. It isn't. It's an answer to a specific problem: a broken funding and hiring pipeline that left a generation of projects without obvious paths forward.</p>
<p>If anything, building this way has clarified what I'd want in a team. People empowered to make decisions without three layers of sign-off. Processes that exist to remove friction, not perform thoroughness. Generalists who understand more than their lane and specialists who go deep where it counts. Leadership that protects velocity instead of taxing it.</p>
<p>Knowing every layer of a game stack (server, client, AI, economy, deployment, marketing) isn't a substitute for working with great people. It's preparation for working with them well. You know what to ask for. You know which problems compound. You know where the pipeline tends to break and why.</p>
<p>That's the part I'd carry into any team that wants to ship something real.</p>

<h2>Why I'm Still Building</h2>
<p>Because waiting wasn't an option that produced anything.</p>
<p>I could spend six more months pitching, networking, and applying. I could keep writing the same proposal in different voices for funds that aren't deploying. Or I could keep the project moving and let the work itself be the proof.</p>
<p>So that's what I do. Every week the game gets better. Every week the AI gets sharper. Every week the card pool gets deeper. And every week I learn something else about why this industry is harder than it should be, and what it would take to make it less so.</p>
<p>The pipeline didn't open. So I built around it. That's not a manifesto. It's just what was available.</p>
<p><strong>The work shipped because somebody had to ship it. That's the only lesson worth keeping.</strong></p>

<p class="text-mm-text2 italic mt-8">This is how I think. This is what I'm building. If that resonates, you'll understand the game, and probably the work I'd do next.</p>`
  },
  {
    slug: 'man-vs-machine',
    title: 'Man vs Machine',
    date: '2026-04-22',
    summary: 'The Rift Wars Papers Part III. Every game has bots. Most are garbage. Why time-to-match is the metric nobody talks about, and how a 6-tier AI curriculum turns bots from a placeholder into a feature.',
    image: '/art/news/man-vs-machine.png',
    content: `<p class="text-mm-text2 italic mb-8">By <a href="https://x.com/1DigitalC" target="_blank" rel="noopener noreferrer">1DigitalC</a> — The Rift Wars Papers, Part III: The Infrastructure</p>

<p>Every game has bots. Most of them are terrible. And nobody talks about why that matters, because the industry treats AI opponents like a checkbox instead of a feature.</p>

<p>I've been playing competitive games since before matchmaking existed. Back when you hosted your own servers, picked your own lobbies, and if nobody was online at 2am, you just didn't play. We accepted that. But the modern player doesn't, and shouldn't have to.</p>

<p>Here's the problem nobody wants to say out loud: your game is dead every minute a player can't find a match.</p>

<h2>The Queue Time Problem</h2>
<p>Every multiplayer game lives and dies by one metric that never shows up in pitch decks: time-to-match. How long does a player wait between pressing "Play" and actually playing?</p>
<p>Industry data tells us the window is brutally small. <a href="https://technology.riotgames.com/news/peeking-valorants-netcode" target="_blank" rel="noopener noreferrer">Research from Riot Games</a> and internal studies across competitive titles consistently show that player tolerance for queue times drops off a cliff after 60 seconds. By 2 minutes, a significant percentage of players cancel the queue. By 5 minutes, you've lost them. Not just for that session, but permanently.</p>
<p>For a new game without millions of concurrent users, this is a death sentence. You launch. You have 500 players spread across 24 time zones. At any given moment, maybe 15 are looking for a match. The queue takes 3 minutes. Half of them leave. Tomorrow they don't come back. Your player count drops to 300. Queue times get longer. The spiral accelerates.</p>
<p>This is how games die. Not from bad gameplay. Not from bugs. From an empty lobby.</p>

<h2>The Bot Excuse</h2>
<p>So the obvious answer is bots. Every game studio knows this. And in most cases, studios treat it like an embarrassment. Something you hide, something you apologize for. "We have bots while the player base grows." As if AI opponents are a placeholder for real humans rather than a feature in their own right.</p>
<p>That mindset is backwards.</p>
<p>Look at the games that have lasted decades. Chess has been played against computers since 1997 and nobody considers that a lesser experience. Fighting games have training mode AI that competitive players use to lab combos for hundreds of hours. Even Pokémon, one of the highest-grossing franchises in history, is fundamentally a single-player game against AI trainers.</p>
<p>The problem isn't that games have bots. The problem is that most bots are garbage.</p>
<p>They're either so brain-dead that beating them teaches you nothing, or so brutally overtuned that fighting them feels like hitting a wall. Neither makes you a better player. Neither is fun. And when your game's only option at 2am is a bot that plays like a drunk toddler or a bot that plays like it has read access to your hand — players close the tab.</p>

<h2>Building AI That Teaches</h2>
<p>When I started building the bot system for Rift Wars, I had one principle: every tier should teach you something.</p>
<p>Not "make easy bots for bad players and hard bots for good players." That's lazy. Every difficulty level should develop a specific skill. The progression through bot tiers should feel like a curriculum, not just a slider from "braindead" to "unfair."</p>
<p>Here's what that looks like in practice:</p>
<p><strong>Recruit</strong> plays simple. It places cards where it has crystals, prioritizes filling the board, doesn't think about your grid at all. What does it teach? Board awareness. You learn to read your own card grids, understand crystal placement, and figure out the basic flow of a match without being punished for mistakes. It's fundamentals.</p>
<p><strong>Operative</strong> starts considering row scoring. It tries to win rows, not just fill tiles. It starts to focus placement. What does it teach? Strategic intent. You learn that placement isn't random — it's purposeful. You start thinking about which rows to contest and which to concede.</p>
<p><strong>Commander</strong> evaluates ability interactions. It places destroy cards where your high-value targets sit. It uses boost strategically. What does it teach? Reading the board from your opponent's perspective. You start seeing threats before they materialize. You start placing defensively when you need to.</p>
<p><strong>Apex</strong> is where it shifts. Apex has limited visibility into your hand. It can see 2 of your cards. It uses that information to predict your next move and counter it. It reads your patterns across the match. If you always open with a cost-1 card in the center column, Apex notices. If you tend to stack one row and abandon another, Apex punishes that.</p>
<p>What does it teach? That you have patterns, and good opponents exploit them. This is the tier where players start to get uncomfortable, because Apex holds up a mirror.</p>
<p><strong>Master</strong> sees more of your hand and analyzes your deck composition. It makes reads based on what cards you've already played versus what's statistically likely to be left. It plays the odds.</p>
<p><strong>Nightmare</strong> sees everything. Full information. It's not meant to be fair — it's meant to be a wall. The question isn't whether you can beat it. The question is whether you can find a line through perfect play.</p>

<h2>Why This Matters More Than You Think</h2>
<p>Here's what I've observed after watching players progress through bot tiers: the ones who grind through all six tiers before entering ranked play outperform the ones who jump straight to PvP.</p>
<p>And it's not close.</p>
<p>The bot tiers aren't a substitute for human competition. They're preparation for it. A player who's beaten Apex has already confronted their own habits, already learned to vary their openings, already developed the reflex to read ability grids before placing. They enter ranked with fundamentals that take pure-PvP players weeks to develop.</p>
<p>This is the part the industry gets wrong. Bots aren't the fallback when humans aren't available. Bots are the training ground that makes human competition better. Every martial art has forms you practice alone before you spar. Every musician practices scales before they perform. Games should work the same way.</p>

<h2>The 2am Test</h2>
<p>I call it the 2am test. If a player opens your game at 2am in a timezone where nobody else is playing, do they have a meaningful experience?</p>
<p>If the answer is "they sit in a queue for 5 minutes and close the tab," your game fails the test. It doesn't matter how good your gameplay is. It doesn't matter how balanced your cards are. If there's nobody to play against and no AI worth fighting, the player leaves. And every time they leave, the probability of them coming back drops.</p>
<p>Rift Wars passes the 2am test. At any hour, any timezone, a player can launch the game and immediately fight an AI opponent calibrated to their skill level. No queue. No waiting. No empty lobby. The bot is ready the moment you are.</p>
<p>And here's the part that matters: that bot match still teaches them something. It still has strategic depth. It still prepares them for ranked. It's not a consolation prize. It's part of the game.</p>

<h2>The Future of Man vs Machine</h2>
<p>We're entering an era where AI in games won't just be difficulty tiers. It'll be adaptive opponents that evolve with each player individually. Opponents that remember your tendencies across sessions. Opponents that develop their own meta based on how the entire player base plays.</p>
<p>Some of that is already happening in Rift Wars at the higher tiers. But the potential goes further than any single game.</p>
<p>Imagine a training AI that identifies your three biggest weaknesses and constructs matches specifically designed to expose them. Not to punish you — to teach you. An AI that sees you always neglect the bottom row and forces you to contest it until you develop the habit. An AI that notices you never play hidden cards and creates board states where hidden cards are the optimal play.</p>
<p>That's not science fiction. That's the direction.</p>
<p>The question for every game developer should be: are your bots making your players better? Or are they just filling empty chairs?</p>
<p>If your game needs humans to exist before it's worth opening, it's fragile. If it works without them — if the experience holds up at 2am with zero players online — it scales.</p>
<p><strong>If your AI isn't teaching, it's wasting everyone's time.</strong></p>

<p class="text-mm-text2 italic mt-8">This is how I think. This is what I'm building. If that resonates, you'll understand the game.</p>`
  },
  {
    slug: 'patch-april-15-2026',
    title: 'Patch Notes: April 15, 2026',
    date: '2026-04-15',
    summary: 'Complete lobby redesign, guest Quick Play for VibJam, Rift Rating system, support tickets, 8 school skill fixes, Shinpodo scoring overhaul, and over a dozen bug fixes.',
    image: '/art/news/signal-broadcast-patch-april-15-2026.png',
    content: `<p class="text-mm-text2 italic mb-8">By <a href="https://x.com/1DigitalC" target="_blank" rel="noopener noreferrer">1DigitalC</a></p>

<p>This is one of the biggest patches we've shipped. A complete lobby redesign, a guest play system for VibJam visitors, a new support ticket system, a full Rift Rating overhaul, and over a dozen bug fixes across schools, scoring, and UI.</p>

<h2>Guest Quick Play (VibJam)</h2>
<p>Rift Wars is now in the <a href="https://vibej.am/2026/" target="_blank" rel="noopener noreferrer">Cursor VibJam 2026</a>. To make sure anyone can try the game instantly, we built a zero-friction guest system.</p>
<ul class="list-disc pl-6 space-y-1 mb-6">
<li>One-click QUICK PLAY button for new visitors. No sign-up required.</li>
<li>Guests are instantly matched against real AI bot opponents with full decks, schools, and portraits.</li>
<li>Post-match sign-in prompt: "Want an edge? Sign in and claim your bonus EXP and Credits."</li>
<li>PLAY AGAIN button for instant rematches.</li>
<li>Guest accounts auto-purge after 24 hours.</li>
<li>IP rate limited: 10 guest sessions per hour to prevent abuse.</li>
</ul>

<h2>Complete Lobby UI Overhaul</h2>
<p>The old splash screen is retired. The new lobby is a full-screen experience.</p>
<ul class="list-disc pl-6 space-y-1 mb-6">
<li>Hero portrait front and center with player info sidebar.</li>
<li>Video background behind the main character.</li>
<li>Live match ticker feed across the top bar.</li>
<li>Currency display (M-Credz + Meta Crystals) in the top bar.</li>
<li>Shop area with vendor art and bounty board preview.</li>
<li>Clan logo display for clan members.</li>
<li>School and threat level display in the player info panel.</li>
</ul>
<p>If you haven't logged in since last week, you won't recognize it.</p>

<h2>Support Ticket System</h2>
<p>Players can now report bugs directly from the game.</p>
<ul class="list-disc pl-6 space-y-1 mb-6">
<li>New SUPPORT button next to MATCH LOGS in the Rifter ID stats panel.</li>
<li>Submit bug reports with an optional match ID reference.</li>
<li>Tickets stored in the database for admin batch review.</li>
<li>5 tickets per day limit per player.</li>
</ul>

<h2>Rift Rating System</h2>
<p>Raw ELO is no longer the leaderboard sort. We've replaced it with a composite Rift Rating that rewards consistency, not just peak performance.</p>
<ul class="list-disc pl-6 space-y-1 mb-6">
<li>Formula: ELO (65%) + Win Rate (20%) + Games Played (10%) + Win Streak (5%).</li>
<li>Only ranked PvP games count toward Rift Rating.</li>
<li>Rank arrows show movement: green up, red down, cyan for NEW.</li>
<li>ELO-banded matchmaking: +/-150 at 5-10s queue, +/-300 at 10-15s, open at 15s+.</li>
</ul>

<h2>School Skill Fixes</h2>
<p>Eight school skills were rebalanced or fixed.</p>
<ul class="list-disc pl-6 space-y-1 mb-6">
<li>Fixed hidden card selfScale exploit. Hidden unrevealed cards were scaling on every placement.</li>
<li>Tidal Stance (Mizu hero) now resolves triggered hidden ally abilities and reveals them.</li>
<li>Battle Medic (Iwakami) now only triggers on green cards, not all cards.</li>
<li>Relentless Pressure (Kazen) discount now applies next turn, not same turn.</li>
<li>Swift Draw (Kazen) uses tile crystal count instead of card cost.</li>
<li>Rift Siphon (Mizu) missing +1 Shinpodo boost added.</li>
<li>Overcharge (Seika) checks tile crystal count instead of card cost.</li>
<li>Blitz Protocol (Kazen) takes MAX of firstStrike amounts instead of stacking.</li>
</ul>

<h2>Artifact &amp; School Timing Fix</h2>
<p>Pre-match artifacts (e.g. Divination Scroll +1 card) now fire AFTER mulligan, not before. School draw bonuses (e.g. Kazen Swift Draw) also moved to post-mulligan. Players mulligan their base 6 cards, then receive bonus draws when the match starts.</p>

<h2>Shinpodo Scoring Overhaul</h2>
<ul class="list-disc pl-6 space-y-1 mb-6">
<li>Counter now shows total Shinpodo POINTS GAINED, not cards placed.</li>
<li>Display changed from "x{count}" to "+{points}."</li>
<li>Gold threshold raised from 5 to 30.</li>
</ul>

<h2>Other Fixes</h2>
<ul class="list-disc pl-6 space-y-1 mb-6">
<li>Desktop PWA fix: installed desktop app no longer shows mobile layout.</li>
<li>Rankings panel: list no longer scrolls behind action buttons on desktop.</li>
<li>IP tracking: login IPs now recorded on every auth for anti-cheat and fair play.</li>
<li>Tally screen row scores switched from flex to CSS grid for proper alignment.</li>
<li>Shinpodo callout animation delay fix (appears after rows collapse).</li>
<li>Hidden card board visibility fix (own hidden cards were invisible).</li>
<li>Desktop PWA hover fix (no longer forces double-tap).</li>
<li>Mizu hidden buff cap: Deep Current + Redirect capped at baseShinpodo x 3.</li>
<li>DQ timeout exploit fix: forfeit player always loses regardless of score.</li>
<li>Prestige system fix: calculates from XP past level 50.</li>
<li>Discard UI overhaul: dark overlay + pulsing warning on hand overflow.</li>
<li>Placement preview now respects school cost reduction.</li>
<li>Hero ability school-colored tile effects added.</li>
<li>Inferno Stance kills now trigger on-kill school effects.</li>
</ul>

<h2>What's Next</h2>
<p>The Rift Wars tournament is live. The leaderboard is active. Chaos Mode is running. Every fix here came from player reports and live match data.</p>
<p>Found a bug? Hit the new SUPPORT button in your Rifter ID panel. Your reports directly shape what we fix next.</p>

<p class="mt-8"><strong><a href="https://rift.metamachina.io" target="_blank" rel="noopener noreferrer">Play Now</a></strong> | <strong><a href="https://discord.gg/dNcvNkc33C" target="_blank" rel="noopener noreferrer">Discord</a></strong> | <strong><a href="https://x.com/MetaMachina_RW" target="_blank" rel="noopener noreferrer">@MetaMachina_RW</a></strong></p>`,
  },
  {
    slug: 'beta-chaos-mode',
    title: 'Beta Chaos Mode — Activated',
    date: '2026-04-09',
    image: '/art/news/chaos-mode-beta.png',
    summary: 'We just gave every player everything. Level 50. 99,999 M-Credz. Full skill trees. God Tier packs. This isn\'t generosity — it\'s a stress test. Break the game before we go onchain.',
    content: `<p class="text-mm-text2 italic mb-6">We just gave every player in the game everything.</p>

<p>Level 50. 99,999 M-Credz. Full skill trees. Free respec. The shop — wide open. God Tier packs. Legendary packs. Every card in the game is now accessible to every player who signs up.</p>
<p>This isn't generosity. This is a stress test.</p>

<h2>Why We're Doing This</h2>
<p>In the last three days, 8 server deployments went out. A full prediction market with 9 binary outcomes per match. A sticker economy. A complete rankings overhaul with clickable Rifter ID cards. Cloudflare Turnstile CAPTCHA on all sign-ins. 7 security fixes. A privacy scrub that removed every real name from the database.</p>
<p>The goal isn't to stay in beta. The goal is to take this onchain.</p>
<p>Rift Wars is heading onchain as fast as possible. Real ownership. Real tournaments. Real stakes. But before we go live with real value on the line, we need to know what breaks. What's exploitable. Which card combinations warp the meta beyond recovery.</p>
<p>The only way to find out is to remove every gate and let players run wild.</p>

<h2>The State of the Rift</h2>
<p>The leaderboard is live and it's already competitive. Human players, bot opponents across 6 difficulty tiers, and an autonomous AI agent — all climbing the same ranked ladder.</p>
<p>Right now, 3 ELO points separate the top 3. An AI agent is sitting at #2 with the best win rate on the board.</p>
<p>Over 50 players are already in the Rift. The top 100 on the leaderboard when we launch onchain will earn. Not "earn tokens for clicking buttons" — earn because they competed, climbed, and proved they belong on the ladder.</p>

<h2>What You Get — Right Now</h2>
<p>Every account — new or existing — is fully loaded:</p>
<ul>
<li><strong>Level 50</strong> — Maximum rank, no grinding required</li>
<li><strong>99,999 M-Credz</strong> — Buy anything in the shop</li>
<li><strong>Full Skill Trees</strong> — All four schools unlocked (Kazen, Iwakami, Seika, Mizu)</li>
<li><strong>Free Respec</strong> — Rebuild your skills as many times as you want</li>
<li><strong>Free Kamon Changes</strong> — Switch your clan emblem at will</li>
<li><strong>Shop Wide Open</strong> — God Tier packs, Legendary packs, everything available</li>
<li><strong>Deck Builder</strong> — Build custom decks with the most powerful cards in the game</li>
</ul>
<p>This is the sandbox. There are no restrictions. Build the most broken deck you can imagine and take it into ranked.</p>

<h2>We Want You to Break It</h2>
<p>This isn't a polite beta where we ask you to fill out a survey. This is a controlled demolition.</p>
<p>Find a card combo that wins every match? Use it. Abuse it. Climb the ladder with it. Then tell us about it — because that combo is getting balanced before we go onchain.</p>
<p>Find a school build that makes one strategy unbeatable? Stack it. Run it 50 times. Show us the win rate. That data is more valuable than any QA team.</p>
<p>Discover a bug that gives you free resources, crashes a match, or lets you queue with an illegal deck? Report it. Every exploit found in beta is an exploit that won't exist when real value is on the line.</p>
<p>The prediction markets are live too. Spectators can wager Meta Crystals on match outcomes — 9 different markets per game, LMSR-priced, auto-settled. Bet. Lose. Win. Find the edge cases.</p>

<h2>What's Coming</h2>
<p><strong>Phase 1 — Chaos Mode (Now)</strong><br/>Unrestricted beta. Everyone gets everything. Find what breaks.</p>
<p><strong>Phase 2 — Balance Pass</strong><br/>Every exploit, every broken combo, every data point from Chaos Mode feeds into a rebalance. Cards get adjusted. Skill trees get tuned. The meta gets shaped by what players actually did — not what was theorized in a design doc.</p>
<p><strong>Phase 3 — Onchain Launch</strong><br/>Rift Wars goes onchain. Tournament system. Leaderboard rewards. Real stakes. The players who tested, broke, and helped fix the game will be the ones best positioned to compete.</p>
<p>The top 100 on the leaderboard at launch earn. Climb now, or start from behind.</p>

<h2>Join the Chaos</h2>
<p>Sign up. Build a deck. Break something.</p>
<p>The leaderboard is live. The shop is open. The prediction markets are running. Every tool in the game is available right now, for free, with no grinding and no gates.</p>
<p>This is your beta. Do your worst.</p>
<p class="mt-6"><a href="https://rift.metamachina.io" class="btn-primary">Play Now</a></p>`,
  },
  {
    slug: 'patch-april-7-2026',
    title: 'The Social Update — Patch Notes April 7, 2026',
    date: '2026-04-07',
    summary: 'The biggest week since launch. Full spectator prediction market with 9 wagering categories, Meta Crystal economy, sticker shop, Shinpodo combo overhaul, rankings redesign with Rifter ID cards, clan discovery, 7 security hardening passes, and a complete mobile rework. 8 server deploys. One developer.',
    image: '/art/environments/weapon-shop-02.webp',
    content: `<p class="text-mm-text2 italic mb-6">8 server deployments. A full spectator economy. 9 prediction markets. 7 security fixes. One week. One developer.</p>

<h2>Spectator Prediction Market</h2>
<p>This is the big one. Every live match in Rift Wars is now a spectator event with a full prediction economy built on top of it.</p>
<p>When you spectate a match, you get access to <strong>9 binary prediction markets</strong> — each one a real-time wager on a different match outcome:</p>
<ul>
<li><strong>Match Winner</strong> — Who takes the game</li>
<li><strong>First Blood</strong> — Which player scores the first kill</li>
<li><strong>Center Control</strong> — Who claims the center tile first</li>
<li><strong>P1/P2 Score Parity</strong> — Will their final score be even or odd</li>
<li><strong>P1/P2 Wins 3+ Rows</strong> — Row domination prediction</li>
<li><strong>No Kills</strong> — Will the match end without a single death</li>
<li><strong>Shinpodo Trigger</strong> — Will Shinpodo Mode activate</li>
</ul>
<p>Markets use a <strong>Logarithmic Market Scoring Rule (LMSR) AMM</strong> for dynamic pricing — odds shift in real time as more spectators pile in. Wagers range from 100 to 5,000 Meta Crystals, with a 3% trade fee. Markets settle automatically at game end based on actual results. Unresolvable markets get voided and refunded.</p>
<p>This isn't a toy feature. It's a fully functional prediction market running on every single match — including bot exhibition games that run 24/7.</p>

<h2>Meta Crystals & Spectator Economy</h2>
<p>Meta Crystals (⧫) are the spectator-side currency that powers the entire engagement layer:</p>
<ul>
<li><strong>Starting Balance</strong> — Every player starts with 100,000⧫</li>
<li><strong>Earn More</strong> — Win prediction markets, get hype refunds, or convert M-Credz 1:1</li>
<li><strong>Spend On</strong> — Market wagers, hype actions, sticker purchases, sticker drops</li>
</ul>
<p>Every transaction is atomic with non-negative balance checks. Full audit trail in the ledger. No exploits, no double-spends.</p>

<h3>Hype Actions</h3>
<p>Spectators can spend Meta Crystals to support either player during a live match:</p>
<ul>
<li><strong>Emojis</strong> (5⧫) — Fire, Skull, Crown, Lightning, Bullseye, Diamond</li>
<li><strong>Reactions</strong> (5⧫) — GG, NICE, RIP, WOW</li>
<li><strong>Shoutouts</strong> (5-50⧫) — Small, medium, and large chat messages visible to everyone watching</li>
<li><strong>Sticker Drops</strong> (25⧫) — Drop your equipped stickers in the spectator feed</li>
</ul>
<p>Every hype action gives the supported player +1 Fame. And if the player you hyped wins, <strong>you get 50% of your spend refunded</strong>. Backing a winner literally pays off.</p>

<h2>Sticker Shop & Equip System</h2>
<p>The <strong>Doonk Collection</strong> is live — 12 unique stickers available for purchase:</p>
<ul>
<li>Doonk AYE!!, Doonk Bits I-III, Doonk Cry, Doonk GG, Doonk LOL, Doonk MAD, Doonk OMG, Doonk Pause, Doonk YUM, Doonk Zzzz</li>
<li><strong>50⧫ per sticker</strong> — Buy once, own forever</li>
<li><strong>Equip up to 4</strong> — Your equipped stickers are available to drop during any match you spectate</li>
<li><strong>25⧫ per drop</strong> — Stickers appear in the live spectator feed for everyone watching</li>
</ul>

<h2>Shinpodo Combo Overhaul</h2>
<p>Shinpodo Mode is supposed to feel like a power trip — you dominated the board, now unleash hell. But the old timer was a buzzkill. You had 15 seconds total, and death animations alone ate 3-4 seconds per kill. Most players could only squeeze in 2-3 placements before time expired.</p>
<p><strong>Fixed.</strong> The timer now resets to 15 seconds every time you place a card. Chain as many placements as you can — the timer only ends your run if you go AFK for 15 seconds. Shinpodo combos are finally as devastating as they should be.</p>

<h2>Rankings Redesign</h2>
<p>The leaderboard went from a plain text table to a proper showcase of the Rift's best players.</p>
<ul>
<li><strong>Hero Portraits</strong> — Every player on the rankings now shows their hero portrait. The leaderboard finally looks like a roster, not a spreadsheet.</li>
<li><strong>Clickable Rifter IDs</strong> — Click any player name to pull up their full Rifter ID card — stats, badges, school, win rate, portrait, and a direct spar challenge button. Scope out the competition before you queue.</li>
<li><strong>High Score & Best Row</strong> — Two new columns track your highest match total and your best single-row score across all games. Bragging rights on the board. Also doubles as our cheater detection layer.</li>
<li><strong>Visual Refresh</strong> — The old Courier New terminal font is gone. Rankings now match the game's Orbitron/Rajdhani styling. Cleaner, bolder, consistent.</li>
</ul>

<h2>Clan Discovery</h2>
<p>Finding and joining clans just got a lot better. Click any clan in search or discovery to open a full clan card:</p>
<ul>
<li>Clan logo, name (with custom font), tag, and level</li>
<li>Full stats — wins, losses, average ELO, member count</li>
<li>Clan description and a preview of the first 10 members</li>
<li><strong>One-click Join or Request</strong> — based on the clan's recruitment settings (open, request-only, or closed)</li>
</ul>
<p>No more guessing which clan to join. Browse, compare, and commit.</p>

<h2>Spar Toggle</h2>
<p>Sometimes you just want to grind in peace. A new toggle in your Rifter ID settings lets you disable incoming spar invites. Sits right below the spectator toggle. When it's off, challengers get a clean message that you're not accepting spars. Turn it back on when you're ready to throw down.</p>

<h2>Custom Hero Portraits</h2>
<p>The portrait vault system is live. Unique 1024x1024 art pieces that live in your vault and can be equipped as your hero portrait. The first custom portraits have already been granted to community members. This is the foundation for future cosmetic rewards, tournament prizes, and exclusive drops.</p>

<h2>Mobile Landscape — Complete Rework</h2>
<p>If you play on your phone, this is a big one. Both the gameplay view and spectator view have been completely rebuilt for landscape orientation:</p>
<ul>
<li><strong>Gameplay</strong> — Sidebar, board, hand, card preview, and hero panels all repositioned and sized for phone viewports. Nothing is hidden — same full UI, just fitted to your screen.</li>
<li><strong>Spectator</strong> — Hero panels, prediction buttons, win probability display, sticker panels, chat bar, and market bar all rebuilt for compact landscape layout.</li>
<li><strong>Notch Support</strong> — Safe-area insets for iPhones and modern Android devices. No more UI getting swallowed by the notch.</li>
<li><strong>Rotate Screen Hint</strong> — Portrait mode now shows a "Best experience on desktop" hint with a gold pulse animation.</li>
</ul>

<h2>Security Hardening — 7 Fixes</h2>
<p>We ran a comprehensive internal security audit (64 findings documented) and shipped fixes for all critical and high-priority items this week:</p>
<ul>
<li><strong>Self-Prediction Blocked</strong> — You can no longer bet on your own matches</li>
<li><strong>Timing-Safe Admin Auth</strong> — Constant-time comparison prevents timing attacks on admin endpoints</li>
<li><strong>Atomic Purchases</strong> — Sticker shop buys are now atomic with balance floor guards. No more race conditions.</li>
<li><strong>School Validation</strong> — Skill node unlocks are verified against your actual school. No cross-school exploits.</li>
<li><strong>Daily Reward & Prediction Guards</strong> — Atomic database checks prevent double-claiming and cap bypasses</li>
<li><strong>Balance Constraints</strong> — Database-level CHECK constraints make negative balances impossible</li>
</ul>
<p>Security isn't glamorous, but it's the difference between a real game and a house of cards. We take it seriously.</p>

<h2>Quality of Life</h2>
<ul>
<li><strong>Bot Names Cleaned Up</strong> — "[AI AGENT]" tags shortened to "[AI]" across all 30 bot accounts for cleaner display</li>
<li><strong>"RANKED MATCH" Button</strong> — The old "START MATCH" button now says what it means</li>
<li><strong>Portrait Rendering Fix</strong> — Fixed art bleeding through portrait borders across the entire game. Every portrait frame now clips cleanly.</li>
<li><strong>Bot Portraits</strong> — AI Agents now have proper hero portraits. No more blank avatars.</li>
<li><strong>Friendly Spar Banner</strong> — Repositioned to bottom-right, smaller and transparent on mobile so it doesn't block gameplay</li>
</ul>

<h2>Under the Hood</h2>
<ul>
<li>8 server deployments (task definitions 30 through 37) — continuous delivery, zero extended downtime</li>
<li>3 database migrations — score tracking columns, spar toggle, balance constraints, payment references</li>
<li>ESM module compatibility fix across the server (no more CommonJS crashes in production)</li>
<li>Shared PlayerCardModal component extracted for consistent Rifter ID cards across Friends and Rankings</li>
<li>Portrait resolver overhauled — 13 call sites updated to use the new unified <code>getPortraitArt()</code> system</li>
<li>Landing page portrait rendering updated for vault portrait support</li>
</ul>

<h2>What's Next</h2>
<p>The graveyard expansion is designed and ready — card retrieval mechanics that will add a new strategic layer to every match. More balance tuning, visual polish, and features are in the pipeline. We ship fast and we ship often.</p>
<p>Found a bug? Want a feature? Jump into <a href="https://discord.gg/dNcvNkc33C" target="_blank" rel="noopener noreferrer">Discord</a> — your feedback directly shapes what we build next.</p>

<h3>Links</h3>
<ul>
<li><a href="https://rift.metamachina.io" target="_blank" rel="noopener noreferrer">Play Rift Wars — Free</a></li>
<li><a href="https://discord.gg/dNcvNkc33C" target="_blank" rel="noopener noreferrer">Join the Discord</a></li>
<li><a href="https://x.com/MetaMachina_RW" target="_blank" rel="noopener noreferrer">Follow @MetaMachina_RW</a></li>
</ul>`,
  },
  {
    slug: 'game-first-chain-second',
    title: 'Game First, Chain Second',
    date: '2026-04-14',
    summary: 'The Rift Wars Papers, Part II: "Support real builders" isn\'t enough. Everyone says that. It\'s a bumper sticker, not a blueprint. Here\'s what building right actually looks like.',
    image: '/art/news/signal-broadcast-game-first-chain-second.png',
    content: `<p class="text-mm-text2 italic mb-6">The Rift Wars Papers, Part II: The Framework</p>
<p class="text-mm-text2 italic mb-8">By <a href="https://x.com/1DigitalC" target="_blank" rel="noopener noreferrer">1DigitalC</a>, Solo Dev, <a href="https://riftwars.metamachina.io" target="_blank" rel="noopener noreferrer">Rift Wars</a> / Meta Machina</p>

<p>In our last article, we laid out <a href="/news/why-web3-gaming-failed">why web3 gaming failed</a>. The data, the pattern, the culture that enabled it. 93% of projects dead. $7.4 billion in VC money burned. Four-month average lifespan. If you haven't read it, start there.</p>
<p>This one is about what comes after.</p>
<p>Because "support real builders" isn't enough. Everyone says that. It's a bumper sticker, not a blueprint. The space doesn't need more cheerleading. It needs specifics. What does building right actually look like? What separates a game that lasts from a game that dies the moment the token drops?</p>
<p>I've spent the last year building Meta Machina FPS solo. No VC money. No token. No Fiverr team. Just the work. And through that process, I've arrived at a set of principles that I think the space needs to hear. Not because I have all the answers, but because almost nobody is even asking the right questions.</p>

<h2>Build the Game Before You Build the Economy</h2>
<p>This should be obvious. It isn't. Because most teams aren't building games. They're building exits.</p>
<p>The overwhelming majority of web3 games launched their token before their gameplay was ready. Some launched tokens before a game existed at all. And then everyone acted surprised when players treated it like a financial instrument instead of entertainment.</p>
<p>If the economy is the first thing you build, it becomes the only thing players care about. And the moment that economy stops being profitable, and it always does, they leave. Not because the game got worse. Because the game was never the point.</p>
<p>Build something people want to play without a financial incentive. Then layer in the economy. Not the other way around. The economy should enhance a loop that already works, not <em>be</em> the loop.</p>
<p>The things that kept people playing Counter-Strike for 25 years or Magic: The Gathering for 30 weren't tokens. They were strategy. Competition. Mastery. Community. If your game can't retain players when the token is worth zero, you don't have a game. You have a countdown timer.</p>

<h2>Reward Participation, Not Purchasing Power</h2>
<p>Here's where most web3 games reveal what they actually are.</p>
<p>If the primary way to progress in your game is spending money, you haven't built a game. You've built an extraction system aimed at whales. And the data shows exactly where that leads: a small group of high-spenders propping up metrics while everyone else quietly leaves.</p>
<p>Reward players for playing. For competing. For improving. For contributing to the community. Not for having the deepest pockets. The moment you build a system where spending more money directly translates to winning more games, you've built a casino with extra steps. And you've told every skilled player that their time doesn't matter.</p>
<p>Incentives should be tied to participation, not purchasing power. That's not idealism. That's retention math. The players who stay longest are the ones who feel like their investment of <em>time</em> is respected, not just their investment of money.</p>

<h2>Design Systems That Can't Be Whaled</h2>
<p>If one person can spend $10,000 and dominate everyone in the lobby, your game is dead on arrival. You just haven't realized it yet.</p>
<p>Whales might fund your first month. They might make your revenue chart look impressive in a pitch deck. But they destroy retention for everyone else. And once the non-whales leave, and they will, the whales leave too. Because there's nobody left to beat.</p>
<p>This is the part most web3 game designers refuse to confront: the short-term revenue from whale-friendly mechanics directly kills the long-term health of the game. Every dollar a whale spends to win is a player you lose who was never going to spend that much.</p>
<p>Design systems where skill and strategy matter more than wallet size. Build balance that prevents any single card, item, or asset from being an auto-win regardless of rarity. If a player can stack all legendaries in a deck and dominate, your balance is broken and your game has a shelf life measured in weeks.</p>

<h2>Make It Accessible. Actually Accessible.</h2>
<p>If your web3 game costs $500 to play, why the hell would anyone join?</p>
<p>Traditional gamers already complain about $60 titles, and those come with full campaigns, multiplayer, years of updates. Now you want someone to buy a several-hundred-dollar NFT just to <em>experience</em> your game? Before they even know if they like it?</p>
<p>And it's not just western markets you're pricing out. You're locking out entire regions of the world. Players in Southeast Asia, South America, Africa, many of the same communities that drove the early play-to-earn boom, can't afford to spend $100 on a browser game. You've taken the one audience that was genuinely excited about web3 gaming and put a velvet rope in front of them.</p>
<p>Free-to-play isn't charity. It's the only entry point that makes sense if you actually want people to play. Lower the barrier. Let people in. A player who joins for free and stays for six months is worth infinitely more than a whale who spends $500 and leaves in two weeks.</p>

<h2>Blockchain Should Be Infrastructure, Not a Gate</h2>
<p>The first question a player asks should be "is this fun?" Not "which chain is this on?" Not "do I need a wallet?"</p>
<p>If someone needs to set up a crypto wallet, buy tokens on an exchange, bridge to the right chain, and connect to your dApp just to <em>try</em> the game, you've already lost 95% of potential players before they see a loading screen. That's not an exaggeration. <a href="https://playtoearndiary.com/survey-reveals-gamers-dont-get-crypto/" target="_blank" rel="noopener noreferrer">Only 12% of non-crypto gamers have ever tried a web3 game</a>, and <a href="https://cointelegraph.com/news/web3-gaming-still-a-long-way-from-mainstream-adoption-survey" target="_blank" rel="noopener noreferrer">only 15% of those who haven't expressed any interest</a>. Every wallet prompt, every chain selection, every bridge transaction is another door you're asking someone to walk through before they even know if they want to be in the building.</p>
<p>The web3 games that are actually surviving right now share one thing in common: they treat blockchain as optional back-end infrastructure. You can play the game without ever touching a wallet. The on-chain elements are there for the players who want them, but they're not a prerequisite. That's not a compromise. That's how you build a player base that isn't limited to the 3% of gamers who already own an NFT.</p>

<h2>The Teams Still Standing</h2>
<p>Here's the reality of building in this space right now.</p>
<p>VCs are pulling back. <a href="https://www.ccn.com/news/crypto/web3-gaming-massive-70-fall-funding-dappradar-report/" target="_blank" rel="noopener noreferrer">Web3 gaming raised just $91 million in Q1 2025</a>, then <a href="https://dappradar.com/blog/state-of-blockchain-gaming-in-q2-2025" target="_blank" rel="noopener noreferrer">$73 million in Q2 2025</a>, a 93% year-over-year collapse. The <a href="https://www.coingecko.com/en/categories/gaming" target="_blank" rel="noopener noreferrer">total GameFi market cap</a> has cratered from $23.87 billion at the end of 2024 to $4.27 billion in April 2026. An 82% wipeout in sixteen months. The money isn't just drying up. It's evaporating.</p>
<p>Web2 gamers don't trust the space. Web3 degens only care about the token. Developers don't want to be associated with the label. <a href="https://www.pcgamer.com/gaming-industry/for-the-first-time-in-years-there-are-no-blockchain-gaming-talks-at-gdc/" target="_blank" rel="noopener noreferrer">for the first time in years, GDC 2026 had zero blockchain gaming sessions on the schedule</a>. The booths are gone. AI companies replaced them. Platforms ban you. The press writes you off.</p>
<p>And yet, some teams are still building. Still shipping updates. Still trying to prove that blockchain can enhance gaming without replacing it. Those teams deserve your attention more than any new whitepaper, any new mint, any new "revolutionary ecosystem" announcement.</p>
<p>Every time the community ignores a real game to chase a meme token, it proves the critics right. And every time someone plays a web3 game because it's actually fun, not because they're farming an airdrop, it proves something different.</p>

<h2>"So Why Is a Game Studio Publishing This?"</h2>
<p>Yeah, this is coming from a game studio. Rift Wars is a card game. Meta Machina is the studio behind it. We have skin in this space. That's exactly why we're saying it.</p>
<p>We're not pretending this isn't marketing. Of course it is. Every time a builder opens their mouth in public, it's marketing. The difference is whether you're marketing hype or marketing a position. We're choosing the position.</p>
<p>Rift Wars isn't trying to be just another web3 game. Meta Machina is striving to be a digital culture. And to build a culture, you have to accept the truth about the world you're operating in. You have to study the past. You have to make sure your community understands not just the game they're playing, but the space they're entering.</p>
<p>We're not going to pretend everything is fine. We're not going to tell you web3 gaming is thriving when 93% of projects are dead and the <a href="https://www.coingecko.com/en/categories/gaming" target="_blank" rel="noopener noreferrer">market cap has lost 82% of its value in sixteen months</a>, from $23.87 billion to $4.27 billion. We're not going to hype a token when the data says tokens kill games. That's not how you build trust, and it's not how you build something that lasts.</p>
<p>Educated players are more intelligent players. Intelligent players are better players. And in a game like Rift Wars, where strategy, deck building, and outsmarting your opponent is everything, that all adds up. We don't want a community that buys in blind. We want players who understand what they're part of, why the space is broken, and what it actually takes to build something worth playing.</p>
<p>If you're a builder in web3 gaming right now, keep going. The space needs you more than it needs another whitepaper.</p>
<p>And if you're a player, stop rewarding the grifters. Find the builders. Play their games. Give them feedback. Be the community that web3 gaming was supposed to have from the start.</p>
<p class="text-mm-gold-primary font-bold text-lg mt-8 mb-8">The next wave of games won't pay you to play. You'll play because you want to.</p>

<p class="text-mm-text2 italic mb-4">This is how I think. This is what I'm building. If that resonates, you'll understand the game.</p>
<p class="text-mm-text2 italic mb-8">Previous: <a href="/news/why-web3-gaming-failed">Why Web3 Gaming Failed (And It's Your Fault)</a><br/>Next: <a href="/news/man-vs-machine">Man vs Machine</a>, Why your bots matter more than your players.</p>

<h3>Sources</h3>
<ul class="list-disc pl-6 space-y-1">
<li><a href="https://chainplay.gg/blog/gamefi-statistics-2025-market-funding-adoption-transparency/" target="_blank" rel="noopener noreferrer">ChainPlay: GameFi Statistics 2025 Annual Report</a></li>
<li><a href="https://www.coingecko.com/en/categories/gaming" target="_blank" rel="noopener noreferrer">CoinGecko: Gaming (GameFi) Market Cap (live, April 2026)</a></li>
<li><a href="https://dappradar.com/blog/state-of-blockchain-gaming-in-q2-2025" target="_blank" rel="noopener noreferrer">DappRadar: State of Blockchain Gaming Q2 2025</a></li>
<li><a href="https://playtoearndiary.com/survey-reveals-gamers-dont-get-crypto/" target="_blank" rel="noopener noreferrer">Gamer Sentiment Survey (n=6,921)</a></li>
<li><a href="https://cointelegraph.com/news/web3-gaming-still-a-long-way-from-mainstream-adoption-survey" target="_blank" rel="noopener noreferrer">Web3 Gaming Adoption Survey, Cointelegraph</a></li>
<li><a href="https://www.ccn.com/news/crypto/web3-gaming-massive-70-fall-funding-dappradar-report/" target="_blank" rel="noopener noreferrer">Web3 Gaming Funding Collapse Q1-Q2 2025, CCN</a></li>
<li><a href="https://www.pcgamer.com/gaming-industry/for-the-first-time-in-years-there-are-no-blockchain-gaming-talks-at-gdc/" target="_blank" rel="noopener noreferrer">GDC 2026: Zero Blockchain Gaming Sessions, PC Gamer</a></li>
</ul>

<ul class="list-none mt-8 space-y-1">
<li><a href="https://riftwars.metamachina.io" target="_blank" rel="noopener noreferrer">Rift Wars</a> | <a href="https://x.com/MetaMachina_RW" target="_blank" rel="noopener noreferrer">@MetaMachina_RW</a> | <a href="https://discord.gg/dNcvNkc33C" target="_blank" rel="noopener noreferrer">Discord</a></li>
</ul>`,
  },
  {
    slug: 'why-web3-gaming-failed',
    title: 'Why Web3 Gaming Failed (And It\'s Your Fault)',
    date: '2026-04-07',
    summary: 'The Rift Wars Papers — Part I: 93% of GameFi projects are dead, $7.4 billion in VC money evaporated, and the people screaming loudest about saving web3 gaming are the ones who killed it. Here\'s the diagnosis.',
    image: '/art/news/signal-broadcast-why-web3-gaming-failed.png',
    content: `<p class="text-mm-text2 italic mb-6">The Rift Wars Papers — Part I: The Diagnosis</p>
<p class="text-mm-text2 italic mb-8">By Patrick — Solo Dev, <a href="https://riftwars.metamachina.io" target="_blank" rel="noopener noreferrer">Rift Wars</a> / Meta Machina</p>

<p>Let me save you the suspense: web3 gaming is in a coma, and the people screaming loudest about saving it are the same ones who put it there.</p>

<p>I've been in blockchain since 2016. I've been gaming since before most of you were born — Guild Wars, EverQuest, EVE Online, Conquer Online, Phantasy Star Online on the Dreamcast. I've run top guilds. I've seen what makes games last a decade and what makes them die in a week. And I'm telling you right now — web3 gaming didn't fail because the tech is bad. It failed because everyone involved chose money over gameplay, and then acted surprised when the house of cards collapsed.</p>

<p>I've got receipts. Let's go.</p>

<h2>The Fatal Flaw: Economy First, Game Never</h2>

<p>Here's where it all went sideways. The vast majority of web3 games launched the same way: token first, game second. Sometimes game never.</p>

<p>The playbook was always the same. Raise money on a token. Hype the whitepaper. Hire some developers off Fiverr. Push out something that barely qualifies as a game. Cash out. Wipe your hands. Move on to the next one.</p>

<p>And the numbers prove it. <a href="https://chainplay.gg/blog/gamefi-statistics-2025-market-funding-adoption-transparency/" target="_blank" rel="noopener noreferrer">ChainPlay's 2025 annual report</a> confirmed what we already knew: <strong>93% of GameFi projects are dead</strong> — token price down 90%+ from all-time high with fewer than 100 daily active users. A <a href="https://www.coingecko.com/research/publications/how-many-gamefi-dead" target="_blank" rel="noopener noreferrer">separate CoinGecko study</a> using stricter criteria still puts the number at <strong>75% — three out of four projects, gone.</strong> The average GameFi project lifespan? <strong>Four months.</strong> Not four years. Four months.</p>

<p>Let that sink in. The entire "industry" was running on a four-month life expectancy. That's not game development. That's a pump and dump with a loading screen.</p>

<p><a href="https://cointelegraph.com/news/three-quarters-web3-blockchain-games-failed-last-five-years-coingecko" target="_blank" rel="noopener noreferrer">CoinGecko analyzed 2,817 web3 games</a> launched between 2018 and 2023. In 2022 alone, 742 games collapsed — a failure rate of 107%, meaning more projects died that year than were even launched. Games from previous years were still falling apart.</p>

<p>And these weren't underfunded experiments. From 2020 to 2022, <a href="https://investgame.net/news/web3-gaming-investments-in-2020-2024/" target="_blank" rel="noopener noreferrer">VCs poured over $7.4 billion into web3 gaming</a>. Billions. Where did it go? Into tokens that lost <a href="https://chainplay.gg/blog/gamefi-statistics-2025-market-funding-adoption-transparency/" target="_blank" rel="noopener noreferrer">95% of their value on average</a>. Into games that never shipped. Into teams that dissolved the moment the bear market hit.</p>

<p>And it's still getting worse. The <a href="https://gamesbeat.com/blockchain-gamings-market-value-plunged-67-in-2025-chainplay/" target="_blank" rel="noopener noreferrer">total GameFi market cap collapsed 67% in 2025</a> — from $23.87 billion down to $7.8 billion. VC funding dropped to <a href="https://chainplay.gg/blog/gamefi-statistics-2025-market-funding-adoption-transparency/" target="_blank" rel="noopener noreferrer">$544 million in 2025</a>, down from $857 million the year before. <a href="https://chainplay.gg/blog/gamefi-statistics-2025-market-funding-adoption-transparency/" target="_blank" rel="noopener noreferrer">89% of investors reported declining profits</a>. 62% lost more than half their returns.</p>

<p>The money is leaving because the results were never there.</p>

<h2>The Pattern: A Story Told a Thousand Times</h2>

<p>I'm not here to drag specific projects. You already know their names. But let's look at the pattern because it played out the same way everywhere.</p>

<p>A play-to-earn game launches a token. It promises the world — "next-gen" this, "revolutionary" that. At peak hype, <a href="https://heybeluga.com/articles/why-axie-infinity-failed/" target="_blank" rel="noopener noreferrer">millions of daily active users flood in</a>, some titles generating <a href="https://nairametrics.com/2021/09/06/axie-infinity-generates-364-million-in-august-highest-revenue-since-inception/" target="_blank" rel="noopener noreferrer">hundreds of millions in monthly revenue</a>. Then the token drops. Players leave overnight — <a href="https://www.todaynftnews.com/axie-infinity-player-count-is-down-by-74/" target="_blank" rel="noopener noreferrer">over a million gone in a single month</a> in some cases. Within a year, user counts crater 55-75%. The token loses 99% of its value. The "revolution" lasted about 12 months.</p>

<p>Or a team raises tens of millions and promises a AAA-quality MMO. Token peaks at launch and <a href="https://coinmarketcap.com/currencies/star-atlas/" target="_blank" rel="noopener noreferrer">drops 99%+</a>. Years later, key features are still in demo stage. Some of these projects are genuinely still building — and respect to the ones that are — but the token holders who bought the hype have been underwater for years, and the game they were promised still isn't the game that exists.</p>

<p>Or a project raises $65 million across multiple funding rounds and takes years to reach open beta — burning through runway while token holders watch their investment evaporate. Sixty-five million dollars and counting.</p>

<p>And those are the <em>big</em> ones — the ones with real teams and real money behind them. For every one of those, there were a hundred nameless farming simulators with missing pixels and seven vegetables to plant. Going on nine months planting the same carrots in the same spot — that was someone's "game." That was someone's "investment."</p>

<p>I don't even think it's gaming anymore at that point. It's wash trading and money laundering wearing a game's skin.</p>

<h2>The Culture That Killed It</h2>

<p>The culture problem is just as bad as the tech problem.</p>

<p>An <a href="https://cointelegraph.com/news/analyst-says-40-of-users-in-most-web3-games-are-bots-here-s-how-to-avoid-being-fooled" target="_blank" rel="noopener noreferrer">analysis of 60+ web3 games</a> found that <strong>40% of users in most web3 games are bots</strong>. One project had <strong>84% bot users</strong>. Those "impressive" daily active wallet numbers? A massive chunk of them aren't human beings. They're automated wallets farming airdrops and inflating metrics. Even now, <a href="https://dappradar.com/blog/state-of-blockchain-gaming-q3-2025" target="_blank" rel="noopener noreferrer">DappRadar reports 4.66 million daily active wallets</a> in Q3 2025 — a number that's been essentially flat year-over-year while the overall market shrinks around it. How many of those wallets are real people playing a game they enjoy? Nobody can tell you.</p>

<p>On crypto Twitter, it's worse. <a href="https://blockworks.com/news/crypto-twitter-bots-returns" target="_blank" rel="noopener noreferrer">Research from Blockworks</a> showed that cryptos with bot-inflated engagement on Twitter actually yielded <em>lower</em> returns — the bots pump visibility, but real users aren't behind the numbers. The whole engagement layer is theater.</p>

<p>Meanwhile, web2 gamers — the actual market you need to win — want nothing to do with any of this. A <a href="https://playtoearndiary.com/survey-reveals-gamers-dont-get-crypto/" target="_blank" rel="noopener noreferrer">survey of nearly 7,000 gamers</a> rated their feelings toward crypto at <strong>4.5 out of 10</strong> and NFTs at <strong>4.3 out of 10</strong>. <a href="https://nftevening.com/only-3-percent-of-gamers-own-an-nft-by-g4al/" target="_blank" rel="noopener noreferrer">Only 3% of gamers own an NFT</a>. Only 12% had even tried a web3 game. As of late 2025, overall sentiment toward NFTs in gaming is described as <a href="https://gam3s.gg/news/gaming-nft-trends-for-october-2025/" target="_blank" rel="noopener noreferrer">"slightly negative, moving toward neutral"</a> — which, after five years and billions of dollars, is a damning progress report.</p>

<p>And you know what? They're right to be skeptical. When <a href="https://www.gamedeveloper.com/marketing/gdc-state-of-the-game-industry-2022-devs-weigh-in-on-nfts-unions-and-more" target="_blank" rel="noopener noreferrer">70% of game developers say they're not interested in crypto</a> and <a href="https://www.gameinformer.com/2022/01/21/new-state-of-the-industry-report-reveals-nearly-75-of-devs-surveyed-arent-interested-in" target="_blank" rel="noopener noreferrer">72% say they're not interested in NFTs</a> — per the Game Developers Conference's own survey of 2,700+ developers — that tells you something. The people who actually <em>build</em> games looked at web3 gaming and said "no thanks."</p>

<p><a href="https://www.pcgamer.com/steam-bans-nfts-cryptocurrencies-blockchain/" target="_blank" rel="noopener noreferrer">Steam banned all blockchain games</a> in October 2021 and that ban is <a href="https://decrypt.co/153196/crypto-nft-games-still-launching-steam-despite-ongoing-ban" target="_blank" rel="noopener noreferrer">still in effect today</a>. The largest PC gaming platform on Earth looked at the space and closed the door. A few web3-adjacent titles have found ways onto Steam by making their blockchain elements entirely optional — but the policy hasn't changed. The message is clear.</p>

<h2>The Accountability Mirror</h2>

<p>Here's the part nobody wants to hear.</p>

<p>If you bought a token for a game that didn't exist yet — <strong>you are the problem.</strong></p>

<p>If you put your life savings into some crypto farming simulator because a Twitter thread told you it was going to 100x — that's on you. If you're nine months deep planting digital carrots in a game with seven assets and you're wondering why the token went to zero — take a look in the mirror.</p>

<p>The audacity of web3 gaming culture is wild. Imagine watching Netflix for 90 minutes and then asking "when do I get paid?" That's what web3 did to gaming. It turned entertainment into an extraction game. People won't even beta test now without an on-chain incentive. You could literally pay people to play web3 games and they won't do it.</p>

<p>And look — most people didn't set out to destroy the space. The system was designed to reward this behavior. Tokenomics incentivized speculation over gameplay. Marketing rewarded hype over substance. If every project around you is launching tokens before games and getting funded for it, of course people followed the pattern. That doesn't make it right, but it explains why it happened at scale.</p>

<p>Crypto was supposed to be about sovereignty. Decentralization. Owning your digital life. Instead, the space got infiltrated during COVID by people who only saw dollar signs. The gold rush attracted the worst kind of builders — the ones who never intended to build anything at all.</p>

<p>And the community enables it. There are a handful of genuinely good web3 games out there right now — games with real studios, real gameplay, real effort behind them. Some have <a href="https://activeplayer.io/off-the-grid/" target="_blank" rel="noopener noreferrer">millions of registered players</a> and still struggle to get meaningful engagement on their social posts. The whole community is lucky those games exist, and they can't even be bothered to support them. But some random meme token game posts a "roadmap" image and gets 500 retweets — 490 of which are bots.</p>

<h2>So Now What?</h2>

<p>That's the diagnosis. The data is clear. The pattern is documented. The culture enabled it. And yes — a lot of us were complicit, whether we built the wrong thing, funded the wrong thing, or just looked the other way.</p>

<p>The question is what "building right" actually looks like — because "make a better game" isn't specific enough. The space needs a real framework, not another motivational thread.</p>

<p>That's what we're breaking down next.</p>

<p><strong>If it's not fun without the money, it was never a game.</strong></p>

<p class="text-mm-text2 italic mt-8">This is how I think. This is what I'm building. If that resonates, you'll understand the game.</p>

<p class="mt-4"><a href="https://riftwars.metamachina.io" target="_blank" rel="noopener noreferrer">Rift Wars</a> | <a href="https://x.com/MetaMachina_RW" target="_blank" rel="noopener noreferrer">@MetaMachina_RW</a> | <a href="https://discord.gg/dNcvNkc33C" target="_blank" rel="noopener noreferrer">Discord</a></p>

<h3 class="mt-8">Sources</h3>
<ol class="text-sm text-mm-text2 space-y-1">
<li><a href="https://chainplay.gg/blog/gamefi-statistics-2025-market-funding-adoption-transparency/" target="_blank" rel="noopener noreferrer">ChainPlay — GameFi Statistics 2025 Annual Report</a></li>
<li><a href="https://www.coingecko.com/research/publications/how-many-gamefi-dead" target="_blank" rel="noopener noreferrer">CoinGecko — "Is GameFi Dead? 3 in 4 Projects Have Failed"</a></li>
<li><a href="https://gamesbeat.com/blockchain-gamings-market-value-plunged-67-in-2025-chainplay/" target="_blank" rel="noopener noreferrer">GamesBeat — "Blockchain Gaming Market Value Plunged 67% in 2025"</a></li>
<li><a href="https://cointelegraph.com/news/three-quarters-web3-blockchain-games-failed-last-five-years-coingecko" target="_blank" rel="noopener noreferrer">CoinGecko — Web3 Game Failure Analysis (2,817 games)</a></li>
<li><a href="https://investgame.net/news/web3-gaming-investments-in-2020-2024/" target="_blank" rel="noopener noreferrer">InvestGame — Web3 Gaming Investments 2020-2024</a></li>
<li><a href="https://dappradar.com/blog/state-of-blockchain-gaming-q3-2025" target="_blank" rel="noopener noreferrer">DappRadar — State of Blockchain Gaming Q3 2025</a></li>
<li><a href="https://heybeluga.com/articles/why-axie-infinity-failed/" target="_blank" rel="noopener noreferrer">Play-to-Earn Player Collapse Data</a></li>
<li><a href="https://nairametrics.com/2021/09/06/axie-infinity-generates-364-million-in-august-highest-revenue-since-inception/" target="_blank" rel="noopener noreferrer">Peak P2E Monthly Revenue</a></li>
<li><a href="https://coinmarketcap.com/currencies/star-atlas/" target="_blank" rel="noopener noreferrer">Token Price Collapse — 99%+ Decline Pattern</a></li>
<li><a href="https://cointelegraph.com/news/analyst-says-40-of-users-in-most-web3-games-are-bots-here-s-how-to-avoid-being-fooled" target="_blank" rel="noopener noreferrer">Web3 Game Bots — 40% of Users</a></li>
<li><a href="https://blockworks.com/news/crypto-twitter-bots-returns" target="_blank" rel="noopener noreferrer">Crypto Twitter Bot Impact on Returns</a></li>
<li><a href="https://playtoearndiary.com/survey-reveals-gamers-dont-get-crypto/" target="_blank" rel="noopener noreferrer">Gamer Sentiment Survey (n=6,921)</a></li>
<li><a href="https://nftevening.com/only-3-percent-of-gamers-own-an-nft-by-g4al/" target="_blank" rel="noopener noreferrer">Only 3% of Gamers Own an NFT</a></li>
<li><a href="https://gam3s.gg/news/gaming-nft-trends-for-october-2025/" target="_blank" rel="noopener noreferrer">NFT Gaming Sentiment October 2025</a></li>
<li><a href="https://www.gamedeveloper.com/marketing/gdc-state-of-the-game-industry-2022-devs-weigh-in-on-nfts-unions-and-more" target="_blank" rel="noopener noreferrer">GDC Developer Survey — 70% Not Interested in Crypto</a></li>
<li><a href="https://www.pcgamer.com/steam-bans-nfts-cryptocurrencies-blockchain/" target="_blank" rel="noopener noreferrer">Steam Blockchain Game Ban (2021, still active)</a></li>
<li><a href="https://decrypt.co/153196/crypto-nft-games-still-launching-steam-despite-ongoing-ban" target="_blank" rel="noopener noreferrer">Web3 Games Still Launching on Steam Despite Ban</a></li>
</ol>`,
  },
  {
    slug: 'gold-standard-update',
    title: 'The Gold Standard Update — A New Look for Rift Wars',
    date: '2026-04-05',
    summary: 'We\'ve overhauled the visual identity of Rift Wars — the game client and the website have been unified under a bold new gold theme. Here\'s what changed and why.',
    image: '/art/environments/cyberpunk-poster-02.webp',
    content: `<h2>A Fresh Coat of Gold</h2>
<p>If you've visited <a href="https://rift.metamachina.io" target="_blank" rel="noopener noreferrer">Rift Wars</a> or <a href="https://riftwars.metamachina.io" target="_blank" rel="noopener noreferrer">the landing site</a> recently, you'll notice things look different. That's intentional. We've rolled out a major visual update across the board — aligning the game client, the marketing site, and the broader Meta Machina brand under one cohesive identity.</p>

<h3>What Changed</h3>
<ul>
<li><strong>Gold Theme</strong> — The entire color palette has shifted from cyan/blue accents to a rich gold identity. Buttons, highlights, stat numbers, section dividers, and glow effects now carry the signature Meta Machina gold (#F2AD23). This isn't just cosmetic — it's brand alignment across every touchpoint.</li>
<li><strong>Section Backgrounds</strong> — Each section of the landing site now has its own visual texture. Ghosted cyberpunk grid art, subtle drift animations, and alternating charcoal/black tones break up the page and give each section its own atmosphere.</li>
<li><strong>Gold Divider Lines</strong> — Sections are separated by a thin animated gold gradient line, replacing hard visual breaks with something that feels more integrated.</li>
<li><strong>Typography Polish</strong> — Key stats and headings across the site now use gold glow effects, making important information pop without overwhelming the dark aesthetic.</li>
<li><strong>Performance Optimized</strong> — All new background assets are compressed WebP files under 300KB. Animations use CSS-only transforms for smooth 60fps rendering with zero JavaScript overhead.</li>
</ul>

<h3>Why the Overhaul?</h3>
<p>As Rift Wars grows from beta into a full ecosystem — with the card game, the upcoming FPS MMO, AI agent integration, and the M-Credz economy — we needed a visual language that works everywhere. Gold represents the Meta Crystal energy that powers Pangaea III, and it ties together every product under the Meta Machina umbrella.</p>
<p>This is a polish pass, not a pivot. The game mechanics haven't changed. Your cards, your decks, your progress — all exactly where you left them. We're just making the whole experience look and feel more cohesive.</p>

<h3>This is Just the Start</h3>
<p>We're continuing to refine the look of both the game and the website. More visual polish, new sections, and quality-of-life improvements are in the pipeline. We're treating this like a living product — always iterating, always improving.</p>

<h3>We Want Your Feedback</h3>
<p>Like the new look? Hate something? Want to suggest improvements? We're listening. Jump into our <a href="https://discord.gg/dNcvNkc33C" target="_blank" rel="noopener noreferrer">Discord</a> and let us know what you think. Your feedback directly shapes what we build next.</p>

<h3>Links</h3>
<ul>
<li><a href="https://rift.metamachina.io" target="_blank" rel="noopener noreferrer">Play Rift Wars — Free</a></li>
<li><a href="https://discord.gg/dNcvNkc33C" target="_blank" rel="noopener noreferrer">Join the Discord</a></li>
<li><a href="https://x.com/MetaMachina_RW" target="_blank" rel="noopener noreferrer">Follow @MetaMachina_RW</a></li>
</ul>`,
  },
  {
    slug: 'patch-april-5-2026',
    title: 'Patch Notes — April 5, 2026',
    date: '2026-04-05',
    summary: 'Shinpodo School fixes, combo logic improvements, spectator system groundwork, and a visual polish pass across the board.',
    image: '/art/environments/weapon-shop-01.webp',
    content: `<h2>What's New</h2>

<h3>Spectator System (Coming Soon)</h3>
<p>The foundation for live match spectating has been built. When it goes live, you'll be able to:</p>
<ul>
<li><strong>Watch Live Matches</strong> — Browse active games and spectate in real time</li>
<li><strong>Hype Actions</strong> — Send emojis, shoutouts, and reactions that players and other spectators see live</li>
<li><strong>Privacy Toggle</strong> — Control whether others can watch your matches</li>
</ul>
<p>The spectator system is fully implemented on the backend and will be enabled in a future update once testing is complete.</p>

<h3>Bug Fixes</h3>
<ul>
<li><strong>Erosion (Mizu School) Fixed</strong> — The Erosion skill wasn't triggering correctly. It was checking the wrong player context, so the debuff on enemy cards near hidden allies never activated. Fixed — Erosion now properly punishes enemies who place next to your hidden cards on high-crystal tiles.</li>
<li><strong>Shinpodo Combo Breaking</strong> — Fixed a case where Shinpodo Mode could continue even when your newly placed card was immediately destroyed by an enemy's persistent damage zone. The combo now correctly breaks if your card dies on placement.</li>
</ul>

<h3>Visual & UI Polish</h3>
<ul>
<li><strong>Gold Theme Alignment</strong> — Continued refining the gold visual identity across both the game client and the marketing site. More consistent button styles, glow effects, and color accents.</li>
<li><strong>Website Section Backgrounds</strong> — Each section of riftwars.metamachina.io now has its own ghosted cyberpunk grid texture with subtle drift animations, plus gold gradient dividers between sections.</li>
<li><strong>Spectator UI</strong> — Clean new spectator bar showing live watcher count, match info, and hype action panel.</li>
</ul>

<h3>Under the Hood</h3>
<ul>
<li>Audio system improvements for more reliable sound playback across devices.</li>
<li>Performance optimizations on background assets (compressed WebP, CSS-only animations).</li>
</ul>

<h3>What's Next</h3>
<p>We're continuing to polish the game and the website in parallel. More bug fixes, balance tuning, and quality-of-life improvements are in progress. If you run into anything weird, let us know in <a href="https://discord.gg/dNcvNkc33C" target="_blank" rel="noopener noreferrer">Discord</a> — your reports directly shape what we fix next.</p>

<h3>Links</h3>
<ul>
<li><a href="https://rift.metamachina.io" target="_blank" rel="noopener noreferrer">Play Rift Wars — Free</a></li>
<li><a href="https://discord.gg/dNcvNkc33C" target="_blank" rel="noopener noreferrer">Join the Discord</a></li>
<li><a href="https://x.com/MetaMachina_RW" target="_blank" rel="noopener noreferrer">Follow @MetaMachina_RW</a></li>
</ul>`,
  },
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
