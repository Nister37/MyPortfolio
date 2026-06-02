const progressBar = document.querySelector<HTMLElement>("[data-scroll-progress]");

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
    bar.style.transform = `scaleX(${progress()})`;
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
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", queueUpdate);
}
