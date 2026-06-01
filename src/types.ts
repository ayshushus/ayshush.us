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

export type SortBy = "date" | "name" | "numeric";

export type SubsectionRules = {
  pdfOnNumericName?: boolean;
  sortBy?: SortBy;
  hidden?: boolean;
};

export type ConflictClaim = {
  label: string;
  source: string;
};

export type ResolvedSubsection = {
  dirName: string;
  urlSlug: string;
  name: string;
  description?: string;
  order: number;
  url: string;
  rules: SubsectionRules;
  conflict?: ConflictClaim[];
};

export type ResolvedSection = {
  slug: string;
  name: string;
  description?: string;
  order: number;
  url: string;
  subsections: ResolvedSubsection[];
  conflict?: ConflictClaim[];
};
