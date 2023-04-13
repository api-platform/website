import React from "react";
import Sidebar from "components/docs/Sidebar";
import { getAllDocLinks } from "api/doc/guides";
import MobileSideBar from "components/docs/MobileSidebar";
import { DocProvider } from "contexts/DocContext";

async function DocLayout({ children }: { children: React.ReactNode }) {
  const guideLinks = await getAllDocLinks("guides", "guide");
  const tutorialLinks = await getAllDocLinks("tutorial");
  const inDepthLinks = await getAllDocLinks("in-depth");

  const docMenuparts = [
    {
      title: "Guides",
      basePath: "/docs/guide",
      links: guideLinks,
    },
    {
      title: "References",
      basePath: "/docs/reference",
      link: "/docs/references",
      links: [],
    },
    {
      title: "Tutorials",
      basePath: "/docs/tutorial",
      links: tutorialLinks,
    },
    {
      title: "In depth",
      basePath: "/docs/in-depth",
      links: inDepthLinks,
    },
  ];

  return (
    <div className="max-w-8xl mx-auto overflow-x-clip">
      <DocProvider>
        <MobileSideBar docMenuParts={docMenuparts} />
        <div className="flex flex-row flex-wrap items-start justify-start">
          <Sidebar docMenuParts={docMenuparts} />
          <div className="flex-1 overflow-clip">{children}</div>
        </div>
      </DocProvider>
    </div>
  );
}

export default DocLayout;
