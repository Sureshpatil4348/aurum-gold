"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroCarouselSlides } from "../data/content";
import "./HeroCarousel.css";

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = heroCarouselSlides.length;

  const goTo = useCallback((i) => {
    setIndex(((i % total) + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => goTo(index + 1), 5200);
    return () => clearInterval(id);
  }, [index, paused, goTo]);

  const slide = heroCarouselSlides[index];

  return (
    <div
      className="hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-carousel__frame">
        {heroCarouselSlides.map((s, i) => (
          <img
            key={s.image}
            src={s.image}
            alt={s.alt || s.title}
            className={`hero-carousel__img ${i === index ? "is-active" : ""}`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}

        <button
          type="button"
          className="hero-carousel__arrow hero-carousel__arrow--prev"
          aria-label="Previous slide"
          onClick={() => goTo(index - 1)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="hero-carousel__arrow hero-carousel__arrow--next"
          aria-label="Next slide"
          onClick={() => goTo(index + 1)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="hero-carousel__body" key={slide.title}>
        <h3 className="hero-carousel__title">{slide.title}</h3>
        <p className="hero-carousel__desc">{slide.description}</p>
        {slide.cta && (
          <a href={slide.cta.href} className="hero-carousel__cta">
            {slide.cta.label}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>

      <div className="hero-carousel__dots">
        {heroCarouselSlides.map((s, i) => (
          <button
            key={s.image}
            className={`hero-carousel__dot ${i === index ? "is-active" : ""}`}
            aria-label={`Show slide ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
