"use client";
import { featureChips } from "../data/content";
import Icon from "./Icon";
import "./Ticker.css";

export default function Ticker() {
  const loop = [...featureChips, ...featureChips];

  return (
    <div className="marquee" role="marquee" aria-label="AURUM feature highlights">
      <div className="marquee__edge marquee__edge--l" aria-hidden="true" />
      <div className="marquee__edge marquee__edge--r" aria-hidden="true" />
      <div className="marquee__track">
        {loop.map((label, i) => (
          <span className="marquee__item" key={`${label}-${i}`}>
            <Icon name="trend" size={13} strokeWidth={2.2} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
