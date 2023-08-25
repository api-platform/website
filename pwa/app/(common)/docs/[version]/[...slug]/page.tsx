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

export async function generateStaticParams() {
  const allParams: { version: string; slug: string[] }[] = [];
  await Promise.all(
    versions.map(async (version) => {
      const navs = await loadV2DocumentationNav(version);
      for (const nav of navs) {
        for (const link of nav.links) {
          allParams.push({
            slug: link.link
              .replace(version === current ? "docs/" : `/docs/v${version}/`, "")
              .split("/")
              .filter((p) => p !== ""),
            version: `v${version}`,
          });
        }
      }
    })
  );
  return allParams;
}

export default async function Page({
  params: { slug: slugs, version },
}: {
  params: {
    slug: string[];
    version: string;
  };
}) {
  const v = version.substring(1);
  try {
    const { data, path } = await getDocContentFromSlug(v, slugs);

    const html = await getHtmlFromGithubContent(data, path, v);
    const title = await getDocTitle(v, slugs);

    const breadCrumbs = [
      {
        title: v,
        link: v !== current ? `/docs/v${v}` : "/docs",
      },
      { title },
    ];

    if (slugs.length > 2) {
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
        <div className="prose max-w-none dark:prose-invert prose-img:w-full prose-img:max-w-2xl prose-headings:font-title prose-h1:font-bold prose-code:after:hidden prose-code:before:hidden prose-code:py-1 prose-code:px-1.5 prose-code:bg-gray-100 prose-code:dark:bg-blue-darkest prose-h1:border-b-px prose-h1:border-b-gray-300 prose-h1:pb-2 max-md:prose-tr:flex max-md:prose-tr:flex-col max-md:prose-td:px-0 max-md:prose-td:py-1">
          <div className="doc" dangerouslySetInnerHTML={{ __html: html }}></div>
          <p className="mt-10">
            <a
              className="text-blue"
              href={`https://github.com/api-platform/docs/edit/${v}/${path}`}
            >
              You can also help us improve the documentation of this page.
            </a>
          </p>
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

export const dynamicParams = false;

export async function generateMetadata({
  params: { slug: slugs, version },
}: {
  params: {
    slug: string[];
    version: string;
  };
}): Promise<Metadata> {
  try {
    const title = await getDocTitle(version.substring(1), slugs);

    return {
      title: `${title} - API Platform`,
    };
  } catch {
    return {
      title: "API Platform Documentation - API Platform",
    };
  }
}
