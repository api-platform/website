import {
  getDocContentFromSlug,
  getDocTitle,
  getHtmlFromGithubContent,
  loadV2DocumentationNav,
} from "api/doc";
import classNames from "classnames";
import { current, versions } from "consts";
import Script from "next/script";
import { Metadata } from "next";
import BreadCrumbs from "components/docs/BreadCrumbs";
import { notFound } from "next/navigation";
import { getVersionAndSlugFromSlugs } from "utils";

export async function generateStaticParams() {
  const slugs: { slug: string[] }[] = [];
  const navs = await loadV2DocumentationNav(current);
  for (const nav of navs) {
    for (const link of nav.links) {
      slugs.push({
        slug: link.link
          .replace("/docs/", "")
          .split("/")
          .filter((p) => p !== ""),
      });
    }
  }
  return slugs;
}

export default async function Page({
  params: { slug },
}: {
  params: {
    slug: string[];
  };
}) {
  const slugs: { slug: string[] }[] = [];
  const navs = await loadV2DocumentationNav(current);
  for (const nav of navs) {
    for (const link of nav.links) {
      slugs.push({
        slug: link.link
          .replace("/docs/", "")
          .split("/")
          .filter((s) => s !== ""),
      });
    }
  }
  try {
    const { version, slugs } = getVersionAndSlugFromSlugs(slug);
    const { data, path } = await getDocContentFromSlug(version, slugs);

    const html = await getHtmlFromGithubContent(data, path, version);
    const title = await getDocTitle(version, slugs);

    const breadCrumbs = [
      {
        title: version,
        link: version === current ? `/docs/v${version}` : "/docs",
      },
      { title },
    ];

    if (slug.length > 2 || (slug.length === 2 && !versions.includes(slug[0]))) {
      breadCrumbs.splice(1, 0, { title: "..." });
    }

    return (
      <div
        className={classNames(
          "px-6 md:px-10 py-6 leading-loose text-blue-black/80 ",
          "dark:text-white/80"
        )}
      >
        <BreadCrumbs breadCrumbs={breadCrumbs} />
        <div className="prose max-w-none dark:prose-invert prose-img:max-w-3xl prose-headings:font-title prose-h1:font-bold prose-code:after:hidden prose-code:before:hidden prose-code:py-1 prose-code:px-1.5 prose-code:bg-gray-100 prose-code:dark:bg-blue-darkest prose-h1:border-b-px prose-h1:border-b-gray-300 prose-h1:pb-2 max-md:prose-tr:flex max-md:prose-tr:flex-col max-md:prose-td:px-0 max-md:prose-td:py-1">
          <div className="doc" dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
        <Script id="codeselector-switch">
          {`function switchCode(event) {
          const k = event.target.getAttribute('key')
          const p = event.target.parentNode.parentNode.parentNode
          ;[].slice.call(p.querySelectorAll('div[key]')).forEach(e => e.classList.add('hidden'))
          const n = p.querySelector('div[key="'+k+'"]').classList.remove('hidden')

          // want a single argument to why tailwind sucks?
          const selectedClasses = 'text-blue dark:text-white border-blue bg-blue-black/5 dark:bg-blue-black/30'.split(' ')
          const notSelectedClasses = 'text-gray-400 dark:text-blue/60 border-transparent'.split(' ')

          ;[].slice.call(event.target.parentNode.parentNode.querySelectorAll('[role="button"]')).forEach(e => e.classList.remove(...selectedClasses) && e.classList.add(...notSelectedClasses))
          event.target.classList.remove(...notSelectedClasses)
          event.target.classList.add(...selectedClasses)

        }`}
        </Script>
      </div>
    );
  } catch (err) {
    console.error(err);
    notFound();
  }
}

export async function generateMetadata({
  params: { slug },
}: {
  params: {
    slug: string[];
  };
}): Promise<Metadata> {
  try {
    const { version, slugs } = getVersionAndSlugFromSlugs(slug);
    const title = await getDocTitle(version, slugs);

    return {
      title: `${title} - API Platform`,
    };
  } catch {
    return {
      title: "API Platform Documentation - API Platform",
    };
  }
}
