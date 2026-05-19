/**
 * Section reveal animation using the Intersection Observer API.
 * Falls back gracefully when prefers-reduced-motion is set.
 * Placed in a <script> tag in BaseLayout so it runs once for all pages.
 */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          // Unobserve so the animation only fires once per element.
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
}

