"use client";
import React, { PropsWithChildren } from "react";
import classNames from "classnames";

export interface ShapeSectionProps extends PropsWithChildren {
  effect: "left-triangle" | "right-triangle" | "center-triangle";
  maskColor:
    | "white"
    | "gray-100"
    | "blue"
    | "blue-dark"
    | "blue-black"
    | "blue-darkest";
  darkModeColor?: "blue-black" | "blue-dark" | "blue-darkest";
  className?: string;
}

export const safeList = [
  "after:bg-white",
  "after:bg-gray-100",
  "after:bg-blue",
  "after:bg-blue-dark",
  "after:bg-blue-black",
  "after:bg-blue-darkest",
  "dark:after:bg-blue-black",
  "dark:after:bg-blue-darkest",
  "dark:after:bg-blue-dark",
]; // KEEP FOR TAILWIND PURGE

export default function ShapeSection({
  effect = "right-triangle",
  maskColor = "white",
  darkModeColor,
  className,
  children,
}: ShapeSectionProps) {
  const shapeClassName = classNames(
    `after:h-20 after:absolute after:-bottom-px after:left-0 after:w-full after:bg-${maskColor}`,
    effect === "right-triangle" && "after:clip-path-corner-right",
    effect === "left-triangle" && "after:clip-path-corner-left",
    effect === "center-triangle" && "after:clip-path-triangle-bottom",
    darkModeColor && `dark:after:bg-${darkModeColor}`
  );

  return (
    <div className={classNames("relative w-full", className, shapeClassName)}>
      {children}
    </div>
  );
}
