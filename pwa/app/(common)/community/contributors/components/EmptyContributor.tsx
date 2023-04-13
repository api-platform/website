import classNames from "classnames";
import Heading from "components/common/typography/Heading";

export default function ContributorItem() {
  return (
    <div
      className={classNames(
        "px-4 py-3 w-full flex justify-center sm:w-1/2 | lg:w-1/3"
      )}
    >
      <div
        className={classNames(
          "relative w-full max-w-[250px] flex justify-center items-center group cursor-pointer flex-col p-4 transition-all duration-500 hover:scale-105 hover:bg-blue-extralight/0"
        )}
      >
        <div className="relative">
          <div
            className={classNames(
              "rounded-full relative aspect-square overflow-hidden mb-4 w-52 border-gray-300 bg-gray-300 border-4"
            )}
          />
        </div>
        <div className="px-5 text-center">
          <Heading
            className="border-blue-extralight border-dotted border-b-2 bg-gray-300 text-transparent"
            level="h3"
            size="sm"
          >
            #
          </Heading>
          <div className="text-blue dark:text-blue-light font-title leading-none mt-2 opacity-0">
            <p className={"text-6xl font-bold bg-gray-300 text-transparent"}>
              ?
            </p>
            <p className="text-sm uppercase font-semibold">contributions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
