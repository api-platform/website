import React from "react";
import LayoutBase from "components/con/layout/LayoutBase";
import ContactCard from "components/con/layout/ContactCard";
import nav from "data/con/2022/nav";
import footer from "data/con/2022/footer";

export default function EditionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutBase edition="2022" nav={nav} footer={footer}>
      {children}
      <ContactCard />
    </LayoutBase>
  );
}
