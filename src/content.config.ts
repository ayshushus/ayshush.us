import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { discoverSectionSlugs } from "./lib/content-fs";

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  order: z.number().optional(),
  draft: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  // Optional PDF artifact served from /public, kept in a per-section assets
  // folder (e.g. "/mozilla/assets/3291.pdf"). When set, the post's page embeds
  // the PDF full-width with open/download controls.
  pdf: z.string().optional(),
  // Optional external source link (e.g. a GitHub issue) shown as a button.
  sourceUrl: z.string().optional(),
});

const rulesSchema = z
  .object({
    pdfOnNumericName: z.boolean().optional(),
    sortBy: z.enum(["date", "name", "numeric"]).optional(),
    hidden: z.boolean().optional(),
  })
  .optional();

// Shared by subsection AND list folders — a list folder's _config.md uses the
// same fields (title / order / slug / description) one level deeper.
const subsectionConfigSchema = z.object({
  slug: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  order: z.number().optional(),
  rules: rulesSchema,
});

const sectionCollections = Object.fromEntries(
  discoverSectionSlugs().map((slug) => [
    slug,
    defineCollection({
      loader: glob({
        pattern: ["**/*.{md,mdx}", "!**/_*.{md,mdx}"],
        base: `./src/content/${slug}`,
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
