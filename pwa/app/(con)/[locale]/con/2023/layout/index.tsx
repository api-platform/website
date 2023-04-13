import React from "react";
import LayoutBase from "components/con/layout/LayoutBase";
import ContactCard from "components/con/layout/ContactCard";
import nav from "data/con/2023/nav";
import footer from "data/con/2023/footer";

function EditionLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutBase edition="2023" nav={nav} footer={footer}>
      {children}
      <ContactCard />
    </LayoutBase>
  );
}

export default EditionLayout;
