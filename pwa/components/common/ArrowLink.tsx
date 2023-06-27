"use client";
import React from "react";
import classNames from "classnames";
import Link from "components/common/Link";
import { Arrow } from "components/icons";

export interface ArrowLinkProps {
  href: string;
  text: string;
  className?: string;
  external?: boolean;
  size?: "small" | "large";
}

export default function ArrowLink({
  href,
  text,
  className,
  external,
  size = "large",
}: ArrowLinkProps) {
  const externalProps = { target: "_blank", rel: "noopener noreferrer" };
  return (
    <Link
      href={href}
      {...(external ? externalProps : {})}
      className={classNames(
        "flex flex-row gap-2 font-title text-blue cursor-pointer pl-8 relative group hover:pr-8 hover:pl-0 group-hover/card:pr-8 group-hover/card:pl-0 transition-all delay-75 duration-300 hover:brightness-125 group-hover/card:brightness-125",
        className,
        size === "small" ? "text-xs" : "text-base"
      )}
    >
      <Arrow className="h-6 w-6 absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 group-hover:left-full group-hover/card:left-full delay-75 group-hover:-translate-x-full group-hover/card:-translate-x-full" />
      <span className="uppercase font-bold">{text}</span>
    </Link>
  );
}
