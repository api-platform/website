export type PreviousEdition = {
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

export type Speaker = {
  id: string;
  name: string;
  twitter?: string;
  github?: string;
  job: string;
  company?: string;
  number?: number;
  description: string;
  slug: string;
};

export type Conference = {
  title: string;
  start: string;
  end: string;
  date: string;
  track: 'FR' | 'EN';
  description?: string;
  short?: string;
  slug?: string;
  speakers?: string[];
  edition: string;
  type?: 'extra' | 'upcoming' | 'break';
};

export type Track = {
  id: 'FR' | 'EN';
  type: string;
  date: string;
};

export type Offer = {
  title: string;
  price: number;
  limitDate?: string;
  startDate?: string;
};

export type Price = {
  id: number;
  title: string;
  languages: string;
  offers: Offer[];
};

export type Partner = {
  logo: string;
  name: string;
  link: string;
  rank: number;
};
