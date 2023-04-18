import dayjs from "dayjs";

export function sortByPosition(
  a: { position: number },
  b: { position: number }
) {
  if (a.position > b.position) return 1;
  if (a.position < b.position) return -1;
  return 0;
}

export function sortByTitle(a: { title: string }, b: { title: string }) {
  if (a.title > b.title) return 1;
  else if (a.title < b.title) return -1;
  return 0;
}

export function extractHeadingsFromMarkdown(content: string, level: number) {
  const headings = content
    .split("\n")
    .filter((line) => line.match(/#{1,3}\s/))
    .map((line) => {
      const result = line.match(/(#{1,3})\s(.*)/);
      return {
        level: result?.[1].length,
        title: result?.[2],
      };
    });
  return headings
    .filter((heading) => heading.level === level)
    .map((heading) => heading.title);
}

export const toLocaleDate: (
  date: string,
  options?: Intl.DateTimeFormatOptions
) => string = (
  date,
  options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }
) => {
  const d = new Date(date);
  return d.toLocaleString("en-US", options);
};

export const convertTime: (time: string) => string = (time) =>
  dayjs(time, "HH:mm").format("HH:mm");