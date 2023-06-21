export type Edition = {
  year: string;
  image: string;
  startDate: string;
  endDate: string;
};

export type LinkAttributes = {
  text: string;
  to: string;
  mobileOnly?: boolean;
};

export type Navigation = {
  backLink?: LinkAttributes;
  logoLink?: string;
  links: LinkAttributes[];
};

export type FooterLink = {
  title: string;
  link: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type Footer = FooterColumn[];

export type Speaker = {
  id: string;
  name: string;
  twitter?: string;
  github?: string;
  mastodon?: string;
  job: string;
  company?: string;
  number: number;
  description: string;
  slug: string;
  contentHtml: string;
  edition: string;
  image: string;
  placeholder: string;
  url: string;
};

export type Conference = {
  title: string;
  start: string;
  end: string;
  date: string;
  track: "FR" | "EN";
  description?: string;
  short?: string;
  slug?: string;
  speakers: Speaker[];
  edition: string;
  type?: "extra" | "upcoming" | "break" | "conference" | "empty";
  url?: string;
  day?: Day;
};

export type Track = {
  id: "FR" | "EN";
  type: string;
  date: string;
};

export type Offer = {
  title: Record<string, string>;
  price: number;
  limitDate?: string;
  startDate?: string;
};

export type Price = {
  id: number;
  title: Record<string, string>;
  languages: Record<string, string>;
  offers: Offer[];
};

export type Partner = {
  logo: string;
  name: string;
  link: string;
  rank: number;
};

export type Break = {
  title: string;
  date: string;
  start: string;
  end: string;
  track?: string;
  type?: string;
};

export type Day = {
  date: string;
  title?: string;
  tracks?: string[];
  single: boolean;
};
