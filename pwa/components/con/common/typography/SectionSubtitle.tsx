import React, { PropsWithChildren } from "react";
import classnames from "classnames";

interface SectionSubtitleProps extends PropsWithChildren {
  dark?: boolean;
  className?: string;
}

export default function SectionSubTitle({
  children,
  dark = false,
  className,
}: SectionSubtitleProps) {
  return (
    <p
      className={classnames(
        "text-2xl font-light text-center mb-8",
        dark ? "text-white/60" : "text-blue-black/60",
        className
      )}
    >
      {children}
    </p>
  );
}
