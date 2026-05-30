import type { Metadata, Nav, Site, Socials } from "@types";

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

// Section / subsection display names and descriptions live in each folder's
// _config.md frontmatter under src/content. Slugs here drive routing and
// collection definitions only — edit titles/descriptions in MD.
export const NAV: Nav = [
  {
    slug: "work",
    subsections: [
      { slug: "jamesway" },
      { slug: "mozilla" },
      { slug: "healthlytics" },
      { slug: "grant-thornton" },
      { slug: "uoft" },
      { slug: "tueely" },
    ],
  },
  {
    slug: "make",
    subsections: [
      { slug: "soopy" },
      { slug: "pendi" },
      { slug: "botboy" },
      { slug: "typer" },
    ],
  },
  {
    slug: "know",
    subsections: [
      { slug: "ai" },
      { slug: "algorithms" },
      { slug: "frameworks" },
      { slug: "systems" },
    ],
  },
];

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
