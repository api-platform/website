"use client";
import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import Link from "components/common/Link";

export interface CardProps extends PropsWithChildren {
  padding?: boolean;
  link?: string;
  className?: string;
  externalLink?: string;
  bordered?: boolean;
  hoverable?: boolean;
}

export default function Card({
  className,
  padding,
  children,
  link,
  hoverable,
  externalLink,
}: CardProps) {
  const allClassNames = classNames(
    "bg-white shadow-md group/card transition-all duration-300 dark:border-blue-dark border-px border-transparent dark:bg-blue-darkest",
    padding && "p-3",
    (hoverable || link || externalLink) &&
      "relative hover:-translate-y-2 hover:shadow-xl after:absolute hover:after:h-2 after:w-full after:top-full cursor-pointer",
    className
  );
  if (link)
    return (
      <Link href={link} className={allClassNames}>
        {children}
      </Link>
    );
  else if (externalLink)
    return (
      <a
        href={externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className={allClassNames}
      >
        {children}
      </a>
    );
  return <div className={allClassNames}>{children}</div>;
}
