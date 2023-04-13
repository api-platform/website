import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./Heading.module.css";

interface HeadingProps extends PropsWithChildren {
  className?: string;
  overline?: string;
  level: "h1" | "h2" | "h3" | "h4" | "p";
  size: "xl" | "lg" | "sm" | "xs";
  bordered?: boolean;
}

export default function Heading({
  children,
  className,
  overline,
  size,
  level: Level,
}: HeadingProps) {
  const Element = overline ? "p" : Level;
  const sizesStyles = {
    xl: "font-title text-5xl font-light leading-none",
    lg: "font-title text-3xl font-bold leading-tight mb-2",
    sm: "font-title text-lg font-bold leading-tight mb-1",
    xs: "font-title text-base font-semibold leading-tight",
  };
  const overlineSizes = {
    xl: "text-lg",
    lg: "text-base",
    sm: "text-base",
    xs: "text-xs",
  };
  return (
    <div className={classNames(styles.title, className)}>
      {overline ? (
        <Level
          className={classNames(
            "uppercase font-semibold text-blue",
            overlineSizes[size]
          )}
        >
          {overline}
        </Level>
      ) : null}
      <Element className={sizesStyles[size]}>{children}</Element>
    </div>
  );
}
