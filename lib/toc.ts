/**
 * Table-of-contents + reading-time helpers for blog posts.
 *
 * The post body is markdown, so headings get read straight off the source
 * rather than out of the DOM: the page needs the list on the server, before
 * anything renders. `slugify` is shared with lib/markdown.tsx so the ids the
 * renderer stamps on <h2>/<h3> match the anchors listed here.
 *
 * Deliberately no de-duplication counter. Both sides would have to walk the
 * document in exactly the same order for a counter to line up, and a post with
 * two identically-worded headings is a far smaller problem than a table of
 * contents whose links quietly stop resolving.
 */

export type Heading = {
  id: string;
  text: string;
  /** 2 = section, 3 = subsection. Deeper levels are ignored. */
  level: 2 | 3;
};

/** Combining accents left behind by NFD normalisation. */
const COMBINING = /[̀-ͯ]/g;

/** Strips inline markdown (`**b**`, `` `c` ``, `[t](u)`, `_i_`) down to plain text. */
function stripInline(md: string): string {
  return md
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // images -> alt text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> label
    .replace(/`([^`]*)`/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** URL-safe id. Handles Serbian latin (c, c, z, s, dj) so `sr` posts get real anchors. */
export function slugify(text: string): string {
  return text
    .replace(/đ/g, "d") // đ has no NFD decomposition
    .replace(/Đ/g, "D") // Đ
    .normalize("NFD")
    .replace(COMBINING, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Every `##` / `###` in the source, in document order. Fenced code blocks are
 * skipped so a `# comment` inside a snippet never becomes a TOC entry.
 */
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  let fence: string | null = null;

  for (const line of markdown.split("\n")) {
    const fenceMatch = /^\s{0,3}(```+|~~~+)/.exec(line);
    if (fenceMatch) {
      if (fence === null) fence = fenceMatch[1][0];
      else if (fenceMatch[1][0] === fence) fence = null;
      continue;
    }
    if (fence !== null) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const text = stripInline(match[2]);
    const id = slugify(text);
    if (!text || !id) continue;

    headings.push({ id, text, level: match[1].length as 2 | 3 });
  }

  return headings;
}

/** Rounded-up minutes at 200 wpm, floored at 1. Code and URLs don't count. */
export function readingMinutes(markdown: string): number {
  const prose = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\]\([^)]*\)/g, "]")
    .replace(/https?:\/\/\S+/g, " ");

  const words = prose.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  return Math.max(1, Math.ceil(words / 200));
}
