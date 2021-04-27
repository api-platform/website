export type Speaker = {
  id: string;
  name: string;
  twitter?: string;
  github?: string;
  job: string;
  description: string;
  slug: string;
};

export type Conference = {
  title: string;
  description?: string;
  start: string;
  end: string;
  short: string;
  track: 'FR' | 'EN';
  slug: string;
  speakers: string[];
};

export type Track = {
  id: 'FR' | 'EN';
  type: string;
  date: string;
};

export type Offer = {
  title: string;
  price: number;
  limitDate: string;
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
