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

// A named list inside a subsection — a folder of posts. Mirrors the
// section→subsection→post shape one level deeper, so the list shows in the URL
// (/<subsection>/<list>/<post>) and gets its own listing page (/<subsection>/<list>).
export type ResolvedList = {
  dirName: string;
  urlSlug: string;
  name: string;
  description?: string;
  order: number; // smaller = higher
  url: string;
};

export type ResolvedSubsection = {
  dirName: string;
  urlSlug: string;
  name: string;
  description?: string;
  order: number;
  url: string;
  rules: SubsectionRules;
  // Folder-defined lists, resolved from each list folder's _config.md, ordered.
  lists: ResolvedList[];
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
