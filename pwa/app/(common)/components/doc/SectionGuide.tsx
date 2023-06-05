import { Children, PropsWithChildren, ReactNode, isValidElement } from "react";

export default function SectionGuide({ children }: PropsWithChildren) {
  const left: ReactNode[] = [];
  const right: ReactNode[] = [];
  let id;
  Children.map(children, (child) => {
    if (!isValidElement(child)) return null;

    const { type, props } = child;
    if (type === "a" && props?.id?.includes("section")) {
      id = props?.id;
      return null;
    }
    if (type === "div" && !props?.children?.length) return null;
    if (props["data-rehype-pretty-code-fragment"] !== undefined) {
      right.push(child);
    } else if (type.toString().includes("CodeSelector")) {
      right.push(child);
    } else {
      left.push(child);
    }
  });

  return (
    <div className="grid grid-cols-1 py-4 group xl:grid-cols-2 pt-8">
      <div className="flex-1 flex flex-row border-b-gray-300 dark:border-blue-dark xl:border-b-px border-dotted group-last:border-0 xl:mr-8 xl:pb-8 ">
        <div className="relative w-full xl:pr-8">
          <a
            id={id}
            href={`#${id}`}
            className="absolute right-full -translate-x-1 top-1 pt-24 -mt-24 opacity-0 group-hover:opacity-100 duration-500 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="w-4 h-4 stroke-blue"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </a>
          {left}
        </div>
      </div>
      <div>{right}</div>
    </div>
  );
}
