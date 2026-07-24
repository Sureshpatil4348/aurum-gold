export const faqCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      {
        q: "What exactly is AURUM EA?",
        a: "AURUM EA is an Expert Advisor — a piece of software that plugs directly into MetaTrader 4 or MetaTrader 5 and trades on your behalf, automatically. It uses an ATR-based (Average True Range) intelligent grid strategy, primarily optimised for Gold (XAUUSD). Once installed and configured, it analyses the market, opens positions, manages risk, and closes trades without you needing to watch a chart or make decisions. It runs 24 hours a day, 7 days a week — including while you sleep."
      },
      {
        q: "Do I need any trading experience to use AURUM?",
        a: "Basic familiarity with MetaTrader helps — knowing how to attach an EA to a chart, what lot sizes mean, and how to read your account balance. You don't need to understand the algorithm or be an advanced trader. Our step-by-step installation guide walks you through everything, and the Diamond and Institutional plans include a live setup call where our team configures it alongside you. If you've been trading manually for any period of time, you'll find AURUM straightforward."
      },
      {
        q: "Do I need to know how to code?",
        a: "No coding required, at any level. Installation is as simple as placing a file in a folder and attaching it to a chart in MetaTrader. If you can install an app on your phone, you can install AURUM. The entire process takes under 15 minutes for most traders."
      },
      {
        q: "Which plan should I start with?",
        a: "If you're new to automated trading or have a single live account, start with Silver. If you have multiple accounts, want to trade more than one symbol, or want the full live setup call and priority support, Diamond is the most popular choice for a reason. Not sure? Contact us before buying — we'll tell you honestly which plan fits your situation."
      },
      {
        q: "How quickly can I get AURUM running after purchase?",
        a: "EA file and licence are delivered instantly after payment. With our installation guide, most traders are live within 15–30 minutes of receiving their files. Diamond customers can schedule a live call with the team, which typically takes under an hour including full configuration and risk parameter setup."
      }
    ]
  },
  {
    id: "strategy",
    title: "The Strategy",
    items: [
      {
        q: "What is ATR-based grid trading and why does it matter?",
        a: "ATR stands for Average True Range — a measure of how much a market moves within a given period. Most grid EAs use fixed spacing between their grid levels, which means they behave the same in a slow, quiet session as they do during a volatile news event. That's how accounts get blown. AURUM reads ATR in real time and adjusts grid spacing accordingly — tighter when the market is calm, wider when Gold is moving aggressively. This is not a cosmetic feature. It's the architectural difference between an EA that survives and one that doesn't."
      },
      {
        q: "Is AURUM a martingale or grid system?",
        a: "AURUM uses an intelligent grid strategy — but it is not a pure martingale. Pure martingale doubles position size after every loss, which creates exponential risk and is widely considered dangerous. AURUM's grid spacing is driven by ATR, position sizes are controlled by preset risk parameters, and every trade has stop loss logic built in. The grid component means multiple positions can be open simultaneously across different price levels — but within the risk envelope you define, not outside it."
      },
      {
        q: "Why is AURUM primarily built for Gold (XAUUSD)?",
        a: "Gold is one of the most liquid, most volatile, and most technically consistent markets in the world. Its ATR characteristics make it particularly well-suited to grid strategies — it moves in meaningful ranges, trends clearly over time, and responds predictably to volatility expansion and contraction. The settings files included with AURUM are optimised for XAUUSD specifically — though the EA supports other pairs and indices too, Gold is where it was built to perform."
      },
      {
        q: "What other instruments can AURUM trade?",
        a: "Silver covers Gold (XAUUSD) and EUR/USD. Diamond adds additional currency pairs, Silver (XAGUSD), and other supported CFDs, unlocking multi-symbol trading. Settings files are provided for each supported instrument — these are pre-optimised parameters tailored to each market's behaviour, so you're not starting from scratch on configuration."
      },
      {
        q: "Does AURUM use news filters or stop trading during events?",
        a: "The ATR-based grid inherently responds to volatility expansion caused by news — wider spacing means less exposure during sharp moves. You have full control over how you want to trade — if you prefer to avoid trading during high-impact news, you can adjust the settings or simply pause the EA during those periods."
      }
    ]
  },
  {
    id: "technical",
    title: "Technical & Setup",
    items: [
      {
        q: "Does AURUM need to run on my personal computer 24/7?",
        a: "AURUM needs a live MetaTrader instance to trade. If your computer turns off, goes to sleep, or loses internet, AURUM stops. For this reason, we strongly recommend a VPS — a Virtual Private Server that stays online around the clock regardless of your local machine. VPS setup guidance is included with your purchase. Monthly VPS costs are typically $10–$30 and we can recommend providers that are already optimised for MetaTrader."
      },
      {
        q: "Which version of MetaTrader do I need?",
        a: "AURUM runs on MetaTrader 5. Our team will confirm the right setup for your account during onboarding, and if you're unsure whether your broker offers MT5, check your broker's platform download page or ask their support."
      },
      {
        q: "How do I install AURUM on MetaTrader?",
        a: "A full step-by-step guide is included with every purchase. The short version: download your EA file, place it in MetaTrader's Experts folder, restart MetaTrader, find AURUM in your Navigator panel, and drag it onto your XAUUSD chart. Enable automated trading in MetaTrader settings, then set your risk parameters from the provided settings file. The whole process takes under 15 minutes."
      },
      {
        q: "Can I run AURUM on multiple charts simultaneously?",
        a: "Yes — your account licence allows you to run AURUM on that account across multiple charts and instruments simultaneously. Diamond licences allow you to run it across multiple live accounts. Running multiple instances across different pairs is a valid diversification strategy, and we provide the settings files to do this properly."
      },
      {
        q: "What are the minimum system requirements?",
        a: "Any Windows PC or VPS capable of running MetaTrader 5. MetaTrader runs on Windows; if you use Mac, you'll need either a VPS or a Windows emulator. Minimum specs: Windows 7 or later, 2GB RAM, stable internet connection. For VPS, a basic 1-core, 1GB RAM VPS is sufficient."
      }
    ]
  },
  {
    id: "brokers",
    title: "Brokers & Accounts",
    items: [
      {
        q: "Does AURUM work with my broker?",
        a: "AURUM works with any broker that supports MetaTrader 5 with automated trading enabled. That covers the vast majority of retail forex brokers globally. The only brokers it won't work with are those that don't support MT5, or those that explicitly block Expert Advisors. If you're unsure, check your broker's terms or ask their support whether EAs are permitted — our team can also advise if you share your broker name."
      },
      {
        q: "What type of broker do you recommend?",
        a: "ECN (Electronic Communications Network) brokers with tight spreads on XAUUSD are the best fit. AURUM opens multiple positions as part of its grid — spread costs compound across these positions, so lower spreads directly improve performance. Look for brokers with raw or low spreads on Gold, low or no commission, fast execution, and a strong reputation. We don't formally recommend any single broker, and you should do your own due diligence."
      },
      {
        q: "What is the minimum account size recommended?",
        a: "Running a grid strategy on an account that is too small can create disproportionate risk. The EA needs sufficient room for positions to remain open across multiple levels before they collectively close. During onboarding, we’ll provide specific guidance based on your account size, and our recommended risk settings for different account sizes are available in the Setup Guide."
      },
      {
        q: "Can AURUM be used on prop firm accounts?",
        a: "Yes — the Diamond plan includes configuration support for prop firm accounts. Prop firms typically have daily drawdown limits, maximum position size restrictions, and rules around holding trades over the weekend. We help you configure AURUM's parameters to stay within those rules on a case-by-case basis."
      },
      {
        q: "Can I use a demo account first before going live?",
        a: "Yes, and we encourage it. Once you have your licence, you can run AURUM on a demo account with realistic conditions to familiarise yourself with its behaviour, observe the grid structure, and test your risk parameters. Be aware that demo and live execution can differ — spreads on demo accounts are sometimes artificially tighter, and slippage is lower than in live conditions. Use demo as orientation, not as a final performance benchmark."
      }
    ]
  },
  {
    id: "risk",
    title: "Risk & Performance",
    items: [
      {
        q: "Can AURUM guarantee returns?",
        a: "No — and any EA that claims otherwise is lying to you. AURUM is a disciplined, rule-based system that removes emotional decision-making from your trading. Like any strategy, it will have losing periods, drawdown phases, and months that underperform expectations. What it prevents is the self-sabotage that turns a small loss into a blown account. Past performance does not guarantee future results. Trading involves risk of loss."
      },
      {
        q: "What is the maximum drawdown I should expect?",
        a: "Drawdown is highly dependent on your risk settings, account size, and market conditions. AURUM's built-in risk controls cap exposure — but grid strategies by nature can hold multiple open positions during trending markets, which creates floating drawdown. We recommend treating any drawdown above 20% as a signal to review your settings. During onboarding, our team provides recommended risk parameters based on your account size and risk tolerance."
      },
      {
        q: "How does AURUM compare to cheap EAs on MQL5?",
        a: "Most marketplace EAs are backtested on cherry-picked historical data, over-optimised to look good on paper, and abandoned when they stop working in live conditions. AURUM is backed by a team with real institutional experience across banking, quantitative analysis, and hedge fund management, and it is actively traded by its developers on live accounts. It's supported by a KHDA-approved trading academy with 800+ mentored traders."
      },
      {
        q: "Can I see verified trading results before buying?",
        a: "Yes — our Results page shows trading performance data from live AURUM accounts, including community results from our 150+ active users. No trading system performs identically across all accounts due to differences in broker, account size, risk settings, and market timing — so treat published results as directional indicators, not guarantees of what you'll personally experience."
      }
    ]
  },
  {
    id: "payment",
    title: "Payment & Pricing",
    items: [
      {
        q: "Is this really a one-time payment?",
        a: "Yes. You pay once and AURUM is yours to use — no monthly fees, no annual renewals, no hidden charges."
      },
      {
        q: "Which plan should I choose?",
        a: "If you mainly trade Gold (XAUUSD), the Silver Plan is a great place to start. If you want to trade multiple markets like Forex, Gold, Silver, and Indices, we recommend our Diamond Plan — our most popular plan."
      },
      {
        q: "How quickly can I get AURUM running after purchase?",
        a: "You'll receive the AURUM files on the same day or by the next business day. Most users are ready to start trading within 1–2 days, and our team is here to help with setup."
      },
      {
        q: "Can I upgrade my plan later?",
        a: "Yes — contact our support team and we'll calculate the difference. You only pay the gap between your current plan and the new one."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept major cards and bank transfer. Reach out to our team via the contact page and we'll share the payment options available for your region."
      }
    ]
  },
  {
    id: "support",
    title: "Support & Updates",
    items: [
      {
        q: "What support do I get after purchase?",
        a: "Silver includes email support. Diamond includes priority support plus a live setup call with the team. All support covers technical questions, settings configuration guidance, and general AURUM operation. What it doesn't cover is generic trading advice unrelated to AURUM."
      },
      {
        q: "How do I receive updates to AURUM?",
        a: "Updates are delivered via email to your purchase address. When a new version is released, you'll receive the updated EA file and a changelog explaining what changed and whether you need to reconfigure anything. Installation of updates follows the same simple process as initial installation."
      },
      {
        q: "Can I transfer my licence to a different account or computer?",
        a: "Licences are tied to MetaTrader account numbers. If you change your trading account, switch brokers, or move to a new VPS, contact our support team and we'll transfer your licence — we don't charge for licence transfers resulting from legitimate changes."
      },
      {
        q: "What is the refund or satisfaction policy?",
        a: "All plans include a 7-day satisfaction guarantee. If within 7 days of purchase you believe AURUM is materially different from what was described, contact us and we'll make it right. The guarantee does not cover performance outcomes, since trading results depend on market conditions and personal risk settings."
      }
    ]
  }
];
