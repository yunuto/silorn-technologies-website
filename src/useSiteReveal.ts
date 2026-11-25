import { useEffect } from "react";
import "./site-reveal.css";

export function useSiteReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = document.querySelectorAll("[data-site-reveal]:not([data-site-revealed])");
    if (targets.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-site-revealed", "");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -13% 0px", threshold: .12 });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
}
