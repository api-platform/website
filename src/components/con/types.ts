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
