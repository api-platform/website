"use client";
import classNames from "classnames";
import { PropsWithChildren } from "react";
import useAnimation from "hooks/con/useAnimation";

interface StepContentProps extends PropsWithChildren {
  withPoint?: boolean;
  className?: string;
}

export default function StepContent({
  children,
  withPoint = true,
  className,
}: StepContentProps) {
  const animation = useAnimation(
    "right",
    undefined,
    undefined,
    undefined,
    "100px 0% -10%"
  );
  return (
    <div
      className={classNames(
        "flex flex-col items-center mb-4 py-4 | sm:mb-12 sm:bg-none sm:items-start sm:justify-baseline sm:flex-row",
        className
      )}
    >
      {withPoint ? (
        <div className="hidden rounded-full w-6 h-6 border-4 bg-white dark:bg-blue-black border-blue -ml-6 translate-x-1/2 | sm:block" />
      ) : null}
      <div
        ref={animation}
        className="flex-1 font-light text-gray-700 dark:text-white text-xl | sm:pl-12 "
      >
        {children}
      </div>
    </div>
  );
}
