import React from "react";
import Sidebar from "components/docs/Sidebar";
import { DocProvider } from "contexts/DocContext";
import MobileSideBar from "components/docs/MobileSidebar";
import { NavPartProps } from "types";

interface DocLayoutProps extends PropsWithChildren {
  nav: NavPartProps[];
}

export default function DocLayout({ nav }: DocLayoutProps) {
  return (
    <div className="max-w-8xl mx-auto overflow-x-clip">
      <DocProvider>
        <MobileSideBar docMenuParts={nav} />
        <div className="flex flex-row flex-wrap items-start justify-start">
          <Sidebar docMenuParts={nav} />
          <div className="flex-1 overflow-clip">{children}</div>
        </div>
      </DocProvider>
    </div>
  );
}

export default DocLayout;
