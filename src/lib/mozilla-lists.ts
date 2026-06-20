import fs from "node:fs";
import path from "node:path";
import { getCollection } from "astro:content";
import { getResolvedNav } from "@lib/nav";
import { groupPosts, type NamedList } from "@lib/lists";

function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

// The /mozilla entry surfaces its lists from two sources:
//   - Content collection posts under src/content/work/mozilla, grouped by their
//     list FOLDER (e.g. articles/, issue-notes/ — issue notes are plain markdown
//     entries that embed a PDF artifact, same pipeline as everything else). Each
//     list's "See all" links to /mozilla/<list>, served by [slug]/[...id].astro.
//   - "Projects": subfolders of src/pages/mozilla (each its own index.astro).
export async function getMozillaLists(): Promise<NamedList[]> {
  const lists: NamedList[] = [];

  const nav = await getResolvedNav();
  const workSection = nav.find((s) => s.slug === "work");
  const mozillaSub = workSection?.subsections.find(
    (s) => s.urlSlug === "mozilla",
  );
  if (workSection && mozillaSub) {
    const all = await getCollection(
      workSection.slug as any,
      ({ data }: any) => !data.draft,
    );
    const filtered = (all as any[]).filter(
      (e) => e.id.split("/")[0] === mozillaSub.dirName,
    );
    lists.push(
      ...groupPosts(
        workSection,
        mozillaSub,
        filtered,
        mozillaSub.rules.sortBy ?? "date",
      ),
    );
  }

  // Projects (subfolders of src/pages/mozilla, excluding the see-all route dir)
  const pagesDir = path.resolve("src/pages/mozilla");
  const projects = fs
    .readdirSync(pagesDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && e.name !== "all")
    .map((e) => ({ href: `/mozilla/${e.name}`, title: titleCase(e.name) }))
    .sort((a, b) => a.title.localeCompare(b.title));
  if (projects.length > 0) {
    lists.push({ key: "projects", heading: "Projects", items: projects });
  }

  return lists;
}
