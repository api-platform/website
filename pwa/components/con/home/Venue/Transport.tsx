import React, { PropsWithChildren } from "react";

interface TransportProps extends PropsWithChildren {
  icon: string;
  title: string;
}

export default function Transport({ icon, title, children }: TransportProps) {
  return (
    <div className="w-full relative flex flex-row border-t-[5px] border-t-blue p-3 text-white | md:border-t-[10px] md:pt-0 md:flex-col md:after:absolute md:after:left-full md:after:h-[90%] md:after:top-1/2 md:after:-translate-y-1/2 md:after:border-l-2 md:last-of-type:after:border-l-0 md:after:border-dotted md:after:border-l-blue-light md:after:w-1">
      <div className="self-center mr-3 w-32 h-32 p-3 flex flex-col bg-blue | md:-translate-y-6 md:mr-0">
        <span className="text-base uppercase font-bold lined-center lined-blue-dark">
          {title}
        </span>
        <div className="flex-1 relative">
          <img
            className="w-9/12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            src={icon}
            alt={title}
            width={70}
            height={70}
          />
        </div>
      </div>
      <div className="flex flex-col p-3 flex-1 items-center justify-center | sm:flex-row | md:flex-col md:pt-0">
        {children}
      </div>
    </div>
  );
}
