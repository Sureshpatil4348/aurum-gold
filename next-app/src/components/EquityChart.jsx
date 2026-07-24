"use client";
﻿import { useEffect, useRef, useState } from "react";
import { equityCurve } from "../data/content";
import "./EquityChart.css";

export default function EquityChart({ data }) {
  const curve = data || equityCurve;
  const wrapRef = useRef(null);
  const [drawn, setDrawn] = useState(false);
  const [key, setKey] = useState(0); // force re-animation

  const w = 400;
  const h = 150;
  const pad = 10;
  const max = Math.max(...curve);
  const min = Math.min(...curve);

  const points = curve.map((v, i) => {
    const x = (i / (curve.length - 1)) * w;
    const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
    return [x, y];
  });

  const linePath = points.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const areaPath = `${linePath} L${w},${h} L0,${h} Z`;

  // Re-animate whenever data changes
  useEffect(() => {
    setDrawn(false);
    const t = setTimeout(() => setDrawn(true), 60);
    return () => clearTimeout(t);
  }, [curve]);

  // Initial intersection observer for first draw
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDrawn(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="equity" ref={wrapRef}>
      <div className="equity__head">
        <span className="equity__label">Simulated equity growth</span>
        <span className="equity__live">
          <span className="equity__dot" />
          Live
        </span>
      </div>
      <svg
        key={key}
        viewBox={`0 0 ${w} ${h}`}
        className="equity__svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="equityFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1B2360" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1B2360" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#equityFill)" className={`equity__area ${drawn ? "is-drawn" : ""}`} />
        <path
          d={linePath}
          className={`equity__line ${drawn ? "is-drawn" : ""}`}
          fill="none"
          stroke="#1B2360"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={points[points.length - 1][0]}
          cy={points[points.length - 1][1]}
          r="4"
          className={`equity__end ${drawn ? "is-drawn" : ""}`}
          fill="#19D05F"
        />
      </svg>
    </div>
  );
}
