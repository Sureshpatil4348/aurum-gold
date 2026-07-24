"use client";
import { useEffect, useRef } from "react";

const SLOT = 26;
const CANDLE_W = 15;
const ADD_INTERVAL = 850;
const PARTICLE_COUNT = 46;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function HeroCanvas() {
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
      r: rand(1, 2.6),
      speed: rand(6, 18),
      drift: rand(-6, 6),
      phase: rand(0, Math.PI * 2),
      twinkle: rand(1.4, 3.2)
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
      if (candles.length > 46) candles.shift();
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

      // --- grid ---
      ctx.strokeStyle = "rgba(255,255,255,0.045)";
      ctx.lineWidth = 1;
      const gridStep = 64;
      const gridShift = (elapsed * 0.006) % gridStep;
      for (let x = -gridShift; x < width; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // --- candlesticks (bottom band) ---
      const bandTop = height * 0.52;
      const bandHeight = height * 0.46;
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
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = "#3a4685";
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }
        ctx.fillRect(xRight - CANDLE_W / 2, top, CANDLE_W, h);
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        points.push({ x: xRight, y: (yOpen + yClose) / 2, fade });
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
        ctx.shadowBlur = 14;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // --- particles (gold dust) ---
      for (const p of particles) {
        p.y -= (p.speed * 0.55) / 1000;
        if (p.y < -0.05) {
          p.y = 1.05;
          p.x = Math.random();
        }
        const px = (p.x + Math.sin(elapsed / 1600 + p.phase) * 0.01) * width;
        const py = p.y * height;
        const twinkle = 0.35 + 0.4 * Math.abs(Math.sin(elapsed / (400 * p.twinkle) + p.phase));

        ctx.beginPath();
        ctx.fillStyle = `rgba(25,208,95,${twinkle.toFixed(3)})`;
        ctx.shadowColor = "rgba(25,208,95,0.6)";
        ctx.shadowBlur = 6;
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

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />;
}
