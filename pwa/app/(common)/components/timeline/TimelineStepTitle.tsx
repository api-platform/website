import { PropsWithChildren } from "react";

interface TimelineStepTitleProps extends PropsWithChildren {
  step: number;
}

export default function TimelineStepTitle({
  step,
  children,
}: TimelineStepTitleProps) {
  return (
    <div className="font-title relative mt-12 first:mt-0 | sm:mb-12 sm:mt-20">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full w-16 h-16 bg-blue text-4xl font-bold text-white dark:text-blue-black flex items-center justify-center mr-4 | sm:-translate-y-1/2 sm:left-0 sm:top-1/2">
        {step}
      </div>
      <p className="text-blue uppercase font-semibold text-3xl leading-none pt-24 pb-4 | sm:pt-0 sm:ml-12">
        {children}
      </p>
    </div>
  );
}
