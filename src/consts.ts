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
    slug: "work",
    name: "Work",
    description: "Roles and places I've worked.",
    subsections: [
      { slug: "jamesway", name: "JamesWay", description: "Software engineering." },
      { slug: "mozilla", name: "Mozilla", description: "Software engineering." },
      { slug: "healthlytics", name: "Healthlytics", description: "Software engineering." },
      { slug: "grant-thornton", name: "Grant Thornton", description: "Software engineering." },
      { slug: "uoft", name: "UofT", description: "Teaching and research." },
      { slug: "tueely", name: "Tueely", description: "Software engineering." },
    ],
  },
  {
    slug: "make",
    name: "Make",
    description: "Things I've built.",
    subsections: [
      { slug: "soopy", name: "Soopy", description: "A thing I built." },
      { slug: "pendi", name: "Pendi", description: "A thing I built." },
      { slug: "botboy", name: "Botboy", description: "A thing I built." },
      { slug: "typer", name: "Typer", description: "A thing I built." },
    ],
  },
  {
    slug: "know",
    name: "Know",
    description: "Topics I'm digging into.",
    subsections: [
      { slug: "ai", name: "AI", description: "Models, agents, and tooling." },
      { slug: "algorithms", name: "Algorithms", description: "Patterns and proofs." },
      { slug: "frameworks", name: "Frameworks", description: "Stacks and primitives." },
      { slug: "systems", name: "Systems", description: "Distributed and low-level." },
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
