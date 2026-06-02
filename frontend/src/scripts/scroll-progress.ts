const progressBar = document.querySelector<HTMLElement>("[data-scroll-progress]");
const scrollTopButton = document.querySelector<HTMLButtonElement>("[data-scroll-top]");

if (progressBar) {
  const bar = progressBar;
  const root = document.documentElement;
  let rafId = 0;
  let scrollEndTimer = 0;

  function progress() {
    const maxScroll = root.scrollHeight - root.clientHeight;
    if (maxScroll <= 0) return 0;

    return Math.min(1, Math.max(0, root.scrollTop / maxScroll));
  }

  function update() {
    rafId = 0;
    const currentProgress = progress();
    bar.style.transform = `scaleX(${currentProgress})`;

    if (scrollTopButton) {
      const isVisible = currentProgress >= 1 / 3;
      scrollTopButton.classList.toggle("scroll-to-top--visible", isVisible);
      scrollTopButton.setAttribute("aria-hidden", String(!isVisible));
      scrollTopButton.tabIndex = isVisible ? 0 : -1;
    }
  }

  function queueUpdate() {
    if (rafId) return;
    rafId = requestAnimationFrame(update);
  }

  function markScrolling() {
    root.classList.add("is-scrolling");
    window.clearTimeout(scrollEndTimer);
    scrollEndTimer = window.setTimeout(() => {
      root.classList.remove("is-scrolling");
    }, 120);
  }

  function handleScroll() {
    markScrolling();
    queueUpdate();
  }

  update();
  const resizeObserver = new ResizeObserver(queueUpdate);
  resizeObserver.observe(document.body);

  scrollTopButton?.addEventListener("click", () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", queueUpdate);
}
