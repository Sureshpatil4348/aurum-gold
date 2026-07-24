"use client";
import { useState, useRef } from 'react';
import PageHero from "./PageHero";
import Link from 'next/link';
import "./shared-page.css";
import "./SetupGuidePage.css";

const SetupVideoDisplay = ({ label, src, poster }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="setup-video-card">
      {playing ? (
        <video
          className="setup-video-card__player"
          src={src || "/videos/aurum-installation-guide.mp4"}
          poster={poster}
          controls
          autoPlay
          playsInline
        />
      ) : (
        <div className="setup-video-card__frame" onClick={() => setPlaying(true)}>
          <div className="setup-video-card__grid" />
          <button className="setup-video-card__play" aria-label="Play tutorial video">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M8 5.5v13l11-6.5-11-6.5z" fill="#1B2360" />
            </svg>
          </button>
          <div className="setup-video-card__meta">
            <span className="setup-video-card__label">{label}</span>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/* Inline icon set (no external icon library in this project)             */
/* ---------------------------------------------------------------------- */

const IconServer = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="7" rx="1.5" />
    <rect x="3" y="14" width="18" height="7" rx="1.5" />
    <circle cx="7" cy="6.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="7" cy="17.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const IconBolt = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </svg>
);

const IconPlug = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 2v5M15 2v5M7.5 7h9v4.5A4.5 4.5 0 0 1 12 16a4.5 4.5 0 0 1-4.5-4.5V7Z" />
    <path d="M12 16v3M9 22h6" />
  </svg>
);

const IconGlobe = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.6 2.6 4 5.8 4 9s-1.4 6.4-4 9c-2.6-2.6-4-5.8-4-9s1.4-6.4 4-9Z" />
  </svg>
);

const IconShield = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3 4.5 6v6c0 4.7 3.2 8.4 7.5 9 4.3-.6 7.5-4.3 7.5-9V6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconInfo = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5.5M12 7.5h.01" />
  </svg>
);

const IconWallet = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2" />
    <path d="M3 7v10a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1H6a2 2 0 0 1-2-2Z" />
    <circle cx="16.5" cy="13.5" r="1.25" fill="currentColor" stroke="none" />
  </svg>
);

const IconLot = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 19V10M10 19V5M16 19v-7M21 19H3" />
  </svg>
);

const IconPercent = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 19 19 5" />
    <circle cx="6.5" cy="6.5" r="2" />
    <circle cx="17.5" cy="17.5" r="2" />
  </svg>
);

const IconGrid = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const IconWarning = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3 2 20h20L12 3Z" />
    <path d="M12 10v4.5M12 17.5h.01" />
  </svg>
);

const IconDownload = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </svg>
);

const steps = [
  {
    title: "Purchase & Register",
    desc: "Purchase AURUM EA from the website. After payment, reply to the confirmation email with your Name, Subscribed Package, Trading Account Number, and Trading Platform (MT5). Once verified, you'll receive a second email containing your AURUM EA file."
  },
  {
    title: "Set Up Your Windows VPS",
    desc: "Purchase a Windows VPS (such as MyForexVPS or FXVM). You'll receive an IP Address, Username, and Password. Connect to the VPS using Windows App on Mac or Remote Desktop on Windows."
  },
  {
    title: "Install & Log In to MetaTrader 5",
    desc: "On the VPS, download and install your broker's MetaTrader 5 platform. Open MT5, select your broker, choose Connect with an Existing Account, then log in using your Trading Account Number, Master Password, and Server."
  },
  {
    title: "Install the AURUM EA File",
    desc: "Download the AURUM EA file (.ex5) from the email received after registration. Copy it to MetaTrader 5 via File \u2192 Open Data Folder \u2192 MQL5 \u2192 Experts folder.",
    code: "File \u2192 Open Data Folder \u2192 MQL5 \u2192 Experts"
  },
  {
    title: "Refresh & Attach the EA",
    desc: "In MetaTrader 5, open the Navigator panel. Right-click Expert Advisors and select Refresh. Then drag the AURUM EA onto your XAUUSD chart — or right-click it and select Attach to Chart."
  },
  {
    title: "Start Trading",
    desc: "Confirm the EA is attached successfully. Keep your VPS running to ensure AURUM EA trades continuously, 24 hours a day, 7 days a week."
  }
];

const vpsBenefits = [
  { title: "Runs 24/7", desc: "No missed overnight Gold moves — your VPS never sleeps.", Icon: IconServer },
  { title: "Low Latency", desc: "Faster execution than a home internet connection.", Icon: IconBolt },
  { title: "No Power Outage Risk", desc: "Independent of your local electricity or internet.", Icon: IconPlug },
  { title: "Access Anywhere", desc: "Reach your MetaTrader terminal from any device, anywhere.", Icon: IconGlobe }
];

const vpsProviders = [
  { name: "Beeks FX VPS", detail: "Purpose-built for MetaTrader · Low latency · Widely used", price: "$20/mo" },
  { name: "ForexVPS.net", detail: "MT4/MT5 optimised · Simple setup · Good support", price: "$18/mo" },
  { name: "Contabo VPS", detail: "Budget-friendly · High specs · Good for multiple EAs", price: "$8/mo" },
  { name: "Your Broker's Free VPS", detail: "Many ECN brokers offer free VPS above a minimum deposit — ask yours", price: "Free" }
];

const riskRows = [
  { balance: "$1,000 – $2,000", lot: "0.01 lots", risk: "0.5%", grid: "3–4" },
  { balance: "$2,000 – $5,000", lot: "0.02–0.03 lots", risk: "0.5–1%", grid: "4–6" },
  { balance: "$5,000 – $10,000", lot: "0.05 lots", risk: "1%", grid: "5–7" },
  { balance: "$10,000 – $25,000", lot: "0.10–0.15 lots", risk: "1–1.5%", grid: "6–8" },
  { balance: "$25,000+", lot: "Custom", risk: "Discuss with team", grid: "Custom" }
];

export default function SetupGuidePage() {
  return (
    <main>
      <PageHero
        eyebrow="MT5 Setup Guide — 6 Steps"
        title="Install AURUM EA on MT5 in 6 steps."
        lead="No coding. No complex configuration. From purchase to live automated Gold trading on MetaTrader 5 — follow these 6 steps."
        badge="6 steps · No coding required · MetaTrader 5"
      />

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <p className="eyebrow">6-Step MT5 Installation Guide</p>
            <p>
              These 6 steps cover the complete AURUM EA installation on MetaTrader 5 — from purchase
              through to live automated Gold trading on XAUUSD.
            </p>
          </div>

          <div className="setup-steps-alt">
            {/* Group 1: First 3 steps */}
            <div className="setup-step-row reveal">
              <div className="setup-step-row__content-group">
                {steps.slice(0, 3).map((s, i) => (
                  <div className="setup-step" key={s.title}>
                    <div className="setup-step__num">{i + 1}</div>
                    <div className="setup-step__body">
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                      {s.code && <code className="setup-step__code">{s.code}</code>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="setup-step-row__media">
                <SetupVideoDisplay
                  label="WATCH TUTORIAL: STEPS 1 – 3 (REGISTRATION & VPS)"
                  src="/videos/aurum-setup-steps-1-3.mp4"
                />
              </div>
            </div>

            {/* Group 2: Next 3 steps */}
            <div className="setup-step-row is-reversed reveal">
              <div className="setup-step-row__content-group">
                {steps.slice(3, 6).map((s, i) => (
                  <div className="setup-step" key={s.title}>
                    <div className="setup-step__num">{i + 4}</div>
                    <div className="setup-step__body">
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                      {s.code && <code className="setup-step__code">{s.code}</code>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="setup-step-row__media">
                <SetupVideoDisplay
                  label="WATCH TUTORIAL: STEPS 4 – 6 (MT5 & EA INSTALLATION)"
                  src="/videos/aurum-setup-steps-4-6.mp4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="vps" className="section section--grey vps-section">
        <div className="container">
          <div className="vps-grid">
            <div className="vps-left reveal">
              <div className="vps-left__text">
                <p className="eyebrow">Always On</p>
                <h2>Why serious traders use a VPS.</h2>
                <p className="vps-body">
                  AURUM needs MetaTrader to be running to trade. If your computer turns off, loses
                  internet, or goes to sleep — AURUM stops. Gold moves at 3am. Gold moves over
                  weekends. Gold does not care about your power schedule.
                </p>
                <p className="vps-body">
                  A VPS (Virtual Private Server) is a cloud computer that runs 24/7 with zero downtime.
                  You connect to it remotely, install MetaTrader on it, and AURUM runs continuously —
                  whether your own machine is on or not.
                </p>
                <p className="vps-body">
                  Monthly cost is typically under $20. For an EA trading Gold at institutional grade,
                  this is non-negotiable for serious traders.
                </p>
              </div>

              <div className="vps-left__spacer">
                <div className="vps-benefits">
                  {vpsBenefits.map(({ title, desc, Icon }) => (
                    <div className="vps-benefit-card" key={title}>
                      <div className="vps-benefit-card__icon">
                        <Icon />
                      </div>
                      <h3>{title}</h3>
                      <p>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="reveal">
              <div className="vps-providers">
                <div className="vps-providers__title">
                  <IconServer className="vps-providers__title-icon" />
                  Recommended VPS Providers
                </div>
                <div className="vps-providers__list">
                  {vpsProviders.map((p) => (
                    <div className="vps-provider" key={p.name}>
                      <div className="vps-provider__info">
                        <div className="vps-provider__name">{p.name}</div>
                        <div className="vps-provider__detail">{p.detail}</div>
                      </div>
                      <div className={`vps-provider__price ${p.price === "Free" ? "is-free" : ""}`}>
                        {p.price}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="vps-providers__note">
                  <IconInfo className="vps-providers__note-icon" />
                  <p>
                    Diamond plan holders receive step-by-step VPS setup guidance from our team
                    during onboarding. We'll help you connect, install MetaTrader, and move AURUM
                    across to your VPS.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="risk" className="section risk-section">
        <div className="container">
          <div className="risk-panel reveal">
            <div className="risk-panel__header">
              <div className="risk-panel__header-text">
                <div className="risk-label">
                  <IconShield className="risk-label__icon" />
                  Configuration
                </div>
                <h2>Recommended risk settings by account size.</h2>
                <p>
                  These are starting-point guidelines, not rules. Your specific broker's spread,
                  your risk appetite, and your trading goals all affect the right settings for
                  you. When in doubt, start conservatively — you can always increase later.
                </p>
              </div>

              <div className="risk-panel__illustration" aria-hidden="true">
                <svg viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline
                    points="6,120 40,95 70,110 100,60 130,80 160,35 200,48"
                    stroke="var(--gold-soft)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.55"
                  />
                  <polyline
                    points="6,120 40,95 70,110 100,60 130,80 160,35 200,48 200,150 6,150"
                    fill="url(#riskAreaGradient)"
                    stroke="none"
                    opacity="0.35"
                  />
                  <defs>
                    <linearGradient id="riskAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <circle cx="168" cy="52" r="30" fill="rgba(25,208,95,0.12)" />
                  <g transform="translate(150,34)">
                    <path
                      d="M18 2 6 7v9c0 8 5 13.5 12 15.5C25 29.5 30 24 30 16V7L18 2Z"
                      fill="none"
                      stroke="var(--gold-soft)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="m12 18 4 4 8-8"
                      fill="none"
                      stroke="var(--gold-soft)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
            </div>

            <div className="risk-table-wrap">
              <table className="risk-table-v2">
                <thead>
                  <tr>
                    <th>
                      <IconWallet className="risk-table-v2__head-icon" />
                      Account Balance
                    </th>
                    <th>
                      <IconLot className="risk-table-v2__head-icon" />
                      Lot Size
                    </th>
                    <th className="is-gold">
                      <IconPercent className="risk-table-v2__head-icon" />
                      Risk %
                    </th>
                    <th>
                      <IconGrid className="risk-table-v2__head-icon" />
                      Max Grid Positions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {riskRows.map((row) => (
                    <tr key={row.balance}>
                      <td data-label="Account Balance">{row.balance}</td>
                      <td data-label="Lot Size">{row.lot}</td>
                      <td data-label="Risk %" className="is-gold">{row.risk}</td>
                      <td data-label="Max Grid Positions">{row.grid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="risk-disclosure">
              <IconWarning className="risk-disclosure__icon" />
              <p>
                <strong>Risk Disclosure:</strong> These are guidelines, not guarantees of
                performance or safety. Grid trading strategies can accumulate floating drawdown
                during strongly trending markets. Never risk capital you cannot afford to lose.
                All Diamond plan holders receive individual risk parameter consultation before
                going live.
              </p>
            </div>
          </div>

          <div className="risk-cta reveal">
            <div className="risk-cta__left">
              <div className="risk-cta__icon">
                <IconDownload />
              </div>
              <div>
                <h4>Want to learn more?</h4>
                <p>Download our Risk Settings guide and learn how to choose the right settings for your account.</p>
              </div>
            </div>
            <div className="risk-cta__right">
              <a
                href="/downloads/aurum-risk-settings-guide.pdf"
                className="btn btn--gold btn--lg"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                Download the Risk Settings PDF
              </a>
              {/* <span className="risk-cta__note">100% Free · No sign-up required</span> */}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight cta-block">
        <div className="container cta-block__inner reveal">
          <p className="eyebrow">MT5 Installation</p>
          <h2>6 steps. Then it runs itself.</h2>
          <p>For any queries or setup assistance, reach out to us here — our team responds quickly with a straight answer.</p>
          <div className="cta-block__actions">
            <Link href="/pricing" className="btn btn--gold">Start Automating Now</Link>
            <Link href="/faq" className="btn btn--ghost">Browse the FAQ</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
