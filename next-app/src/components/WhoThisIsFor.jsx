"use client";
import { whoThisIsFor, actualProblem } from "../data/content";
import Icon from "./Icon";
import "./WhoThisIsFor.css";

const PRINCIPLE_ICONS = ["shield", "clock", "trend"];

export default function WhoThisIsFor() {
  return (
    <section id="who-this-is-for" className="section who section--white">
      <div className="container">
        <div className="who-hero reveal">
          <div className="who-hero__glow" aria-hidden="true" />
          <img
            className="who-hero__target"
            src="/images/who-target-icon.png"
            alt="Target with an arrow hitting the bullseye, representing precise, rule-based execution"
            loading="lazy"
          />
          <p className="who-badge">
            <Icon name="target" size={14} strokeWidth={2.2} />
            <span>Who it&apos;s for</span>
          </p>
          <h2 className="who-hero__title">{whoThisIsFor.title}</h2>
          <p className="who-hero__body">{whoThisIsFor.body}</p>
        </div>

        <div className="who-principles reveal" style={{ "--reveal-delay": "80ms" }}>
          <div className="who-principles__head">
            <p className="eyebrow">{actualProblem.eyebrow}</p>
            <p className="who-principles__intro">{actualProblem.intro}</p>
          </div>

          <div className="who-bottom-cards">
            {actualProblem.points.map((point, i) => (
              <article
                className="who-point-card reveal"
                key={point.title}
                style={{ "--reveal-delay": `${140 + i * 60}ms` }}
              >
                <span className="who-point-card__icon" aria-hidden="true">
                  <Icon name={PRINCIPLE_ICONS[i]} size={20} strokeWidth={1.8} />
                </span>
                <h3>{point.title}</h3>
                <p>{point.desc}</p>
                <span className="who-point-card__closing">{point.closing}</span>
              </article>
            ))}
          </div>

          <p className="who-principles__footer">{actualProblem.footer}</p>
        </div>
      </div>
    </section>
  );
}
