import fs from "node:fs";
import path from "node:path";
import { postHref, sortPosts } from "@lib/nav";
import type { ResolvedSection, ResolvedSubsection, SortBy } from "@types";

// A single card on any listing page.
export type ListItem = {
  href: string;
  title: string;
  description?: string;
  external?: boolean;
};

// A named list within a subsection (e.g. Mozilla's "Issue notes", JamesWay's
// "Notes"). `key` is the list folder's url slug — its page lives at
// /<subsection>/<key>, and posts at /<subsection>/<key>/<post>.
export type NamedList = {
  key: string; // list folder name (== url slug); "" for a flat, single list
  heading: string; // display label
  items: ListItem[];
};

// Lists are collapsed (2 items + "See all") once they exceed this many items.
// The same threshold gates whether a single, uncollapsed list shows a search box.
export const LIST_COLLAPSE_THRESHOLD = 3;

// True when a slug is owned by a real static page under src/pages (e.g. mozilla/).
// Such slugs render their own listing + see-all pages, so the generic routes skip
// them to avoid emitting the same URL twice.
export function hasStaticPage(slug: string): boolean {
  const dir = path.resolve("src/pages", slug);
  return (
    fs.existsSync(path.join(dir, "index.astro")) || fs.existsSync(`${dir}.astro`)
  );
}

function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

type Post = {
  id: string;
  data: { title: string; description: string; date: Date; order?: number };
};

// Group a subsection's posts by the list FOLDER they live in. Post ids are
// section-relative ("<subsection>/<...rest>"), so a post nested in a list folder
// has 3+ segments and its list is the second segment.
//
//   no folders            → one flat list (key "")            — single-list page
//   posts in subfolders   → one group per folder              — multi-list page
//
// Group order comes from each list folder's _config.md (`order`, smaller = higher,
// resolved into sub.lists); the heading comes from its `title`. Posts that sit
// directly in a subsection alongside folders fall into an untitled leading list.
export function groupPosts(
  section: ResolvedSection,
  sub: ResolvedSubsection,
  posts: Post[],
  sortBy: SortBy = "date",
): NamedList[] {
  const byFolder = new Map<string, Post[]>(); // "" => posts directly in the subsection
  for (const p of posts) {
    const segments = String(p.id).split("/");
    const folder = segments.length >= 3 ? segments[1] : "";
    if (!byFolder.has(folder)) byFolder.set(folder, []);
    byFolder.get(folder)!.push(p);
  }

  const toItem = (post: Post): ListItem => {
    const href = postHref(section.slug, sub, post.id);
    return {
      href,
      title: post.data.title,
      description: post.data.description,
      external: href.endsWith(".pdf"),
    };
  };

  // Flat list — no list folders.
  if (byFolder.size === 1 && byFolder.has("")) {
    return [
      { key: "", heading: "", items: sortPosts(byFolder.get("")!, sortBy).map(toItem) },
    ];
  }

  const metaOf = (dir: string) => sub.lists.find((l) => l.dirName === dir);
  const groups = Array.from(byFolder.entries()).map(([dir, ps]) => ({
    key: dir, // folder name == list url slug; "" for direct posts
    heading: dir ? metaOf(dir)?.name ?? titleCase(dir) : "",
    order: (dir ? metaOf(dir)?.order : undefined) ?? Number.MAX_SAFE_INTEGER,
    items: sortPosts(ps, sortBy).map(toItem),
  }));
  groups.sort((a, b) => a.order - b.order || a.heading.localeCompare(b.heading));
  return groups.map(({ key, heading, items }) => ({ key, heading, items }));
}
