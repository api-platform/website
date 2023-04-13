import React, { PropsWithChildren } from "react";
import classnames from "classnames";

interface OverlineProps extends PropsWithChildren {
  className?: string;
}

export default function Overline({ children, className = "" }: OverlineProps) {
  return (
    <p
      className={classnames(
        "uppercase font-extralight leading-tight text-sm font-title",
        className
      )}
    >
      {children}
    </p>
  );
}
