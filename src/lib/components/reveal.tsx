"use client";
import { useEffect } from "react";
export default function Reveal() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.animate(
              [
                { opacity: 0.35, transform: "translateY(25px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 750, easing: "cubic-bezier(.2,.7,.2,1)" },
            );
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}
