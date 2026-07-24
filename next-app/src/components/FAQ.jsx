"use client";
import { useState } from "react";
import { faqs } from "../data/content";
import Link from 'next/link';
import "./FAQ.css";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(-1);
  const previewFaqs = faqs.slice(0, 5);

  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">FAQ</p>
          <h2>Questions, answered.</h2>
        </div>

        <div className="faq-list">
          {previewFaqs.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                className={`faq-item${isOpen ? " is-open" : ""}`}
                key={item.q}
              >
                <button
                  type="button"
                  className="faq-item__trigger"
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
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

        <div className="faq-view-all">
          <Link href="/faq#getting-started" className="btn btn--ghost">View All FAQs</Link>
        </div>
      </div>
    </section>
  );
}
