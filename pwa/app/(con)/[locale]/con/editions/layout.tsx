import React from "react";
import LayoutBase from "components/con/layout/LayoutBase";
import editions, { currentEdition } from "data/con/editions";

export default async function EditionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    edition: string;
  };
}) {
  const { edition } = params;
  const nav = await import(`data/con/nav`);

  const footer = [
    {
      title: "Previous editions",
      links: editions
        .filter((edition) => edition.year !== currentEdition)
        .map((edition) => ({
          title: `${edition.year} edition`,
          link: `/con/${edition.year}`,
        })),
    },
  ];

  return (
    <LayoutBase nav={nav.default} footer={footer} edition={edition}>
      {children}
    </LayoutBase>
  );
}
