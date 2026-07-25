"use client";
import { useEffect, useRef, useState } from "react";
import { statsBar, MYFXBOOK_REPORT_URL } from "../data/content";
import Icon from "./Icon";
import CountUp from "./CountUp";
import "./StatsBar.css";

function formatMoney(n) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function ProfitCounter({ cfg }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const duration = 1600;
            function tick(now) {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(cfg.base * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setValue(cfg.base);
            }
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [cfg.base]);

  useEffect(() => {
    const id = setInterval(() => {
      const [min, max] = cfg.incrementBy;
      setValue((v) => v + (min + Math.random() * (max - min)));
    }, cfg.incrementEvery);
    return () => clearInterval(id);
  }, [cfg.incrementBy, cfg.incrementEvery]);

  return (
    <span className="stats-bar__value" ref={ref}>
      {formatMoney(value)}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section id="stats" className="section section--tight">
      <div className="container">
        <div className="stats-bar">
          {statsBar.map((s, i) => (
            <div className="stats-bar__card reveal" style={{ "--reveal-delay": `${i * 100}ms` }} key={s.id}>
              {s.id === "profit" ? (
                <>
                  <span className="stats-bar__label">{s.label}</span>
                  <ProfitCounter cfg={s} />
                  <span className="stats-bar__note">Updated automatically, every 30s</span>
                </>
              ) : s.id === "verified" ? (
                <>
                  <span className="stats-bar__icon">
                    <Icon name={s.icon} size={20} strokeWidth={1.8} />
                  </span>
                  <span className="stats-bar__label">{s.label}</span>
                  <a href={MYFXBOOK_REPORT_URL} target="_blank" rel="noreferrer" className="stats-bar__link">
                    {s.cta}
                    <Icon name="trend" size={13} strokeWidth={2.2} />
                  </a>
                </>
              ) : (
                <>
                  <span className="stats-bar__icon">
                    <Icon name={s.icon} size={20} strokeWidth={1.8} />
                  </span>
                  <span className="stats-bar__label">{s.label}</span>
                  <span className="stats-bar__value">
                    <CountUp value={s.value} />
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
