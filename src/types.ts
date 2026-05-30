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
};

export type NavSection = {
  slug: string;
  hideFromHomepage?: boolean;
  subsections: NavSubsection[];
};

export type Nav = NavSection[];

export type SortBy = "date" | "name" | "numeric";

export type SubsectionRules = {
  pdfOnNumericName?: boolean;
  sortBy?: SortBy;
  hidden?: boolean;
};

export type ResolvedSubsection = {
  dirName: string;
  urlSlug: string;
  name: string;
  description?: string;
  url: string;
  rules: SubsectionRules;
};

export type ResolvedSection = {
  slug: string;
  name: string;
  description?: string;
  url: string;
  subsections: ResolvedSubsection[];
};
