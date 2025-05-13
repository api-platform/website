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
  size?: "small" | "medium" | "big" | "xl";
}

function PartnersGrid({ partners, edition, size = "big" }: PartnersGridProps) {
  const imageSize =
    size === "small"
      ? 140
      : size === "medium"
      ? 160
      : size === "xl"
      ? 200
      : 180;
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
              size === "small" && "max-w-[180px]",
              size === "medium" && "max-w-[200]",
              size === "big" && "max-w-[220px]",
              size === "xl" && "max-w-[240px]"
            )}
          >
            <img
              width={imageSize}
              height={imageSize}
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
  const gold = data.filter((p) => p.rank === 1);
  const silver = data.filter((p) => p.rank === 2);
  const bronze = data.filter((p) => p.rank === 3);
  const partners = data.filter((p) => p.rank > 3);

  return (
    <div className="mb-12">
      {gold.length > 0 ? (
        <PartnersGrid edition={edition} partners={gold} size="xl" />
      ) : null}
      {silver.length > 0 ? (
        <PartnersGrid edition={edition} partners={silver} />
      ) : null}
      {bronze.length > 0 ? (
        <PartnersGrid edition={edition} partners={bronze} size="medium" />
      ) : null}
      {partners.length > 0 ? (
        <PartnersGrid edition={edition} partners={partners} size="small" />
      ) : null}
    </div>
  );
}
