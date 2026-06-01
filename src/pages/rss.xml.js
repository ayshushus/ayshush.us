import rss from "@astrojs/rss";
import { SITE } from "@consts";
import { getCollection } from "astro:content";
import { entryHref, getResolvedNav } from "@lib/nav";

export async function GET(context) {
  const nav = await getResolvedNav();

  const groups = await Promise.all(
    nav.map((section) => getCollection(section.slug, (e) => !e.data.draft)),
  );

  const items = groups
    .flat()
    .sort(
      (a, b) =>
        new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf(),
    );

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.date,
      link: entryHref(item, nav),
    })),
  });
}
