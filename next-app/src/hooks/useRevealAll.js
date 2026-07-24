import { useEffect } from "react";

let observer;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  return observer;
}

export default function useRevealAll(rootRef, deps = []) {
  useEffect(() => {
    const root = rootRef?.current || document;
    const els = root.querySelectorAll(".reveal");
    const obs = getObserver();
    els.forEach((el) => obs.observe(el));
    return () => els.forEach((el) => obs.unobserve(el));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootRef, ...deps]);
}
