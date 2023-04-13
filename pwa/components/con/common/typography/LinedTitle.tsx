import React, { PropsWithChildren } from "react";
import classnames from "classnames";

interface LinedTitleProps extends PropsWithChildren {
  className?: string;
}

export default function LinedTitle({
  children,
  className = "",
}: LinedTitleProps) {
  return (
    <p
      className={classnames(
        "lined-left uppercase font-bold font-title text-xl",
        className
      )}
    >
      {children}
    </p>
  );
}
