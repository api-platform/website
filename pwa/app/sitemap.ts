import editions, { currentEdition } from "data/con/editions";
import { Locale, i18n } from "i18n/i18n-config";
import { generateStaticParams as getScheduleEditions } from "app/con/[edition]/schedule/page";
import { generateStaticParams as getSpeakersEditions } from "app/con/[edition]/speakers/page";
import { getAllSpeakerSlugs } from "api/con/speakers";
import { getAllConferenceSlugs } from "api/con/conferences";
import { getAllEvents } from "api/events";
import { getAllContributors } from "api/contributors";
import { versions } from "consts";
import { loadV2DocumentationNav } from "api/doc";
import { addTrailingSlashIfNecessary, getRootUrl } from "utils";

const basePath = getRootUrl();

function createLocalePath(locale: Locale, path: string, edition?: string) {
  const baseLocalePath =
    i18n.defaultLocale === locale ? basePath : `${basePath}/${locale}`;
  return `${baseLocalePath}/${edition ? `${edition}/` : ""}${path}`;
}

async function getAllConRoutes() {
  const routes: string[] = [];
  for (const locale of i18n.locales) {
    routes.push(createLocalePath(locale, "con"));
    routes.push(createLocalePath(locale, "con/editions"));

    const editionsWithSchedules = await getScheduleEditions();
    const editionsWithSpeakers = await getSpeakersEditions();

    for (const { edition } of editionsWithSchedules) {
      routes.push(createLocalePath(locale, `con/${edition}/schedule`));
    }
    for (const { edition } of editionsWithSpeakers) {
      routes.push(createLocalePath(locale, `con/${edition}/speakers`));
    }
    for (const { year: edition } of editions) {
      if (edition !== currentEdition)
        routes.push(createLocalePath(locale, `con/${edition}/review`));

      const speakers = await getAllSpeakerSlugs(edition, locale);
      for (const speaker of speakers)
        routes.push(
          createLocalePath(locale, `con/${edition}/speakers/${speaker}`)
        );

      const conferences = await getAllConferenceSlugs(edition);
      for (const conference of conferences)
        routes.push(
          createLocalePath(locale, `con/${edition}/conferences/${conference}`)
        );

      const legals = ["faq", "transparency", "code-of-conduct"]; // TODO: fix to put dynamic array after legal fix
      for (const legal of legals)
        routes.push(createLocalePath(locale, `con/${edition}/${legal}`));
    }
  }
  return routes.map((route) => addTrailingSlashIfNecessary(route));
}

async function getAllStandardRoutes() {
  const routes: string[] = [];
  routes.push(`${basePath}/docs`);
  routes.push(`${basePath}/events`);
  routes.push(`${basePath}/references`);
  routes.push(`${basePath}/community`);
  routes.push(`${basePath}/community/contributors`);
  routes.push(`${basePath}/help`);
  routes.push(`${basePath}/404`);
  routes.push(`${basePath}/resources/wallpapers`);
  routes.push(`${basePath}/resources/logos`);
  routes.push(`${basePath}/resources/colouring-webby`);
  routes.push(`${basePath}/trademark-policy`);

  const events = await getAllEvents();
  for (const event of events) {
    routes.push(`${basePath}/events/${event.slug}`);
  }

  const contributors = getAllContributors();
  for (const contributor of contributors) {
    routes.push(`${basePath}/community/contributors/${contributor.login}`);
  }

  for (const version of versions) {
    routes.push(`${basePath}/docs/v${version}`);
    const navs = await loadV2DocumentationNav(version);
    for (const nav of navs) {
      for (const link of nav.links) {
        routes.push(`${basePath}${link.link}`);
      }
    }
  }

  return routes.map((route) => addTrailingSlashIfNecessary(route));
}

export default async function sitemap() {
  const allLinks = [
    basePath,
    ...(await getAllStandardRoutes()),
    ...(await getAllConRoutes()),
  ];
  return allLinks.map((path) => ({ url: path }));
}
