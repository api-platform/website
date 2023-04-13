import { Edition } from "types/con";

export const editions: Edition[] = [
  {
    year: "2021",
    image: "2021",
    startDate: "2021-09-10",
    endDate: "2021-09-10",
  },
  {
    year: "2022",
    image: "2022",
    startDate: "2022-09-15",
    endDate: "2022-09-16",
  },
  {
    year: "2023",
    image: "2023",
    startDate: "2023-09-21",
    endDate: "2023-09-22",
  },
];

export function getPreviousEdition(currentEdition: string) {
  const index = editions.findIndex(
    (edition) => edition.year === currentEdition
  );
  return index && index > 0 ? editions[index - 1].year : null;
}

export const currentEdition = "2023";

export default editions;
