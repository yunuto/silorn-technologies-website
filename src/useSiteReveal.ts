import { useEffect } from "react";
import "./site-reveal.css";

export function useSiteReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = document.querySelectorAll("[data-site-reveal]");
    if (targets.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.removeAttribute("data-site-pending");
          entry.target.setAttribute("data-site-revealed", "");
        } else if (entry.boundingClientRect.top > 0) {
          entry.target.removeAttribute("data-site-revealed");
          entry.target.setAttribute("data-site-pending", "");
        }
      }
    }, { rootMargin: "0px 0px -13% 0px", threshold: .12 });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
}
