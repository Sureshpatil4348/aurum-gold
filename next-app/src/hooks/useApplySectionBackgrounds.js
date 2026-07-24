import { useLayoutEffect } from "react";

const THEME_CLASSES = ["bgv-navy", "bgv-white", "bgv-grey"];
const LEGACY_CLASSES = ["section--grey", "section--white"];

/**
 * Walks every top-level ".section" element inside the given container (in
 * document order) and assigns it a background theme class (bgv-navy /
 * bgv-white / bgv-grey) based on the active variation's 5-slot sequence.
 * The sequence repeats for pages with more than 5 sections.
 *
 * This never touches markup, content, or component internals — only the
 * background/text theme classes on the outer <section> wrapper.
 */
export default function useApplySectionBackgrounds(containerRef, sequence, deps = []) {
  useLayoutEffect(() => {
    const root = containerRef?.current || document;
    const sections = Array.from(root.querySelectorAll(".section"));

    sections.forEach((el, i) => {
      const theme = sequence[i % sequence.length];
      el.classList.remove(...THEME_CLASSES, ...LEGACY_CLASSES);
      el.classList.add(`bgv-${theme}`);
      el.dataset.bgSlot = String((i % sequence.length) + 1);
      el.dataset.bgTheme = theme;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
