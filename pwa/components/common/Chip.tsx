"use client";
import React from "react";
import classNames from "classnames";
import { ChipColor } from "types";

export interface ChipProps {
  size?: "small" | "large";
  className?: string;
  empty?: boolean;
  color?: ChipColor;
  darkMode?: boolean;
  text: string;
  rounded?: boolean;
}

export default function Chip({
  size,
  className,
  empty,
  color,
  darkMode = true,
  text,
  rounded,
}: ChipProps) {
  let colorClassName = "";
  let borderClassName = "";
  let textClassName = "";
  switch (color) {
    case "pink":
      colorClassName = "bg-[#c41d77]";
      borderClassName = "border-[#c41d77]";
      textClassName = "text-[#c41d77]";
      break;
    case "green":
      colorClassName = "bg-[#7CB342]";
      borderClassName = "border-[#7CB342]";
      textClassName = "text-[#7CB342]";
      break;
    case "yellow":
      colorClassName = "bg-[#f09f17]";
      borderClassName = "border-[#f09f17]";
      textClassName = "text-[#f09f17]";
      break;
    case "grey":
      colorClassName = "bg-[#6E6E6E]";
      borderClassName = "border-[#6E6E6E]";
      textClassName = "text-[#6E6E6E]";
      break;
    case "blue":
      colorClassName = "bg-blue";
      borderClassName = "border-blue";
      textClassName = "text-blue";
      break;
    default:
      colorClassName = "bg-current";
      borderClassName = "border-current";
      textClassName = "text-current";
  }

  return (
    <span
      className={classNames(
        "uppercase p-1 font-bold inline-flex",
        empty
          ? `${borderClassName} ${textClassName} border-2`
          : `${colorClassName} text-white`,
        !empty && darkMode && "dark:text-blue-black",
        size === "small" ? "text-xs px-1.5 py-1" : "text-sm px-2",
        rounded && "rounded-xl",
        className
      )}
    >
      {text}
    </span>
  );
}
