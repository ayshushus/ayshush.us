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
