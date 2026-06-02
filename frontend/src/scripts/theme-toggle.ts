const DARK = "portfolio-dark";
const LIGHT = "portfolio-light";
const STORAGE_KEY = "portfolio-theme";

function applyTheme(theme: string) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEY, theme);
  document.querySelectorAll<HTMLElement>(".theme-toggle").forEach((btn) => {
    btn.querySelector<SVGElement>(".icon-sun")?.classList.toggle("hidden", theme !== DARK);
    btn.querySelector<SVGElement>(".icon-moon")?.classList.toggle("hidden", theme === DARK);
  });
}

const saved = localStorage.getItem(STORAGE_KEY);
applyTheme(saved === LIGHT ? LIGHT : DARK);

document.querySelectorAll<HTMLButtonElement>(".theme-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === DARK ? LIGHT : DARK);
  });
});
