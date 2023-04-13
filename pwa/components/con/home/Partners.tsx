import React, { PropsWithChildren } from "react";
import { Partner } from "types/con";

interface PartnersProps extends PropsWithChildren {
  edition: string;
  data: Partner[];
}

export default function Partners({ edition, data }: PartnersProps) {
  return (
    <div className="flex justify-center items-center flex-wrap mb-12">
      {data.map(({ name, logo, link }) => (
        <div
          key={name}
          className="grayscale opacity-50 transition-all p-5 hover:grayscale-0 hover:opacity-100"
        >
          <a
            href={link}
            title={`${name}`}
            key={name}
            target="_blank"
            rel="nofollow noreferrer noopener"
            className="max-w-[240px] flex items-center justify-center flex-col"
          >
            <img
              width="200"
              height="200"
              loading="lazy"
              src={`/images/con/${edition}/partners/${logo}.png`}
              alt={name}
              className="w-7/8 h-auto"
            />
          </a>
        </div>
      ))}
    </div>
  );
}
