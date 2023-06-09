import {
  getDocContentFromSlug,
  getDocTitle,
  getHtmlFromGithubContent,
} from "api/doc";
import classNames from "classnames";
import { versions, current } from "consts";
import Script from "next/script";
import { Metadata, ResolvingMetadata } from "next";

export async function generateStaticParams() {
  return [];
}

export default async function Page({
  params: { slug },
}: {
  params: {
    slug: string[];
  };
}) {
  const version = versions.includes(slug[0]) ? slug[0] : current;
  const contentSlug = versions.includes(slug[0])
    ? slug.slice(1, slug.length)
    : slug;
  const { data, path } = await getDocContentFromSlug(
    version,
    contentSlug.length ? contentSlug : ["distribution"]
  );

  const html = await getHtmlFromGithubContent({ data, path });

  return (
    <div
      className={classNames(
        "px-6 md:px-10 py-6 leading-loose text-blue-black/80 ",
        "dark:text-white/80"
      )}
    >
      <div className="prose max-w-none dark:prose-invert prose-headings:font-title prose-h1:font-bold prose-code:after:hidden prose-code:before:hidden prose-code:py-1 prose-code:px-1.5 prose-code:bg-gray-100 prose-code:dark:bg-blue-darkest prose-h1:border-b-px prose-h1:border-b-gray-300 prose-h1:pb-2 max-md:prose-tr:flex max-md:prose-tr:flex-col max-md:prose-td:px-0 max-md:prose-td:py-1">
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
}

export async function generateMetadata(
  {
    params: { slug },
  }: {
    params: {
      slug: string[];
    };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const version = versions.includes(slug[0]) ? slug[0] : current;
  const title = await getDocTitle(version, slug);

  return {
    title: `${title} - API Platform`,
  };
}
