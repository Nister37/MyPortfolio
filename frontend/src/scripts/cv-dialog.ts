const overlay = document.getElementById("cv-dialog");

if (overlay) {
  const open = () => {
    overlay.hidden = false;
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    overlay.hidden = true;
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  document
    .querySelectorAll<HTMLButtonElement>("[data-cv-trigger]")
    .forEach((btn) => {
      btn.addEventListener("click", open);
    });

  overlay.querySelectorAll<HTMLElement>("[data-cv-close]").forEach((el) => {
    el.addEventListener("click", close);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) close();
  });
}
