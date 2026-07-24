"use client";
import { useEffect, useRef, useState } from "react";
import { testimonials } from "../data/content";
import "./Testimonials.css";

function Stars({ count }) {
  return (
    <span className="testimonial-card__stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < count ? "#19D05F" : "none"} stroke="#19D05F" strokeWidth="1.4">
          <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.7l-5.9 3 1.2-6.6-4.8-4.6 6.6-.9L12 2.5z" strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  );
}

// Ease-in-out curve used for the manual scroll tween — smoother and more
// predictable across browsers than relying on native `scroll-behavior`.
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Testimonials() {
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const tweenRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);

  // Duplicate the list so the marquee can loop seamlessly.
  const validTestimonials = testimonials.filter(t => !t.isCta);
  const loopList = [...validTestimonials, ...validTestimonials];

  // 2-second interval step-scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const timer = setInterval(() => {
      if (pausedRef.current || !track) return;
      const card = track.querySelector(".testimonial-card");
      if (!card) return;
      
      const step = card.offsetWidth + 24; // 24 is the gap
      track.scrollBy({ left: step, behavior: "smooth" });

      // Seamless infinite loop wrap-around
      setTimeout(() => {
        if (track && track.scrollLeft >= track.scrollWidth / 2) {
          track.style.scrollBehavior = "auto";
          track.scrollLeft -= track.scrollWidth / 2;
          void track.offsetHeight; // Force reflow
          track.style.scrollBehavior = "smooth";
        }
      }, 500); // Wait for scroll animation to complete
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  function scrollByCard(dir) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".testimonial-card");
    const amount = card ? card.offsetWidth + 20 : 300;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <section className="section testimonials testimonials--light">
      <div className="container">
        <div className="testimonials__head reveal">
          <div>
            <p className="eyebrow">Real Accounts</p>
            <h2>
              Reviews from <span className="italic">real traders.</span>
            </h2>
            <p className="testimonials__sub">Ratings and trading results shared directly by AURUM users.</p>
          </div>
          <div className="testimonials__nav">
            <button aria-label="Previous" onClick={() => scrollByCard(-1)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button aria-label="Next" onClick={() => scrollByCard(1)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        <div
          className="testimonials__track reveal"
          ref={trackRef}
          style={{ "--reveal-delay": "120ms" }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
          onTouchStart={() => { pausedRef.current = true; }}
          onTouchEnd={() => {
            // Give a small grace period after a touch/swipe before resuming
            // autoplay, so it doesn't fight the user's manual scroll.
            setTimeout(() => { pausedRef.current = false; }, 1500);
          }}
          onFocus={() => { pausedRef.current = true; }}
          onBlur={() => { pausedRef.current = false; }}
        >
          {loopList.map((t, i) => (
            <div
              className={`testimonial-card ${activeCard === i ? "is-active" : ""}`}
              key={`${t.name}-${i}`}
              onClick={() => setActiveCard(activeCard === i ? null : i)}
              tabIndex={0}
              role="button"
              aria-pressed={activeCard === i}
            >
              <div className="testimonial-card__top">
                <span className="testimonial-card__profit">{t.profit}</span>
                <Stars count={t.rating} />
              </div>
              <p className="testimonial-card__text">&ldquo;{t.text}&rdquo;</p>
              <div className="testimonial-card__foot">
                <span className="testimonial-card__avatar">{t.name.charAt(0)}</span>
                <div>
                  <span className="testimonial-card__name">{t.name}</span>
                  <span className="testimonial-card__joined">{t.joined}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
