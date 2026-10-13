import fs from "node:fs";
import path from "node:path";
import type { APIRoute } from "astro";
import { discoverContentPdfs } from "@lib/content-fs";
import { contentPdfUrl, getResolvedNav } from "@lib/nav";

const CONTENT_DIR = path.resolve("src/content");

export async function getStaticPaths() {
  const nav = await getResolvedNav();
  const aliases = new Map<string, string>();

  for (const rel of discoverContentPdfs()) {
    const [sectionSlug, subsectionDir, ...relativeParts] = rel.split("/");
    const subsection = nav
      .find((section) => section.slug === sectionSlug)
      ?.subsections.find((sub) => sub.dirName === subsectionDir);
    if (!subsection || subsection.conflict) continue;

    const href = contentPdfUrl(subsection.urlSlug, relativeParts.join("/"));
    const routePath = href.replace(/\.pdf$/, "");
    aliases.set(routePath, path.join(CONTENT_DIR, rel));
  }

  return [...aliases].map(([routePath, file]) => {
    const [slug, ...pdfPath] = routePath.slice(1).split("/");
    return {
      params: { slug, path: pdfPath.join("/") },
      props: { file },
    };
  });
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
