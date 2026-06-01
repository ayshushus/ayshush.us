import { getCollection } from "astro:content";
import { discoverSectionSlugs, discoverSubsectionSlugs } from "@lib/content-fs";
import type {
  ConflictClaim,
  ResolvedSection,
  ResolvedSubsection,
  SortBy,
  SubsectionRules,
} from "@types";

type ConfigData = {
  slug?: string;
  title?: string;
  description?: string;
  order?: number;
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

function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function getResolvedNav(): Promise<ResolvedSection[]> {
  const configs = await loadConfigs();
  const claims = new Map<string, ConflictClaim[]>();
  const claim = (slug: string, c: ConflictClaim) => {
    if (!claims.has(slug)) claims.set(slug, []);
    claims.get(slug)!.push(c);
  };

  const sections: ResolvedSection[] = discoverSectionSlugs()
    .map((sectionSlug) => {
      const sectionCfg = configs.get(sectionSlug) ?? {};
      const sectionName = sectionCfg.title ?? titleCase(sectionSlug);
      claim(sectionSlug, {
        label: `Section "${sectionName}"`,
        source: `src/content/${sectionSlug}/_config.md`,
      });

      const subsections: ResolvedSubsection[] = discoverSubsectionSlugs(
        sectionSlug,
      )
        .map((dirName) => {
          const cfg = configs.get(`${sectionSlug}/${dirName}`) ?? {};
          const urlSlug = cfg.slug ?? dirName;
          const rules: SubsectionRules = cfg.rules ?? {};
          const name = cfg.title ?? titleCase(dirName);
          claim(urlSlug, {
            label: `Subsection "${name}" in ${sectionName}`,
            source: `src/content/${sectionSlug}/${dirName}/_config.md`,
          });
          return {
            dirName,
            urlSlug,
            name,
            description: cfg.description,
            order: cfg.order ?? 0,
            url: `/${urlSlug}`,
            rules,
          };
        })
        .filter((sub) => !sub.rules.hidden)
        .sort((a, b) => b.order - a.order);

      return {
        slug: sectionSlug,
        name: sectionName,
        description: sectionCfg.description,
        order: sectionCfg.order ?? 0,
        url: `/${sectionSlug}`,
        subsections,
      };
    })
    .sort((a, b) => b.order - a.order);

  for (const section of sections) {
    const list = claims.get(section.slug);
    if (list && list.length > 1) section.conflict = list;
    for (const sub of section.subsections) {
      const subList = claims.get(sub.urlSlug);
      if (subList && subList.length > 1) sub.conflict = subList;
    }
  }

  return sections;
}

export function sortPosts<T extends { id: string; data: { date: Date; order?: number } }>(
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
      copy.sort((a, b) => {
        const orderDiff = (b.data.order ?? 0) - (a.data.order ?? 0);
        if (orderDiff !== 0) return orderDiff;
        return b.data.date.valueOf() - a.data.date.valueOf();
      });
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
  return `/${sub.urlSlug}/${localId}`;
}

export function entryHref(
  entry: { collection: string; id: string },
  nav: ResolvedSection[],
): string {
  const section = nav.find((s) => s.slug === entry.collection);
  if (!section) return `/${entry.id}`;
  const dirName = String(entry.id).split("/")[0];
  const sub = section.subsections.find((s) => s.dirName === dirName);
  if (!sub) return `/${entry.id}`;
  return postHref(section.slug, sub, String(entry.id));
}
