"use client";
import StrategyPanel from "./StrategyPanel";
import AutomationPanel from "./AutomationPanel";
import "./StrategyVsAutomation.css";

export default function StrategyVsAutomation() {
  return (
    <section id="performance" className="section sva-section">
      <div className="container">
        {/* Two-column row: ATR Grid card (left) + Why Automation Is Mandatory card (right) */}
        <div className="sva-top">
          <div className="reveal sva-strategy">
            <StrategyPanel />
          </div>

          <div className="reveal sva-automation" style={{ "--reveal-delay": "120ms" }}>
            <AutomationPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
