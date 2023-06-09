import React from "react";
import Sidebar from "components/docs/Sidebar";
import { loadV2DocumentationNav } from "api/doc";
import { versions, current } from "consts";
import { DocProvider } from "contexts/DocContext";
import MobileSideBar from "components/docs/MobileSidebar";

async function DocLayout({
  params: { slug },
  children,
}: {
  params: {
    slug: string[];
  };
  children: React.ReactNode;
}) {
  const version = versions.includes(slug[0]) ? slug[0] : current;
  const nav = await loadV2DocumentationNav(version);

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
