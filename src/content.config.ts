import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { NAV } from "./consts";

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  draft: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

const rulesSchema = z
  .object({
    pdfOnNumericName: z.boolean().optional(),
    sortBy: z.enum(["date", "name", "numeric"]).optional(),
    hidden: z.boolean().optional(),
  })
  .optional();

const subsectionConfigSchema = z.object({
  slug: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  rules: rulesSchema,
});

const sectionCollections = Object.fromEntries(
  NAV.map((section) => [
    section.slug,
    defineCollection({
      loader: glob({
        pattern: ["**/*.{md,mdx}", "!**/_*.{md,mdx}"],
        base: `./src/content/${section.slug}`,
      }),
      schema: postSchema,
    }),
  ]),
);

export const collections = {
  ...sectionCollections,
  subsectionConfigs: defineCollection({
    loader: glob({
      pattern: "**/_config.md",
      base: "./src/content",
      generateId: ({ entry }) => entry.replace(/\/_config\.md$/, ""),
    }),
    schema: subsectionConfigSchema,
  }),
};
