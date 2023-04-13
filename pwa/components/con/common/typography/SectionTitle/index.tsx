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
            "absolute select-none z-0 w-full left-1/2 bottom-16 -translate-x-1/2 scale-[2] text-6xl leading-tight",
            dark ? "text-pink/20" : "text-blue/10",
            small ? "text-5xl" : "text-6xl"
          )}
        >
          {children}
        </h1>
      ) : (
        <h2
          className={classnames(
            "absolute select-none z-0 w-full left-1/2 bottom-16 -translate-x-1/2 scale-[2] text-6xl leading-tight",
            dark ? "text-pink/20" : "text-blue/10",
            small ? "text-5xl" : "text-6xl"
          )}
        >
          {children}
        </h2>
      )}
      <div
        className={classnames(
          "relative leading-tight",
          lined && "lined-center",
          small ? "text-5xl" : "text-6xl"
        )}
      >
        {children}
      </div>
    </div>
  );
}
