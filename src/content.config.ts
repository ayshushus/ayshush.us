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

export const collections = Object.fromEntries(
  NAV.map((section) => [
    section.slug,
    defineCollection({
      loader: glob({
        pattern: "**/*.{md,mdx}",
        base: `./src/content/${section.slug}`,
      }),
      schema: postSchema,
    }),
  ]),
);
