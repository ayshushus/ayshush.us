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

export const NAV: Nav = [
  {
    slug: "experience",
    name: "experience",
    description: "Roles and places I've worked.",
    subsections: [
      { slug: "jamesway", name: "JamesWay" },
      { slug: "mozilla", name: "Mozilla" },
      { slug: "healthlytics", name: "Healthlytics" },
      { slug: "grant-thornton", name: "Grant Thornton" },
      { slug: "uoft", name: "UofT" },
      { slug: "tueely", name: "Tueely" },
    ],
  },
  {
    slug: "projects",
    name: "projects",
    description: "Things I've built.",
    subsections: [
      { slug: "soopy", name: "Soopy" },
      { slug: "pendi", name: "Pendi" },
      { slug: "botboy", name: "Botboy" },
      { slug: "typer", name: "Typer" },
    ],
  },
  {
    slug: "blog",
    name: "blog",
    description: "Notes I keep on things I read and solve.",
    subsections: [
      { slug: "leetcode", name: "LeetCode" },
      { slug: "books", name: "Books" },
      { slug: "papers", name: "Papers" },
    ],
  },
  {
    slug: "research",
    name: "research",
    description: "Topics I'm digging into.",
    subsections: [
      { slug: "ai", name: "AI" },
      { slug: "algorithms", name: "Algorithms" },
      { slug: "frameworks", name: "Frameworks" },
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
