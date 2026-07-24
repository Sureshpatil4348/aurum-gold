"use client";
import { useEffect, useState } from "react";
import Icon from "./Icon";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`back-to-top ${visible ? "is-visible" : ""}`}
      aria-label="Back to top"
    >
      <span style={{ display: "inline-flex", transform: "rotate(-45deg)" }}>
        <Icon name="trend" size={18} strokeWidth={2} />
      </span>
    </button>
  );
}
