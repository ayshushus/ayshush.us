import { getCollection } from "astro:content";
import { NAV } from "@consts";
import type {
  ResolvedSection,
  ResolvedSubsection,
  SortBy,
  SubsectionRules,
} from "@types";

type ConfigData = {
  slug?: string;
  title?: string;
  description?: string;
  rules?: SubsectionRules;
};

async function loadConfigs(): Promise<Map<string, ConfigData>> {
  const map = new Map<string, ConfigData>();
  const entries = await getCollection("subsectionConfigs" as any);
  for (const entry of entries as any[]) {
    const key = String(entry.id).replace(/\/_config$/, "");
    map.set(key, entry.data as ConfigData);
  }
  return map;
  
}

export async function getResolvedNav(): Promise<ResolvedSection[]> {
  const configs = await loadConfigs();

  return NAV.map((section) => {
    const subsections: ResolvedSubsection[] = section.subsections
      .map((sub) => {
        const cfg = configs.get(`${section.slug}/${sub.slug}`) ?? {};
        const urlSlug = cfg.slug ?? sub.slug;
        const rules: SubsectionRules = cfg.rules ?? {};
        return {
          dirName: sub.slug,
          urlSlug,
          name: cfg.title ?? sub.name,
          description: cfg.description,
          url: `/${section.slug}/${urlSlug}`,
          rules,
        };
      })
      .filter((sub) => !sub.rules.hidden);

    return {
      slug: section.slug,
      name: section.name,
      description: section.description,
      url: `/${section.slug}`,
      subsections,
    };
  });
}

export function sortPosts<T extends { id: string; data: { date: Date } }>(
  posts: T[],
  by: SortBy = "date",
): T[] {
  const copy = posts.slice();
  switch (by) {
    case "name":
      copy.sort((a, b) => a.id.localeCompare(b.id));
      return copy;
    case "numeric":
      copy.sort((a, b) => numericKey(a.id) - numericKey(b.id));
      return copy;
    case "date":
    default:
      copy.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
      return copy;
  }
}

function numericKey(id: string): number {
  const last = id.split("/").pop() ?? id;
  const n = parseInt(last, 10);
  return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY;
}

export function isNumericName(id: string): boolean {
  const last = id.split("/").pop() ?? id;
  return /^\d+$/.test(last);
}

export function postHref(
  sectionSlug: string,
  sub: ResolvedSubsection,
  postId: string,
): string {
  const localId = postId.startsWith(`${sub.dirName}/`)
    ? postId.slice(sub.dirName.length + 1)
    : postId;
  if (sub.rules.pdfOnNumericName && isNumericName(localId)) {
    return `/pdfs/${sectionSlug}/${sub.dirName}/${localId}.pdf`;
  }
  return `/${sectionSlug}/${sub.urlSlug}/${localId}`;
}

export function entryHref(
  entry: { collection: string; id: string },
  nav: ResolvedSection[],
): string {
  const section = nav.find((s) => s.slug === entry.collection);
  if (!section) return `/${entry.collection}/${entry.id}`;
  const dirName = String(entry.id).split("/")[0];
  const sub = section.subsections.find((s) => s.dirName === dirName);
  if (!sub) return `/${entry.collection}/${entry.id}`;
  return postHref(section.slug, sub, String(entry.id));
}
