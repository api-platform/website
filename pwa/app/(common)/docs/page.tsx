import { getDocContentFromSlug, loadV2DocumentationNav } from "api/doc";
import classNames from "classnames";
import Sidebar from "components/docs/Sidebar";
import { current } from "consts";

export default async function Page() {
  const nav = await loadV2DocumentationNav(current);
  const { html } = await getDocContentFromSlug(current, ["distribution"]);

  return (
    <div className="max-w-8xl mx-auto overflow-x-clip">
      <div className="flex flex-row flex-wrap items-start justify-start">
        <Sidebar docMenuParts={nav} />
        <div className="flex-1 overflow-clip">
          {" "}
          <div
            className={classNames(
              "px-6 md:px-10 py-6 leading-loose text-blue-black/80 ",
              "dark:text-white/80"
            )}
          >
            <div className="prose max-w-none dark:prose-invert prose-headings:font-title prose-h1:font-bold prose-code:after:hidden prose-code:before:hidden prose-code:py-1 prose-code:px-1.5 prose-code:bg-gray-100 prose-code:dark:bg-blue-darkest prose-h1:border-b-px prose-h1:border-b-gray-300 prose-h1:pb-2 max-md:prose-tr:flex max-md:prose-tr:flex-col max-md:prose-td:px-0 max-md:prose-td:py-1">
              <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
