import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import { Partner } from "types/con";

interface PartnersProps extends PropsWithChildren {
  edition: string;
  data: Partner[];
}

interface PartnersGridProps extends PropsWithChildren {
  edition: string;
  partners: Partner[];
  small?: boolean;
}

function PartnersGrid({ partners, edition, small = false }: PartnersGridProps) {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center flex-wrap py-6 border-dotted border-grey border-b-2">
      {partners.map(({ name, logo, link, edition: partnerEdition }) => (
        <div
          key={name}
          className="grayscale opacity-50 transition-all px-8 py-4 hover:grayscale-0 hover:opacity-100"
        >
          <a
            href={link}
            title={`${name}`}
            key={name}
            target="_blank"
            rel="nofollow noreferrer noopener"
            className={classNames(
              "flex items-center justify-center flex-col",
              small ? "max-w-[180px]" : " max-w-[240px]"
            )}
          >
            <img
              width={small ? 140 : 200}
              height={small ? 140 : 200}
              src={`/images/con/${
                partnerEdition || edition
              }/partners/${logo}.png`}
              alt={name}
              className="w-7/8 h-auto"
            />
          </a>
        </div>
      ))}
    </div>
  );
}

export default function Partners({ edition, data }: PartnersProps) {
  const sponsors = data.filter((p) => p.rank < 6);
  const partners = data.filter((p) => p.rank >= 6);
  return (
    <div className="mb-12">
      <PartnersGrid edition={edition} partners={sponsors} />
      {partners.length > 0 ? (
        <PartnersGrid edition={edition} partners={partners} small />
      ) : null}
    </div>
  );
}
