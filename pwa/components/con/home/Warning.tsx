import React, { PropsWithChildren } from "react";
import classNames from "classnames";

interface WarningProps extends PropsWithChildren {
  img: string;
  title?: string;
  className?: string;
}

export default function Warning({
  img,
  title,
  children,
  className,
}: WarningProps) {
  return (
    <div
      className={classNames(
        "px-4 py-4 my-4 font-semibold text-left border-dotted border-[5px] border-blue-light inline-flex flex-row items-center max-w-2xl",
        className
      )}
    >
      <img src={img} alt="tip" width="60" height="60" />
      <div className="pl-4">
        {title ? (
          <p className="h5 font-bold uppercase text-xl lined-left mb-2">
            {title}
          </p>
        ) : null}
        <div className="text-blue-black text-base font-semibold">
          {children}
        </div>
      </div>
    </div>
  );
}
