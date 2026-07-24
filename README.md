# AURUM Gold — Next.js Website

A fully modernized, production-ready reconstruction of the AURUM landing page, built as a unified web application using **Next.js (App Router)**, **React 19**, **Nodemailer** for automated transaction/support emails, **Stripe Checkout** with **Automatic Tax** calculation, and **Zoho Books** for automated client invoicing.

## Page Structure

The application is structured into the following pages:

1. **Home (`/`)** — Main landing page featuring:
   - Header Navigation (`Navbar.jsx`)
   - Hero: 6-word headline, canvas candlestick loop animation, MyFXBook carousel (`Hero.jsx`)
   - Stats Bar: Live counter, traders count, verified badge (`StatsBar.jsx`)
   - Profit Explainer (`ProfitableExplainer.jsx`)
   - Testimonials: Live scrolling user reviews (`Testimonials.jsx`)
   - Strategy vs. Automation panel (`StrategyVsAutomation.jsx`)
   - Founder Section (`FounderSection.jsx`)
   - Steps to Get Started (`HowItWorks.jsx`)
   - Pricing: 3 plans with side-by-side Choose CTA and smooth expandable details (`Pricing.jsx`)
   - FAQ Accordion (`FAQ.jsx`)
   - Footer with trust links & risk disclosure (`Footer.jsx`)
2. **About (`/about`)** — Full brand info, company profile, and core philosophy.
3. **Contact (`/contact`)** — Live contact form connected to SMTP support email endpoint.
4. **FAQ (`/faq`)** — Full standalone accordion-based FAQ.
5. **Pricing (`/pricing`)** — Standalone pricing page.
6. **Results (`/results`)** — Detailed trading performance grids, containing the custom `#1B2360` Navy Blue CTA card ("Buy now start trading") redirecting to plans.
7. **Setup Guide (`/setup-guide`)** — Onboarding and installation instructions.
8. **Thank You / Requirements (`/thank-you`)** — Post-payment secure onboarding form (protected via validation tokens) to collect MT5 details.

---

## Technical Features

### 1. Stripe Automatic Tax Payment Flow
- Uses dynamic Stripe Checkout sessions.
- **No manual country dropdown needed**: Stripe dynamically detects the customer's location at checkout using their billing address.
- Computes correct local tax/VAT automatically based on address info (e.g. 5% VAT for UAE customers).
- Backend session uses `tax_behavior: "exclusive"` and `tax_code: "txcd_10000000"` (SaaS/Electronic Services).

### 2. Zoho Books Invoicing Integration
- Success webhook matches payment data with customer email.
- Automatically searches for or registers the customer in Zoho Books.
- Creates an official Zoho invoice containing base price, tax rate, and records the Stripe transaction.

### 3. Automated Transactional Emails
- Powered by **Nodemailer** via Gmail SMTP.
- Sends instant transactional summaries to customers upon payment.
- Delivers a secure login/submission token link to access the Requirements form.
- Sends instant alert notifications to the Admin team (`EMAIL_TO`) whenever a new payment is made or client onboarding details are submitted.

---

## Project Structure

```
aurum-diamond-website-updated/
└─ next-app/
   ├─ src/
   │  ├─ app/                 # App Router (pages & API endpoints)
   │  │  ├─ api/               # Serverless API routes (contact, Stripe webhook, etc.)
   │  │  ├─ page.js            # Home Page
   │  │  └─ ...
   │  ├─ components/          # Reusable React UI components (Hero, Navbar, Pricing)
   │  ├─ data/                # Static copy & content (content.js)
   │  └─ lib/                 # Core server libraries (email, pricing, zoho)
   ├─ public/                 # Static assets (images, logos)
   ├─ netlify.toml            # Netlify deployment configuration
   ├─ next.config.mjs         # Next.js configurations
   └─ package.json
```

---

## Running Locally

### 1. Configuration
Create a `.env.local` file inside the `next-app` folder with your credentials:

```env
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Zoho Books Keys
ZOHO_CLIENT_ID=your_client_id
ZOHO_CLIENT_SECRET=your_client_secret
ZOHO_REFRESH_TOKEN=your_refresh_token
ZOHO_ORGANIZATION_ID=your_org_id

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# SMTP Configuration (e.g., Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_FROM="AURUM EA <your_email@gmail.com>"
EMAIL_TO=admin_inbox@yourdomain.com
```

### 2. Start Dev Server
```bash
npm install
npm run dev
# Opens at http://localhost:3000
```

### 3. Webhook Tunneling (Local testing)
To test payment webhooks locally, forward Stripe events to your localhost server:
```bash
stripe listen --forward-to localhost:3000/api/webhook
```

---

## Production Build & Netlify Deployment

### Production Build
```bash
npm run build
```

### Deploying to Netlify
The project includes a `netlify.toml` configured to compile API routes as serverless Netlify Functions using `@netlify/plugin-nextjs`.

#### Method A: GitHub Integration (Recommended)
1. Push `next-app` contents to your GitHub repo.
2. Link the repository to Netlify.
3. Configure your Environment Variables in the Netlify UI.
4. Deploy.

#### Method B: Netlify CLI
1. Log in and link the project:
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify link
   ```
2. Build and deploy to production:
   ```bash
   netlify deploy --build --prod
   ```
