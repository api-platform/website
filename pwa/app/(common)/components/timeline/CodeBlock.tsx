"use client";
import { PropsWithChildren, useRef } from "react";
import useAnimation from "hooks/con/useAnimation";
import style from "./codeblock.module.css";
import classNames from "classnames";

interface CodeBlockProps extends PropsWithChildren {
  title?: string;
}

export default function CodeBlock({ title, children }: CodeBlockProps) {
  const codeContainer = useRef<HTMLDivElement>(null);

  const animation = useAnimation(
    "right",
    undefined,
    200,
    undefined,
    "100px 0% -10%"
  );

  return (
    <div
      ref={animation}
      className="dark text-left bg-blue-black dark:bg-blue-darkest rounded-2xl p-6 w-full flex flex-col shadow-xl my-4 | sm:my-8 md:absolute md:right-[calc(100%+3rem)] md:w-full md:max-w-lg md:my-0"
    >
      <div className="flex flew-row items-center gap-2">
        <div className="rounded-full w-3 h-3 bg-[#ed6a5d]" />
        <div className="rounded-full w-3 h-3 bg-[#f5c04f]" />
        <div className="rounded-full w-3 h-3 bg-[#62c555]" />
        <p className="flex-1 text-center text-white opacity-80 text-xs self-end -translate-x-6">
          {title}
        </p>
      </div>
      <div
        ref={codeContainer}
        className={classNames("text-sm mt-4", style.codeblock)}
      >
        {children}
      </div>
    </div>
  );
}
