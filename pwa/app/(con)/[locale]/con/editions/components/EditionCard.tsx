import React from "react";
import Image from "next/image";
import { Edition } from "types/con";

interface EditionCardProps {
  edition: Edition;
  size: "small" | "big";
  link?: string;
  withEditionTitle?: boolean;
}

export default function EditionCard({
  edition,
  withEditionTitle,
  size = "big",
  link,
}: EditionCardProps) {
  return (
    <a
      href={link || `/con/${edition.year}`}
      className="relative bg-white p-2 group hover:-translate-y-1 transition-transform"
    >
      <Image
        width={size === "big" ? 400 : 240}
        height={size === "big" ? 267 : 160}
        src={`/images/con/editions/${edition.image}.jpg`}
        alt={`${edition.year} edition`}
      />
      {withEditionTitle && (
        <span className="block text-center text-blue-dark text-xl font-semibold transition-colors group-hover:text-blue">
          {edition.year}
        </span>
      )}
    </a>
  );
}
