import { useEffect, useRef } from "react";
import "./StrategyPanel.css";

const SLOT = 22;
const CANDLE_W = 12;
const ADD_INTERVAL = 900;
const PARTICLE_COUNT = 22;
const GRID_LEVELS = 7;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function StrategyPanel() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let candles = [];
    let price = 50;
    let lastAdd = 0;
    let raf = null;
    let start = null;

    const particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      r: rand(1, 2.4),
      speed: rand(5, 14),
      phase: rand(0, Math.PI * 2),
      twinkle: rand(1.4, 3.2),
      gold: Math.random() > 0.5
    }));

    function seedCandles(count) {
      candles = [];
      price = 50;
      for (let i = 0; i < count; i++) {
        price += rand(-4, 4.4);
        price = Math.max(18, Math.min(82, price));
        const open = price;
        price += rand(-4, 4.4);
        price = Math.max(18, Math.min(82, price));
        candles.push({ open, close: price, up: price >= open });
      }
    }

    function addCandle() {
      const open = price;
      price += rand(-4.2, 4.6);
      price = Math.max(16, Math.min(84, price));
      candles.push({ open, close: price, up: price >= open });
      if (candles.length > 60) candles.shift();
    }

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedCandles(Math.ceil(width / SLOT) + 6);
    }

    function draw(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;

      if (elapsed - lastAdd > ADD_INTERVAL) {
        addCandle();
        lastAdd = elapsed;
      }

      const scrollOffset = ((elapsed - lastAdd) / ADD_INTERVAL) * SLOT;

      ctx.clearRect(0, 0, width, height);

      // --- ATR grid levels (horizontal, breathing opacity) ---
      const gridStep = height / (GRID_LEVELS + 1);
      for (let i = 1; i <= GRID_LEVELS; i++) {
        const y = gridStep * i;
        const wave = 0.55 + 0.35 * Math.sin(elapsed / 1400 + i * 0.9);
        ctx.strokeStyle = `rgba(255,255,255,${(0.12 * wave).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // --- candlesticks (full band) ---
      const bandTop = height * 0.1;
      const bandHeight = height * 0.8;
      const n = candles.length;
      const points = [];

      for (let i = 0; i < n; i++) {
        const c = candles[i];
        const xRight = width - (n - 1 - i) * SLOT - CANDLE_W / 2 + scrollOffset;
        if (xRight < -SLOT || xRight > width + SLOT) continue;

        const yOpen = bandTop + bandHeight * (1 - c.open / 100);
        const yClose = bandTop + bandHeight * (1 - c.close / 100);
        const top = Math.min(yOpen, yClose);
        const h = Math.max(Math.abs(yClose - yOpen), 3);

        const fade = Math.max(0, Math.min(1, (xRight - 20) / 120));

        ctx.globalAlpha = 0.85 * fade;
        if (c.up) {
          ctx.fillStyle = "#19D05F";
          ctx.shadowColor = "rgba(25,208,95,0.45)";
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = "#3a4685";
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }
        ctx.fillRect(xRight - CANDLE_W / 2, top, CANDLE_W, h);
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        points.push({ x: xRight, y: (yOpen + yClose) / 2 });
      }

      // --- glowing trend line across candle midpoints ---
      if (points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const midX = (points[i].x + points[i + 1].x) / 2;
          const midY = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
        }
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, "rgba(255,216,77,0)");
        grad.addColorStop(0.5, "rgba(255,216,77,0.9)");
        grad.addColorStop(1, "rgba(255,216,77,0.9)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.shadowColor = "rgba(25,208,95,0.55)";
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // --- particles (gold / green dust) ---
      for (const p of particles) {
        p.y -= (p.speed * 0.55) / 1000;
        if (p.y < -0.05) {
          p.y = 1.05;
          p.x = Math.random();
        }
        const px = (p.x + Math.sin(elapsed / 1600 + p.phase) * 0.012) * width;
        const py = p.y * height;
        const twinkle = 0.3 + 0.4 * Math.abs(Math.sin(elapsed / (400 * p.twinkle) + p.phase));

        ctx.beginPath();
        ctx.fillStyle = p.gold
          ? `rgba(255,216,77,${twinkle.toFixed(3)})`
          : `rgba(25,208,95,${twinkle.toFixed(3)})`;
        ctx.shadowColor = p.gold ? "rgba(255,216,77,0.6)" : "rgba(25,208,95,0.6)";
        ctx.shadowBlur = 5;
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      // draw a single still frame, no loop
      draw(0);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="strategy-panel">
      {/* Layer 1: live scrolling trading graph — same canvas-driven animation style as the Hero section */}
      <canvas ref={canvasRef} className="strategy-panel__canvas" aria-hidden="true" />

      {/* Layer 2: dark navy overlay so text stays readable */}
      <div className="strategy-panel__overlay" aria-hidden="true" />

      {/* Layer 3: existing radial accent glow */}
      <div className="strategy-panel__glow" aria-hidden="true" />

      <p className="eyebrow">Strategy Behind AURUM</p>

      <h3 className="strategy-panel__title">
        <span className="strategy-panel__title-line">ATR Grid.</span>
        <span className="strategy-panel__title-line strategy-panel__title-line--accent">
          Not a black box.
        </span>
      </h3>

      <p className="strategy-panel__intro">
        Average True Range dynamically sets every grid level based on real market volatility.
        The system reads the market — not a static chart.
      </p>

      <div className="strategy-panel__meter">
        <p className="strategy-panel__meter-lead">Same strategy. Different spacing — based on how Gold is moving that day.</p>
        <div className="strategy-panel__scenarios">
          <div className="strategy-panel__scenario">
            <span className="strategy-panel__scenario-when">When Gold is calm</span>
            <span className="strategy-panel__scenario-then">
              AURUM steps closer — so small moves still get caught.
            </span>
          </div>
          <div className="strategy-panel__scenario">
            <span className="strategy-panel__scenario-when">When Gold is wild</span>
            <span className="strategy-panel__scenario-then">
              AURUM steps back — so noise doesn&apos;t shake you out.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}