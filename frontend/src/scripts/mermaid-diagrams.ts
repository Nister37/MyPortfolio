import mermaid from "mermaid";

const selector = ".prose-portfolio pre.mermaid";
const sourceByDiagram = new WeakMap<HTMLElement, string>();

function currentTheme(): "default" | "dark" {
  return document.documentElement.getAttribute("data-theme") === "portfolio-light"
    ? "default"
    : "dark";
}

async function renderDiagrams() {
  const diagrams = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (diagrams.length === 0) return;

  for (const diagram of diagrams) {
    const source = sourceByDiagram.get(diagram) ?? diagram.textContent ?? "";
    sourceByDiagram.set(diagram, source);
    diagram.removeAttribute("data-processed");
    diagram.textContent = source;
  }

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: currentTheme(),
  });

  await mermaid.run({ nodes: diagrams, suppressErrors: true });
}

let pendingRender = Promise.resolve();

function queueRender() {
  pendingRender = pendingRender
    .then(renderDiagrams)
    .catch((error) => console.error("Unable to render Mermaid diagram.", error));
}

queueRender();

const themeObserver = new MutationObserver((mutations) => {
  if (mutations.some((mutation) => mutation.attributeName === "data-theme")) {
    queueRender();
  }
});

themeObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-theme"],
});
