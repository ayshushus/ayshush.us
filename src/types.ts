export type Site = {
  TITLE: string;
  DESCRIPTION: string;
  EMAIL: string;
  NUM_POSTS_PER_SECTION_ON_HOMEPAGE: number;
};

export type Metadata = {
  TITLE: string;
  DESCRIPTION: string;
};

export type Socials = {
  NAME: string;
  HREF: string;
}[];

export type NavSubsection = {
  slug: string;
  name: string;
};

export type NavSection = {
  slug: string;
  name: string;
  description?: string;
  hideFromHomepage?: boolean;
  subsections: NavSubsection[];
};

export type Nav = NavSection[];
