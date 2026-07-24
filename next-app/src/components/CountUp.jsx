"use client";
import { useEffect, useRef, useState } from "react";

function parseTarget(raw) {
  const str = String(raw);
  const match = str.match(/\d+(\.\d+)?/);
  if (!match) return { number: null, prefix: "", suffix: "" };
  const idx = match.index;
  // If the digits are immediately preceded by a letter (e.g. a placeholder
  // like "X00+"), treat this as non-numeric and skip the count-up animation.
  if (idx > 0 && /[a-zA-Z]/.test(str[idx - 1])) {
    return { number: null, prefix: "", suffix: "" };
  }
  const number = parseFloat(match[0]);
  return {
    number,
    prefix: str.slice(0, idx),
    suffix: str.slice(idx + match[0].length),
    decimals: match[0].includes(".") ? match[0].split(".")[1].length : 0
  };
}

export default function CountUp({ value, duration = 1800 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);
  const parsed = useRef(parseTarget(value));

  useEffect(() => {
    parsed.current = parseTarget(value);
    if (parsed.current.number === null) {
      setDisplay(value);
      return;
    }

    // Start visibly from 0 rather than flashing the final value first.
    setDisplay(`${parsed.current.prefix}0${parsed.current.suffix}`);

    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          const { number, prefix, suffix, decimals } = parsed.current;
          const start = performance.now();
          function tick(now) {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const current = number * eased;
            setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
            if (t < 1) requestAnimationFrame(tick);
            else setDisplay(value);
          }
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
