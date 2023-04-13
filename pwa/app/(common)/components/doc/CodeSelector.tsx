"use client";
import classNames from "classnames";
import { Children, PropsWithChildren, ReactElement, useState } from "react";

export default function CodeSelector({ children }: PropsWithChildren) {
  const childs = Children.map(children, (child) => {
    const item = child as ReactElement<PropsWithChildren<any>>;
    if (item?.props["data-rehype-pretty-code-fragment"] !== undefined)
      return item.props.children;
    return child;
  });

  const types = [
    ...new Set(childs?.map((item) => item.props["data-language"])),
  ];

  const [type, setType] = useState<string>(types[0]);

  return (
    <div className="mb-4 overflow-hidden rounded-2xl bg-gray-100 dark:bg-blue-darkest not-prose">
      <div className="flex flex-wrap -mb-px bg-gray-300/10 dark:bg-blue/20 border-b border-gray-300 dark:border-blue-dark">
        {types.map((t) => (
          <div key={t}>
            <a
              role="button"
              onClick={() => setType(t)}
              className={classNames(
                "inline-block py-2 px-6 border-b-2 font-semibold text-sm uppercase hover:bg-blue-black/5 dark:hover:bg-blue-black/30 transition-all",
                t === type
                  ? "text-blue dark:text-white border-blue bg-blue-black/5 dark:bg-blue-black/30"
                  : "text-gray-400 dark:text-blue/60 border-transparent"
              )}
            >
              {t}
            </a>
          </div>
        ))}
      </div>
      {childs?.map((child, index) => (
        <div
          key={index}
          className={classNames(
            child.props["data-language"] !== type && "hidden"
          )}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
