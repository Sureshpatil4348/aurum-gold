# AURUM Gold — Website

A refreshed, brand-aligned rebuild of the AURUM Gold landing page, built with **React (Vite)** on the frontend and **Node.js/Express** on the backend.

## Page structure (follows the approved wireframe)

The homepage was rebuilt section-by-section to match the `Aurum_Homepage_Final` wireframe:

1. **Header** — logo, nav links, CTA (`Navbar.jsx`)
2. **Hero** — 6-word headline + 3–4 line copy + CTA + "Strategy of AURUM" button, with a live-animated MyFXBook-style verified report carousel on the right (`Hero.jsx`, `FxbookCarousel.jsx`)
3. **Feature marquee** — dashed-line scrolling strip of AURUM highlights (`Ticker.jsx`)
4. **Stats bar** — profit counter (auto-increments every 30s), traders count, years in business, MyFXBook verified badge/link (`StatsBar.jsx`)
5. **"How AURUM makes you profitable"** — pointer list + tutorial video placeholder, plus a "Get in touch" / "Get Profitable" CTA pair (`ProfitableExplainer.jsx`)
6. **Testimonials carousel** — horizontally scrollable reviews with rating, profit, join date (`Testimonials.jsx`)
7. **Strategy vs. Automation** — two-column panel: verified strategy tabs + equity chart + stat cards on the left, "why automation is mandatory" reasons on the right (`StrategyVsAutomation.jsx`, `StrategyPanel.jsx`, `AutomationPanel.jsx`)
8. **Founder of AURUM** — profile, stats-in-numbers, certifications, "built by a team of experts" (`FounderSection.jsx`)
9. **Steps to get profitable in 5 minutes** — 4-step onboarding with an email-capture CTA ("we'll set it up for you") (`HowItWorks.jsx`)
10. **Pricing** — 3 tiers (`Pricing.jsx`)
11. **FAQ** — accordion (`FAQ.jsx`)
12. **Final CTA duo** — "Get Profitable Now" + "Still confused? Let's connect" (`CTA.jsx`)
13. **Footer** — newsletter, brand/social, link columns, trust badges, risk disclosure (`Footer.jsx`)

A note on the hero background: I don't have access to license stock video footage in this environment, so instead of an embedded video file the hero uses a full `<canvas>` animation (scrolling gold candlesticks, glowing trend line, drifting particles) that behaves like a premium looping video but stays lightweight and needs no asset hosting. Swap in a real `<video>` tag in `Hero.jsx`/`HeroCanvas.jsx` if you'd rather use footage you own the rights to.

The MyFXBook carousel, testimonials, founder bio, and profit/traders numbers are all placeholder content styled to match a verified-performance product — replace the arrays in `client/src/data/content.js` with your real figures before launch.

## Brand palette (as supplied)

| Token | Hex | Usage |
|---|---|---|
| Blue (Navy) | `#16225b` | Primary background / headings on light sections |
| Gold | `#19D05F` | Accent, CTAs, highlights, active states |
| Grey | `#eeeff2` | Light section backgrounds |
| White | `#ffffff` | Text on dark backgrounds, card backgrounds |

All tokens live in `client/src/index.css` under `:root` — change them there to re-theme the whole site.

## Project structure

```
aurum-diamond/
├─ client/            # React + Vite frontend
│  └─ src/
│     ├─ components/  # Navbar, Hero, Ticker, HowItWorks, LiveData, TrustStats, Pricing, FAQ, CTA, Footer
│     └─ data/         content.js — all copy/content in one place
└─ server/            # Express API + static file server for production
   └─ index.js
```

## Running locally

**1. Backend**
```bash
cd server
npm install
npm run dev        # http://localhost:4000
```

**2. Frontend** (in a second terminal)
```bash
cd client
npm install
npm run dev         # http://localhost:5173
```

The Vite dev server proxies `/api/*` calls to the Express server automatically (see `client/vite.config.js`).

## Production build

```bash
cd client && npm install && npm run build
cd ../server && npm install && npm start
```

Express serves the built `client/dist` folder and your API from a single port (`4000` by default).

## Notes

- Reduced-motion is respected (`prefers-reduced-motion`) — the hero animation and transitions turn off automatically for users who request it.
- The ticker strip pulls from `/api/ticker` shape but currently jitters client-side seed data for a live feel; swap `Ticker.jsx`'s local state for a `fetch("/api/ticker")` poll once you have a real price feed.
- All trading figures (Sharpe ratio, drawdown, etc.) are placeholders from the original recording — replace with your verified MyFXBook numbers before launch.
