"use client";
import React from "react";
import classnames from "classnames";
import Link from "next/link";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  size?: "small" | "large";
  className?: string;
  empty?: boolean;
  square?: boolean;
  disabled?: boolean;
  to?: string;
  external?: boolean;
}

export default function Button({
  children,
  className,
  empty,
  square,
  disabled,
  to,
  size = "large",
  external = false,
  ...props
}: ButtonProps) {
  const classNames = classnames(
    "btn cursor-pointer font-title",
    { small: "small" === size, empty, square, disabled },
    className
  );
  const externalProps = { target: "_blank", rel: "noopener noreferrer" };

  return to ? (
    <Link className={classNames} href={to} {...(external ? externalProps : {})}>
      {children}
    </Link>
  ) : (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}
