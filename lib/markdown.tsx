import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/toc";

/** Flattens a rendered heading back to plain text so it can be slugified. */
function textOf(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

/**
 * Post/policy body renderer.
 *
 * h2 and h3 get an id derived from their own text, using the same `slugify` as
 * lib/toc.ts — that pairing is what makes the table of contents on a blog post
 * link to anything. Nothing else about the output is customised; the look comes
 * from `.prose` in app/styles/pages.css.
 */
export function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
        h3: ({ children }) => <h3 id={slugify(textOf(children))}>{children}</h3>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
