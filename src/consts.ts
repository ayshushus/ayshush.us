import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Ayush Ranjan",
  DESCRIPTION: "Ayush Ranjan's personal website.",
  EMAIL: "ayshushus@gmail.com",
  NUM_POSTS_PER_SECTION_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Ayush Ranjan",
  DESCRIPTION: "Ayush Ranjan's personal website.",
};

// The site's sections and subsections are discovered automatically from the
// folder structure under src/content (see src/lib/content-fs.ts):
//   src/content/<section>/<subsection>/<posts>
// Just create a folder and it shows up on the site. Optional per-folder
// _config.md frontmatter controls the display title, description, ordering,
// URL slug, and rules — see src/lib/nav.ts. Nothing needs to be listed here.

export const SOCIALS: Socials = [
  {
    NAME: "GitHub",
    HREF: "https://github.com/ayshushus",
  },
  {
    NAME: "LinkedIn",
    HREF: "https://linkedin.com/in/ayshushus",
  },
  {
    NAME: "Website",
    HREF: "https://ayshush.us",
  },
];
