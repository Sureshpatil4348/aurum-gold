"use client";
import { humanVsAurum } from "../data/content";
import Icon from "./Icon";
import "./AutomationPanel.css";

export default function AutomationPanel() {
  return (
    <div className="automation-panel">
      <div className="automation-panel__intro">
        <p className="eyebrow">Why Automation Is Mandatory</p>
        <h3 className="automation-panel__title">
          You will blink. <span className="automation-panel__title-accent">It won&apos;t.</span>
        </h3>
        <p className="automation-panel__body">
          The London open hits at 3am. A setup appears for 4 seconds. By the time you wake up,
          unlock your phone, and open MT5 — it&apos;s gone. AURUM was already in the trade at second one.
        </p>
      </div>

      <div className="hva-table" role="table" aria-label="Human versus AURUM execution">
        <div className="hva-table__head" role="row">
          <span role="columnheader">Human</span>
          <span className="hva-table__spacer" aria-hidden="true" />
          <span role="columnheader">AURUM</span>
        </div>
        {humanVsAurum.map((row) => (
          <div className="hva-table__row" role="row" key={row.human}>
            <span className="hva-table__cell hva-table__cell--human" role="cell">
              {row.human}
            </span>
            <span className="hva-table__arrow" aria-hidden="true">
              <Icon name="trend" size={14} strokeWidth={2.2} />
            </span>
            <span className="hva-table__cell hva-table__cell--aurum" role="cell">
              {row.aurum}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
