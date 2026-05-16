import rss from "@astrojs/rss";
import { SITE, NAV } from "@consts";
import { getCollection } from "astro:content";

export async function GET(context) {
  const groups = await Promise.all(
    NAV.map(async (section) => {
      const entries = await getCollection(section.slug, (e) => !e.data.draft);
      return entries;
    }),
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
      link: `/${item.collection}/${item.id}/`,
    })),
  });
}
