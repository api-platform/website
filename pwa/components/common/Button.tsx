"use client";
import React from "react";
import classNames from "classnames";
import Link from "next/link";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  size?: "small" | "medium" | "large";
  className?: string;
  empty?: boolean;
  disabled?: boolean;
  href?: string;
  external?: boolean;
  color?: "default" | "white";
  darkMode?: boolean;
  ariaLabel?: string;
}

export default function Button({
  children,
  className,
  empty,
  disabled,
  href,
  color = "default",
  size = "large",
  external = false,
  darkMode = true,
  ariaLabel = "",
  ...props
}: ButtonProps) {
  let sizeClassName;
  let colorClassName;

  switch (size) {
    case "small":
      sizeClassName = "text-sm px-3 py-0.5";
      break;
    case "medium":
      sizeClassName = "text-base px-3 py-1";
      break;
    default:
      sizeClassName = "py-1 px-5 text-lg";
  }

  switch (color) {
    case "default":
      if (empty) colorClassName = "text-blue bg-transparent border-blue";
      else colorClassName = "bg-blue border-blue text-white";
      break;
    case "white":
      if (empty)
        colorClassName = classNames(
          "text-white bg-transparent border-white",
          darkMode && "dark:text-blue-black dark:border-blue-black"
        );
      else
        colorClassName = classNames(
          "bg-white border-white text-blue",
          darkMode && "dark:bg-blue-black dark:border-blue-black"
        );
      break;
  }

  const allClassNames = classNames(
    "font-title rounded-3xl border-2 inline-flex items-center justify-center font-semibold uppercase transition-all hover:brightness-125 hover:scale-105",
    colorClassName,
    sizeClassName,
    disabled ? "opacity-0.5" : "cursor-pointer",
    className
  );
  const externalProps = { target: "_blank", rel: "noopener noreferrer" };

  return href ? (
    <Link
      className={allClassNames}
      href={href}
      {...(external ? externalProps : {})}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  ) : (
    <div className={allClassNames} {...props}>
      {children}
    </div>
  );
}
