/**
 * Converts Strapi v5 rich text blocks (type: "blocks") to an HTML string.
 *
 * Strapi's block editor returns a JSON array of block nodes instead of raw HTML.
 * This converter handles every block type the editor supports so the output can be
 * safely passed to DOMPurify + set:html without losing content.
 */

// ---------------------------------------------------------------------------
// Inline node types
// ---------------------------------------------------------------------------

type TextNode = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

type LinkNode = {
  type: "link";
  url: string;
  children: InlineNode[];
};

type InlineNode = TextNode | LinkNode;

// ---------------------------------------------------------------------------
// Block node types
// ---------------------------------------------------------------------------

type ParagraphBlock = { type: "paragraph"; children: InlineNode[] };
type HeadingBlock = { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; children: InlineNode[] };
type ListItemBlock = { type: "list-item"; children: InlineNode[] };
type ListBlock = { type: "list"; format: "ordered" | "unordered"; children: ListItemBlock[] };
type QuoteBlock = { type: "quote"; children: InlineNode[] };
type CodeBlock = { type: "code"; language?: string; children: InlineNode[] };
type ImageBlock = {
  type: "image";
  image: {
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
  };
};

type StrapiBlock =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | QuoteBlock
  | CodeBlock
  | ImageBlock;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderInline(nodes: InlineNode[]): string {
  return nodes
    .map((node) => {
      if (node.type === "link") {
        const inner = renderInline(node.children);
        return `<a href="${escapeHtml(node.url)}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
      }

      // text node — apply formatting marks in a stable, nestable order
      let html = escapeHtml(node.text);
      if (node.code) html = `<code>${html}</code>`;
      if (node.bold) html = `<strong>${html}</strong>`;
      if (node.italic) html = `<em>${html}</em>`;
      if (node.underline) html = `<u>${html}</u>`;
      if (node.strikethrough) html = `<s>${html}</s>`;
      return html;
    })
    .join("");
}

// ---------------------------------------------------------------------------
// Block renderer
// ---------------------------------------------------------------------------

function renderBlock(block: StrapiBlock): string {
  switch (block.type) {
    case "paragraph":
      return `<p>${renderInline(block.children)}</p>`;

    case "heading":
      return `<h${block.level}>${renderInline(block.children)}</h${block.level}>`;

    case "list": {
      const tag = block.format === "ordered" ? "ol" : "ul";
      const items = block.children
        .map((item) => `<li>${renderInline(item.children)}</li>`)
        .join("");
      return `<${tag}>${items}</${tag}>`;
    }

    case "quote":
      return `<blockquote>${renderInline(block.children)}</blockquote>`;

    case "code": {
      const lang = block.language ? ` class="language-${escapeHtml(block.language)}"` : "";
      const code = renderInline(block.children);
      return `<pre><code${lang}>${code}</code></pre>`;
    }

    case "image": {
      const { url, alternativeText, width, height } = block.image;
      const alt = escapeHtml(alternativeText ?? "");
      const dims = width && height ? ` width="${width}" height="${height}"` : "";
      return `<img src="${escapeHtml(url)}" alt="${alt}"${dims} loading="lazy" />`;
    }

    default:
      // Unknown future block types are silently skipped rather than crashing the build.
      return "";
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Converts a Strapi v5 blocks array to an HTML string.
 * Returns an empty string when the input is nullish or not an array
 * (e.g. legacy string content or missing field).
 */
export function strapiBlocksToHtml(blocks: unknown): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";
  return (blocks as StrapiBlock[]).map(renderBlock).join("\n");
}

