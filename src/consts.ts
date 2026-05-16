import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Ayush Ranjan",
  DESCRIPTION: "Ayush Ranjan's personal website.",
  EMAIL: "ayshushus@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Ayush Ranjan",
  DESCRIPTION: "Ayush Ranjan's personal website.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

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
