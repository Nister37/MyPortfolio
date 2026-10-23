const CLOSE_ANIMATION_MS = 130;
const OPEN_ANIMATION_MS = 170;
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;

  const summary = event.target.closest("summary");
  if (!summary) return;

  const details = summary.parentElement;
  if (!(details instanceof HTMLDetailsElement)) return;
  if (details.classList.contains("skill-row")) return;

  if (details.classList.contains("details-closing")) {
    event.preventDefault();
    return;
  }

  if (!details.open) return;

  event.preventDefault();
  details.classList.remove("details-opening");
  details.classList.add("details-closing");

  window.setTimeout(
    () => {
      details.open = false;
      details.classList.remove("details-closing");
    },
    prefersReducedMotion.matches ? 0 : CLOSE_ANIMATION_MS,
  );
});

document.addEventListener(
  "toggle",
  (event) => {
    const details = event.target;
    if (!(details instanceof HTMLDetailsElement) || !details.open) return;
    if (details.classList.contains("skill-row")) return;

    details.classList.remove("details-closing");
    details.classList.add("details-opening");

    window.setTimeout(
      () => {
        details.classList.remove("details-opening");
      },
      prefersReducedMotion.matches ? 0 : OPEN_ANIMATION_MS,
    );
  },
  true,
);

export {};
