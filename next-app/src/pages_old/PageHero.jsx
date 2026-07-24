"use client";
import "./PageHero.css";

export default function PageHero({ eyebrow, title, lead, note, badge }) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner reveal">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {lead && <p className="page-hero__lead">{lead}</p>}
        {badge && <div className="page-hero__badge">{badge}</div>}
        {note && <p className="page-hero__note">{note}</p>}
      </div>
    </section>
  );
}
