"use client";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import useRevealAll from "../hooks/useRevealAll";
import useApplySectionBackgrounds from "../hooks/useApplySectionBackgrounds";

// Approved background arrangement (Variation 1): Navy → White → Navy → White → Navy.
// Repeats for pages with more than 5 top-level sections.
const BG_SEQUENCE = ["navy", "white", "navy", "white", "navy"];

export default function ClientLayout({ children }) {
  const rootRef = useRef(null);
  const path = usePathname();
  useRevealAll(rootRef, [path]);
  useApplySectionBackgrounds(rootRef, BG_SEQUENCE, [path]);

  return (
    <div ref={rootRef} key={path} className="app-root-wrapper" style={{ overflowX: "hidden", maxWidth: "100%", width: "100%" }}>
      <Navbar />
      {children}
      <Footer />
      <BackToTop />
    </div>
  );
}
