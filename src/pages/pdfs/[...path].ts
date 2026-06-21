import fs from "node:fs";
import path from "node:path";
import type { APIRoute } from "astro";
import { discoverContentPdfs } from "@lib/content-fs";

// Serves PDFs that live inside the content tree (src/content/**/assets/*.pdf) so
// a section's content — markdown notes and their PDF artifacts — stays in one
// directory. The URL mirrors the file's path within src/content, e.g.
//   src/content/experience/mozilla/issue-notes/assets/3291.pdf
//   → /pdfs/experience/mozilla/issue-notes/assets/3291.pdf
// Posts reference these via a relative `pdf` frontmatter resolved by
// resolvePdfUrl() in src/lib/nav.ts.
const CONTENT_DIR = path.resolve("src/content");

export function getStaticPaths() {
  return discoverContentPdfs().map((rel) => ({
    params: { path: rel },
    props: { file: path.join(CONTENT_DIR, rel) },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const body = new Uint8Array(fs.readFileSync((props as { file: string }).file));
  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
