export type WorkStoryLink = {
  label: string;
  href: string;
  kind?: "primary" | "secondary";
};

export type WorkStoryGalleryItem = {
  src: string;
  alt: string;
  caption?: string;
};

export type WorkStoryFrontmatter = {
  title: string;
  summary: string;
  role: string;
  period: string;
  status: string;
  context: string;
  technologies: string[];
  coverImage?: string;
  gallery?: WorkStoryGalleryItem[];
  links?: WorkStoryLink[];
};

export type WorkStoryMeta = WorkStoryFrontmatter & {
  slug: string;
};
