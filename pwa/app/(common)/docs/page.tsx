import {
  getDocContentFromSlug,
  loadV2DocumentationNav,
  getHtmlFromGithubContent,
} from "api/doc";
import DocLayout from "./components/DocLayout";
import classNames from "classnames";
import { current } from "consts";

export default async function Page() {
  const nav = await loadV2DocumentationNav(current);
  const { data, path } = await getDocContentFromSlug(current, ["distribution"]);
  const html = await getHtmlFromGithubContent({ data, path });

  return (
    <DocLayout nav={nav}>
      <div
        className={classNames(
          "px-6 md:px-10 py-6 leading-loose text-blue-black/80 ",
          "dark:text-white/80"
        )}
      >
        <div className="prose max-w-none dark:prose-invert prose-img:max-w-full prose-headings:font-title prose-h1:font-bold prose-code:after:hidden prose-code:before:hidden prose-code:py-1 prose-code:px-1.5 prose-code:bg-gray-100 prose-code:dark:bg-blue-darkest prose-h1:border-b-px prose-h1:border-b-gray-300 prose-h1:pb-2 max-md:prose-tr:flex max-md:prose-tr:flex-col max-md:prose-td:px-0 max-md:prose-td:py-1">
          <div className="doc" dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
      </div>
    </DocLayout>
  );
}

export const metadata = {
  title: "API Platform Documentation - API Platform",
};
