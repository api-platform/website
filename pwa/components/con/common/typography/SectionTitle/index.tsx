import React, { PropsWithChildren } from "react";
import classnames from "classnames";
import styles from "./SectionTitle.module.css";

interface SectionTitleProps extends PropsWithChildren {
  dark?: boolean;
  lined?: boolean;
  h1?: boolean;
  small?: boolean;
}

export default function SectionTitle({
  children,
  dark = false,
  lined = false,
  h1 = false,
  small = false,
}: SectionTitleProps) {
  return (
    <div
      className={classnames(
        "relative text-center pt-20 pb-7 w-full font-title",
        styles.title,
        dark ? "text-white" : "text-blue-black"
      )}
    >
      {h1 ? (
        <h1
          className={classnames(
            "absolute select-none z-0 w-full left-1/2 bottom-16 -translate-x-1/2 scale-[2]",
            dark ? "text-pink/20 opacity-80" : "text-blue/10",
            small
              ? "text-4xl md:text-5xl/snug"
              : "text-5xl/snug md:text-6xl/snug"
          )}
        >
          {children}
        </h1>
      ) : (
        <h2
          className={classnames(
            "absolute select-none z-0 w-full left-1/2 bottom-16 -translate-x-1/2 scale-[2] text-6xl",
            dark ? "text-pink/20 opacity-80" : "text-blue/10",
            small
              ? "text-4xl md:text-5xl/snug"
              : "text-5xl/snug md:text-6xl/snug"
          )}
        >
          {children}
        </h2>
      )}
      <div
        className={classnames(
          "relative leading-snug",
          lined && "lined-center",
          small
            ? "text-4xl/snug md:text-5xl/snug"
            : "text-5xl/snug md:text-6xl/snug"
        )}
      >
        {children}
      </div>
    </div>
  );
}
