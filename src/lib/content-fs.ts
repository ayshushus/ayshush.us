import fs from "node:fs";
import path from "node:path";

// Filesystem-driven discovery of the content tree. This is the single source of
// truth for which sections/subsections exist — there is no manual NAV list.
// Sections are the top-level folders under src/content; subsections are the
// folders inside each section. Display titles/descriptions/order/slug/rules all
// live in each folder's _config.md (see src/lib/nav.ts).
//
// Kept dependency-free (no astro:content import) so it can be used from
// src/content.config.ts, which runs before the content layer is available.

const CONTENT_DIR = path.resolve("src/content");

function dirNamesIn(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export function discoverSectionSlugs(): string[] {
  return dirNamesIn(CONTENT_DIR).sort();
}

export function discoverSubsectionSlugs(sectionSlug: string): string[] {
  return dirNamesIn(path.join(CONTENT_DIR, sectionSlug)).sort();
}

// Folders inside a subsection are its named lists (each holds posts). A
// subsection with no subfolders is a single flat list. The conventional
// `assets/` folder (co-located PDFs and other binaries, see discoverContentPdfs)
// is not a list.
export function discoverListSlugs(
  sectionSlug: string,
  subsectionDir: string,
): string[] {
  return dirNamesIn(path.join(CONTENT_DIR, sectionSlug, subsectionDir))
    .filter((name) => name !== "assets")
    .sort();
}

// Every PDF co-located inside the content tree, as a path relative to
// src/content (posix, forward slashes). PDFs live next to the posts that embed
// them — e.g. src/content/experience/mozilla/issue-notes/assets/3291.pdf — so a
// section's content stays self-contained in one directory. They are served by
// the /pdfs/[...path] endpoint and referenced from a post's `pdf` frontmatter.
export function discoverContentPdfs(): string[] {
  const out: string[] = [];
  const walk = (dir: string, rel: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const childRel = rel ? `${rel}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), childRel);
      } else if (entry.isFile() && entry.name.endsWith(".pdf")) {
        out.push(childRel);
      }
    }
  };
  if (fs.existsSync(CONTENT_DIR)) walk(CONTENT_DIR, "");
  return out.sort();
}
