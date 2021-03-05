export type Speaker = {
  id: string | number;
  name: string;
  twitter?: string;
  github?: string;
  image: string;
  job: string;
};

export type Conference = {
  id: number;
  speakers?: number[];
  speakerTitle?: string;
  title: string;
  description?: string;
  time: string[];
  day: number;
};

export type FullConference = {
  id: number;
  speakers?: Speaker[];
  speakerTitle?: string;
  title: string;
  description?: string;
  time: string[];
  day: number;
};

export type Day = {
  index: number;
  type: string;
  day: number;
  date: string;
};

export type Offer = {
  title: string;
  price: number;
};

export type Price = {
  id: number;
  limitDate: string;
  title: string;
  offers: Offer[];
};
