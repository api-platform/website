import { getDocContentFromSlug } from "api/doc";
import classNames from "classnames";
import { versions, current } from "consts";

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
  const { html } = await getDocContentFromSlug(
    version,
    contentSlug.length ? contentSlug : ["distribution"]
  );

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
    </div>
  );
}
