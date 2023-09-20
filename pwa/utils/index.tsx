import dayjs from "dayjs";
import { versions, current } from "consts";

export function sortByPosition(
  a: { position: number },
  b: { position: number }
): number {
  return a.position - b.position;
}

export function sortByTitle(a: { title: string }, b: { title: string }) {
  if (a.title > b.title) return 1;
  else if (a.title < b.title) return -1;
  return 0;
}

export const addTrailingSlashIfNecessary = (str: string) =>
  str.charAt(str.length - 1) === "/" ? str : `${str}/`;

export function extractTitleFromMarkdown(content: string) {
  const lines = content.split("\n");
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    const result = line.match(/#\s(.*)/);

    if (null === result || result.length === 0) {
      continue;
    }

    return result[1];
  }

  return null;
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

export const getVersionAndSlugFromSlugs = (allSlugs: string[]) => {
  const version = versions.includes(allSlugs[0].substring(1))
    ? allSlugs[0].substring(1)
    : current;
  const slugs = versions.includes(allSlugs[0].substring(1))
    ? allSlugs.slice(1, allSlugs.length)
    : allSlugs;
  return { version, slugs: slugs.length ? slugs : ["distribution"] };
};

export const getRootUrl = () => {
  if (!process.env.NEXT_ROOT_URL) return "https://api-platform.com";
  return process.env.NEXT_ROOT_URL?.startsWith("http")
    ? process.env.NEXT_ROOT_URL
    : `https://${process.env.NEXT_ROOT_URL}`;
};

export const slugify = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Supprimer les caractères spéciaux sauf les espaces et les tirets
    .replace(/\s+/g, "-") // Remplacer les espaces par des tirets
    .replace(/-+/g, "-") // Supprimer les tirets consécutifs
    .trim(); // Supprimer les espaces en début et fin de chaîne

export const unbreakable = (t: string) => t.replace(/\s+(?=[!|?])/g, "\u00A0");
