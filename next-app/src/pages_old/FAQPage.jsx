"use client";
import { useState } from "react";
import PageHero from "./PageHero";
import Link from 'next/link';
import { faqCategories } from "./faqData";
import "../components/FAQ.css";
import "./shared-page.css";
import "./FAQPage.css";

export default function FAQPage() {
  const [openKey, setOpenKey] = useState(null);

  const jumpTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main>
      <PageHero
        eyebrow="FAQ"
        title="Questions serious traders actually ask."
        lead="No filler. No corporate answers. Just honest, direct responses from the team that built AURUM."
      />

      <div className="faq-cat-nav">
        <div className="container faq-cat-nav__inner">
          {faqCategories.map((cat) => (
            <button
              type="button"
              key={cat.id}
              className="faq-cat-nav__btn"
              onClick={() => jumpTo(cat.id)}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {faqCategories.map((cat) => (
        <section className="section section--tight faq-page-block" id={cat.id} key={cat.title}>
          <div className="container">
            <h2 className="faq-page-block__title reveal">{cat.title}</h2>
            <div className="faq-list faq-page-list">
              {cat.items.map((item) => {
                const key = `${cat.title}__${item.q}`;
                const isOpen = openKey === key;
                return (
                  <div
                    className={`faq-item${isOpen ? " is-open" : ""}`}
                    key={key}
                  >
                    <button
                      type="button"
                      className="faq-item__trigger"
                      onClick={() => setOpenKey(isOpen ? null : key)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-item__q">{item.q}</span>
                      <span className="faq-item__icon" aria-hidden="true"></span>
                    </button>
                    <div className="faq-item__panel">
                      <div className="faq-item__panel-inner">
                        <p>{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <section className="section section--tight faq-still-questions">
        <div className="container faq-still-questions__inner reveal">
          <p className="eyebrow">Still unsure?</p>
          <h2>We'd rather answer your question than lose your trust.</h2>
          <p>
            If something isn't covered here, reach out before you buy. Our team responds within a
            few hours and will give you a straight answer — even if that answer is that AURUM
            isn't the right fit for you.
          </p>
          <div className="cta-block__actions">
            <Link href="/contact" className="btn btn--gold">Ask the Team</Link>
            <Link href="/pricing" className="btn btn--ghost">View Plans</Link>
          </div>
        </div>
      </section>

      <section className="section section--tight cta-block">
        <div className="container cta-block__inner reveal">
          <p className="eyebrow">Ready</p>
          <h2>Questions answered. Time to act.</h2>
          <p>
            150+ traders didn't wait for the perfect moment. They set it up, let it run, and got
            out of their own way. You can too.
          </p>
          <div className="cta-block__actions">
            <Link href="/pricing" className="btn btn--gold">Get AURUM Now</Link>
            <Link href="/setup-guide" className="btn btn--ghost">See How It's Installed</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
