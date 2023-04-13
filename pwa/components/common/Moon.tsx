import React from "react";
import classNames from "classnames";

interface SwitchThemeProps {
  theme?: string;
}

export default function Moon({ theme }: SwitchThemeProps) {
  return (
    <svg
      className={classNames(
        "transition-all absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 duration-500 fill-current",
        theme === "light" && "-rotate-90 scale-0"
      )}
      viewBox="0 0 32 32"
    >
      <path d="M24.633,22.184c-8.188,0-14.82-6.637-14.82-14.82c0-2.695,0.773-5.188,2.031-7.363 C5.02,1.968,0,8.188,0,15.645C0,24.676,7.32,32,16.352,32c7.457,0,13.68-5.023,15.648-11.844 C29.82,21.41,27.328,22.184,24.633,22.184z" />
    </svg>
  );
}
